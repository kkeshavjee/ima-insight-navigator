
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { X } from 'lucide-react';

interface LabTrendData {
  date: string;
  value: number;
  status: string;
}

interface LabTrendChartProps {
  labName: string;
  data: LabTrendData[];
  onClose: () => void;
}

const LabTrendChart: React.FC<LabTrendChartProps> = ({ labName, data, onClose }) => {
  const chartConfig = {
    value: {
      label: labName,
      color: '#3b82f6',
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{labName} Trend</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-value)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-value)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Historical Values:</h4>
          <div className="space-y-1">
            {data.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <span className="text-gray-600">{item.date}</span>
                <span className="font-medium">{item.value}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  item.status === 'Normal' ? 'bg-green-100 text-green-700' :
                  item.status === 'Elevated' ? 'bg-red-100 text-red-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTrendChart;
