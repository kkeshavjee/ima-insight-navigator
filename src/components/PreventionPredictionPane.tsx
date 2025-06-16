
import React from 'react';
import { Brain, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface PreventionPredictionPaneProps {
  selectedPatientId: string | null;
}

const PreventionPredictionPane: React.FC<PreventionPredictionPaneProps> = ({ selectedPatientId }) => {
  // Mock insights
  const mockInsights: Record<string, any[]> = {
    p001: [
      { 
        id: 'cvd_risk', 
        title: 'Cardiovascular Risk Score', 
        detail: '15% 10-year risk - Consider statin therapy and lifestyle modifications.', 
        type: 'risk',
        score: '15%',
        priority: 'high'
      },
      { 
        id: 'colon_screen', 
        title: 'Colonoscopy Screening', 
        detail: 'Overdue for screening (last: 5+ years ago). Schedule within 3 months.', 
        type: 'reminder',
        priority: 'medium'
      },
      { 
        id: 'med_adherence', 
        title: 'Medication Adherence Alert', 
        detail: 'Lisinopril refill overdue by 7 days. Consider adherence counseling.', 
        type: 'alert',
        priority: 'high'
      }
    ],
    p002: [
      { 
        id: 'flu_shot', 
        title: 'Influenza Vaccination', 
        detail: 'Annual flu vaccine recommended for current season.', 
        type: 'recommendation',
        priority: 'low'
      },
      { 
        id: 'asthma_control', 
        title: 'Asthma Control Assessment', 
        detail: 'Consider ACT score evaluation and inhaler technique review.', 
        type: 'recommendation',
        priority: 'medium'
      }
    ],
    p003: [
      { 
        id: 'migraine_tracking', 
        title: 'Headache Pattern Analysis', 
        detail: 'Recommend headache diary for pattern identification.', 
        type: 'recommendation',
        priority: 'low'
      }
    ]
  };

  // Sort insights by priority level (high, medium, low)
  const sortByPriority = (insights: any[]) => {
    const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
    return insights.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  const rawInsights = selectedPatientId ? (mockInsights[selectedPatientId] || []) : [];
  const insightsToDisplay = sortByPriority([...rawInsights]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'risk':
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'recommendation':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Brain className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInsightStyle = (type: string, priority: string) => {
    const baseClasses = 'p-3 bg-white rounded-lg shadow-sm border-l-4 transition-all duration-200 hover:shadow-md';
    
    if (type === 'risk' || type === 'alert') {
      return `${baseClasses} border-red-500 hover:bg-red-50`;
    } else if (type === 'reminder') {
      return `${baseClasses} border-yellow-500 hover:bg-yellow-50`;
    } else {
      return `${baseClasses} border-green-500 hover:bg-green-50`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = 'text-xs px-2 py-1 rounded-full font-medium';
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="h-full bg-indigo-100 p-2 shadow-md overflow-y-auto">
      <div className="flex items-center gap-1 mb-2">
        <Brain className="w-3 h-3 text-indigo-600" />
        <h2 className="text-xs font-semibold text-indigo-700">AI Recommendations</h2>
      </div>
      {selectedPatientId ? (
        <div>
          {insightsToDisplay.length > 0 ? (
            <div className="space-y-1">
              {insightsToDisplay.map(insight => (
                <div key={insight.id} className={getInsightStyle(insight.type, insight.priority)}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-1">
                      {getInsightIcon(insight.type)}
                      <h4 className="font-medium text-indigo-700 text-xs">{insight.title}</h4>
                    </div>
                    <span className={getPriorityBadge(insight.priority)}>
                      {insight.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  {insight.score && (
                    <div className="mb-1">
                      <span className="text-lg font-bold text-red-600">{insight.score}</span>
                      <span className="text-xs text-gray-500 ml-1">risk score</span>
                    </div>
                  )}
                  
                  <p className="text-xs text-slate-600 leading-relaxed">{insight.detail}</p>
                  
                  <div className="mt-1 flex gap-1">
                    <button className="text-xs bg-indigo-500 text-white px-1.5 py-0.5 rounded hover:bg-indigo-600 transition-colors">
                      Act on This
                    </button>
                    <button className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded hover:bg-gray-300 transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-4 text-center">
              <Brain className="w-8 h-8 text-gray-300 mx-auto mb-1" />
              <p className="text-slate-500 text-xs">No AI insights available for this patient in the current dataset.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-24">
          <div className="text-center">
            <Brain className="w-8 h-8 text-gray-300 mx-auto mb-1" />
            <p className="text-slate-500 text-xs">Select a patient to view AI-powered insights and predictions.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreventionPredictionPane;
