
import React from 'react';
import { Calendar, Clock, FlaskConical, Pill } from 'lucide-react';
import DetailCard, { StatusBadge } from './DetailCard';

interface NodeDetailsData {
  medications: Array<{ name: string; dosage: string; class: string }>;
  labs: Array<{ name: string; value: string; date: string; status?: string; trend?: string }>;
  visits: Array<{ date: string; summary: string }>;
  recentVisits: Array<{ date: string; reason: string; note?: string }>;
}

interface NodeDetailsViewProps {
  selectedNodeData: any;
  details: NodeDetailsData;
}

const NodeDetailsView: React.FC<NodeDetailsViewProps> = ({ selectedNodeData, details }) => {
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
                  {visit.note && (
                    <div className="text-xs text-indigo-600 mt-1 italic">
                      {visit.note}
                    </div>
                  )}
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

        {/* Labs Section */}
        <DetailCard
          icon={FlaskConical}
          iconColor="text-green-600"
          title="Recent Lab Results"
          items={details.labs}
          renderItem={(lab, index) => (
            <div key={index} className="p-2 bg-green-50 rounded border-l-4 border-green-400">
              <div className="flex justify-between items-center">
                <div className="text-xs font-medium text-green-800">{lab.name}: {lab.value} ({lab.date})</div>
                <div className="flex items-center gap-1">
                  {lab.trend && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      lab.trend === 'up' ? 'bg-red-100 text-red-700' :
                      lab.trend === 'down' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {lab.trend === 'up' ? '↗' : lab.trend === 'down' ? '↘' : '→'} {lab.trend}
                    </span>
                  )}
                  {lab.status && <StatusBadge status={lab.status} />}
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default NodeDetailsView;
