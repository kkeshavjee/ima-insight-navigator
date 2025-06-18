import React, { useState } from 'react';
import NodeDetailsView from './NodeDetailsView';
import IntervalHistoryCard from './drill-down/IntervalHistoryCard';
import LabTrendChart from './drill-down/LabTrendChart';

interface DrillDownPaneProps {
  selectedNode: any;
}

const DrillDownPane = ({ selectedNode }: DrillDownPaneProps) => {
  const [selectedLabName, setSelectedLabName] = useState<string | null>(null);
  const [isLabChartOpen, setIsLabChartOpen] = useState(false);

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

  const handleCloseLabChart = () => {
    setIsLabChartOpen(false);
    setSelectedLabName(null);
  };

  if (!selectedNode) {
    return (
      <div className="p-4 text-center text-gray-500">
        Select a node to view details
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <NodeDetailsView 
        node={selectedNode} 
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
