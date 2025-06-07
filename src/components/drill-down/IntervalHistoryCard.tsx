
import React from 'react';
import { TrendingUp, FlaskConical, Calendar, Clock } from 'lucide-react';
import DetailCard, { StatusBadge } from './DetailCard';

interface IntervalHistoryData {
  newMedications: Array<{ name: string; date: string; reason: string }>;
  newLabs: Array<{ name: string; value: string; date: string; status: string; change: string }>;
  clinicalChanges: Array<{ date: string; description: string }>;
  upcomingActions: Array<{ action: string; dueDate: string }>;
}

interface IntervalHistoryCardProps {
  intervalHistory: IntervalHistoryData;
}

const IntervalHistoryCard: React.FC<IntervalHistoryCardProps> = ({ intervalHistory }) => {
  return (
    <div>
      {/* Header */}
      <div className="mb-3 p-2 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-medium text-blue-600">Interval History</h3>
          <span className="text-xs text-gray-500">(Since last visit: 2024-04-15)</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {/* New Medications */}
        <DetailCard
          icon={() => <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
          iconColor=""
          title="New Medications"
          items={intervalHistory.newMedications}
          renderItem={(med, index) => (
            <div key={index} className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
              <div className="text-xs font-medium text-blue-800">{med.name}</div>
              <div className="text-xs text-blue-600">{med.date} - {med.reason}</div>
            </div>
          )}
        />

        {/* Recent Lab Changes */}
        <DetailCard
          icon={FlaskConical}
          iconColor="text-green-600"
          title="Recent Lab Changes"
          items={intervalHistory.newLabs}
          renderItem={(lab, index) => (
            <div key={index} className="p-2 bg-green-50 rounded border-l-4 border-green-400">
              <div className="flex justify-between items-center">
                <div className="text-xs font-medium text-green-800">{lab.name}: {lab.value} ({lab.date})</div>
                <div className="flex gap-1">
                  <StatusBadge status={lab.status} />
                  <span className="text-xs px-1 py-0.5 rounded bg-blue-50 text-blue-600">
                    {lab.change}
                  </span>
                </div>
              </div>
            </div>
          )}
        />

        {/* Clinical Changes */}
        <DetailCard
          icon={Calendar}
          iconColor="text-purple-600"
          title="Clinical Changes"
          items={intervalHistory.clinicalChanges}
          renderItem={(change, index) => (
            <div key={index} className="p-2 bg-purple-50 rounded border-l-4 border-purple-400">
              <div className="text-xs font-medium text-purple-800">{change.date}</div>
              <div className="text-xs text-purple-600">{change.description}</div>
            </div>
          )}
        />

        {/* Upcoming Actions */}
        <DetailCard
          icon={Clock}
          iconColor="text-orange-600"
          title="Upcoming Actions"
          items={intervalHistory.upcomingActions}
          renderItem={(action, index) => (
            <div key={index} className="p-2 bg-orange-50 rounded border-l-4 border-orange-400">
              <div className="text-xs font-medium text-orange-800">{action.action}</div>
              <div className="text-xs text-orange-600">Due: {action.dueDate}</div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default IntervalHistoryCard;
