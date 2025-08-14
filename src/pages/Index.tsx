import React, { useState } from 'react';
import { Settings, Layout, Command, Grid, RotateCcw } from 'lucide-react';

// Layout imports
import ApolloLayoutClassic from '../components/layouts/ApolloLayoutClassic';
import ApolloLayoutCard from '../components/layouts/ApolloLayoutCard';
import ApolloLayoutCommand from '../components/layouts/ApolloLayoutCommand';

type LayoutType = 'classic' | 'card' | 'command';

const Index = () => {
  // State management
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedEncounterId, setSelectedEncounterId] = useState<string | null>(null);
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
  const [currentLayout, setCurrentLayout] = useState<LayoutType>('classic');
  const [showLayoutSelector, setShowLayoutSelector] = useState(false);

  // Event handlers
  const handlePatientSelect = (patientId: string, encounterId: string) => {
    setSelectedPatientId(patientId);
    setSelectedEncounterId(encounterId);
    setSelectedNodeData(null); 
    console.log(`Patient selected: ${patientId}, Encounter: ${encounterId}`);
  };
  
  const handleNodeSelect = (nodeData: any) => {
    setSelectedNodeData(nodeData);
    console.log('Node selected:', nodeData);
  };

  const layoutOptions = [
    { 
      id: 'classic' as LayoutType, 
      name: 'Professional', 
      icon: Layout, 
      description: 'Clean medical interface'
    },
    { 
      id: 'card' as LayoutType, 
      name: 'Modern Cards', 
      icon: Grid, 
      description: 'Floating card design'
    },
    { 
      id: 'command' as LayoutType, 
      name: 'Command Center', 
      icon: Command, 
      description: 'Terminal-style interface'
    }
  ];

  const renderLayout = () => {
    const commonProps = {
      selectedPatientId,
      selectedEncounterId,
      selectedNodeData,
      onPatientSelect: handlePatientSelect,
      onNodeSelect: handleNodeSelect
    };

    switch (currentLayout) {
      case 'card':
        return <ApolloLayoutCard {...commonProps} />;
      case 'command':
        return <ApolloLayoutCommand {...commonProps} />;
      default:
        return <ApolloLayoutClassic {...commonProps} />;
    }
  };

  return (
    <div className="relative">
      {/* Layout Selector */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setShowLayoutSelector(!showLayoutSelector)}
            className="apollo-panel p-3 rounded-xl apollo-interactive flex items-center gap-2 text-sm"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Layout</span>
          </button>

          {showLayoutSelector && (
            <div className="absolute top-full right-0 mt-2 apollo-glass rounded-xl p-4 min-w-[280px] apollo-animate-in">
              <h3 className="font-semibold mb-3 text-sm">Choose Interface Style</h3>
              <div className="space-y-2">
                {layoutOptions.map((layout) => {
                  const Icon = layout.icon;
                  return (
                    <button
                      key={layout.id}
                      onClick={() => {
                        setCurrentLayout(layout.id);
                        setShowLayoutSelector(false);
                      }}
                      className={`w-full p-3 rounded-lg apollo-interactive text-left transition-all ${
                        currentLayout === layout.id 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${
                          currentLayout === layout.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <div>
                          <div className="font-medium text-sm">{layout.name}</div>
                          <div className="text-xs text-muted-foreground">{layout.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="border-t border-border/50 mt-4 pt-3">
                <button
                  onClick={() => {
                    setSelectedPatientId(null);
                    setSelectedEncounterId(null);
                    setSelectedNodeData(null);
                    setShowLayoutSelector(false);
                  }}
                  className="w-full p-2 rounded-lg apollo-interactive text-left flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Render Selected Layout */}
      {renderLayout()}
    </div>
  );
};

export default Index;
