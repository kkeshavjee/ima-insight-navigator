
import { 
  MedicalKnowledgeGraph, 
  GraphNode, 
  GraphEdge, 
  NodeType, 
  EdgeType,
  PatientNode,
  ConditionNode,
  MedicationNode,
  LabNode,
  SocialHistoryNode,
  FamilyHistoryNode,
  ProcedureNode,
  GraphQuery,
  GraphPath,
  VisualNode,
  VisualEdge,
  GraphVisualization
} from '../types/graph-models';

export class MedicalGraphService {
  private graphs: Map<string, MedicalKnowledgeGraph> = new Map();

  // Initialize with mock data
  constructor() {
    this.initializeMockData();
  }

  // Get patient's complete knowledge graph
  getPatientGraph(patientId: string): MedicalKnowledgeGraph | null {
    return this.graphs.get(patientId) || null;
  }

  // Get nodes by type
  getNodesByType(patientId: string, nodeType: NodeType): GraphNode[] {
    const graph = this.graphs.get(patientId);
    if (!graph) return [];
    
    return graph.nodes.filter(node => node.type === nodeType);
  }

  // Get related nodes (one hop from a specific node)
  getRelatedNodes(patientId: string, nodeId: string): GraphNode[] {
    const graph = this.graphs.get(patientId);
    if (!graph) return [];

    const relatedNodeIds = graph.edges
      .filter(edge => edge.source === nodeId || edge.target === nodeId)
      .map(edge => edge.source === nodeId ? edge.target : edge.source);

    return graph.nodes.filter(node => relatedNodeIds.includes(node.id));
  }

  // Get path between two nodes
  getPathBetweenNodes(patientId: string, sourceNodeId: string, targetNodeId: string): GraphPath | null {
    const graph = this.graphs.get(patientId);
    if (!graph) return null;

    // Simple direct path check
    const directEdge = graph.edges.find(edge => 
      (edge.source === sourceNodeId && edge.target === targetNodeId) ||
      (edge.source === targetNodeId && edge.target === sourceNodeId)
    );

    if (directEdge) {
      const sourceNode = graph.nodes.find(n => n.id === sourceNodeId);
      const targetNode = graph.nodes.find(n => n.id === targetNodeId);
      
      if (sourceNode && targetNode) {
        return {
          nodes: [sourceNode, targetNode],
          edges: [directEdge],
          pathType: 'direct',
          strength: directEdge.weight || 1
        };
      }
    }

    return null;
  }

  // Convert graph to visualization format
  toVisualization(patientId: string, centerNodeId?: string): GraphVisualization | null {
    const graph = this.graphs.get(patientId);
    if (!graph) return null;

    const visualNodes: VisualNode[] = graph.nodes.map(node => ({
      ...node,
      color: this.getNodeColor(node.type),
      size: this.getNodeSize(node.type),
      group: node.type
    }));

    const visualEdges: VisualEdge[] = graph.edges.map(edge => ({
      ...edge,
      color: this.getEdgeColor(edge.type),
      width: edge.weight || 1,
      style: 'solid'
    }));

    return {
      nodes: visualNodes,
      edges: visualEdges,
      layout: 'force',
      centerNodeId
    };
  }

  private getNodeColor(nodeType: NodeType): string {
    const colors: Record<NodeType, string> = {
      'Patient': '#4F46E5',
      'Condition': '#DC2626',
      'Medication': '#059669',
      'Lab': '#D97706',
      'Vital': '#7C3AED',
      'Allergy': '#BE123C',
      'Provider': '#0891B2',
      'Encounter': '#4338CA',
      'Symptom': '#F59E0B',
      'Diagnosis': '#EF4444',
      'FamilyHistory': '#F97316',
      'SocialHistory': '#10B981',
      'RiskFactor': '#EC4899',
      'Document': '#6B7280',
      'Site': '#374151',
      'Procedure': '#8B5CF6'
    };
    return colors[nodeType] || '#6B7280';
  }

  private getEdgeColor(edgeType: EdgeType): string {
    return '#9CA3AF'; // Default gray for all edges
  }

  private getNodeSize(nodeType: NodeType): number {
    const sizes: Partial<Record<NodeType, number>> = {
      'Patient': 20,
      'Condition': 15,
      'Medication': 12,
      'Lab': 10
    };
    return sizes[nodeType] || 8;
  }

  private initializeMockData() {
    // Mock data for patient p001
    const patient001Graph: MedicalKnowledgeGraph = {
      patientId: 'p001',
      lastUpdated: '2024-12-19T10:00:00Z',
      nodes: [
        {
          id: 'patient_p001',
          type: 'Patient',
          label: 'John Smith',
          properties: {
            firstName: 'John',
            lastName: 'Smith',
            dateOfBirth: '1975-05-15',
            sex: 'Male',
            healthCardNumber: 'HC123456789'
          }
        },
        {
          id: 'condition_htn',
          type: 'Condition',
          label: 'Hypertension',
          properties: {
            name: 'Essential Hypertension',
            icdCode: 'I10',
            status: 'Active',
            severity: 'Moderate',
            onsetDate: '2020-03-15',
            category: 'Cardiovascular'
          }
        },
        {
          id: 'condition_dm',
          type: 'Condition',
          label: 'Diabetes Mellitus Type 2',
          properties: {
            name: 'Type 2 Diabetes Mellitus',
            icdCode: 'E11',
            status: 'Active',
            severity: 'Mild',
            onsetDate: '2019-08-22',
            category: 'Endocrine'
          }
        },
        {
          id: 'med_lisinopril',
          type: 'Medication',
          label: 'Lisinopril 20mg',
          properties: {
            name: 'Lisinopril',
            dosage: '20mg',
            frequency: 'Once daily',
            route: 'Oral',
            class: 'ACE Inhibitor',
            status: 'Active',
            startDate: '2020-03-20'
          }
        },
        {
          id: 'med_metformin',
          type: 'Medication',
          label: 'Metformin 1000mg',
          properties: {
            name: 'Metformin',
            dosage: '1000mg',
            frequency: 'Twice daily',
            route: 'Oral',
            class: 'Biguanide',
            status: 'Active',
            startDate: '2019-08-25'
          }
        },
        {
          id: 'lab_hba1c',
          type: 'Lab',
          label: 'HbA1c 7.2%',
          properties: {
            testName: 'Hemoglobin A1c',
            value: '7.2',
            unit: '%',
            referenceRange: '<7.0',
            status: 'Abnormal',
            date: '2024-05-15'
          }
        },
        {
          id: 'social_smoking',
          type: 'SocialHistory',
          label: 'Former Smoker (20 pack-years)',
          properties: {
            category: 'Smoking',
            description: 'Former smoker, 20 pack-year history',
            status: 'Former',
            quantity: '1 pack/day',
            duration: '20 years'
          }
        },
        {
          id: 'family_dm',
          type: 'FamilyHistory',
          label: 'Father - Diabetes',
          properties: {
            relationship: 'Father',
            condition: 'Type 2 Diabetes Mellitus',
            ageAtOnset: 55,
            status: 'Deceased'
          }
        },
        {
          id: 'procedure_appendectomy',
          type: 'Procedure',
          label: 'Appendectomy (2015)',
          properties: {
            name: 'Laparoscopic Appendectomy',
            code: '44970',
            date: '2015-07-10',
            status: 'Completed',
            notes: 'Uncomplicated procedure'
          }
        }
      ],
      edges: [
        {
          id: 'edge_patient_htn',
          source: 'patient_p001',
          target: 'condition_htn',
          type: 'HAS_CONDITION',
          label: 'has condition',
          weight: 1
        },
        {
          id: 'edge_patient_dm',
          source: 'patient_p001',
          target: 'condition_dm',
          type: 'HAS_CONDITION',
          label: 'has condition',
          weight: 1
        },
        {
          id: 'edge_htn_lisinopril',
          source: 'condition_htn',
          target: 'med_lisinopril',
          type: 'PRESCRIBED_BY',
          label: 'treated with',
          weight: 0.9
        },
        {
          id: 'edge_dm_metformin',
          source: 'condition_dm',
          target: 'med_metformin',
          type: 'PRESCRIBED_BY',
          label: 'treated with',
          weight: 0.9
        },
        {
          id: 'edge_dm_hba1c',
          source: 'condition_dm',
          target: 'lab_hba1c',
          type: 'INDICATES',
          label: 'monitored by',
          weight: 0.8
        },
        {
          id: 'edge_patient_smoking',
          source: 'patient_p001',
          target: 'social_smoking',
          type: 'SOCIAL_HISTORY_OF',
          label: 'social history',
          weight: 0.7
        },
        {
          id: 'edge_patient_family_dm',
          source: 'patient_p001',
          target: 'family_dm',
          type: 'FAMILY_HISTORY_OF',
          label: 'family history',
          weight: 0.6
        },
        {
          id: 'edge_smoking_htn',
          source: 'social_smoking',
          target: 'condition_htn',
          type: 'AT_RISK_FOR',
          label: 'risk factor for',
          weight: 0.5
        },
        {
          id: 'edge_family_dm_patient_dm',
          source: 'family_dm',
          target: 'condition_dm',
          type: 'AT_RISK_FOR',
          label: 'genetic risk for',
          weight: 0.4
        }
      ]
    };

    this.graphs.set('p001', patient001Graph);
  }
}

// Singleton instance
export const graphService = new MedicalGraphService();
