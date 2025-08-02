"use client";

import { useState, useEffect, useRef } from "react";

type Option = { label: string; value: string };

export default function DropdownMenu({
  options = [
    { label: "DFA", value: "dfa" },
    { label: "NFA", value: "nfa" },
    { label: "PDA", value: "pda" },
  ],
  onSelect,
  initialSelected,
}: {
  options?: Option[];
  onSelect?: (option: Option) => void;
  initialSelected?: Option;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(initialSelected || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-500 text-white rounded"
        type="button"
      >
        {selected.label}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="block w-full text-left px-4 py-2 hover:bg-gray-400 text-black"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}