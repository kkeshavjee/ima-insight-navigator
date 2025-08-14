
import React from 'react';
import { FileText } from 'lucide-react';
import IntervalHistoryCard from './drill-down/IntervalHistoryCard';
import NodeDetailsView from './drill-down/NodeDetailsView';

interface DrillDownPaneProps {
  selectedNodeData: any;
  selectedPatientId?: string | null;
}

const DrillDownPane: React.FC<DrillDownPaneProps> = ({ selectedNodeData, selectedPatientId }) => {
  const getMockDetails = (node: any) => {
    if (!node) return null;
    
    if (node.id === 'node_htn') {
      return {
        medications: [
          { name: 'Lisinopril 20mg', dosage: 'Once daily', class: 'ACE Inhibitor' },
          { name: 'Amlodipine 10mg', dosage: 'Once daily', class: 'Calcium Channel Blocker' }
        ],
        labs: [
          { name: 'Potassium', value: '4.1 mEq/L', date: '2024-05-01', status: 'Normal' },
          { name: 'Creatinine', value: '1.0 mg/dL', date: '2024-05-01', status: 'Normal' }
        ],
        visits: [
          { date: '2024-04-15', summary: 'BP check, stable at 135/85. Continue current regimen.' }
        ],
        recentVisits: [
          { date: '2024-05-15', reason: 'Follow-up', note: 'BP 132/84 mmHg. Patient reports good adherence to medications. Discussed low-sodium diet importance.' },
          { date: '2024-04-15', reason: 'Routine Check', note: 'BP stable at 135/85. Lisinopril dose increased to 20mg. Follow-up in 6 weeks.' }
        ]
      };
    }
    
    if (node.id === 'node_dm') {
      return {
        medications: [
          { name: 'Metformin 1000mg', dosage: 'Twice daily', class: 'Biguanide' }
        ],
        labs: [
          { name: 'HbA1c', value: '7.2%', date: '2024-03-10', status: 'Elevated' },
          { name: 'Glucose, Fasting', value: '130 mg/dL', date: '2024-03-10', status: 'Elevated' }
        ],
        visits: [
          { date: '2024-03-15', summary: 'Diabetes management discussed. A1C trending down.' }
        ],
        recentVisits: [
          { date: '2024-04-20', reason: 'Diabetes Management', note: 'HbA1c 7.2%, down from 7.8%. Patient adherent to metformin. Reinforced carb counting and exercise plan.' },
          { date: '2024-03-15', reason: 'Follow-up', note: 'Reviewing diabetes self-management. Added continuous glucose monitoring. Next visit in 3 months.' }
        ]
      };
    }
    
    if (node.id === 'node_social_smoking') {
      return {
        medications: [],
        labs: [],
        visits: [],
        recentVisits: [
          { date: '2024-05-10', reason: 'Smoking Cessation' }
        ]
      };
    }
    
    if (node.id === 'node_surgery_appendix') {
      return {
        medications: [],
        labs: [],
        visits: [],
        recentVisits: [
          { date: '2024-02-10', reason: 'Annual Physical' }
        ]
      };
    }
    
    if (node.id === 'node_family_dm') {
      return {
        medications: [],
        labs: [],
        visits: [],
        recentVisits: [
          { date: '2024-05-15', reason: 'Follow-up' }
        ]
      };
    }
    
    if (node.id === 'node_labs') {
      return {
        medications: [],
        labs: [
          { name: 'FBS', value: '126 mg/dL', date: '2024-05-15', status: 'Elevated', trend: 'up' },
          { name: 'HbA1c', value: '7.2%', date: '2024-05-10', status: 'Elevated', trend: 'down' },
          { name: 'Potassium', value: '4.1 mEq/L', date: '2024-05-01', status: 'Normal', trend: 'stable' },
          { name: 'Creatinine', value: '1.0 mg/dL', date: '2024-05-01', status: 'Normal', trend: 'stable' },
          { name: 'Lipid Panel', value: 'TC 195 mg/dL', date: '2024-04-20', status: 'Normal', trend: 'down' }
        ],
        visits: [
          { date: '2024-05-15', summary: 'Lab review appointment. FBS trending up, will monitor closely.' }
        ],
        recentVisits: [
          { date: '2024-05-15', reason: 'Lab Review', note: 'Discussed FBS increase. Patient admits to recent dietary indiscretions. Reinforced dietary counseling.' },
          { date: '2024-05-01', reason: 'Routine Labs', note: 'Annual lab panel drawn. Results pending review at next appointment.' }
        ]
      };
    }
    
    return { medications: [], labs: [], visits: [], recentVisits: [] };
  };

  const getIntervalHistory = (patientId: string | null) => {
    switch (patientId) {
      case 'p001':
        return {
          labTests: [
            { name: 'Potassium', value: '4.1 mEq/L', date: '2024-05-01', status: 'Normal', change: 'New' },
            { name: 'Creatinine', value: '1.0 mg/dL', date: '2024-05-01', status: 'Normal', change: 'Stable' },
            { name: 'HbA1c', value: '7.0%', date: '2024-05-10', status: 'Elevated', change: 'Improved' }
          ],
          specialistNotes: [
            { specialist: 'Dr. Smith', date: '2024-05-08', summary: 'Blood pressure well controlled. Continue current medications.', type: 'Cardiology' },
            { specialist: 'Dr. Johnson', date: '2024-04-28', summary: 'Diabetic retinal screening - no changes from baseline.', type: 'Ophthalmology' }
          ],
          erDischargeSummaries: [
            { date: '2024-04-25', chiefComplaint: 'Chest pain', disposition: 'Discharged home', diagnosis: 'Atypical chest pain, rule out cardiac' }
          ],
          radiologyReports: [
            { study: 'Chest X-ray', date: '2024-05-05', findings: 'Clear lung fields, normal heart size', impression: 'No acute cardiopulmonary abnormalities' },
            { study: 'Abdominal US', date: '2024-04-30', findings: 'Normal liver echogenicity, no gallstones', impression: 'Normal abdominal ultrasound' }
          ]
        };
      
      case 'p002':
        return {
          labTests: [
            { name: 'CBC', value: 'WBC 8.2 K/uL', date: '2024-05-12', status: 'Normal', change: 'New' },
            { name: 'TSH', value: '2.1 mIU/L', date: '2024-05-05', status: 'Normal', change: 'Stable' },
            { name: 'Vitamin D', value: '18 ng/mL', date: '2024-04-20', status: 'Low', change: 'New' }
          ],
          specialistNotes: [
            { specialist: 'Dr. Williams', date: '2024-05-15', summary: 'Anxiety symptoms improving with current therapy. Continue CBT sessions.', type: 'Psychiatry' },
            { specialist: 'Dr. Brown', date: '2024-05-02', summary: 'Recommend vitamin D supplementation for deficiency.', type: 'Endocrinology' }
          ],
          erDischargeSummaries: [],
          radiologyReports: [
            { study: 'Thyroid US', date: '2024-04-28', findings: 'Normal thyroid size and echogenicity', impression: 'Normal thyroid ultrasound' }
          ]
        };
      
      case 'p003':
        return {
          labTests: [
            { name: 'Lipid Panel', value: 'Total Chol 245 mg/dL', date: '2024-05-08', status: 'High', change: 'Worsened' },
            { name: 'LDL', value: '165 mg/dL', date: '2024-05-08', status: 'High', change: 'New' },
            { name: 'CRP', value: '3.2 mg/L', date: '2024-04-25', status: 'Elevated', change: 'New' }
          ],
          specialistNotes: [
            { specialist: 'Dr. Davis', date: '2024-05-10', summary: 'Recommend statin therapy for hyperlipidemia. Lifestyle modifications discussed.', type: 'Cardiology' },
            { specialist: 'Dr. Miller', date: '2024-04-18', summary: 'Joint pain likely osteoarthritis. Conservative management recommended.', type: 'Rheumatology' }
          ],
          erDischargeSummaries: [],
          radiologyReports: [
            { study: 'Knee X-ray', date: '2024-04-15', findings: 'Mild joint space narrowing', impression: 'Early osteoarthritic changes' }
          ]
        };
      
      case 'p004':
        return {
          labTests: [
            { name: 'PSA', value: '1.8 ng/mL', date: '2024-05-03', status: 'Normal', change: 'Stable' },
            { name: 'Testosterone', value: '285 ng/dL', date: '2024-04-28', status: 'Low-Normal', change: 'New' },
            { name: 'Prostate Biopsy', value: 'Benign', date: '2024-04-20', status: 'Normal', change: 'New' }
          ],
          specialistNotes: [
            { specialist: 'Dr. Wilson', date: '2024-05-05', summary: 'Prostate biopsy results benign. Continue annual screening.', type: 'Urology' },
            { specialist: 'Dr. Garcia', date: '2024-04-22', summary: 'Sleep study shows mild sleep apnea. CPAP therapy recommended.', type: 'Pulmonology' }
          ],
          erDischargeSummaries: [],
          radiologyReports: [
            { study: 'Prostate MRI', date: '2024-04-10', findings: 'No suspicious lesions identified', impression: 'Benign prostatic hyperplasia' }
          ]
        };
      
      case 'p005':
        return {
          labTests: [
            { name: 'Mammogram', value: 'BI-RADS 2', date: '2024-05-12', status: 'Normal', change: 'Stable' },
            { name: 'Pap Smear', value: 'Normal', date: '2024-04-15', status: 'Normal', change: 'Stable' },
            { name: 'Bone Density', value: 'T-score -1.8', date: '2024-03-20', status: 'Osteopenia', change: 'New' }
          ],
          specialistNotes: [
            { specialist: 'Dr. Martinez', date: '2024-05-14', summary: 'Annual gynecological exam normal. Continue routine screening.', type: 'Gynecology' },
            { specialist: 'Dr. Lee', date: '2024-03-25', summary: 'Osteopenia noted. Recommend calcium and vitamin D supplementation.', type: 'Endocrinology' }
          ],
          erDischargeSummaries: [],
          radiologyReports: [
            { study: 'DEXA Scan', date: '2024-03-20', findings: 'Decreased bone density at lumbar spine', impression: 'Osteopenia' }
          ]
        };
      
      default:
        return {
          labTests: [],
          specialistNotes: [],
          erDischargeSummaries: [],
          radiologyReports: []
        };
    }
  };

  const details = getMockDetails(selectedNodeData);
  const intervalHistory = getIntervalHistory(selectedPatientId);

  return (
    <div className="h-full bg-indigo-100 p-2 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-1 mb-2">
        <FileText className="w-3 h-3 text-indigo-600" />
        <h2 className="text-xs font-semibold text-indigo-700">History Details</h2>
      </div>
      
      {!selectedPatientId ? (
        <div className="flex items-center justify-center h-24">
          <p className="text-indigo-500 text-center text-xs">Select a patient from the schedule to view interval history, or click on a node in the Patient History to view detailed information.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {selectedNodeData ? (
            <NodeDetailsView selectedNodeData={selectedNodeData} details={details} />
          ) : (
            <IntervalHistoryCard intervalHistory={intervalHistory} />
          )}
        </div>
      )}
    </div>
  );
};

export default DrillDownPane;
