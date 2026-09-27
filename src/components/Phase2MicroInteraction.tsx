import { useState, FC, FormEvent } from 'react';
import { Users, Plus, ArrowRight, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import { INITIAL_EDGE_CASES, EdgeCaseItem } from '../data/mockData';

interface Phase2MicroInteractionProps {
  onNextPhase: () => void;
}

export const Phase2MicroInteraction: FC<Phase2MicroInteractionProps> = ({ onNextPhase }) => {
  const [edgeCases, setEdgeCases] = useState<EdgeCaseItem[]>(INITIAL_EDGE_CASES);
  const [customInput, setCustomInput] = useState('');
  const [copiedContract, setCopiedContract] = useState(false);

  const addCustomEdgeCase = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!customInput.trim()) return;

    const newItem: EdgeCaseItem = {
      id: `custom-${Date.now()}`,
      title: customInput.trim(),
      category: 'Plenum Vorschlag',
      rfcRule: `The form submission pipeline MUST satisfy administrative rule: "${customInput.trim()}" before committing to the municipal record.`,
      addedByAudience: true,
    };

    setEdgeCases((prev) => [...prev, newItem]);
    setCustomInput('');
  };

  const removeEdgeCase = (id: string) => {
    setEdgeCases((prev) => prev.filter((item) => item.id !== id));
  };

  const copyContract = () => {
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
          <Users className="w-3.5 h-3.5" />
          <span>Phase 2 (00:04 – 00:08): Die Mikro-Interaktion & Das Gegenmittel</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Das Plenum redet mit: <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            „Was vergisst die KI bei behördlichen Anträgen zu 100%?“
          </span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-400">
          Statt unkontrolliertem Vibe Coding binden wir Verwaltungs- und IT-Expertise direkt ein – und transformieren sie in einen maschinenlesbaren <strong>Behavior Contract</strong> nach OZG- und BITV-Vorgaben.
        </p>
      </div>

      {/* Main Grid: User Story & Live Plenum Input vs Real-time Contract */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Raw Story & Edge Case Collection */}
        <div className="lg:col-span-6 space-y-6">
          {/* Raw User Story Card */}
          <div className="glow-card rounded-2xl p-5 border border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
              <span className="font-mono uppercase font-semibold text-zinc-500">Ausgangspunkt: Bürger-Story</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono">Unzureichend spezifiziert</span>
            </div>
            <blockquote className="border-l-2 border-cyan-500 pl-4 py-1 text-base font-medium text-zinc-200 italic">
              „Als Bürgerin möchte ich den Wohngeldantrag online einreichen und Nachweise hochladen, um den Anspruch ohne Behördengang geltend zu machen.“
            </blockquote>
            <p className="text-xs text-zinc-500 mt-3">
              Die typische Falle: Klingt nach einem simplen Formular, verlangt in der Verwaltungspraxis jedoch BITV 2.0 Barrierefreiheit, BSI TR-03107 Konformität und FIM-Schemasicherheit.
            </p>
          </div>

          {/* Interactive Input for 15 Persons in the Room */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Live-Plenum: Behördliche Randbedingungen sammeln
              </h3>
              <span className="text-xs text-zinc-400 font-mono">{edgeCases.length} Vorgaben</span>
            </div>

            {/* Quick add custom edge case form */}
            <form onSubmit={addCustomEdgeCase} className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Zuruf aus dem Raum (z.B. Elster-Zertifikat, Mindestalter)..."
                className="flex-1 bg-zinc-950 border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 outline-none font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Hinzufügen</span>
              </button>
            </form>

            {/* List of active edge cases */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
                Fixierte Compliance- & Gesetzesvorgaben:
              </div>
              <div className="flex flex-wrap gap-2">
                {edgeCases.map((ec) => (
                  <div
                    key={ec.id}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      ec.addedByAudience
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-zinc-800/80 border-zinc-700 text-zinc-200'
                    }`}
                  >
                    <span>{ec.title}</span>
                    <button
                      onClick={() => removeEdgeCase(ec.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                      title="Entfernen"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Behavior Contract (Markdown RFC-2119) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-zinc-900 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-zinc-200">
                  ozg-wohngeld.spec.md
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  RFC-2119 • OZG
                </span>
              </div>
              <button
                onClick={copyContract}
                className="text-xs text-zinc-400 hover:text-cyan-300 transition-colors font-mono"
              >
                {copiedContract ? '✓ Kopiert' : 'Kopieren'}
              </button>
            </div>

            {/* Markdown Contract Preview */}
            <div className="mt-4 bg-zinc-950/90 rounded-xl p-4 font-mono text-xs text-zinc-300 space-y-3 leading-relaxed border border-zinc-800 max-h-[360px] overflow-y-auto">
              <div className="text-zinc-500">
                # Specification: OZG Wohngeldantrag (Reifegrad 4)
                <br />
                ## Gesetzliche & Technische Verträge (BITV 2.0 / BundID / FIM)
              </div>

              {edgeCases.map((ec, idx) => (
                <div key={ec.id} className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-[11px] text-zinc-500">
                    ### REQ-OZG-{String(idx + 101).padStart(3, '0')}: {ec.title}
                  </div>
                  <div className="mt-1 text-zinc-200">
                    {ec.rfcRule.split(/(MUST NOT|MUST|SHOULD)/g).map((chunk, i) => {
                      if (chunk === 'MUST') {
                        return (
                          <span key={i} className="text-cyan-400 font-bold bg-cyan-500/10 px-1 rounded">
                            MUST
                          </span>
                        );
                      }
                      if (chunk === 'MUST NOT') {
                        return (
                          <span key={i} className="text-red-400 font-bold bg-red-500/10 px-1 rounded">
                            MUST NOT
                          </span>
                        );
                      }
                      if (chunk === 'SHOULD') {
                        return (
                          <span key={i} className="text-amber-400 font-bold bg-amber-500/10 px-1 rounded">
                            SHOULD
                          </span>
                        );
                      }
                      return <span key={i}>{chunk}</span>;
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rechtssicher, barrierefrei & git-reviewbar</span>
              </div>
              <button
                onClick={onNextPhase}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all"
              >
                <span>Workflow starten: /opsx:propose</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
