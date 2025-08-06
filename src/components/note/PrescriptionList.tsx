
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';

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
  const isPrescriptionChecked = (prescriptionId: string) => {
    // Only return checked if the prescription is in selectedPrescriptions array
    return selectedPrescriptions.includes(prescriptionId);
  };

  const handlePrescriptionChange = (prescriptionId: string, checked: boolean) => {
    onPrescriptionChange(prescriptionId, checked);
  };

  const handlePrescribeClick = () => {
    console.log('Prescribe button clicked');
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-green-600 font-medium text-sm">Prescriptions</h4>
        <button
          onClick={handlePrescribeClick}
          className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors shadow-sm text-xs"
        >
          <Plus className="w-3 h-3" />
          Prescribe
        </button>
      </div>
      <div className="space-y-2">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="flex items-center gap-2 text-xs">
            <Checkbox
              id={prescription.id}
              checked={isPrescriptionChecked(prescription.id)}
              onCheckedChange={(checked) => handlePrescriptionChange(prescription.id, !!checked)}
            />
            <label 
              htmlFor={prescription.id} 
              className={`cursor-pointer ${prescription.active ? 'text-green-700 font-medium' : 'text-gray-500'}`}
            >
              {prescription.name} [{prescription.active ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 91) + 90}]
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionList;
