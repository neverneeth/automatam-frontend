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
  const panelId = `dropdown-panel-${useRef(Math.random()).current}`;


  useEffect(() => {
    if (initialSelected) {
      setSelected(initialSelected);
    }
  }, [initialSelected]);



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
    if (onSelect) {
      onSelect(option); 
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      Type:&#8197;
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
        type="button"
      >
        <span className="ml-2 pr-2 font-medium border-r">{selected.label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 pl-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
</svg>

      </button>

      {isOpen && (
        <div
          id={panelId} 
          className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10"
          role="menu" 
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="menuitem" 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}