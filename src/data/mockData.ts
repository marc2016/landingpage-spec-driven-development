export type DimensionKey = 'A' | 'B' | 'C' | 'D';

export interface PreparedCard {
  id: string;
  title: string;
  text: string;
}

export interface DimensionInfo {
  id: DimensionKey;
  code: string;
  title: string;
  shortTitle: string;
  plenum1Question: string;
  plenum2Question: string;
  vibeProblemTitle: string;
  vibeProblemDesc: string;
  sddSolutionTitle: string;
  sddSolutionDesc: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  preparedPainCards: PreparedCard[];
  preparedSolutionCards: PreparedCard[];
  defaultPainQuotes: string[];
  defaultSolutionQuotes: string[];
}

export interface PostItItem {
  id: string;
  phase: 1 | 2; // 1 = Erstes Plenum (Schmerz/Vibe), 2 = Zweites Plenum (Lösung/SDD)
  dimension: DimensionKey;
  text: string;
  author?: string;
  color: 'yellow' | 'pink' | 'cyan' | 'green';
  createdAt: number;
}

export const WORKSHOP_DIMENSIONS: DimensionInfo[] = [
  {
    id: 'A',
    code: 'Dimension A',
    title: 'A. Wartbarkeit & Langzeit-Codequalität',
    shortTitle: 'Wartbarkeit & Qualität',
    plenum1Question: 'Was passiert mit der Wartbarkeit, wenn der Code ohne Architekturvorgaben entsteht?',
    plenum2Question: 'Wie stellt Spec-Driven Development sicher, dass der Code auch nach Monaten wartbar bleibt?',
    vibeProblemTitle: 'Black-Box-Code ohne Kontext & Historie',
    vibeProblemDesc:
      'Entstehung von unkontrolliertem „Black-Box“-Code. Nach wenigen Wochen ist unklar, welche Annahmen, Randbedingungen oder Kontextinformationen zu bestimmten Implementierungen geführt haben.',
    sddSolutionTitle: 'Design-Historie direkt im Repository',
    sddSolutionDesc:
      'Durch Proposal- und Archiv-Dokumentationen bleibt die Design-Historie direkt im Repository erhalten. Jeder Entwickler (und jede KI) versteht den Kontext auch Monate später sofort.',
    accentColor: 'from-rose-500 to-red-600',
    badgeBg: 'bg-rose-500/10',
    badgeBorder: 'border-rose-500/30',
    badgeText: 'text-rose-400',
    preparedPainCards: [
      {
        id: 'p-a-1',
        title: 'Black-Box-Effekt',
        text: 'Nach 2-3 Wochen traut sich niemand mehr den generierten Code anzufassen, weil niemand die impliziten Abhängigkeiten kennt.',
      },
      {
        id: 'p-a-2',
        title: 'Verlorener Prompt-Kontext',
        text: 'Niemand weiß mehr, welcher Chat-Prompt zu welchem Codeblock geführt hat – das Wissen ist im Chatfenster verpufft.',
      },
      {
        id: 'p-a-3',
        title: 'Fehlende Architekturvorgaben',
        text: 'Die KI erfindet für jedes Sub-Feature einen anderen Programmierstil oder nutzt ungefragt willkürliche Hilfsbibliotheken.',
      },
    ],
    preparedSolutionCards: [
      {
        id: 's-a-1',
        title: 'proposal.md als Absichtserklärung',
        text: 'Ziele, Nicht-Ziele und Kontext werden VOR dem Coden niedergeschrieben und versioniert.',
      },
      {
        id: 's-a-2',
        title: 'Archivierung in specs/archive/',
        text: 'Jede Änderung hinterlässt einen lückenlosen Audit-Trail direkt im Git-Repository.',
      },
      {
        id: 's-a-3',
        title: 'Mensch & KI teilen denselben Kontext',
        text: 'Neue Teammitglieder oder KI-Agenten lesen die Spec und verstehen die Software sofort.',
      },
    ],
    defaultPainQuotes: [
      '„Nach 3 Wochen traut sich niemand mehr den Code anzufassen.“',
      '„Keine Ahnung warum die KI diese Library eingebaut hat.“',
      '„Keine Dokumentation der Architektur.“',
    ],
    defaultSolutionQuotes: [
      '„proposal.md und design.md dokumentieren jede Entscheidung.“',
      '„Im Git-Log sieht man genau die Absicht hinter dem Code.“',
    ],
  },
  {
    id: 'B',
    code: 'Dimension B',
    title: 'B. Skalierbarkeit & Teamarbeit',
    shortTitle: 'Skalierbarkeit & Team',
    plenum1Question: 'Was passiert, wenn mehrere Entwickler oder autonome KI-Agenten parallel ohne Spezifikation arbeiten?',
    plenum2Question: 'Wie ermöglicht OpenSpec reibungslose Kollaboration zwischen Teams und autonomen KI-Agenten?',
    vibeProblemTitle: 'Teams & KI-Agenten arbeiten aneinander vorbei',
    vibeProblemDesc:
      'Ohne gemeinsame Architektur- oder Funktionsvorgaben arbeiten mehrere Entwickler oder autonome KI-Agenten (z. B. in parallelen Chats) aneinander vorbei, was zu redundantem oder widersprüchlichem Code führt.',
    sddSolutionTitle: 'Gemeinsame Single Source of Truth',
    sddSolutionDesc:
      'Klare Schnittstellen- und Aufgabendefinitionen ermöglichen reibungslose Kollaboration zwischen Menschen und autonomen Agenten, da alle auf Basis derselben exakten Spezifikation arbeiten.',
    accentColor: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/30',
    badgeText: 'text-amber-400',
    preparedPainCards: [
      {
        id: 'p-b-1',
        title: 'Parallele Agenten-Kollisionen',
        text: 'Zwei Entwickler oder KI-Chats erfinden dieselbe Hilfsfunktion doppelt oder mit inkompatiblen Parametern.',
      },
      {
        id: 'p-b-2',
        title: 'Unlösbare Merge-Konflikte',
        text: 'KI-Prompts formatieren ganze Dateien um – Git-Diffs sind 1.000 Zeilen lang und nicht mehr reviewbar.',
      },
      {
        id: 'p-b-3',
        title: 'Kein gemeinsames Zielbild',
        text: 'Entwickler A baut auf REST, während Agent B in derselben Datei plötzlich GraphQL-Typen einstreut.',
      },
    ],
    preparedSolutionCards: [
      {
        id: 's-b-1',
        title: 'tasks.md als Arbeitsvertrag',
        text: 'Atomare Aufgaben verhindern, dass sich zwei Entwickler oder Agenten in die Quere kommen.',
      },
      {
        id: 's-b-2',
        title: 'Reviewbare Delta-Specs',
        text: 'Im Pull Request reviewt das Team zuerst die Markdown-Spec, erst danach den Code-Diff.',
      },
      {
        id: 's-b-3',
        title: 'Deterministische Schnittstellen',
        text: 'Klare RFC-2119 Vorgaben stellen sicher, dass alle Agenten denselben Contract einhalten.',
      },
    ],
    defaultPainQuotes: [
      '„Zwei KI-Chats haben dieselbe Funktion doppelt erfunden.“',
      '„Entwickler A und Agent B überschreiben sich gegenseitig den State.“',
      '„Merge-Konflikte im PR sind kaum noch auflösbar.“',
    ],
    defaultSolutionQuotes: [
      '„Klarer Vertrag: tasks.md verhindert Doppelarbeit.“',
      '„Jeder Pull Request referenziert die verifizierte Spec.“',
    ],
  },
  {
    id: 'C',
    code: 'Dimension C',
    title: 'C. Debugging & Fehlersuche',
    shortTitle: 'Debugging & Fixes',
    plenum1Question: 'Wie läuft die Fehlersuche ab, wenn man nur mit „Fix this“-Prompts arbeitet?',
    plenum2Question: 'Wie verwandelt Spec-Driven Development blindes Raten in systematische Fehlerbehebung?',
    vibeProblemTitle: '„Fix this“-Endlosschleife & Regressionen',
    vibeProblemDesc:
      'Fehlersuche artet in eine Endlosschleife aus oberflächlichen „Fix this“-Prompts aus, wodurch oft neue Bugs erzeugt statt ursächliche Probleme behoben werden.',
    sddSolutionTitle: 'Soll-Ist-Abgleich gegen formale Spezifikation',
    sddSolutionDesc:
      'Ein systematischer Soll-Ist-Abgleich gegen die formale Spezifikation statt blindem Raten. Bugs werden an der Wurzel behoben, weil das erwartete Verhalten exakt definiert ist.',
    accentColor: 'from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/30',
    badgeText: 'text-purple-400',
    preparedPainCards: [
      {
        id: 'p-c-1',
        title: 'Die „Fix-This“-Endlosschleife',
        text: 'Prompt: „Fix bug A“. Die KI repariert A, zerstört dabei aber unbemerkt Funktion B. 10 Prompts später ist der Code doppelt so lang.',
      },
      {
        id: 'p-c-2',
        title: 'Symptom-Pflaster statt Ursachenbehebung',
        text: 'Die KI flickt ein try/catch oder einen Fallback um den Fehler herum, statt die Ursache im Datenfluss anzugehen.',
      },
      {
        id: 'p-c-3',
        title: 'Kein definiertes Soll-Verhalten',
        text: 'Weil nirgends steht, wie sich die App bei Randfällen verhalten SOLL, rät die KI bei jedem Fehler neu.',
      },
    ],
    preparedSolutionCards: [
      {
        id: 's-c-1',
        title: 'Soll-Ist-Vergleich gegen Spec',
        text: 'Fehler werden an der Wurzel behoben, indem das erwartete Verhalten (MUST/MUST NOT) präzise definiert ist.',
      },
      {
        id: 's-c-2',
        title: 'Gezielte Delta-Spezifikationen',
        text: 'Bugs werden per Delta-Spec modelliert. Die KI ändert nur exakt die betroffene Invariante.',
      },
      {
        id: 's-c-3',
        title: 'Schutz vor Seiteneffekten',
        text: 'Vorhandene Spezifikationen sichern den Bestand ab und verhindern Regressionen.',
      },
    ],
    defaultPainQuotes: [
      '„Ich sage ‚Fix bug A‘ und die KI bricht dafür Funktion B.“',
      '„Nach 5 Prompts ist der Code 3-mal so lang wie vorher.“',
      '„Blindes Herumprobieren statt die Ursache zu verstehen.“',
    ],
    defaultSolutionQuotes: [
      '„RFC-2119 Anforderungen (MUST/MUST NOT) schließen Ambiguitäten aus.“',
      '„Gezielte Delta-Specs für Bugfixes statt blindem Überschreiben.“',
    ],
  },
  {
    id: 'D',
    code: 'Dimension D',
    title: 'D. Vorhersehbarkeit & Scope Creep',
    shortTitle: 'Scope & Aufwand',
    plenum1Question: 'Wie entwickeln sich Projektumfang und Code-Umfang bei rein intuitivem Prompten?',
    plenum2Question: 'Wie schützen atomare Tasks und Delta-Specs vor unkontrolliertem Ausufern?',
    vibeProblemTitle: 'Unkontrollierter Code-Bloat & Scope Creep',
    vibeProblemDesc:
      'Unkontrolliertes Wachstum der Software (Code-Bloat) und fehlende Kontrolle über Aufwände, da iterative Prompt-Zurufe den Projektumfang unbemerkt aufblähen.',
    sddSolutionTitle: 'Atomare Tasks & Delta-Leitplanken',
    sddSolutionDesc:
      'Vordefinierte Aufgabenlisten und klare Delta-Spezifikationen wirken als Leitplanken und verhindern unkontrolliertes Ausufern des Codes.',
    accentColor: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/30',
    badgeText: 'text-cyan-400',
    preparedPainCards: [
      {
        id: 'p-d-1',
        title: 'Unbemerkter Code-Bloat',
        text: 'Für ein simples Feature generiert die KI 20 neue Hilfsdateien und installiert ungefragt 3 schwere NPM-Pakete.',
      },
      {
        id: 'p-d-2',
        title: 'Scope Creep im Chat',
        text: 'Aus „kurz mal ein Feld ergänzen“ wird ein dreitägiger Umbau des Datenbankschemas, weil die KI keine Grenzen kennt.',
      },
      {
        id: 'p-d-3',
        title: 'Fehlende Aufwandskontrolle',
        text: 'Niemand kann vorhersagen, ob der nächste Prompt 5 Minuten oder 2 Tage Zeit kostet.',
      },
    ],
    preparedSolutionCards: [
      {
        id: 's-d-1',
        title: 'Verbindliche Non-Goals',
        text: 'Im proposal.md steht explizit, was die KI NICHT bauen darf – das verhindert Wildwuchs.',
      },
      {
        id: 's-d-2',
        title: 'Atomare Checkliste in tasks.md',
        text: 'Jede Aufgabe ist klar umrissen: Was nicht in der Liste steht, wird nicht implementiert.',
      },
      {
        id: 's-d-3',
        title: 'Deterministische Leitplanken',
        text: 'Delta-Specs steuern Erweiterungen zielgenau auch in bestehenden Codebasen (Brownfield).',
      },
    ],
    defaultPainQuotes: [
      '„Das Feature sollte 1 Tag dauern, jetzt sind es 2 Wochen.“',
      '„Die KI hat ungefragt 5 neue Abhängigkeiten installiert.“',
      '„Niemand weiß mehr, was eigentlich im initialen Scope war.“',
    ],
    defaultSolutionQuotes: [
      '„Non-Goals im proposal.md halten den Scope glasklar.“',
      '„Checkliste in tasks.md: Was nicht drinsteht, wird nicht gebaut.“',
    ],
  },
];

export const INITIAL_POSTITS: PostItItem[] = [];

export const PROPOSAL_MD_CONTENT = `---
title: Proposal: Bürgerantrag & Validierungs-Engine
standard: OpenSpec Spec-Driven Development (SDD)
status: PROPOSED
version: 1.0.0
---

# 1. Ziel & Kontext (Goals)
Definition einer präzisen Spezifikation für ein mehrstufiges digitales Formular mit robuster Fehlerbehandlung und State-Persistenz.

- Vollständige Nachvollziehbarkeit aller Entwurfsentscheidungen.
- Deterministischer Vertrag zwischen Mensch und KI-Agent.

## Nicht-Ziele (Non-Goals)
- Keine unkontrollierte Installation externer Bibliotheken.
- Keine automatische Freigabe ohne menschliches Code-Review.
`;

export const DESIGN_MD_CONTENT = `---
spec: design.md
component: FormEngine / SpecContract
methodology: Spec-Driven Development (SDD)
---

# Systemarchitektur & Verträge

## 1. Datenfluss & State Machine
\`\`\`
[Spezifikation] ──► [proposal.md & design.md] ──► [tasks.md]
                            │
                            ▼
              [Gezielte Code-Generierung]
                            │
                            ▼
      [Verifikation gegen RFC-2119 Anforderungen]
\`\`\`

## 2. Invarianten (MUST / MUST NOT)
- Jede Code-Änderung MUSS eine korrespondierende Task in tasks.md besitzen.
- Nicht spezifizierte Features DÜRFEN NICHT generiert werden.
`;

export const DELTA_SPEC_MD_CONTENT = `---
target: specs/features/form-validation.delta.md
operation: DELTA (ADDED / MODIFIED)
rfc: RFC-2119
---

## ADDED Requirements

### REQ-SDD-001: Deterministischer State-Vertrag
The system **MUST** serialize all draft inputs every 15 seconds. If connection drops, state **MUST** be restored without loss.

### REQ-SDD-002: Lückenlose Barrierefreiheit
All invalid inputs **MUST** link their error message via \`aria-describedby\` and programmatically shift focus to the first faulty field.
`;

export const TASKS_MD_CONTENT = [
  {
    id: 'task-1',
    title: '1. Proposal erstellen: Scope & Non-Goals verbindlich definieren',
    completed: false,
    file: 'specs/proposal.md',
  },
  {
    id: 'task-2',
    title: '2. Delta-Specs mit RFC-2119 Vorgaben (MUST/MUST NOT) anlegen',
    completed: false,
    file: 'specs/delta.md',
  },
  {
    id: 'task-3',
    title: '3. Gezielte Umsetzung entlang der atomaren Task-Liste ausführen',
    completed: false,
    file: 'src/services/formService.ts',
  },
  {
    id: 'task-4',
    title: '4. Verifikation & Archivierung in specs/archive/ durchführen',
    completed: false,
    file: 'specs/archive/2026-10-formular.md',
  },
];

export const CODE_DIFF_CONTENT = {
  fileName: 'src/services/formService.ts',
  diff: [
    { type: 'normal', text: ' export async function handleFormSubmission(payload: FormPayload): Promise<Result> {' },
    { type: 'delete', text: '-  // Vibe Coding: Unkontrollierte Annahmen der KI ohne Spezifikation' },
    { type: 'delete', text: '-  const data = await magicGuessPayload(payload);' },
    { type: 'add', text: '+  // OpenSpec REQ-SDD-001: Deterministischer State & Auto-Save' },
    { type: 'add', text: '+  await draftStore.persistSnapshot(payload.id, payload.data);' },
    { type: 'add', text: '+' },
    { type: 'add', text: '+  // OpenSpec REQ-SDD-002: Barrierefreie Validierung nach RFC-2119' },
    { type: 'add', text: '+  const errors = validateStrictSchema(payload);' },
    { type: 'add', text: '+  if (errors.length > 0) {' },
    { type: 'add', text: '+    focusFirstInvalidField(errors[0].fieldId);' },
    { type: 'add', text: '+    throw new ValidationError(errors);' },
    { type: 'add', text: '+  }' },
    { type: 'normal', text: '   return { success: true, verified: true };' },
    { type: 'normal', text: ' }' },
  ],
};

export const RAW_WORKSHOP_RESULT_PLAN2 = `**Zusammenfassung:** Bereitstellung des vollständigen Workshop-Ergebnisses als reiner Text zum einfachen Kopieren.

---

# Workshop-Ergebnis: Vibe Coding vs. Spec-Driven Development (OpenSpec)

## 1. Einstieg: Was ist Vibe Coding?

* Definition: Eine intuitive, rein prompt-gesteuerte Softwareentwicklung, bei der Features durch lockere Anweisungen ("Vibes") iterativ und ohne formale Architekturvorgaben von einer KI generiert werden.
* Charakteristika:
* Extrem hohe Geschwindigkeit in der initialen Prototypen-Phase.
* Niedrige Einstiegshürde durch rein sprachliche Interaktion.



## 2. Erstes Plenum: Analyse von Vibe Coding (Die 4 Dimensionen)

In der ersten Diskussionsrunde wurden die akuten Schwachstellen und Risiken des rein prompt-basierten Vibe Codings herausgearbeitet:

* A. Wartbarkeit & Langzeit-Codequalität
* Problem: Entstehung von unkontrolliertem "Black-Box"-Code. Nach wenigen Wochen ist unklar, welche Annahmen oder Kontextinformationen zu bestimmten Implementierungen geführt haben.


* B. Skalierbarkeit & Teamarbeit
* Problem: Ohne gemeinsame Architektur- oder Funktionsvorgaben arbeiten mehrere Entwickler oder autonome KI-Agenten (z. B. in parallelen Chats) aneinander vorbei, was zu redundantem oder widersprüchlichem Code führt.


* C. Debugging & Fehlersuche
* Problem: Fehlersuche artet in eine Endlosschleife aus oberflächlichen "Fix this"-Prompts aus, wodurch oft neue Bugs erzeugt statt ursächliche Probleme behoben werden.


* D. Vorhersehbarkeit & Scope Creep
* Problem: Unkontrolliertes Wachstum der Software (Code-Bloat) und fehlende Kontrolle über Aufwände, da iterative Prompt-Zurufe den Projektumfang unbemerkt aufblähen.



## 3. Die Lösung: Spec-Driven Development mit OpenSpec

Als systematischer Gegenentwurf dient eine strukturierte Markdown-Spezifikation als verbindliche Single Source of Truth zwischen Mensch und KI-Coding-Assistent. Der Workflow gliedert sich in folgende Schritte:

1. Proposal (Vorschlag & Design):
* Vor jeder Codezeile wird ein strukturierter Vorschlag (proposal.md, design.md, tasks.md) erzeugt.
* Die KI plant Ziel, Systemarchitektur und atomare Aufgaben im Voraus.


2. Apply (Umsetzung):
* Gezielte Code-Generierung entlang der definierten Checkliste.
* Nutzung von Delta-Specs (ADDED, MODIFIED, REMOVED), um auch bestehende Projekte (Brownfield) präzise zu steuern.


3. Archive (Abschluss & Audit):
* Nach erfolgreicher Implementierung und Verifizierung wandern die Specs ins Archiv.
* Es entsteht ein lückenloser Audit-Trail darüber, was gebaut wurde und warum.



## 4. Zweites Plenum: Reflexion & Abgleich über dieselben 4 Dimensionen

Im zweiten Plenum wurde überprüft, wie der OpenSpec-Workflow die zuvor identifizierten Schwachstellen des Vibe Codings gezielt löst:

* A. Wartbarkeit & Langzeit-Codequalität
* Lösung durch SDD: Durch Proposal- und Archiv-Dokumentationen bleibt die Design-Historie direkt im Repository erhalten. Jeder Entwickler (und jede KI) versteht den Kontext auch Monate später sofort.


* B. Skalierbarkeit & Teamarbeit
* Lösung durch SDD: Klare Schnittstellen- und Aufgabendefinitionen ermöglichen reibungslose Kollaboration zwischen Menschen und autonomen Agenten, da alle auf Basis derselben exakten Spezifikation arbeiten.


* C. Debugging & Fehlersuche
* Lösung durch SDD: Ein systematischer Soll-Ist-Abgleich gegen die formale Spezifikation statt blindem Raten. Bugs werden an der Wurzel behoben, weil das erwartete Verhalten exakt definiert ist.


* D. Vorhersehbarkeit & Scope Creep
* Lösung durch SDD: Vordefinierte Aufgabenlisten und klare Delta-Spezifikationen wirken als Leitplanken und verhindern unkontrolliertes Ausufern des Codes.
`;

export function generateExportMarkdown(postIts: PostItItem[]): string {
  let md = RAW_WORKSHOP_RESULT_PLAN2;

  const plenum1Notes = postIts.filter((p) => p.phase === 1);
  const plenum2Notes = postIts.filter((p) => p.phase === 2);

  if (plenum1Notes.length > 0 || plenum2Notes.length > 0) {
    md += `\n\n---\n\n## 5. Live gesammelte Notizen & Zurufe aus dem Workshop\n`;

    if (plenum1Notes.length > 0) {
      md += `\n### Im 1. Plenum gesammelte Schmerzpunkte (Vibe Coding):\n`;
      plenum1Notes.forEach((p) => {
        md += `- [Dimension ${p.dimension}] ${p.text} ${p.author ? `*(von ${p.author})*` : ''}\n`;
      });
    }

    if (plenum2Notes.length > 0) {
      md += `\n### Im 2. Plenum gesammelte Lösungsaspekte (Spec-Driven Development):\n`;
      plenum2Notes.forEach((p) => {
        md += `- [Dimension ${p.dimension}] ${p.text} ${p.author ? `*(von ${p.author})*` : ''}\n`;
      });
    }
  }

  return md;
}
