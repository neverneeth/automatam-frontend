import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h1 className="text-4xl font-bold text-center sm:text-left">
            Welcome to Automatam
          </h1>
          <p className="text-lg text-gray-400 text-center sm:text-left">
            Explore and visualize automata theory concepts.
          </p>
          <Link
            href="/simulator"
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 hover:text-gray-400 transition-colors duration-200"
          >
            Start Simulator
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 ml-2 my-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
