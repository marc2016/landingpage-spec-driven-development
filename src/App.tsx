import { useState, useEffect } from 'react';
import { TasksOverviewPage } from './components/TasksOverviewPage';
import {
  TeamAssignmentPage,
  AssignedTeam,
  TEAMS,
  generateRandomAssignments,
} from './components/TeamAssignmentPage';
import { LiveSessionPage } from './components/LiveSessionPage';
import { RetroPostItsPage } from './components/RetroPostItsPage';
import { SpecDrivenConceptPage } from './components/SpecDrivenConceptPage';
import { Phase2IntroPage } from './components/Phase2IntroPage';
import { FinalPostItsSummaryPage } from './components/FinalPostItsSummaryPage';
import { QuickNavMenu, WorkshopPageMode } from './components/QuickNavMenu';

const STORAGE_KEY_ASSIGNMENTS = 'openspec_team_assignments';
const STORAGE_KEY_PAGE_MODE = 'openspec_page_mode';

const hasCompleteAssignments = (assignments: AssignedTeam[] | null | undefined): boolean => {
  return (
    Array.isArray(assignments) &&
    assignments.length === 3 &&
    assignments.every((a) => a && a.task !== null && a.difficulty !== null)
  );
};

export function App() {
  // Page mode synchronized with URL search params, window.history, and localStorage
  const [pageMode, setPageModeState] = useState<WorkshopPageMode>(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as WorkshopPageMode;
    if (pageParam) return pageParam;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PAGE_MODE) as WorkshopPageMode;
      if (saved) return saved;
    } catch (e) {}
    return 'tasks';
  });

  // Team assignments persisted in localStorage (auto-generated if initial page is a workshop step)
  const [teamAssignments, setTeamAssignments] = useState<AssignedTeam[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ASSIGNMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (hasCompleteAssignments(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load team assignments from storage', e);
    }

    // If starting directly on a workshop step that uses assignments, generate them automatically
    const params = new URLSearchParams(window.location.search);
    const initialPage = (params.get('page') ||
      localStorage.getItem(STORAGE_KEY_PAGE_MODE) ||
      'tasks') as WorkshopPageMode;
    if (initialPage !== 'tasks' && initialPage !== 'team-assignment') {
      const autoGen = generateRandomAssignments();
      try {
        localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(autoGen));
      } catch (e) {}
      return autoGen;
    }

    return [];
  });

  // Helper to ensure teams have assignments, auto-generating in the background if empty
  const ensureAssignments = (current: AssignedTeam[] = teamAssignments): AssignedTeam[] => {
    if (hasCompleteAssignments(current)) {
      return current;
    }
    const generated = generateRandomAssignments();
    handleUpdateAssignments(generated);
    return generated;
  };

  // Helper to change page mode, update history, and persist to localStorage
  const setPageMode = (mode: WorkshopPageMode) => {
    setPageModeState(mode);
    try {
      localStorage.setItem(STORAGE_KEY_PAGE_MODE, mode);
    } catch (e) {}
    const url = new URL(window.location.href);
    url.searchParams.set('page', mode);
    window.history.pushState({ page: mode }, '', url.toString());

    // If jumping via menu to any workshop phase and teams don't have tasks yet, auto-assign in background
    if (mode !== 'tasks' && mode !== 'team-assignment') {
      setTeamAssignments((curr) => {
        if (hasCompleteAssignments(curr)) return curr;
        const generated = generateRandomAssignments();
        try {
          localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(generated));
        } catch (e) {}
        return generated;
      });
    }
  };

  // Helper to update and persist team assignments
  const handleUpdateAssignments = (assignments: AssignedTeam[]) => {
    setTeamAssignments(assignments);
    try {
      localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(assignments));
    } catch (e) {}
  };

  // Helper to reset team assignments
  const handleResetAssignments = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_ASSIGNMENTS);
    } catch (e) {}
    const empty: AssignedTeam[] = [
      { team: TEAMS[0], difficulty: null, task: null },
      { team: TEAMS[1], difficulty: null, task: null },
      { team: TEAMS[2], difficulty: null, task: null },
    ];
    setTeamAssignments(empty);
  };

  // Browser back/forward navigation support
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const targetPage =
        event.state?.page ||
        (new URLSearchParams(window.location.search).get('page') as WorkshopPageMode);
      if (targetPage) {
        setPageModeState(targetPage);
        if (targetPage !== 'tasks' && targetPage !== 'team-assignment') {
          setTeamAssignments((curr) => {
            if (hasCompleteAssignments(curr)) return curr;
            const generated = generateRandomAssignments();
            try {
              localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(generated));
            } catch (e) {}
            return generated;
          });
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Active assignments: auto-ensures assignments if on any workshop page where tasks are displayed
  const activeAssignments =
    hasCompleteAssignments(teamAssignments) || pageMode === 'tasks' || pageMode === 'team-assignment'
      ? teamAssignments
      : ensureAssignments();

  // Render content according to active pageMode
  const renderCurrentPage = () => {
    // 1. Primary Landing View: The Tasks Overview Page
    if (pageMode === 'tasks') {
      return (
        <TasksOverviewPage
          onStartWorkshop={() => setPageMode('team-assignment')}
        />
      );
    }

    // 2. Team Assignment Page (Lottery with Rot, Grün, Blau)
    if (pageMode === 'team-assignment') {
      return (
        <TeamAssignmentPage
          initialAssignments={teamAssignments}
          onBackToOverview={() => setPageMode('tasks')}
          onFinishAssignment={(assignments) => {
            handleUpdateAssignments(assignments);
            setPageMode('live-session-phase1');
          }}
        />
      );
    }

    // 3. Live Task & Timer Session Page: Phase 1 (Vibe Coding, 13 Min)
    if (pageMode === 'live-session-phase1') {
      return (
        <LiveSessionPage
          assignments={activeAssignments}
          initialPhase="vibe"
          onBackToAssignment={() => setPageMode('team-assignment')}
          onBackToOverview={() => setPageMode('tasks')}
          onNextToRetro={() => setPageMode('retro-postits')}
        />
      );
    }

    // 4. Retro & Post-Its Collection Page: Phase 1 (6 Min Timer)
    if (pageMode === 'retro-postits') {
      return (
        <RetroPostItsPage
          key="retro-vibe"
          phase="vibe"
          onBack={() => setPageMode('live-session-phase1')}
          onNext={() => setPageMode('spec-driven-concept')}
        />
      );
    }

    // 5. Spec-Driven Concept Page (4 OpenSpec Steps with Propose File Structure)
    if (pageMode === 'spec-driven-concept') {
      return (
        <SpecDrivenConceptPage
          onBack={() => setPageMode('retro-postits')}
          onNext={() => setPageMode('phase2-intro')}
        />
      );
    }

    // 6. Phase 2 Intro Page ("Dieselbe Aufgabe – jetzt mit OpenSpec!" & 4+9 Min Rules)
    if (pageMode === 'phase2-intro') {
      return (
        <Phase2IntroPage
          assignments={activeAssignments}
          onBack={() => setPageMode('spec-driven-concept')}
          onStartPhase2={() => setPageMode('live-session-phase2')}
        />
      );
    }

    // 7. Live Task & Timer Session Page: Phase 2 (Spec-Driven, 13 Min)
    if (pageMode === 'live-session-phase2') {
      return (
        <LiveSessionPage
          assignments={activeAssignments}
          initialPhase="spec"
          onBackToAssignment={() => setPageMode('phase2-intro')}
          onBackToOverview={() => setPageMode('tasks')}
          onNextToRetro={() => setPageMode('retro-postits-phase2')}
        />
      );
    }

    // 8. Retro & Post-Its Collection Page: Phase 2 (OpenSpec Erkenntnisse, 6 Min)
    if (pageMode === 'retro-postits-phase2') {
      return (
        <RetroPostItsPage
          key="retro-spec"
          phase="spec"
          onBack={() => setPageMode('live-session-phase2')}
          onNext={() => setPageMode('phases')}
        />
      );
    }

    // 9. Station 09: Alle Post-Its im direkten Vergleich (Vibe Coding vs. Spec-Driven)
    return (
      <FinalPostItsSummaryPage
        onBack={() => setPageMode('retro-postits-phase2')}
        onRestart={() => setPageMode('tasks')}
      />
    );
  };

  // Helper to reset both teams and all post-its completely
  const handleResetAll = () => {
    // 1. Reset team assignments in state & localStorage
    try {
      localStorage.removeItem(STORAGE_KEY_ASSIGNMENTS);
    } catch (e) {}
    const empty: AssignedTeam[] = [
      { team: TEAMS[0], difficulty: null, task: null },
      { team: TEAMS[1], difficulty: null, task: null },
      { team: TEAMS[2], difficulty: null, task: null },
    ];
    setTeamAssignments(empty);

    // 2. Reset post-its in localStorage
    try {
      localStorage.setItem('openspec_postits_vibe', JSON.stringify([]));
      localStorage.setItem('openspec_postits_spec', JSON.stringify([]));
    } catch (e) {}

    // Dispatch storage events so active components update immediately
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

    // 3. Jump to start of workshop
    setPageMode('tasks');
  };

  return (
    <>
      {/* Global Context-Navigation Dropdown Menu (Top Right) */}
      <QuickNavMenu
        currentPage={pageMode}
        onSelectPage={(target) => setPageMode(target)}
        assignments={activeAssignments}
        onResetAssignments={handleResetAssignments}
        onResetAll={handleResetAll}
      />

      {/* Render Current Workshop Page */}
      {renderCurrentPage()}
    </>
  );
}

export default App;
