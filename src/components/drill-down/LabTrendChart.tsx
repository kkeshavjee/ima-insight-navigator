
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface LabTrendData {
  date: string;
  value: number;
  status: string;
}

interface LabTrendChartProps {
  labName: string;
  data: LabTrendData[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LabTrendChart: React.FC<LabTrendChartProps> = ({ labName, data, open, onOpenChange }) => {
  const chartConfig = {
    value: {
      label: labName,
      color: '#3b82f6',
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{labName} Trend</DialogTitle>
        </DialogHeader>
        
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
      </DialogContent>
    </Dialog>
  );
};

export default LabTrendChart;
