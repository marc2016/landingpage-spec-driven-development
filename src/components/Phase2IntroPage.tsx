import React from 'react';
import { AssignedTeam } from './TeamAssignmentPage';
import { MaterialIcon } from './MaterialIcon';

interface Phase2IntroPageProps {
  assignments: AssignedTeam[];
  onBack: () => void;
  onStartPhase2: () => void;
}

export const Phase2IntroPage: React.FC<Phase2IntroPageProps> = ({
  assignments,
  onBack,
  onStartPhase2,
}) => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between overflow-x-hidden bg-dot-pattern">
      {/* Header */}
      <header className="relative z-20 pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800 shadow-sm mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Arbeitsphase 2 • 13 Minuten</span>
          <span className="text-emerald-300">•</span>
          <span>Der direkte Vorher-Nachher-Vergleich</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-3">
          Dieselbe Aufgabe – jetzt mit OpenSpec!
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Alle 3 Teams behalten ihr gezogenes Problem aus Runde 1. Doch diesmal wechseln wir die
          Rolle: Vom Passagier zum Architekten.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Assigned Teams Recap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {assignments.map((item) => {
            const task = item.task;
            if (!task) return null;

            return (
              <div
                key={item.team.id}
                className={`bg-white rounded-2xl p-5 border-2 ${item.team.borderColor} shadow-xs text-left`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${item.team.badgeClass}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.team.accentBg}`} />
                    {item.team.name}
                  </span>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${task.badgeColor.bgBadge} ${task.badgeColor.textBadge} border ${task.badgeColor.borderBadge}`}
                  >
                    {task.difficultyLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MaterialIcon name={task.icon} className="text-lg text-zinc-600" />
                  <h3 className="font-bold text-sm text-zinc-900 leading-snug truncate">
                    {task.title}
                  </h3>
                </div>

                <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                  {task.goal}
                </p>
              </div>
            );
          })}
        </div>

        {/* The 2-Step Rules for Round 2 */}
        <div className="bg-zinc-50 border border-zinc-200/90 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto">
          <h2 className="text-base font-extrabold text-zinc-900 mb-4 flex items-center gap-2">
            <MaterialIcon name="schedule" className="text-xl text-zinc-700" />
            <span>Regieplan für Phase 2 (13 Minuten Gesamtzeit)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Step 1: 4 Min Spec */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg">
                  Min 01–04 (4 Min)
                </span>
                <span className="text-xs font-extrabold text-amber-700 uppercase">
                  Schritt 1
                </span>
              </div>

              <h4 className="font-extrabold text-sm text-zinc-900 mb-1.5">
                Nur Spezifizieren!
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                Schreibt gemeinsam Datenmodell, Rechenregeln und fiese Edge Cases in einer Textdatei auf.
              </p>

              <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-[11px] font-semibold text-rose-800 flex items-center gap-1.5">
                <MaterialIcon name="block" className="text-sm shrink-0" />
                <span>In den ersten 4 Min: Noch KEIN Code-Prompt an die KI!</span>
              </div>
            </div>

            {/* Step 2: 9 Min Code */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg">
                  Min 05–13 (9 Min)
                </span>
                <span className="text-xs font-extrabold text-emerald-700 uppercase">
                  Schritt 2
                </span>
              </div>

              <h4 className="font-extrabold text-sm text-zinc-900 mb-1.5">
                Der Spec-Prompt & Test
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                Übergebt die fertige Spec als Ganzes an die KI: <em>„Setze exakt diese Spezifikation um.“</em>
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
                <MaterialIcon name="verified" className="text-sm shrink-0" />
                <span>Testet direkt die definierten Edge Cases im Browser!</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Sticky Action Bar: Weißer Button links, Schwarzer Button rechts */}
      <footer className="py-4 px-6 border-t border-zinc-200/90 bg-white/95 backdrop-blur-md sticky bottom-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-700 shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MaterialIcon name="arrow_back" className="text-sm" />
            <span>Zurück: Was ist OpenSpec?</span>
          </button>

          <button
            onClick={onStartPhase2}
            className="px-8 py-3.5 bg-zinc-900 hover:bg-black text-white font-bold text-sm rounded-full shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 ring-4 ring-zinc-900/10"
          >
            <span>Weiter zu Phase 2: OpenSpec (Live)</span>
            <MaterialIcon name="arrow_forward" className="text-base" />
          </button>
        </div>
      </footer>
    </div>
  );
};
