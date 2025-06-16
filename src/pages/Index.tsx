
import React, { useState } from 'react';

// Component imports
import DaySchedulePane from '../components/DaySchedulePane';
import PatientProfilePane from '../components/PatientProfilePane';
import DrillDownPane from '../components/DrillDownPane';
import PreventionPredictionPane from '../components/PreventionPredictionPane';
import FinalNotePane from '../components/FinalNotePane';
import PatientBanner from '../components/PatientBanner';

const Index = () => {
  // State to manage selected patient and encounter
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedEncounterId, setSelectedEncounterId] = useState<string | null>(null);
  // State for selected node in knowledge graph (to be passed to DrillDownPane)
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);

  // Callback function for when a patient is selected in DaySchedulePane
  const handlePatientSelect = (patientId: string, encounterId: string) => {
    setSelectedPatientId(patientId);
    setSelectedEncounterId(encounterId);
    // Reset selected node when patient changes
    setSelectedNodeData(null); 
    console.log(`Patient selected: ${patientId}, Encounter: ${encounterId}`);
  };
  
  // Callback for when a node is selected in PatientProfilePane
  const handleNodeSelect = (nodeData: any) => {
    setSelectedNodeData(nodeData);
    console.log('Node selected:', nodeData);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-200 font-sans">
      {/* Header */}
      <header className="bg-slate-800 text-white p-3 shadow-lg">
        <h1 className="text-base font-bold">Next-Generation Intelligent Medical Assistant (IMA)</h1>
      </header>

      {/* Patient Banner */}
      {selectedPatientId && (
        <PatientBanner selectedPatientId={selectedPatientId} />
      )}

      {/* Main content area with 5 panes */}
      <main className="flex-grow p-3 flex gap-3 overflow-hidden">
        {/* Pane 1: Day Schedule - made narrower (1/8) */}
        <div className="w-1/8 h-full min-h-[300px]">
          <DaySchedulePane onSelectPatient={handlePatientSelect} selectedPatientId={selectedPatientId} />
        </div>

        {/* Middle 3 panes - adjusted proportions */}
        <div className="w-5/8 h-full flex">
          {/* Pane 2: Patient History - kept same */}
          <div className="w-1/4 h-full">
            <PatientProfilePane selectedPatientId={selectedPatientId} onNodeSelect={handleNodeSelect} />
          </div>

          {/* Pane 3: History Details - made narrower (3/8) */}
          <div className="w-3/8 h-full">
            <DrillDownPane selectedNodeData={selectedNodeData} />
          </div>

          {/* Pane 4: AI Recommendations - kept same */}
          <div className="w-1/4 h-full">
            <PreventionPredictionPane selectedPatientId={selectedPatientId} />
          </div>
        </div>

        {/* Pane 5: Final Note Display - made wider (1/4) */}
        <div className="w-1/4 h-full min-h-[300px]">
          <FinalNotePane selectedEncounterId={selectedEncounterId} selectedPatientId={selectedPatientId} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-700 text-white p-2 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} IMA Concept. For demonstration purposes only.</p>
      </footer>
    </div>
  );
};

export default Index;
