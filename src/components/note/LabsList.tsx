
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';

interface Lab {
  id: string;
  name: string;
  timing: string;
  active: boolean;
}

interface LabsListProps {
  labs: Lab[];
  selectedLabs: string[];
  onLabChange: (labId: string, checked: boolean) => void;
}

const LabsList: React.FC<LabsListProps> = ({
  labs,
  selectedLabs,
  onLabChange
}) => {
  const isLabChecked = (labId: string) => {
    // Only return checked if the lab is in selectedLabs array
    return selectedLabs.includes(labId);
  };

  const handleLabChange = (labId: string, checked: boolean) => {
    onLabChange(labId, checked);
  };

  const handleOrderClick = () => {
    console.log('Order button clicked');
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-green-600 font-medium text-sm">Labs</h4>
        <button
          onClick={handleOrderClick}
          className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm text-xs"
        >
          <Plus className="w-3 h-3" />
          Order
        </button>
      </div>
      <div className="space-y-2">
        {labs.map((lab) => (
          <div key={lab.id} className="flex items-center gap-2 text-xs">
            <Checkbox
              id={lab.id}
              checked={isLabChecked(lab.id)}
              onCheckedChange={(checked) => handleLabChange(lab.id, !!checked)}
            />
            <label 
              htmlFor={lab.id} 
              className={`cursor-pointer ${lab.active ? 'text-green-700 font-medium' : 'text-gray-500'}`}
            >
              {lab.name} {lab.timing && `(${lab.timing})`}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabsList;
