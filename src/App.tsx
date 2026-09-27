import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Phase1VibePain } from './components/Phase1VibePain';
import { Phase2MicroInteraction } from './components/Phase2MicroInteraction';
import { Phase3Workflow } from './components/Phase3Workflow';
import { Phase4Comparison } from './components/Phase4Comparison';
import { Phase5CTA } from './components/Phase5CTA';
import { LayoutGrid, Presentation } from 'lucide-react';

export function App() {
  const [activePhase, setActivePhase] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'focused' | 'all'>('focused');

  const goToPhase = (phase: number) => {
    setActivePhase(phase);
    if (viewMode === 'all') {
      const element = document.getElementById(`phase-${phase}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-foreground flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navbar with 20min Timer & Navigation */}
      <Navbar activePhase={activePhase} setActivePhase={goToPhase} />

      {/* Presentation View Toggle Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>20-Minuten Lightning Session</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">15 Teilnehmer (Public Sector Devs, Tech Leads, E-Gov Consultants)</span>
        </div>

        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setViewMode('focused')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'focused'
                ? 'bg-zinc-800 text-white font-medium shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Presentation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fokus-Modus</span>
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'all'
                ? 'bg-zinc-800 text-white font-medium shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
            <span>Gesamtübersicht</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {viewMode === 'focused' ? (
          <div className="transition-all duration-300">
            {activePhase === 1 && (
              <div id="phase-1" className="animate-fade-in">
                <Phase1VibePain onNextPhase={() => goToPhase(2)} />
              </div>
            )}
            {activePhase === 2 && (
              <div id="phase-2" className="animate-fade-in">
                <Phase2MicroInteraction onNextPhase={() => goToPhase(3)} />
              </div>
            )}
            {activePhase === 3 && (
              <div id="phase-3" className="animate-fade-in">
                <Phase3Workflow onNextPhase={() => goToPhase(4)} />
              </div>
            )}
            {activePhase === 4 && (
              <div id="phase-4" className="animate-fade-in">
                <Phase4Comparison onNextPhase={() => goToPhase(5)} />
              </div>
            )}
            {activePhase === 5 && (
              <div id="phase-5" className="animate-fade-in">
                <Phase5CTA onRestart={() => goToPhase(1)} />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-16 py-8">
            <div id="phase-1" className="border-b border-zinc-850 pb-16">
              <Phase1VibePain onNextPhase={() => goToPhase(2)} />
            </div>
            <div id="phase-2" className="border-b border-zinc-850 pb-16">
              <Phase2MicroInteraction onNextPhase={() => goToPhase(3)} />
            </div>
            <div id="phase-3" className="border-b border-zinc-850 pb-16">
              <Phase3Workflow onNextPhase={() => goToPhase(4)} />
            </div>
            <div id="phase-4" className="border-b border-zinc-850 pb-16">
              <Phase4Comparison onNextPhase={() => goToPhase(5)} />
            </div>
            <div id="phase-5">
              <Phase5CTA onRestart={() => goToPhase(1)} />
            </div>
          </div>
        )}
      </main>

      {/* Sleek Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">OpenSpec E-Government Demo</span>
            <span>•</span>
            <span>Breakout-Session: Formularentwicklung in der öffentlichen Verwaltung (20 Min)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Docker ready (Port 8080)
            </span>
            <span className="text-zinc-600">|</span>
            <span className="font-mono text-zinc-400">BITV 2.0 & RFC-2119</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
