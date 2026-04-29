import { AnimatePresence, motion } from "framer-motion";

function ConfirmPopup({
  placeholder,
  icon,
  top,
  bottom,
  color,
  background,
  textSize,
  px,
  py,
  popUpDirection,
}) {
  const yOffset = popUpDirection === "top" ? -40 : 40;
  return (
    <motion.div
      initial={{ y: yOffset, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      exit={{ y: yOffset, x: "-50%" }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      style={{
        top,
        bottom,
        // backgroundColor: background,
        color,
        fontSize: textSize,
        padding: `${py} ${px}`,
      }}
      className="fixed left-1/2 rounded-xl shadow-2xl font-medium z-50 space-y-2 border border-amber-300 text-gray-900 bg-amber-200"
    >
      <span className="flex items-center gap-2">
        {/* for animated emoji */}
        <motion.span
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1.2, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 1,
          }}
          className="text-lg"
        >
          {icon}
        </motion.span>

        <span className="text-gray-900">{placeholder}</span>
      </span>
      <div className="flex items-center justify-center gap-4 text-sm">
        <button className="bg-gray-200 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-lg transition-all duration-200">
          Cancel
        </button>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-lg transition-all duration-200">
          Yes, Logout
        </button>
      </div>
    </motion.div>
  );
}

export default ConfirmPopup;
