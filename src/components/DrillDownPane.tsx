import React, { useState } from 'react';
import IntervalHistoryCard from './drill-down/IntervalHistoryCard';
import LabTrendChart from './drill-down/LabTrendChart';

interface DrillDownPaneProps {
  selectedNodeData: any;
  selectedPatientId: string;
}

const DrillDownPane = ({ selectedNodeData, selectedPatientId }: DrillDownPaneProps) => {
  const [selectedLabName, setSelectedLabName] = useState<string | null>(null);
  const [isLabChartOpen, setIsLabChartOpen] = useState(false);

  console.log('DrillDownPane rendered with:', { selectedNodeData, selectedPatientId });

  const mockLabTrendData = [
    { date: '2024-01-01', value: 75, status: 'Normal' },
    { date: '2024-01-08', value: 80, status: 'Normal' },
    { date: '2024-01-15', value: 90, status: 'Elevated' },
    { date: '2024-01-22', value: 85, status: 'Normal' },
    { date: '2024-01-29', value: 95, status: 'Elevated' },
  ];

  const mockIntervalHistory = {
    labTests: [
      { name: 'Glucose', value: '90', date: '2024-01-29', status: 'Normal', change: 'Stable' },
      { name: 'Sodium', value: '140', date: '2024-01-29', status: 'Normal', change: 'Stable' },
      { name: 'Potassium', value: '4.0', date: '2024-01-29', status: 'Normal', change: 'Stable' },
    ],
    specialistNotes: [
      { specialist: 'Dr. Smith', date: '2024-01-25', summary: 'Discussed medication options.', type: 'Cardiology' },
    ],
    erDischargeSummaries: [
      { date: '2024-01-20', chiefComplaint: 'Chest pain', disposition: 'Discharged', diagnosis: 'Non-cardiac chest pain' },
    ],
    radiologyReports: [
      { study: 'Chest X-Ray', date: '2024-01-15', findings: 'No acute findings.', impression: 'Normal chest x-ray.' },
    ],
  };

  const handleLabClick = (labName: string) => {
    setSelectedLabName(labName);
    setIsLabChartOpen(true);
  };

  if (!selectedNodeData) {
    console.log('No selectedNodeData, showing placeholder');
    return (
      <div className="p-4 text-center text-gray-500">
        Select a node to view details
      </div>
    );
  }

  console.log('Rendering IntervalHistoryCard with data');
  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-2">
      <div className="bg-white rounded-lg shadow-sm p-3 mb-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">History Details</h3>
        <p className="text-xs text-gray-500">Selected: {selectedNodeData?.label || 'Unknown'}</p>
      </div>
      
      <IntervalHistoryCard 
        intervalHistory={mockIntervalHistory}
        onLabClick={handleLabClick}
      />
      
      {selectedLabName && (
        <LabTrendChart
          labName={selectedLabName}
          data={mockLabTrendData}
          open={isLabChartOpen}
          onOpenChange={setIsLabChartOpen}
        />
      )}
    </div>
  );
};

export default DrillDownPane;
