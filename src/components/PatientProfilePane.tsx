
import React from 'react';
import { Activity, Heart, Users, Scissors, User } from 'lucide-react';

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
      { id: 'node_social_smoking', label: 'Former Smoker (20 pack-years)', type: 'Social History' },
      { id: 'node_surgery_appendix', label: 'Appendectomy (2015)', type: 'Surgical History' },
      { id: 'node_family_dm', label: 'Father - Diabetes', type: 'Family History' },
    ],
    p002: [
      { id: 'node_asthma', label: 'Asthma', type: 'Condition' },
      { id: 'node_social_exercise', label: 'Regular Exercise', type: 'Social History' },
      { id: 'node_family_asthma', label: 'Mother - Asthma', type: 'Family History' },
    ],
    p003: [
      { id: 'node_headache', label: 'Chronic Headaches', type: 'Condition' },
      { id: 'node_social_alcohol', label: 'Social Drinker', type: 'Social History' },
    ],
  };

  const nodesToDisplay = selectedPatientId ? (patientNodes[selectedPatientId] || []) : [];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'Condition':
        return <Heart className="w-3 h-3 text-red-500" />;
      case 'Social History':
        return <User className="w-3 h-3 text-green-500" />;
      case 'Surgical History':
        return <Scissors className="w-3 h-3 text-purple-500" />;
      case 'Family History':
        return <Users className="w-3 h-3 text-orange-500" />;
      default:
        return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Condition':
        return 'bg-red-50 hover:bg-red-100 border-red-200';
      case 'Social History':
        return 'bg-green-50 hover:bg-green-100 border-green-200';
      case 'Surgical History':
        return 'bg-purple-50 hover:bg-purple-100 border-purple-200';
      case 'Family History':
        return 'bg-orange-50 hover:bg-orange-100 border-orange-200';
      default:
        return 'bg-gray-50 hover:bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="h-full bg-indigo-100 p-3 shadow-md overflow-y-auto">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-indigo-600" />
        <h2 className="text-sm font-semibold text-indigo-700">Patient History</h2>
      </div>
      {selectedPatientId ? (
        <div>
          <div className="mt-2 border-2 border-dashed border-indigo-300 rounded-md min-h-[8rem] p-2">
            {nodesToDisplay.length > 0 ? (
              <div className="space-y-2">
                {nodesToDisplay.map(node => (
                  <div
                    key={node.id}
                    onClick={() => onNodeSelect(node)}
                    className={`p-2 rounded-lg border cursor-pointer text-xs transition-all duration-200 transform hover:scale-[1.02] ${getNodeColor(node.type)}`}
                  >
                    <div className="flex items-center gap-2">
                      {getNodeIcon(node.type)}
                      <span className="font-medium">{node.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-indigo-500 text-center py-6 text-sm">No graph nodes available for this patient.</p>
            )}
            <p className="text-xs text-indigo-400 mt-3 text-center italic">
              (Click nodes to view detailed information)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <p className="text-slate-500 text-center text-sm">Select a patient from the schedule to view their knowledge graph.</p>
        </div>
      )}
    </div>
  );
};

export default PatientProfilePane;
