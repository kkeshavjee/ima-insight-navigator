import React from 'react';
import { Brain, Activity, FileText, Users, Terminal, Cpu, Eye } from 'lucide-react';
import DaySchedulePane from '../DaySchedulePane';
import PatientProfilePane from '../PatientProfilePane';
import DrillDownPane from '../DrillDownPane';
import FinalNotePane from '../FinalNotePane';
import PatientBanner from '../PatientBanner';

interface ApolloLayoutCommandProps {
  selectedPatientId: string | null;
  selectedEncounterId: string | null;
  selectedNodeData: any;
  onPatientSelect: (patientId: string, encounterId: string) => void;
  onNodeSelect: (nodeData: any) => void;
}

const ApolloLayoutCommand: React.FC<ApolloLayoutCommandProps> = ({
  selectedPatientId,
  selectedEncounterId,
  selectedNodeData,
  onPatientSelect,
  onNodeSelect
}) => {
  return (
    <div className="h-screen bg-background font-mono overflow-hidden">
      {/* Command Center Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Terminal className="w-6 h-6 text-primary" />
                <div className="absolute inset-0 bg-primary/30 rounded animate-apollo-glow"></div>
              </div>
              <div className="font-apollo">
                <div className="text-sm font-bold tracking-[0.2em] apollo-text-glow">APOLLO.CMD</div>
                <div className="text-xs text-muted-foreground">Neural Command Interface</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Cpu className="w-3 h-3 text-accent" />
                <span className="text-muted-foreground">CPU:</span>
                <span className="text-accent">98.7%</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">VISION:</span>
                <span className="text-primary">ACTIVE</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-muted-foreground">STATUS:</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full apollo-status-active animate-apollo-pulse"></div>
              <span className="text-accent">OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Command Interface Patient Banner */}
      {selectedPatientId && (
        <div className="border-b border-border/30 bg-card/30">
          <PatientBanner selectedPatientId={selectedPatientId} />
        </div>
      )}

      {/* Main Command Grid */}
      <div className="flex-1 p-4 grid grid-cols-12 gap-4 h-full overflow-hidden">
        {/* Terminal 1: Schedule */}
        <div className="col-span-3 apollo-animate-in">
          <div className="apollo-panel h-full border border-primary/30">
            <div className="border-b border-border/50 px-4 py-2 bg-card/50">
              <div className="flex items-center gap-2 text-xs font-mono">
                <Users className="w-3 h-3 text-primary" />
                <span className="text-primary">SCHEDULE.EXE</span>
                <div className="ml-auto w-2 h-2 rounded-full apollo-status-active"></div>
              </div>
            </div>
            <div className="p-4 h-full overflow-hidden">
              <DaySchedulePane onSelectPatient={onPatientSelect} selectedPatientId={selectedPatientId} />
            </div>
          </div>
        </div>

        {/* Terminal 2: Patient Analysis */}
        <div className="col-span-4 apollo-animate-in" style={{ animationDelay: '0.1s' }}>
          <div className="apollo-panel h-full border border-accent/30 apollo-data-glow">
            <div className="border-b border-border/50 px-4 py-2 bg-card/50">
              <div className="flex items-center gap-2 text-xs font-mono">
                <Activity className="w-3 h-3 text-accent animate-apollo-pulse" />
                <span className="text-accent">PATIENT.TIMELINE</span>
                <div className="ml-auto flex items-center gap-1">
                  <span className="text-accent">ANALYZING</span>
                  <div className="w-2 h-2 rounded-full bg-accent animate-apollo-pulse"></div>
                </div>
              </div>
            </div>
            <div className="p-4 h-full overflow-hidden">
              <PatientProfilePane selectedPatientId={selectedPatientId} onNodeSelect={onNodeSelect} />
            </div>
          </div>
        </div>

        {/* Terminal 3: Neural Analysis */}
        <div className="col-span-2 apollo-animate-in" style={{ animationDelay: '0.2s' }}>
          <div className="apollo-panel h-full border border-primary/30">
            <div className="border-b border-border/50 px-4 py-2 bg-card/50">
              <div className="flex items-center gap-2 text-xs font-mono">
                <Brain className="w-3 h-3 text-primary animate-apollo-pulse" />
                <span className="text-primary">NEURAL.SYS</span>
                <div className="ml-auto w-2 h-2 rounded-full apollo-status-active"></div>
              </div>
            </div>
            <div className="p-4 h-full overflow-hidden">
              <DrillDownPane selectedNodeData={selectedNodeData} selectedPatientId={selectedPatientId} />
            </div>
          </div>
        </div>

        {/* Terminal 4: Documentation */}
        <div className="col-span-3 apollo-animate-in" style={{ animationDelay: '0.3s' }}>
          <div className="apollo-panel h-full border border-primary/30">
            <div className="border-b border-border/50 px-4 py-2 bg-card/50">
              <div className="flex items-center gap-2 text-xs font-mono">
                <FileText className="w-3 h-3 text-primary" />
                <span className="text-primary">NOTES.DOC</span>
                <div className="ml-auto flex items-center gap-1">
                  <span className="text-primary">WRITING</span>
                  <div className="w-2 h-2 rounded-full bg-primary animate-apollo-pulse"></div>
                </div>
              </div>
            </div>
            <div className="p-4 h-full overflow-hidden">
              <FinalNotePane selectedEncounterId={selectedEncounterId} selectedPatientId={selectedPatientId} />
            </div>
          </div>
        </div>
      </div>

      {/* Command Footer */}
      <div className="border-t border-border/50 bg-card/30 px-6 py-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">apollo@medical-station:~$</span>
            <span className="text-primary">monitoring_patient_vitals --live</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>UPTIME: 99.97%</span>
            <span>MEM: 2.1GB/8GB</span>
            <span>v2.1.0-neural</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApolloLayoutCommand;