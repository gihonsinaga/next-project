// import React from "react";

// type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
//   label: string;
//   children: React.ReactNode;
// };

// export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
//   ({ label, id, children, ...props }, ref) => {
//     return (
//       <div className="w-full">
//         <label
//           htmlFor={id}
//           className="block text-sm font-medium text-gray-600 mb-1"
//         >
//           {label}
//         </label>
//         <select
//           id={id}
//           ref={ref}
//           className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           {...props}
//         >
//           {children}
//         </select>
//       </div>
//     );
//   }
// );

// Select.displayName = "Select";

"use client";

import React, { useState, useRef, useEffect, FC } from "react";

interface SelectProps {
  options: string[];
  label: string;
  id: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
}

// Ikon panah
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
      isOpen ? "rotate-180" : ""
    }`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export const Select: FC<SelectProps> = ({
  options,
  label,
  id,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  // Filter options berdasarkan input pencarian
  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Menutup dropdown saat klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handler saat memilih salah satu opsi
  const handleSelectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative" ref={selectRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value || placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronIcon isOpen={isOpen} />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ul>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-500 hover:text-white"
                  >
                    {option}
                  </li>
                ))
              ) : (
                <li className="text-gray-500 cursor-default select-none relative py-2 px-4">
                  No options found.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
