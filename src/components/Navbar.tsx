import { useState, useEffect, FC } from 'react';
import { Play, Pause, RotateCcw, Clock, Layers } from 'lucide-react';

interface NavbarProps {
  activePhase: number;
  setActivePhase: (phase: number) => void;
}

export const Navbar: FC<NavbarProps> = ({ activePhase, setActivePhase }) => {
  // 20-minute lightning session timer (1200 seconds)
  const [secondsLeft, setSecondsLeft] = useState<number>(20 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(20 * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((1200 - secondsLeft) / 1200) * 100;

  const phases = [
    { num: 1, label: '01 Schmerz' },
    { num: 2, label: '02 Gegenmittel' },
    { num: 3, label: '03 Workflow' },
    { num: 4, label: '04 Vergleich' },
    { num: 5, label: '05 CTA' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav">
      {/* Timer Progress Indicator Line */}
      <div className="h-0.5 w-full bg-zinc-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight">OpenSpec</span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                SDD
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">Spec Driven Development</p>
          </div>
        </div>

        {/* Phase Stepper for Speaker & Audience Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80">
          {phases.map((p) => (
            <button
              key={p.num}
              onClick={() => setActivePhase(p.num)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activePhase === p.num
                  ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60 text-cyan-400 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <span>{p.label}</span>
            </button>
          ))}
        </nav>

        {/* 20-Minute Lightning Session Timer Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span
              className={`font-mono text-xs font-bold tracking-wider ${
                secondsLeft < 180 ? 'text-amber-400 animate-pulse' : 'text-zinc-200'
              }`}
            >
              {formatTime(secondsLeft)}
            </span>
            <div className="flex items-center gap-1 pl-1 border-l border-zinc-800">
              <button
                onClick={toggleTimer}
                title={isRunning ? 'Pause Timer' : 'Start 20m Timer'}
                className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={resetTimer}
                title="Reset Timer"
                className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>mock-mode</span>
          </div>
        </div>
      </div>
    </header>
  );
};
