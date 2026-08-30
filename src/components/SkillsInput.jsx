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
        className="input-premium h-12 w-full"
      />

      {/* Selected Skills Chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {value.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 bg-primary-accent/10 border border-primary-accent/30 text-primary-accent px-3 py-1.5 rounded-xl text-sm font-semibold animate-fade-in shadow-[0_0_10px_rgba(124,58,237,0.1)]"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemove(skill)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 glass-panel border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Max height of approx 5 items (240px) with vertical scroll */}
          <ul className="max-h-[240px] overflow-y-auto p-2 custom-scrollbar">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <li
                  key={skill}
                  onClick={() => handleSelect(skill)}
                  className="px-4 py-3 cursor-pointer text-gray-300 hover:bg-primary-accent/20 hover:text-white rounded-xl transition-colors font-medium"
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
