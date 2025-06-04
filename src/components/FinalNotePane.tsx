
import React from 'react';
import { FileText, Edit, CheckCircle } from 'lucide-react';

interface FinalNotePaneProps {
  selectedEncounterId: string | null;
  selectedPatientId: string | null;
}

const FinalNotePane: React.FC<FinalNotePaneProps> = ({ selectedEncounterId, selectedPatientId }) => {
  // Mock note content
  const mockNotes: Record<string, any> = {
    e001: { // John Doe
      subjective: "Patient reports feeling well overall. Here for annual physical examination. Denies acute complaints. Reports good adherence to medications. Mild fatigue noted, attributes to work stress.",
      objective: "Vital Signs: BP 135/85, HR 72, Temp 98.6°F, Weight 185 lbs. Physical exam notable for mild hypertensive retinopathy on fundoscopy. Heart regular rate and rhythm, no murmurs. Lungs clear bilaterally.",
      assessment: "1. Essential hypertension - stable, well-controlled on current regimen\n2. Type 2 diabetes mellitus - well-controlled, A1C trending down\n3. Health maintenance - overdue for colonoscopy screening",
      plan: [
        "Continue Lisinopril 20mg daily and Metformin 1000mg BID",
        "Discussed importance of colon cancer screening - patient agrees to schedule colonoscopy",
        "Laboratory studies: CBC, CMP, HbA1c, Lipid Panel ordered for next visit",
        "Follow up in 3 months or sooner if concerns arise",
        "Reviewed dietary modifications and exercise recommendations"
      ]
    },
    e002: { // Jane Smith
      subjective: "Follow-up visit for asthma management. Reports increased use of rescue inhaler over past 2 weeks, approximately 2-3 times daily. Denies nocturnal awakenings. Trigger appears to be seasonal allergies.",
      objective: "Vital Signs: BP 118/76, HR 80, Temp 98.4°F, O2 Sat 98% on RA. Lungs with mild expiratory wheeze bilaterally. Peak flow 320 L/min (baseline 380 L/min).",
      assessment: "1. Mild persistent asthma - suboptimal control\n2. Allergic rhinitis - seasonal exacerbation",
      plan: [
        "Increase inhaled corticosteroid dose (Fluticasone to 220 mcg BID)",
        "Continue albuterol PRN, reviewed proper inhaler technique",
        "Start antihistamine for seasonal allergies",
        "Provided updated asthma action plan",
        "Follow up in 4 weeks to assess response"
      ]
    },
    e003: { // Alice Brown
      subjective: "New complaint of recurrent headaches over past 3 weeks. Describes as bilateral, throbbing, moderate intensity. Associated with mild nausea. Denies vision changes, fever, or neck stiffness.",
      objective: "Vital Signs: BP 125/78, HR 68, Temp 98.2°F. Neurological exam normal. No focal deficits. Fundoscopy normal. Neck supple without meningeal signs.",
      assessment: "1. Tension-type headaches vs. migraine without aura - new onset\n2. Rule out secondary causes",
      plan: [
        "Headache diary to identify triggers and patterns",
        "Trial of NSAIDs for acute episodes",
        "Stress reduction techniques and sleep hygiene counseling",
        "Return in 2 weeks or sooner if symptoms worsen",
        "Consider imaging if no improvement or red flag symptoms develop"
      ]
    }
  };

  const note = selectedEncounterId ? mockNotes[selectedEncounterId] : null;

  return (
    <div className="h-full bg-rose-100 p-4 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-rose-600" />
        <h2 className="text-xl font-semibold text-rose-700">AI-Generated Clinical Note</h2>
      </div>
      
      {selectedEncounterId && note ? (
        <div>
          <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
            <p className="text-slate-600">
              Encounter: <span className="font-medium text-rose-600">{selectedEncounterId}</span> | 
              Patient: <span className="font-medium text-rose-600">{selectedPatientId}</span>
            </p>
            <div className="mt-2 flex gap-2">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">AI Generated</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Ready for Review</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            {/* Subjective */}
            <div className="mb-4">
              <h3 className="text-rose-600 font-semibold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                Subjective
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm bg-gray-50 p-3 rounded">{note.subjective}</p>
            </div>

            {/* Objective */}
            {note.objective && (
              <div className="mb-4">
                <h3 className="text-rose-600 font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                  Objective
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm bg-gray-50 p-3 rounded">{note.objective}</p>
              </div>
            )}

            {/* Assessment */}
            <div className="mb-4">
              <h3 className="text-rose-600 font-semibold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                Assessment
              </h3>
              <div className="text-slate-700 leading-relaxed text-sm bg-gray-50 p-3 rounded whitespace-pre-line">
                {note.assessment}
              </div>
            </div>

            {/* Plan */}
            <div className="mb-4">
              <h3 className="text-rose-600 font-semibold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                Plan
              </h3>
              <ul className="space-y-2">
                {note.plan.map((item: string, index: number) => (
                  <li key={index} className="text-slate-700 text-sm bg-gray-50 p-2 rounded flex items-start gap-2">
                    <span className="text-rose-500 font-bold">{index + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors shadow-sm">
              <CheckCircle className="w-4 h-4" />
              Sign Note
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm">
              <Edit className="w-4 h-4" />
              Edit with AI
            </button>
            <button className="px-4 py-2 bg-gray-200 text-slate-700 rounded-md hover:bg-gray-300 transition-colors shadow-sm">
              Save Draft
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-40">
          <div className="text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-slate-500">Select a patient encounter from the schedule to view the AI-generated clinical note.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalNotePane;
