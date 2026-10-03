import React, { useState, useEffect } from 'react';
import { MaterialIcon } from './MaterialIcon';
import {
  PostIt,
  PRESET_POST_ITS_VIBE,
  PRESET_POST_ITS_SPEC,
} from './RetroPostItsPage';

interface FinalPostItsSummaryPageProps {
  onBack: () => void;
  onRestart: () => void;
}

type FilterMode = 'all' | 'vibe' | 'spec' | 'positive' | 'negative';

const STORAGE_KEY_VIBE = 'openspec_postits_vibe';
const STORAGE_KEY_SPEC = 'openspec_postits_spec';

const getRandomRotation = (idx: number) => {
  const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
  return rotations[idx % rotations.length];
};

export const FinalPostItsSummaryPage: React.FC<FinalPostItsSummaryPageProps> = ({
  onBack,
  onRestart,
}) => {
  // Load Vibe Coding Post-Its (strictly what was collected/adopted in Retro 1)
  const [vibePostIts, setVibePostIts] = useState<PostIt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VIBE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  // Load Spec-Driven Post-Its (strictly what was collected/adopted in Retro 2)
  const [specPostIts, setSpecPostIts] = useState<PostIt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SPEC);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  // Persist to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VIBE, JSON.stringify(vibePostIts));
    } catch (e) {}
  }, [vibePostIts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SPEC, JSON.stringify(specPostIts));
    } catch (e) {}
  }, [specPostIts]);

  // Synchronize across tabs or when updated in retro views
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_VIBE && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setVibePostIts(parsed);
        } catch (err) {}
      }
      if (e.key === STORAGE_KEY_SPEC && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setSpecPostIts(parsed);
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter state
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  const handleDeletePostIt = (category: 'vibe' | 'spec', id: string) => {
    if (category === 'vibe') {
      setVibePostIts((prev) => prev.filter((p) => p.id !== id));
    } else {
      setSpecPostIts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleReloadPresets = () => {
    const defaultVibe: PostIt[] = PRESET_POST_ITS_VIBE.map((p, idx) => ({
      id: `vibe-${Date.now()}-${idx}`,
      text: p.text,
      type: p.type,
      rotation: getRandomRotation(idx),
    }));
    const defaultSpec: PostIt[] = PRESET_POST_ITS_SPEC.map((p, idx) => ({
      id: `spec-${Date.now()}-${idx}`,
      text: p.text,
      type: p.type,
      rotation: getRandomRotation(idx + 2),
    }));
    setVibePostIts(defaultVibe);
    setSpecPostIts(defaultSpec);
  };

  const handleClearBoard = () => {
    setVibePostIts([]);
    setSpecPostIts([]);
    try {
      localStorage.setItem(STORAGE_KEY_VIBE, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEY_SPEC, JSON.stringify([]));
    } catch (e) {}
  };

  // Calculations
  const vibePositives = vibePostIts.filter((p) => p.type === 'positive');
  const vibeNegatives = vibePostIts.filter((p) => p.type === 'negative');
  const specPositives = specPostIts.filter((p) => p.type === 'positive');
  const specNegatives = specPostIts.filter((p) => p.type === 'negative');
  const totalCount = vibePostIts.length + specPostIts.length;

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between overflow-x-hidden bg-dot-pattern">
      {/* Top Header (Centered, like spec-driven-concept) */}
      <header className="relative z-20 pt-8 pb-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-purple-800 shadow-2xs mb-3">
          <MaterialIcon name="dashboard" className="text-sm text-purple-600" />
          <span>Station 09 • Workshop-Abschluss & Gesamtfazit</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-3">
          Alle Erkenntnisse im direkten Vergleich
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-3xl mx-auto leading-relaxed">
          Gegenüberstellung aller Post-Its aus den beiden Arbeitsphasen: Wo brilliert Vibe Coding –
          und warum löst Spec-Driven Development die typischen KI-Sackgassen?
        </p>

        {/* Quick Action Toolbar & Filter Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 bg-zinc-50 border border-zinc-200/90 p-2.5 rounded-2xl max-w-5xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
              }`}
            >
              Alle Zettel ({totalCount})
            </button>
            <button
              onClick={() => setFilterMode('vibe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterMode === 'vibe'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
              }`}
            >
              <MaterialIcon name="bolt" className="text-xs" />
              <span>Vibe Coding ({vibePostIts.length})</span>
            </button>
            <button
              onClick={() => setFilterMode('spec')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterMode === 'spec'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
              }`}
            >
              <MaterialIcon name="architecture" className="text-xs" />
              <span>Spec-Driven ({specPostIts.length})</span>
            </button>
            <button
              onClick={() => setFilterMode('positive')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filterMode === 'positive'
                  ? 'bg-lime-700 text-white shadow-xs'
                  : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
              }`}
            >
              <span>Positiv (+{vibePositives.length + specPositives.length})</span>
            </button>
            <button
              onClick={() => setFilterMode('negative')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filterMode === 'negative'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
              }`}
            >
              <span>Schmerzpunkte (-{vibeNegatives.length + specNegatives.length})</span>
            </button>
          </div>

          {/* Action buttons: Reload & Clear */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReloadPresets}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-900 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
              title="Muster-Zettel laden"
            >
              <MaterialIcon name="refresh" className="text-sm" />
              <span>Muster-Zettel</span>
            </button>

            {totalCount > 0 && (
              <button
                onClick={handleClearBoard}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
                title="Alle Zettel vom Board entfernen"
              >
                <MaterialIcon name="delete_sweep" className="text-sm" />
                <span>Leeren</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Dual Columns Comparison Board */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* =========================================
              COLUMN 1: VIBE CODING
             ========================================= */}
          {(filterMode === 'all' || filterMode === 'vibe' || filterMode === 'positive' || filterMode === 'negative') && (
            <div className="bg-amber-50/40 rounded-3xl p-6 sm:p-7 border-2 border-amber-200/90 shadow-sm flex flex-col gap-6">
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <MaterialIcon name="bolt" className="text-2xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-lg text-zinc-900">
                        Phase 1: Vibe Coding
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-600">
                      Schnell zur ersten UI – doch im Detail verloren
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className="px-2 py-0.5 rounded-full bg-lime-100 text-lime-900 border border-lime-300">
                    +{vibePositives.length}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                    -{vibeNegatives.length}
                  </span>
                </div>
              </div>

              {/* Sub-Section 1: Was lief gut? */}
              {(filterMode === 'all' || filterMode === 'vibe' || filterMode === 'positive') && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-lime-500" />
                    <span className="text-xs font-extrabold text-lime-950 uppercase tracking-wider">
                      Was lief gut? (Motivation & Schnellstart)
                    </span>
                  </div>

                  {vibePositives.length === 0 ? (
                    <p className="text-xs text-zinc-400 italic bg-white/60 p-4 rounded-2xl border border-dashed border-zinc-200 text-center">
                      Keine positiven Zettel vorhanden.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {vibePositives.map((postIt) => (
                        <div
                          key={postIt.id}
                          className={`relative p-4 rounded-2xl bg-lime-50 border border-lime-300/90 text-lime-950 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${postIt.rotation}`}
                        >
                          {/* Pin detail */}
                          <div className="w-8 h-2 bg-white/80 rounded-xs mx-auto mb-2 shadow-2xs border border-lime-200" />
                          <p className="text-xs font-medium leading-relaxed mb-4">
                            "{postIt.text}"
                          </p>
                          <div className="flex items-center justify-between pt-1 border-t border-lime-200/60 text-[10px] text-lime-800">
                            <span className="font-bold flex items-center gap-1">
                              <MaterialIcon name="thumb_up" className="text-xs" />
                              Positiv
                            </span>
                            <button
                              onClick={() => handleDeletePostIt('vibe', postIt.id)}
                              className="text-zinc-400 hover:text-rose-600 transition-colors"
                              title="Löschen"
                            >
                              <MaterialIcon name="delete" className="text-xs" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sub-Section 2: Schmerzpunkte & Grenzen */}
              {(filterMode === 'all' || filterMode === 'vibe' || filterMode === 'negative') && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="text-xs font-extrabold text-rose-950 uppercase tracking-wider">
                      Schmerzpunkte & Grenzen (Kontrollverlust)
                    </span>
                  </div>

                  {vibeNegatives.length === 0 ? (
                    <p className="text-xs text-zinc-400 italic bg-white/60 p-4 rounded-2xl border border-dashed border-zinc-200 text-center">
                      Keine Schmerzpunkt-Zettel vorhanden.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {vibeNegatives.map((postIt) => (
                        <div
                          key={postIt.id}
                          className={`relative p-4 rounded-2xl bg-rose-50 border border-rose-300/90 text-rose-950 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${postIt.rotation}`}
                        >
                          {/* Pin detail */}
                          <div className="w-8 h-2 bg-white/80 rounded-xs mx-auto mb-2 shadow-2xs border border-rose-200" />
                          <p className="text-xs font-medium leading-relaxed mb-4">
                            "{postIt.text}"
                          </p>
                          <div className="flex items-center justify-between pt-1 border-t border-rose-200/60 text-[10px] text-rose-800">
                            <span className="font-bold flex items-center gap-1">
                              <MaterialIcon name="warning" className="text-xs" />
                              Pain Point
                            </span>
                            <button
                              onClick={() => handleDeletePostIt('vibe', postIt.id)}
                              className="text-zinc-400 hover:text-rose-600 transition-colors"
                              title="Löschen"
                            >
                              <MaterialIcon name="delete" className="text-xs" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =========================================
              COLUMN 2: SPEC-DRIVEN DEVELOPMENT (OPENSPEC)
             ========================================= */}
          {(filterMode === 'all' || filterMode === 'spec' || filterMode === 'positive' || filterMode === 'negative') && (
            <div className="bg-emerald-50/40 rounded-3xl p-6 sm:p-7 border-2 border-emerald-200/90 shadow-sm flex flex-col gap-6">
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <MaterialIcon name="architecture" className="text-2xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-lg text-zinc-900">
                        Phase 2: Spec-Driven
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-600">
                      Spezifikation vor Code – 100% Kontrolle über die KI
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className="px-2 py-0.5 rounded-full bg-lime-100 text-lime-900 border border-lime-300">
                    +{specPositives.length}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                    -{specNegatives.length}
                  </span>
                </div>
              </div>

              {/* Sub-Section 1: Was lief gut? */}
              {(filterMode === 'all' || filterMode === 'spec' || filterMode === 'positive') && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-lime-500" />
                    <span className="text-xs font-extrabold text-lime-950 uppercase tracking-wider">
                      Was lief gut? (Präzision & Durchstich)
                    </span>
                  </div>

                  {specPositives.length === 0 ? (
                    <p className="text-xs text-zinc-400 italic bg-white/60 p-4 rounded-2xl border border-dashed border-zinc-200 text-center">
                      Keine positiven Zettel vorhanden.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {specPositives.map((postIt) => (
                        <div
                          key={postIt.id}
                          className={`relative p-4 rounded-2xl bg-lime-50 border border-lime-300/90 text-lime-950 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${postIt.rotation}`}
                        >
                          {/* Pin detail */}
                          <div className="w-8 h-2 bg-white/80 rounded-xs mx-auto mb-2 shadow-2xs border border-lime-200" />
                          <p className="text-xs font-medium leading-relaxed mb-4">
                            "{postIt.text}"
                          </p>
                          <div className="flex items-center justify-between pt-1 border-t border-lime-200/60 text-[10px] text-lime-800">
                            <span className="font-bold flex items-center gap-1">
                              <MaterialIcon name="verified" className="text-xs text-emerald-600" />
                              Verifiziert
                            </span>
                            <button
                              onClick={() => handleDeletePostIt('spec', postIt.id)}
                              className="text-zinc-400 hover:text-rose-600 transition-colors"
                              title="Löschen"
                            >
                              <MaterialIcon name="delete" className="text-xs" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sub-Section 2: Herausforderungen & Learnings */}
              {(filterMode === 'all' || filterMode === 'spec' || filterMode === 'negative') && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="text-xs font-extrabold text-rose-950 uppercase tracking-wider">
                      Herausforderungen & Disziplin (Geduld)
                    </span>
                  </div>

                  {specNegatives.length === 0 ? (
                    <p className="text-xs text-zinc-400 italic bg-white/60 p-4 rounded-2xl border border-dashed border-zinc-200 text-center">
                      Keine Herausforderungs-Zettel vorhanden.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {specNegatives.map((postIt) => (
                        <div
                          key={postIt.id}
                          className={`relative p-4 rounded-2xl bg-rose-50 border border-rose-300/90 text-rose-950 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${postIt.rotation}`}
                        >
                          {/* Pin detail */}
                          <div className="w-8 h-2 bg-white/80 rounded-xs mx-auto mb-2 shadow-2xs border border-rose-200" />
                          <p className="text-xs font-medium leading-relaxed mb-4">
                            "{postIt.text}"
                          </p>
                          <div className="flex items-center justify-between pt-1 border-t border-rose-200/60 text-[10px] text-rose-800">
                            <span className="font-bold flex items-center gap-1">
                              <MaterialIcon name="psychology" className="text-xs" />
                              Disziplin
                            </span>
                            <button
                              onClick={() => handleDeletePostIt('spec', postIt.id)}
                              className="text-zinc-400 hover:text-rose-600 transition-colors"
                              title="Löschen"
                            >
                              <MaterialIcon name="delete" className="text-xs" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

      </main>

      {/* Bottom Sticky Action Bar: Weißer Button links, Schwarzer Button rechts */}
      <footer className="py-4 px-6 border-t border-zinc-200/90 bg-white/95 backdrop-blur-md sticky bottom-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-700 shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MaterialIcon name="arrow_back" className="text-sm" />
            <span>Zurück zu Retro 2</span>
          </button>

          <button
            onClick={onRestart}
            className="px-8 py-3.5 bg-zinc-900 hover:bg-black text-white font-bold text-sm rounded-full shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 ring-4 ring-zinc-900/10"
          >
            <MaterialIcon name="restart_alt" className="text-base" />
            <span>Workshop von vorn starten</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
