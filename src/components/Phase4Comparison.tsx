import { useState, FC } from 'react';
import { Dices, FileCheck, Users2, UserX, BarChart3, TrendingDown, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface Phase4ComparisonProps {
  onNextPhase: () => void;
}

export const Phase4Comparison: FC<Phase4ComparisonProps> = ({ onNextPhase }) => {
  const [activeDimension, setActiveDimension] = useState<number>(0);

  const comparisons = [
    {
      title: 'Rechtssicherheit & BITV 2.0',
      subtitle: 'Gesetzliche Haftungsfalle vs. Auditierbarer Vertrag',
      iconVibe: Dices,
      iconSpec: FileCheck,
      vibeHeadline: 'Vibe Coding: BGG- und DSGVO-Haftungsrisiko',
      vibeDescription:
        'Die KI erzeugt Formulare ohne Screenreader-Attribute (aria-describedby) und speichert ungefilterte GPS-Daten aus Nachweisen. Behörden riskieren Verbandsklagen nach BGG § 12d und DSGVO-Rügen durch Landesdatenschutzbeauftragte.',
      vibeBadge: 'Haftungsfalle',
      specHeadline: 'OpenSpec: Deterministische Compliance-Verträge',
      specDescription:
        'Barrierefreiheit nach BITV 2.0 und DSGVO-Prüfungen sind als bindende RFC-2119 Verträge (MUST / MUST NOT) fixiert. Automatisierte Test-Suiten verifizieren die Einhaltung vor jedem Release.',
      specBadge: '100% BITV-Auditierbar',
    },
    {
      title: 'Fachverfahren-Kompatibilität',
      subtitle: 'Dateninsel vs. FIM & XÖV Standards',
      iconVibe: UserX,
      iconSpec: Users2,
      vibeHeadline: 'Vibe Coding: Datenmüll für die Sachbearbeitung',
      vibeDescription:
        'Die KI generiert wilde JSON-Strukturen ohne Berücksichtigung des FIM-Datenfeldkatalogs (D110). Das kommunale Fachverfahren kann die Anträge nicht verarbeiten – Sachbearbeiter müssen Daten manuell abtippen.',
      vibeBadge: 'Medienbruch',
      specHeadline: 'OpenSpec: FIM- & XFall-Schemas im Git-Repo',
      specDescription:
        'Das Entwickler- und Fachteam definiert die Schnittstellen zuerst in proposal.md und delta-spec.md. Der Agent transformiert die Daten exakt in XÖV-konforme XML-Pakete für das Fachverfahren.',
      specBadge: 'FIM / XÖV Konform',
    },
    {
      title: 'Gesetzesänderungen & OZG-Skalierung',
      subtitle: 'Context-Rot vs. Isolierte Deltas',
      iconVibe: TrendingDown,
      iconSpec: BarChart3,
      vibeHeadline: 'Vibe Coding: Bricht bei Gesetzesnovellen ein',
      vibeDescription:
        'Wird das Wohngeld-Plus-Gesetz novelliert, verliert die KI bei 2.000 Zeilen Formularlogik den Überblick. Wichtige Plausibilitätsprüfungen werden stillschweigend gelöscht oder überschrieben.',
      vibeBadge: 'Fragil bei Novellen',
      specHeadline: 'OpenSpec: Modulare Delta-Spezifikationen',
      specDescription:
        'Gesetzesänderungen werden als isolierte Deltas (ADDED, MODIFIED) formuliert und nach erfolgreicher Umsetzung ins permanente Spec-Archiv überführt (/opsx:archive). Unbegrenzt erweiterbar.',
      specBadge: 'Zukunftssicher OZG',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
          <Zap className="w-3.5 h-3.5" />
          <span>Phase 4 (00:15 – 00:18): Der direkte Vergleich</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Warum OpenSpec <br />
          <span className="bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
            Vibe Coding im E-Government deklassiert
          </span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-400">
          Die drei entscheidenden Dimensionen für nachhaltige, rechtssichere Softwareentwicklung im öffentlichen Sektor.
        </p>
      </div>

      {/* Dimension Selector Pills */}
      <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
        {comparisons.map((c, i) => (
          <button
            key={i}
            onClick={() => setActiveDimension(i)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeDimension === i
                ? 'bg-zinc-800 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
            }`}
          >
            {i + 1}. {c.title}
          </button>
        ))}
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Vibe Coding Side (The Flaw) */}
        <div className="rounded-2xl p-6 glow-danger border border-red-900/50 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Dices className="w-4 h-4" /> Vibe Coding in der Verwaltung
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[11px] font-mono border border-red-500/30">
                {comparisons[activeDimension].vibeBadge}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              {comparisons[activeDimension].vibeHeadline}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {comparisons[activeDimension].vibeDescription}
            </p>
          </div>

          <div className="pt-4 border-t border-red-900/30 text-xs text-red-400/90 font-mono flex items-center gap-2">
            <span>Fazit: In behördlichen IT-Projekten ein unkalkulierbares Haftungsrisiko.</span>
          </div>
        </div>

        {/* OpenSpec Side (The Winner) */}
        <div className="rounded-2xl p-6 glow-success border border-emerald-900/50 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> OpenSpec (Spec Driven Development)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono border border-emerald-500/30">
                {comparisons[activeDimension].specBadge}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              {comparisons[activeDimension].specHeadline}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {comparisons[activeDimension].specDescription}
            </p>
          </div>

          <div className="pt-4 border-t border-emerald-900/30 text-xs text-emerald-300 font-mono flex items-center gap-2">
            <span>Fazit: Rechtssicher, barrierefrei nach BITV 2.0 und kompatibel zu Fachverfahren.</span>
          </div>
        </div>
      </div>

      {/* 3 Pillars Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-1">
          <div className="text-xs font-mono text-cyan-400 font-bold">1. Rechtssicherheit</div>
          <div className="text-xs text-zinc-300">BITV 2.0 & DSGVO vor der ersten Zeile Code</div>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-1">
          <div className="text-xs font-mono text-cyan-400 font-bold">2. FIM & XÖV Treue</div>
          <div className="text-xs text-zinc-300">Strukturierte Schnittstellen ohne Medienbrüche</div>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-1">
          <div className="text-xs font-mono text-cyan-400 font-bold">3. Gesetzesnovellen</div>
          <div className="text-xs text-zinc-300">Modulare Delta-Spezifikationen nach OZG 2.0</div>
        </div>
      </div>

      {/* CTA to Phase 5 */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNextPhase}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all"
        >
          <span>Zum Call to Action (Phase 5)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
