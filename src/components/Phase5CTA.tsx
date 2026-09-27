import { useState, FC } from 'react';
import { Copy, Check, Sparkles, RotateCcw, Landmark } from 'lucide-react';

interface Phase5CTAProps {
  onRestart: () => void;
}

export const Phase5CTA: FC<Phase5CTAProps> = ({ onRestart }) => {
  const [copied, setCopied] = useState(false);
  const command = 'npx openspec init';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: '01',
      title: '/opsx:propose',
      desc: 'Formuliere OZG-Scope, BITV 2.0 Vorgaben und RFC-2119 Constraints vor jeder Zeile Code.',
    },
    {
      num: '02',
      title: 'Behörden-PR Review',
      desc: 'Datenschutz-, Barrierefreiheits- und Fachteams prüfen die Spezifikation vorab im Git-Repository.',
    },
    {
      num: '03',
      title: '/opsx:apply',
      desc: 'Der KI-Agent setzt die FIM-Datenfelder und Validierungslogik exakt nach Vertrag um – ohne Halluzinationen.',
    },
    {
      num: '04',
      title: '/opsx:archive',
      desc: 'Die Delta-Spezifikation wird versioniert in das dauerhafte OZG-Verfahrensarchiv überführt.',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Phase 5 (00:18 – 00:20): Der Ausblick für den Behördenalltag</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Kein Foliengrab zum Abschluss. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Morgen im ersten Verwaltungs-Repo ausführen:
          </span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-400">
          Ob Bundesbehörde, Landes-IT-Dienstleister oder kommunales Rechenzentrum: Nimm OpenSpec direkt mit in dein nächstes OZG-Projekt.
        </p>
      </div>

      {/* Big Action Terminal Box */}
      <div className="max-w-2xl mx-auto bg-zinc-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-zinc-300">gov-quickstart-terminal</span>
          </div>
          <span className="text-emerald-400 font-medium">FIM / OZG ready</span>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-3 font-mono text-base sm:text-lg text-emerald-300">
            <span className="text-zinc-600 select-none">$</span>
            <span className="font-bold tracking-wide">{command}</span>
          </div>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Kopiert!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Befehl kopieren</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Kompatibel mit allen führenden KI-Agenten & IDEs</span>
          <span className="text-zinc-400">Node &gt;= 18 • BSI & OZG konform</span>
        </div>
      </div>

      {/* 4-Step Framework Walkthrough */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s) => (
          <div
            key={s.num}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all space-y-2 relative overflow-hidden"
          >
            <div className="text-2xl font-extrabold text-zinc-700 font-mono">{s.num}</div>
            <h4 className="text-sm font-bold text-white font-mono">{s.title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Containerized Docker & Gov IT Notice */}
      <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-zinc-200">Autark im Behördennetzwerk betreibbar</div>
            <div className="text-xs text-zinc-400 font-mono mt-0.5">
              Docker-Compose (Port 8080) • Optional: Lokales Offline-LLM mit Ollama (kein Datenabfluss)
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Session neu starten</span>
        </button>
      </div>
    </section>
  );
};
