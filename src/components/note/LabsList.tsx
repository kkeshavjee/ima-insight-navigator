
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

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
  const isLabChecked = (labId: string, isActive: boolean) => {
    if (isActive) return true;
    return selectedLabs.includes(labId);
  };

  const handleLabChange = (labId: string, checked: boolean) => {
    const lab = labs.find(l => l.id === labId);
    if (lab?.active) return; // Don't allow unchecking active labs
    onLabChange(labId, checked);
  };

  return (
    <div className="mb-4">
      <h4 className="text-green-600 font-medium mb-2 text-sm">Labs</h4>
      <div className="space-y-2">
        {labs.map((lab) => (
          <div key={lab.id} className="flex items-center gap-2 text-xs">
            <Checkbox
              id={lab.id}
              checked={isLabChecked(lab.id, lab.active)}
              onCheckedChange={(checked) => handleLabChange(lab.id, !!checked)}
              disabled={lab.active}
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
