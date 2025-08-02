'use client';

import Link from "next/link";
import { useState } from "react";
import DropdownMenu from "../../components/DropdownMenu";

export default function Simulator() {
  const [selectedOption, setSelectedOption] = useState({ label: "DFA", value: "dfa" });

  return (
    <div className="font-sans min-h-screen px-8 sm:px-20 pt-24">
      <main className="flex flex-col gap-8">
        <div className="flex flex-row items-center gap-x-4">
          <p className="font-bold text-lg">Choose an Automaton:</p>
          <DropdownMenu
            initialSelected={selectedOption}
            onSelect={setSelectedOption}
          />
        </div>

        <div className="text-md">Selected: <span className="font-medium">{selectedOption.label}</span></div>
      </main>
    </div>
  );
}
