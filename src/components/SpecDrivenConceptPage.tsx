import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon';

interface SpecDrivenConceptPageProps {
  onBack: () => void;
  onNext: () => void;
}

export type StepCommandId = 'explore' | 'propose' | 'apply' | 'archive';

interface ProposeFileItem {
  id: string;
  filename: string;
  purpose: string;
  badge: string;
  badgeColor: string;
  description: string;
  exampleContent: string;
}

const PROPOSE_FILES: ProposeFileItem[] = [
  {
    id: 'proposal',
    filename: 'proposal.md',
    purpose: 'Warum & Was',
    badge: 'Scope & Motivation',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    description: 'Definiert das Problem, den Anlass und den exakten Scope des Changes. Schließt Nicht-Ziele explizit aus.',
    exampleContent: `# Change Proposal: Expense Split Calculation

## Motivation & Problem
Die aktuelle manuelle Berechnung führt bei krummen Beträgen zu Rundungsfehlern 
und unfairen Cent-Differenzen. Zudem entstehen zyklische Schuldenbeziehungen.

## Scope
- Automatische Berechnung der Salden pro Teilnehmer
- Minimierung von Transaktionen (Greedy-Schuldenschnitt)
- Cent-genaue Restbetrags-Verteilung

## Non-Goals
- Keine Anbindung externer Zahlungsdienstleister (PayPal etc.) in diesem Schritt.`,
  },
  {
    id: 'specs',
    filename: 'specs/expense-rules.md',
    purpose: 'Was genau (Delta)',
    badge: 'Anforderungen & Tests',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Spezifiziert funktionale Anforderungen und konkrete Akzeptanz-Szenarien nach Given/When/Then-Logik.',
    exampleContent: `# Spezifikation: Berechnungs- und Rundungsregeln

## 1. Cent-Präzision
- Alle Beträge werden intern strikt als Integer (Cent) gespeichert und verarbeitet.
- Keine Fließkommazahlen (Floats) in Zwischenrechnungen.

## 2. Rest-Cent Verteilung (Szenario)
GIVEN 100,00 € geteilt durch 3 Personen
WHEN die Aufteilung berechnet wird
THEN erhält Person 1: 33,34 €
 AND Person 2: 33,33 €
 AND Person 3: 33,33 €
 AND die Summe aller Anteile entspricht exakt 100,00 € (10.000 Cent).`,
  },
  {
    id: 'design',
    filename: 'design.md',
    purpose: 'Wie (Technik)',
    badge: 'Architektur & Typen',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    description: 'Definiert Datenstrukturen, Typen und Algorithmen, bevor die KI mit dem Coden beginnt.',
    exampleContent: `# Technisches Design

## Datenmodell
\`\`\`typescript
export interface Participant {
  id: string; // UUID v4
  name: string;
}

export interface Expense {
  id: string;
  payerId: string;
  amountCents: number; // Integer > 0
  beneficiaryIds: string[]; // Mindestens 1 Person
}

export interface DebtTransaction {
  fromId: string;
  toId: string;
  amountCents: number;
}
\`\`\`

## Algorithmus: Min-Cash-Flow
Nettosalden ermitteln -> Größten Schuldner mit größtem Gläubiger ausgleichen.`,
  },
  {
    id: 'tasks',
    filename: 'tasks.md',
    purpose: 'Umsetzungsplan',
    badge: 'KI-Checkliste',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Atomare, abhakbare Aufgaben, die der KI-Agent im Befehl /opsx:apply sequenziell ausführt.',
    exampleContent: `# Umsetzungs-Checkliste

- [ ] 1. Core-Typen in \`src/types/expense.ts\` gemäß design.md anlegen
- [ ] 2. Cent-Split-Algorithmus in \`src/utils/splitEngine.ts\` implementieren
- [ ] 3. Unit-Tests für 100€ / 3 Personen und 0-Personen-Validierung schreiben
- [ ] 4. Min-Cash-Flow Schuldenschnitt-Funktion umsetzen
- [ ] 5. UI-Komponente an die neue Berechnungslogik anbinden
- [ ] 6. Manuelle Edge-Case Validierung im Browser`,
  },
];

export const SpecDrivenConceptPage: React.FC<SpecDrivenConceptPageProps> = ({ onBack, onNext }) => {
  const [selectedCommand, setSelectedCommand] = useState<StepCommandId | null>(null);
  const [activeFileTab, setActiveFileTab] = useState<string>('proposal');

  const steps = [
    {
      id: 'explore' as StepCommandId,
      stepNumber: '01',
      command: '/opsx:explore',
      title: 'Explore',
      tagline: 'Erkunden & Brainstorming',
      icon: 'explore',
      badge: 'Orientierung',
      colorTheme: 'cyan',
      borderClass: 'border-cyan-300 hover:border-cyan-500',
      activeRingClass: 'ring-2 ring-cyan-600 bg-cyan-50/40 border-cyan-500',
      badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    },
    {
      id: 'propose' as StepCommandId,
      stepNumber: '02',
      command: '/opsx:propose',
      title: 'Propose',
      tagline: 'Planung & Dateistruktur',
      icon: 'edit_note',
      badge: 'Dateistruktur',
      colorTheme: 'blue',
      borderClass: 'border-blue-300 hover:border-blue-500',
      activeRingClass: 'ring-2 ring-blue-600 bg-blue-50/40 border-blue-500',
      badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      id: 'apply' as StepCommandId,
      stepNumber: '03',
      command: '/opsx:apply',
      title: 'Apply',
      tagline: 'Code-Umsetzung',
      icon: 'code',
      badge: 'Deterministisch',
      colorTheme: 'amber',
      borderClass: 'border-amber-300 hover:border-amber-500',
      activeRingClass: 'ring-2 ring-amber-600 bg-amber-50/40 border-amber-500',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'archive' as StepCommandId,
      stepNumber: '04',
      command: '/opsx:archive',
      title: 'Archive',
      tagline: 'Audit-Trail & Sauberes Repo',
      icon: 'inventory_2',
      badge: 'Persistierung',
      colorTheme: 'emerald',
      borderClass: 'border-emerald-300 hover:border-emerald-500',
      activeRingClass: 'ring-2 ring-emerald-600 bg-emerald-50/40 border-emerald-500',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
  ];

  const currentFile = PROPOSE_FILES.find((f) => f.id === activeFileTab) || PROPOSE_FILES[0];

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between overflow-x-hidden bg-dot-pattern">
      {/* Header */}
      <header className="relative z-20 pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-50 border border-zinc-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-700 shadow-sm mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Der strukturierte Workflow mit OpenSpec</span>
          <span className="text-zinc-300">•</span>
          <span>4 Slash-Befehle im KI-Chat</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-3">
          Die vier OpenSpec-Schritte
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Statt unkontrolliertem Prompting steuert ihr den gesamten Entwicklungsprozess
          über vier klare Befehle. Klickt auf eine Kachel für Details.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* 4 Clean Command Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {steps.map((step) => {
            const isSelected = selectedCommand === step.id;

            return (
              <button
                key={step.id}
                onClick={() => setSelectedCommand((prev) => (prev === step.id ? null : step.id))}
                className={`text-left rounded-3xl p-5 border-2 transition-all duration-200 shadow-sm relative group flex flex-col justify-between ${
                  isSelected
                    ? `${step.activeRingClass} shadow-md scale-[1.02]`
                    : `bg-white ${step.borderClass} hover:shadow-md hover:bg-zinc-50/70`
                }`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-black text-zinc-500 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-md">
                      {step.stepNumber}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${step.badgeClass}`}
                    >
                      <MaterialIcon name={step.icon} className="text-xs" />
                      <span>{step.title}</span>
                    </span>
                  </div>

                  {/* Primary Slash Command on the Card */}
                  <div className="mb-3">
                    <div className="font-mono font-black text-base sm:text-lg text-zinc-950 bg-zinc-100 border border-zinc-250 py-2.5 px-3 rounded-2xl tracking-tight inline-block w-full text-center group-hover:bg-zinc-200/70 transition-colors shadow-xs">
                      {step.command}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 font-medium text-center mb-3">
                    {step.tagline}
                  </p>
                </div>

                {/* Click for Info Hint */}
                <div className="pt-3 border-t border-zinc-200/70 flex items-center justify-between text-[11px] font-semibold text-zinc-500 group-hover:text-zinc-900 transition-colors">
                  <span>
                    {isSelected
                      ? 'Schließen'
                      : step.id === 'propose'
                      ? 'Dateistruktur & Details'
                      : 'Details anzeigen'}
                  </span>
                  <MaterialIcon
                    name={isSelected ? 'expand_less' : 'arrow_forward'}
                    className="text-sm transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Panel based on selected Command */}
        {selectedCommand !== null && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm animate-fade-in">
          {selectedCommand === 'explore' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-300 text-cyan-800 flex items-center justify-center shrink-0">
                    <MaterialIcon name="explore" className="text-2xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-lg text-zinc-900 bg-zinc-100 px-3 py-0.5 rounded-lg border border-zinc-200">
                        /opsx:explore [thema]
                      </span>
                      <span className="text-xs font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 rounded-full">
                        Schritt 01
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                      Unverbindliches Brainstorming & Codebase-Analyse vor jeder Festlegung.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Boxen: Groß in wenigen Worten */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Box 1 */}
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-col items-center justify-center text-center hover:bg-zinc-100/50 transition-colors shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center mb-3">
                    <MaterialIcon name="travel_explore" className="text-2xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                    Codebasis verstehen
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    Bestehende Logik analysieren
                  </p>
                </div>

                {/* Box 2 */}
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-col items-center justify-center text-center hover:bg-zinc-100/50 transition-colors shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                    <MaterialIcon name="psychology" className="text-2xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                    Randfälle klären
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    Grenzfälle vorab durchdenken
                  </p>
                </div>

                {/* Box 3 */}
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-col items-center justify-center text-center hover:bg-zinc-100/50 transition-colors shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <MaterialIcon name="shield" className="text-2xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                    Kein Code geändert
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    100% risikofreier Dialog
                  </p>
                </div>
              </div>

              {/* Typischer Aufruf */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="font-bold text-zinc-900 flex items-center gap-1.5 shrink-0">
                  <MaterialIcon name="terminal" className="text-cyan-700 text-base" />
                  <span>Typischer Aufruf im Chat:</span>
                </div>
                <div className="font-mono text-[11px] bg-white px-3 py-2 rounded-xl border border-zinc-200 text-zinc-800 flex-1 shadow-2xs">
                  /opsx:explore "Wie lösen wir das Cent-Rundungsproblem am besten mathematisch sauber?"
                </div>
              </div>
            </div>
          )}

          {selectedCommand === 'propose' && (
            <div className="space-y-6 animate-fade-in">
              {/* Propose Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 text-blue-800 flex items-center justify-center shrink-0">
                    <MaterialIcon name="edit_note" className="text-2xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-lg text-zinc-900 bg-zinc-100 px-3 py-0.5 rounded-lg border border-zinc-200">
                        /opsx:propose &lt;change-name&gt;
                      </span>
                      <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                        Schritt 02 • Herzstück
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                      Erzeugt den isolierten Planungsordner <code className="bg-zinc-100 px-1.5 py-0.5 rounded font-mono text-zinc-800 font-bold">openspec/changes/&lt;change-name&gt;/</code> mit allen Spezifikations-Dateien.
                    </p>
                  </div>
                </div>
              </div>

              {/* What Propose Creates: Visual Folder Structure & Overview */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MaterialIcon name="folder_open" className="text-blue-600 text-lg" />
                  <h3 className="font-bold text-sm text-zinc-900">
                    Angelegte Dateistruktur in OpenSpec:
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Left: Interactive File Tree */}
                  <div className="lg:col-span-5 bg-zinc-900 text-zinc-100 p-4 rounded-2xl font-mono text-xs shadow-inner space-y-2">
                    <div className="flex items-center gap-1.5 text-zinc-400 font-bold pb-1 border-b border-zinc-800">
                      <MaterialIcon name="folder" className="text-sm text-blue-400" />
                      <span>openspec/</span>
                    </div>

                    <div className="pl-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                        <MaterialIcon name="folder_open" className="text-sm text-blue-400" />
                        <span>changes/</span>
                      </div>

                      <div className="pl-4 space-y-1 border-l border-zinc-700/60 ml-1.5">
                        <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                          <MaterialIcon name="folder" className="text-sm text-cyan-400" />
                          <span>&lt;change-name&gt;/</span>
                        </div>

                        <div className="pl-4 space-y-1.5 border-l border-zinc-700/60 ml-1.5 pt-1">
                          {PROPOSE_FILES.map((f) => {
                            const isTabActive = activeFileTab === f.id;
                            return (
                              <button
                                key={f.id}
                                onClick={() => setActiveFileTab(f.id)}
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all ${
                                  isTabActive
                                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <MaterialIcon
                                    name={f.id === 'specs' ? 'folder' : 'description'}
                                    className={`text-xs ${isTabActive ? 'text-white' : 'text-blue-400'}`}
                                  />
                                  <span>{f.filename}</span>
                                </span>
                                <span className="text-[10px] opacity-75 font-sans">
                                  {f.purpose}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: File Preview Content */}
                  <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200 p-4 sm:p-5 flex flex-col justify-between min-h-[300px] shadow-xs">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-zinc-900">
                              {currentFile.filename}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentFile.badgeColor}`}>
                              {currentFile.badge}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1">
                            {currentFile.description}
                          </p>
                        </div>
                      </div>

                      {/* Code Snippet Box */}
                      <pre className="bg-zinc-950 text-zinc-100 p-3.5 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto border border-zinc-800 max-h-60">
                        <code>{currentFile.exampleContent}</code>
                      </pre>
                    </div>

                    <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                      <span>Wird von OpenSpec automatisch vor der Code-Generierung angelegt</span>
                      <span className="font-bold text-blue-600">Review vor Apply</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCommand === 'apply' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
                    <MaterialIcon name="code" className="text-2xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-lg text-zinc-900 bg-zinc-100 px-3 py-0.5 rounded-lg border border-zinc-200">
                        /opsx:apply
                      </span>
                      <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        Schritt 03 • Code-Umsetzung
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                      Die KI setzt die Checkliste aus <code className="bg-zinc-100 px-1.5 py-0.5 rounded font-mono text-zinc-800 font-bold">tasks.md</code> strikt nach der Spezifikation um.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Boxen: Groß in wenigen Worten */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Box 1 */}
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-col items-center justify-center text-center hover:bg-zinc-100/50 transition-colors shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                    <MaterialIcon name="checklist" className="text-2xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                    Tasks abarbeiten
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    Schrittweise nach tasks.md
                  </p>
                </div>

                {/* Box 2 */}
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-col items-center justify-center text-center hover:bg-zinc-100/50 transition-colors shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <MaterialIcon name="lock" className="text-2xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                    Keine Halluzinationen
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    Feste Vorgaben durch Spezifikation
                  </p>
                </div>

                {/* Box 3 */}
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-col items-center justify-center text-center hover:bg-zinc-100/50 transition-colors shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                    <MaterialIcon name="difference" className="text-2xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                    Transparenter Diff
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    Exakt nachvollziehbare Änderungen
                  </p>
                </div>
              </div>

              {/* Typischer Aufruf */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="font-bold text-zinc-900 flex items-center gap-1.5 shrink-0">
                  <MaterialIcon name="terminal" className="text-amber-700 text-base" />
                  <span>Typischer Aufruf im Chat:</span>
                </div>
                <div className="font-mono text-[11px] bg-white px-3 py-2 rounded-xl border border-zinc-200 text-zinc-800 flex-1 shadow-2xs">
                  /opsx:apply
                </div>
              </div>
            </div>
          )}

          {selectedCommand === 'archive' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
                    <MaterialIcon name="inventory_2" className="text-2xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-lg text-zinc-900 bg-zinc-100 px-3 py-0.5 rounded-lg border border-zinc-200">
                        /opsx:archive
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        Schritt 04 • Konsolidierung
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                      Schließt den Change ab, archiviert den Verlauf und hält das Repository sauber.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Boxen: Groß in wenigen Worten */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Box 1 */}
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-col items-center justify-center text-center hover:bg-zinc-100/50 transition-colors shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <MaterialIcon name="inventory_2" className="text-2xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                    Change archivieren
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    Verschiebt nach openspec/archive/
                  </p>
                </div>

                {/* Box 2 */}
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-col items-center justify-center text-center hover:bg-zinc-100/50 transition-colors shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                    <MaterialIcon name="verified" className="text-2xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                    Baseline aktualisieren
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    Haupt-Spezifikation wächst mit
                  </p>
                </div>

                {/* Box 3 */}
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-col items-center justify-center text-center hover:bg-zinc-100/50 transition-colors shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
                    <MaterialIcon name="history_edu" className="text-2xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                    Lückenloser Audit-Trail
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    Alle Entscheidungen im Git-Repo
                  </p>
                </div>
              </div>

              {/* Typischer Aufruf */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="font-bold text-zinc-900 flex items-center gap-1.5 shrink-0">
                  <MaterialIcon name="terminal" className="text-emerald-700 text-base" />
                  <span>Typischer Aufruf im Chat:</span>
                </div>
                <div className="font-mono text-[11px] bg-white px-3 py-2 rounded-xl border border-zinc-200 text-zinc-800 flex-1 shadow-2xs">
                  /opsx:archive
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      </main>

      {/* Bottom Sticky Action Bar: Weißer Button links, Schwarzer Button rechts */}
      <footer className="py-4 px-6 border-t border-zinc-200/90 bg-white/95 backdrop-blur-md sticky bottom-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-700 shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MaterialIcon name="arrow_back" className="text-sm" />
            <span>Zurück zu Retro 1 (Vibe)</span>
          </button>

          <button
            onClick={onNext}
            className="px-8 py-3.5 bg-zinc-900 hover:bg-black text-white font-bold text-sm rounded-full shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 ring-4 ring-zinc-900/10"
          >
            <span>Weiter zu Phase 2: Briefing</span>
            <MaterialIcon name="arrow_forward" className="text-base" />
          </button>
        </div>
      </footer>
    </div>
  );
};
