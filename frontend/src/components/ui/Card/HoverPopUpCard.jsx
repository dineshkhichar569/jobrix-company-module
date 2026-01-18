import React from "react";

function HoverPopUpCard({ placeholder }) {
  return (
    <div className="relative m-10 bg-white border-[1px] border-slate-200 h-10 rounded w-auto px-3 text-xs flex items-center justify-center shadow-xl whitespace-nowrap">
      <div className="absolute left-1/2 -top-[9px] -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-slate-200 rotate-45"></div>
      {placeholder}
    </div>
  );
}

export default HoverPopUpCard;
