import React, { useState, useEffect } from 'react';
import { WorkshopTask } from '../data/workshopTasks';
import { MaterialIcon } from './MaterialIcon';

interface TaskSpotlightModalProps {
  task: WorkshopTask;
  originColumn?: number; // 0 = left column, 1 = center column, 2 = right column
  isClosing?: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
  progressPercent: number; // 0 to 100
}

export const TaskSpotlightModal: React.FC<TaskSpotlightModalProps> = ({
  task,
  originColumn = 1,
  isClosing = false,
  onClose,
  onNext,
  onPrev,
  isPaused,
  onTogglePause,
  progressPercent,
}) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    // Trigger transition from row position to center spotlight
    const t = setTimeout(() => setIsReady(true), 20);
    return () => clearTimeout(t);
  }, [task.id]);

  // Close on Escape key, navigate with Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === ' ') {
        e.preventDefault();
        onTogglePause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, onTogglePause]);

  // Compute position & 3D transformation:
  // When inactive/closing: scaled down and placed towards its origin column (left, center, or right)
  // When active: centered, scaled to 100%, upright
  const isInRowPosition = !isReady || isClosing;

  let originTransformClass = '';
  if (isInRowPosition) {
    if (originColumn === 0) {
      // Left column: emerges from left row
      originTransformClass = 'scale-[0.28] -translate-x-[34vw] -translate-y-[10vh] opacity-0 -rotate-3';
    } else if (originColumn === 2) {
      // Right column: emerges from right row
      originTransformClass = 'scale-[0.28] translate-x-[34vw] -translate-y-[10vh] opacity-0 rotate-3';
    } else {
      // Center column: emerges from center row
      originTransformClass = 'scale-[0.28] translate-x-0 -translate-y-[15vh] opacity-0 rotate-0';
    }
  } else {
    // Spotlighted in center
    originTransformClass = 'scale-100 translate-x-0 translate-y-0 opacity-100 rotate-0';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-auto">
      {/* Semi-transparent backdrop with subtle blur so scrolling background cards remain visible */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-zinc-950/25 backdrop-blur-[3px] transition-opacity duration-500 ease-out cursor-pointer ${
          isInRowPosition ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Center Spotlight Card with dynamic fly-in and fly-out physics */}
      <div
        className={`relative z-10 w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8
          ${task.badgeColor.border} border-[3px]
          shadow-[0_25px_60px_-15px_rgba(0,0,0,0.22),0_12px_28px_-6px_rgba(0,0,0,0.12)]
          overflow-hidden transform-gpu
          transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${originTransformClass}
        `}
      >
        {/* Progress Bar (countdown indicator) */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-100 overflow-hidden">
          <div
            className={`h-full transition-all duration-100 ease-linear ${
              task.category === 'leicht'
                ? 'bg-emerald-500'
                : task.category === 'mittel'
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Top Header bar: Meta badges & Action buttons */}
        <div className="flex items-center justify-between gap-3 mb-5 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold text-zinc-700 bg-zinc-100 border border-zinc-200/80 px-2.5 py-1 rounded-lg">
              Aufgabe #{task.number < 10 ? `0${task.number}` : task.number}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${task.badgeColor.bgBadge} ${task.badgeColor.textBadge} border ${task.badgeColor.borderBadge}`}
            >
              <span className={`w-2 h-2 rounded-full ${task.badgeColor.accentDot} animate-pulse`} />
              Kategorie: {task.difficultyLabel}
            </span>

            <span className="text-xs text-zinc-600 hidden sm:inline-flex items-center gap-1">
              • 20 Min. Zeitfenster
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Pause / Resume Button */}
            <button
              onClick={onTogglePause}
              title={isPaused ? 'Auto-Wechsel fortsetzen (Leertaste)' : 'Auto-Wechsel pausieren (Leertaste)'}
              className={`p-1.5 rounded-full border text-xs flex items-center gap-1 px-2.5 transition-colors ${
                isPaused
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-600'
              }`}
            >
              <MaterialIcon name={isPaused ? 'play_arrow' : 'pause'} className="text-sm" />
              <span className="hidden sm:inline text-[11px] font-medium">
                {isPaused ? 'Pausiert' : 'Pausieren'}
              </span>
            </button>

            {/* Prev / Next navigation */}
            <button
              onClick={onPrev}
              title="Vorherige Aufgabe (Pfeil links)"
              className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              <MaterialIcon name="chevron_left" className="text-xl" />
            </button>
            <button
              onClick={onNext}
              title="Nächste Aufgabe (Pfeil rechts)"
              className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              <MaterialIcon name="chevron_right" className="text-xl" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              title="Schließen (ESC)"
              className="p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors ml-1"
            >
              <MaterialIcon name="close" className="text-lg" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-start gap-3.5 mb-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${task.badgeColor.bgBadge} ${task.badgeColor.borderBadge} ${task.badgeColor.textBadge}`}
          >
            <MaterialIcon name={task.icon} className="text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              {task.title}
            </h2>
            {task.scenario && (
              <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
                <span className="font-semibold text-zinc-700">Alltagsszenario: </span>
                {task.scenario}
              </p>
            )}
          </div>
        </div>

        {/* Core Objective Box */}
        <div className="bg-zinc-50/90 border border-zinc-200/90 rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <MaterialIcon name="flag" className="text-base text-zinc-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
              Die Aufgabe (Ziel)
            </span>
          </div>
          <p className="text-zinc-800 text-base leading-relaxed font-medium">
            {task.goal}
          </p>
        </div>

        {/* Footer Meta & Tags */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-zinc-600">Themen:</span>
            {task.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-zinc-100 text-zinc-700 font-medium px-2.5 py-0.5 rounded-full text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-zinc-600 font-mono">
            {isPaused ? (
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Pausiert
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Auto-Cycle aktiv
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
