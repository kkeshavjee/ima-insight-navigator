
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

  const insightsToDisplay = selectedPatientId ? (mockInsights[selectedPatientId] || []) : [];

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
    <div className="h-full bg-teal-100 p-3 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="w-4 h-4 text-teal-600" />
        <h2 className="text-lg font-semibold text-teal-700">AI Prevention & Prediction</h2>
      </div>
      {selectedPatientId ? (
        <div>
          <div className="mb-3 p-2 bg-white rounded-lg shadow-sm">
            <p className="text-slate-600 text-sm">
              AI-powered insights for Patient: <span className="font-medium text-teal-600">{selectedPatientId}</span>
            </p>
          </div>
          
          {insightsToDisplay.length > 0 ? (
            <div className="space-y-2">
              {insightsToDisplay.map(insight => (
                <div key={insight.id} className={getInsightStyle(insight.type, insight.priority)}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getInsightIcon(insight.type)}
                      <h4 className="font-medium text-teal-700 text-sm">{insight.title}</h4>
                    </div>
                    <span className={getPriorityBadge(insight.priority)}>
                      {insight.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  {insight.score && (
                    <div className="mb-2">
                      <span className="text-xl font-bold text-red-600">{insight.score}</span>
                      <span className="text-xs text-gray-500 ml-1">risk score</span>
                    </div>
                  )}
                  
                  <p className="text-xs text-slate-600 leading-relaxed">{insight.detail}</p>
                  
                  <div className="mt-2 flex gap-2">
                    <button className="text-xs bg-teal-500 text-white px-2 py-1 rounded hover:bg-teal-600 transition-colors">
                      Act on This
                    </button>
                    <button className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Brain className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">No AI insights available for this patient in the current dataset.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <Brain className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Select a patient to view AI-powered insights and predictions.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreventionPredictionPane;
