import React, { useState, useRef, useEffect } from 'react';
import { SKILLS } from '../utils/skillConstants';

const SkillsInput = ({ value = [], onChange }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter skills based on query and exclude already selected skills
  const filteredSkills = SKILLS.filter(
    (skill) =>
      skill.toLowerCase().includes(query.toLowerCase()) &&
      !value.includes(skill)
  );

  const handleSelect = (skill) => {
    if (!value.includes(skill)) {
      onChange([...value, skill]);
    }
    setQuery('');
    setIsOpen(false); 
  };

  const handleRemove = (skillToRemove) => {
    onChange(value.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder={value.length > 0 ? "Search more skills..." : "Search skills (e.g. React, Node)"}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="h-12 px-5 w-full rounded-full bg-[#0b0b10] border border-white/10 
                   text-lg text-white focus:border-pink-500 outline-none transition-all"
      />

      {/* Selected Skills Chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {value.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 bg-[#e91e63]/20 border border-[#e91e63]/50 text-pink-300 px-3 py-1.5 rounded-full text-sm font-medium animate-fade-in"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemove(skill)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#1a1a24] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Max height of approx 5 items (240px) with vertical scroll */}
          <ul className="max-h-[240px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-transparent">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <li
                  key={skill}
                  onClick={() => handleSelect(skill)}
                  className="px-4 py-3 cursor-pointer text-gray-300 hover:bg-[#e91e63]/20 hover:text-white rounded-xl transition-colors font-medium"
                >
                  {skill}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-gray-500 text-center font-medium">
                No matching skills found.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillsInput;
