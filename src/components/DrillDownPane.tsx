
import React from 'react';
import { FileText, Calendar, FlaskConical, Clock } from 'lucide-react';

interface DrillDownPaneProps {
  selectedNodeData: any;
}

const DrillDownPane: React.FC<DrillDownPaneProps> = ({ selectedNodeData }) => {
  // Mock data based on selectedNodeData
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
          { date: '2024-04-15', summary: 'BP check, stable at 135/85. Continue current regimen.' },
          { date: '2024-03-20', summary: 'Blood pressure trending down. Patient compliant with medications.' }
        ],
        recentVisits: [
          { date: '2024-05-15', type: 'Follow-up', provider: 'Dr. Smith', notes: 'Blood pressure well controlled. Continue current medications.' },
          { date: '2024-04-15', type: 'Routine Check', provider: 'Dr. Smith', notes: 'Discussed lifestyle modifications and medication adherence.' }
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
          { date: '2024-04-20', type: 'Diabetes Management', provider: 'Dr. Johnson', notes: 'HbA1c improved from 8.1% to 7.2%. Patient doing well with current regimen.' },
          { date: '2024-03-15', type: 'Follow-up', provider: 'Dr. Johnson', notes: 'Reviewed diet and exercise plan. Patient reports good adherence.' }
        ]
      };
    }
    
    if (node.id === 'node_social_smoking') {
      return {
        medications: [],
        labs: [],
        visits: [],
        recentVisits: [
          { date: '2024-05-10', type: 'Smoking Cessation', provider: 'Dr. Smith', notes: 'Patient quit smoking 5 years ago. Discussed lung cancer screening eligibility.' }
        ]
      };
    }
    
    if (node.id === 'node_surgery_appendix') {
      return {
        medications: [],
        labs: [],
        visits: [],
        recentVisits: [
          { date: '2024-02-10', type: 'Annual Physical', provider: 'Dr. Smith', notes: 'Surgical history reviewed. No complications from appendectomy.' }
        ]
      };
    }
    
    if (node.id === 'node_family_dm') {
      return {
        medications: [],
        labs: [],
        visits: [],
        recentVisits: [
          { date: '2024-05-15', type: 'Follow-up', provider: 'Dr. Smith', notes: 'Family history of diabetes discussed. Patient screened regularly.' }
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
    <div className="h-full bg-indigo-100 p-4 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold text-indigo-700">Drill Down Details</h2>
      </div>
      {selectedNodeData ? (
        <div>
          <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-indigo-600 mb-1">{selectedNodeData.label}</h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{selectedNodeData.type}</span>
          </div>
          
          <div className="space-y-4">
            {/* Recent Visits Section */}
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-indigo-600" />
                <h3 className="font-medium text-indigo-600">Recent Visits</h3>
              </div>
              {details && details.recentVisits.length > 0 ? (
                <div className="space-y-2">
                  {details.recentVisits.map((visit, index) => (
                    <div key={index} className="p-2 bg-indigo-50 rounded border-l-4 border-indigo-400">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium text-indigo-800">{visit.date}</div>
                        <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded">{visit.type}</span>
                      </div>
                      <div className="text-sm text-indigo-600 mb-1">Provider: {visit.provider}</div>
                      <div className="text-sm text-indigo-700">{visit.notes}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No recent visits available for this item.</p>
              )}
            </div>

            {/* Medications Section */}
            {details && details.medications.length > 0 && (
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h3 className="font-medium text-indigo-600">Related Medications</h3>
                </div>
                <div className="space-y-2">
                  {details.medications.map((med, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                      <div className="font-medium text-blue-800">{med.name}</div>
                      {med.dosage && <div className="text-sm text-blue-600">Dosage: {med.dosage}</div>}
                      {med.class && <div className="text-sm text-blue-600">Class: {med.class}</div>}
                      {med.indication && <div className="text-sm text-blue-600">Indication: {med.indication}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Labs Section */}
            {details && details.labs.length > 0 && (
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical className="w-4 h-4 text-green-600" />
                  <h3 className="font-medium text-indigo-600">Recent Lab Results</h3>
                </div>
                <div className="space-y-2">
                  {details.labs.map((lab, index) => (
                    <div key={index} className="p-2 bg-green-50 rounded border-l-4 border-green-400">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-green-800">{lab.name}: {lab.value}</div>
                          <div className="text-sm text-green-600">Date: {lab.date}</div>
                        </div>
                        {lab.status && (
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(lab.status)}`}>
                            {lab.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visits Section */}
            {details && details.visits.length > 0 && (
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <h3 className="font-medium text-indigo-600">Visit Highlights</h3>
                </div>
                <div className="space-y-2">
                  {details.visits.map((visit, index) => (
                    <div key={index} className="p-2 bg-purple-50 rounded border-l-4 border-purple-400">
                      <div className="font-medium text-purple-800">{visit.date}</div>
                      <div className="text-sm text-purple-600">{visit.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-40">
          <p className="text-slate-500 text-center">Select a node from the Patient Profile to view detailed information.</p>
        </div>
      )}
    </div>
  );
};

export default DrillDownPane;
