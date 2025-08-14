import React from 'react';
import { Brain, Palette, Type, Sparkles, Zap, Activity } from 'lucide-react';

const ApolloDesignSystem: React.FC = () => {
  return (
    <div className="p-8 space-y-12 font-apollo">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Brain className="w-10 h-10 text-primary apollo-text-glow animate-apollo-pulse" />
          <h1 className="text-4xl font-bold apollo-text-glow">Apollo Design System</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A futuristic clinical interface inspired by Jarvis - calm, powerful, and always one step ahead.
        </p>
      </div>

      {/* Color Palette */}
      <section className="apollo-panel p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Color System</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Colors */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">PRIMARY INTELLIGENCE</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary shadow-lg"></div>
                <div className="text-sm">
                  <div className="font-medium">Apollo Primary</div>
                  <div className="text-muted-foreground">hsl(197, 92%, 58%)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg" style={{ background: 'hsl(197, 100%, 70%)' }}></div>
                <div className="text-sm">
                  <div className="font-medium">Primary Glow</div>
                  <div className="text-muted-foreground">hsl(197, 100%, 70%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Colors */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">HEALTH VITALITY</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent shadow-lg"></div>
                <div className="text-sm">
                  <div className="font-medium">Accent Green</div>
                  <div className="text-muted-foreground">hsl(149, 100%, 45%)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg" style={{ background: 'hsl(45, 100%, 51%)' }}></div>
                <div className="text-sm">
                  <div className="font-medium">Warning Amber</div>
                  <div className="text-muted-foreground">hsl(45, 100%, 51%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Surface Colors */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">SURFACE DEPTH</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-background border"></div>
                <div className="text-sm">
                  <div className="font-medium">Background</div>
                  <div className="text-muted-foreground">Deep charcoal</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-card"></div>
                <div className="text-sm">
                  <div className="font-medium">Card Surface</div>
                  <div className="text-muted-foreground">Elevated panel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="apollo-panel p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Type className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Typography</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-bold mb-2 apollo-text-glow">Primary Heading</h3>
            <p className="text-sm text-muted-foreground">Inter 700, 3xl, with glow effect</p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-2">Secondary Heading</h4>
            <p className="text-sm text-muted-foreground">Inter 600, xl</p>
          </div>
          
          <div>
            <p className="text-base mb-2">Body text with excellent readability for clinical environments.</p>
            <p className="text-sm text-muted-foreground">Inter 400, base size</p>
          </div>
          
          <div>
            <code className="font-mono text-sm bg-muted px-2 py-1 rounded">PATIENT_ID: p001</code>
            <p className="text-sm text-muted-foreground mt-1">JetBrains Mono for data</p>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="apollo-panel p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Interactive Elements</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Status Indicators */}
          <div className="space-y-4">
            <h3 className="font-semibold">Status Indicators</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full apollo-status-active animate-apollo-pulse"></div>
                <span className="text-sm">Active/Healthy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full apollo-status-warning animate-apollo-pulse"></div>
                <span className="text-sm">Warning/Attention</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full apollo-status-critical animate-apollo-pulse"></div>
                <span className="text-sm">Critical/Urgent</span>
              </div>
            </div>
          </div>

          {/* Glass Morphism */}
          <div className="space-y-4">
            <h3 className="font-semibold">Glass Morphism</h3>
            <div className="apollo-glass p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Glass Panel</div>
                  <div className="text-xs text-muted-foreground">Backdrop blur with subtle border</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section className="apollo-panel p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Motion & Interactions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">SLIDE IN</h3>
            <div className="apollo-panel p-4 rounded-xl apollo-animate-in">
              <p className="text-sm">Elements gracefully enter view</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">PULSE GLOW</h3>
            <div className="apollo-panel p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary animate-apollo-pulse" />
                <p className="text-sm">AI activity indicator</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">HOVER LIFT</h3>
            <div className="apollo-panel p-4 rounded-xl apollo-interactive">
              <p className="text-sm">Interactive feedback</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApolloDesignSystem;