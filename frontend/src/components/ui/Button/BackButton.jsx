import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function BackButton({ placeholder, top, left, bottom, right }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed z-50`}
        style={{top, left, bottom, right}}
      >
        <Link to="/">
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center text-indigo-700 text-base font-medium cursor-pointer backdrop-blur-md bg-indigo-950/10 border border-indigo-300 shadow-[0_0_12px_rgba(79,70,229,0.35)]"
            whileHover={{
              scale: 1.15,
              rotate: -8,
              boxShadow: "0 0 18px rgba(79,70,229,0.55)",
              backgroundColor: "rgba(79,70,229,0.18)",
            }}
            whileTap={{
              scale: 0.95,
              rotate: 0,
              boxShadow: "0 0 20px rgba(67,56,202,0.7)",
            }}
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            {placeholder}
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}

export default BackButton;
