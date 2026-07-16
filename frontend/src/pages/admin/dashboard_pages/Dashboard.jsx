import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  AreaChart,
  Area,
  Tooltip,
  Legend,
} from "recharts";
import {
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowRight,
  CalendarClock,
  UserPlus,
  Mail,
  FilePlus,
} from "lucide-react";
import { getAllCandidates } from "../../../api/differentApi's/getAllCandidates.api";
import { getAllJobs } from "../../../api";

const STAGE_COLORS = {
  Applied: "#3b82f6",
  Screening: "#8b5cf6",
  Shortlisted: "#06b6d4",
  "Interview Scheduled": "#f59e0b",
  Selected: "#10b981",
  Rejected: "#ef4444",
  "On Hold": "#f97316",
};
const STAGE_ORDER = [
  "Applied",
  "Screening",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
];

const timeAgo = (d) => {
  if (!d) return "";
  const s = (Date.now() - new Date(d).getTime()) / 1000;
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 172800) return "Yesterday";
  if (s < 2592000) return `${Math.floor(s / 86400)}d ago`;
  return `${Math.floor(s / 2592000)}mo ago`;
};

/* //! KPI card */
function Kpi({ icon: Icon, label, value, sub, subColor = "text-emerald-600" }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
          <Icon size={15} />
        </span>
      </div>
      <div className="mt-1.5 text-2xl font-bold text-gray-900">{value}</div>
      {sub && <div className={`mt-1 text-[11px] ${subColor}`}>{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const c = await getAllCandidates();
      const j = await getAllJobs();
      setCandidates(c.data || []);
      setJobs(j.data || []);
    })();
  }, []);

  /* //! metrics */
  const now = new Date();
  const metrics = useMemo(() => {
    const total = candidates.length;
    const selected = candidates.filter((c) => c.status === "Selected").length;
    const rejected = candidates.filter((c) => c.status === "Rejected").length;
    const interviews = candidates.filter((c) => c.status === "Interview Scheduled",).length;
    const decided = selected + rejected;
    const acceptance = decided ? Math.round((selected / decided) * 100) : 0;

    const thisMonth = candidates.filter((c) => {
      if (!c.createdAt) return false;
      const d = new Date(c.createdAt);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }).length;

    const weekAgo = Date.now() - 7 * 86400000;
    const thisWeekInterviews = candidates.filter(
      (c) =>
        c.status === "Interview Scheduled" &&
        c.updatedAt &&
        new Date(c.updatedAt).getTime() >= weekAgo,
    ).length;

    const sel = candidates.filter(
      (c) => c.status === "Selected" && c.createdAt && c.updatedAt,
    );
    let avgDays = null;
    if (sel.length) {
      const t = sel.reduce(
        (s, c) =>
          s + (new Date(c.updatedAt) - new Date(c.createdAt)) / 86400000,
        0,
      );
      avgDays = Math.round(t / sel.length);
    }

    return {
      openJobs: jobs.length,
      total,
      selected,
      interviews,
      acceptance,
      thisMonth,
      thisWeekInterviews,
      avgDays,
    };
  }, [candidates, jobs]);

  /* //! candidates by stage (bar chart) */
  const byStage = useMemo(
    () =>
      STAGE_ORDER.map((stage) => ({
        stage: stage === "Interview Scheduled" ? "HR Interview" : stage,
        key: stage,
        count: candidates.filter((c) => c.status === stage).length,
      })),
    [candidates],
  );

  /* //! hiring trend */
  const trend = useMemo(() => {
    const arr = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      arr.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString("default", { month: "short" }),
        Hired: 0,
        Rejected: 0,
      });
    }
    candidates.forEach((c) => {
      if (!c.updatedAt) return;
      const d = new Date(c.updatedAt);
      const row = arr.find(
        (x) => x.key === `${d.getFullYear()}-${d.getMonth()}`,
      );
      if (!row) return;
      if (c.status === "Selected") row.Hired++;
      if (c.status === "Rejected") row.Rejected++;
    });
    return arr;
  }, [candidates]);

  /* //! top jobs by applicants */
  const topJobs = useMemo(() => {
    const map = {};
    candidates.forEach((c) => {
      const j = c.job || "Unassigned";
      map[j] = (map[j] || 0) + 1;
    });
    return Object.entries(map)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [candidates]);

  /* //! recent activity */
  const activity = useMemo(() => {
    return [...candidates]
      .filter((c) => c.updatedAt)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 6)
      .map((c) => {
        let icon = UserPlus,
          tint = "bg-indigo-50 text-indigo-500",
          verb = "was added";
        if (c.status === "Interview Scheduled") {
          icon = CalendarClock;
          tint = "bg-amber-50 text-amber-500";
          verb = "moved to Interview";
        } else if (c.status === "Selected") {
          icon = Mail;
          tint = "bg-emerald-50 text-emerald-500";
          verb = "was selected";
        } else if (c.status === "Rejected") {
          icon = ArrowRight;
          tint = "bg-red-50 text-red-500";
          verb = "was rejected";
        } else if (c.status === "Shortlisted") {
          icon = CheckCircle2;
          tint = "bg-cyan-50 text-cyan-500";
          verb = "was shortlisted";
        } else if (c.status === "Screening") {
          icon = ArrowRight;
          tint = "bg-purple-50 text-purple-500";
          verb = "moved to Screening";
        }
        return {
          id: c._id,
          name: c.fullname,
          job: c.job,
          verb,
          icon,
          tint,
          when: timeAgo(c.updatedAt),
        };
      });
  }, [candidates]);

  const maxStage = Math.max(...byStage.map((s) => s.count), 5);

  return (
    <div className="space-y-4">
      {/* //! header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back{name ? `, ${name}` : ""}! Here's what's happening with
          your hiring.
        </p>
      </div>

      {/* //! 6 KPI cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Kpi
          icon={Briefcase}
          label="Open Jobs"
          value={metrics.openJobs}
          sub="↑ active roles"
        />
        <Kpi
          icon={Users}
          label="Total Candidates"
          value={metrics.total}
          sub={metrics.thisMonth ? `↑ ${metrics.thisMonth} this month` : "—"}
        />
        <Kpi
          icon={TrendingUp}
          label="This Month"
          value={metrics.thisMonth}
          sub="New candidates"
          subColor="text-gray-400"
        />
        <Kpi
          icon={Clock}
          label="Avg. Time to Hire"
          value={metrics.avgDays != null ? `${metrics.avgDays}d` : "—"}
          sub="applied → hired"
          subColor="text-gray-400"
        />
        <Kpi
          icon={CheckCircle2}
          label="Offer Rate"
          value={`${metrics.acceptance}%`}
          sub="Acceptance"
          subColor="text-gray-400"
        />
        <Kpi
          icon={Calendar}
          label="In Interview"
          value={metrics.interviews}
          sub="Scheduled"
          subColor="text-gray-400"
        />
      </div>

      {/* //! charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* //! candidates by stage */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 text-sm font-semibold text-gray-900">
            Candidates by Stage
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={byStage}
                layout="vertical"
                margin={{ left: 10, right: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#f1f2f5"
                />
                <XAxis
                  type="number"
                  domain={[0, maxStage]}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="stage"
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  width={70}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip cursor={{ fill: "#f9fafb" }} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18}>
                  {byStage.map((s, i) => (
                    <Cell key={i} fill={STAGE_COLORS[s.key]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* //! hiring trend */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 text-sm font-semibold text-gray-900">
            Hiring Trend (Last 6 Months)
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: -10, right: 10 }}>
                <defs>
                  <linearGradient id="hired" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="rejected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f2f5"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Legend iconType="plainline" wrapperStyle={{ fontSize: 11 }} />
                <Area
                  type="monotone"
                  dataKey="Rejected"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#rejected)"
                />
                <Area
                  type="monotone"
                  dataKey="Hired"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#hired)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* //! table + activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* //! top jobs table */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 text-sm font-semibold text-gray-900">
            Top Jobs by Applicants
          </div>
          {topJobs.length === 0 ? (
            <p className="py-8 text-center text-xs text-gray-400">
              No candidates yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wide text-gray-400">
                  <th className="pb-2 text-left font-medium">Job Title</th>
                  <th className="pb-2 text-right font-medium">Applicants</th>
                </tr>
              </thead>
              <tbody>
                {topJobs.map((j) => (
                  <tr
                    key={j.title}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-3 font-medium text-gray-800">
                      {j.title}
                    </td>
                    <td className="py-3 text-right font-semibold text-gray-900">
                      {j.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* //! recent activity */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 text-sm font-semibold text-gray-900">
            Recent Activity
          </div>
          {activity.length === 0 ? (
            <p className="py-8 text-center text-xs text-gray-400">
              No activity yet.
            </p>
          ) : (
            <div className="space-y-4">
              {activity.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.id} className="flex gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${a.tint}`}
                    >
                      <Icon size={14} />
                    </span>
                    <div className="text-[13px] leading-snug">
                      <span className="font-medium text-gray-800">
                        {a.name}
                      </span>{" "}
                      <span className="text-gray-500">{a.verb}</span>
                      {a.job && (
                        <span className="text-gray-500"> · {a.job}</span>
                      )}
                      <div className="text-[11px] text-gray-400">{a.when}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
