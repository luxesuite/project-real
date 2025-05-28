'use client';
import Flag from 'react-world-flags';
import { useState, useRef, useEffect } from 'react';

const options: string[] = Array.from({ length: 20 }, (_, i) => `NIG ${i + 1}`);

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-16" ref={dropdownRef}>
      <div
        className="bg-gray-100 border border-gray-300 rounded px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected || 'NIG'}
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-48 overflow-y-auto z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
