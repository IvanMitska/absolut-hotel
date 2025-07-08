import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useMobileMenu } from '../../contexts/MobileMenuContext';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const { isMenuOpen } = useMobileMenu();

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Закрываем выпадающий список при открытии мобильного меню
  useEffect(() => {
    if (isMenuOpen) {
      setIsOpen(false);
    }
  }, [isMenuOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative flex items-center gap-2" ref={selectRef}>
      {label && <label className="text-sm font-medium text-slate-600">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          className="bg-white border border-slate-300 rounded-lg py-2 pl-3 pr-8 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition w-full text-left"
        >
          {selectedOption?.label}
          <ChevronDown 
            className={`w-4 h-4 text-slate-500 absolute top-1/2 right-3 -translate-y-1/2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-1 min-w-full w-max bg-white border border-slate-200 rounded-lg shadow-lg z-[80] overflow-hidden">
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-teal-50 cursor-pointer"
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="w-4 h-4 text-teal-500" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect; 