import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon';
import { AssignedTeam } from './TeamAssignmentPage';

export type WorkshopPageMode =
  | 'tasks'
  | 'team-assignment'
  | 'live-session-phase1'
  | 'retro-postits'
  | 'spec-driven-concept'
  | 'phase2-intro'
  | 'live-session-phase2'
  | 'retro-postits-phase2'
  | 'phases';

interface QuickNavMenuProps {
  currentPage: WorkshopPageMode;
  onSelectPage: (page: WorkshopPageMode) => void;
  assignments: AssignedTeam[];
  onResetAssignments: () => void;
  onResetAll: () => void;
}

interface NavStepItem {
  id: WorkshopPageMode;
  stepNumber: string;
  title: string;
  subtitle: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

const NAV_STEPS: NavStepItem[] = [
  {
    id: 'tasks',
    stepNumber: '01',
    title: 'Aufgaben-Pool',
    subtitle: '12 Aufgaben im Ticker & Spotlight',
    icon: 'apps',
  },
  {
    id: 'team-assignment',
    stepNumber: '02',
    title: 'Team-Zuweisung',
    subtitle: 'Aufgaben an die 3 Teams verlosen',
    icon: 'casino',
    badge: 'Roulette',
    badgeColor: 'bg-zinc-100 text-zinc-700',
  },
  {
    id: 'live-session-phase1',
    stepNumber: '03',
    title: 'Phase 1: Vibe-Coding',
    subtitle: '13-Minuten Live-Timer & 3 Spalten',
    icon: 'bolt',
    badge: '13 Min',
    badgeColor: 'bg-amber-100 text-amber-900',
  },
  {
    id: 'retro-postits',
    stepNumber: '04',
    title: 'Retro 1: Vibe-Coding',
    subtitle: 'Showcase & Zurufe sammeln (6 Min)',
    icon: 'sticky_note_2',
    badge: 'Retro',
    badgeColor: 'bg-rose-100 text-rose-900',
  },
  {
    id: 'spec-driven-concept',
    stepNumber: '05',
    title: 'Was ist OpenSpec?',
    subtitle: '4 Schritte: Explore, Propose, Apply, Archive',
    icon: 'architecture',
    badge: 'Konzept',
    badgeColor: 'bg-blue-100 text-blue-900',
  },
  {
    id: 'phase2-intro',
    stepNumber: '06',
    title: 'Phase 2: Briefing',
    subtitle: 'Dieselbe Aufgabe mit OpenSpec (4+9 Min)',
    icon: 'assignment',
  },
  {
    id: 'live-session-phase2',
    stepNumber: '07',
    title: 'Phase 2: OpenSpec',
    subtitle: '13-Minuten Live-Timer (Spec-Driven)',
    icon: 'code',
    badge: '13 Min',
    badgeColor: 'bg-emerald-100 text-emerald-900',
  },
  {
    id: 'retro-postits-phase2',
    stepNumber: '08',
    title: 'Retro 2: OpenSpec',
    subtitle: 'Showcase & Zurufe sammeln (6 Min)',
    icon: 'rate_review',
    badge: 'Retro',
    badgeColor: 'bg-emerald-100 text-emerald-900',
  },
  {
    id: 'phases',
    stepNumber: '09',
    title: 'Gesamtfazit: Alle Post-Its',
    subtitle: 'Vibe Coding vs. Spec-Driven im direkten Vergleich',
    icon: 'dashboard',
    badge: 'Fazit',
    badgeColor: 'bg-purple-100 text-purple-900',
  },
];

export const QuickNavMenu: React.FC<QuickNavMenuProps> = ({
  currentPage,
  onSelectPage,
  assignments,
  onResetAssignments,
  onResetAll,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hasAssignedTasks = assignments.length === 3 && assignments.some((a) => a.task !== null);

  const handleSelect = (page: WorkshopPageMode) => {
    onSelectPage(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Small floating button top right */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`px-3 py-2 rounded-2xl border shadow-md backdrop-blur-md transition-all duration-200 flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] ${
            isOpen
              ? 'bg-zinc-900 text-white border-zinc-900 shadow-xl ring-2 ring-zinc-900/20'
              : 'bg-white/90 hover:bg-white text-zinc-800 border-zinc-200/90'
          }`}
          title="Workshop-Navigation öffnen"
          aria-label="Workshop-Navigation"
        >
          <MaterialIcon name={isOpen ? 'close' : 'menu'} className="text-lg" />
          <span className="text-xs font-extrabold tracking-tight hidden sm:inline">
            Menü
          </span>
        </button>

        {/* Backdrop for click outside */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Dropdown Popover */}
        {isOpen && (
          <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white/98 backdrop-blur-2xl border border-zinc-200/90 rounded-3xl shadow-2xl p-3 z-50 animate-fade-in text-zinc-900 max-h-[85vh] flex flex-col justify-between overflow-hidden">
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2.5 px-2 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <h3 className="font-extrabold text-xs text-zinc-900 uppercase tracking-wider">
                  Workshop-Navigation
                </h3>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium">9 Stationen</span>
            </div>

            {/* List of 9 Steps */}
            <div className="py-2 space-y-1 overflow-y-auto max-h-[50vh] pr-1">
              {NAV_STEPS.map((step) => {
                const isActive = currentPage === step.id;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleSelect(step.id)}
                    className={`w-full text-left p-2.5 rounded-2xl transition-all duration-150 flex items-center justify-between gap-3 group ${
                      isActive
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'hover:bg-zinc-100/80 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                          isActive
                            ? 'bg-zinc-800 text-white'
                            : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200'
                        }`}
                      >
                        {step.stepNumber}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs truncate">{step.title}</span>
                          {step.badge && !isActive && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${step.badgeColor}`}
                            >
                              {step.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[10px] truncate ${
                            isActive ? 'text-zinc-300' : 'text-zinc-500'
                          }`}
                        >
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {isActive ? (
                        <MaterialIcon name="check" className="text-sm text-emerald-400" />
                      ) : (
                        <MaterialIcon
                          name="chevron_right"
                          className="text-sm text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Team Assignments Persistence Status Footer */}
            <div className="pt-2.5 mt-1 border-t border-zinc-100 bg-zinc-50/80 -mx-3 -mb-3 p-3 rounded-b-3xl">
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-700 mb-2">
                <span className="flex items-center gap-1.5">
                  <MaterialIcon name="folder_shared" className="text-sm text-zinc-500" />
                  <span>Team-Themen (Gespeichert):</span>
                </span>
                {hasAssignedTasks && (
                  <button
                    onClick={() => onResetAssignments()}
                    className="text-[10px] text-rose-600 hover:text-rose-800 font-semibold underline"
                    title="Themen-Zuweisung löschen"
                  >
                    Zurücksetzen
                  </button>
                )}
              </div>

              {hasAssignedTasks ? (
                <div className="space-y-1.5">
                  {assignments.map((item) => {
                    const task = item.task;
                    return (
                      <div
                        key={item.team.id}
                        className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-zinc-200/80 text-[11px] shadow-2xs"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${item.team.accentBg}`}
                          />
                          <span className="font-bold text-zinc-900 truncate">
                            {item.team.name}:
                          </span>
                          <span className="text-zinc-600 truncate">
                            {task ? task.title : 'Nicht gelost'}
                          </span>
                        </div>
                        {task && (
                          <span className="text-[9px] font-bold text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded shrink-0">
                            {task.difficultyLabel}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-[11px] text-zinc-500 flex items-center justify-between bg-white p-2 rounded-xl border border-zinc-200/80">
                  <span>Noch keine Aufgaben ausgelost</span>
                  <button
                    onClick={() => handleSelect('team-assignment')}
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    Jetzt auslosen
                  </button>
                </div>
              )}

              {/* Complete Workshop Reset: Teams & Post-Its */}
              <div className="pt-2.5 mt-2.5 border-t border-zinc-200/80">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.removeItem('openspec_team_assignments');
                      localStorage.setItem('openspec_postits_vibe', JSON.stringify([]));
                      localStorage.setItem('openspec_postits_spec', JSON.stringify([]));
                      window.dispatchEvent(
                        new StorageEvent('storage', {
                          key: 'openspec_postits_vibe',
                          newValue: JSON.stringify([]),
                        })
                      );
                      window.dispatchEvent(
                        new StorageEvent('storage', {
                          key: 'openspec_postits_spec',
                          newValue: JSON.stringify([]),
                        })
                      );
                    } catch (e) {}

                    if (typeof onResetAll === 'function') {
                      onResetAll();
                    } else {
                      if (typeof onResetAssignments === 'function') {
                        onResetAssignments();
                      }
                      onSelectPage('tasks');
                    }
                    setIsOpen(false);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-900 border border-rose-200/80 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98]"
                  title="Teams und alle gesammelten Post-Its vollständig zurücksetzen"
                >
                  <MaterialIcon name="restart_alt" className="text-base text-rose-600" />
                  <span>Teams & Post-Its zurücksetzen</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
