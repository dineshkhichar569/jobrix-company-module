import { useEffect, useRef, useState } from "react";

export const SelectOption = ({ options, placeholder, onOptionSelection }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative w-full" ref={dropDownRef}>
      <button
        type="button"
        className="cursor-pointer w-full flex justify-between items-center px-4 py-2 rounded-xl border bg-[#eceef4] shadow-sm text-gray-600 hover:shadow-md transition"
        onClick={() => setOpen(!open)} ////// open will be true when button is clicked
      >
        {selected || placeholder}
        <span className="">▾</span>
      </button>

      {/* ////////   for Drop Down */}

      {open && (
        <div className="absolute z-10 mt-2 w-full max-h-52 overflow-y-auto rounded-xl bg-white shadow-lg border overflow-hidden animate-dropdown dropdown-scroll">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
                onOptionSelection(option);
              }}
              className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 transition"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
