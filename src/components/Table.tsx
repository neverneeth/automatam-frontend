'use client';
import { AutomataSchema } from "@/types";
import { useState } from "react";
import { useEffect } from "react";
import { Payload } from "@/types";

export default function Table({type, states, symbols}: {type: string; states: string[]; symbols: string[]}) {
  const stateCount: number = states.length;
  const symbolCount: number = symbols.length;
  const [startState, setStartState] = useState<string | null>(null);
  const [finalStates, setFinalStates] = useState<Set<string>>(new Set());

  const [transitionTable, setTransitionTable] = useState<string[][]>(
    Array.from({ length: stateCount }, () => Array(symbolCount).fill(''))
  );

  const handleTransitionChange = (stateIndex: number, symbolIndex: number, value: string) => {
    const newTable = [...transitionTable];
    newTable[stateIndex][symbolIndex] = value;
    setTransitionTable(newTable);
  };

  useEffect(() => {
    setTransitionTable(
      Array.from({ length: states.length }, () => Array(symbols.length).fill(''))
    );
  }, [states, symbols]);
  
  return (
    <div className="border-r border-gray-700 bg-[#0a0a0a] shadow-md p-4 min-h-screen">
      <form className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Transition Table</h2>
        <p className="text-gray-300 mb-2">
          {
            type === 'DFA'
                ? "DFA Transition Table. Enter one transition state per cell."
              : type === 'NFA'
                ? "NFA Transition Table. Enter set of comma separated transition state per cell."
                : type === 'PDA'
                  ? "PDA Transition Table. PDA's have not been implemented. You will not be able to simulate PDA's."
                  : "Transition Table for the automaton."
          }
        </p>
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
          <tr>
            <th className="px-4 py-2">States</th>
            <th className="px-4 py-2">Start</th>
            <th className="px-4 py-2">Final</th>
            {symbols.map((symbol, index) => (
              <th key={index} className="px-4 py-2">{symbol}</th>
            ))}
          </tr>
          </thead>
          <tbody>
            {states.map((state, stateIndex) => (
              <tr key={stateIndex} className="hover:bg-gray-700">
                <td className="px-4 py-2">{state}</td>
                <td className="px-4 py-2">
                  <input
                    type="radio"
                    name="start-state"
                    checked={startState === state}
                    onChange={() => setStartState(state)}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={finalStates.has(state)}
                    onChange={() => {
                      const updated = new Set(finalStates);
                      if (updated.has(state)) {
                        updated.delete(state);
                      } else {
                        updated.add(state);
                      }
                      console.log("Final States Updated:", updated);
                      console.log("Final States:", Array.from(updated));
                      console.log("Final States Count:", updated.size);
                      setFinalStates(updated);
                    }}
                  />
                </td>
                {symbols.map((symbol, symbolIndex) => (
                  <td key={symbolIndex} className="px-4 py-2">
                    <input
                      type="text"
                      value={transitionTable[stateIndex]?.[symbolIndex] ?? ""}
                      onChange={(e) => handleTransitionChange(stateIndex, symbolIndex, e.target.value)}
                      className="w-full bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button 
          type="button"
          onClick={async (e) => {
            const payload: Payload = {
              type: type.toLowerCase() as 'dfa' | 'nfa',
              states,
              symbols,
              startState: startState || '',
              finalStates: Array.from(finalStates),
              transitionTable: Object.fromEntries(
                states.map((state, stateIndex) => [
                  state,
                  Object.fromEntries(
                    symbols.map((symbol, symbolIndex) => [
                      symbol,
                      transitionTable[stateIndex][symbolIndex] || ''
                    ])
                  )
                ])
              )
            };
            if (!payload.startState) {
              alert("Please select a start state.");
              return;
            }
            if (payload.finalStates.length === 0) { 
              alert("Please select at least one final state.");
              return;
            } 
            console.log("Payload to be sent:", payload);
            const response = await fetch('https://webhook.site/4e920243-f646-4ac5-8c72-23162eb7626e', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            })
            console.log("Response from server:", response);
          }}

          className="w-full px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
        >
          Submit
        </button>

      </form>
        

    </div>
  );
}