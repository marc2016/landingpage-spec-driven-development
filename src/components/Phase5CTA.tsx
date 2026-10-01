import { useState, FC } from 'react';
import { MaterialIcon } from './MaterialIcon';

interface Phase5CTAProps {
  onRestart: () => void;
}

export const Phase5CTA: FC<Phase5CTAProps> = ({ onRestart }) => {
  const [copied, setCopied] = useState(false);
  const [takeawayVotes, setTakeawayVotes] = useState<{ [key: string]: number }>({
    think: 0,
    team: 0,
    control: 0,
  });

  const command = 'npx openspec init';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addVote = (key: string) => {
    setTakeawayVotes((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-medium">
          <MaterialIcon name="auto_awesome" className="text-base text-emerald-400" />
          <span>Schritt 5: Praxiseinstieg – Dein Leitfaden für morgen</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Dein Start mit planvoller KI: <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Einfach, strukturiert und sicher
          </span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Du musst kein KI-Forscher sein, um professionelle Ergebnisse zu erzielen. Nimm diese 3 Prinzipien mit in dein nächstes Projekt:
        </p>
      </div>

      {/* Breakout Moderator Callout */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <MaterialIcon name="groups" className="text-xl" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Abschluss-Check mit der Gruppe
            </div>
            <p className="text-base font-medium text-white mt-0.5">
              „Welches dieser 3 Prinzipien ist für euren Arbeitsalltag der größte Hebel? Klickt zur Abstimmung!“
            </p>
          </div>
        </div>
      </div>

      {/* 3 Interactive Golden Rules Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => addVote('think')}
          className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-base">
              1
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-300">
              {takeawayVotes.think} Stimmen
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
            Erst denken, dann prompten
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Notiere die 3 bis 5 wichtigsten Qualitäts- und Sicherheitsregeln, bevor du eine Zeile Code generierst.
          </p>
          <div className="text-xs text-emerald-400/80 pt-2 font-medium">
            + Klick zum Abstimmen
          </div>
        </div>

        <div
          onClick={() => addVote('team')}
          className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-base">
              2
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-300">
              {takeawayVotes.team} Stimmen
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
            Im Team kurz abstimmen
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Lass einen Kollegen oder Fachexperten den einfachen Plan querlesen. Missverständnisse werden sofort erkannt.
          </p>
          <div className="text-xs text-emerald-400/80 pt-2 font-medium">
            + Klick zum Abstimmen
          </div>
        </div>

        <div
          onClick={() => addVote('control')}
          className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-base">
              3
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-300">
              {takeawayVotes.control} Stimmen
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
            Die KI kontrolliert bauen lassen
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Die KI baut exakt nach deinem Plan – ohne Halluzinationen und mit vollständiger Transparenz für alle.
          </p>
          <div className="text-xs text-emerald-400/80 pt-2 font-medium">
            + Klick zum Abstimmen
          </div>
        </div>
      </div>

      {/* Terminal Action Box */}
      <div className="max-w-2xl mx-auto bg-zinc-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
          <span className="text-zinc-300 font-semibold">Projekt-Initialisierung</span>
          <span className="text-emerald-400 font-medium">sofort startklar</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-zinc-300">
            Führe diesen Befehl in deinem Projektverzeichnis aus, um die Spezifikationsvorlagen einzurichten:
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-3 font-mono text-base sm:text-lg text-emerald-300">
              <span className="text-zinc-600 select-none">$</span>
              <span className="font-bold">{command}</span>
            </div>

            <button
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95"
            >
              {copied ? (
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

        <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
          <MaterialIcon name="check_circle" className="text-base text-emerald-400 shrink-0" />
          <span>Funktioniert mit allen gängigen KI-Werkzeugen (Claude, Cursor, Copilot, ChatGPT).</span>
        </div>
      </div>

      {/* Restart Presentation Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-800 text-sm font-medium transition-all"
        >
          <MaterialIcon name="replay" className="text-base text-zinc-400" />
          <span>Präsentation von vorne beginnen</span>
        </button>
      </div>
    </section>
  );
};
