import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getAvatarColor, getAvatarInitials } from "../../utils/avatarUtils.js";

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
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${getAvatarColor(candidate.fullname)}`}
        >
          {getAvatarInitials(candidate.fullname)}
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
