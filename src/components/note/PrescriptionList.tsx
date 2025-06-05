
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface Prescription {
  id: string;
  name: string;
  active: boolean;
}

interface PrescriptionListProps {
  prescriptions: Prescription[];
  selectedPrescriptions: string[];
  onPrescriptionChange: (prescriptionId: string, checked: boolean) => void;
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({
  prescriptions,
  selectedPrescriptions,
  onPrescriptionChange
}) => {
  const isPrescriptionChecked = (prescriptionId: string, isActive: boolean) => {
    return isActive || selectedPrescriptions.includes(prescriptionId);
  };

  return (
    <div className="mb-4">
      <h4 className="text-green-600 font-medium mb-2 text-sm">Prescriptions</h4>
      <div className="space-y-2">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="flex items-center gap-2 text-xs">
            <Checkbox
              id={prescription.id}
              checked={isPrescriptionChecked(prescription.id, prescription.active)}
              onCheckedChange={(checked) => onPrescriptionChange(prescription.id, checked as boolean)}
            />
            <label 
              htmlFor={prescription.id} 
              className={`cursor-pointer ${prescription.active ? 'text-green-700 font-medium' : 'text-gray-500'}`}
            >
              {prescription.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionList;
