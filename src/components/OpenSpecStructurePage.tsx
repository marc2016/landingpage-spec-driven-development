import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon';

interface OpenSpecStructurePageProps {
  onBack: () => void;
  onNext: () => void;
}

export const OpenSpecStructurePage: React.FC<OpenSpecStructurePageProps> = ({ onBack, onNext }) => {
  const [activeTab, setActiveTab] = useState<'model' | 'rules' | 'scenarios' | 'prompt'>('model');

  const fileCards = [
    {
      id: 'model',
      filename: '01_data-model.md',
      title: '1. Datenmodell',
      icon: 'schema',
      badge: 'Struktur',
      color: 'blue',
      desc: 'Definiert alle Typen, Felder, Validierungen und Standardwerte.',
      code: `# Datenmodell: ExpenseSplit

## Types & Entities

### Participant
- id: string (UUID)
- name: string (min: 1, max: 50)

### Expense
- id: string
- payerId: string (ref: Participant.id)
- amount: number (cents: integer, > 0)
- beneficiaries: string[] (ref: Participant.id, min: 1)

### Balance
- participantId: string
- netBalance: number (can be negative/positive)`,
    },
    {
      id: 'rules',
      filename: '02_rules.md',
      title: '2. Regeln & Formeln',
      icon: 'calculate',
      badge: 'Logik',
      color: 'emerald',
      desc: 'Mathematische Formeln, Rundungsvorgaben und Hard/Soft Constraints.',
      code: `# Business Rules

## 1. Cent-Präzision & Rundung
- Alle Beträge intern in Cent (Integer) berechnen.
- Geteilte Beträge abrunden; verbleibende Rest-Cents 
  werden reihum auf die ersten Begünstigten verteilt.
  Summe der Anteile MUSS exakt 'amount' ergeben.

## 2. Schulden-Minimierung (Min-Cash-Flow)
- Keine Zirkelschulden (A zahlt B, B zahlt A).
- Greedy-Algorithmus: Größter Gläubiger wird mit 
  größtem Schuldner verrechnet bis alle Salden = 0.`,
    },
    {
      id: 'scenarios',
      filename: '03_scenarios.md',
      title: '3. Edge Cases & Tests',
      icon: 'checklist',
      badge: 'Validierung',
      color: 'amber',
      desc: 'Konkrete Testfälle und Grenzbedingungen, die die KI bestehen muss.',
      code: `# Akzeptanz-Szenarien

## Szenario A: Ungerade Beträge
- Input: 100,00 € aufgeteilt auf 3 Personen
- Erwartetes Ergebnis:
  * Person 1: 33,34 €
  * Person 2: 33,33 €
  * Person 3: 33,33 €
  * Summe: exakt 100,00 €

## Szenario B: Ungültige Eingaben
- Input: Personenanzahl = 0 oder Betrag = 0
- Verhalten: Fehler-Hinweis; Button deaktiviert`,
    },
    {
      id: 'prompt',
      filename: '04_prompt.md',
      title: '4. KI-Direktive',
      icon: 'smart_toy',
      badge: 'Prompt',
      color: 'purple',
      desc: 'Die präzise Anweisung, mit der die KI den Anwendungscode generiert.',
      code: `# Prompt an das KI-Tool

"Setze die Anwendung exakt gemäß der Spezifikation 
in .openspec/ um. 

Regeln:
1. Halte dich strikt an die Datentypen aus 01_data-model.md.
2. Wende ausnahmslos die Rundungsformel aus 02_rules.md an.
3. Teste deinen Code gegen alle Testfälle in 03_scenarios.md.
Erstelle erst UI und Code, wenn alle Regeln erfüllt sind."`,
    },
  ];

  const currentFile = fileCards.find((f) => f.id === activeTab) || fileCards[0];

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between overflow-x-hidden bg-dot-pattern">
      {/* Header */}
      <header className="relative z-20 pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-50 border border-zinc-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-700 shadow-sm mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Der Ordner .openspec/</span>
          <span className="text-zinc-300">•</span>
          <span>Der Bauplan vor dem Code</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-3">
          Die OpenSpec-Dateistruktur
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Eine Spezifikation ist keine 50-seitige Word-Datei. Sie besteht aus 3–4 fokussierten
          Markdown-Dateien, die Mensch und KI gemeinsam verstehen.
        </p>
      </header>

      {/* Main Content Area: Interactive File Explorer */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 4 File Cards */}
          <div className="lg:col-span-5 space-y-3">
            {fileCards.map((file) => {
              const isActive = file.id === activeTab;
              return (
                <div
                  key={file.id}
                  onClick={() => setActiveTab(file.id as any)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none text-left ${
                    isActive
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg scale-[1.02]'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        name={file.icon}
                        className={`text-xl ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`}
                      />
                      <span className="font-bold text-sm">{file.title}</span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                        isActive ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {file.filename}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {file.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Code / Markdown Preview */}
          <div className="lg:col-span-7 bg-zinc-950 text-zinc-100 rounded-3xl p-6 sm:p-7 shadow-2xl border border-zinc-800 flex flex-col justify-between min-h-[460px]">
            <div>
              {/* Window Controls & Filename */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-xs font-mono text-zinc-400 ml-2">
                    .openspec/{currentFile.filename}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-md">
                  Markdown Spec
                </span>
              </div>

              {/* Code Snippet */}
              <pre className="font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed overflow-x-auto selection:bg-cyan-500/30">
                <code>{currentFile.code}</code>
              </pre>
            </div>

            {/* Bottom Insight Footer */}
            <div className="pt-4 border-t border-zinc-850 mt-6 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <MaterialIcon name="verified" className="text-emerald-400 text-sm" />
                <span>Für KI und Entwickler gleichermaßen lesbar</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">UTF-8 • Markdown</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Sticky Action Bar: Schwarzer Button */}
      <footer className="relative z-30 p-6 max-w-6xl mx-auto w-full flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700 shadow-sm flex items-center gap-1.5"
        >
          <MaterialIcon name="arrow_back" className="text-sm" />
          <span>Zurück zum Konzept</span>
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3.5 bg-zinc-900 hover:bg-black text-white font-bold text-sm rounded-full shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 ring-4 ring-zinc-900/10"
        >
          <span>Weiter zu Phase 2 (Dieselbe Aufgabe mit OpenSpec)</span>
          <MaterialIcon name="arrow_forward" className="text-base" />
        </button>
      </footer>
    </div>
  );
};
