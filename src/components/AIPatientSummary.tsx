import React, { useState, useEffect } from 'react';
import { Brain, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface AIPatientSummaryProps {
  selectedPatientId: string | null;
}

type SummaryStatus = 'generated' | 'ready-for-review' | 'generating' | 'not-generated';

const AIPatientSummary: React.FC<AIPatientSummaryProps> = ({ selectedPatientId }) => {
  const [summaryStatus, setSummaryStatus] = useState<SummaryStatus>('not-generated');
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock patient summaries
  const mockSummaries: Record<string, string> = {
    p001: "67-year-old male with well-controlled hypertension and diabetes mellitus type 2. Former smoker with significant cardiovascular risk factors. Recent HbA1c indicates good glycemic control. Blood pressure trending within target range. Family history of diabetes adds to risk profile. Previous appendectomy without complications. Recommend continued current medication regimen with routine monitoring.",
    p002: "34-year-old female with mild persistent asthma. Excellent medication adherence with good symptom control. Regular exercise routine supports overall health. Strong family history of asthma. Peak flow measurements stable. No recent exacerbations. Continue current inhaler therapy with annual reassessment.",
    p003: "28-year-old patient with chronic tension-type headaches. Social alcohol use within recommended limits. Headache pattern suggests stress-related triggers. No concerning neurological findings. Response to preventive measures has been favorable. Consider lifestyle modifications and stress management techniques."
  };

  const generateSummary = async () => {
    if (!selectedPatientId) return;
    
    setIsGenerating(true);
    setSummaryStatus('generating');
    
    // Simulate API call delay
    setTimeout(() => {
      const mockSummary = mockSummaries[selectedPatientId] || "No summary available for this patient.";
      setSummary(mockSummary);
      setSummaryStatus('generated');
      setIsGenerating(false);
    }, 2000);
  };

  const markAsReviewed = () => {
    setSummaryStatus('ready-for-review');
  };

  useEffect(() => {
    if (selectedPatientId) {
      // Reset status when patient changes
      setSummaryStatus('not-generated');
      setSummary('');
    }
  }, [selectedPatientId]);

  const getStatusBadge = () => {
    switch (summaryStatus) {
      case 'generated':
        return <Badge className="bg-green-100 text-green-800 border-green-300">AI Generated</Badge>;
      case 'ready-for-review':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Ready for Review</Badge>;
      case 'generating':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Generating...</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = () => {
    switch (summaryStatus) {
      case 'generated':
        return <Brain className="w-4 h-4 text-green-600" />;
      case 'ready-for-review':
        return <CheckCircle className="w-4 h-4 text-purple-600" />;
      case 'generating':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <Brain className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="h-full bg-blue-50 p-2 shadow-md overflow-y-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          {getStatusIcon()}
          <h2 className="text-xs font-semibold text-blue-700">AI Patient Summary</h2>
        </div>
        {getStatusBadge()}
      </div>
      
      {selectedPatientId ? (
        <Card className="mt-2">
          <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center justify-between">
              Patient Summary
              {summaryStatus === 'generated' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAsReviewed}
                  className="h-6 px-2 text-xs"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Mark Reviewed
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {summaryStatus === 'not-generated' ? (
              <div className="text-center py-4">
                <Button
                  onClick={generateSummary}
                  disabled={isGenerating}
                  className="h-8 px-3 text-xs"
                >
                  <Brain className="w-3 h-3 mr-1" />
                  Generate AI Summary
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Click to generate an AI-powered patient summary
                </p>
              </div>
            ) : summaryStatus === 'generating' ? (
              <div className="flex items-center justify-center py-4">
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                <span className="text-xs text-blue-600">Analyzing patient data...</span>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    Generated {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center justify-center h-24">
          <p className="text-slate-500 text-center text-xs">
            Select a patient to generate an AI summary.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIPatientSummary;