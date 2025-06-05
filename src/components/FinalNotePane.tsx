
import React, { useState } from 'react';
import { FileText, Edit, CheckCircle, UserPlus, Calendar, FileCheck } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface FinalNotePaneProps {
  selectedEncounterId: string | null;
  selectedPatientId: string | null;
}

const FinalNotePane: React.FC<FinalNotePaneProps> = ({ selectedEncounterId, selectedPatientId }) => {
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<string[]>([]);
  const [selectedLabs, setSelectedLabs] = useState<string[]>([]);

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

  const isPrescriptionChecked = (prescriptionId: string, isActive: boolean) => {
    return isActive || selectedPrescriptions.includes(prescriptionId);
  };

  const isLabChecked = (labId: string, isActive: boolean) => {
    return isActive || selectedLabs.includes(labId);
  };

  return (
    <div className="h-full bg-rose-100 p-3 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-4 h-4 text-rose-600" />
        <h2 className="text-sm font-semibold text-rose-700">Note Constructor</h2>
      </div>
      
      {selectedEncounterId && note ? (
        <div>
          <div className="mb-3 p-2 bg-white rounded-lg shadow-sm">
            <div className="mt-2 flex gap-2">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">AI Generated</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Ready for Review</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-3 mb-3">
            {/* Subjective */}
            <div className="mb-3">
              <h3 className="text-rose-600 font-semibold mb-2 flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                Subjective
              </h3>
              <p className="text-slate-700 leading-relaxed text-xs bg-gray-50 p-2 rounded">{note.subjective}</p>
            </div>

            {/* Objective */}
            {note.objective && (
              <div className="mb-3">
                <h3 className="text-rose-600 font-semibold mb-2 flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                  Objective
                </h3>
                <p className="text-slate-700 leading-relaxed text-xs bg-gray-50 p-2 rounded">{note.objective}</p>
              </div>
            )}

            {/* Assessment */}
            <div className="mb-3">
              <h3 className="text-rose-600 font-semibold mb-2 flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                Assessment
              </h3>
              <div className="text-slate-700 leading-relaxed text-xs bg-gray-50 p-2 rounded whitespace-pre-line">
                {note.assessment}
              </div>
            </div>

            {/* Plan */}
            <div className="mb-3">
              <h3 className="text-rose-600 font-semibold mb-2 flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                Plan
              </h3>
              
              {/* Prescriptions */}
              {note.plan.prescriptions && note.plan.prescriptions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-green-600 font-medium mb-2 text-sm">Prescriptions</h4>
                  <div className="space-y-2">
                    {note.plan.prescriptions.map((prescription: any) => (
                      <div key={prescription.id} className="flex items-center gap-2 text-xs">
                        <Checkbox
                          id={prescription.id}
                          checked={isPrescriptionChecked(prescription.id, prescription.active)}
                          onCheckedChange={(checked) => handlePrescriptionChange(prescription.id, checked as boolean)}
                        />
                        <label 
                          htmlFor={prescription.id} 
                          className={`cursor-pointer ${prescription.active ? 'text-green-700 font-medium' : 'text-gray-500'}`}
                        >
                          {prescription.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Labs */}
              {note.plan.labs && note.plan.labs.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-green-600 font-medium mb-2 text-sm">Labs</h4>
                  <div className="space-y-2">
                    {note.plan.labs.map((lab: any) => (
                      <div key={lab.id} className="flex items-center gap-2 text-xs">
                        <Checkbox
                          id={lab.id}
                          checked={isLabChecked(lab.id, lab.active)}
                          onCheckedChange={(checked) => handleLabChange(lab.id, checked as boolean)}
                        />
                        <label 
                          htmlFor={lab.id} 
                          className={`cursor-pointer ${lab.active ? 'text-green-700 font-medium' : 'text-gray-500'}`}
                        >
                          {lab.name} {lab.timing && `(${lab.timing})`}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Plan Items */}
              {note.plan.other && note.plan.other.length > 0 && (
                <div>
                  <h4 className="text-green-600 font-medium mb-2 text-sm">Other</h4>
                  <ul className="space-y-1">
                    {note.plan.other.map((item: string, index: number) => (
                      <li key={index} className="text-slate-700 text-xs bg-gray-50 p-2 rounded flex items-start gap-2">
                        <span className="text-rose-500 font-bold">{index + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button className="flex items-center gap-2 px-3 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors shadow-sm text-xs">
              <CheckCircle className="w-3 h-3" />
              Sign Note
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm text-xs">
              <Edit className="w-3 h-3" />
              Edit with AI
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors shadow-sm text-xs">
              <UserPlus className="w-3 h-3" />
              Referrals
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors shadow-sm text-xs">
              <Calendar className="w-3 h-3" />
              Follow-up
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors shadow-sm text-xs">
              <FileCheck className="w-3 h-3" />
              Fill Forms
            </button>
            <button className="px-3 py-2 bg-gray-200 text-slate-700 rounded-md hover:bg-gray-300 transition-colors shadow-sm text-xs">
              Save Draft
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Select a patient encounter from the schedule to view the AI-generated clinical note.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalNotePane;
