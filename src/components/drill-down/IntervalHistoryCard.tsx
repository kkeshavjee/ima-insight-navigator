
import React from 'react';
import { Calendar, Clock, FlaskConical, Stethoscope, FileText } from 'lucide-react';
import DetailCard from './DetailCard';

interface LabTest {
  name: string;
  value: string;
  date: string;
  status: string;
  change: string;
}

interface IntervalHistoryData {
  labTests: LabTest[];
  specialistNotes: Array<{ specialist: string; date: string; summary: string; type: string }>;
  erDischargeSummaries: Array<{ date: string; chiefComplaint: string; disposition: string; diagnosis: string }>;
  radiologyReports: Array<{ study: string; date: string; findings: string; impression: string }>;
}

interface IntervalHistoryCardProps {
  intervalHistory: IntervalHistoryData;
  onLabClick?: (labName: string) => void;
}

const IntervalHistoryCard: React.FC<IntervalHistoryCardProps> = ({ 
  intervalHistory, 
  onLabClick 
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal': return 'text-green-700';
      case 'elevated': return 'text-red-700';
      case 'low': return 'text-orange-700';
      default: return 'text-gray-700';
    }
  };

  const getChangeColor = (change: string) => {
    switch (change.toLowerCase()) {
      case 'improved': return 'text-green-600';
      case 'worsened': return 'text-red-600';
      case 'stable': return 'text-blue-600';
      case 'new': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const handleLabClick = (labName: string) => {
    if (onLabClick) {
      onLabClick(labName);
    }
  };

  return (
    <div className="space-y-3">
      {/* Lab Tests Section */}
      <DetailCard
        icon={FlaskConical}
        iconColor="text-green-600"
        title="Lab Tests"
        items={intervalHistory.labTests}
        renderItem={(lab, index) => (
          <div 
            key={index} 
            className="p-2 bg-green-50 rounded border-l-4 border-green-400 cursor-pointer hover:bg-green-100 transition-colors"
            onClick={() => handleLabClick(lab.name)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-medium text-green-800">{lab.name}: {lab.value}</div>
                <div className="text-xs text-green-600">{lab.date}</div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs font-medium ${getStatusColor(lab.status)}`}>
                  {lab.status}
                </span>
                <span className={`text-xs ${getChangeColor(lab.change)}`}>
                  {lab.change}
                </span>
              </div>
            </div>
          </div>
        )}
      />

      {/* Specialist Notes Section */}
      <DetailCard
        icon={Stethoscope}
        iconColor="text-blue-600"
        title="Specialist Notes"
        items={intervalHistory.specialistNotes}
        renderItem={(note, index) => (
          <div key={index} className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
            <div className="text-xs font-medium text-blue-800">{note.specialist} - {note.type}</div>
            <div className="text-xs text-blue-600">{note.date}</div>
            <div className="text-xs text-blue-700 mt-1">{note.summary}</div>
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
            <div className="text-xs text-red-600">Disposition: {summary.disposition}</div>
            <div className="text-xs text-red-700 mt-1">{summary.diagnosis}</div>
          </div>
        )}
      />

      {/* Radiology Reports Section */}
      <DetailCard
        icon={Calendar}
        iconColor="text-purple-600"
        title="Radiology Reports"
        items={intervalHistory.radiologyReports}
        renderItem={(report, index) => (
          <div key={index} className="p-2 bg-purple-50 rounded border-l-4 border-purple-400">
            <div className="text-xs font-medium text-purple-800">{report.study} - {report.date}</div>
            <div className="text-xs text-purple-600 mt-1">Findings: {report.findings}</div>
            <div className="text-xs text-purple-700 mt-1">Impression: {report.impression}</div>
          </div>
        )}
      />
    </div>
  );
};

export default IntervalHistoryCard;
