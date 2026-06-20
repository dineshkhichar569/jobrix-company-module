import { FileText, Mail, MapPin, Phone } from "lucide-react";
import { updateCandidateStatus } from "../../../api/differentApi's/updateCandidateStatus.api.js";
import { SelectOption } from "./SelectOption.jsx";

const STATUSES = [
  "Applied",
  "Screening",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
  "On Hold",
];

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

export default function CandidateDetail({
  open,
  setOpen,
  candidate,
  onStatusChange,
}) {
  if (!candidate) return null;

  const handleStatus = async (newStatus) => {
    await updateCandidateStatus(candidate._id, newStatus);
    onStatusChange?.(candidate._id, newStatus);
  };

  return (
    <>
      {/* //! backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* //! right floating rounded card */}
      <div
        className={`fixed right-4 top-4 bottom-4 z-50 w-[380px] max-w-[90%] bg-white rounded-2xl shadow-2xl
        transition-all duration-300 ease-out overflow-y-auto
        ${open ? "translate-x-0 opacity-100" : "translate-x-[calc(100%+1rem)] opacity-0"}`}
      >
        {/* //! header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <span className="text-xs font-medium text-gray-400">
            Candidate details
          </span>
          <button onClick={() => setOpen(false)}>
            <i className="text-gray-400 text-lg">✕</i>
          </button>
        </div>

        <div className="px-5 py-5">
          {/* //! identity */}
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-lg font-medium">
              {initials(candidate.fullname)}
            </div>
            <div>
              <div className="text-lg font-medium text-gray-900">
                {candidate.fullname}
              </div>
              <div className="text-sm text-gray-500">
                {candidate.job || "—"} · {candidate.experience ?? 0}y exp
              </div>
            </div>
          </div>

          {/* //! status dropdown */}
          <div className="mb-5">
            <div className="mb-1.5 text-[11px] font-medium text-gray-400">
              Status
            </div>
            <SelectOption
              placeholder={candidate.status}
              options={STATUSES}
              onOptionSelection={handleStatus}
            />
          </div>

          {/* //! contact */}
          <div className="mb-5">
            <div className="mb-2.5 text-[11px] font-medium text-gray-400">
              Contact
            </div>
            <div className="flex flex-col gap-2.5 text-sm text-gray-700">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">
                  <Mail size={16} />
                </span>
                {candidate.email || "—"}
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">
                  <Phone size={16} />
                </span>
                {candidate.phoneNo || "—"}
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">
                  <MapPin size={16} />
                </span>
                {candidate.location || "—"}
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">⚇</span>
                Source: {candidate.source || "—"}
              </div>
            </div>
          </div>

          {/* //! skills */}
          {candidate.skills?.length > 0 && (
            <div className="mb-5">
              <div className="mb-2.5 text-[11px] font-medium text-gray-400">
                Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(candidate.skills)
                  ? candidate.skills
                  : String(candidate.skills).split(",")
                ).map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* //! notes */}
          {candidate.notes && (
            <div className="mb-5">
              <div className="mb-2 text-[11px] font-medium text-gray-400">
                Notes
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm leading-relaxed text-gray-600">
                {candidate.notes}
              </div>
            </div>
          )}

          {/* //! resume */}
          <a
            href={candidate.resume || "#"}
            target="_blank"
            rel="noreferrer"
            className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            <span>
              <FileText size={16} />
            </span>{" "}
            View resume
          </a>

          {/* //! actions */}
          {/* <div className="flex gap-3">
            <button
              onClick={() => onEdit?.(candidate)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span>✎</span> Edit
            </button>
            <button className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
              Move stage
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
