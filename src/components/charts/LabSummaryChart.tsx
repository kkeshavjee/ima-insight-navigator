import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LabNode } from '@/types/graph-models';

interface LabSummaryChartProps {
  labs: LabNode[];
  className?: string;
}

const chartConfig = {
  normal: {
    label: "Normal",
    color: "hsl(142, 76%, 36%)", // green-600
  },
  abnormal: {
    label: "Abnormal", 
    color: "hsl(346, 87%, 43%)", // red-600
  },
  critical: {
    label: "Critical",
    color: "hsl(0, 84%, 60%)", // red-500
  },
  pending: {
    label: "Pending",
    color: "hsl(45, 93%, 47%)", // yellow-500
  },
};

const LabSummaryChart: React.FC<LabSummaryChartProps> = ({
  labs,
  className = ""
}) => {
  if (!labs || labs.length === 0) {
    return null;
  }

  // Calculate status distribution
  const statusCounts = labs.reduce((acc, lab) => {
    const status = lab.properties.status.toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: chartConfig[status as keyof typeof chartConfig]?.color || "hsl(var(--muted))"
  }));

  // Recent tests over time (last 30 days)
  const recentTests = labs
    .filter(lab => {
      const testDate = new Date(lab.properties.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return testDate >= thirtyDaysAgo;
    })
    .sort((a, b) => new Date(a.properties.date).getTime() - new Date(b.properties.date).getTime());

  // Group by week
  const weeklyData = recentTests.reduce((acc, lab) => {
    const date = new Date(lab.properties.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];
    
    if (!acc[weekKey]) {
      acc[weekKey] = {
        week: weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        normal: 0,
        abnormal: 0,
        critical: 0,
        pending: 0
      };
    }
    
    const status = lab.properties.status.toLowerCase();
    acc[weekKey][status as keyof typeof acc[string]]++;
    
    return acc;
  }, {} as Record<string, any>);

  const barData = Object.values(weeklyData);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {/* Status Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Lab Results Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Lab Activity (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart data={barData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fontSize: 10 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="normal" stackId="a" fill={chartConfig.normal.color} />
                <Bar dataKey="abnormal" stackId="a" fill={chartConfig.abnormal.color} />
                <Bar dataKey="critical" stackId="a" fill={chartConfig.critical.color} />
                <Bar dataKey="pending" stackId="a" fill={chartConfig.pending.color} />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
              No recent lab activity
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LabSummaryChart;