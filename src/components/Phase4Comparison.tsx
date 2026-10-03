import { useState, FC, useEffect, FormEvent } from 'react';
import { WORKSHOP_DIMENSIONS, PostItItem, PreparedCard } from '../data/mockData';
import { realtimeService } from '../services/realtimeService';
import { MaterialIcon } from './MaterialIcon';

interface Phase4ComparisonProps {
  onNextPhase: () => void;
}

export const Phase4Comparison: FC<Phase4ComparisonProps> = ({ onNextPhase }) => {
  // Current active subpage index: 0..3 for Dim A..D
  const [activeSubIndex, setActiveSubIndex] = useState<number>(0);

  const [postIts, setPostIts] = useState<PostItItem[]>(realtimeService.getPostIts());

  // Manual solution thought input
  const [manualText, setManualText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State of prepared solution cards: 'hidden' | 'revealed' | 'pinned' | 'already_covered'
  const [cardStatus, setCardStatus] = useState<{
    [cardId: string]: 'hidden' | 'revealed' | 'pinned' | 'already_covered';
  }>({});

  useEffect(() => {
    // Notify server of active phase (Phase 4 = Plenum 2)
    realtimeService.updateActivePhase(4);

    const unsub = realtimeService.subscribePostIts((items) => {
      setPostIts(items);
    });
    return () => unsub();
  }, []);

  const currentDim = WORKSHOP_DIMENSIONS[activeSubIndex];

  const handleManualAddSolution = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!manualText.trim() || isSubmitting || !currentDim) return;

    setIsSubmitting(true);
    try {
      await realtimeService.addPostIt({
        phase: 2,
        dimension: currentDim.id,
        text: manualText.trim(),
        color: 'green',
      });
      setManualText('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevealCard = (cardId: string) => {
    setCardStatus((prev) => ({
      ...prev,
      [cardId]: prev[cardId] === 'revealed' ? 'hidden' : 'revealed',
    }));
  };

  const handlePinPreparedSolution = async (card: PreparedCard) => {
    if (!currentDim) return;
    setCardStatus((prev) => ({ ...prev, [card.id]: 'pinned' }));
    await realtimeService.addPostIt({
      phase: 2,
      dimension: currentDim.id,
      text: `${card.title}: ${card.text}`,
      author: 'Lösung',
      color: 'green',
    });
  };

  const handleMarkAlreadyCovered = (cardId: string) => {
    setCardStatus((prev) => ({ ...prev, [cardId]: 'already_covered' }));
  };

  const handleResetCard = (cardId: string) => {
    setCardStatus((prev) => ({ ...prev, [cardId]: 'hidden' }));
  };

  const handleDeletePostIt = (id: string) => {
    realtimeService.deletePostIt(id);
  };

  const prevSub = () => {
    if (activeSubIndex > 0) setActiveSubIndex(activeSubIndex - 1);
  };

  const nextSub = () => {
    if (activeSubIndex < 3) {
      setActiveSubIndex(activeSubIndex + 1);
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Top Banner with Sub-stepper */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <MaterialIcon name="groups" className="text-xl" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <span>4. Zweites Plenum: Reflexion & Abgleich</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Wie OpenSpec die Dimensionen löst
            </h2>
          </div>
        </div>

        {/* Sub-stepper for Dimension A..D */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 self-stretch sm:self-auto overflow-x-auto">
          {WORKSHOP_DIMENSIONS.map((dim, idx) => {
            const count = postIts.filter((p) => p.phase === 2 && p.dimension === dim.id).length;
            const isActive = activeSubIndex === idx;

            return (
              <button
                key={dim.id}
                onClick={() => setActiveSubIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm text-emerald-300'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <span>{dim.code}</span>
                {count > 0 && (
                  <span className="w-4 h-4 rounded-full bg-zinc-950 font-mono text-[10px] flex items-center justify-center text-emerald-400">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Single Dimension Focus Subpage (0..3) --- */}
      {currentDim && (
        <div className="space-y-8 animate-fade-in">
          {/* Hero Card for Current Dimension & Question */}
          <div className="bg-zinc-900 border border-zinc-750 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span
                className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider border ${currentDim.badgeBg} ${currentDim.badgeBorder} ${currentDim.badgeText}`}
              >
                {currentDim.code}: {currentDim.shortTitle}
              </span>

              <span className="text-xs text-zinc-400 font-mono">
                Lösungs-Dimension {activeSubIndex + 1} von {WORKSHOP_DIMENSIONS.length}
              </span>
            </div>

            {/* Guiding Question */}
            <div className="space-y-2">
              <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                <MaterialIcon name="help_outline" className="text-sm" />
                <span>Lösungsfrage an das Plenum:</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {currentDim.plenum2Question}
              </h1>
            </div>
          </div>

          {/* Active Solution Post-its on the Wall with Empty Post-it Creator Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="uppercase font-bold tracking-wider flex items-center gap-2">
                <span>Lösungs-Wand für {currentDim.code}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="font-mono text-zinc-300">
                {postIts.filter((p) => p.phase === 2 && p.dimension === currentDim.id).length} Erkenntnisse
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Das leere Lösungs-Post-it zum direkten Reinschreiben */}
              <form
                onSubmit={handleManualAddSolution}
                className="p-4 rounded-2xl border-2 border-dashed border-emerald-400/90 bg-emerald-200/95 text-zinc-950 shadow-xl flex flex-col justify-between space-y-3 min-h-[160px] transform hover:-translate-y-0.5 transition-all group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-emerald-950/70">
                    <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <MaterialIcon name="add" className="text-xs" />
                      <span>Neue Erkenntnis</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-80">Enter ↵</span>
                  </div>
                  <textarea
                    rows={3}
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleManualAddSolution();
                      }
                    }}
                    placeholder="Lösungs-Gedanke hier eintippen..."
                    className="w-full bg-transparent border-none text-xs sm:text-sm font-semibold text-zinc-950 placeholder-emerald-950/50 outline-none resize-none leading-snug"
                  />
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-emerald-400/50">
                  <span className="text-[10px] text-emerald-950/80 font-medium">Erkenntnis anheften</span>
                  <button
                    type="submit"
                    disabled={isSubmitting || !manualText.trim()}
                    className="px-3 py-1 rounded-xl bg-zinc-950 hover:bg-zinc-850 disabled:opacity-30 text-emerald-300 font-bold text-xs flex items-center gap-1 transition-all active:scale-95 shadow"
                  >
                    <MaterialIcon name="push_pin" className="text-xs" />
                    <span>Anheften</span>
                  </button>
                </div>
              </form>

              {/* Bereits angeheftete Lösungs-Post-its */}
              {postIts
                .filter((p) => p.phase === 2 && p.dimension === currentDim.id)
                .map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl border border-emerald-400/80 bg-emerald-300 text-xs sm:text-sm text-zinc-950 font-medium shadow-xl flex flex-col justify-between space-y-3 transform hover:-translate-y-1 transition-all animate-fade-in"
                  >
                    <p className="leading-snug text-zinc-950 font-semibold">{p.text}</p>
                    <div className="flex items-center justify-end pt-2 border-t border-zinc-950/10">
                      <button
                        onClick={() => handleDeletePostIt(p.id)}
                        className="p-1 text-zinc-700 hover:text-red-700 transition-colors"
                        title="Notiz entfernen"
                      >
                        <MaterialIcon name="delete" className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Vorbereitete Lösungs-Karten (Verdeckter Stapel) */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <MaterialIcon name="visibility" className="text-emerald-400 text-base" />
                  <span>Vorbereitete Lösungs-Impulse (Verdeckte Karten)</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Aufdecken und entscheiden: Als Lösung anheften oder als besprochen markieren.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                {currentDim.preparedSolutionCards.length} Impulse
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentDim.preparedSolutionCards.map((card, cIdx) => {
                const status = cardStatus[card.id] || 'hidden';

                if (status === 'hidden') {
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleRevealCard(card.id)}
                      className="cursor-pointer p-6 rounded-2xl border-2 border-dashed border-zinc-700 hover:border-emerald-400/80 bg-zinc-950/60 hover:bg-emerald-500/5 transition-all text-center space-y-3 group min-h-[170px] flex flex-col items-center justify-center"
                    >
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-emerald-500/20 text-zinc-400 group-hover:text-emerald-300 flex items-center justify-center transition-colors">
                        <MaterialIcon name="visibility" className="text-xl" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-300 group-hover:text-white">
                          Lösungs-Impuls {cIdx + 1} verdeckt
                        </div>
                        <span className="text-[11px] text-zinc-500 group-hover:text-emerald-400 font-medium">
                          Klicken zum Aufdecken
                        </span>
                      </div>
                    </div>
                  );
                }

                if (status === 'already_covered') {
                  return (
                    <div
                      key={card.id}
                      className="p-5 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 text-xs space-y-3 flex flex-col justify-between min-h-[170px]"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                          <MaterialIcon name="check_circle" className="text-sm" />
                          <span>Bereits besprochen</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{card.title}</h4>
                        <p className="text-zinc-400 text-xs leading-relaxed">{card.text}</p>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleResetCard(card.id)}
                          className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
                        >
                          <MaterialIcon name="replay" className="text-xs" />
                          <span>Zurücksetzen</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                if (status === 'pinned') {
                  return (
                    <div
                      key={card.id}
                      className="p-5 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 text-xs space-y-3 flex flex-col justify-between min-h-[170px]"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                          <MaterialIcon name="push_pin" className="text-sm" />
                          <span>Als Lösung angeheftet</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{card.title}</h4>
                        <p className="text-zinc-400 text-xs leading-relaxed">{card.text}</p>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleResetCard(card.id)}
                          className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
                        >
                          <MaterialIcon name="replay" className="text-xs" />
                          <span>Zurücksetzen</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                // Status 'revealed'
                return (
                  <div
                    key={card.id}
                    className="p-5 rounded-2xl bg-zinc-950 border-2 border-emerald-500/60 shadow-xl space-y-3 flex flex-col justify-between min-h-[170px] animate-fade-in"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400">
                          Aufgedeckte Lösung:
                        </span>
                        <button
                          onClick={() => handleRevealCard(card.id)}
                          className="text-zinc-500 hover:text-zinc-300 text-[11px]"
                          title="Wieder verdecken"
                        >
                          Verdecken
                        </button>
                      </div>
                      <h4 className="font-bold text-white text-sm">{card.title}</h4>
                      <p className="text-zinc-300 text-xs leading-relaxed">{card.text}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                      <button
                        onClick={() => handlePinPreparedSolution(card)}
                        className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95"
                        title="Als Lösung anheften"
                      >
                        <MaterialIcon name="push_pin" className="text-xs" />
                        <span>An die Wand</span>
                      </button>

                      <button
                        onClick={() => handleMarkAlreadyCovered(card.id)}
                        className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-1 transition-all"
                        title="Haben wir schon besprochen"
                      >
                        <MaterialIcon name="check" className="text-xs text-emerald-400" />
                        <span>Haben wir schon</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subpage Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <button
              onClick={prevSub}
              disabled={activeSubIndex === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-zinc-300 text-xs sm:text-sm font-semibold border border-zinc-800 transition-all"
            >
              <MaterialIcon name="arrow_back" className="text-sm" />
              <span>Vorherige Dimension</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <span>{activeSubIndex + 1}</span>
              <span>/</span>
              <span>{WORKSHOP_DIMENSIONS.length}</span>
            </div>

            <button
              onClick={activeSubIndex === 3 ? onNextPhase : nextSub}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>
                {activeSubIndex === 3
                  ? 'Weiter zu 5: Workshop-Ergebnisse'
                  : `Nächste Dimension (${WORKSHOP_DIMENSIONS[activeSubIndex + 1]?.code})`}
              </span>
              <MaterialIcon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

