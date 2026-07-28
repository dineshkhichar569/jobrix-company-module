import { useState } from "react";
import { X, MessageSquare } from "lucide-react";

const RECOMMENDATIONS = ["Proceed", "Hold", "Reject"];

//! recommendation button colors
function recColor(value, active) {
  if (!active) return "border-gray-200 text-gray-600 hover:bg-gray-50";
  if (value === "Proceed")
    return "border-emerald-300 bg-emerald-50 text-emerald-700";
  if (value === "Hold") return "border-amber-300 bg-amber-50 text-amber-700";
  return "border-red-300 bg-red-50 text-red-700"; //! Reject
}

export default function InterviewFeedbackForm({
  open,
  setOpen,
  candidate,
  newStatus,
  onSubmit,
}) {
  const [feedback, setFeedback] = useState("");
  const [recommendation, setRecommendation] = useState("Proceed");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!candidate) return null;

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      setError("Please add interview feedback before continuing.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onSubmit({
        feedback,
        recommendation,
        newStatus,
      });
      setFeedback("");
      setRecommendation("Proceed");
      setOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save feedback.");
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
        className="w-[440px] max-w-[92%] rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <MessageSquare size={18} />
            </span>
            <div>
              <div className="text-base font-semibold text-gray-900">
                Interview Feedback
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

        {/* //! info line */}
        <div className="mb-4 rounded-lg bg-indigo-50 px-3 py-2 text-xs text-indigo-600">
          Record how the interview went before moving {candidate.fullname} to{" "}
          <span className="font-semibold">{newStatus}</span>.
        </div>

        {/* //! error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        {/* //! feedback */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-gray-500">
            Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            placeholder="How did the interview go? Strengths, concerns, overall impression..."
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />
        </div>

        {/* //! recommendation */}
        <div className="mb-5">
          <label className="mb-1.5 block text-xs font-medium text-gray-500">
            Recommendation
          </label>
          <div className="flex gap-2">
            {RECOMMENDATIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRecommendation(r)}
                className={`flex-1 rounded-lg border py-2 text-sm font-medium transition ${recColor(
                  r,
                  recommendation === r,
                )}`}
              >
                {r}
              </button>
            ))}
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
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save & Move"}
          </button>
        </div>
      </div>
    </div>
  );
}
