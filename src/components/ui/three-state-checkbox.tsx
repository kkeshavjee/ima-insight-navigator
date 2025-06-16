
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X, Minus } from 'lucide-react';

export type ThreeState = 'yes' | 'no' | 'not-examined';

interface ThreeStateCheckboxProps {
  id?: string;
  value: ThreeState;
  onChange: (value: ThreeState) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

const ThreeStateCheckbox: React.FC<ThreeStateCheckboxProps> = ({
  id,
  value,
  onChange,
  label,
  disabled = false,
  className = ""
}) => {
  const handleClick = () => {
    if (disabled) return;
    
    // Cycle through states: not-examined -> no -> yes -> not-examined
    switch (value) {
      case 'not-examined':
        onChange('no');
        break;
      case 'no':
        onChange('yes');
        break;
      case 'yes':
        onChange('not-examined');
        break;
    }
  };

  const getStateDisplay = () => {
    switch (value) {
      case 'yes':
        return {
          icon: <Check className="h-3 w-3" />,
          bgColor: 'bg-red-500',
          textColor: 'text-red-700',
          label: 'Yes'
        };
      case 'no':
        return {
          icon: <X className="h-3 w-3" />,
          bgColor: 'bg-green-500',
          textColor: 'text-green-700',
          label: 'No'
        };
      case 'not-examined':
        return {
          icon: <Minus className="h-3 w-3" />,
          bgColor: 'bg-gray-400',
          textColor: 'text-gray-600',
          label: 'Not Examined'
        };
    }
  };

  const stateDisplay = getStateDisplay();

  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      <button
        type="button"
        id={id}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "w-4 h-4 rounded-sm border text-white flex items-center justify-center transition-colors",
          stateDisplay.bgColor,
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80"
        )}
      >
        {stateDisplay.icon}
      </button>
      <label 
        htmlFor={id}
        className={cn(
          "cursor-pointer select-none",
          stateDisplay.textColor,
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={!disabled ? handleClick : undefined}
      >
        {label}
      </label>
      <span className={cn("text-xs font-medium", stateDisplay.textColor)}>
        ({stateDisplay.label})
      </span>
    </div>
  );
};

export default ThreeStateCheckbox;
