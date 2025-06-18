
import React from 'react';
import { FlaskConical, UserRoundCheck, FileText, ImageIcon } from 'lucide-react';
import DetailCard, { StatusBadge } from './DetailCard';
import LabTrendsPopup from './LabTrendsPopup';

interface IntervalHistoryData {
  labTests: Array<{ name: string; value: string; date: string; status?: string; change?: string }>;
  specialistNotes: Array<{ specialist: string; date: string; summary: string; type: string }>;
  erDischargeSummaries: Array<{ date: string; chiefComplaint: string; disposition: string; diagnosis: string }>;
  radiologyReports: Array<{ study: string; date: string; findings: string; impression: string }>;
}

interface IntervalHistoryCardProps {
  intervalHistory: IntervalHistoryData;
}

const IntervalHistoryCard: React.FC<IntervalHistoryCardProps> = ({ intervalHistory }) => {
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
      ]
    };
    
    return trendData[labName] || [];
  };

  return (
    <div className="space-y-3">
      {/* Lab Tests Section with Trends */}
      <div className="p-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <FlaskConical className="w-3 h-3 text-green-600" />
          <h3 className="text-xs font-medium text-green-600">Recent Lab Tests</h3>
        </div>
        <div className="space-y-1">
          {intervalHistory.labTests.map((lab, index) => (
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
                  <div className="text-xs font-medium text-green-800">
                    {lab.name}: {lab.value} ({lab.date})
                    {lab.change && <span className="ml-2 text-blue-600">({lab.change})</span>}
                  </div>
                  {lab.status && <StatusBadge status={lab.status} />}
                </div>
              </div>
            </LabTrendsPopup>
          ))}
        </div>
      </div>

      {/* Specialist Notes Section */}
      <DetailCard
        icon={UserRoundCheck}
        iconColor="text-blue-600"
        title="Specialist Notes"
        items={intervalHistory.specialistNotes}
        renderItem={(note, index) => (
          <div key={index} className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
            <div className="text-xs font-medium text-blue-800">{note.type} - {note.specialist}</div>
            <div className="text-xs text-blue-600 mb-1">{note.date}</div>
            <div className="text-xs text-blue-700">{note.summary}</div>
          </div>
        )}
      />

      {/* ER Discharge Summaries Section */}
      <DetailCard
        icon={FileText}
        iconColor="text-red-600"
        title="ER Discharge Summaries"
        items={intervalHistory.erDischargeSummaries}
        renderItem={(summary, index) => (
          <div key={index} className="p-2 bg-red-50 rounded border-l-4 border-red-400">
            <div className="text-xs font-medium text-red-800">{summary.date} - {summary.chiefComplaint}</div>
            <div className="text-xs text-red-600 mb-1">Diagnosis: {summary.diagnosis}</div>
            <div className="text-xs text-red-700">Disposition: {summary.disposition}</div>
          </div>
        )}
      />

      {/* Radiology Reports Section */}
      <DetailCard
        icon={ImageIcon}
        iconColor="text-purple-600"
        title="Radiology Reports"
        items={intervalHistory.radiologyReports}
        renderItem={(report, index) => (
          <div key={index} className="p-2 bg-purple-50 rounded border-l-4 border-purple-400">
            <div className="text-xs font-medium text-purple-800">{report.study} - {report.date}</div>
            <div className="text-xs text-purple-600 mb-1">Findings: {report.findings}</div>
            <div className="text-xs text-purple-700">Impression: {report.impression}</div>
          </div>
        )}
      />
    </div>
  );
};

export default IntervalHistoryCard;
