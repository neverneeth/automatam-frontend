'use client';

import Link from "next/link";
import { useState } from "react";
import FAForm from "@/components/FAForm";

export default function Simulator() {
  const [selectedOption, setSelectedOption] = useState({ label: "DFA", value: "dfa" });

  return (
    <div className="font-sans min-h-screen pt-16 relative">
      <div className="flex">
        <FAForm />
        {/* Other simulator content can go here */}
      </div>
    </div>
  );
}
