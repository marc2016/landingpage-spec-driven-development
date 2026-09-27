import { useState, FC } from 'react';
import { Terminal, CheckSquare, FileCode, ChevronDown, ChevronUp, Play, ArrowRight, Sparkles, Layers, FileText } from 'lucide-react';
import { PROPOSAL_MD, DESIGN_MD, DELTA_SPEC_MD, TASKS_MD, CODE_DIFF } from '../data/mockData';

interface Phase3WorkflowProps {
  onNextPhase: () => void;
}

export const Phase3Workflow: FC<Phase3WorkflowProps> = ({ onNextPhase }) => {
  const [activeTab, setActiveTab] = useState<'proposal' | 'design' | 'specs' | 'tasks'>('specs');
  const [tasks, setTasks] = useState(TASKS_MD);
  const [isApplying, setIsApplying] = useState(false);
  const [diffOpen, setDiffOpen] = useState(true);
  const [cliLog, setCliLog] = useState<string[]>([
    '$ npx openspec propose "OZG Wohngeldantrag & Haushaltsberechnung"',
    '✓ Generated proposal.md (Scope, OZG-Reifegrad 4 & Wohngeld-Plus)',
    '✓ Generated design.md (BITV 2.0, BundID eID & FIM Schema)',
    '✓ Generated specs/ozg/antrag-wohngeld.delta.md',
    '✓ Generated tasks.md (4 atomare Schritte nach FITKO-Standards)',
    'Ready for administrative review or automated execution.',
  ]);

  const handleApply = () => {
    setIsApplying(true);
    setActiveTab('tasks');

    // Reset tasks
    setTasks((prev) => prev.map((t) => ({ ...t, completed: false })));

    let step = 0;
    const interval = setInterval(() => {
      if (step < tasks.length) {
        const currentTask = tasks[step];
        setTasks((prev) =>
          prev.map((t, idx) => (idx === step ? { ...t, completed: true } : t))
        );
        setCliLog((prev) => [
          ...prev,
          `[APPLY] Executing task ${step + 1}/${tasks.length}: ${currentTask.title} -> VERIFIED`,
        ]);
        step++;
      } else {
        clearInterval(interval);
        setIsApplying(false);
        setDiffOpen(true);
        setCliLog((prev) => [
          ...prev,
          '✓ /opsx:apply abgeschlossen! Alle BITV 2.0- und OZG-Verträge durch Test-Suite bestätigt.',
        ]);
      }
    }, 700);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
          <Layers className="w-3.5 h-3.5" />
          <span>Phase 3 (00:08 – 00:15): Der OpenSpec-Workflow in Aktion</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Proposal → Apply → Archive: <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Deterministische OZG-Delta-Spezifikationen
          </span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-400">
          Die shadcn/ui-Tabs zeigen die Entstehung der behördlichen Spezifikations-Artefakte. Anschließend beweist <code className="text-cyan-300 font-mono bg-zinc-800/80 px-1.5 py-0.5 rounded">/opsx:apply</code> die fehlerfreie Umsetzung.
        </p>
      </div>

      {/* Workflow Controls Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-cyan-400 flex items-center gap-2">
            <span className="text-zinc-500">$</span>
            <span>/opsx:propose</span>
            <span className="text-zinc-500">→</span>
            <span>/opsx:apply</span>
          </div>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            Status: <span className="text-emerald-400 font-medium">OZG-Vertrag freigegeben</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApply}
            disabled={isApplying}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isApplying ? (
              <>
                <span className="w-3 h-3 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                <span>/opsx:apply läuft...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>/opsx:apply (Beweis ausführen)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Artifacts Tabs Viewer */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Tab Headers */}
        <div className="flex items-center border-b border-zinc-800 bg-zinc-950/60 px-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('proposal')}
            className={`px-4 py-3 text-xs font-mono font-medium flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'proposal'
                ? 'border-cyan-400 text-cyan-400 bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>proposal.md</span>
            <span className="text-[10px] text-zinc-500">OZG-Scope</span>
          </button>

          <button
            onClick={() => setActiveTab('design')}
            className={`px-4 py-3 text-xs font-mono font-medium flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'design'
                ? 'border-cyan-400 text-cyan-400 bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>design.md</span>
            <span className="text-[10px] text-zinc-500">Architektur</span>
          </button>

          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-3 text-xs font-mono font-medium flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-cyan-400 text-cyan-400 bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>delta-spec.md</span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px]">
              RFC-2119
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-3 text-xs font-mono font-medium flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'tasks'
                ? 'border-cyan-400 text-cyan-400 bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>tasks.md</span>
            <span className="text-[10px] text-zinc-500">
              {tasks.filter((t) => t.completed).length}/{tasks.length}
            </span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="p-5 font-mono text-xs text-zinc-300 bg-zinc-950/70 min-h-[260px] max-h-[420px] overflow-y-auto leading-relaxed">
          {activeTab === 'proposal' && (
            <pre className="whitespace-pre-wrap text-zinc-300">{PROPOSAL_MD}</pre>
          )}

          {activeTab === 'design' && (
            <pre className="whitespace-pre-wrap text-zinc-300">{DESIGN_MD}</pre>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="text-zinc-400 text-xs">
                # Delta Specification: <code className="text-cyan-400">specs/ozg/antrag-wohngeld.delta.md</code>
              </div>
              <pre className="whitespace-pre-wrap text-zinc-300">{DELTA_SPEC_MD}</pre>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-zinc-400 text-xs pb-2 border-b border-zinc-800">
                <span>Atomare Implementierungsschritte nach FITKO & BSI</span>
                <span className="font-bold text-emerald-400">
                  {tasks.filter((t) => t.completed).length === tasks.length
                    ? '✓ Alle 4 Schritte verifiziert'
                    : `${tasks.filter((t) => t.completed).length} von ${tasks.length} erledigt`}
                </span>
              </div>

              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      task.completed
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                          task.completed
                            ? 'bg-emerald-500 text-zinc-950'
                            : 'border border-zinc-700 bg-zinc-950 text-transparent'
                        }`}
                      >
                        ✓
                      </div>
                      <span className="text-xs font-medium text-zinc-200">{task.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                      {task.file}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accordion: Code Diff Proof (Proof of execution without hallucination) */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={() => setDiffOpen(!diffOpen)}
          className="w-full px-5 py-4 flex items-center justify-between bg-zinc-900/90 hover:bg-zinc-850 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Ausführungs-Beweis: Code-Diff</span>
                <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Exakt nach BITV 2.0 & OZG-Vorgaben
                </span>
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                {CODE_DIFF.fileName} – BundID-Check, EXIF-Sanitizing & FIM-Prüfsumme fehlerfrei implementiert.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-xs font-mono">{diffOpen ? 'Einklappen' : 'Diff anzeigen'}</span>
            {diffOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {diffOpen && (
          <div className="border-t border-zinc-800 bg-zinc-950 p-4 font-mono text-xs overflow-x-auto space-y-0.5">
            {CODE_DIFF.diff.map((line, idx) => {
              let bg = 'hover:bg-zinc-900/50';
              let text = 'text-zinc-400';
              if (line.type === 'delete') {
                bg = 'bg-red-950/30 text-red-400';
              } else if (line.type === 'add') {
                bg = 'bg-emerald-950/30 text-emerald-300';
              }
              return (
                <div key={idx} className={`px-2 py-0.5 rounded ${bg} flex items-center gap-3`}>
                  <span className="w-6 text-zinc-600 select-none text-right">{idx + 1}</span>
                  <span className="select-none text-zinc-500">{line.type === 'add' ? '+' : line.type === 'delete' ? '-' : ' '}</span>
                  <span className={text}>{line.text.replace(/^[-+]/, '')}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Terminal Mini-Log */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-[11px] text-zinc-400 space-y-1 shadow-inner">
        <div className="flex items-center justify-between text-zinc-500 pb-2 border-b border-zinc-900">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" /> OpenSpec Public Sector CLI Execution Log
          </span>
          <span className="text-[10px]">FIM & XÖV Compliant Engine</span>
        </div>
        {cliLog.slice(-5).map((log, i) => (
          <div key={i} className={log.startsWith('✓') ? 'text-emerald-400' : 'text-zinc-300'}>
            {log}
          </div>
        ))}
      </div>

      {/* CTA to Phase 4 */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNextPhase}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all"
        >
          <span>Warum OpenSpec schlägt Vibe Coding (Phase 4)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
