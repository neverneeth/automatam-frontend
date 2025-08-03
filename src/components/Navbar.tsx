"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Simulator", href: "/simulator" },
    { name: "Coming Soon", href: "/" },
  ];

  return (
    <nav className="bg-(--background) backdrop-blur-sm text-white border-b border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        
        <ul
          className={`
            md:flex md:space-x-8 md:items-center text-lg font-medium
            ${isMobileMenuOpen ? 'block' : 'hidden'}
            md:block absolute md:static top-16 left-0 w-full md:w-auto bg-black bg-opacity-90 md:bg-transparent px-4 py-4 md:p-0
          `}
        >
          {navItems.map((item, index) => (
            <li key={index} className="py-2 md:py-0 text-center">
              <Link
                href={item.href}
                className="inline-block px-4 py-1 rounded-4xl hover:bg-white hover:text-black transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
