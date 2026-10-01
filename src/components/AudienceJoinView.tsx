import { FC, useState, useEffect } from 'react';
import { MaterialIcon } from './MaterialIcon';
import { DimensionKey, WORKSHOP_DIMENSIONS, PostItItem } from '../data/mockData';
import { realtimeService, SessionState } from '../services/realtimeService';

interface AudienceJoinViewProps {
  onBackToPresenter: () => void;
}

export const AudienceJoinView: FC<AudienceJoinViewProps> = ({ onBackToPresenter }) => {
  const [session, setSession] = useState<SessionState>(realtimeService.getSession());
  const [enteredCode, setEnteredCode] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [selectedDimension, setSelectedDimension] = useState<DimensionKey>('A');
  const [postItColor, setPostItColor] = useState<'yellow' | 'pink' | 'cyan' | 'green'>('yellow');
  const [postItText, setPostItText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [mySentNotes, setMySentNotes] = useState<PostItItem[]>([]);

  useEffect(() => {
    // Check url params for pre-filled code
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('code');
    if (codeParam) {
      setEnteredCode(codeParam.toUpperCase());
    }

    const unsubSession = realtimeService.subscribeSession((s) => {
      setSession(s);
    });

    return () => unsubSession();
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredCode.trim()) return;

    if (enteredCode.trim().toUpperCase() === session.roomCode.toUpperCase()) {
      setIsJoined(true);
    } else {
      setIsJoined(true);
    }
  };

  const currentPhase: 1 | 2 = session.activePhase >= 3 ? 2 : 1;

  const handleSubmitPostIt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postItText.trim() || isSending) return;

    setIsSending(true);
    try {
      const created = await realtimeService.addPostIt({
        phase: currentPhase,
        dimension: selectedDimension,
        text: postItText.trim(),
        author: authorName.trim() || 'Teilnehmer',
        color: postItColor,
      });

      setMySentNotes((prev) => [created, ...prev]);
      setPostItText('');
      setSentSuccess(true);
      setTimeout(() => setSentSuccess(false), 2500);
    } finally {
      setIsSending(false);
    }
  };

  const colorClasses = {
    yellow: 'bg-amber-400 text-zinc-950 border-amber-300 ring-amber-400',
    pink: 'bg-rose-400 text-zinc-950 border-rose-300 ring-rose-400',
    cyan: 'bg-cyan-400 text-zinc-950 border-cyan-300 ring-cyan-400',
    green: 'bg-emerald-400 text-zinc-950 border-emerald-300 ring-emerald-400',
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-foreground flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto">
      {/* Mobile Header */}
      <header className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <button
          onClick={onBackToPresenter}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <MaterialIcon name="arrow_back" className="text-base" />
          <span>Zurück zum Beamer</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-zinc-300">
            Raum {session.roomCode}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 py-6">
        {!isJoined ? (
          /* Check-In Screen */
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                <MaterialIcon name="auto_awesome" className="text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Workshop Check-In</h1>
              <p className="text-xs sm:text-sm text-zinc-400">
                Gib den Raum-Code ein, um deine Gedanken live auf die Workshop-Wand zu werfen.
              </p>
            </div>

            <form onSubmit={handleJoin} className="space-y-4 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Raum-Code
                </label>
                <input
                  type="text"
                  required
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value.toUpperCase())}
                  placeholder="z. B. VIBE"
                  className="w-full bg-zinc-950 border border-zinc-750 focus:border-cyan-400 rounded-xl px-4 py-3 text-lg font-mono font-bold uppercase tracking-widest text-center text-white placeholder-zinc-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Dein Name oder Pseudonym (optional)
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="z. B. Alex (Dev)"
                  className="w-full bg-zinc-950 border border-zinc-750 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-zinc-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
              >
                In den Raum einklinken
              </button>
            </form>
          </div>
        ) : (
          /* Post-It Composer Screen */
          <div className="space-y-6">
            {/* Active Plenum Banner */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                currentPhase === 1
                  ? 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                  : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentPhase === 1 ? 'bg-rose-400' : 'bg-emerald-400'
                  }`}
                />
                <span>{currentPhase === 1 ? '1. Plenum: Vibe Coding Schmerzen' : '2. Plenum: OpenSpec Lösungen'}</span>
              </div>
              <p className="text-sm font-semibold mt-1 text-white">
                {currentPhase === 1
                  ? 'Wo tut Vibe Coding bei euch im Team am meisten weh?'
                  : 'Welche Spec-Driven Lösung bringt euch den größten Mehrwert?'}
              </p>
            </div>

            <form onSubmit={handleSubmitPostIt} className="space-y-5 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
              {/* Dimension Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-2">
                  Passende Dimension wählen
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {WORKSHOP_DIMENSIONS.map((dim) => {
                    const isSelected = selectedDimension === dim.id;
                    return (
                      <button
                        type="button"
                        key={dim.id}
                        onClick={() => setSelectedDimension(dim.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-zinc-800 border-cyan-400 shadow-sm shadow-cyan-500/20'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{dim.code}</div>
                        <div className="text-[11px] text-zinc-400 truncate mt-0.5">{dim.shortTitle}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-2">
                  Post-it Farbe
                </label>
                <div className="flex items-center gap-3">
                  {(['yellow', 'pink', 'cyan', 'green'] as const).map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setPostItColor(color)}
                      className={`w-9 h-9 rounded-xl border-2 transition-all ${
                        colorClasses[color]
                      } ${postItColor === color ? 'scale-110 ring-2' : 'opacity-70 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Note Text Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300 mb-1.5">
                  Dein Gedanke / Zuruf
                </label>
                <textarea
                  rows={3}
                  required
                  value={postItText}
                  onChange={(e) => setPostItText(e.target.value)}
                  placeholder={
                    currentPhase === 1
                      ? 'z. B. Nach 2 Wochen traut sich niemand mehr den Code zu ändern...'
                      : 'z. B. proposal.md klärt endlich die Nicht-Ziele vor dem Coden...'
                  }
                  className="w-full bg-zinc-950 border border-zinc-750 focus:border-cyan-400 rounded-xl p-3 text-sm text-white placeholder-zinc-500 outline-none resize-none"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={isSending || !postItText.trim()}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 disabled:opacity-50 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
              >
                <MaterialIcon name="send" className="text-base" />
                <span>Post-it an die Wand werfen!</span>
              </button>

              {sentSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-center gap-2 animate-fade-in font-medium">
                  <MaterialIcon name="check_circle" className="text-base" />
                  <span>Erfolgreich an den Beamer übertragen!</span>
                </div>
              )}
            </form>

            {/* My sent notes list */}
            {mySentNotes.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                  Deine abgeschickten Post-its ({mySentNotes.length})
                </div>
                <div className="space-y-2">
                  {mySentNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2.5"
                    >
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-[10px] text-cyan-400 font-bold shrink-0 mt-0.5">
                        Dim {note.dimension}
                      </span>
                      <p className="flex-1 leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Footer */}
      <footer className="pt-4 border-t border-zinc-850 text-center text-[11px] text-zinc-400 flex items-center justify-between">
        <span>OpenSpec Workshop</span>
        <button
          onClick={() => {
            setIsJoined(false);
            setEnteredCode('');
          }}
          className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200"
        >
          <MaterialIcon name="replay" className="text-xs" />
          <span>Raum wechseln</span>
        </button>
      </footer>
    </div>
  );
};
