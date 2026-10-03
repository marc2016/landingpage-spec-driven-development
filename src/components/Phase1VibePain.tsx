import { useState, FC } from 'react';
import { MaterialIcon } from './MaterialIcon';

interface Phase1VibePainProps {
  onNextPhase: () => void;
}

export const Phase1VibePain: FC<Phase1VibePainProps> = ({ onNextPhase }) => {
  // 3 Unterseiten für Vibe Coding:
  // 1: Definition & Reiz (Extrem hohe Geschwindigkeit & Niedrige Einstiegshürde)
  // 2: Der Vibe-Loop (Prompten, Ergebnis anschauen, Prompten, Ergebnis anschauen...)
  // 3: Der Prompt in Aktion & die Überleitungsfrage ("Was passiert jetzt?")
  const [subStep, setSubStep] = useState<1 | 2 | 3>(1);

  // Unterseite 2: Aktiver Schritt in der Schleife (für interaktives Durchklicken)
  const [activeLoopStep, setActiveLoopStep] = useState<number>(0);

  // Unterseite 3: Prompt & State
  const [prompt, setPrompt] = useState(
    'Baue mir fix eine vollständige Benutzer-Verwaltung mit Rollen, Passwort-Reset und Session-Handling.'
  );
  const [isVibing, setIsVibing] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  const handleVibeClick = () => {
    setIsVibing(true);
    setTimeout(() => {
      setIsVibing(false);
      setHasPrompted(true);
    }, 1100);
  };

  const loopIterations = [
    {
      id: 1,
      prompt: '„Mach fix Navigation oben hin...“',
      tag: 'Start',
      tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      preview: 'Sieht gut aus!',
      previewIcon: 'check_circle',
      previewColor: 'text-emerald-400',
    },
    {
      id: 2,
      prompt: '„Erweitere um ein Profil...“',
      tag: 'Feature',
      tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      preview: 'Passt, weiter!',
      previewIcon: 'check_circle',
      previewColor: 'text-teal-400',
    },
    {
      id: 3,
      prompt: '„Profil doch ganz anders...“',
      tag: 'Umbau',
      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      preview: 'Passt das noch?',
      previewIcon: 'help_outline',
      previewColor: 'text-amber-400',
    },
    {
      id: 4,
      prompt: '„Login reparieren...“',
      tag: 'Bugfix',
      tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      preview: 'Login kaputt!',
      previewIcon: 'error',
      previewColor: 'text-rose-400',
    },
  ];

  return (
    <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-72 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Top Bar with Sub-Steppern 1.1 / 1.2 / 1.3 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <MaterialIcon name="auto_awesome" className="text-xl" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <span>1. Einstieg: Vibe Coding</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {subStep === 1 && '1.1 Die Faszination der ersten Minuten'}
              {subStep === 2 && '1.2 Der iterative Vibe-Loop'}
              {subStep === 3 && '1.3 Der Prompt in Aktion'}
            </h2>
          </div>
        </div>

        {/* Sub-Stepper Navigation */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 self-stretch sm:self-auto overflow-x-auto">
          <button
            onClick={() => setSubStep(1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
              subStep === 1
                ? 'bg-zinc-800 text-cyan-300 border border-zinc-700 shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <span>1.1 Reiz & Definition</span>
          </button>
          <button
            onClick={() => setSubStep(2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
              subStep === 2
                ? 'bg-zinc-800 text-cyan-300 border border-zinc-700 shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <span>1.2 Die Vibe-Schleife</span>
          </button>
          <button
            onClick={() => setSubStep(3)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
              subStep === 3
                ? 'bg-zinc-800 text-cyan-300 border border-zinc-700 shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <span>1.3 Der Prompt</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* UNTERSEITE 1: Reiz & 2 Kern-Charakteristika */}
      {/* ========================================================================= */}
      {subStep === 1 && (
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Was ist eigentlich <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                „Vibe Coding“?
              </span>
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <MaterialIcon name="chat" className="text-cyan-400 text-sm" />
                <span>Rein prompt-gesteuert</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <MaterialIcon name="speed" className="text-emerald-400 text-sm" />
                <span>Intuitive Entwicklung</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <MaterialIcon name="block" className="text-rose-400 text-sm" />
                <span>Keine formalen Architekturvorgaben</span>
              </span>
            </div>
          </div>

          {/* Die 2 Kern-Kacheln – Nur Überschrift & Schlagworte + Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kachel 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-xl space-y-5 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <MaterialIcon name="rocket_launch" className="text-2xl" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Extrem hohe Geschwindigkeit
              </h3>

              {/* Schlagworte */}
              <div className="flex flex-wrap gap-2 pt-2">
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
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-xl space-y-5 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MaterialIcon name="forum" className="text-2xl" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Niedrige Einstiegshürde
              </h3>

              {/* Schlagworte */}
              <div className="flex flex-wrap gap-2 pt-2">
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

          {/* Navigation zur nächsten Unterseite */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setSubStep(2)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-zinc-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Weiter zu 1.2: Die Vibe-Schleife</span>
              <MaterialIcon name="arrow_forward" className="text-lg" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* UNTERSEITE 2: Der Vibe-Loop (Prompt -> Anschauen -> Prompt -> Anschauen) */}
      {/* ========================================================================= */}
      {subStep === 2 && (
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <MaterialIcon name="sync" className="text-sm" />
              <span>Das Vibe-Muster</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight flex flex-col items-center gap-1">
              <span className="flex items-center gap-2 justify-center flex-wrap">
                Prompten <MaterialIcon name="arrow_forward" className="text-cyan-400 text-2xl sm:text-3xl" /> Anschauen <MaterialIcon name="arrow_forward" className="text-cyan-400 text-2xl sm:text-3xl" />
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 bg-clip-text text-transparent flex items-center gap-2 justify-center flex-wrap">
                Prompten <MaterialIcon name="arrow_forward" className="text-teal-400 text-2xl sm:text-3xl" /> Anschauen <MaterialIcon name="arrow_forward" className="text-amber-400 text-2xl sm:text-3xl" /> ...
              </span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-medium">
              Keine formalen Pläne, sondern reine Zurufe im Chat-Fenster:
            </p>
          </div>

          {/* Miteinander verbundene Pipeline in ZWEI ZEILEN, größer und mittig platziert */}
          <div className="space-y-6 pt-2 pb-2">
            {/* ZEILE 1: Prompt #1 -> Anschauen -> Prompt #2 -> Anschauen */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-3 lg:gap-4 w-full">
              {loopIterations.slice(0, 2).map((step, localIdx) => {
                const idx = localIdx;
                return (
                  <div key={step.id} className="flex flex-col md:flex-row items-center justify-center">
                    {/* Prompt-Kachel */}
                    <div
                      onClick={() => setActiveLoopStep(idx)}
                      className={`cursor-pointer w-full sm:w-72 md:w-80 p-5 sm:p-6 rounded-3xl border transition-all text-left relative ${
                        activeLoopStep === idx
                          ? 'bg-zinc-900 border-cyan-400 shadow-2xl shadow-cyan-500/25 scale-[1.03] z-20 ring-1 ring-cyan-400/50'
                          : 'bg-zinc-950/90 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70 z-10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300">
                          <MaterialIcon name="chat" className="text-cyan-400 text-sm" />
                          Prompt #{step.id}
                        </span>
                        <span className={`text-[11px] font-mono px-3 py-1 rounded-full border font-bold ${step.tagColor}`}>
                          {step.tag}
                        </span>
                      </div>

                      <div className="text-sm sm:text-base font-mono font-bold text-white tracking-wide leading-snug">
                        {step.prompt}
                      </div>
                    </div>

                    {/* Verbinder & ANWENDUNGS-ICON für "Anschauen" */}
                    <div className="flex flex-col md:flex-row items-center justify-center shrink-0 my-3 md:my-0 md:px-3 z-10">
                      {/* Desktop-Linie vor dem Icon */}
                      <div className="hidden md:block w-4 lg:w-6 h-1 bg-gradient-to-r from-zinc-750 to-cyan-500/70 rounded-full" />

                      {/* Mobile-Linie vor dem Icon */}
                      <div className="md:hidden flex flex-col items-center text-cyan-400/70 py-1">
                        <div className="w-1 h-4 bg-gradient-to-b from-zinc-750 to-cyan-500/70 rounded-full" />
                        <MaterialIcon name="keyboard_arrow_down" className="text-sm" />
                      </div>

                      {/* Das stilisierte Anwendungs-Icon (größeres Desktop / macOS Window) */}
                      <div className="flex flex-col items-center justify-center group mx-1">
                        <div className="relative">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-900 border-2 border-cyan-500/40 shadow-xl shadow-cyan-500/15 flex flex-col items-center justify-center p-2 transition-all group-hover:border-cyan-400 group-hover:scale-105 group-hover:shadow-cyan-500/30">
                            {/* macOS Window Controls */}
                            <div className="w-full flex items-center justify-start gap-1.5 px-1 mb-1">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              <span className="w-2 h-2 rounded-full bg-amber-500" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            </div>
                            {/* Großes Anwendungs-Screen Icon */}
                            <MaterialIcon name="desktop_windows" className="text-cyan-300 text-2xl sm:text-3xl" />
                          </div>

                          {/* Status-Pulse */}
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500" />
                          </span>
                        </div>

                        {/* Anschauen Badge */}
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-zinc-100 bg-zinc-950 px-3 py-1 rounded-full border border-cyan-500/40 whitespace-nowrap shadow-md">
                          <MaterialIcon name="visibility" className="text-xs text-emerald-400" />
                          <span>Anschauen</span>
                        </div>

                        {/* Kompaktes Ergebnis der Prüfung */}
                        <span className={`text-xs font-mono font-bold mt-1 whitespace-nowrap flex items-center gap-1 ${step.previewColor}`}>
                          <MaterialIcon name={step.previewIcon} className="text-xs" />
                          <span>{step.preview}</span>
                        </span>
                      </div>

                      {/* Desktop-Linie nach dem Icon mit Pfeil */}
                      <div className="hidden md:flex items-center text-cyan-400/80 -ml-0.5">
                        <div className="w-4 lg:w-6 h-1 bg-gradient-to-r from-cyan-500/70 to-zinc-750 rounded-full" />
                        <MaterialIcon name="chevron_right" className="text-base -ml-1 text-cyan-400" />
                      </div>

                      {/* Mobile-Linie nach dem Icon mit Pfeil */}
                      <div className="md:hidden flex flex-col items-center text-cyan-400/70 py-1">
                        <div className="w-1 h-4 bg-gradient-to-b from-cyan-500/70 to-zinc-750 rounded-full" />
                        <MaterialIcon name="keyboard_arrow_down" className="text-sm" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Verbindungspfeil von Zeile 1 (rechts) an den Anfang von Zeile 2 (links) */}
            <div className="relative w-full max-w-[880px] mx-auto h-12 lg:h-14 my-1">
              {/* Desktop: Elegante geschwungene Pfeillinie von rechts oben nach links unten */}
              <svg
                className="hidden md:block w-full h-full overflow-visible"
                viewBox="0 0 1000 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="rowTransitionGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                {/* Leuchtender Hintergrund-Glow */}
                <path
                  d="M 940 0 C 940 30, 940 30, 880 30 L 220 30 C 160 30, 160 30, 160 50"
                  stroke="#06b6d4"
                  strokeWidth="5"
                  strokeOpacity="0.2"
                  strokeLinecap="round"
                  className="blur-sm"
                />

                {/* Gestrichelte Hauptlinie von rechts nach links unten */}
                <path
                  d="M 940 0 C 940 30, 940 30, 880 30 L 220 30 C 160 30, 160 30, 160 50"
                  stroke="url(#rowTransitionGradient)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />

                {/* Richtungspfeil auf der horizontalen Strecke nach links */}
                <polygon points="530,25 515,30 530,35" fill="#22d3ee" />

                {/* Großer Pfeilkopf, der direkt auf Prompt #3 nach unten zeigt */}
                <polygon points="152,48 168,48 160,60" fill="#22d3ee" />
              </svg>

              {/* Mobile: Schlanker vertikaler Pfeil nach unten */}
              <div className="md:hidden flex flex-col items-center justify-center h-full text-cyan-400 py-1">
                <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-500/70 to-zinc-750" />
                <MaterialIcon name="arrow_downward" className="text-xl animate-bounce" />
              </div>
            </div>

            {/* ZEILE 2: Prompt #3 -> Anschauen -> Prompt #4 -> Anschauen */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-3 lg:gap-4 w-full">
              {loopIterations.slice(2, 4).map((step, localIdx) => {
                const idx = 2 + localIdx;
                return (
                  <div key={step.id} className="flex flex-col md:flex-row items-center justify-center">
                    {/* Prompt-Kachel */}
                    <div
                      onClick={() => setActiveLoopStep(idx)}
                      className={`cursor-pointer w-full sm:w-72 md:w-80 p-5 sm:p-6 rounded-3xl border transition-all text-left relative ${
                        activeLoopStep === idx
                          ? 'bg-zinc-900 border-cyan-400 shadow-2xl shadow-cyan-500/25 scale-[1.03] z-20 ring-1 ring-cyan-400/50'
                          : 'bg-zinc-950/90 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70 z-10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300">
                          <MaterialIcon name="chat" className="text-cyan-400 text-sm" />
                          Prompt #{step.id}
                        </span>
                        <span className={`text-[11px] font-mono px-3 py-1 rounded-full border font-bold ${step.tagColor}`}>
                          {step.tag}
                        </span>
                      </div>

                      <div className="text-sm sm:text-base font-mono font-bold text-white tracking-wide leading-snug">
                        {step.prompt}
                      </div>
                    </div>

                    {/* Verbinder & ANWENDUNGS-ICON für "Anschauen" */}
                    <div className="flex flex-col md:flex-row items-center justify-center shrink-0 my-3 md:my-0 md:px-3 z-10">
                      {/* Desktop-Linie vor dem Icon */}
                      <div className="hidden md:block w-4 lg:w-6 h-1 bg-gradient-to-r from-zinc-750 to-cyan-500/70 rounded-full" />

                      {/* Mobile-Linie vor dem Icon */}
                      <div className="md:hidden flex flex-col items-center text-cyan-400/70 py-1">
                        <div className="w-1 h-4 bg-gradient-to-b from-zinc-750 to-cyan-500/70 rounded-full" />
                        <MaterialIcon name="keyboard_arrow_down" className="text-sm" />
                      </div>

                      {/* Das stilisierte Anwendungs-Icon (größeres Desktop / macOS Window) */}
                      <div className="flex flex-col items-center justify-center group mx-1">
                        <div className="relative">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-900 border-2 border-cyan-500/40 shadow-xl shadow-cyan-500/15 flex flex-col items-center justify-center p-2 transition-all group-hover:border-cyan-400 group-hover:scale-105 group-hover:shadow-cyan-500/30">
                            {/* macOS Window Controls */}
                            <div className="w-full flex items-center justify-start gap-1.5 px-1 mb-1">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              <span className="w-2 h-2 rounded-full bg-amber-500" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            </div>
                            {/* Großes Anwendungs-Screen Icon */}
                            <MaterialIcon name="desktop_windows" className="text-cyan-300 text-2xl sm:text-3xl" />
                          </div>

                          {/* Status-Pulse */}
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500" />
                          </span>
                        </div>

                        {/* Anschauen Badge */}
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-zinc-100 bg-zinc-950 px-3 py-1 rounded-full border border-cyan-500/40 whitespace-nowrap shadow-md">
                          <MaterialIcon name="visibility" className="text-xs text-emerald-400" />
                          <span>Anschauen</span>
                        </div>

                        {/* Kompaktes Ergebnis der Prüfung */}
                        <span className={`text-xs font-mono font-bold mt-1 whitespace-nowrap flex items-center gap-1 ${step.previewColor}`}>
                          <MaterialIcon name={step.previewIcon} className="text-xs" />
                          <span>{step.preview}</span>
                        </span>
                      </div>

                      {/* Verbinder nach dem Icon nur zwischen Prompt #3 und #4, nicht am Ende */}
                      {localIdx === 0 && (
                        <>
                          <div className="hidden md:flex items-center text-cyan-400/80 -ml-0.5">
                            <div className="w-4 lg:w-6 h-1 bg-gradient-to-r from-cyan-500/70 to-zinc-750 rounded-full" />
                            <MaterialIcon name="chevron_right" className="text-base -ml-1 text-cyan-400" />
                          </div>

                          <div className="md:hidden flex flex-col items-center text-cyan-400/70 py-1">
                            <div className="w-1 h-4 bg-gradient-to-b from-cyan-500/70 to-zinc-750 rounded-full" />
                            <MaterialIcon name="keyboard_arrow_down" className="text-sm" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setSubStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-all"
            >
              <MaterialIcon name="arrow_back" className="text-sm" />
              <span>Zurück zu 1.1</span>
            </button>

            <button
              onClick={() => setSubStep(3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-zinc-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Weiter zu 1.3: Der Prompt</span>
              <MaterialIcon name="arrow_forward" className="text-lg" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* UNTERSEITE 3: Der konkrete Prompt & die Leitfrage "Was passiert jetzt?" */}
      {/* ========================================================================= */}
      {subStep === 3 && (
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <MaterialIcon name="terminal" className="text-sm" />
              <span>Der Praxistest</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ein typischer Vibe-Prompt
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-medium">
              Alles in einen einzigen Sprachbefehl gepackt:
            </p>
          </div>

          {/* Der Prompt & Absenden */}
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="space-y-3">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-750 focus:border-cyan-400 rounded-2xl p-4 text-sm sm:text-base text-white placeholder-zinc-500 outline-none resize-none font-mono"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Keine Leitplanken • Keine formalen Tests</span>
                </div>

                <button
                  onClick={handleVibeClick}
                  disabled={isVibing || hasPrompted}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-zinc-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
                >
                  {isVibing ? (
                    <>
                      <MaterialIcon name="sync" className="text-lg animate-spin" />
                      <span>KI generiert Code...</span>
                    </>
                  ) : hasPrompted ? (
                    <>
                      <MaterialIcon name="check_circle" className="text-lg text-zinc-950" />
                      <span>Code erfolgreich generiert!</span>
                    </>
                  ) : (
                    <>
                      <MaterialIcon name="bolt" className="text-lg" />
                      <span>Prompt abschicken (Vibe it!)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Nach dem Absenden: NICHT auflösen was schlecht ist, sondern DIE OFFENE FRAGE: "Was passiert jetzt?" */}
            {hasPrompted && (
              <div className="p-8 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-cyan-500/40 text-center space-y-5 animate-fade-in shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                  <MaterialIcon name="help_outline" className="text-4xl animate-bounce" />
                </div>

                <div className="space-y-2 max-w-xl mx-auto">
                  <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400">
                    Die entscheidende Frage an die Runde:
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Was passiert jetzt?
                  </h2>
                </div>

                {/* Überleitungs-Callout ins Plenum */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={onNextPhase}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-extrabold text-base shadow-2xl shadow-rose-500/30 transition-all transform hover:-translate-y-1 active:scale-95"
                  >
                    <span>Ab ins 1. Plenum: Die 4 Dimensionen analysieren</span>
                    <MaterialIcon name="arrow_forward" className="text-xl" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setSubStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-all"
            >
              <MaterialIcon name="arrow_back" className="text-sm" />
              <span>Zurück zu 1.2</span>
            </button>

            {!hasPrompted && (
              <button
                onClick={onNextPhase}
                className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-cyan-300 transition-colors"
              >
                <span>Direkt weiter zum 1. Plenum</span>
                <MaterialIcon name="arrow_forward" className="text-xs" />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
