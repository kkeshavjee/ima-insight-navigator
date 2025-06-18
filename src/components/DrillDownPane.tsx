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
      labTests: [
        { name: 'Potassium', value: '4.1 mEq/L', date: '2024-05-01', status: 'Normal', change: 'New' },
        { name: 'Creatinine', value: '1.0 mg/dL', date: '2024-05-01', status: 'Normal', change: 'Stable' },
        { name: 'HbA1c', value: '7.0%', date: '2024-05-10', status: 'Elevated', change: 'Improved' }
      ],
      specialistNotes: [
        { specialist: 'Dr. Smith', date: '2024-05-08', summary: 'Blood pressure well controlled. Continue current medications.', type: 'Cardiology' },
        { specialist: 'Dr. Johnson', date: '2024-04-28', summary: 'Diabetic retinal screening - no changes from baseline.', type: 'Ophthalmology' }
      ],
      erDischargeSummaries: [
        { date: '2024-04-25', chiefComplaint: 'Chest pain', disposition: 'Discharged home', diagnosis: 'Atypical chest pain, rule out cardiac' }
      ],
      radiologyReports: [
        { study: 'Chest X-ray', date: '2024-05-05', findings: 'Clear lung fields, normal heart size', impression: 'No acute cardiopulmonary abnormalities' },
        { study: 'Abdominal US', date: '2024-04-30', findings: 'Normal liver echogenicity, no gallstones', impression: 'Normal abdominal ultrasound' }
      ]
    };
  };

  const details = getMockDetails(selectedNodeData);
  const intervalHistory = getIntervalHistory();

  return (
    <div className="h-full bg-indigo-100 p-2 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-1 mb-2">
        <FileText className="w-3 h-3 text-indigo-600" />
        <h2 className="text-xs font-semibold text-indigo-700">History Details</h2>
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
