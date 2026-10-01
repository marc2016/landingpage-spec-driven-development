import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Phase1VibePain } from './components/Phase1VibePain';
import { Phase2MicroInteraction } from './components/Phase2MicroInteraction';
import { Phase3Workflow } from './components/Phase3Workflow';
import { Phase4Comparison } from './components/Phase4Comparison';
import { AudienceJoinView } from './components/AudienceJoinView';
import { MaterialIcon } from './components/MaterialIcon';
import { realtimeService } from './services/realtimeService';

export function App() {
  const [activePhase, setActivePhase] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'focused' | 'all'>('focused');
  const [isAudienceView, setIsAudienceView] = useState<boolean>(false);

  useEffect(() => {
    // Check if url contains ?join
    const params = new URLSearchParams(window.location.search);
    if (params.get('join') === '1' || params.has('code')) {
      setIsAudienceView(true);
    }

    const unsub = realtimeService.subscribeSession(() => {
      // Keep in sync
    });
    return () => unsub();
  }, []);

  const goToPhase = (phase: number) => {
    setActivePhase(phase);
    realtimeService.updateActivePhase(phase);

    if (viewMode === 'all') {
      const element = document.getElementById(`phase-${phase}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // If user opened audience join link on mobile or desktop
  if (isAudienceView) {
    return (
      <AudienceJoinView
        onBackToPresenter={() => {
          setIsAudienceView(false);
          const url = new URL(window.location.href);
          url.searchParams.delete('join');
          url.searchParams.delete('code');
          window.history.replaceState({}, '', url.toString());
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-foreground flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navbar with 4-phase stepper, Timer & QR Code modal */}
      <Navbar
        activePhase={activePhase}
        setActivePhase={goToPhase}
      />

      {/* Presentation View Toggle Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-semibold text-zinc-200">Workshop-Leitfaden</span>
          <span className="text-zinc-600">•</span>
          <span>Vibe Coding vs. Spec-Driven Development (OpenSpec)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile view tester button */}
          <button
            onClick={() => setIsAudienceView(true)}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            title="Teilnehmer-Ansicht (Handy-Pad) testen"
          >
            <MaterialIcon name="smartphone" className="text-sm" />
            <span className="hidden sm:inline">Handy-Pad</span>
          </button>

          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1.5 rounded-xl text-xs sm:text-sm">
            <button
              onClick={() => setViewMode('focused')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs ${
                viewMode === 'focused'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <MaterialIcon name="slideshow" className="text-sm text-cyan-400" />
              <span>Fokus-Modus</span>
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs ${
                viewMode === 'all'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <MaterialIcon name="grid_view" className="text-sm text-cyan-400" />
              <span>Alle 4 Schritte</span>
            </button>
          </div>
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
                <Phase4Comparison onRestart={() => goToPhase(1)} />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-20 py-10">
            <div id="phase-1" className="border-b border-zinc-850 pb-16">
              <Phase1VibePain onNextPhase={() => goToPhase(2)} />
            </div>
            <div id="phase-2" className="border-b border-zinc-850 pb-16">
              <Phase2MicroInteraction onNextPhase={() => goToPhase(3)} />
            </div>
            <div id="phase-3" className="border-b border-zinc-850 pb-16">
              <Phase3Workflow onNextPhase={() => goToPhase(4)} />
            </div>
            <div id="phase-4">
              <Phase4Comparison onRestart={() => goToPhase(1)} />
            </div>
          </div>
        )}
      </main>

      {/* Sleek Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-7 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-200">OpenSpec Workshop</span>
            <span>•</span>
            <span>Vibe Coding vs. Spec-Driven Development</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Echtzeit-Synchronisation aktiv
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
