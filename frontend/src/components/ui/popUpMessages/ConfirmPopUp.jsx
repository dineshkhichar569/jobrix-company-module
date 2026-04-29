import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
  setPopUp,
  confirmLogout,
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
        backgroundColor: background,
        color,
        fontSize: textSize,
        padding: `${py} ${px}`,
      }}
      className="fixed left-1/2 rounded-xl shadow-2xl font-medium z-50 space-y-2"
    >
      <span className="flex items-center gap-2">
        {/* for animated emoji */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 5,
          }}
          className="text-lg"
        >
          {icon}
        </motion.span>

        <span className="">{placeholder}</span>
      </span>
      <div className="flex items-center justify-center gap-4 text-sm">
        <button
          onClick={() => setPopUp(false)}
          className=" bg-green-700 px-3 p-1 rounded-lg hover:bg-green-900 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={confirmLogout}
          className=" bg-red-600 px-3 p-1 rounded-lg hover:bg-red-900 transition-all duration-200"
        >
          Yes, Logout
        </button>
      </div>
    </motion.div>
  );
}

export default ConfirmPopup;
