import { useState, FC, useEffect, FormEvent } from 'react';
import { WORKSHOP_DIMENSIONS, PostItItem, PreparedCard } from '../data/mockData';
import { realtimeService } from '../services/realtimeService';
import { MaterialIcon } from './MaterialIcon';

interface Phase2FirstPlenumProps {
  onNextPhase: () => void;
}

export const Phase2MicroInteraction: FC<Phase2FirstPlenumProps> = ({ onNextPhase }) => {
  // Current active dimension subpage: A, B, C or D
  const [activeDimIndex, setActiveDimIndex] = useState<number>(0);

  // Synced post-its list
  const [postIts, setPostIts] = useState<PostItItem[]>(realtimeService.getPostIts());

  // Moderator manual input
  const [manualText, setManualText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State of prepared cards for each dimension:
  // revealed: boolean, status: 'hidden' | 'revealed' | 'pinned' | 'already_covered'
  const [cardStatus, setCardStatus] = useState<{
    [cardId: string]: 'hidden' | 'revealed' | 'pinned' | 'already_covered';
  }>({});

  useEffect(() => {
    // Notify server of active phase (Phase 2 = Plenum 1)
    realtimeService.updateActivePhase(2);

    const unsub = realtimeService.subscribePostIts((items) => {
      setPostIts(items);
    });
    return () => unsub();
  }, []);

  const currentDim = WORKSHOP_DIMENSIONS[activeDimIndex];

  const handleManualAdd = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!manualText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await realtimeService.addPostIt({
        phase: 1,
        dimension: currentDim.id,
        text: manualText.trim(),
        color:
          currentDim.id === 'A'
            ? 'pink'
            : currentDim.id === 'B'
            ? 'yellow'
            : currentDim.id === 'C'
            ? 'cyan'
            : 'green',
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

  const handlePinPreparedCard = async (card: PreparedCard) => {
    setCardStatus((prev) => ({ ...prev, [card.id]: 'pinned' }));
    await realtimeService.addPostIt({
      phase: 1,
      dimension: currentDim.id,
      text: `${card.title}: ${card.text}`,
      author: 'Impuls',
      color:
        currentDim.id === 'A'
          ? 'pink'
          : currentDim.id === 'B'
          ? 'yellow'
          : currentDim.id === 'C'
          ? 'cyan'
          : 'green',
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

  // Filter postits for Plenum 1 & active dimension
  const dimPostIts = postIts.filter((p) => p.phase === 1 && p.dimension === currentDim.id);

  const prevDim = () => {
    if (activeDimIndex > 0) setActiveDimIndex(activeDimIndex - 1);
  };

  const nextDim = () => {
    if (activeDimIndex < WORKSHOP_DIMENSIONS.length - 1) {
      setActiveDimIndex(activeDimIndex + 1);
    } else {
      onNextPhase();
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <MaterialIcon name="groups" className="text-xl" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400">
              <span>2. Erstes Plenum: Vibe Coding Analyse</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Die 4 Dimensionen einzeln im Fokus
            </h2>
          </div>
        </div>

        {/* Dimension Sub-Stepper Navigation */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 self-stretch sm:self-auto overflow-x-auto">
          {WORKSHOP_DIMENSIONS.map((dim, idx) => {
            const count = postIts.filter((p) => p.phase === 1 && p.dimension === dim.id).length;
            const isActive = activeDimIndex === idx;

            return (
              <button
                key={dim.id}
                onClick={() => setActiveDimIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm text-cyan-300'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <span>{dim.code}</span>
                {count > 0 && (
                  <span className="w-4 h-4 rounded-full bg-zinc-950 font-mono text-[10px] flex items-center justify-center text-zinc-300">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Card for Current Dimension & Question (Without distracting small boxes) */}
      <div className="bg-zinc-900 border border-zinc-750 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span
            className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider border ${currentDim.badgeBg} ${currentDim.badgeBorder} ${currentDim.badgeText}`}
          >
            {currentDim.code}: {currentDim.shortTitle}
          </span>

          <span className="text-xs text-zinc-400 font-mono">
            Dimension {activeDimIndex + 1} von {WORKSHOP_DIMENSIONS.length}
          </span>
        </div>

        {/* Guiding Question for the Audience */}
        <div className="space-y-2">
          <div className="text-xs uppercase font-bold text-rose-400 tracking-wider flex items-center gap-1.5">
            <MaterialIcon name="help_outline" className="text-sm" />
            <span>Leitfrage an das Plenum:</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            {currentDim.plenum1Question}
          </h1>
        </div>
      </div>

      {/* Active Post-its on the Wall with Empty Post-it Creator Card */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="uppercase font-bold tracking-wider flex items-center gap-2">
            <span>Digitale Post-it Wand für {currentDim.code}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </span>
          <span className="font-mono text-zinc-300">
            {dimPostIts.length} Notiz{dimPostIts.length === 1 ? '' : 'en'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Das leere Post-it zum direkten Reinschreiben */}
          <form
            onSubmit={handleManualAdd}
            className="p-4 rounded-2xl border-2 border-dashed border-amber-400/90 bg-amber-200/95 text-zinc-950 shadow-xl flex flex-col justify-between space-y-3 min-h-[160px] transform hover:-translate-y-0.5 transition-all group"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-amber-950/70">
                <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <MaterialIcon name="add" className="text-xs" />
                  <span>Neuer Zuruf</span>
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
                    handleManualAdd();
                  }
                }}
                placeholder="Zuruf hier eintippen..."
                className="w-full bg-transparent border-none text-xs sm:text-sm font-semibold text-zinc-950 placeholder-amber-950/50 outline-none resize-none leading-snug"
              />
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-amber-400/50">
              <span className="text-[10px] text-amber-950/80 font-medium">Zuruf anheften</span>
              <button
                type="submit"
                disabled={isSubmitting || !manualText.trim()}
                className="px-3 py-1 rounded-xl bg-zinc-950 hover:bg-zinc-850 disabled:opacity-30 text-amber-300 font-bold text-xs flex items-center gap-1 transition-all active:scale-95 shadow"
              >
                <MaterialIcon name="push_pin" className="text-xs" />
                <span>Anheften</span>
              </button>
            </div>
          </form>

          {/* Bereits angeheftete Post-its */}
          {dimPostIts.map((p) => (
            <div
              key={p.id}
              className={`p-4 rounded-2xl border text-xs sm:text-sm text-zinc-950 font-medium shadow-xl flex flex-col justify-between space-y-3 transform hover:-translate-y-1 transition-all animate-fade-in ${
                p.color === 'pink'
                  ? 'bg-rose-300 border-rose-400 shadow-rose-950/20'
                  : p.color === 'cyan'
                  ? 'bg-cyan-300 border-cyan-400 shadow-cyan-950/20'
                  : p.color === 'green'
                  ? 'bg-emerald-300 border-emerald-400 shadow-emerald-950/20'
                  : 'bg-amber-300 border-amber-400 shadow-amber-950/20'
              }`}
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

      {/* Vorbereitete Karten (Verdeckter Stapel) */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <MaterialIcon name="visibility" className="text-cyan-400 text-base" />
              <span>Vorbereitete Impulse (Verdeckte Karten)</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Klicke zum Aufdecken. Entscheide: An die Wand oder bereits besprochen?
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
            {currentDim.preparedPainCards.length} Impulse
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentDim.preparedPainCards.map((card, cIdx) => {
            const status = cardStatus[card.id] || 'hidden';

            if (status === 'hidden') {
              return (
                <div
                  key={card.id}
                  onClick={() => handleRevealCard(card.id)}
                  className="cursor-pointer p-6 rounded-2xl border-2 border-dashed border-zinc-700 hover:border-cyan-400/80 bg-zinc-950/60 hover:bg-cyan-500/5 transition-all text-center space-y-3 group min-h-[170px] flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-cyan-500/20 text-zinc-400 group-hover:text-cyan-300 flex items-center justify-center transition-colors">
                    <MaterialIcon name="visibility" className="text-xl" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-300 group-hover:text-white">
                      Impuls {cIdx + 1} verdeckt
                    </div>
                    <span className="text-[11px] text-zinc-500 group-hover:text-cyan-400 font-medium">
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
                  className="p-5 rounded-2xl bg-zinc-950/80 border border-cyan-500/30 text-xs space-y-3 flex flex-col justify-between min-h-[170px]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px] uppercase tracking-wider">
                      <MaterialIcon name="push_pin" className="text-sm" />
                      <span>An der Wand angeheftet</span>
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
                className="p-5 rounded-2xl bg-zinc-950 border-2 border-cyan-500/60 shadow-xl space-y-3 flex flex-col justify-between min-h-[170px] animate-fade-in"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-cyan-400">
                      Aufgedeckter Impuls:
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
                    onClick={() => handlePinPreparedCard(card)}
                    className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95"
                    title="Als Post-it an die Wand werfen"
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

      {/* Bottom Subpage Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <button
          onClick={prevDim}
          disabled={activeDimIndex === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-zinc-300 text-xs sm:text-sm font-semibold border border-zinc-800 transition-all"
        >
          <MaterialIcon name="arrow_back" className="text-sm" />
          <span>Vorherige Dimension</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
          <span>{activeDimIndex + 1}</span>
          <span>/</span>
          <span>{WORKSHOP_DIMENSIONS.length}</span>
        </div>

        <button
          onClick={nextDim}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
        >
          <span>
            {activeDimIndex === WORKSHOP_DIMENSIONS.length - 1
              ? 'Weiter zu Schritt 3: OpenSpec Workflow'
              : `Nächste Dimension (${WORKSHOP_DIMENSIONS[activeDimIndex + 1]?.code})`}
          </span>
          <MaterialIcon name="arrow_forward" className="text-sm" />
        </button>
      </div>
    </section>
  );
};
