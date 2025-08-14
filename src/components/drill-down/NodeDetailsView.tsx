
import React from 'react';
import { Calendar, Clock, FlaskConical, Pill } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DetailCard, { StatusBadge } from './DetailCard';

interface NodeDetailsData {
  medications: Array<{ name: string; dosage: string; class: string }>;
  labs: Array<{ 
    name: string; 
    value: string; 
    date: string; 
    status?: string; 
    trend?: string; 
    numericValue?: number;
    unit?: string;
    history?: Array<{ date: string; value: number; formattedDate: string }>;
    normalRange?: { min: number; max: number };
  }>;
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
        <DetailCard
          icon={Clock}
          iconColor="text-indigo-600"
          title="Recent Visits"
          items={details.recentVisits}
          renderItem={(visit, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <div className="p-2 bg-indigo-50 rounded border-l-4 border-indigo-400 cursor-pointer hover:bg-indigo-100 transition-colors">
                  <div className="text-xs font-medium text-indigo-800">
                    {visit.date} - {visit.reason}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 z-50" side="right" align="start">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-indigo-800">{visit.date} - {visit.reason}</div>
                  {visit.note && (
                    <div className="text-sm text-indigo-700 mt-2">
                      <strong>Notes:</strong> {visit.note}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        />

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
            <Popover key={index}>
              <PopoverTrigger asChild>
                <div className="p-2 bg-green-50 rounded border-l-4 border-green-400 cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-medium text-green-800">{lab.name}: {lab.value} ({lab.date})</div>
                    <div className="flex items-center gap-1">
                      {lab.trend && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          lab.trend === 'up' ? 'bg-red-100 text-red-700' :
                          lab.trend === 'down' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {lab.trend === 'up' ? '↗' : lab.trend === 'down' ? '↘' : '→'}
                        </span>
                      )}
                      {lab.status && <StatusBadge status={lab.status} />}
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] z-50" side="right" align="start">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-green-800">{lab.name}</div>
                  <div className="text-sm text-green-600"><strong>Current Value:</strong> {lab.value}</div>
                  <div className="text-sm text-green-600"><strong>Date:</strong> {lab.date}</div>
                  {lab.status && (
                    <div className="text-sm text-green-600"><strong>Status:</strong> {lab.status}</div>
                  )}
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
                  
                  {lab.trend && (
                    <div className="text-sm text-green-600">
                      <strong>Trend:</strong> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        lab.trend === 'up' ? 'bg-red-100 text-red-700' :
                        lab.trend === 'down' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {lab.trend === 'up' ? '↗ Trending Up' : lab.trend === 'down' ? '↘ Trending Down' : '→ Stable'}
                      </span>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        />
      </div>
    </div>
  );
};

export default NodeDetailsView;
