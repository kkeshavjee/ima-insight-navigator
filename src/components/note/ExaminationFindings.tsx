
import React, { useState } from 'react';
import ThreeStateCheckbox, { ThreeState } from '@/components/ui/three-state-checkbox';

interface ExaminationFinding {
  id: string;
  label: string;
  value: ThreeState;
}

const ExaminationFindings: React.FC = () => {
  const [findings, setFindings] = useState<ExaminationFinding[]>([
    { id: 'abd-tenderness', label: 'Abdominal tenderness', value: 'not-examined' },
    { id: 'heart-murmur', label: 'Heart murmur', value: 'not-examined' },
    { id: 'lung-rales', label: 'Lung rales/crackles', value: 'not-examined' },
    { id: 'peripheral-edema', label: 'Peripheral edema', value: 'not-examined' },
    { id: 'skin-rash', label: 'Skin rash', value: 'not-examined' },
  ]);

  const handleFindingChange = (findingId: string, value: ThreeState) => {
    setFindings(prev => 
      prev.map(finding => 
        finding.id === findingId 
          ? { ...finding, value }
          : finding
      )
    );
  };

  return (
    <div className="mb-4">
      <h4 className="text-blue-600 font-medium mb-2 text-sm">Physical Examination Findings</h4>
      <div className="space-y-2 bg-blue-50 p-3 rounded">
        {findings.map((finding) => (
          <ThreeStateCheckbox
            key={finding.id}
            id={finding.id}
            value={finding.value}
            onChange={(value) => handleFindingChange(finding.id, value)}
            label={finding.label}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Click checkboxes to cycle through: Not Examined → Yes → No → Not Examined
      </p>
    </div>
  );
};

export default ExaminationFindings;
