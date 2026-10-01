import { useState, FC } from 'react';
import { MaterialIcon } from './MaterialIcon';

interface Phase1VibePainProps {
  onNextPhase: () => void;
}

export const Phase1VibePain: FC<Phase1VibePainProps> = ({ onNextPhase }) => {
  const [prompt, setPrompt] = useState(
    'Baue mir fix eine vollständige Benutzer-Verwaltung mit Rollen, Passwort-Reset und Session-Handling.'
  );
  const [isVibing, setIsVibing] = useState(false);
  const [vibeResult, setVibeResult] = useState<'idle' | 'success' | 'chaos'>('idle');

  const handleVibeClick = () => {
    setIsVibing(true);
    setVibeResult('idle');
    setTimeout(() => {
      setIsVibing(false);
      setVibeResult('chaos');
    }, 1000);
  };

  return (
    <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-72 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide">
          <MaterialIcon name="auto_awesome" className="text-sm text-cyan-400" />
          <span>1. Einstieg: Die Faszination der ersten Minuten</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Was ist eigentlich <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            „Vibe Coding“?
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-medium">
          Intuitive, rein prompt-gesteuerte Softwareentwicklung ohne formale Architekturvorgaben.
        </p>
      </div>

      {/* Die 2 Kern-Charakteristika – Nur Überschriften, Icons & Schlagworte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kachel 1 */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-xl space-y-4 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <MaterialIcon name="rocket_launch" className="text-2xl" />
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-bold">
              Rapid Prototyping
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Extrem hohe Geschwindigkeit
          </h3>

          {/* Schlagworte */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <MaterialIcon name="bolt" className="text-amber-400 text-base" />
              <span>Blitzschnelle Prototypen</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <MaterialIcon name="timer" className="text-cyan-400 text-base" />
              <span>Sekunden statt Tage</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <MaterialIcon name="auto_awesome" className="text-emerald-400 text-base" />
              <span>Hoher Wow-Effekt</span>
            </span>
          </div>
        </div>

        {/* Kachel 2 */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-xl space-y-4 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MaterialIcon name="forum" className="text-2xl" />
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold">
              Zero Barrier
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Niedrige Einstiegshürde
          </h3>

          {/* Schlagworte */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <MaterialIcon name="chat" className="text-emerald-400 text-base" />
              <span>Rein sprachliche Interaktion</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <MaterialIcon name="block" className="text-rose-400 text-base" />
              <span>Keine Spezifikationen</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <MaterialIcon name="play_arrow" className="text-teal-400 text-base" />
              <span>Sofort draufloscoden</span>
            </span>
          </div>
        </div>
      </div>

      {/* Interaktiver Live-Test: Das "Vibe it!" Experiment */}
      <div className="bg-zinc-900/95 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <MaterialIcon name="smart_toy" className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Live-Experiment: Der Vibe-Prompt
              </h2>
              <span className="text-xs text-zinc-400 font-medium">Was baut die KI ohne Architekturvorgaben?</span>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
            Prompt-Simulation
          </span>
        </div>

        {/* Input box */}
        <div className="space-y-3">
          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-750 focus:border-cyan-400 rounded-2xl p-4 text-sm text-white placeholder-zinc-500 outline-none resize-none font-mono"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Keine Leitplanken • Keine formalen Tests</span>
            </div>

            <button
              onClick={handleVibeClick}
              disabled={isVibing}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-zinc-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
            >
              {isVibing ? (
                <>
                  <MaterialIcon name="sync" className="text-lg animate-spin" />
                  <span>KI generiert Vibes...</span>
                </>
              ) : (
                <>
                  <MaterialIcon name="bolt" className="text-lg" />
                  <span>Vibe it! (Let AI guess)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Chaos Outcome Card – Nur Schlagworte & Icons */}
        {vibeResult === 'chaos' && (
          <div className="p-5 sm:p-6 rounded-2xl bg-red-950/30 border border-red-500/40 text-red-200 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <MaterialIcon name="warning" className="text-2xl text-red-400" />
              <h4 className="text-base font-extrabold text-white">
                Der Vibe-Kipppunkt: Nach dem Prototyp kommt das Chaos
              </h4>
            </div>

            {/* Schlagworte-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-red-900/50 flex items-center gap-2.5 text-zinc-200 font-bold">
                <MaterialIcon name="lock_open" className="text-red-400 text-xl" />
                <span>Black-Box-Code</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-red-900/50 flex items-center gap-2.5 text-zinc-200 font-bold">
                <MaterialIcon name="history_toggle_off" className="text-red-400 text-xl" />
                <span>Kontextverlust</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-red-900/50 flex items-center gap-2.5 text-zinc-200 font-bold">
                <MaterialIcon name="bug_report" className="text-red-400 text-xl" />
                <span>Regressionen</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-red-900/50 flex items-center gap-2.5 text-zinc-200 font-bold">
                <MaterialIcon name="trending_up" className="text-red-400 text-xl" />
                <span>Scope Creep</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Überleitung ins 1. Plenum */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
            Nächster Schritt im Workshop
          </div>
          <p className="text-sm font-bold text-white">
            Jetzt analysieren wir gemeinsam im Plenum: Die 4 Dimensionen des Problems.
          </p>
        </div>

        <button
          onClick={onNextPhase}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-zinc-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 shrink-0"
        >
          <span>Weiter zu Schritt 2: Erstes Plenum</span>
          <MaterialIcon name="arrow_forward" className="text-lg" />
        </button>
      </div>
    </section>
  );
};
