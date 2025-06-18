

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
      <div className="h-full bg-indigo-100 p-2 shadow-md overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">History Details</h3>
            <p className="text-indigo-500">
              {selectedPatientId ? 'Click on a node in Patient History to view details' : 'Select a patient to view details'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  console.log('Rendering IntervalHistoryCard with data for node:', selectedNodeData.label);
  return (
    <div className="h-full bg-indigo-100 p-2 shadow-md overflow-y-auto">
      <div className="bg-white rounded-lg shadow-sm p-3 mb-3">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">History Details</h3>
        <p className="text-sm text-indigo-600">Selected: {selectedNodeData?.label || 'Unknown'}</p>
        <p className="text-xs text-indigo-500">Type: {selectedNodeData?.type || 'Unknown'}</p>
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

