export type DifficultyLevel = 'leicht' | 'mittel' | 'schwer';

export interface WorkshopTask {
  id: string;
  number: number;
  title: string;
  category: DifficultyLevel;
  difficultyLabel: 'Leicht' | 'Mittel' | 'Schwer';
  badgeColor: {
    border: string;
    borderActive: string;
    bgBadge: string;
    textBadge: string;
    borderBadge: string;
    glow: string;
    accentDot: string;
  };
  goal: string;
  scenario?: string;
  vibeFocus: string;
  specFocus: string;
  icon: string;
  tags: string[];
}

export const WORKSHOP_TASKS: WorkshopTask[] = [
  // --- LEICHTE PROBLEME (GRÜN) ---
  {
    id: 'task-1',
    number: 1,
    title: 'Retro Pomodoro & Task Ticker',
    category: 'leicht',
    difficultyLabel: 'Leicht',
    badgeColor: {
      border: 'border-emerald-500',
      borderActive: 'border-emerald-600 ring-4 ring-emerald-500/20',
      bgBadge: 'bg-emerald-50',
      textBadge: 'text-emerald-700',
      borderBadge: 'border-emerald-200',
      glow: 'shadow-emerald-500/15',
      accentDot: 'bg-emerald-500',
    },
    scenario: 'Fokus-Tool am Entwickler-Arbeitsplatz für konzentrierte 25-Minuten-Sprints mit Pause.',
    goal: 'Ein 25/5-Minuten-Timer mit einfacher Task-Liste, bei dem der jeweils aktive Task visuell hervorgehoben wird.',
    vibeFocus: 'Schnelles Styling, Soundeffekte via Browser-Audio-API und intuitive Controls (Start/Pause/Reset).',
    specFocus: 'Zustandskonsistenz bei Timer-Ablauf, Wechsel zwischen Intervallen und Drift-Prävention bei Hintergrund-Tabs (Timestamp-Differenz statt setInterval).',
    icon: 'timer',
    tags: ['Timer', 'Audio API', 'State-Konsistenz'],
  },
  {
    id: 'task-2',
    number: 2,
    title: 'Quick Split: Rechnungs- & Trinkgeldrechner',
    category: 'leicht',
    difficultyLabel: 'Leicht',
    badgeColor: {
      border: 'border-emerald-500',
      borderActive: 'border-emerald-600 ring-4 ring-emerald-500/20',
      bgBadge: 'bg-emerald-50',
      textBadge: 'text-emerald-700',
      borderBadge: 'border-emerald-200',
      glow: 'shadow-emerald-500/15',
      accentDot: 'bg-emerald-500',
    },
    scenario: 'Gemeinsames Team-Mittagessen – Rechnungsbetrag und Trinkgeld müssen pro Kopf aufgeteilt werden.',
    goal: 'Gesamtsumme, Trinkgeld-Prozentsatz (Buttons + Custom Input) und Personenanzahl eingeben; Ausgabe pro Kopf in Echtzeit berechnen.',
    vibeFocus: 'Saubere Slider, dynamische Formatierung und runde Gesamtsummen für flüssiges User-Gefühl.',
    specFocus: 'Rundungsdifferenzen (z. B. 100 € auf 3 Personen = 33,33 € vs. Restcent-Verteilung) und Validierung bei 0 Personen oder negativen Zahlen.',
    icon: 'receipt_long',
    tags: ['Finanzen', 'Rundungslogik', 'Validierung'],
  },
  {
    id: 'task-3',
    number: 3,
    title: 'Markdown Sticky-Notes Board',
    category: 'leicht',
    difficultyLabel: 'Leicht',
    badgeColor: {
      border: 'border-emerald-500',
      borderActive: 'border-emerald-600 ring-4 ring-emerald-500/20',
      bgBadge: 'bg-emerald-50',
      textBadge: 'text-emerald-700',
      borderBadge: 'border-emerald-200',
      glow: 'shadow-emerald-500/15',
      accentDot: 'bg-emerald-500',
    },
    scenario: 'Digitales Retro- und Notiz-Board für Post-its während des gemeinsamen Team-Meetings.',
    goal: 'Ein interaktives Board für farbige Post-it-Notizen mit Live-Markdown-Vorschau und Löschfunktion.',
    vibeFocus: 'Drag-and-Drop-Feeling, Farbpaletten-Auswahl und sofortige visuelle Reaktion.',
    specFocus: 'Datenspeicherung im LocalStorage (deterministisches Key/Value-Schema) und striktes Escaping von unsicherem HTML/XSS bei gerendertem Markdown.',
    icon: 'sticky_note_2',
    tags: ['Markdown', 'LocalStorage', 'XSS-Schutz'],
  },
  {
    id: 'task-4',
    number: 4,
    title: 'Team Decision Roulette / Glücksrad',
    category: 'leicht',
    difficultyLabel: 'Leicht',
    badgeColor: {
      border: 'border-emerald-500',
      borderActive: 'border-emerald-600 ring-4 ring-emerald-500/20',
      bgBadge: 'bg-emerald-50',
      textBadge: 'text-emerald-700',
      borderBadge: 'border-emerald-200',
      glow: 'shadow-emerald-500/15',
      accentDot: 'bg-emerald-500',
    },
    scenario: 'Schnelle Entscheidungshilfe für das Team bei der Essenswahl oder Task-Zuweisung.',
    goal: 'Liste von Optionen eingeben (z. B. "Wo essen wir?"), Button klicken, ein animiertes Rad oder Zufalls-Highlight stoppt auf einer Option.',
    vibeFocus: 'Schöne CSS-Spinning-Animation und Konfetti-Effekt beim Gewinner.',
    specFocus: 'Saubere Randomisierung (Gleichverteilung), Leereingaben-Handling und Deaktivierung des Buttons während der Drehanimation.',
    icon: 'casino',
    tags: ['Zufall', 'CSS Animation', 'Input-Guard'],
  },

  // --- MITTLERE PROBLEME (GELB) ---
  {
    id: 'task-5',
    number: 5,
    title: 'Flashcard Leitner-Box (3-Kasten)',
    category: 'mittel',
    difficultyLabel: 'Mittel',
    badgeColor: {
      border: 'border-amber-400',
      borderActive: 'border-amber-500 ring-4 ring-amber-400/20',
      bgBadge: 'bg-amber-50',
      textBadge: 'text-amber-800',
      borderBadge: 'border-amber-200',
      glow: 'shadow-amber-500/15',
      accentDot: 'bg-amber-500',
    },
    scenario: 'Wissens- und Vokabeltraining für das Team nach dem 3-Kasten-Wiederholungsprinzip.',
    goal: 'Vokabel- & Lernkarten-App nach dem 3-Kasten-Prinzip: Gewusst → Kasten hoch; Nicht gewusst → zurück in Kasten 1.',
    vibeFocus: 'Schöne Flip-Card-Animation (CSS 3D-Transform) und farbiger Fortschrittsbalken.',
    specFocus: 'Eindeutige Zustandsübergänge der Karten zwischen Boxen, Filterlogik ("Welche Box ist heute fällig?") und Im-/Export als JSON.',
    icon: 'school',
    tags: ['Leitner-Box', 'State Transitions', 'JSON Export'],
  },
  {
    id: 'task-6',
    number: 6,
    title: 'Sprint Planning Poker Room',
    category: 'mittel',
    difficultyLabel: 'Mittel',
    badgeColor: {
      border: 'border-amber-400',
      borderActive: 'border-amber-500 ring-4 ring-amber-400/20',
      bgBadge: 'bg-amber-50',
      textBadge: 'text-amber-800',
      borderBadge: 'border-amber-200',
      glow: 'shadow-amber-500/15',
      accentDot: 'bg-amber-500',
    },
    scenario: 'Agile Aufwandsschätzung (Fibonacci) für 5 Gruppenmitglieder mit verdeckter Stimmabgabe.',
    goal: 'Tool für 5 Teammitglieder, um verdeckt Story Points (Fibonacci) abzustimmen und gleichzeitig aufzudecken.',
    vibeFocus: 'Karten-Deck-UI, Verdeckt-Status, Aufdeck-Animation und automatische Durchschnittsberechnung.',
    specFocus: 'Konsens-Erkennung (alle haben dieselbe Zahl gestimmt → Erfolgsstatus) und Umgang mit Sonderwerten ("?", "Kaffeebecher").',
    icon: 'style',
    tags: ['Planning Poker', 'Fibonacci', 'Konsens-Erkennung'],
  },
  {
    id: 'task-7',
    number: 7,
    title: 'Multi-Stop Spesen- & Fahrtkosten-Tracker',
    category: 'mittel',
    difficultyLabel: 'Mittel',
    badgeColor: {
      border: 'border-amber-400',
      borderActive: 'border-amber-500 ring-4 ring-amber-400/20',
      bgBadge: 'bg-amber-50',
      textBadge: 'text-amber-800',
      borderBadge: 'border-amber-200',
      glow: 'shadow-amber-500/15',
      accentDot: 'bg-amber-500',
    },
    scenario: 'Abrechnung einer Geschäftsreise mit Start, Ziel, Zwischenstopps und Pauschalen.',
    goal: 'Eingabe von Start, Ziel, Zwischenstopps, Kilometerpauschale und Verpflegungsmehraufwand (Tagespauschale).',
    vibeFocus: 'Schnelles Hinzufügen/Löschen von Stopps und tabellarische Live-Summenübersicht.',
    specFocus: 'Berechnungsregeln bei Abwesenheitszeiten (< 8h, 8–24h, > 24h), Validierung von Reisedaten und chronologische Reihenfolge.',
    icon: 'commute',
    tags: ['Spesen', 'Fahrtkosten', 'Chronologie'],
  },
  {
    id: 'task-8',
    number: 8,
    title: 'Habit Streak & Heatmap Tracker',
    category: 'mittel',
    difficultyLabel: 'Mittel',
    badgeColor: {
      border: 'border-amber-400',
      borderActive: 'border-amber-500 ring-4 ring-amber-400/20',
      bgBadge: 'bg-amber-50',
      textBadge: 'text-amber-800',
      borderBadge: 'border-amber-200',
      glow: 'shadow-amber-500/15',
      accentDot: 'bg-amber-500',
    },
    scenario: 'Tägliches Abhaken von 3 Team-Gewohnheiten mit 4-Wochen-Heatmap-Visualisierung.',
    goal: '3 tägliche Gewohnheiten abhaken mit GitHub-ähnlicher 4-Wochen-Kästchen-Visualisierung.',
    vibeFocus: 'Responsive Grid-Ansicht und dynamische Farbintensität basierend auf erledigten Habits pro Tag.',
    specFocus: 'Datumsarithmetik (Tageswechsel, Zeitzonen) und präzise Definition von "Streak" (zählt heute schon als unterbrochen, wenn noch nicht abgehakt?).',
    icon: 'calendar_month',
    tags: ['Heatmap', 'Streak-Arithmetik', 'Zeitzonen'],
  },

  // --- SCHWERE PROBLEME (ROT) ---
  {
    id: 'task-9',
    number: 9,
    title: 'Ausgaben-Ausgleich für Gruppenreisen (Mini-Splitwise)',
    category: 'schwer',
    difficultyLabel: 'Schwer',
    badgeColor: {
      border: 'border-rose-500',
      borderActive: 'border-rose-600 ring-4 ring-rose-500/20',
      bgBadge: 'bg-rose-50',
      textBadge: 'text-rose-700',
      borderBadge: 'border-rose-200',
      glow: 'shadow-rose-500/15',
      accentDot: 'bg-rose-500',
    },
    scenario: '5 Personen machen einen Wochenendausflug. Person A zahlt Unterkunft, B zahlt Abendessen für A, B & C, D den Sprit. Wer schuldet wem wie viel?',
    goal: 'Erfassen von geteilten Ausgaben und automatische Berechnung der minimalen Transaktionen zum Schuldenausgleich (z. B. "B zahlt 24 € an A" statt 10 Überweisungen im Kreis).',
    vibeFocus: 'Hübsche Eingabemasken und Saldenlisten. Beim eigentlichen Schuldenschnitt verheddert sich freies Prompting: Beträge verschwinden oder Zirkelschulden bleiben.',
    specFocus: 'Striktes Datenmodell (Expense, Participant, Balance) und deterministischer Min-Cash-Flow-Algorithmus zur Transaktionsminimierung ohne Cent-Verluste.',
    icon: 'account_balance',
    tags: ['Min-Cash-Flow', 'Schuldenschnitt', 'Graph-Reduktion'],
  },
  {
    id: 'task-10',
    number: 10,
    title: 'Vereins-Schichtplaner mit Mindestbesetzung & Fairness',
    category: 'schwer',
    difficultyLabel: 'Schwer',
    badgeColor: {
      border: 'border-rose-500',
      borderActive: 'border-rose-600 ring-4 ring-rose-500/20',
      bgBadge: 'bg-rose-50',
      textBadge: 'text-rose-700',
      borderBadge: 'border-rose-200',
      glow: 'shadow-rose-500/15',
      accentDot: 'bg-rose-500',
    },
    scenario: 'Für ein Vereinsfest müssen Helfer für 4 Stationen (Grill, Kasse, Einlass, Abbau) eingeteilt werden. 10 Personen tragen Verfügbarkeiten und Wünsche ein.',
    goal: 'Automatische Zuteilung unter Randbedingungen: Jede Station besetzt, niemand zwei Schichten hintereinander, gleichmäßige Belastung.',
    vibeFocus: 'KI teilt im Freistil gerne dieselben hilfsbereiten Personen mehrfach ein, ignoriert Pausenzeiten oder übersieht Notfall-Flags.',
    specFocus: 'Klare Unterscheidung von Hard Constraints (max. 1 Schicht pro Person) vs. Soft Constraints (Wunschstation) und deterministische Validierungsmatrix.',
    icon: 'badge',
    tags: ['Constraint Solver', 'Fairness-Score', 'Schichtplan'],
  },
  {
    id: 'task-11',
    number: 11,
    title: 'Smartes Raum- & Ressourcen-Buchungssystem',
    category: 'schwer',
    difficultyLabel: 'Schwer',
    badgeColor: {
      border: 'border-rose-500',
      borderActive: 'border-rose-600 ring-4 ring-rose-500/20',
      bgBadge: 'bg-rose-50',
      textBadge: 'text-rose-700',
      borderBadge: 'border-rose-200',
      glow: 'shadow-rose-500/15',
      accentDot: 'bg-rose-500',
    },
    scenario: 'Im Büro gibt es 2 Konferenzräume und 1 mobilen Beamer. Teams buchen Zeitfenster; manche Termine brauchen den Beamer, manche nur den Raum.',
    goal: 'Buchungsmaske mit automatischer Konflikterkennung, Beamer-Abgleich und Ausweichvorschlag (Raum A besetzt → Raum B vorschlagen).',
    vibeFocus: 'Zeitintervall-Prüfungen gehen bei freiem Prompten regelmäßig schief (Grenzfälle wie: "Meeting endet um 14:00, nächstes startet um 14:00" wird als Kollision gewertet).',
    specFocus: 'Exakte Kollisionsformel (start1 < end2 && end1 > start2), Datumsvalidierung und klar typisierte Statuscodes (CONFIRMED, CONFLICT_ROOM, CONFLICT_RESOURCE).',
    icon: 'meeting_room',
    tags: ['Intervall-Kollision', 'Ressourcen-Lock', 'Edge Cases'],
  },
  {
    id: 'task-12',
    number: 12,
    title: 'Automatische Mitfahr- & Fahrgemeinschafts-Planung',
    category: 'schwer',
    difficultyLabel: 'Schwer',
    badgeColor: {
      border: 'border-rose-500',
      borderActive: 'border-rose-600 ring-4 ring-rose-500/20',
      bgBadge: 'bg-rose-50',
      textBadge: 'text-rose-700',
      borderBadge: 'border-rose-200',
      glow: 'shadow-rose-500/15',
      accentDot: 'bg-rose-500',
    },
    scenario: '8 Personen wollen zu einem Event. Manche bieten Auto mit 2–4 Plätzen an, andere brauchen Mitfahrgelegenheit. 2 Sammelpunkte (Hbf, P&R).',
    goal: 'Optimale Zuteilung von Mitfahrern auf Autos, sodass minimale Fahrzeuganzahl fährt und kein Auto überbucht wird.',
    vibeFocus: 'Nette Karten-/Listenübersicht, füllt aber Autos über Kapazitätsgrenzen oder teilt Mitfahrer falschen Treffpunkten zu.',
    specFocus: 'Bin-Packing-/Knapsack-Zuweisung, geordnete Zuweisungsstufen und eindeutiger Unassigned-Pool bei Kapazitätsengpässen.',
    icon: 'directions_car',
    tags: ['Bin-Packing', 'Kapazitätsgrenzen', 'Sammelpunkte'],
  },

  // --- ZUSÄTZLICHE SCHWERE PROBLEME AUS DEM WORKSHOP-DOKUMENT ---
  {
    id: 'task-13',
    number: 13,
    title: 'Secret Santa / Wichtel-Generator mit Restriktionen',
    category: 'schwer',
    difficultyLabel: 'Schwer',
    badgeColor: {
      border: 'border-rose-500',
      borderActive: 'border-rose-600 ring-4 ring-rose-500/20',
      bgBadge: 'bg-rose-50',
      textBadge: 'text-rose-700',
      borderBadge: 'border-rose-200',
      glow: 'shadow-rose-500/15',
      accentDot: 'bg-rose-500',
    },
    scenario: 'Team-Wichteln zur Firmenfeier mit Restriktionen (z. B. Partner darf Partner nicht ziehen).',
    goal: 'Namen eingeben, Ausschlusskriterien definieren (z. B. "Partner darf nicht Partner ziehen") und Zuteilungen generieren.',
    vibeFocus: 'Formular mit dynamischen Dropdowns für Ausschlüsse und verdeckte Ergebnis-Karten pro Person.',
    specFocus: 'Backtracking-Algorithmus gegen Deadlocks (wenn der letzte Verbleibende nur noch sich selbst ziehen könnte) und Unlösbarkeits-Erkennung.',
    icon: 'redeem',
    tags: ['Backtracking', 'Deadlock-Vermeidung', 'Permutation'],
  },
  {
    id: 'task-14',
    number: 14,
    title: 'Regelbasierter Meeting-Slot-Finder',
    category: 'schwer',
    difficultyLabel: 'Schwer',
    badgeColor: {
      border: 'border-rose-500',
      borderActive: 'border-rose-600 ring-4 ring-rose-500/20',
      bgBadge: 'bg-rose-50',
      textBadge: 'text-rose-700',
      borderBadge: 'border-rose-200',
      glow: 'shadow-rose-500/15',
      accentDot: 'bg-rose-500',
    },
    scenario: 'Abstimmung eines gemeinsamen freien 45-Minuten-Zeitfensters für 3 vielbeschäftigte Kollegen.',
    goal: 'Verfügbarkeiten von 3 Personen erfassen (Start-/Endzeiten als Blöcke) und gemeinsame freie Schnittmengen finden.',
    vibeFocus: 'Interaktiver Kalender-Grid (9:00 bis 17:00 Uhr) mit farbigen Personen-Blöcken.',
    specFocus: 'Interval-Intersection-Algorithmus (Überlappungslogik), Pufferzeiten zwischen Meetings und Sortierung fragmentierter Fenster.',
    icon: 'schedule',
    tags: ['Interval-Intersection', 'Pufferzeiten', 'Slot-Finder'],
  },
  {
    id: 'task-15',
    number: 15,
    title: 'Mini-Kassensystem (POS) mit Rabattstaffeln',
    category: 'schwer',
    difficultyLabel: 'Schwer',
    badgeColor: {
      border: 'border-rose-500',
      borderActive: 'border-rose-600 ring-4 ring-rose-500/20',
      bgBadge: 'bg-rose-50',
      textBadge: 'text-rose-700',
      borderBadge: 'border-rose-200',
      glow: 'shadow-rose-500/15',
      accentDot: 'bg-rose-500',
    },
    scenario: 'Kiosk- und Snackverkauf im Büro mit Rabattstaffeln, Mehrwertsteuer und Bon-Ausgabe.',
    goal: 'Warenkorb mit Produkten, prozentualen Gutscheincodes, "Nimm 3 zahl 2"-Aktionen und Belegdruck.',
    vibeFocus: 'Kachel-Auswahl für Produkte mit Bildern/Icons, Slide-over-Warenkorb und druckoptimierte Quittung.',
    specFocus: 'Reihenfolge der Rabattanwendung (erst Mengenrabatt oder erst Prozentgutschein?), Steuersätze (7 % vs. 19 %) und Cent-Rundungslogik.',
    icon: 'point_of_sale',
    tags: ['POS', 'Rabatt-Reihenfolge', 'Steuerberechnung'],
  },
  {
    id: 'task-16',
    number: 16,
    title: 'Board Game Round-Robin Turnierplaner',
    category: 'schwer',
    difficultyLabel: 'Schwer',
    badgeColor: {
      border: 'border-rose-500',
      borderActive: 'border-rose-600 ring-4 ring-rose-500/20',
      bgBadge: 'bg-rose-50',
      textBadge: 'text-rose-700',
      borderBadge: 'border-rose-200',
      glow: 'shadow-rose-500/15',
      accentDot: 'bg-rose-500',
    },
    scenario: 'Kicker- oder Tischtennis-Turnier in der Mittagspause mit automatischer Tabelle und Paarungen.',
    goal: '4–8 Spieler eingeben; Paarungen über X Runden generieren, sodass jeder gegen jeden spielt, inklusive Live-Tabelle.',
    vibeFocus: 'Interaktives Score-Board, schnelles Eintragen von Gewinnern/Punkten und animierte Rangliste.',
    specFocus: 'Berger-System / Paarungsalgorithmus für ungerade Spielerzahlen (Freilose/Byes) und Tie-Breaker-Regeln.',
    icon: 'emoji_events',
    tags: ['Berger-System', 'Round-Robin', 'Tie-Breaker'],
  },
];

// Helper to distribute tasks across 3 wildly mixed columns
export function getWildlySortedColumns(): [WorkshopTask[], WorkshopTask[], WorkshopTask[]] {
  // A curated wild mix so every column gets a varied mix of green, yellow and red
  const col1Order = [1, 9, 5, 2, 11, 6, 13, 3];
  const col2Order = [10, 3, 7, 12, 4, 8, 14, 15];
  const col3Order = [2, 11, 4, 9, 8, 1, 16, 6];

  const byId = new Map(WORKSHOP_TASKS.map((t) => [t.number, t]));

  const col1 = col1Order.map((num) => byId.get(num)!).filter(Boolean);
  const col2 = col2Order.map((num) => byId.get(num)!).filter(Boolean);
  const col3 = col3Order.map((num) => byId.get(num)!).filter(Boolean);

  return [col1, col2, col3];
}
