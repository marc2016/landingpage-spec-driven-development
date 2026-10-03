import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  WORKSHOP_TASKS,
  WorkshopTask,
  getWildlySortedColumns,
} from '../data/workshopTasks';
import { TaskTickerCard } from './TaskTickerCard';
import { TaskSpotlightModal } from './TaskSpotlightModal';
import { MaterialIcon } from './MaterialIcon';

interface TasksOverviewPageProps {
  onStartWorkshop?: () => void;
}

export const TasksOverviewPage: React.FC<TasksOverviewPageProps> = ({ onStartWorkshop }) => {
  // Columns distribution: wildly sorted across 3 columns
  const [col1, col2, col3] = useMemo(() => getWildlySortedColumns(), []);

  // Duplicate for seamless infinite loop
  const col1Items = useMemo(() => [...col1, ...col1], [col1]);
  const col2Items = useMemo(() => [...col2, ...col2], [col2]);
  const col3Items = useMemo(() => [...col3, ...col3], [col3]);

  // Spotlight State
  const [spotlightTask, setSpotlightTask] = useState<WorkshopTask | null>(null);
  const [originColumn, setOriginColumn] = useState<number>(1); // 0 = left, 1 = center, 2 = right
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(100);

  // Bottom Button click feedback state
  const [startFeedback, setStartFeedback] = useState<string | null>(null);

  // Index of tasks to cycle through
  const currentTaskIndexRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(isPaused);
  isPausedRef.current = isPaused;

  const isClosingRef = useRef<boolean>(isClosing);
  isClosingRef.current = isClosing;

  // Auto-cycle configuration
  const DISPLAY_TIME_MS = 8000; // Duration card stays enlarged (8s)
  const PAUSE_TIME_MS = 8000; // Duration between enlarged cards (8s)
  const EXIT_ANIM_MS = 550; // Fly-back-to-row animation duration

  // Trigger smooth exit animation back into row before unmounting
  const triggerClose = useCallback(() => {
    if (isClosingRef.current) return;
    setIsClosing(true);
    setTimeout(() => {
      setSpotlightTask(null);
      setIsClosing(false);
    }, EXIT_ANIM_MS);
  }, []);

  // Timer interval for auto cycling
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let progressInterval: NodeJS.Timeout | null = null;
    let startTime = Date.now();

    // Start with a relaxed delay on initial page load (5s), then pop the first card
    const initialDelay = setTimeout(() => {
      openNextTask();
    }, 5000);

    function openNextTask() {
      if (isPausedRef.current) return;

      // Select next task in sequence and pick the origin column it emerges from
      const taskIndex = currentTaskIndexRef.current;
      const nextTask = WORKSHOP_TASKS[taskIndex % WORKSHOP_TASKS.length];
      const col = taskIndex % 3; // Alternates left (0), center (1), right (2)
      currentTaskIndexRef.current += 1;

      setOriginColumn(col);
      setIsClosing(false);
      setSpotlightTask(nextTask);
      setProgressPercent(100);
      startTime = Date.now();

      // Progress countdown interval (updates every 50ms)
      progressInterval = setInterval(() => {
        if (isPausedRef.current) return;
        const elapsed = Date.now() - startTime;
        const remainingPercent = Math.max(0, 100 - (elapsed / DISPLAY_TIME_MS) * 100);
        setProgressPercent(remainingPercent);
      }, 50);

      // Hide card after DISPLAY_TIME_MS with smooth fly-out back into the row
      timer = setTimeout(() => {
        if (progressInterval) clearInterval(progressInterval);
        setIsClosing(true);

        setTimeout(() => {
          setSpotlightTask(null);
          setIsClosing(false);

          // After PAUSE_TIME_MS, open next task
          timer = setTimeout(() => {
            openNextTask();
          }, PAUSE_TIME_MS);
        }, EXIT_ANIM_MS);
      }, DISPLAY_TIME_MS);
    }

    return () => {
      clearTimeout(initialDelay);
      if (timer) clearTimeout(timer);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [triggerClose]);

  // Handle manual task click from a specific column
  const handleCardClick = (task: WorkshopTask, col: number) => {
    setOriginColumn(col);
    setIsClosing(false);
    setSpotlightTask(task);
    setProgressPercent(100);
    setIsPaused(true); // Pause auto-cycle when manually clicked
  };

  const handleNextSpotlight = () => {
    if (!spotlightTask) return;
    const currentIndex = WORKSHOP_TASKS.findIndex((t) => t.id === spotlightTask.id);
    const nextTask = WORKSHOP_TASKS[(currentIndex + 1) % WORKSHOP_TASKS.length];
    setOriginColumn((prev) => (prev + 1) % 3);
    setSpotlightTask(nextTask);
    setProgressPercent(100);
  };

  const handlePrevSpotlight = () => {
    if (!spotlightTask) return;
    const currentIndex = WORKSHOP_TASKS.findIndex((t) => t.id === spotlightTask.id);
    const prevTask =
      WORKSHOP_TASKS[(currentIndex - 1 + WORKSHOP_TASKS.length) % WORKSHOP_TASKS.length];
    setOriginColumn((prev) => (prev - 1 + 3) % 3);
    setSpotlightTask(prevTask);
    setProgressPercent(100);
  };

  const handleStartClick = () => {
    if (onStartWorkshop) {
      onStartWorkshop();
    } else {
      setStartFeedback('Bereit! Die Moderatoren eröffnen die Ziehung in Kürze.');
      setTimeout(() => {
        setStartFeedback(null);
      }, 4000);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 flex flex-col overflow-hidden bg-dot-pattern">
      {/* Top Header Section (No navbar, clean integrated title) */}
      <header className="relative z-20 pt-6 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 bg-zinc-50 border border-zinc-200/80 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-700 shadow-sm mb-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold text-zinc-900">Workshop-Aufgabenpool</span>
          <span className="text-zinc-400">•</span>
          <span>12 Herausforderungen für 5er-Teams</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
          Vibe Coding vs. Spec-Driven
        </h1>

        {/* Subtitle with category difficulty indicators */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 text-xs sm:text-sm text-zinc-600 font-medium flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <strong className="font-bold">Grün:</strong> Leicht (4 Aufgaben)
          </span>

          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200/80 px-3 py-1 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <strong className="font-bold">Gelb:</strong> Mittel (4 Aufgaben)
          </span>

          <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 border border-rose-200/80 px-3 py-1 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <strong className="font-bold">Rot:</strong> Schwer (4 Aufgaben)
          </span>
        </div>
      </header>

      {/* Main Continuous Marquee Area: 3 Columns running Top to Bottom */}
      <main className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Soft top gradient fade mask so cards smoothly enter */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-210px)] min-h-[500px] overflow-hidden">
          {/* Column 1 - Downward scroll medium-fast */}
          <div className="relative overflow-hidden">
            <div className="flex flex-col gap-5 animate-marquee-down-col1 hover:[animation-play-state:paused]">
              {col1Items.map((task, idx) => (
                <TaskTickerCard
                  key={`col1-${task.id}-${idx}`}
                  task={task}
                  onClick={(t) => handleCardClick(t, 0)}
                  isSpotlight={spotlightTask?.id === task.id}
                />
              ))}
            </div>
          </div>

          {/* Column 2 - Downward scroll slower pace */}
          <div className="relative overflow-hidden">
            <div className="flex flex-col gap-5 animate-marquee-down-col2 hover:[animation-play-state:paused]">
              {col2Items.map((task, idx) => (
                <TaskTickerCard
                  key={`col2-${task.id}-${idx}`}
                  task={task}
                  onClick={(t) => handleCardClick(t, 1)}
                  isSpotlight={spotlightTask?.id === task.id}
                />
              ))}
            </div>
          </div>

          {/* Column 3 - Downward scroll fast pace */}
          <div className="relative overflow-hidden">
            <div className="flex flex-col gap-5 animate-marquee-down-col3 hover:[animation-play-state:paused]">
              {col3Items.map((task, idx) => (
                <TaskTickerCard
                  key={`col3-${task.id}-${idx}`}
                  task={task}
                  onClick={(t) => handleCardClick(t, 2)}
                  isSpotlight={spotlightTask?.id === task.id}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Soft bottom gradient fade mask */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent z-10 pointer-events-none" />
      </main>

      {/* Auto-enlarging Center Spotlight Modal with Fly-in and Fly-out */}
      {spotlightTask && (
        <TaskSpotlightModal
          task={spotlightTask}
          originColumn={originColumn}
          isClosing={isClosing}
          onClose={triggerClose}
          onNext={handleNextSpotlight}
          onPrev={handlePrevSpotlight}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused((prev) => !prev)}
          progressPercent={progressPercent}
        />
      )}

      {/* Bottom Dock: Start Button (Placeholder action as requested) */}
      <div className="fixed bottom-6 inset-x-0 z-30 flex flex-col items-center pointer-events-none">
        {/* Gentle feedback message when button is clicked */}
        {startFeedback && (
          <div className="mb-2 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-full shadow-lg animate-fade-in pointer-events-auto flex items-center gap-2">
            <MaterialIcon name="info" className="text-emerald-400 text-sm" />
            <span>{startFeedback}</span>
          </div>
        )}

        <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-zinc-200/90 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.15)] flex items-center gap-2">
          <button
            onClick={handleStartClick}
            id="start-workshop-button"
            className="group relative px-8 py-3.5 bg-zinc-900 hover:bg-black text-white text-sm font-semibold rounded-full shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2.5"
          >
            <span>Workshop starten</span>
            <MaterialIcon
              name="arrow_forward"
              className="text-base text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
