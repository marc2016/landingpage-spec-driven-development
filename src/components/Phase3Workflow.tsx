import { useState, FC, useEffect } from 'react';
import { MaterialIcon } from './MaterialIcon';
import {
  PROPOSAL_MD_CONTENT,
  DESIGN_MD_CONTENT,
  DELTA_SPEC_MD_CONTENT,
  TASKS_MD_CONTENT,
  CODE_DIFF_CONTENT,
} from '../data/mockData';
import { realtimeService } from '../services/realtimeService';

interface Phase3WorkflowProps {
  onNextPhase: () => void;
}

export const Phase3Workflow: FC<Phase3WorkflowProps> = ({ onNextPhase }) => {
  const [activeStepTab, setActiveStepTab] = useState<'proposal' | 'apply' | 'archive'>('proposal');
  const [activeSpecFile, setActiveSpecFile] = useState<'proposal' | 'design' | 'delta' | 'tasks'>('proposal');
  const [tasks, setTasks] = useState(TASKS_MD_CONTENT);
  const [isApplying, setIsApplying] = useState(false);
  const [applyFinished, setApplyFinished] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    // Notify server of active phase (Phase 3 = OpenSpec Workflow)
    realtimeService.updateActivePhase(3);
  }, []);

  const handleRunApply = () => {
    setIsApplying(true);
    setApplyFinished(false);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < tasks.length) {
        setTasks((prev) =>
          prev.map((t, i) => (i <= idx ? { ...t, completed: true } : t))
        );
        idx++;
      } else {
        clearInterval(interval);
        setIsApplying(false);
        setApplyFinished(true);
      }
    }, 600);
  };

  const handleArchive = () => {
    setIsArchived(true);
  };

  const handleReset = () => {
    setTasks(TASKS_MD_CONTENT.map((t) => ({ ...t, completed: false })));
    setApplyFinished(false);
    setIsArchived(false);
  };

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide">
          <MaterialIcon name="layers" className="text-base text-cyan-400" />
          <span>3. Die Lösung: Spec-Driven Development mit OpenSpec</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Der strukturierte 3-Schritte-Workflow: <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent inline-flex items-center gap-2 justify-center flex-wrap">
            <span>Proposal</span>
            <MaterialIcon name="arrow_forward" className="text-teal-400 text-2xl sm:text-3xl" />
            <span>Apply</span>
            <MaterialIcon name="arrow_forward" className="text-emerald-400 text-2xl sm:text-3xl" />
            <span>Archive</span>
          </span>
        </h2>

        {/* Schlagworte statt langer Absatz */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-200 flex items-center gap-1.5">
            <MaterialIcon name="verified" className="text-cyan-400 text-sm" />
            <span>Single Source of Truth</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-200 flex items-center gap-1.5">
            <MaterialIcon name="description" className="text-teal-400 text-sm" />
            <span>Markdown im Repository</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-200 flex items-center gap-1.5">
            <MaterialIcon name="smart_toy" className="text-emerald-400 text-sm" />
            <span>Mensch & KI Hand in Hand</span>
          </span>
        </div>
      </div>

      {/* Workflow Tabs (Proposal -> Apply -> Archive) – Schlagworte & Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveStepTab('proposal')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            activeStepTab === 'proposal'
              ? 'bg-zinc-900 border-cyan-400 shadow-lg shadow-cyan-500/10'
              : 'bg-zinc-950/60 border-zinc-850 hover:border-zinc-700 text-zinc-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-cyan-400">
              Schritt 1
            </span>
            <MaterialIcon name="description" className="text-cyan-400 text-xl" />
          </div>
          <div className="text-base font-bold text-white mt-1.5">Proposal (Design)</div>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-semibold text-zinc-300">
              proposal.md
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-semibold text-zinc-300">
              design.md
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-semibold text-zinc-300">
              tasks.md
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveStepTab('apply')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            activeStepTab === 'apply'
              ? 'bg-zinc-900 border-emerald-400 shadow-lg shadow-emerald-500/10'
              : 'bg-zinc-950/60 border-zinc-850 hover:border-zinc-700 text-zinc-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-400">
              Schritt 2
            </span>
            <MaterialIcon name="play_arrow" className="text-emerald-400 text-xl" />
          </div>
          <div className="text-base font-bold text-white mt-1.5">Apply (Umsetzung)</div>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-semibold text-zinc-300">
              Delta-Specs
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-semibold text-zinc-300">
              Atomare Tasks
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-semibold text-zinc-300">
              Exakter Code
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveStepTab('archive')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            activeStepTab === 'archive'
              ? 'bg-zinc-900 border-purple-400 shadow-lg shadow-purple-500/10'
              : 'bg-zinc-950/60 border-zinc-850 hover:border-zinc-700 text-zinc-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-purple-400">
              Schritt 3
            </span>
            <MaterialIcon name="inventory_2" className="text-purple-400 text-xl" />
          </div>
          <div className="text-base font-bold text-white mt-1.5">Archive (Audit)</div>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-semibold text-zinc-300">
              Audit-Trail
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-semibold text-zinc-300">
              Git-Historie
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-semibold text-zinc-300">
              Sauberes Repo
            </span>
          </div>
        </button>
      </div>

      {/* Main Interactive Stage for Selected Step */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Step 1: Proposal */}
        {activeStepTab === 'proposal' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-cyan-400">
                  Schritt 1: Proposal (Vorschlag & Design)
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Planung vor der ersten Codezeile
                </h3>
              </div>

              {/* Subtabs for proposal files */}
              <div className="flex items-center gap-1 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 text-xs">
                <button
                  onClick={() => setActiveSpecFile('proposal')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeSpecFile === 'proposal' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400'
                  }`}
                >
                  proposal.md
                </button>
                <button
                  onClick={() => setActiveSpecFile('design')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeSpecFile === 'design' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400'
                  }`}
                >
                  design.md
                </button>
                <button
                  onClick={() => setActiveSpecFile('delta')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeSpecFile === 'delta' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400'
                  }`}
                >
                  delta.md
                </button>
              </div>
            </div>

            {/* Spec Code Viewer */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto shadow-inner">
              <pre className="leading-relaxed">
                {activeSpecFile === 'proposal' && PROPOSAL_MD_CONTENT}
                {activeSpecFile === 'design' && DESIGN_MD_CONTENT}
                {activeSpecFile === 'delta' && DELTA_SPEC_MD_CONTENT}
              </pre>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveStepTab('apply')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Weiter zu Schritt 2: Apply</span>
                <MaterialIcon name="arrow_forward" className="text-base" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Apply */}
        {activeStepTab === 'apply' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                  Schritt 2: Apply (Gezielte Code-Generierung)
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Abarbeitung der atomaren Aufgabenliste
                </h3>
              </div>

              <button
                onClick={handleRunApply}
                disabled={isApplying}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
              >
                <MaterialIcon name={isApplying ? 'sync' : 'play_arrow'} className={`text-base ${isApplying ? 'animate-spin' : ''}`} />
                <span>{isApplying ? 'Agent setzt um...' : 'Code ausführen (/opsx:apply)'}</span>
              </button>
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    task.completed
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-400 text-zinc-950'
                          : 'border-zinc-700 bg-zinc-900'
                      }`}
                    >
                      {task.completed && <MaterialIcon name="check" className="text-xs font-bold" />}
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${task.completed ? 'text-white' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">{task.file}</span>
                </div>
              ))}
            </div>

            {/* Code Diff Display */}
            {applyFinished && (
              <div className="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/40 space-y-3 animate-fade-in shadow-xl">
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
                  <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <MaterialIcon name="check" className="text-sm" />
                    <span>Code-Diff ({CODE_DIFF_CONTENT.fileName})</span>
                  </span>
                  <span className="text-[11px] text-zinc-400">Exakt nach Delta-Spec gebaut</span>
                </div>
                <div className="font-mono text-xs space-y-1 overflow-x-auto">
                  {CODE_DIFF_CONTENT.diff.map((line, idx) => (
                    <div
                      key={idx}
                      className={`px-2 py-0.5 rounded ${
                        line.type === 'add'
                          ? 'bg-emerald-500/10 text-emerald-300'
                          : line.type === 'delete'
                          ? 'bg-red-500/10 text-red-400 line-through opacity-60'
                          : 'text-zinc-400'
                      }`}
                    >
                      {line.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <MaterialIcon name="replay" className="text-xs" />
                <span>Zurücksetzen</span>
              </button>

              <button
                onClick={() => setActiveStepTab('archive')}
                className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Weiter zu Schritt 3: Archive</span>
                <MaterialIcon name="arrow_forward" className="text-base" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Archive */}
        {activeStepTab === 'archive' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-purple-400">
                  Schritt 3: Archive (Abschluss & Audit)
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Lückenloser Audit-Trail im Repository
                </h3>
              </div>

              {!isArchived ? (
                <button
                  onClick={handleArchive}
                  className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-500/20"
                >
                  <MaterialIcon name="inventory_2" className="text-base" />
                  <span>Spec archivieren (/opsx:archive)</span>
                </button>
              ) : (
                <div className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-2">
                  <MaterialIcon name="check_circle" className="text-base text-purple-400" />
                  <span>Erfolgreich archiviert</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <h4 className="text-sm font-bold text-white">Repository vor /opsx:archive:</h4>
                <div className="font-mono text-xs text-zinc-400 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <MaterialIcon name="folder" className="text-sm text-zinc-400" />
                    <span>specs/</span>
                  </div>
                  <div className="pl-4 text-cyan-400 flex items-center gap-1.5">
                    <MaterialIcon name="description" className="text-sm text-cyan-400" />
                    <span>proposal.md (aktiv)</span>
                  </div>
                  <div className="pl-4 text-cyan-400 flex items-center gap-1.5">
                    <MaterialIcon name="description" className="text-sm text-cyan-400" />
                    <span>design.md (aktiv)</span>
                  </div>
                  <div className="pl-4 text-cyan-400 flex items-center gap-1.5">
                    <MaterialIcon name="description" className="text-sm text-cyan-400" />
                    <span>tasks.md (abgeschlossen)</span>
                  </div>
                  <div className="pl-4 text-zinc-600 flex items-center gap-1.5">
                    <MaterialIcon name="folder" className="text-sm text-zinc-600" />
                    <span>archive/</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-purple-500/30 space-y-3">
                <h4 className="text-sm font-bold text-white">Nach /opsx:archive:</h4>
                <div className="font-mono text-xs text-zinc-400 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <MaterialIcon name="folder" className="text-sm text-zinc-400" />
                    <span>specs/</span>
                  </div>
                  <div className="pl-4 text-purple-400 flex items-center gap-1.5">
                    <MaterialIcon name="folder" className="text-sm text-purple-400" />
                    <span>archive/</span>
                  </div>
                  <div className="pl-8 text-emerald-400 flex items-center gap-1.5">
                    <MaterialIcon name="description" className="text-sm text-emerald-400" />
                    <span>2026-10-form-validation.md (Audit Trail)</span>
                  </div>
                  <div className="pl-4 text-zinc-600"># Aktiver Ordner wieder sauber!</div>
                </div>
              </div>
            </div>

            {/* Schlagworte-Badge Box */}
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <MaterialIcon name="lightbulb" className="text-purple-400 text-base" />
                <span>Der Mehrwert:</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-zinc-950 border border-purple-500/20 text-xs font-semibold text-zinc-200">
                100% Kontext für Entwickler & KI
              </span>
              <span className="px-3 py-1 rounded-xl bg-zinc-950 border border-purple-500/20 text-xs font-semibold text-zinc-200">
                Keine verlorenen Entscheidungen
              </span>
              <span className="px-3 py-1 rounded-xl bg-zinc-950 border border-purple-500/20 text-xs font-semibold text-zinc-200">
                Monate später sofort verständlich
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation to Phase 4 (Zweites Plenum) */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNextPhase}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-zinc-950 font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
        >
          <span>Weiter zu Schritt 4: Zweites Plenum</span>
          <MaterialIcon name="arrow_forward" className="text-lg" />
        </button>
      </div>
    </section>
  );
};
