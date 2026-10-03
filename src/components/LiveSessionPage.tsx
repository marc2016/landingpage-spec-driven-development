import React, { useState, useEffect, useRef } from 'react';
import { AssignedTeam } from './TeamAssignmentPage';
import { MaterialIcon } from './MaterialIcon';

interface LiveSessionPageProps {
  assignments: AssignedTeam[];
  initialPhase?: 'vibe' | 'spec';
  onBackToAssignment: () => void;
  onBackToOverview?: () => void;
  onNextToRetro?: () => void;
}

export const LiveSessionPage: React.FC<LiveSessionPageProps> = ({
  assignments,
  initialPhase = 'vibe',
  onBackToAssignment,
  onNextToRetro,
}) => {
  const activePhaseTitle = initialPhase;
  // Timer state: 13 minutes (780 seconds) by default
  const INITIAL_SECONDS = 13 * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [copiedTaskId, setCopiedTaskId] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, secondsRemaining]);

  const toggleTimer = () => setIsRunning((prev) => !prev);
  const resetTimer = (mins: number = 13) => {
    setIsRunning(false);
    setSecondsRemaining(mins * 60);
  };
  const addMinute = (delta: number) => {
    setSecondsRemaining((prev) => Math.max(0, prev + delta * 60));
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(
    100,
    ((INITIAL_SECONDS - secondsRemaining) / INITIAL_SECONDS) * 100
  );

  const handleCopyTask = (title: string, goal: string, id: string) => {
    navigator.clipboard.writeText(`Aufgabe: ${title}\nZiel: ${goal}`);
    setCopiedTaskId(id);
    setTimeout(() => setCopiedTaskId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between overflow-x-hidden bg-dot-pattern">
      {/* Centered Header (like spec-driven-concept) */}
      <header className="relative z-20 pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-50 border border-zinc-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-700 shadow-2xs mb-3">
          <span
            className={`w-2 h-2 rounded-full ${
              activePhaseTitle === 'vibe' ? 'bg-amber-500' : 'bg-emerald-500'
            } animate-pulse`}
          />
          <span>
            {activePhaseTitle === 'vibe'
              ? 'Arbeitsphase 1 • Vibe Coding'
              : 'Arbeitsphase 2 • Spec-Driven Development'}
          </span>
          <span className="text-zinc-300">•</span>
          <span>13 Minuten Zeitfenster</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-2">
          {activePhaseTitle === 'vibe'
            ? 'Arbeitsphase 1: Vibe Coding'
            : 'Arbeitsphase 2: Spec-Driven mit OpenSpec'}
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-6">
          {activePhaseTitle === 'vibe'
            ? '1 Laptop pro Gruppe: Startet direkt im KI-Chat und iteriert so schnell wie möglich ohne Spezifikation.'
            : 'Dieselbe Aufgabe mit System: Erst 4 Min /opsx:explore & propose, dann 9 Min zielgerichtetes apply.'}
        </p>

        {/* Centered Timer under Heading */}
        <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
          <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200/90 px-5 py-2.5 rounded-2xl shadow-xs">
            <div className="font-mono font-extrabold text-3xl sm:text-4xl text-zinc-900 tracking-tight min-w-[110px] text-center">
              {formatTime(secondsRemaining)}
            </div>

            <div className="flex items-center gap-1 border-l border-zinc-200 pl-3">
              <button
                onClick={toggleTimer}
                className={`p-2 rounded-xl font-bold transition-all shadow-xs flex items-center justify-center ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
                title={isRunning ? 'Timer pausieren' : 'Timer starten'}
              >
                <MaterialIcon name={isRunning ? 'pause' : 'play_arrow'} className="text-xl" />
              </button>
              <button
                onClick={() => addMinute(1)}
                className="p-1.5 rounded-lg hover:bg-zinc-200/80 text-zinc-600 text-xs font-bold transition-colors"
                title="+1 Minute"
              >
                +1m
              </button>
              <button
                onClick={() => addMinute(-1)}
                className="p-1.5 rounded-lg hover:bg-zinc-200/80 text-zinc-600 text-xs font-bold transition-colors"
                title="-1 Minute"
              >
                -1m
              </button>
              <button
                onClick={() => resetTimer(13)}
                className="p-1.5 rounded-lg hover:bg-zinc-200/80 text-zinc-600 transition-colors"
                title="Timer zurücksetzen (13 Min.)"
              >
                <MaterialIcon name="restart_alt" className="text-base" />
              </button>
            </div>
          </div>

          {/* Timer Progress Bar */}
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mt-1 max-w-xs">
            <div
              className={`h-full transition-all duration-1000 ease-linear ${
                secondsRemaining < 120
                  ? 'bg-rose-500'
                  : secondsRemaining < 300
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main 3 Columns Workspace: all 3 columns exact same height */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-start">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {assignments.map((item) => {
            const task = item.task;
            if (!task) return null;

            return (
              <div
                key={item.team.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 border-2 ${item.team.borderColor} shadow-[0_8px_30px_-6px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-all duration-300 hover:shadow-lg h-full`}
              >
                {/* Team Card Top Section */}
                <div className="flex-1 flex flex-col">
                  {/* Header: Team name & Difficulty badge */}
                  <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-4 h-4 rounded-full ${item.team.accentBg} flex items-center justify-center text-white text-[10px] font-bold shadow-xs`}
                      />
                      <span className="font-extrabold text-lg text-zinc-900">
                        {item.team.name}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${task.badgeColor.bgBadge} ${task.badgeColor.textBadge} border ${task.badgeColor.borderBadge}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${task.badgeColor.accentDot}`} />
                      {task.difficultyLabel}
                    </span>
                  </div>

                  {/* Task Title & Icon: fixed min-height for uniform alignment */}
                  <div className="flex items-start gap-3.5 mb-3 min-h-[58px]">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${task.badgeColor.bgBadge} ${task.badgeColor.borderBadge} ${task.badgeColor.textBadge}`}
                    >
                      <MaterialIcon name={task.icon} className="text-2xl" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-zinc-500 font-bold block">
                        Aufgabe #{task.number < 10 ? `0${task.number}` : task.number}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 leading-snug">
                        {task.title}
                      </h3>
                    </div>
                  </div>

                  {/* Scenario box: fixed min-height so all 3 cards align symmetrically */}
                  <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200/70 text-xs text-zinc-600 mb-3 min-h-[66px] flex items-center">
                    <p className="line-clamp-2 leading-relaxed">
                      <span className="font-bold text-zinc-800">Szenario: </span>
                      {task.scenario || 'Praxis-Szenario für die 20-minütige Team-Challenge.'}
                    </p>
                  </div>

                  {/* Objective (Ziel): flex-1 with min-height */}
                  <div className="bg-zinc-50/90 rounded-2xl p-4 border border-zinc-200/90 mb-3 min-h-[105px] flex-1 flex flex-col justify-start">
                    <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-zinc-700 uppercase tracking-wider">
                      <MaterialIcon name="flag" className="text-sm text-zinc-500" />
                      <span>Kernaufgabe (Ziel)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
                      {task.goal}
                    </p>
                  </div>

                  {/* Guidance Box (Vibe / Spec): fixed min-height */}
                  {activePhaseTitle === 'vibe' ? (
                    <div className="rounded-2xl p-3.5 bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 mb-4 min-h-[85px] flex flex-col justify-center">
                      <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                        <MaterialIcon name="bolt" className="text-sm text-amber-600" />
                        <span>Vibe-Coding Fokus</span>
                      </div>
                      <p className="leading-relaxed text-[11px] text-amber-900/90 line-clamp-3">
                        {task.vibeFocus}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl p-3.5 bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-950 mb-4 min-h-[85px] flex flex-col justify-center">
                      <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                        <MaterialIcon name="architecture" className="text-sm text-emerald-600" />
                        <span>Spec-Driven Knackpunkt</span>
                      </div>
                      <p className="leading-relaxed text-[11px] text-emerald-900/90 line-clamp-3">
                        {task.specFocus}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Actions: Copy prompt & Tags (anchored at the exact bottom) */}
                <div className="pt-3.5 border-t border-zinc-100 flex items-center justify-between gap-2 text-xs mt-auto">
                  <div className="flex items-center gap-1 flex-wrap">
                    {task.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-zinc-100 text-zinc-600 font-medium px-2 py-0.5 rounded-md text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCopyTask(task.title, task.goal, task.id)}
                    className="p-1.5 px-2.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-[11px] font-semibold text-zinc-700 transition-colors flex items-center gap-1 shrink-0"
                    title="Aufgabe kopieren"
                  >
                    <MaterialIcon
                      name={copiedTaskId === task.id ? 'check' : 'content_copy'}
                      className="text-xs text-zinc-500"
                    />
                    <span>{copiedTaskId === task.id ? 'Kopiert' : 'Kopieren'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Sticky Action Bar: Weißer Button links, Schwarzer Button rechts */}
      <footer className="py-4 px-6 border-t border-zinc-200/90 bg-white/95 backdrop-blur-md sticky bottom-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBackToAssignment}
            className="px-6 py-3 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-700 shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MaterialIcon name="arrow_back" className="text-sm" />
            <span>
              {activePhaseTitle === 'vibe' ? 'Zurück zur Auslosung' : 'Zurück zum Briefing'}
            </span>
          </button>

          {onNextToRetro && (
            <button
              onClick={onNextToRetro}
              className="px-8 py-3.5 bg-zinc-900 hover:bg-black text-white font-bold text-sm rounded-full shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 ring-4 ring-zinc-900/10"
            >
              <span>
                {activePhaseTitle === 'vibe'
                  ? 'Weiter zu Retro 1: Vibe-Coding'
                  : 'Weiter zu Retro 2: OpenSpec'}
              </span>
              <MaterialIcon name="arrow_forward" className="text-base" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
