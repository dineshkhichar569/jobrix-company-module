import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PipelineCard from "../../../components/ui/Card/PipelineCard";
import { SelectOption } from "../../../components/ui/Card/SelectOption";
import { getAllCandidates } from "../../../api/differentApi's/getAllCandidates.api";
import { getAllJobs } from "../../../api";
import { updateCandidateStatus } from "../../../api/differentApi's/updateCandidateStatus.api";

//! status order for the columns — must match candidate status enum
const PIPELINE_STAGES = [
  "Applied",
  "Screening",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
  "On Hold",
];

//! same colors as Candidates section (single source of truth)
const getStatusColor = (status) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Screening":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Shortlisted":
      return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "Interview Scheduled":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "Selected":
      return "bg-green-100 text-green-700 border-green-200";
    case "Rejected":
      return "bg-red-100 text-red-700 border-red-200";
    case "On Hold":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

/* //! Droppable Column  */
function PipelineColumn({ status, candidates, onCardClick }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex flex-1 shrink-0 flex-col rounded-xl bg-white p-2.5">
      <div className="mb-2.5 flex items-center justify-between px-1">
        <span
          className={`rounded-lg px-2.5 py-[2px] text-[10px] font-medium border ${getStatusColor(
            status,
          )}`}
        >
          {status}
        </span>
        <span className="text-xs font-medium text-gray-400">
          {candidates.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex min-h-[120px] flex-1 flex-col gap-2 rounded-lg p-1 transition
                    ${isOver ? "bg-indigo-50 ring-2 ring-inset ring-indigo-200" : ""}`}
      >
        <SortableContext
          items={candidates.map((c) => c._id)}
          strategy={verticalListSortingStrategy}
        >
          {candidates.map((c) => (
            <PipelineCard key={c._id} candidate={c} onClick={onCardClick} />
          ))}
        </SortableContext>

        {candidates.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-gray-300 py-5 text-[11px] text-gray-400">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}

//! Main

export default function Pipeline() {
  const [candidates, setCandidates] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  //! fetch candidates + jobs (same pattern as Candidates section)
  useEffect(() => {
    const fetchCandidates = async () => {
      const res = await getAllCandidates();
      setCandidates(res.data);
    };
    const fetchJobs = async () => {
      const res = await getAllJobs();
      setAllJobs(res.data);
    };
    fetchCandidates();
    fetchJobs();
  }, []);

  const jobTitles = allJobs.map((job) => job.title);
  const sources = [...new Set(candidates.map((c) => c.source))];

  //! filter (job + source match by string, like Candidates)
  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      if (selectedJob && c.job !== selectedJob) return false;
      if (selectedSource && c.source !== selectedSource) return false;
      return true;
    });
  }, [candidates, selectedJob, selectedSource]);

  //! group candidates into status columns
  const grouped = useMemo(() => {
    const map = {};
    PIPELINE_STAGES.forEach((s) => (map[s] = []));
    filtered.forEach((c) => {
      const status = c.status || "Applied";
      (map[status] || map["Applied"]).push(c);
    });
    return map;
  }, [filtered]);

  const activeCandidate = candidates.find((c) => c._id === activeId);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    let newStatus = over.id;
    if (!PIPELINE_STAGES.includes(newStatus)) {
      const overCard = candidates.find((c) => c._id === over.id);
      newStatus = overCard?.status;
    }
    if (!newStatus) return;

    const moved = candidates.find((c) => c._id === active.id);
    if (!moved || moved.status === newStatus) return;
    const prevStatus = moved.status;

    //! optimistic update
    //! TODO (backend later): PATCH /api/candidates/:id/status { status: newStatus }
    setCandidates((prev) =>
      prev.map((c) => (c._id === active.id ? { ...c, status: newStatus } : c)),
    );
    try {
      await updateCandidateStatus(active.id, newStatus);
    } catch (err) {
      console.error("Status update failed, rolling back:", err);
      setCandidates((prev) =>
        prev.map((c) =>
          c._id === active.id ? { ...c, status: prevStatus } : c,
        ),
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* //! Heading */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Pipeline</h1>
          <p className="text-gray-600 text-sm">
            Drag candidates across stages.
          </p>
        </div>

        {/* //? filters */}
        <div className="flex gap-2 w-1/3">
          <SelectOption
            placeholder="All jobs"
            options={["All jobs", ...jobTitles]}
            onOptionSelection={(value) =>
              setSelectedJob(value === "All jobs" ? "" : value)
            }
          />
          <SelectOption
            placeholder="All source"
            options={["All source", ...sources]}
            onOptionSelection={(value) =>
              setSelectedSource(value === "All source" ? "" : value)
            }
          />
        </div>
      </div>

      {/* //! board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto pb-2">
          {PIPELINE_STAGES.map((status) => (
            <PipelineColumn
              key={status}
              status={status}
              candidates={grouped[status]}
              onCardClick={""}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCandidate ? (
            <div className="w-[200px] rotate-2">
              <PipelineCard candidate={activeCandidate} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
