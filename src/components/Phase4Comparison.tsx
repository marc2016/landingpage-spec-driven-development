import { useState, FC, useEffect, FormEvent } from 'react';
import { DimensionKey, WORKSHOP_DIMENSIONS, PostItItem, PreparedCard, generateExportMarkdown } from '../data/mockData';
import { realtimeService } from '../services/realtimeService';
import { MaterialIcon } from './MaterialIcon';

interface Phase4ComparisonProps {
  onRestart: () => void;
}

export const Phase4Comparison: FC<Phase4ComparisonProps> = ({ onRestart }) => {
  // Current active subpage index: 0..3 for Dim A..D, 4 for Summary / Export Overview
  const [activeSubIndex, setActiveSubIndex] = useState<number>(0);

  const [postIts, setPostIts] = useState<PostItItem[]>(realtimeService.getPostIts());
  const [copied, setCopied] = useState(false);

  // Audience voting state for Plenum 2
  const [votes, setVotes] = useState<{ [key in DimensionKey]: number }>({
    A: 6,
    B: 9,
    C: 12,
    D: 5,
  });

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

  const isSummaryPage = activeSubIndex === 4;
  const currentDim = !isSummaryPage ? WORKSHOP_DIMENSIONS[activeSubIndex] : null;

  const handleVote = (dim: DimensionKey) => {
    setVotes((prev) => ({ ...prev, [dim]: prev[dim] + 1 }));
  };

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

  const handleCopyCompleteResult = () => {
    const md = generateExportMarkdown(postIts);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalVotes = votes.A + votes.B + votes.C + votes.D;

  const prevSub = () => {
    if (activeSubIndex > 0) setActiveSubIndex(activeSubIndex - 1);
  };

  const nextSub = () => {
    if (activeSubIndex < 4) {
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

        {/* Sub-stepper for Dimension A..D + Gesamt-Übersicht */}
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

          <button
            onClick={() => setActiveSubIndex(4)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
              activeSubIndex === 4
                ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm text-cyan-300'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <MaterialIcon name="grid_view" className="text-sm text-cyan-400" />
            <span>Gesamt-Export</span>
          </button>
        </div>
      </div>

      {/* --- Single Dimension Focus Subpage (0..3) --- */}
      {!isSummaryPage && currentDim && (
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
              onClick={nextSub}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>
                {activeSubIndex === 3
                  ? 'Zur Gesamt-Übersicht & Export'
                  : `Nächste Dimension (${WORKSHOP_DIMENSIONS[activeSubIndex + 1]?.code})`}
              </span>
              <MaterialIcon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* --- Subpage 4: Overall Summary & Export --- */}
      {isSummaryPage && (
        <div className="space-y-10 animate-fade-in">
          {/* Audience Voting Barometer */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MaterialIcon name="bolt" className="text-amber-400 text-base" />
                  <span>Gesamtes Publikums-Voting: Welcher Lösungshebel ist am wirksamsten?</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Klicke zum Abstimmen im Raum ({totalVotes} Stimmen)
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Stimmungsbarometer
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {WORKSHOP_DIMENSIONS.map((dim) => {
                const voteCount = votes[dim.id];
                const percent = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

                return (
                  <button
                    key={dim.id}
                    onClick={() => handleVote(dim.id)}
                    className="p-4 rounded-2xl border bg-zinc-950 border-zinc-800 hover:border-emerald-500/50 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400">{dim.code}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold">
                        {voteCount} ({percent}%)
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                      {dim.shortTitle}
                    </div>

                    <div className="h-1.5 w-full bg-zinc-800 rounded-full mt-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4D Matrix Overview */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Gesamtergebnis: Gegenüberstellung aller 4 Dimensionen
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WORKSHOP_DIMENSIONS.map((dim) => {
                const p1Count = postIts.filter((p) => p.phase === 1 && p.dimension === dim.id).length;
                const p2Count = postIts.filter((p) => p.phase === 2 && p.dimension === dim.id).length;

                return (
                  <div
                    key={dim.id}
                    className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white">{dim.title}</span>
                      <span className="text-[11px] text-zinc-400">
                        {p1Count} Schmerzen • {p2Count} Lösungen
                      </span>
                    </div>

                    <div className="text-xs text-red-300 bg-red-950/20 p-2.5 rounded-xl border border-red-500/20">
                      <strong>Vibe Problem:</strong> {dim.vibeProblemTitle}
                    </div>

                    <div className="text-xs text-emerald-300 bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/20">
                      <strong>SDD Lösung:</strong> {dim.sddSolutionTitle}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Markdown Export Box */}
          <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-cyan-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <MaterialIcon name="auto_awesome" className="text-sm text-cyan-400" />
                <span>Vollständiges Workshop-Ergebnis (plan2.md)</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Alles mit 1 Klick exportieren
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Kopiert das vollständige Workshop-Ergebnis inklusive aller im Plenum aufgedeckten und erfassten Notizen
                in die Zwischenablage.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleCopyCompleteResult}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <MaterialIcon name="check" className="text-sm text-emerald-950" />
                    <span>In Zwischenablage kopiert!</span>
                  </>
                ) : (
                  <>
                    <MaterialIcon name="content_copy" className="text-sm" />
                    <span>Ergebnis als Markdown kopieren</span>
                  </>
                )}
              </button>

              <button
                onClick={onRestart}
                className="px-4 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                title="Workshop von vorn starten"
              >
                <MaterialIcon name="replay" className="text-sm" />
                <span>Neustart</span>
              </button>
            </div>
          </div>

          <div className="flex justify-start">
            <button
              onClick={() => setActiveSubIndex(3)}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5"
            >
              <MaterialIcon name="arrow_back" className="text-sm" />
              <span>Zurück zu Dimension D</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
