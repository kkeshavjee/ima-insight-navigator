
import React from 'react';
import { FileText } from 'lucide-react';
import IntervalHistoryCard from './drill-down/IntervalHistoryCard';
import NodeDetailsView from './drill-down/NodeDetailsView';

interface DrillDownPaneProps {
  selectedNodeData: any;
}

const DrillDownPane: React.FC<DrillDownPaneProps> = ({ selectedNodeData }) => {
  const getMockDetails = (node: any) => {
    if (!node) return null;
    
    if (node.id === 'node_htn') {
      return {
        medications: [
          { name: 'Lisinopril 20mg', dosage: 'Once daily', class: 'ACE Inhibitor' },
          { name: 'Amlodipine 10mg', dosage: 'Once daily', class: 'Calcium Channel Blocker' }
        ],
        labs: [
          { name: 'Potassium', value: '4.1 mEq/L', date: '2024-05-01', status: 'Normal' },
          { name: 'Creatinine', value: '1.0 mg/dL', date: '2024-05-01', status: 'Normal' }
        ],
        visits: [
          { date: '2024-04-15', summary: 'BP check, stable at 135/85. Continue current regimen.' }
        ],
        recentVisits: [
          { date: '2024-05-15', reason: 'Follow-up' },
          { date: '2024-04-15', reason: 'Routine Check' }
        ]
      };
    }
    
    if (node.id === 'node_dm') {
      return {
        medications: [
          { name: 'Metformin 1000mg', dosage: 'Twice daily', class: 'Biguanide' }
        ],
        labs: [
          { name: 'HbA1c', value: '7.2%', date: '2024-03-10', status: 'Elevated' },
          { name: 'Glucose, Fasting', value: '130 mg/dL', date: '2024-03-10', status: 'Elevated' }
        ],
        visits: [
          { date: '2024-03-15', summary: 'Diabetes management discussed. A1C trending down.' }
        ],
        recentVisits: [
          { date: '2024-04-20', reason: 'Diabetes Management' },
          { date: '2024-03-15', reason: 'Follow-up' }
        ]
      };
    }
    
    if (node.id === 'node_social_smoking') {
      return {
        medications: [],
        labs: [],
        visits: [],
        recentVisits: [
          { date: '2024-05-10', reason: 'Smoking Cessation' }
        ]
      };
    }
    
    if (node.id === 'node_surgery_appendix') {
      return {
        medications: [],
        labs: [],
        visits: [],
        recentVisits: [
          { date: '2024-02-10', reason: 'Annual Physical' }
        ]
      };
    }
    
    if (node.id === 'node_family_dm') {
      return {
        medications: [],
        labs: [],
        visits: [],
        recentVisits: [
          { date: '2024-05-15', reason: 'Follow-up' }
        ]
      };
    }
    
    return { medications: [], labs: [], visits: [], recentVisits: [] };
  };

  const getIntervalHistory = () => {
    return {
      newMedications: [
        { name: 'Amlodipine 10mg', date: '2024-05-10', reason: 'Added for better BP control' }
      ],
      newLabs: [
        { name: 'Potassium', value: '4.1 mEq/L', date: '2024-05-01', status: 'Normal', change: 'New' },
        { name: 'Creatinine', value: '1.0 mg/dL', date: '2024-05-01', status: 'Normal', change: 'Stable' }
      ],
      clinicalChanges: [
        { date: '2024-05-10', description: 'Blood pressure improved from 145/95 to 135/85' },
        { date: '2024-05-08', description: 'Patient reports better medication compliance' }
      ],
      upcomingActions: [
        { action: 'Recheck BP in 2 weeks', dueDate: '2024-05-29' },
        { action: 'Schedule annual eye exam', dueDate: '2024-06-15' }
      ]
    };
  };

  const details = getMockDetails(selectedNodeData);
  const intervalHistory = getIntervalHistory();

  return (
    <div className="h-full bg-indigo-100 p-3 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-4 h-4 text-indigo-600" />
        <h2 className="text-sm font-semibold text-indigo-700">History Details</h2>
      </div>
      
      {!selectedNodeData ? (
        <IntervalHistoryCard intervalHistory={intervalHistory} />
      ) : (
        <NodeDetailsView selectedNodeData={selectedNodeData} details={details} />
      )}
    </div>
  );
};

export default DrillDownPane;
