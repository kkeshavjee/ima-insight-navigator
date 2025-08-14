import React, { useState } from 'react';
import { Brain, Activity, FileText, Users } from 'lucide-react';
import DaySchedulePane from '../DaySchedulePane';
import PatientProfilePane from '../PatientProfilePane';
import DrillDownPane from '../DrillDownPane';
import FinalNotePane from '../FinalNotePane';
import PatientBanner from '../PatientBanner';

interface ApolloLayoutClassicProps {
  selectedPatientId: string | null;
  selectedEncounterId: string | null;
  selectedNodeData: any;
  onPatientSelect: (patientId: string, encounterId: string) => void;
  onNodeSelect: (nodeData: any) => void;
}

const ApolloLayoutClassic: React.FC<ApolloLayoutClassicProps> = ({
  selectedPatientId,
  selectedEncounterId,
  selectedNodeData,
  onPatientSelect,
  onNodeSelect
}) => {
  return (
    <div className="flex flex-col h-screen bg-background font-apollo apollo-animate-in">
      {/* Jarvis-Inspired Header */}
      <header className="apollo-glass border-b border-border/50 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Brain className="w-8 h-8 text-primary apollo-text-glow animate-apollo-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full animate-apollo-glow"></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight apollo-text-glow">APOLLO</h1>
              <p className="text-sm text-muted-foreground">Intelligent Medical Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full apollo-status-active animate-apollo-pulse"></div>
            <span className="text-sm text-muted-foreground">Neural Network Online</span>
          </div>
        </div>
      </header>

      {/* Enhanced Patient Banner */}
      {selectedPatientId && (
        <div className="apollo-animate-in" style={{ animationDelay: '0.1s' }}>
          <PatientBanner selectedPatientId={selectedPatientId} />
        </div>
      )}

      {/* Main Interface Grid */}
      <main className="flex-1 p-6 gap-6 grid grid-cols-12 overflow-hidden">
        {/* Schedule Panel */}
        <div className="col-span-2 apollo-animate-in" style={{ animationDelay: '0.2s' }}>
          <div className="apollo-panel h-full p-4 apollo-interactive">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-sm">Schedule</h2>
            </div>
            <DaySchedulePane onSelectPatient={onPatientSelect} selectedPatientId={selectedPatientId} />
          </div>
        </div>

        {/* Patient Profile Panel */}
        <div className="col-span-4 apollo-animate-in" style={{ animationDelay: '0.3s' }}>
          <div className="apollo-panel h-full p-4 apollo-data-glow">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-accent" />
              <h2 className="font-semibold text-sm">Patient Timeline</h2>
            </div>
            <PatientProfilePane selectedPatientId={selectedPatientId} onNodeSelect={onNodeSelect} />
          </div>
        </div>

        {/* Drill Down Panel */}
        <div className="col-span-3 apollo-animate-in" style={{ animationDelay: '0.4s' }}>
          <div className="apollo-panel h-full p-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-sm">Analysis</h2>
            </div>
            <DrillDownPane selectedNodeData={selectedNodeData} selectedPatientId={selectedPatientId} />
          </div>
        </div>

        {/* Note Panel */}
        <div className="col-span-3 apollo-animate-in" style={{ animationDelay: '0.5s' }}>
          <div className="apollo-panel h-full p-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-sm">Clinical Note</h2>
            </div>
            <FinalNotePane selectedEncounterId={selectedEncounterId} selectedPatientId={selectedPatientId} />
          </div>
        </div>
      </main>

      {/* Futuristic Footer */}
      <footer className="apollo-glass border-t border-border/50 px-6 py-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>&copy; 2024 Apollo IMA</span>
            <span>Neural Engine v2.1.0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-apollo-pulse"></div>
            <span>Secure Clinical Environment</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApolloLayoutClassic;