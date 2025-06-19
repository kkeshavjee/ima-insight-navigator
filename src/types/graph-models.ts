
// Graph-based data models for medical knowledge graph

// Base node interface
export interface GraphNode {
  id: string;
  type: NodeType;
  label: string;
  properties: Record<string, any>;
  metadata?: {
    createdDate?: string;
    lastUpdated?: string;
    source?: string;
    confidence?: number;
  };
}

// Node types in the medical knowledge graph
export type NodeType = 
  | 'Patient'
  | 'Condition'
  | 'Medication'
  | 'Procedure'
  | 'Lab'
  | 'Vital'
  | 'Allergy'
  | 'Provider'
  | 'Encounter'
  | 'Symptom'
  | 'Diagnosis'
  | 'FamilyHistory'
  | 'SocialHistory'
  | 'RiskFactor'
  | 'Document'
  | 'Site';

// Edge/Relationship interface
export interface GraphEdge {
  id: string;
  source: string; // source node id
  target: string; // target node id
  type: EdgeType;
  label: string;
  properties?: Record<string, any>;
  weight?: number;
  metadata?: {
    createdDate?: string;
    strength?: number;
    evidence?: string;
  };
}

// Relationship types in the medical knowledge graph
export type EdgeType =
  | 'HAS_CONDITION'
  | 'TAKES_MEDICATION'
  | 'HAD_PROCEDURE'
  | 'HAS_LAB_RESULT'
  | 'HAS_VITAL_SIGN'
  | 'ALLERGIC_TO'
  | 'TREATED_BY'
  | 'SEEN_IN_ENCOUNTER'
  | 'HAS_SYMPTOM'
  | 'DIAGNOSED_WITH'
  | 'FAMILY_HISTORY_OF'
  | 'SOCIAL_HISTORY_OF'
  | 'AT_RISK_FOR'
  | 'DOCUMENTED_IN'
  | 'LOCATED_AT'
  | 'PRESCRIBED_BY'
  | 'ORDERED_BY'
  | 'INDICATES'
  | 'CONTRAINDICATED_WITH'
  | 'INTERACTS_WITH'
  | 'CAUSED_BY'
  | 'LEADS_TO'
  | 'RELATED_TO';

// Specific node type interfaces
export interface PatientNode extends GraphNode {
  type: 'Patient';
  properties: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sex: 'Male' | 'Female' | 'Other';
    healthCardNumber: string;
    phone?: string;
    email?: string;
    address?: string;
  };
}

export interface ConditionNode extends GraphNode {
  type: 'Condition';
  properties: {
    name: string;
    icdCode?: string;
    status: 'Active' | 'Inactive' | 'Resolved';
    severity?: 'Mild' | 'Moderate' | 'Severe';
    onsetDate?: string;
    category?: string;
  };
}

export interface MedicationNode extends GraphNode {
  type: 'Medication';
  properties: {
    name: string;
    genericName?: string;
    dosage: string;
    frequency: string;
    route: string;
    class?: string;
    status: 'Active' | 'Discontinued' | 'Completed';
    startDate?: string;
    endDate?: string;
  };
}

export interface LabNode extends GraphNode {
  type: 'Lab';
  properties: {
    testName: string;
    value: string;
    unit?: string;
    referenceRange?: string;
    status: 'Normal' | 'Abnormal' | 'Critical' | 'Pending';
    date: string;
  };
}

export interface ProviderNode extends GraphNode {
  type: 'Provider';
  properties: {
    firstName: string;
    lastName: string;
    title: string;
    specialty: string;
    npi?: string;
  };
}

export interface EncounterNode extends GraphNode {
  type: 'Encounter';
  properties: {
    date: string;
    type: string;
    status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
    chiefComplaint?: string;
  };
}

export interface SocialHistoryNode extends GraphNode {
  type: 'SocialHistory';
  properties: {
    category: 'Smoking' | 'Alcohol' | 'Exercise' | 'Diet' | 'Occupation' | 'Other';
    description: string;
    status?: 'Current' | 'Former' | 'Never';
    quantity?: string;
    duration?: string;
  };
}

export interface FamilyHistoryNode extends GraphNode {
  type: 'FamilyHistory';
  properties: {
    relationship: string;
    condition: string;
    ageAtOnset?: number;
    status: 'Living' | 'Deceased';
  };
}

export interface ProcedureNode extends GraphNode {
  type: 'Procedure';
  properties: {
    name: string;
    code?: string;
    date: string;
    status: 'Completed' | 'Scheduled' | 'Cancelled';
    notes?: string;
  };
}

// Complete knowledge graph structure
export interface MedicalKnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  patientId: string;
  lastUpdated: string;
}

// Helper types for querying and filtering
export interface GraphQuery {
  nodeTypes?: NodeType[];
  edgeTypes?: EdgeType[];
  patientId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  filters?: Record<string, any>;
}

export interface GraphPath {
  nodes: GraphNode[];
  edges: GraphEdge[];
  pathType: 'direct' | 'indirect';
  strength: number;
}

// UI-specific types for visualization
export interface VisualNode extends GraphNode {
  x?: number;
  y?: number;
  color?: string;
  size?: number;
  group?: string;
}

export interface VisualEdge extends GraphEdge {
  color?: string;
  width?: number;
  style?: 'solid' | 'dashed' | 'dotted';
}

export interface GraphVisualization {
  nodes: VisualNode[];
  edges: VisualEdge[];
  layout: 'force' | 'hierarchical' | 'circular' | 'grid';
  centerNodeId?: string;
}
