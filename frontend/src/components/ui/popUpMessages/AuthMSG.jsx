import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  LogIn,
  LogOut,
} from "lucide-react";

const TYPES = {
  success: {
    Icon: CheckCircle,
    ring: "bg-green-100 text-green-600",
    bar: "bg-green-500",
    bg: "bg-green-50 border-green-100",
  },
  error: {
    Icon: AlertCircle,
    ring: "bg-red-100 text-red-600",
    bar: "bg-red-500",
    bg: "bg-red-50 border-red-100",
  },
  info: {
    Icon: Info,
    ring: "bg-indigo-100 text-indigo-600",
    bar: "bg-indigo-500",
    bg: "bg-indigo-50 border-indigo-100",
  },
  warning: {
    Icon: AlertTriangle,
    ring: "bg-amber-100 text-amber-600",
    bar: "bg-amber-500",
    bg: "bg-amber-50 border-amber-100",
  },
  login: {
    Icon: LogIn,
    ring: "bg-green-100 text-green-600",
    bar: "bg-green-500",
    bg: "bg-green-50 border-green-100",
  },
  logout: {
    Icon: LogOut,
    ring: "bg-indigo-100 text-indigo-600",
    bar: "bg-indigo-500",
    bg: "bg-indigo-50 border-indigo-100",
    rotate: "rotate-180",
  },
};

function AuthMSG({ message, type, top, bottom, popUpDirection = "top" }) {
  const yOffset = popUpDirection === "top" ? -40 : 40;
  const t = TYPES[type] || TYPES.info;

  return (
    <motion.div
      initial={{ y: yOffset, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      exit={{ y: yOffset, x: "-50%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{ top, bottom }}
      className={`fixed left-1/2 z-50 flex w-[320px] max-w-[90%] items-center gap-3
                 overflow-hidden rounded-xl border px-4 py-3 shadow-xl ${t.bg}`}
    >
      <span className={`absolute left-0 top-0 h-full w-1 ${t.bar}`} />

      {(() => {
        const Icon = t.Icon;
        return (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 14,
              delay: 0.05,
            }}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${t.ring}`}
          >
            <Icon size={18} strokeWidth={2.5} className={t.rotate || ""} />
          </motion.span>
        );
      })()}

      <span className="text-sm font-medium text-gray-800">{message}</span>
    </motion.div>
  );
}

export default AuthMSG;
