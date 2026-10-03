import React, { useState, useEffect, useRef } from 'react';
import { MaterialIcon } from './MaterialIcon';

interface RetroPostItsPageProps {
  phase?: 'vibe' | 'spec';
  onBack: () => void;
  onNext: () => void;
}

export type PostItType = 'positive' | 'negative';

export interface PostIt {
  id: string;
  text: string;
  type: PostItType;
  rotation: string;
}

export interface PresetPostIt {
  id: string;
  text: string;
  type: PostItType;
  label: string;
}

export const PRESET_POST_ITS_VIBE: PresetPostIt[] = [
  // Positiv (Grün)
  {
    id: 'vibe-pos-1',
    label: 'Positiv',
    type: 'positive',
    text: 'Erste UI stand nach 3 Minuten! Sehr motivierender Schnellstart.',
  },
  {
    id: 'vibe-pos-2',
    label: 'Positiv',
    type: 'positive',
    text: 'Design und Styling sahen sofort modern und ansprechend aus.',
  },
  {
    id: 'vibe-pos-3',
    label: 'Positiv',
    type: 'positive',
    text: 'Sofortiges Ausprobieren im Browser half enorm beim Ideenfinden.',
  },

  // Negativ (Rot)
  {
    id: 'vibe-neg-1',
    label: 'Negativ',
    type: 'negative',
    text: 'Beim Schuldenschnitt hat die KI Zirkelschulden erfunden.',
  },
  {
    id: 'vibe-neg-2',
    label: 'Negativ',
    type: 'negative',
    text: 'Niemand in der Gruppe wusste mehr, wie die Logik unter der Haube funktioniert.',
  },
  {
    id: 'vibe-neg-3',
    label: 'Negativ',
    type: 'negative',
    text: 'Bei 0 Personen oder negativen Zahlen ist die Anwendung sofort gecrasht.',
  },
  {
    id: 'vibe-neg-4',
    label: 'Negativ',
    type: 'negative',
    text: 'KI hat im zweiten Prompt zuvor funktionierenden Code wieder überschrieben.',
  },
  {
    id: 'vibe-neg-5',
    label: 'Negativ',
    type: 'negative',
    text: 'Cent-Rundungsfehler: Summe der Anteile ging rechnerisch nicht auf.',
  },
];

export const PRESET_POST_ITS_SPEC: PresetPostIt[] = [
  // Positiv (Grün)
  {
    id: 'spec-pos-1',
    label: 'Positiv',
    type: 'positive',
    text: 'Algorithmus hat beim ersten Apply direkt alle Cent-Rundungen gelöst!',
  },
  {
    id: 'spec-pos-2',
    label: 'Positiv',
    type: 'positive',
    text: 'Keine Zirkelschulden oder Halluzinationen dank festem Datenmodell in design.md.',
  },
  {
    id: 'spec-pos-3',
    label: 'Positiv',
    type: 'positive',
    text: 'Alle im Team wussten genau, was die KI bauen sollte – 100% Kontrolle.',
  },
  {
    id: 'spec-pos-4',
    label: 'Positiv',
    type: 'positive',
    text: 'Die Checkliste in tasks.md machte den Fortschritt der KI glasklar nachvollziehbar.',
  },
  {
    id: 'spec-pos-5',
    label: 'Positiv',
    type: 'positive',
    text: 'Edge Cases (z. B. 0 Personen, leere Beträge) waren von vornherein abgefangen.',
  },

  // Negativ (Rot)
  {
    id: 'spec-neg-1',
    label: 'Negativ',
    type: 'negative',
    text: 'Spec vorab formulieren brauchte anfangs Disziplin und fühlte sich langsamer an.',
  },
  {
    id: 'spec-neg-2',
    label: 'Negativ',
    type: 'negative',
    text: 'Grenzfälle präzise in Markdown zu beschreiben erforderte viel Nachdenken.',
  },
  {
    id: 'spec-neg-3',
    label: 'Negativ',
    type: 'negative',
    text: 'Wenn die Spec Lücken hatte, hat die KI die Annahmen eigenwillig interpretiert.',
  },
  {
    id: 'spec-neg-4',
    label: 'Negativ',
    type: 'negative',
    text: 'Große Versuchung, doch wieder schnell unstrukturiert im Chat herumzuprobieren.',
  },
];

export const RetroPostItsPage: React.FC<RetroPostItsPageProps> = ({
  phase = 'vibe',
  onBack,
  onNext,
}) => {
  const isVibe = phase === 'vibe';
  const presets = isVibe ? PRESET_POST_ITS_VIBE : PRESET_POST_ITS_SPEC;
  const storageKey = isVibe ? 'openspec_postits_vibe' : 'openspec_postits_spec';

  // Timer: 6 minutes (360 seconds) according to workshop agenda
  const INITIAL_SECONDS = 6 * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Active Post-Its on the board (persisted in localStorage, starts empty for live Zuruf if not saved)
  const [postIts, setPostIts] = useState<PostIt[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  // Persist post-its to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(postIts));
    } catch (e) {}
  }, [postIts, storageKey]);

  // Synchronize across tabs or when updated in another view
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setPostIts(parsed);
          }
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storageKey]);

  // Input state: only 'positive' (green) or 'negative' (red)
  const [inputText, setInputText] = useState<string>('');
  const [selectedType, setSelectedType] = useState<PostItType>('positive');

  // Preset Post-Its state (verdeckt / face-down)
  const [showPresetsDrawer, setShowPresetsDrawer] = useState<boolean>(false);
  const [revealedPresetIds, setRevealedPresetIds] = useState<Set<string>>(new Set());
  const [addedPresetIds, setAddedPresetIds] = useState<Set<string>>(new Set());

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, secondsRemaining]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getRandomRotation = () => {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
    return rotations[Math.floor(Math.random() * rotations.length)];
  };

  const handleAddPostIt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newPostIt: PostIt = {
      id: `p-${Date.now()}`,
      text: inputText.trim(),
      type: selectedType,
      rotation: getRandomRotation(),
    };

    setPostIts((prev) => [newPostIt, ...prev]);
    setInputText('');
  };

  const handleDeletePostIt = (id: string) => {
    setPostIts((prev) => prev.filter((p) => p.id !== id));
  };

  // Toggle reveal for a preset face-down card
  const handleToggleRevealPreset = (id: string) => {
    setRevealedPresetIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Attach a preset post-it to the main board
  const handleAttachPreset = (preset: PresetPostIt) => {
    if (addedPresetIds.has(preset.id) || postIts.some((p) => p.text.trim() === preset.text.trim())) return;

    const newPostIt: PostIt = {
      id: `p-${Date.now()}`,
      text: preset.text,
      type: preset.type,
      rotation: getRandomRotation(),
    };

    setPostIts((prev) => [newPostIt, ...prev]);
    setAddedPresetIds((prev) => new Set(prev).add(preset.id));
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between overflow-x-hidden bg-dot-pattern">
      {/* Centered Header (like spec-driven-concept) */}
      <header className="relative z-20 pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-50 border border-zinc-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-700 shadow-2xs mb-3">
          <span
            className={`w-2 h-2 rounded-full ${
              isVibe ? 'bg-amber-500' : 'bg-emerald-500'
            } animate-pulse`}
          />
          <span>
            {isVibe
              ? 'Retro 1 • Vibe Coding Blitzlicht'
              : 'Retro 2 • OpenSpec Erkenntnisse'}
          </span>
          <span className="text-zinc-300">•</span>
          <span>6 Minuten Zeitfenster</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-2">
          {isVibe
            ? 'Showcase & Retro 1: Vibe Coding'
            : 'Showcase & Retro 2: OpenSpec'}
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-6">
          {isVibe
            ? 'Zurufe aus den Gruppen sammeln: Was hat sofort geklappt – und wo gab es böse Überraschungen?'
            : 'Wie hat sich die Entwicklung mit Spezifikation angefühlt? Welche Schmerzpunkte wurden gelöst?'}
        </p>

        {/* Centered 6-Min Countdown Timer under Heading */}
        <div className="flex items-center justify-center gap-3 bg-zinc-50 border border-zinc-200/90 px-5 py-2.5 rounded-2xl shadow-xs max-w-xs mx-auto">
          <span className="font-mono font-extrabold text-3xl sm:text-4xl text-zinc-900 min-w-[85px] text-center tracking-tight">
            {formatTime(secondsRemaining)}
          </span>

          <div className="flex items-center gap-1 border-l border-zinc-200 pl-3">
            <button
              onClick={() => setIsRunning((p) => !p)}
              className={`p-2 rounded-xl text-white font-bold transition-all shadow-xs flex items-center justify-center ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
              title={isRunning ? 'Pausieren' : 'Starten'}
            >
              <MaterialIcon name={isRunning ? 'pause' : 'play_arrow'} className="text-xl" />
            </button>
            <button
              onClick={() => setSecondsRemaining((p) => Math.max(0, p + 60))}
              className="p-1.5 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-200/80 transition-colors"
              title="+1 Min"
            >
              +1m
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsRemaining(INITIAL_SECONDS);
              }}
              className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-200/80 transition-colors"
              title="Reset (6 Min)"
            >
              <MaterialIcon name="restart_alt" className="text-base" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Simple Guiding Prompt Bar (Only Positiv vs Negativ) */}
        <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-zinc-200/70 flex items-center justify-center text-zinc-800 shrink-0">
              <MaterialIcon name="forum" className="text-xl" />
            </span>
            <div>
              <h2 className="text-sm font-extrabold text-zinc-900">
                {isVibe
                  ? 'Zuruf-Runde: Wie war eure Erfahrung beim Vibe-Coding?'
                  : 'Zuruf-Runde: Wie war eure Erfahrung mit Spec-Driven Development?'}
              </h2>
              <p className="text-xs text-zinc-500">
                {isVibe
                  ? 'Grün für Erfolge & Tempo • Rot für Logikfehler, Halluzinationen & Kontrollverlust'
                  : 'Grün für Korrektheit, Kontrolle & Stabilität • Rot für Aufwand, Denkdisziplin & Hürden'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Positiv (Grün)</span>
            </span>

            <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Negativ (Rot)</span>
            </span>
          </div>
        </div>

        {/* Input Bar: Type selection (Grün vs Rot) + Text Input + Button */}
        <form
          onSubmit={handleAddPostIt}
          className="bg-white rounded-2xl p-3 border border-zinc-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-3 mb-6"
        >
          {/* Positiv / Negativ Toggle */}
          <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setSelectedType('positive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedType === 'positive'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              <span>Positiv</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType('negative')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedType === 'negative'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-rose-800 hover:bg-rose-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-300" />
              <span>Negativ</span>
            </button>
          </div>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              selectedType === 'positive'
                ? isVibe
                  ? "Positiven Zuruf eingeben (z. B. 'UI stand nach 3 Minuten, super intuitiv')..."
                  : "Positiven Zuruf eingeben (z. B. 'Algorithmus hat beim ersten Apply alle Cent-Rundungen gelöst')..."
                : isVibe
                ? "Negativen Zuruf eingeben (z. B. 'KI hat Zirkelschulden erfunden, Cent-Rundung falsch')..."
                : "Kritischen Zuruf eingeben (z. B. 'Spec vorab formulieren brauchte viel Gehirnschmalz')..."
            }
            className="flex-1 bg-zinc-50 border border-zinc-200/90 rounded-xl px-4 py-2 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all w-full"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-6 py-2.5 bg-zinc-900 hover:bg-black disabled:bg-zinc-200 disabled:text-zinc-400 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
          >
            <MaterialIcon name="push_pin" className="text-sm" />
            <span>Anheften</span>
          </button>
        </form>

        {/* Post-It Board Display */}
        <div className="bg-zinc-50/70 border border-zinc-200/80 rounded-3xl p-6 min-h-[300px] mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <MaterialIcon name="sticky_note_2" className="text-base" />
              <span>Gesammeltes Feedback ({postIts.length} Notizen)</span>
            </span>

            {postIts.length > 0 && (
              <div className="flex items-center gap-3 text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <MaterialIcon name="circle" className="text-[10px] text-emerald-500" />
                  <span>{postIts.filter((p) => p.type === 'positive').length} Positiv</span>
                </span>
                <span className="text-rose-700 font-semibold flex items-center gap-1">
                  <MaterialIcon name="circle" className="text-[10px] text-rose-500" />
                  <span>{postIts.filter((p) => p.type === 'negative').length} Negativ</span>
                </span>
                <button
                  type="button"
                  onClick={() => setPostIts([])}
                  className="ml-2 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-rose-50 text-zinc-500 hover:text-rose-600 transition-colors flex items-center gap-1 text-[11px] font-semibold"
                  title="Alle Notizen von diesem Board entfernen"
                >
                  <MaterialIcon name="delete_sweep" className="text-xs" />
                  <span>Leeren</span>
                </button>
              </div>
            )}
          </div>

          {postIts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {postIts.map((p) => (
                <div
                  key={p.id}
                  className={`relative p-5 rounded-2xl border shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md hover:z-10 group ${
                    p.type === 'positive'
                      ? 'bg-emerald-100 text-emerald-950 border-emerald-300 shadow-emerald-200/50'
                      : 'bg-rose-100 text-rose-950 border-rose-300 shadow-rose-200/50'
                  } ${p.rotation}`}
                >
                  {/* Pin visual */}
                  <div
                    className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full shadow-xs border border-white ${
                      p.type === 'positive' ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  />

                  <button
                    onClick={() => handleDeletePostIt(p.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-zinc-700 transition-opacity"
                    title="Notiz entfernen"
                  >
                    <MaterialIcon name="close" className="text-sm" />
                  </button>

                  <div className="flex items-center gap-1 mb-1.5">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        p.type === 'positive'
                          ? 'bg-emerald-200/80 text-emerald-900'
                          : 'bg-rose-200/80 text-rose-900'
                      }`}
                    >
                      {p.type === 'positive' ? 'Positiv' : 'Negativ'}
                    </span>
                  </div>

                  <p className="text-xs font-semibold leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center text-2xl mb-3 shadow-inner">
                <MaterialIcon name="post_add" className="text-3xl" />
              </div>
              <h4 className="text-sm font-bold text-zinc-700 mb-1">Das Board ist noch leer</h4>
              <p className="text-xs text-zinc-500 max-w-sm">
                {isVibe
                  ? 'Sammelt Zurufe aus dem Plenum: Was lief beim Vibe-Coding gut (Grün)? Was ging schief (Rot)?'
                  : 'Sammelt Zurufe aus dem Plenum: Welche Vorteile brachte OpenSpec (Grün)? Wo lagen Hürden (Rot)?'}
              </p>
            </div>
          )}
        </div>

        {/* Verdeckte Post-Its (Unten platziert, optional für den Moderator) */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-zinc-100 text-zinc-600 flex items-center justify-center text-sm">
                <MaterialIcon name="visibility_off" className="text-base" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-zinc-800">
                  Vorgegebene Post-Its (Verdeckter Impulsvorrat)
                </h3>
                <p className="text-[11px] text-zinc-500">
                  Verdeckt gelagert • Müssen nicht genutzt werden • Bei Bedarf aufdecken & ans Board heften
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPresetsDrawer((prev) => !prev)}
              className="px-3.5 py-1.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-xs font-semibold text-zinc-700 flex items-center gap-1.5 transition-colors"
            >
              <MaterialIcon
                name={showPresetsDrawer ? 'expand_less' : 'expand_more'}
                className="text-base"
              />
              <span>{showPresetsDrawer ? 'Verbergen' : 'Verdeckte Karten anzeigen'}</span>
            </button>
          </div>

          {showPresetsDrawer && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 mt-4 pt-4 border-t border-zinc-100 animate-fade-in">
              {presets.map((preset) => {
                const isRevealed = revealedPresetIds.has(preset.id);
                const isAdded =
                  addedPresetIds.has(preset.id) ||
                  postIts.some((p) => p.text.trim() === preset.text.trim());

                return (
                  <div
                    key={preset.id}
                    className={`rounded-2xl p-4 border transition-all duration-300 relative ${
                      isRevealed
                        ? preset.type === 'positive'
                          ? 'bg-emerald-100 text-emerald-950 border-emerald-300 shadow-sm'
                          : 'bg-rose-100 text-rose-950 border-rose-300 shadow-sm'
                        : 'bg-zinc-50/80 border-dashed border-zinc-300 text-zinc-500 hover:bg-zinc-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          preset.type === 'positive'
                            ? 'bg-emerald-200 text-emerald-900'
                            : 'bg-rose-200 text-rose-900'
                        }`}
                      >
                        {preset.label}
                      </span>

                      {isAdded && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-300">
                          <MaterialIcon name="check" className="text-xs" />
                          Am Board
                        </span>
                      )}
                    </div>

                    {isRevealed ? (
                      <div>
                        <p className="text-xs font-semibold leading-relaxed mb-3">
                          {preset.text}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-black/5">
                          <button
                            onClick={() => handleToggleRevealPreset(preset.id)}
                            className="text-[11px] text-zinc-500 hover:text-zinc-800 underline"
                          >
                            Verdecken
                          </button>

                          <button
                            onClick={() => handleAttachPreset(preset)}
                            disabled={isAdded}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                              isAdded
                                ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                                : 'bg-zinc-900 text-white hover:bg-black shadow-xs'
                            }`}
                          >
                            <MaterialIcon name="add" className="text-xs" />
                            <span>{isAdded ? 'Dran' : 'Ans Board'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Face-Down (Verdeckt) State */
                      <div
                        onClick={() => handleToggleRevealPreset(preset.id)}
                        className="py-3 flex flex-col items-center justify-center cursor-pointer group text-center"
                      >
                        <MaterialIcon
                          name="lock"
                          className="text-lg text-zinc-400 group-hover:text-zinc-700 mb-1 transition-colors"
                        />
                        <span className="text-xs font-bold text-zinc-600 group-hover:text-zinc-900 transition-colors">
                          Verdeckt
                        </span>
                        <span className="text-[10px] text-zinc-400 mt-0.5">
                          (Klicken zum Aufdecken)
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
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
            <span>{isVibe ? 'Zurück zur Arbeitsphase 1' : 'Zurück zur Arbeitsphase 2'}</span>
          </button>

          <button
            onClick={onNext}
            className="px-8 py-3.5 bg-zinc-900 hover:bg-black text-white font-bold text-sm rounded-full shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 ring-4 ring-zinc-900/10"
          >
            <span>
              {isVibe
                ? 'Weiter: Was ist Spec-Driven Development?'
                : 'Weiter: Gesamtfazit & Erkenntnisvergleich'}
            </span>
            <MaterialIcon name="arrow_forward" className="text-base" />
          </button>
        </div>
      </footer>
    </div>
  );
};
