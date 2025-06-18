
// Core entity interfaces based on the provided schema

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: 'Male' | 'Female' | 'Other';
  healthCardNumber: string;
  phone?: string;
  email?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  specialty: string;
  npi?: string;
  phone?: string;
  email?: string;
}

export interface Site {
  id: string;
  name: string;
  address: string;
  phone?: string;
  fax?: string;
}

export interface Encounter {
  id: string;
  patientId: string;
  providerId: string;
  siteId: string;
  encounterDate: string;
  encounterType: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  chiefComplaint?: string;
  notes?: string;
}

export interface ProblemList {
  id: string;
  patientId: string;
  encounterId?: string;
  problemName: string;
  icdCode?: string;
  onsetDate?: string;
  status: 'Active' | 'Inactive' | 'Resolved';
  severity?: 'Mild' | 'Moderate' | 'Severe';
  notes?: string;
}

export interface Medication {
  id: string;
  patientId: string;
  encounterId?: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  status: 'Active' | 'Discontinued' | 'Completed';
  instructions?: string;
}

export interface VitalSign {
  id: string;
  patientId: string;
  encounterId?: string;
  measuredDate: string;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  heartRate?: number;
  temperature?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
  height?: number;
  bmi?: number;
}

export interface Lab {
  id: string;
  patientId: string;
  encounterId?: string;
  testName: string;
  testCode?: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  status: 'Normal' | 'Abnormal' | 'Critical' | 'Pending';
  collectionDate: string;
  resultDate?: string;
  orderedBy: string;
}

export interface Diagnosis {
  id: string;
  patientId: string;
  encounterId?: string;
  diagnosisName: string;
  icdCode: string;
  diagnosisDate: string;
  type: 'Primary' | 'Secondary';
  status: 'Active' | 'Inactive' | 'Resolved';
}

export interface Allergy {
  id: string;
  patientId: string;
  allergen: string;
  reaction: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Life-threatening';
  onsetDate?: string;
  notes?: string;
}

export interface RiskFactor {
  id: string;
  patientId: string;
  riskType: string;
  description: string;
  duration?: string;
  exposureLevel?: string;
  startDate?: string;
  endDate?: string;
}

export interface Billing {
  id: string;
  encounterId: string;
  diagnosisCode: string;
  procedureCode?: string;
  amount?: number;
  billingDate: string;
  status: 'Pending' | 'Submitted' | 'Paid' | 'Denied';
}

export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  siteId: string;
  appointmentDate: string;
  appointmentTime: string;
  duration: number;
  type: string;
  status: 'Scheduled' | 'Confirmed' | 'Cancelled' | 'No Show' | 'Completed';
  reason?: string;
}

export interface Vaccine {
  id: string;
  patientId: string;
  vaccineName: string;
  vaccineCode?: string;
  administrationDate: string;
  dose?: string;
  site?: string;
  manufacturer?: string;
  lotNumber?: string;
  administeredBy: string;
}

export interface Note {
  id: string;
  patientId: string;
  encounterId?: string;
  noteType: string;
  content: string;
  createdDate: string;
  createdBy: string;
  lastModified?: string;
}

export interface Document {
  id: string;
  patientId: string;
  encounterId?: string;
  documentType: string;
  fileName: string;
  filePath: string;
  uploadDate: string;
  uploadedBy: string;
  description?: string;
}

export interface FamilyHistory {
  id: string;
  patientId: string;
  relationship: string;
  condition: string;
  ageAtOnset?: number;
  ageAtDeath?: number;
  notes?: string;
}

// Composite types for UI components
export interface PatientSummary {
  patient: Patient;
  activeProblems: ProblemList[];
  currentMedications: Medication[];
  recentVitals: VitalSign[];
  recentLabs: Lab[];
  allergies: Allergy[];
}

export interface EncounterSummary {
  encounter: Encounter;
  provider: Provider;
  site: Site;
  diagnoses: Diagnosis[];
  vitals: VitalSign[];
  labs: Lab[];
  notes: Note[];
}
