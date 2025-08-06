import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LabNode } from '@/types/graph-models';

interface LabResultsChartProps {
  labs: LabNode[];
  title?: string;
  className?: string;
}

// Helper function to generate historical data for trending
const generateHistoricalData = (lab: LabNode) => {
  const baseValue = parseFloat(lab.properties.value);
  const testName = lab.properties.testName;
  
  // Generate 6 months of historical data
  const data = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    // Add some realistic variation based on test type
    let variation = 0;
    if (testName.includes('A1c') || testName.includes('HbA1c')) {
      variation = (Math.random() - 0.5) * 0.8; // ±0.4% variation
    } else if (testName.includes('Glucose')) {
      variation = (Math.random() - 0.5) * 40; // ±20 mg/dL variation
    } else if (testName.includes('Cholesterol')) {
      variation = (Math.random() - 0.5) * 30; // ±15 mg/dL variation
    } else if (testName.includes('Blood Pressure')) {
      variation = (Math.random() - 0.5) * 20; // ±10 mmHg variation
    } else {
      variation = (Math.random() - 0.5) * (baseValue * 0.2); // ±10% variation
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Number((baseValue + variation).toFixed(1)),
      month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      status: i === 0 ? lab.properties.status : Math.random() > 0.7 ? 'Abnormal' : 'Normal'
    });
  }
  
  return data;
};

// Get reference ranges and normal values for common tests
const getReferenceInfo = (testName: string) => {
  const name = testName.toLowerCase();
  
  if (name.includes('a1c') || name.includes('hba1c')) {
    return { min: 4, max: 7, unit: '%', ideal: 6.5 };
  } else if (name.includes('glucose')) {
    return { min: 70, max: 140, unit: 'mg/dL', ideal: 100 };
  } else if (name.includes('cholesterol')) {
    return { min: 100, max: 200, unit: 'mg/dL', ideal: 150 };
  } else if (name.includes('pressure')) {
    return { min: 90, max: 140, unit: 'mmHg', ideal: 120 };
  }
  
  return null;
};

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
  normal: {
    label: "Normal Range",
    color: "hsl(var(--muted))",
  },
};

const LabResultsChart: React.FC<LabResultsChartProps> = ({
  labs,
  title = "Lab Results Trends",
  className = ""
}) => {
  if (!labs || labs.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground text-sm py-8">
            No lab results available
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group labs by test type
  const labsByType = labs.reduce((acc, lab) => {
    const testName = lab.properties.testName;
    if (!acc[testName]) {
      acc[testName] = [];
    }
    acc[testName].push(lab);
    return acc;
  }, {} as Record<string, LabNode[]>);

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      {Object.entries(labsByType).map(([testName, testLabs]) => {
        const latestLab = testLabs[0]; // Assuming they're sorted by date
        const historicalData = generateHistoricalData(latestLab);
        const refInfo = getReferenceInfo(testName);
        
        return (
          <Card key={testName} className="w-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{testName}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={latestLab.properties.status === 'Normal' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {latestLab.properties.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Current: {latestLab.properties.value} {latestLab.properties.unit}
                  </span>
                </div>
              </div>
              {refInfo && (
                <p className="text-xs text-muted-foreground">
                  Reference Range: {refInfo.min}-{refInfo.max} {refInfo.unit}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <LineChart data={historicalData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 10 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    stroke="hsl(var(--muted-foreground))"
                    domain={refInfo ? [refInfo.min * 0.8, refInfo.max * 1.2] : ['auto', 'auto']}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    labelStyle={{ fontSize: '12px' }}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  
                  {/* Reference range band */}
                  {refInfo && (
                    <>
                      <Line
                        type="monotone"
                        dataKey={() => refInfo.min}
                        stroke="hsl(var(--muted-foreground))"
                        strokeDasharray="5 5"
                        dot={false}
                        strokeWidth={1}
                      />
                      <Line
                        type="monotone"
                        dataKey={() => refInfo.max}
                        stroke="hsl(var(--muted-foreground))"
                        strokeDasharray="5 5"
                        dot={false}
                        strokeWidth={1}
                      />
                    </>
                  )}
                  
                  {/* Actual values */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LabResultsChart;