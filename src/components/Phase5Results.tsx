import { useState, FC, useEffect } from 'react';
import { WORKSHOP_DIMENSIONS, PostItItem, generateExportMarkdown } from '../data/mockData';
import { realtimeService } from '../services/realtimeService';
import { MaterialIcon } from './MaterialIcon';

interface Phase5ResultsProps {
  onRestart: () => void;
  onBackToPhase4: () => void;
}

export const Phase5Results: FC<Phase5ResultsProps> = ({ onRestart, onBackToPhase4 }) => {
  const [postIts, setPostIts] = useState<PostItItem[]>(realtimeService.getPostIts());
  const [copied, setCopied] = useState(false);
  const [commandCopied, setCommandCopied] = useState(false);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);

  const command = 'npx openspec init';

  useEffect(() => {
    // Notify server of active phase (Phase 5 = Gesamtergebnis)
    realtimeService.updateActivePhase(5);

    const unsub = realtimeService.subscribePostIts((items) => {
      setPostIts(items);
    });
    return () => unsub();
  }, []);





  const exportMarkdown = generateExportMarkdown(postIts);

  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([exportMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'workshop-ergebnis-openspec.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(command);
    setCommandCopied(true);
    setTimeout(() => setCommandCopied(false), 2000);
  };

  const [selectedDimId, setSelectedDimId] = useState<'ALL' | 'A' | 'B' | 'C' | 'D'>('ALL');

  const totalLiveP1 = postIts.filter((p) => p.phase === 1).length;
  const totalLiveP2 = postIts.filter((p) => p.phase === 2).length;
  const totalPreparedPain = WORKSHOP_DIMENSIONS.reduce((acc, d) => acc + d.preparedPainCards.length, 0);
  const totalPreparedSol = WORKSHOP_DIMENSIONS.reduce((acc, d) => acc + d.preparedSolutionCards.length, 0);

  const displayedDimensions =
    selectedDimId === 'ALL'
      ? WORKSHOP_DIMENSIONS
      : WORKSHOP_DIMENSIONS.filter((d) => d.id === selectedDimId);

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <MaterialIcon name="analytics" className="text-xl" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <span>5. Workshop-Ergebnisse & Gesamtexport</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Synthese: Vibe Coding vs. Spec-Driven Development
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-zinc-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <MaterialIcon name="check" className="text-sm text-zinc-950" />
                <span>Kopiert!</span>
              </>
            ) : (
              <>
                <MaterialIcon name="content_copy" className="text-sm" />
                <span>Gesamtexport</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Gegenüberstellung: Negative Vibe-Karten vs. Positive Spec-Driven Karten */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>Gegenüberstellung: Schmerzpunkte vs. Lösungshebel</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Direkter Vergleich: Unsere negativen Karten aus Vibe Coding (Plenum 1) gegenüber den positiven Karten aus Spec-Driven Development (Plenum 2).
            </p>
          </div>

          {/* Quick Counter Chips */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-rose-300 bg-rose-950/40 px-3 py-1 rounded-xl border border-rose-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>{totalPreparedPain + totalLiveP1} Negativ-Karten</span>
            </span>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/40 px-3 py-1 rounded-xl border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{totalPreparedSol + totalLiveP2} Positiv-Karten</span>
            </span>
          </div>
        </div>

        {/* Dimension Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800/80">
          <button
            onClick={() => setSelectedDimId('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedDimId === 'ALL'
                ? 'bg-zinc-800 text-cyan-300 border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <MaterialIcon name="apps" className="text-sm" />
            <span>Alle 4 Dimensionen</span>
          </button>

          {WORKSHOP_DIMENSIONS.map((dim) => {
            const isSelected = selectedDimId === dim.id;
            const dimP1 = postIts.filter((p) => p.phase === 1 && p.dimension === dim.id).length;
            const dimP2 = postIts.filter((p) => p.phase === 2 && p.dimension === dim.id).length;
            const liveTotal = dimP1 + dimP2;

            return (
              <button
                key={dim.id}
                onClick={() => setSelectedDimId(dim.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <span>{dim.code}</span>
                {liveTotal > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-zinc-950 text-[10px] font-mono text-cyan-400 border border-zinc-800">
                    +{liveTotal}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dimension Comparison Cards List */}
        <div className="space-y-8">
          {displayedDimensions.map((dim) => {
            const dimLiveP1 = postIts.filter((p) => p.phase === 1 && p.dimension === dim.id);
            const dimLiveP2 = postIts.filter((p) => p.phase === 2 && p.dimension === dim.id);

            return (
              <div
                key={dim.id}
                className="p-5 sm:p-7 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6"
              >
                {/* Dimension Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {dim.code}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {dim.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-rose-300">
                      {dim.preparedPainCards.length + dimLiveP1.length} Schmerzen
                    </span>
                    <MaterialIcon name="arrow_forward" className="text-xs text-zinc-500" />
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-300">
                      {dim.preparedSolutionCards.length + dimLiveP2.length} Lösungen
                    </span>
                  </div>
                </div>

                {/* Core Tension Hook: Problem vs Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-rose-200 space-y-1">
                    <div className="font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
                      <MaterialIcon name="warning" className="text-xs" />
                      <span>Kern-Risiko Vibe Coding:</span>
                    </div>
                    <p className="font-medium text-rose-100/90">{dim.vibeProblemTitle}</p>
                    <p className="text-[11px] text-rose-300/80">{dim.vibeProblemDesc}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 space-y-1">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
                      <MaterialIcon name="verified" className="text-xs" />
                      <span>Lösungs-Antwort Spec-Driven:</span>
                    </div>
                    <p className="font-medium text-emerald-100/90">{dim.sddSolutionTitle}</p>
                    <p className="text-[11px] text-emerald-300/80">{dim.sddSolutionDesc}</p>
                  </div>
                </div>

                {/* Live Plenums-Notizen (falls für diese Dimension vorhanden) */}
                {(dimLiveP1.length > 0 || dimLiveP2.length > 0) && (
                  <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                        <MaterialIcon name="push_pin" className="text-sm text-cyan-400" />
                        <span>Live gesammelte Zurufe & Notizen aus dem Plenum:</span>
                      </span>
                      <span className="font-mono text-[11px]">
                        {dimLiveP1.length} negativ • {dimLiveP2.length} positiv
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Left: Live Negative Notes */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1">
                          <MaterialIcon name="remove_circle_outline" className="text-xs" />
                          <span>Plenum 1 (Vibe Schmerzpunkte)</span>
                        </span>
                        {dimLiveP1.length === 0 ? (
                          <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-850 text-xs text-zinc-500 italic">
                            Keine individuellen Live-Notizen für diese Dimension erfasst.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {dimLiveP1.map((p) => (
                              <div
                                key={p.id}
                                className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 text-xs shadow-sm flex items-start gap-2"
                              >
                                <MaterialIcon name="push_pin" className="text-xs text-rose-400 shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium text-rose-100">{p.text}</p>
                                  {p.author && (
                                    <span className="text-[10px] text-rose-400/80 font-mono">von {p.author}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Live Positive Notes */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1">
                          <MaterialIcon name="check_circle_outline" className="text-xs" />
                          <span>Plenum 2 (Spec-Driven Lösungen)</span>
                        </span>
                        {dimLiveP2.length === 0 ? (
                          <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-850 text-xs text-zinc-500 italic">
                            Keine individuellen Live-Notizen für diese Dimension erfasst.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {dimLiveP2.map((p) => (
                              <div
                                key={p.id}
                                className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-xs shadow-sm flex items-start gap-2"
                              >
                                <MaterialIcon name="push_pin" className="text-xs text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium text-emerald-100">{p.text}</p>
                                  {p.author && (
                                    <span className="text-[10px] text-emerald-400/80 font-mono">von {p.author}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 1-to-1 Gegenüberstellung der vorbereiteten Karten */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400">
                      <MaterialIcon name="close" className="text-sm" />
                      <span>Negative Karten (Vibe Coding)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <MaterialIcon name="check" className="text-sm" />
                      <span>Positive Karten (Spec-Driven)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {dim.preparedPainCards.map((painCard, idx) => {
                      const solCard = dim.preparedSolutionCards[idx];

                      return (
                        <div
                          key={painCard.id}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 p-1 rounded-2xl bg-zinc-950/40 border border-zinc-800/60"
                        >
                          {/* Negative Card (Vibe Coding) */}
                          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 hover:border-rose-500/50 transition-all flex flex-col justify-between space-y-2">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/10 text-[10px] font-mono font-bold text-rose-400 border border-rose-500/20">
                                  <MaterialIcon name="warning" className="text-[11px]" />
                                  <span>Schmerzpunkt #{idx + 1}</span>
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-rose-200">
                                {painCard.title}
                              </h5>
                              <p className="text-xs text-zinc-300 leading-relaxed">
                                {painCard.text}
                              </p>
                            </div>
                          </div>

                          {/* Positive Card (Spec-Driven Development) */}
                          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-2">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
                                  <MaterialIcon name="verified" className="text-[11px]" />
                                  <span>Lösungshebel #{idx + 1}</span>
                                </span>
                                <span className="text-[10px] text-emerald-400/80 font-mono hidden sm:inline">
                                  löst Schmerzpunkt #{idx + 1}
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-emerald-200">
                                {solCard?.title || 'OpenSpec Leitplanke'}
                              </h5>
                              <p className="text-xs text-zinc-300 leading-relaxed">
                                {solCard?.text || 'Strukturierte Spezifikation sichert die Invariante ab.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Full Markdown Export Box */}
      <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <MaterialIcon name="description" className="text-sm text-cyan-400" />
              <span>Vollständiges Dokument</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Gesamtes Workshop-Ergebnis exportieren
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Enthält alle Definitionen, Plenums-Ergebnisse, den OpenSpec-Workflow und alle gesammelten Notizen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleCopyExport}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <MaterialIcon name="check" className="text-base text-zinc-950" />
                  <span>Kopiert!</span>
                </>
              ) : (
                <>
                  <MaterialIcon name="content_copy" className="text-base" />
                  <span>In Zwischenablage kopieren</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-zinc-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all"
              title="Als Markdown-Datei (.md) herunterladen"
            >
              <MaterialIcon name="download" className="text-base" />
              <span>.md Download</span>
            </button>

            <button
              onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
              className="px-3 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-medium flex items-center justify-center gap-1 transition-all"
              title="Vorschau ein-/ausblenden"
            >
              <MaterialIcon name={isPreviewExpanded ? 'expand_less' : 'visibility'} className="text-base" />
              <span className="hidden sm:inline">{isPreviewExpanded ? 'Einklappen' : 'Vorschau'}</span>
            </button>
          </div>
        </div>

        {/* Live Preview Container */}
        {isPreviewExpanded && (
          <div className="animate-fade-in space-y-3 pt-3 border-t border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono">workshop-ergebnis-openspec.md</span>
              <span>{exportMarkdown.length} Zeichen</span>
            </div>
            <pre className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-300 font-mono whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed select-text">
              {exportMarkdown}
            </pre>
          </div>
        )}
      </div>

      {/* 4. Terminal Quickstart Box */}
      <div className="bg-zinc-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
          <span className="text-zinc-200 font-bold">Projekt-Initialisierung</span>
          <span className="text-cyan-400 font-semibold">sofort startklar</span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300">
          Führe diesen Befehl in deinem Terminal aus, um OpenSpec direkt in dein Projekt einzubinden:
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center gap-3 font-mono text-sm sm:text-base text-cyan-300">
            <span className="text-zinc-500 select-none">$</span>
            <span className="font-bold">{command}</span>
          </div>

          <button
            onClick={handleCopyCommand}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            {commandCopied ? (
              <>
                <MaterialIcon name="check" className="text-base" />
                <span>Kopiert!</span>
              </>
            ) : (
              <>
                <MaterialIcon name="content_copy" className="text-base" />
                <span>Befehl kopieren</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-850">
        <button
          onClick={onBackToPhase4}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-all"
        >
          <MaterialIcon name="arrow_back" className="text-sm" />
          <span>Zurück zu 4. Zweites Plenum</span>
        </button>

        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 text-xs font-bold text-cyan-300 hover:text-white transition-all shadow-sm"
        >
          <MaterialIcon name="replay" className="text-base" />
          <span>Workshop von vorne beginnen (Phase 1)</span>
        </button>
      </div>
    </section>
  );
};
