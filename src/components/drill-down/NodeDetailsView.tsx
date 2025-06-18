
import React from 'react';
import { Calendar, Clock, FlaskConical, Pill } from 'lucide-react';
import DetailCard, { StatusBadge } from './DetailCard';
import LabTrendsPopup from './LabTrendsPopup';

interface NodeDetailsData {
  medications: Array<{ name: string; dosage: string; class: string }>;
  labs: Array<{ name: string; value: string; date: string; status?: string }>;
  visits: Array<{ date: string; summary: string }>;
  recentVisits: Array<{ date: string; reason: string }>;
}

interface NodeDetailsViewProps {
  selectedNodeData: any;
  details: NodeDetailsData;
}

const NodeDetailsView: React.FC<NodeDetailsViewProps> = ({ selectedNodeData, details }) => {
  const getLabTrends = (labName: string) => {
    // Mock historical data for demonstration
    const trendData: { [key: string]: any[] } = {
      'HbA1c': [
        { date: '2024-01-15', value: '7.8', status: 'Elevated' },
        { date: '2024-03-10', value: '7.2', status: 'Elevated' },
        { date: '2024-05-10', value: '7.0', status: 'Elevated' }
      ],
      'Potassium': [
        { date: '2024-03-01', value: '4.3', status: 'Normal' },
        { date: '2024-04-15', value: '4.0', status: 'Normal' },
        { date: '2024-05-01', value: '4.1', status: 'Normal' }
      ],
      'Creatinine': [
        { date: '2024-03-01', value: '1.1', status: 'Normal' },
        { date: '2024-04-15', value: '1.0', status: 'Normal' },
        { date: '2024-05-01', value: '1.0', status: 'Normal' }
      ],
      'Glucose, Fasting': [
        { date: '2024-01-15', value: '145', status: 'Elevated' },
        { date: '2024-03-10', value: '130', status: 'Elevated' },
        { date: '2024-05-10', value: '125', status: 'Elevated' }
      ]
    };
    
    return trendData[labName] || [];
  };

  return (
    <div>
      <div className="mb-3 p-2 bg-white rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-indigo-600 mb-1">{selectedNodeData.label}</h3>
      </div>
      
      <div className="space-y-3">
        {/* Visit Highlights Section */}
        {details.visits.length > 0 && (
          <DetailCard
            icon={Calendar}
            iconColor="text-purple-600"
            title="Visit Highlights"
            items={[details.visits[0]]}
            renderItem={(visit, index) => (
              <div key={index} className="p-2 bg-purple-50 rounded border-l-4 border-purple-400">
                <div className="text-xs font-medium text-purple-800">{visit.date}</div>
                <div className="text-xs text-purple-600">{visit.summary}</div>
              </div>
            )}
          />
        )}

        {/* Recent Visits Section */}
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-3 h-3 text-indigo-600" />
            <h3 className="text-xs font-medium text-indigo-600">Recent Visits</h3>
          </div>
          {details.recentVisits.length > 0 ? (
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

        {/* Medications Section */}
        <DetailCard
          icon={Pill}
          iconColor="text-blue-600"
          title="Related Medications"
          items={details.medications}
          renderItem={(med, index) => (
            <div key={index} className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
              <div className="text-xs font-medium text-blue-800">{med.name} - {med.dosage} ({med.class})</div>
            </div>
          )}
        />

        {/* Labs Section with Trends Popup */}
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical className="w-3 h-3 text-green-600" />
            <h3 className="text-xs font-medium text-green-600">Recent Lab Results</h3>
          </div>
          {details.labs.length > 0 ? (
            <div className="space-y-1">
              {details.labs.map((lab, index) => (
                <LabTrendsPopup
                  key={index}
                  labName={lab.name}
                  currentValue={lab.value}
                  currentDate={lab.date}
                  currentStatus={lab.status || 'Normal'}
                  trends={getLabTrends(lab.name)}
                >
                  <div className="p-2 bg-green-50 rounded border-l-4 border-green-400">
                    <div className="flex justify-between items-center">
                      <div className="text-xs font-medium text-green-800">{lab.name}: {lab.value} ({lab.date})</div>
                      {lab.status && <StatusBadge status={lab.status} />}
                    </div>
                  </div>
                </LabTrendsPopup>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic">No lab results available for this item.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodeDetailsView;
