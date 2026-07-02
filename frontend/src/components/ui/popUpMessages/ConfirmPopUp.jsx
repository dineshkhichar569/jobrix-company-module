import { motion } from "framer-motion";

//! type --> icon color for the header circle
const TONES = {
  danger: {
    ring: "bg-red-50 text-red-600",
    btn: "bg-red-600 hover:bg-red-700",
  },
  primary: {
    ring: "bg-indigo-50 text-indigo-600",
    btn: "bg-indigo-600 hover:bg-indigo-700",
  },
};

function ConfirmPopup({
  title,
  message,
  icon,
  confirmText,
  cancelText,
  tone,
  onConfirm,
  onCancel,
}) {
  const t = TONES[tone] || TONES.danger;

  return (
    <>
      {/* //! for backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
        exit={{ scale: 0.95, opacity: 0, x: "-50%", y: "-50%" }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="fixed left-1/2 top-1/2 z-50 w-[340px] max-w-[90%] rounded-2xl
                   border border-gray-100 bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex justify-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${t.ring}`}
          >
            {icon}
          </motion.span>
        </div>

        <h3 className="mb-1 text-center text-base font-semibold text-gray-900">
          {title}
        </h3>
        {message && (
          <p className="mb-5 text-center text-sm text-gray-500">{message}</p>
        )}

        <div className="flex items-center justify-center gap-3 text-sm">
          <button
            onClick={() => onCancel(false)}
            className="flex-1 rounded-lg border border-gray-200 py-2.5 font-medium
                       text-gray-700 transition hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-lg py-2.5 font-medium text-white transition ${t.btn}`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default ConfirmPopup;
