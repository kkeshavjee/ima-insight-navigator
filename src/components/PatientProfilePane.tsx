
import React from 'react';
import { Activity, Heart, Users, Scissors, User, FlaskConical } from 'lucide-react';
import { graphService } from '@/services/graph-service';

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
  // Get nodes from the graph service for the selected patient
  const getPatientNodes = (patientId: string): Node[] => {
    const graph = graphService.getPatientGraph(patientId);
    if (!graph) return [];
    
    // Filter out the patient node itself and return the rest
    return graph.nodes
      .filter(node => node.type !== 'Patient')
      .map(node => ({
        id: node.id,
        label: node.label,
        type: node.type
      }));
  };

  const nodesToDisplay = selectedPatientId ? getPatientNodes(selectedPatientId) : [];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'Condition':
        return <Heart className="w-3 h-3 text-red-500" />;
      case 'SocialHistory':
        return <User className="w-3 h-3 text-green-500" />;
      case 'Procedure':
        return <Scissors className="w-3 h-3 text-purple-500" />;
      case 'FamilyHistory':
        return <Users className="w-3 h-3 text-orange-500" />;
      case 'Lab':
        return <FlaskConical className="w-3 h-3 text-blue-500" />;
      case 'Medication':
        return <Activity className="w-3 h-3 text-emerald-500" />;
      default:
        return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Condition':
        return 'bg-red-50 hover:bg-red-100 border-red-200';
      case 'SocialHistory':
        return 'bg-green-50 hover:bg-green-100 border-green-200';
      case 'Procedure':
        return 'bg-purple-50 hover:bg-purple-100 border-purple-200';
      case 'FamilyHistory':
        return 'bg-orange-50 hover:bg-orange-100 border-orange-200';
      case 'Lab':
        return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
      case 'Medication':
        return 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200';
      default:
        return 'bg-gray-50 hover:bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="h-full bg-indigo-100 p-2 shadow-md overflow-y-auto">
      <div className="flex items-center gap-1 mb-2">
        <Activity className="w-3 h-3 text-indigo-600" />
        <h2 className="text-xs font-semibold text-indigo-700">Patient History</h2>
      </div>
      {selectedPatientId ? (
        <div>
          <div className="mt-2 border-2 border-dashed border-indigo-300 rounded-md min-h-[6rem] p-2">
            {nodesToDisplay.length > 0 ? (
              <div className="space-y-1">
                {nodesToDisplay.map(node => (
                  <div
                    key={node.id}
                    onClick={() => onNodeSelect(node)}
                    className={`p-1.5 rounded-lg border cursor-pointer text-xs transition-all duration-200 transform hover:scale-[1.02] ${getNodeColor(node.type)}`}
                  >
                    <div className="flex items-center gap-1">
                      {getNodeIcon(node.type)}
                      <span className="font-medium text-xs">{node.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-indigo-500 text-center py-4 text-xs">No graph nodes available for this patient.</p>
            )}
            <p className="text-xs text-indigo-400 mt-2 text-center italic">
              (Click nodes to view detailed information)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-24">
          <p className="text-slate-500 text-center text-xs">Select a patient from the schedule to view their knowledge graph.</p>
        </div>
      )}
    </div>
  );
};

export default PatientProfilePane;
