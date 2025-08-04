'use client';

import { useState } from "react";
import FAForm from "@/components/FAForm";
import Table from "@/components/Table";
import { AutomataSchema } from "@/types";
import { Payload } from "@/types";


export default function Simulator() {
  const [faData, setFAData] = useState<AutomataSchema | null>(null);
  return (
    <div className="font-sans min-h-screen pt-16 relative">
      <div className="flex">
        <FAForm onSubmit={setFAData}/>
        {
          faData && (
            <div className="flex-1 p-4">
              <h2 className="text-2xl font-semibold mb-4 text-white">Automaton Details</h2>
              <div className="bg-gray-600 p-4">
                <p className="text-white mb-2"><strong>Type:</strong> {faData.type}</p>
                <p className="text-white mb-2"><strong>States:</strong> {faData.states.join(', ')}</p>
                <p className="text-white"><strong>Symbols:</strong> {faData.symbols.join(', ')}</p>
              </div>
              <Table type={faData.type} states={faData.states} symbols={faData.symbols}/>
            </div>
          )
        }
      </div>
    </div>
  );
}
