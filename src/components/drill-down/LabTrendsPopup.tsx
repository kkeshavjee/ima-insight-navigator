
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LabTrend {
  date: string;
  value: string;
  status: 'Normal' | 'Elevated' | 'Low';
}

interface LabTrendsPopupProps {
  labName: string;
  currentValue: string;
  currentDate: string;
  currentStatus: string;
  trends: LabTrend[];
  children: React.ReactNode;
}

const LabTrendsPopup: React.FC<LabTrendsPopupProps> = ({
  labName,
  currentValue,
  currentDate,
  currentStatus,
  trends,
  children
}) => {
  const getTrendIcon = (currentIndex: number) => {
    if (currentIndex === 0) return <Minus className="w-3 h-3 text-gray-400" />;
    
    const current = parseFloat(trends[currentIndex].value);
    const previous = parseFloat(trends[currentIndex - 1].value);
    
    if (current > previous) {
      return <TrendingUp className="w-3 h-3 text-red-500" />;
    } else if (current < previous) {
      return <TrendingDown className="w-3 h-3 text-green-500" />;
    }
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'text-green-600 bg-green-50';
      case 'Elevated': return 'text-red-600 bg-red-50';
      case 'Low': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:bg-gray-50 transition-colors">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{labName} Trends</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Value */}
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-blue-800">Current: {currentValue}</div>
                <div className="text-xs text-blue-600">{currentDate}</div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentStatus)}`}>
                {currentStatus}
              </span>
            </div>
          </div>

          {/* Historical Trends */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Historical Values</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {trends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(index)}
                    <div>
                      <div className="text-sm font-medium">{trend.value}</div>
                      <div className="text-xs text-gray-500">{trend.date}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trend.status)}`}>
                    {trend.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reference Ranges */}
          <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
            <div className="font-medium mb-1">Reference Information:</div>
            {labName === 'HbA1c' && <div>Target: &lt;7.0% for most adults with diabetes</div>}
            {labName === 'Potassium' && <div>Normal: 3.5-5.0 mEq/L</div>}
            {labName === 'Creatinine' && <div>Normal: 0.6-1.2 mg/dL</div>}
            {labName === 'Glucose, Fasting' && <div>Normal: &lt;100 mg/dL</div>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LabTrendsPopup;
