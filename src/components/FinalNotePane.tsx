
import React, { useState, useEffect } from 'react';
import { Brain, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import NoteHeader from './note/NoteHeader';
import NoteStatus from './note/NoteStatus';
import NoteSection from './note/NoteSection';
import PrescriptionList from './note/PrescriptionList';
import LabsList from './note/LabsList';
import OtherPlanItems from './note/OtherPlanItems';
import NoteActionButtons from './note/NoteActionButtons';
import EmptyNoteState from './note/EmptyNoteState';
import ExaminationFindings from './note/ExaminationFindings';

interface FinalNotePaneProps {
  selectedEncounterId: string | null;
  selectedPatientId: string | null;
}

const FinalNotePane: React.FC<FinalNotePaneProps> = ({ selectedEncounterId, selectedPatientId }) => {
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<string[]>([]);
  const [selectedLabs, setSelectedLabs] = useState<string[]>([]);
  
  // AI Summary state
  type SummaryStatus = 'generated' | 'ready-for-review' | 'generating' | 'not-generated';
  const [summaryStatus, setSummaryStatus] = useState<SummaryStatus>('not-generated');
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock patient summaries
  const mockSummaries: Record<string, string> = {
    p001: "67-year-old male with well-controlled hypertension and diabetes mellitus type 2. Former smoker with significant cardiovascular risk factors. Recent HbA1c indicates good glycemic control. Blood pressure trending within target range. Family history of diabetes adds to risk profile. Previous appendectomy without complications. Recommend continued current medication regimen with routine monitoring.",
    p002: "34-year-old female with mild persistent asthma. Excellent medication adherence with good symptom control. Regular exercise routine supports overall health. Strong family history of asthma. Peak flow measurements stable. No recent exacerbations. Continue current inhaler therapy with annual reassessment.",
    p003: "28-year-old patient with chronic tension-type headaches. Social alcohol use within recommended limits. Headache pattern suggests stress-related triggers. No concerning neurological findings. Response to preventive measures has been favorable. Consider lifestyle modifications and stress management techniques."
  };

  // Mock note content with structured plan data
  const mockNotes: Record<string, any> = {
    e001: { // John Doe
      subjective: "Patient reports feeling well overall. Here for annual physical examination. Denies acute complaints. Reports good adherence to medications. Mild fatigue noted, attributes to work stress.",
      objective: "Vital Signs: BP 135/85, HR 72, Temp 98.6°F, Weight 185 lbs. Physical exam notable for mild hypertensive retinopathy on fundoscopy. Heart regular rate and rhythm, no murmurs. Lungs clear bilaterally.",
      assessment: "1. Essential hypertension - stable, well-controlled on current regimen\n2. Type 2 diabetes mellitus - well-controlled, A1C trending down\n3. Health maintenance - overdue for colonoscopy screening",
      plan: {
        prescriptions: [
          { id: 'p1', name: 'Lisinopril 20mg daily', active: true },
          { id: 'p2', name: 'Metformin 1000mg BID', active: true },
          { id: 'p3', name: 'Atorvastatin 40mg daily', active: false },
        ],
        labs: [
          { id: 'l1', name: 'CBC', timing: 'q3months', active: true },
          { id: 'l2', name: 'CMP', timing: 'q3months', active: true },
          { id: 'l3', name: 'HbA1c', timing: 'q3months', active: true },
          { id: 'l4', name: 'Lipid Panel', timing: 'annual', active: false },
          { id: 'l5', name: 'TSH', timing: 'bi-annual', active: false },
        ],
        other: [
          "Discussed importance of colon cancer screening - patient agrees to schedule colonoscopy",
          "Follow up in 3 months or sooner if concerns arise",
          "Reviewed dietary modifications and exercise recommendations"
        ]
      }
    },
    e002: { // Jane Smith
      subjective: "Follow-up visit for asthma management. Reports increased use of rescue inhaler over past 2 weeks, approximately 2-3 times daily. Denies nocturnal awakenings. Trigger appears to be seasonal allergies.",
      objective: "Vital Signs: BP 118/76, HR 80, Temp 98.4°F, O2 Sat 98% on RA. Lungs with mild expiratory wheeze bilaterally. Peak flow 320 L/min (baseline 380 L/min).",
      assessment: "1. Mild persistent asthma - suboptimal control\n2. Allergic rhinitis - seasonal exacerbation",
      plan: {
        prescriptions: [
          { id: 'p1', name: 'Fluticasone 220 mcg BID', active: true },
          { id: 'p2', name: 'Albuterol PRN', active: true },
          { id: 'p3', name: 'Loratadine 10mg daily', active: true },
        ],
        labs: [
          { id: 'l1', name: 'IgE levels', timing: 'PRN', active: false },
          { id: 'l2', name: 'Vitamin D', timing: 'annual', active: false },
        ],
        other: [
          "Reviewed proper inhaler technique",
          "Provided updated asthma action plan",
          "Follow up in 4 weeks to assess response"
        ]
      }
    },
    e003: { // Alice Brown
      subjective: "New complaint of recurrent headaches over past 3 weeks. Describes as bilateral, throbbing, moderate intensity. Associated with mild nausea. Denies vision changes, fever, or neck stiffness.",
      objective: "Vital Signs: BP 125/78, HR 68, Temp 98.2°F. Neurological exam normal. No focal deficits. Fundoscopy normal. Neck supple without meningeal signs.",
      assessment: "1. Tension-type headaches vs. migraine without aura - new onset\n2. Rule out secondary causes",
      plan: {
        prescriptions: [
          { id: 'p1', name: 'Ibuprofen 600mg PRN', active: true },
          { id: 'p2', name: 'Sumatriptan 50mg PRN', active: false },
        ],
        labs: [
          { id: 'l1', name: 'CBC', timing: 'baseline', active: false },
          { id: 'l2', name: 'ESR', timing: 'baseline', active: false },
          { id: 'l3', name: 'TSH', timing: 'baseline', active: false },
        ],
        other: [
          "Headache diary to identify triggers and patterns",
          "Stress reduction techniques and sleep hygiene counseling",
          "Return in 2 weeks or sooner if symptoms worsen",
          "Consider imaging if no improvement or red flag symptoms develop"
        ]
      }
    }
  };

  const note = selectedEncounterId ? mockNotes[selectedEncounterId] : null;

  const handlePrescriptionChange = (prescriptionId: string, checked: boolean) => {
    setSelectedPrescriptions(prev => 
      checked 
        ? [...prev, prescriptionId]
        : prev.filter(id => id !== prescriptionId)
    );
  };

  const handleLabChange = (labId: string, checked: boolean) => {
    setSelectedLabs(prev => 
      checked 
        ? [...prev, labId]
        : prev.filter(id => id !== labId)
    );
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

  return (
    <div className="h-full bg-rose-100 p-2 rounded-lg shadow-md overflow-y-auto">
      <NoteHeader />
      
      {selectedEncounterId && note ? (
        <div>
          <NoteStatus />

          {/* AI Patient Summary Section */}
          {selectedPatientId && (
            <div className="bg-blue-50 rounded-lg p-3 mb-2 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-blue-700">AI Patient Summary</h3>
                </div>
                {getStatusBadge()}
              </div>
              
              {summaryStatus === 'not-generated' ? (
                <div className="text-center py-2">
                  <Button
                    onClick={generateSummary}
                    disabled={isGenerating}
                    size="sm"
                    className="h-7 px-3 text-xs"
                  >
                    <Brain className="w-3 h-3 mr-1" />
                    Generate AI Summary
                  </Button>
                </div>
              ) : summaryStatus === 'generating' ? (
                <div className="flex items-center justify-center py-2">
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  <span className="text-xs text-blue-600">Analyzing patient data...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        Generated {new Date().toLocaleTimeString()}
                      </span>
                    </div>
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
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm p-2 mb-2">
            {/* Subjective */}
            <NoteSection title="Subjective" content={note.subjective} />

            {/* Objective */}
            {note.objective && (
              <NoteSection title="Objective" content={note.objective} />
            )}

            {/* Physical Examination Findings - New 3-state checkboxes */}
            <ExaminationFindings />

            {/* Assessment */}
            <NoteSection title="Assessment" content={note.assessment} />

            {/* Plan */}
            <div className="mb-2">
              <h3 className="text-rose-600 font-semibold mb-1 flex items-center gap-1 text-xs">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                Plan
              </h3>
              
              {/* Prescriptions */}
              {note.plan.prescriptions && note.plan.prescriptions.length > 0 && (
                <PrescriptionList
                  prescriptions={note.plan.prescriptions}
                  selectedPrescriptions={selectedPrescriptions}
                  onPrescriptionChange={handlePrescriptionChange}
                />
              )}

              {/* Labs */}
              {note.plan.labs && note.plan.labs.length > 0 && (
                <LabsList
                  labs={note.plan.labs}
                  selectedLabs={selectedLabs}
                  onLabChange={handleLabChange}
                />
              )}

              {/* Other Plan Items */}
              {note.plan.other && note.plan.other.length > 0 && (
                <OtherPlanItems items={note.plan.other} />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <NoteActionButtons />
        </div>
      ) : (
        <EmptyNoteState />
      )}
    </div>
  );
};

export default FinalNotePane;
