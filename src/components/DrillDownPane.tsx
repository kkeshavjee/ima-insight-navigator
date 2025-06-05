

import React from 'react';
import { FileText, Calendar, FlaskConical, Clock } from 'lucide-react';

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

  const details = getMockDetails(selectedNodeData);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'normal':
        return 'text-green-600 bg-green-50';
      case 'elevated':
        return 'text-orange-600 bg-orange-50';
      case 'high':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="h-full bg-indigo-100 p-3 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-4 h-4 text-indigo-600" />
        <h2 className="text-sm font-semibold text-indigo-700">History Details</h2>
      </div>
      {selectedNodeData ? (
        <div>
          <div className="mb-3 p-2 bg-white rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-indigo-600 mb-1">{selectedNodeData.label}</h3>
          </div>
          
          <div className="space-y-3">
            {/* Visit Highlights Section - moved to top */}
            {details && details.visits.length > 0 && (
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-3 h-3 text-purple-600" />
                  <h3 className="text-xs font-medium text-indigo-600">Visit Highlights</h3>
                </div>
                <div className="space-y-1">
                  {/* Show only the first visit */}
                  <div className="p-2 bg-purple-50 rounded border-l-4 border-purple-400">
                    <div className="text-xs font-medium text-purple-800">{details.visits[0].date}</div>
                    <div className="text-xs text-purple-600">{details.visits[0].summary}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Visits Section */}
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-3 h-3 text-indigo-600" />
                <h3 className="text-xs font-medium text-indigo-600">Recent Visits</h3>
              </div>
              {details && details.recentVisits.length > 0 ? (
                <div className="space-y-1">
                  {details.recentVisits.map((visit, index) => (
                    <div key={index} className="p-2 bg-indigo-50 rounded border-l-4 border-indigo-400">
                      <div className="text-xs font-medium text-indigo-800">
                        {visit.date} - {visit.reason}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No recent visits available for this item.</p>
              )}
            </div>

            {/* Medications Section - single line format */}
            {details && details.medications.length > 0 && (
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h3 className="text-xs font-medium text-indigo-600">Related Medications</h3>
                </div>
                <div className="space-y-1">
                  {details.medications.map((med, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                      <div className="text-xs font-medium text-blue-800">{med.name} - {med.dosage} ({med.class})</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Labs Section - single line format */}
            {details && details.labs.length > 0 && (
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="w-3 h-3 text-green-600" />
                  <h3 className="text-xs font-medium text-indigo-600">Recent Lab Results</h3>
                </div>
                <div className="space-y-1">
                  {details.labs.map((lab, index) => (
                    <div key={index} className="p-2 bg-green-50 rounded border-l-4 border-green-400">
                      <div className="flex justify-between items-center">
                        <div className="text-xs font-medium text-green-800">{lab.name}: {lab.value} ({lab.date})</div>
                        {lab.status && (
                          <span className={`text-xs px-1 py-0.5 rounded ${getStatusColor(lab.status)}`}>
                            {lab.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <p className="text-slate-500 text-center text-xs">Select a node from the Patient History to view detailed information.</p>
        </div>
      )}
    </div>
  );
};

export default DrillDownPane;

