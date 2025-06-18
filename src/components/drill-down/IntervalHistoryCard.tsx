
import React from 'react';
import { TrendingUp, FlaskConical, FileText, Activity, Stethoscope, Sparkles, Minus, ArrowDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DetailCard, { StatusBadge } from './DetailCard';

interface IntervalHistoryData {
  labTests: Array<{ name: string; value: string; date: string; status: string; change: string }>;
  specialistNotes: Array<{ specialist: string; date: string; summary: string; type: string }>;
  erDischargeSummaries: Array<{ date: string; chiefComplaint: string; disposition: string; diagnosis: string }>;
  radiologyReports: Array<{ study: string; date: string; findings: string; impression: string }>;
}

interface IntervalHistoryCardProps {
  intervalHistory: IntervalHistoryData;
}

const IntervalHistoryCard: React.FC<IntervalHistoryCardProps> = ({ intervalHistory }) => {
  const getChangeIcon = (change: string) => {
    switch (change.toLowerCase()) {
      case 'new':
        return <Sparkles className="w-3 h-3 text-blue-600" />;
      case 'stable':
        return <Minus className="w-3 h-3 text-gray-600" />;
      case 'improved':
        return <ArrowDown className="w-3 h-3 text-green-600" />;
      default:
        return <Sparkles className="w-3 h-3 text-blue-600" />;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-3 p-2 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-3 h-3 text-blue-600" />
          <h3 className="text-xs font-medium text-blue-600">Interval History</h3>
          <span className="text-xs text-gray-500">(Since last visit: 2024-04-15)</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Lab Tests */}
        <DetailCard
          icon={FlaskConical}
          iconColor="text-green-600"
          title="Lab Tests"
          items={intervalHistory.labTests}
          renderItem={(lab, index) => (
            <div key={index} className="p-2 bg-green-50 rounded border-l-4 border-green-400">
              <div className="flex justify-between items-center">
                <div className="text-xs font-medium text-green-800">{lab.name}: {lab.value} ({lab.date})</div>
                <div className="flex gap-1 items-center">
                  <StatusBadge status={lab.status} />
                  {getChangeIcon(lab.change)}
                </div>
              </div>
            </div>
          )}
        />

        {/* Specialist Notes */}
        <DetailCard
          icon={Stethoscope}
          iconColor="text-purple-600"
          title="Specialist Notes"
          items={intervalHistory.specialistNotes}
          renderItem={(note, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <div className="p-2 bg-purple-50 rounded border-l-4 border-purple-400 cursor-pointer hover:bg-purple-100 transition-colors">
                  <div className="text-xs font-medium text-purple-800">{note.specialist} - {note.type}</div>
                  <div className="text-xs text-purple-600">{note.date}</div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 z-50" side="right" align="start">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-purple-800">{note.specialist} - {note.type}</div>
                  <div className="text-sm text-purple-600">{note.date}</div>
                  <div className="text-sm text-purple-700 mt-2">{note.summary}</div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        />

        {/* ER Discharge Summaries */}
        <DetailCard
          icon={Activity}
          iconColor="text-red-600"
          title="ER Discharge Summaries"
          items={intervalHistory.erDischargeSummaries}
          renderItem={(er, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <div className="p-2 bg-red-50 rounded border-l-4 border-red-400 cursor-pointer hover:bg-red-100 transition-colors">
                  <div className="text-xs font-medium text-red-800">{er.date} - {er.chiefComplaint}</div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 z-50" side="right" align="start">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-red-800">{er.date} - {er.chiefComplaint}</div>
                  <div className="text-sm text-red-600"><strong>Diagnosis:</strong> {er.diagnosis}</div>
                  <div className="text-sm text-red-600"><strong>Disposition:</strong> {er.disposition}</div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        />

        {/* Radiology Reports */}
        <DetailCard
          icon={FileText}
          iconColor="text-indigo-600"
          title="Radiology Reports"
          items={intervalHistory.radiologyReports}
          renderItem={(radiology, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <div className="p-2 bg-indigo-50 rounded border-l-4 border-indigo-400 cursor-pointer hover:bg-indigo-100 transition-colors">
                  <div className="text-xs font-medium text-indigo-800">{radiology.study} ({radiology.date})</div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 z-50" side="right" align="start">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-indigo-800">{radiology.study} ({radiology.date})</div>
                  <div className="text-sm text-indigo-600"><strong>Findings:</strong> {radiology.findings}</div>
                  <div className="text-sm text-indigo-700 font-medium"><strong>Impression:</strong> {radiology.impression}</div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        />
      </div>
    </div>
  );
};

export default IntervalHistoryCard;
