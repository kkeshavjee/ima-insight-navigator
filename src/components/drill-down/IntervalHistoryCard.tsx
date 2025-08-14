
import React from 'react';
import { TrendingUp, FlaskConical, FileText, Activity, Stethoscope, Sparkles, Minus, ArrowDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DetailCard, { StatusBadge } from './DetailCard';

interface IntervalHistoryData {
  labTests: Array<{ 
    name: string; 
    value: string; 
    date: string; 
    status: string; 
    change: string;
    numericValue?: number;
    unit?: string;
    history?: Array<{ date: string; value: number; formattedDate: string }>;
    normalRange?: { min: number; max: number };
  }>;
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
            <Popover key={index}>
              <PopoverTrigger asChild>
                <div className="p-2 bg-green-50 rounded border-l-4 border-green-400 cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-medium text-green-800">{lab.name}: {lab.value} ({lab.date})</div>
                    <div className="flex gap-1 items-center">
                      <StatusBadge status={lab.status} />
                      {getChangeIcon(lab.change)}
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] z-50" side="right" align="start">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-green-800">{lab.name}</div>
                  <div className="text-sm text-green-600"><strong>Current Value:</strong> {lab.value}</div>
                  <div className="text-sm text-green-600"><strong>Date:</strong> {lab.date}</div>
                  <div className="text-sm text-green-600"><strong>Status:</strong> {lab.status}</div>
                  {lab.normalRange && (
                    <div className="text-sm text-green-600">
                      <strong>Normal Range:</strong> {lab.normalRange.min} - {lab.normalRange.max} {lab.unit}
                    </div>
                  )}
                  
                  {/* Trending Graph */}
                  {lab.history && lab.history.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-green-800">Trend Over Time</div>
                      <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={lab.history}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                            <XAxis 
                              dataKey="formattedDate" 
                              fontSize={12}
                              stroke="#6b7280"
                            />
                            <YAxis 
                              fontSize={12}
                              stroke="#6b7280"
                              domain={lab.normalRange ? [lab.normalRange.min * 0.8, lab.normalRange.max * 1.2] : ['auto', 'auto']}
                            />
                            <Tooltip 
                              labelStyle={{ color: '#374151' }}
                              contentStyle={{ 
                                backgroundColor: '#f3f4f6', 
                                border: '1px solid #d1d5db',
                                borderRadius: '6px'
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#10b981" 
                              strokeWidth={2}
                              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                            />
                            {lab.normalRange && (
                              <>
                                <Line 
                                  type="monotone" 
                                  dataKey={() => lab.normalRange.max} 
                                  stroke="#ef4444" 
                                  strokeWidth={1}
                                  strokeDasharray="5 5"
                                  dot={false}
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey={() => lab.normalRange.min} 
                                  stroke="#ef4444" 
                                  strokeWidth={1}
                                  strokeDasharray="5 5"
                                  dot={false}
                                />
                              </>
                            )}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-sm text-green-600">
                    <strong>Change:</strong> 
                    <span className={`ml-1 px-2 py-1 rounded text-xs ${
                      lab.change.toLowerCase() === 'improved' ? 'bg-green-100 text-green-700' :
                      lab.change.toLowerCase() === 'new' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {lab.change}
                    </span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
