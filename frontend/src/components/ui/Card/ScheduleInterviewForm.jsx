import { useState } from "react";
import { X, Calendar, Video, Users } from "lucide-react";

const MODES = ["Video", "In-person", "Phone"];
const ROUNDS = ["Technical", "HR", "Managerial", "Screening", "Final"];

export default function ScheduleInterviewForm({
  open,
  setOpen,
  candidate,
  members = [],
  onSchedule,
}) {
  const [interviewer, setInterviewer] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [mode, setMode] = useState("Video");
  const [round, setRound] = useState("Technical");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!candidate) return null;

  const handleSubmit = async () => {
    if (!interviewer || !scheduledAt) {
      setError("Please pick an interviewer and a date.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onSchedule({
        candidate: candidate._id,
        job: candidate.job?._id || candidate.job,
        interviewer,
        scheduledAt,
        mode,
        round,
      });
      //! reset + close
      setInterviewer("");
      setScheduledAt("");
      setMode("Video");
      setRound("Technical");
      setOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule interview.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity
      ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-[420px] max-w-[92%] rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* //! header */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Calendar size={18} />
            </span>
            <div>
              <div className="text-base font-semibold text-gray-900">
                Schedule Interview
              </div>
              <div className="text-xs text-gray-500">
                for {candidate.fullname}
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)}>
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        {/* //! error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        {/* //! interviewer */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-gray-500">
            Interviewer
          </label>
          <select
            value={interviewer}
            onChange={(e) => setInterviewer(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-purple-400"
          >
            <option value="">Select interviewer</option>
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.fullname} ({m.role})
              </option>
            ))}
          </select>
        </div>

        {/* //! date + time */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-gray-500">
            Date & Time
          </label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-purple-400"
          />
        </div>

        {/* //! mode + round */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-500">
              Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-purple-400"
            >
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-500">
              Round
            </label>
            <select
              value={round}
              onChange={(e) => setRound(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-purple-400"
            >
              {ROUNDS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* //! actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-60"
          >
            {saving ? "Scheduling..." : "Schedule Interview"}
          </button>
        </div>
      </div>
    </div>
  );
}
