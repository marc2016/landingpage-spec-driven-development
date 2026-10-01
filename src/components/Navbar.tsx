import { useState, useEffect, FC } from 'react';
import { QRCodeModal } from './QRCodeModal';
import { realtimeService, SessionState } from '../services/realtimeService';
import { generateExportMarkdown } from '../data/mockData';
import { MaterialIcon } from './MaterialIcon';

interface NavbarProps {
  activePhase: number;
  setActivePhase: (phase: number) => void;
}

export const Navbar: FC<NavbarProps> = ({ activePhase, setActivePhase }) => {
  // Workshop timer (20 minutes default = 1200 seconds)
  const [secondsLeft, setSecondsLeft] = useState<number>(20 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);
  const [session, setSession] = useState<SessionState>(realtimeService.getSession());

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

  useEffect(() => {
    const unsub = realtimeService.subscribeSession((s) => {
      setSession(s);
    });
    return () => unsub();
  }, []);

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
    { num: 1, label: '1. Vibe Coding' },
    { num: 2, label: '2. Erstes Plenum' },
    { num: 3, label: '3. OpenSpec Workflow' },
    { num: 4, label: '4. Zweites Plenum' },
  ];

  const handleCopyResult = () => {
    const md = generateExportMarkdown(realtimeService.getPostIts());
    navigator.clipboard.writeText(md);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-nav border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        {/* Progress bar */}
        <div className="h-1 w-full bg-zinc-900">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <MaterialIcon name="layers" className="text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">OpenSpec</span>
                <span className="hidden sm:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Workshop
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden md:block">Vibe Coding vs. Spec-Driven Development</p>
            </div>
          </div>

          {/* Stepper (4 Phases from plan2.md) */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800">
            {phases.map((p) => (
              <button
                key={p.num}
                onClick={() => setActivePhase(p.num)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1.5 ${
                  activePhase === p.num
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700 text-cyan-300 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 font-medium'
                }`}
              >
                <span>{p.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Room Code & QR Modal Trigger */}
            <button
              onClick={() => setIsQrOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 transition-all text-xs font-medium group"
              title="Raum-Code & QR-Code für Teilnehmer anzeigen"
            >
              <MaterialIcon name="qr_code_2" className="text-lg text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="font-mono font-bold tracking-wider">{session.roomCode}</span>
              <span className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-400 pl-1 border-l border-cyan-800/50">
                <MaterialIcon name="smartphone" className="text-xs text-emerald-400" />
                <span>Handy-Join</span>
              </span>
            </button>

            {/* Copy Result Button */}
            <button
              onClick={handleCopyResult}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-all"
              title="Vollständiges Workshop-Ergebnis kopieren"
            >
              {copiedResult ? (
                <>
                  <MaterialIcon name="check" className="text-sm text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Kopiert!</span>
                </>
              ) : (
                <>
                  <MaterialIcon name="content_copy" className="text-sm text-zinc-400" />
                  <span>Ergebnis kopieren</span>
                </>
              )}
            </button>

            {/* Timer Widget */}
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded-xl">
              <MaterialIcon name="timer" className="text-sm text-cyan-400" />
              <span
                className={`font-mono text-xs font-bold tracking-wider ${
                  secondsLeft < 180 ? 'text-amber-400 animate-pulse' : 'text-zinc-200'
                }`}
              >
                {formatTime(secondsLeft)}
              </span>
              <div className="flex items-center gap-0.5 pl-1 border-l border-zinc-800">
                <button
                  onClick={toggleTimer}
                  title={isRunning ? 'Pause' : 'Start'}
                  className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                >
                  <MaterialIcon name={isRunning ? 'pause' : 'play_arrow'} className="text-xs" />
                </button>
                <button
                  onClick={resetTimer}
                  title="Reset"
                  className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                >
                  <MaterialIcon name="replay" className="text-xs" />
                </button>
              </div>
            </div>

            {/* Mode badge: Live vs Local */}
            <div
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono border ${
                session.serverConnected
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  session.serverConnected ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'
                }`}
              />
              <span>{session.serverConnected ? 'server-live' : 'lokal/autark'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* QR Code Modal for Participants */}
      <QRCodeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} roomCode={session.roomCode} />
    </>
  );
};
