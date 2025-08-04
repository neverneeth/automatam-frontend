'use client';
import DropdownMenu from "./DropdownMenu";
import { AutomataSchema } from "@/types";
import { useState } from "react";
import { FormEvent } from 'react'

type AddFAFormProps = {
    onSubmit: (data: AutomataSchema) => void;
};

export default function FAForm({onSubmit}: AddFAFormProps) {
    const [type, setType] = useState<'DFA' | 'NFA' | 'PDA'>("DFA");
    const [states, setStates] = useState<string>("");
    const [symbols, setSymbols] = useState<string>("");
    const handleSubmit = (e : FormEvent) => {
        e.preventDefault();
        if (!states || !symbols) {
            alert("Please enter states and symbols.");
            return;
        }
        const newFA: AutomataSchema ={
            type,
            states: states.split(',').map(s => s.trim()),
            symbols: symbols.split(',').map(s => s.trim()),
        };
        if (newFA.states.some(state => state === "") || newFA.symbols.some(symbol => symbol === "")) {
            alert("Please ensure all states and symbols are non-empty.");
            return;
        }
        onSubmit(newFA);
        setType('DFA');
        setStates('');
        setSymbols('');
    };

    return (
        <div className="border-r border-gray-700 bg-(--background) shadow-md p-4 min-h-screen w-64">
            <h2 className="text-xl font-semibold mb-4 text-white">Describe Automaton</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <DropdownMenu initialSelected={{ label: type, value: type.toLowerCase() }}
                        onSelect={option => setType(option.label as 'DFA' | 'NFA' | 'PDA')}
                    />
                </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">States</label>
                <input
                value={states}
                type="text"
                placeholder="q0, q1, q2"
                onChange={(e) => setStates(e.target.value)}
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Alphabet</label>
                <input
                value={symbols}
                onChange={(e) => setSymbols(e.target.value)}
                type="text"
                placeholder="a, b, c"
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
                Submit
            </button>
            </form>
        </div>

    );
}