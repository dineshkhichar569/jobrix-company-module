import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

//! to give different colors to every candidate
function avatarColor(name = "") {
  const palette = [
    "bg-rose-100 text-rose-700",
    "bg-amber-100 text-amber-700",
    "bg-indigo-100 text-indigo-700",
    "bg-green-100 text-green-700",
    "bg-blue-100 text-blue-700",
    "bg-violet-100 text-violet-700",
  ];
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return palette[sum % palette.length];
}

export default function PipelineCard({ candidate, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: candidate._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const exp = candidate.experience != null ? `${candidate.experience}y` : "—";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick?.(candidate)}
      className="cursor-grab rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm
                 transition hover:border-indigo-300 hover:shadow active:cursor-grabbing"
    >
      <div className="mb-1.5 flex items-center gap-2">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${avatarColor(candidate.fullname)}`}
        >
          {initials(candidate.fullname)}
        </div>
        <span className="truncate text-[13px] font-medium text-gray-800">
          {candidate.fullname}
        </span>
      </div>
      <div className="mb-2 text-[11px] text-gray-500">
        {candidate.job || "—"} · {exp}
      </div>
      {candidate.source && (
        <span className="inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-600">
          {candidate.source}
        </span>
      )}
    </div>
  );
}
