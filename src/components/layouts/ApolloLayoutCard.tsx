import React from 'react';
import { Brain, Activity, FileText, Users, Zap, TrendingUp } from 'lucide-react';
import DaySchedulePane from '../DaySchedulePane';
import PatientProfilePane from '../PatientProfilePane';
import DrillDownPane from '../DrillDownPane';
import FinalNotePane from '../FinalNotePane';
import PatientBanner from '../PatientBanner';

interface ApolloLayoutCardProps {
  selectedPatientId: string | null;
  selectedEncounterId: string | null;
  selectedNodeData: any;
  onPatientSelect: (patientId: string, encounterId: string) => void;
  onNodeSelect: (nodeData: any) => void;
}

const ApolloLayoutCard: React.FC<ApolloLayoutCardProps> = ({
  selectedPatientId,
  selectedEncounterId,
  selectedNodeData,
  onPatientSelect,
  onNodeSelect
}) => {
  return (
    <div className="min-h-screen bg-background font-apollo">
      {/* Floating Header */}
      <div className="fixed top-4 left-4 right-4 z-50 apollo-animate-in">
        <div className="apollo-glass rounded-2xl px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Brain className="w-6 h-6 text-primary apollo-text-glow" />
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-apollo-glow"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-wide apollo-text-glow">APOLLO</h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full apollo-status-active"></div>
                  <span>AI Clinical Assistant</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Neural Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Patient Banner */}
      {selectedPatientId && (
        <div className="fixed top-20 left-4 right-4 z-40 apollo-animate-in" style={{ animationDelay: '0.1s' }}>
          <PatientBanner selectedPatientId={selectedPatientId} />
        </div>
      )}

      {/* Main Content - Card Layout */}
      <div className="pt-32 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Schedule Card - Compact */}
            <div className="col-span-12 lg:col-span-2 apollo-animate-in" style={{ animationDelay: '0.2s' }}>
              <div className="apollo-panel rounded-2xl p-6 h-[500px] apollo-interactive">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Today's Schedule</h2>
                    <p className="text-xs text-muted-foreground">8 patients</p>
                  </div>
                </div>
                <DaySchedulePane onSelectPatient={onPatientSelect} selectedPatientId={selectedPatientId} />
              </div>
            </div>

            {/* Patient Profile Card - Emphasized */}
            <div className="col-span-12 lg:col-span-5 apollo-animate-in" style={{ animationDelay: '0.3s' }}>
              <div className="apollo-panel rounded-2xl p-6 h-[500px] apollo-data-glow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Activity className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-semibold">Patient Timeline</h2>
                      <p className="text-xs text-muted-foreground">Health journey visualization</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full">
                    <TrendingUp className="w-3 h-3 text-accent" />
                    <span className="text-xs text-accent font-medium">Live Analysis</span>
                  </div>
                </div>
                <PatientProfilePane selectedPatientId={selectedPatientId} onNodeSelect={onNodeSelect} />
              </div>
            </div>

            {/* Analysis Card */}
            <div className="col-span-12 lg:col-span-2 apollo-animate-in" style={{ animationDelay: '0.4s' }}>
              <div className="apollo-panel rounded-2xl p-6 h-[500px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Brain className="w-5 h-5 text-primary animate-apollo-pulse" />
                  </div>
                  <div>
                    <h2 className="font-semibold">AI Analysis</h2>
                    <p className="text-xs text-muted-foreground">Deep insights</p>
                  </div>
                </div>
                <DrillDownPane selectedNodeData={selectedNodeData} selectedPatientId={selectedPatientId} />
              </div>
            </div>

            {/* Clinical Note Card */}
            <div className="col-span-12 lg:col-span-3 apollo-animate-in" style={{ animationDelay: '0.5s' }}>
              <div className="apollo-panel rounded-2xl p-6 h-[500px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Clinical Note</h2>
                    <p className="text-xs text-muted-foreground">AI-assisted documentation</p>
                  </div>
                </div>
                <FinalNotePane selectedEncounterId={selectedEncounterId} selectedPatientId={selectedPatientId} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Status Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-50">
        <div className="apollo-glass rounded-xl px-4 py-2 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-apollo-pulse"></div>
              <span>System Status: Optimal</span>
            </div>
            <span>|</span>
            <span>Apollo Neural Engine v2.1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApolloLayoutCard;