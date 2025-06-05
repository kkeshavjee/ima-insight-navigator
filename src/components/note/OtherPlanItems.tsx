
import React from 'react';

interface OtherPlanItemsProps {
  items: string[];
}

const OtherPlanItems: React.FC<OtherPlanItemsProps> = ({ items }) => {
  return (
    <div>
      <h4 className="text-green-600 font-medium mb-2 text-sm">Other</h4>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-slate-700 text-xs bg-gray-50 p-2 rounded flex items-start gap-2">
            <span className="text-rose-500 font-bold">{index + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OtherPlanItems;
