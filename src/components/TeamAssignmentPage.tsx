import React, { useState, useEffect, useRef } from 'react';
import { WORKSHOP_TASKS, WorkshopTask, DifficultyLevel } from '../data/workshopTasks';
import { MaterialIcon } from './MaterialIcon';

export interface TeamConfig {
  id: 'red' | 'green' | 'blue';
  name: string;
  colorName: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  accentBg: string;
  badgeClass: string;
  ringClass: string;
}

export const TEAMS: TeamConfig[] = [
  {
    id: 'red',
    name: 'Team Rot',
    colorName: 'Rot',
    textColor: 'text-rose-700',
    bgColor: 'bg-rose-50/70',
    borderColor: 'border-rose-400',
    accentBg: 'bg-rose-500',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    ringClass: 'ring-rose-400/30',
  },
  {
    id: 'green',
    name: 'Team Grün',
    colorName: 'Grün',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50/70',
    borderColor: 'border-emerald-400',
    accentBg: 'bg-emerald-500',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    ringClass: 'ring-emerald-400/30',
  },
  {
    id: 'blue',
    name: 'Team Blau',
    colorName: 'Blau',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50/70',
    borderColor: 'border-blue-400',
    accentBg: 'bg-blue-500',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    ringClass: 'ring-blue-400/30',
  },
];

export interface AssignedTeam {
  team: TeamConfig;
  difficulty: DifficultyLevel | null;
  task: WorkshopTask | null;
}

export function generateRandomAssignments(): AssignedTeam[] {
  const allDifficulties: DifficultyLevel[] = ['leicht', 'mittel', 'schwer'];
  const shuffledDifficulties = [...allDifficulties].sort(() => Math.random() - 0.5);
  const usedTaskIds = new Set<string>();

  return TEAMS.map((team, idx) => {
    const diff = shuffledDifficulties[idx];
    const candidatePool = WORKSHOP_TASKS.filter(
      (task) => task.category === diff && !usedTaskIds.has(task.id)
    );
    const pool = candidatePool.length > 0 ? candidatePool : WORKSHOP_TASKS.filter((t) => t.category === diff);
    const selectedTask = pool[Math.floor(Math.random() * pool.length)];
    usedTaskIds.add(selectedTask.id);

    return {
      team,
      difficulty: diff,
      task: selectedTask,
    };
  });
}

interface TeamAssignmentPageProps {
  initialAssignments?: AssignedTeam[];
  onBackToOverview: () => void;
  onFinishAssignment: (assignments: AssignedTeam[]) => void;
}

export const TeamAssignmentPage: React.FC<TeamAssignmentPageProps> = ({
  initialAssignments,
  onBackToOverview,
  onFinishAssignment,
}) => {
  // Track assignments for each of the 3 teams (difficulty is determined randomly at draw time)
  const [assignments, setAssignments] = useState<AssignedTeam[]>(() => {
    if (
      initialAssignments &&
      initialAssignments.length === 3 &&
      initialAssignments.some((a) => a.task !== null)
    ) {
      return initialAssignments;
    }
    try {
      const saved = localStorage.getItem('openspec_team_assignments');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) return parsed;
      }
    } catch (e) {}
    return [
      { team: TEAMS[0], difficulty: null, task: null },
      { team: TEAMS[1], difficulty: null, task: null },
      { team: TEAMS[2], difficulty: null, task: null },
    ];
  });

  // Current active team index: 0, 1, or 2
  const [activeTeamIndex, setActiveTeamIndex] = useState<number>(0);

  // Lottery / Spinning state
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [previewTask, setPreviewTask] = useState<WorkshopTask | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTeam = assignments[activeTeamIndex].team;
  const currentAssignedTask = assignments[activeTeamIndex].task;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, []);

  // Trigger Lottery Drawing for the current team
  const startLottery = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowConfetti(false);

    // 1. Determine which difficulties have already been assigned to OTHER teams
    const usedDifficulties = assignments
      .map((a, idx) => (idx !== activeTeamIndex && a.task !== null ? a.difficulty : null))
      .filter(Boolean) as DifficultyLevel[];

    const allDifficulties: DifficultyLevel[] = ['leicht', 'mittel', 'schwer'];
    const availableDifficulties = allDifficulties.filter((d) => !usedDifficulties.includes(d));

    // 2. Pick a random difficulty from available ones at the exact moment of drawing
    const chosenDifficulty =
      availableDifficulties[Math.floor(Math.random() * availableDifficulties.length)];

    // 3. Candidates matching this newly chosen difficulty
    const targetPool = WORKSHOP_TASKS.filter((t) => t.category === chosenDifficulty);
    const alreadyChosenIds = new Set(
      assignments
        .map((a, idx) => (idx !== activeTeamIndex ? a.task?.id : null))
        .filter(Boolean) as string[]
    );
    const availablePool = targetPool.filter((t) => !alreadyChosenIds.has(t.id));
    const poolToPickFrom = availablePool.length > 0 ? availablePool : targetPool;

    // 4. Pick winning task
    const winningTask = poolToPickFrom[Math.floor(Math.random() * poolToPickFrom.length)];

    let currentIntervalSpeed = 50;
    let stepCount = 0;
    const totalSteps = 28;

    const runStep = () => {
      // Pick a random task to display during animation across all difficulties
      const randomDisplay = WORKSHOP_TASKS[Math.floor(Math.random() * WORKSHOP_TASKS.length)];
      setPreviewTask(randomDisplay);
      stepCount++;

      if (stepCount >= totalSteps) {
        // Animation complete: lock onto winning task
        setPreviewTask(winningTask);
        setAssignments((prev) => {
          const updated = [...prev];
          updated[activeTeamIndex] = {
            ...updated[activeTeamIndex],
            difficulty: chosenDifficulty,
            task: winningTask,
          };
          try {
            localStorage.setItem('openspec_team_assignments', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
        setIsSpinning(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        // Decelerate smoothly
        if (stepCount > totalSteps - 12) {
          currentIntervalSpeed += 30;
        } else if (stepCount > totalSteps - 6) {
          currentIntervalSpeed += 65;
        }
        spinIntervalRef.current = setTimeout(runStep, currentIntervalSpeed);
      }
    };

    runStep();
  };

  const handleNextStep = () => {
    if (activeTeamIndex < 2) {
      setActiveTeamIndex((prev) => prev + 1);
      setPreviewTask(null);
      setShowConfetti(false);
    } else {
      // All 3 teams assigned! Proceed to live task & timer session
      try {
        localStorage.setItem('openspec_team_assignments', JSON.stringify(assignments));
      } catch (e) {}
      onFinishAssignment(assignments);
    }
  };

  const displayedTask = currentAssignedTask || previewTask;

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 flex flex-col justify-between overflow-hidden bg-dot-pattern">
      {/* Confetti Particle Burst Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 40 }).map((_, i) => {
              const colors = ['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];
              const randomColor = colors[i % colors.length];
              const randomLeft = `${50 + (Math.random() * 80 - 40)}%`;
              const randomTop = `${50 + (Math.random() * 60 - 30)}%`;
              const randomSize = `${Math.floor(Math.random() * 8 + 6)}px`;
              const randomDelay = `${Math.random() * 0.3}s`;
              return (
                <div
                  key={i}
                  className="absolute rounded-full animate-ping"
                  style={{
                    backgroundColor: randomColor,
                    width: randomSize,
                    height: randomSize,
                    left: randomLeft,
                    top: randomTop,
                    animationDuration: '1.2s',
                    animationDelay: randomDelay,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Top Header / Progress Stepper */}
      <header className="relative z-20 pt-6 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToOverview}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            <MaterialIcon name="arrow_back" className="text-sm" />
            <span>Zurück zur Aufgabenübersicht</span>
          </button>

          <div className="inline-flex items-center gap-2 bg-zinc-50 border border-zinc-200/80 px-3.5 py-1 rounded-full text-xs font-semibold text-zinc-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Schritt {activeTeamIndex + 1} von 3: Themen-Auslosung</span>
          </div>
        </div>

        {/* 3 Teams Stepper Indicator */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {assignments.map((item, idx) => {
            const isCurrent = idx === activeTeamIndex;
            const isCompleted = item.task !== null;

            return (
              <div
                key={item.team.id}
                onClick={() => {
                  if (item.task !== null) setActiveTeamIndex(idx);
                }}
                className={`p-3 sm:p-4 rounded-2xl border transition-all duration-300 text-left select-none ${
                  isCurrent
                    ? `${item.team.bgColor} ${item.team.borderColor} border-2 shadow-md ring-4 ${item.team.ringClass}`
                    : isCompleted
                    ? 'bg-white border-zinc-200 shadow-xs cursor-pointer hover:border-zinc-300'
                    : 'bg-zinc-50/50 border-zinc-200/60 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${item.team.badgeClass}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.team.accentBg}`} />
                    {item.team.name}
                  </span>

                  {isCompleted && (
                    <MaterialIcon name="check_circle" className="text-sm text-emerald-600" />
                  )}
                </div>

                <div className="text-xs font-semibold text-zinc-800 truncate">
                  {item.task ? item.task.title : isCurrent ? 'Wird ausgelost...' : 'Ausstehend'}
                </div>

                {item.task && (
                  <span className="text-[10px] text-zinc-500 mt-0.5 inline-block">
                    {item.task.difficultyLabel}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </header>

      {/* Main Drawing Stage Area */}
      <main className="relative flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col justify-center items-center">
        {/* Active Team Presentation Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <span
              className={`w-3 h-3 rounded-full ${currentTeam.accentBg} animate-ping absolute`}
            />
            <span className={`w-3 h-3 rounded-full ${currentTeam.accentBg}`} />
            <span className={`text-base font-extrabold uppercase tracking-wider ${currentTeam.textColor}`}>
              {currentTeam.name}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            {currentAssignedTask
              ? `Aufgabe für ${currentTeam.name} zugeteilt!`
              : `Zieh jetzt die Aufgabe für ${currentTeam.name}`}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto mt-1">
            Jedes Team erhält eine andere Schwierigkeit (Leicht, Mittel, Schwer) in beliebiger Reihenfolge.
          </p>
        </div>

        {/* Central Display Card (Waiting vs Spinning vs Result) */}
        <div className="w-full max-w-2xl">
          {displayedTask ? (
            /* Render Drawn Task Card */
            <div
              className={`relative bg-white rounded-3xl p-6 sm:p-8 transition-all duration-500
                ${displayedTask.badgeColor.border} border-[3px]
                shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)]
                ${isSpinning ? 'scale-95 blur-[0.5px] opacity-90 animate-pulse' : 'scale-100 animate-slide-up'}
              `}
            >
              {/* Category & Number Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-zinc-700 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-lg">
                    Aufgabe #{displayedTask.number < 10 ? `0${displayedTask.number}` : displayedTask.number}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${displayedTask.badgeColor.bgBadge} ${displayedTask.badgeColor.textBadge} border ${displayedTask.badgeColor.borderBadge}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${displayedTask.badgeColor.accentDot}`} />
                    Schwierigkeitsstufe: {displayedTask.difficultyLabel}
                  </span>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${currentTeam.badgeClass}`}
                >
                  Zugewiesen an: {currentTeam.name}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${displayedTask.badgeColor.bgBadge} ${displayedTask.badgeColor.borderBadge} ${displayedTask.badgeColor.textBadge}`}
                >
                  <MaterialIcon name={displayedTask.icon} className="text-3xl" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight leading-snug">
                    {displayedTask.title}
                  </h3>
                  {displayedTask.scenario && (
                    <p className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">
                      <span className="font-bold text-zinc-800">Alltagsszenario: </span>
                      {displayedTask.scenario}
                    </p>
                  )}
                </div>
              </div>

              {/* Core Objective */}
              <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 sm:p-5 mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <MaterialIcon name="flag" className="text-base text-zinc-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                    Die Kernaufgabe (Ziel)
                  </span>
                </div>
                <p className="text-zinc-800 text-sm sm:text-base leading-relaxed font-medium">
                  {displayedTask.goal}
                </p>
              </div>

              {/* Vibe vs Spec Clues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl p-3 bg-amber-50/70 border border-amber-200/70 text-xs">
                  <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <MaterialIcon name="bolt" className="text-sm text-amber-600" />
                    <span>Vibe-Coding Fokus</span>
                  </div>
                  <p className="text-amber-950/80 leading-relaxed text-[11px]">
                    {displayedTask.vibeFocus}
                  </p>
                </div>

                <div className="rounded-xl p-3 bg-emerald-50/70 border border-emerald-200/70 text-xs">
                  <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                    <MaterialIcon name="architecture" className="text-sm text-emerald-600" />
                    <span>Spec-Driven Knackpunkt</span>
                  </div>
                  <p className="text-emerald-950/80 leading-relaxed text-[11px]">
                    {displayedTask.specFocus}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-zinc-100 text-xs text-zinc-500">
                <span className="font-semibold text-zinc-600">Themen:</span>
                {displayedTask.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-zinc-100 text-zinc-700 font-medium px-2.5 py-0.5 rounded-full text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            /* Empty State Waiting for Drawing */
            <div
              className={`bg-white rounded-3xl p-10 sm:p-14 text-center border-2 border-dashed ${currentTeam.borderColor} shadow-sm flex flex-col items-center justify-center`}
            >
              <div
                className={`w-20 h-20 rounded-3xl ${currentTeam.bgColor} ${currentTeam.textColor} flex items-center justify-center text-4xl mb-4 shadow-inner`}
              >
                <MaterialIcon name="casino" className="text-4xl animate-bounce" />
              </div>

              <h3 className="text-xl font-bold text-zinc-900 mb-2">
                Aufgaben-Losung für {currentTeam.name}
              </h3>
              <p className="text-sm text-zinc-500 max-w-sm mb-6 leading-relaxed">
                Klicke auf den Button unten, um das Zufallsrad zu starten und das Thema für dieses Team zu ziehen.
              </p>

              <button
                onClick={startLottery}
                disabled={isSpinning}
                className={`px-8 py-4 rounded-2xl text-white font-bold text-base shadow-lg transition-all duration-200 flex items-center gap-3 ${
                  isSpinning
                    ? 'bg-zinc-400 cursor-not-allowed'
                    : `${currentTeam.accentBg} hover:opacity-90 hover:scale-[1.03] active:scale-[0.98]`
                }`}
              >
                <MaterialIcon name="casino" className="text-xl" />
                <span>Thema für {currentTeam.name} zulosen</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Sticky Action Dock */}
      <footer className="relative z-30 p-6 max-w-4xl mx-auto w-full flex items-center justify-between gap-4">
        {/* Reroll Button if already drawn */}
        {currentAssignedTask && !isSpinning ? (
          <button
            onClick={startLottery}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700 shadow-sm flex items-center gap-2 transition-colors"
          >
            <MaterialIcon name="refresh" className="text-sm text-zinc-500" />
            <span>Neu zulosen</span>
          </button>
        ) : (
          <div />
        )}

        {/* Primary Forward Button: only active after drawing! */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleNextStep}
            disabled={!currentAssignedTask || isSpinning}
            className={`px-8 py-3.5 rounded-full font-bold text-sm shadow-xl transition-all duration-300 flex items-center gap-2.5 ${
              !currentAssignedTask || isSpinning
                ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'
                : activeTeamIndex === 2
                ? 'bg-zinc-900 hover:bg-black text-white hover:scale-[1.03] active:scale-[0.98] ring-4 ring-zinc-900/10'
                : 'bg-zinc-900 hover:bg-black text-white hover:scale-[1.03] active:scale-[0.98]'
            }`}
          >
            <span>
              {activeTeamIndex < 2
                ? `Weiter zu ${assignments[activeTeamIndex + 1].team.name}`
                : 'Aufgaben starten & Timer aktivieren'}
            </span>
            <MaterialIcon name={activeTeamIndex === 2 ? 'play_arrow' : 'arrow_forward'} className="text-base" />
          </button>
        </div>
      </footer>
    </div>
  );
};
