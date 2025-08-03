import DropdownMenu from "./DropdownMenu";
import Form from "next/form";

export default function FAForm() {
  return (
    <div className="border-r border-gray-700 bg-(--background) shadow-md p-4 h-[calc(100vh-64px)] w-64">
        <h2 className="text-xl font-semibold mb-4 text-white">Describe Automaton</h2>
        <form className="space-y-4">
            <div>
                <DropdownMenu />
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">States</label>
            <input
              type="text"
              placeholder="q0, q1, q2"
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Alphabet</label>
            <input
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