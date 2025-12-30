
import React from 'react';

interface ChipGroupProps<T extends string> {
  options: T[];
  selected: T;
  onChange: (value: T) => void;
}

export function ChipGroup<T extends string>({ options, selected, onChange }: ChipGroupProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm border ${
              isSelected
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
