
import React from 'react';
import { Activity, AlertCircle, Pill } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: string;
}

interface PatientProfilePaneProps {
  selectedPatientId: string | null;
  onNodeSelect: (node: Node) => void;
}

const PatientProfilePane: React.FC<PatientProfilePaneProps> = ({ selectedPatientId, onNodeSelect }) => {
  // Mock nodes for the selected patient
  const patientNodes: Record<string, Node[]> = {
    p001: [
      { id: 'node_htn', label: 'Hypertension', type: 'Condition' },
      { id: 'node_dm', label: 'Diabetes Mellitus Type 2', type: 'Condition' },
      { id: 'node_med_lisinopril', label: 'Lisinopril', type: 'Medication' },
      { id: 'node_med_metformin', label: 'Metformin', type: 'Medication' },
    ],
    p002: [
      { id: 'node_asthma', label: 'Asthma', type: 'Condition' },
      { id: 'node_med_albuterol', label: 'Albuterol Inhaler', type: 'Medication' },
    ],
    p003: [
      { id: 'node_headache', label: 'Chronic Headaches', type: 'Condition' },
    ],
  };

  const nodesToDisplay = selectedPatientId ? (patientNodes[selectedPatientId] || []) : [];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'Condition':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'Medication':
        return <Pill className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Condition':
        return 'bg-red-50 hover:bg-red-100 border-red-200';
      case 'Medication':
        return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
      default:
        return 'bg-gray-50 hover:bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="h-full bg-sky-100 p-4 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-sky-600" />
        <h2 className="text-xl font-semibold text-sky-700">Patient Knowledge Graph</h2>
      </div>
      {selectedPatientId ? (
        <div>
          <p className="text-slate-600 mb-3">
            Interactive graph for Patient: <span className="font-medium text-sky-600">{selectedPatientId}</span>
          </p>
          <div className="mt-2 border-2 border-dashed border-sky-300 rounded-md min-h-[10rem] p-3">
            {nodesToDisplay.length > 0 ? (
              <div className="space-y-2">
                {nodesToDisplay.map(node => (
                  <div
                    key={node.id}
                    onClick={() => onNodeSelect(node)}
                    className={`p-3 rounded-lg border cursor-pointer text-sm transition-all duration-200 transform hover:scale-[1.02] ${getNodeColor(node.type)}`}
                  >
                    <div className="flex items-center gap-2">
                      {getNodeIcon(node.type)}
                      <span className="font-medium">{node.label}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{node.type}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sky-500 text-center py-8">No graph nodes available for this patient.</p>
            )}
            <p className="text-xs text-sky-400 mt-4 text-center italic">
              (Click nodes to view detailed information)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-40">
          <p className="text-slate-500 text-center">Select a patient from the schedule to view their knowledge graph.</p>
        </div>
      )}
    </div>
  );
};

export default PatientProfilePane;
