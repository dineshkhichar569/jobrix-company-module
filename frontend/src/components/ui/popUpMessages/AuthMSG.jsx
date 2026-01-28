import { AnimatePresence, motion } from "framer-motion";

function AuthMSG({
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
        backgroundColor: background,
        color,
        fontSize: textSize,
        padding: `${py} ${px}`,
      }}
      className="fixed left-1/2 rounded-xl shadow-2xl font-medium z-50"
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

        <span>{placeholder}</span>
      </span>
    </motion.div>
  );
}

export default AuthMSG;
