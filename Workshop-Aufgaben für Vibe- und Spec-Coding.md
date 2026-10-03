# **Workshop-Aufgaben für Vibe- und Spec-Coding**

[https\://gemini.google.com/app/fea66a53ed98416c](https://gemini.google.com/app/fea66a53ed98416c)

*User prompt: Für eine Breakout Session möchte ich 12 Probleme haben. 4 Schwere, 4 normale und 4 leichtere. Das Thema soll sein: Wir Vibecoden eine Anwendung und schauen wie das funktioniert. Anschließend machen wir die gleiche Anwendung über SpecDriven und schauen wir das aussieht. Die Probleme sollen also Anwendungen sein, die man binnen 20 Minuten schafft vibezu coden. Erstelle 12 solcher Probleme, die man in einer Gruppe von 5 Personen lösen kann.*

Response: Für eine 20-minütige Session eignen sich Anwendungen besonders gut, die klare Eingaben, sichtbares Feedback und einen verständlichen Regelkern haben. Der Kontrast zwischen **Vibe Coding** (intuitives Prompten, schnelles Ausprobieren, explorative UI) und **Spec-Driven Development** (präzise Datenmodelle, definierte Edge Cases, deterministische Logik) wird genau dort deutlich, wo vermeintlich simple Features unerwartete Tücken aufweisen.

Hier sind 12 kuratierte Aufgabenstellungen für 5er-Gruppen, aufgeteilt nach Komplexität.

### **Leichte Probleme (Ideal für den Einstieg in den Methodenvergleich)**

Fokus auf klar abgegrenzten State, minimale Business-Logik und sofortiges visuelles Feedback.

> 1. **Retro Pomodoro & Task Ticker**  
   * **Ziel:** Ein 25/5-Minuten-Timer mit einfacher Task-Liste (aktiver Task wird hervorgehoben).  
   * **Vibe-Coding-Fokus:** Schnelles Styling, Soundeffekte via Browser-Audio-API, intuitive Controls (Start/Pause/Reset).  
   * **Spec-Driven-Knackpunkt:** Zustandskonsistenz bei Timer-Ablauf, Wechsel zwischen Intervallen, Handling von Hintergrund-Tabs (setInterval-Drift vs. Timestamp-Differenz).  
> 2. **Quick Split: Trinkgeld- & Rechnungsrechner**  
   * **Ziel:** Gesamtsumme, Trinkgeld-Prozentsatz (Buttons \+ Custom Input) und Personenanzahl eingeben; Ausgabe pro Kopf anzeigen.  
   * **Vibe-Coding-Fokus:** Saubere Slider, dynamische Formatierung in Echtzeit, runde Gesamtsummen.  
   * **Spec-Driven-Knackpunkt:** Rundungsdifferenzen (z. B. \$100 / 3 Personen \= 33,33 € vs. Restcent-Verteilung), Validierung bei 0 Personen oder negativen Zahlen.  
> 3. **Markdown Sticky-Notes Board**  
   * **Ziel:** Ein Board für farbige Post-it-Notizen mit Live-Markdown-Vorschau und Löschfunktion.  
   * **Vibe-Coding-Fokus:** Drag-and-Drop-Feeling, Farbpaletten-Auswahl, instant Rendering.  
   * **Spec-Driven-Knackpunkt:** Datenspeicherung (Local Storage Key/Value-Schema), Escaping von unsicherem HTML/XSS bei gerendertem Markdown.  
> 4. **Team Decision Roulette / Glücksrad**  
   * **Ziel:** Liste von Optionen eingeben (z. B. "Wo essen wir?"), Button klicken, ein animiertes Rad oder Zufalls-Highlight stoppt auf einer Option.  
   * **Vibe-Coding-Fokus:** Schöne CSS-Spinning-Animation, Konfetti-Effekt bei Auswahl.  
   * **Spec-Driven-Knackpunkt:** Saubere Randomisierung (Gleichverteilung), Leereingaben-Handling, Deaktivierung des Buttons während der Drehanimation.

### **Mittlere Probleme (Mehrteilige Logik & State-Interaktionen)**

Erfordern strukturiertere Datenstrukturen und Interaktion zwischen Komponenten.

> 5. **Flashcard Leitner-Box**  
   * **Ziel:** Vokabel-/Lernkarten-App nach dem 3-Kasten-Prinzip (Gewusst → Box hoch; Nicht gewusst → Box 1).  
   * **Vibe-Coding-Fokus:** Schöne Flip-Card-Animation (CSS 3D-Transform), Fortschrittsbalken.  
   * **Spec-Driven-Knackpunkt:** Eindeutige Zustandsübergänge der Karten zwischen Boxen, Filterlogik ("Welche Box ist heute fällig?"), Export/Import als JSON.  
> 6. **Sprint Planning Poker Room (Local-Only)**  
   * **Ziel:** Ein Tool für die 5 Gruppenmitglieder, um verdeckt Story Points (Fibonacci) abzustimmen und gleichzeitig aufzudecken.  
   * **Vibe-Coding-Fokus:** Karten-Deck-UI, Verdeckt-Status, Aufdeck-Animation, automatische Durchschnittsberechnung.  
   * **Spec-Driven-Knackpunkt:** Konsens-Erkennung (alle haben dieselbe Zahl gestimmt → Erfolgsstatus), Umgang mit Sonderwerten ("?", "Kaffeebecher").  
> 7. **Multi-Stop Spesen- & Fahrtkosten-Tracker**  
   * **Ziel:** Eingabe von Start, Ziel, Zwischenstopps, Kilometerpauschale und Verpflegungsmehraufwand (Tagespauschale).  
   * **Vibe-Coding-Fokus:** Schnelles Hinzufügen/Löschen von Stopps, tabellarische Live-Summenübersicht.  
   * **Spec-Driven-Knackpunkt:** Berechnungsregeln bei Abwesenheitszeiten (\< 8h, 8–24h, \> 24h), Validierung von Reisedaten und chronologischer Reihenfolge.  
> 8. **Habit Streak & Heatmap Tracker**  
   * **Ziel:** 3 tägliche Gewohnheiten abhaken mit GitHub-ähnlicher 4-Wochen-Kästchen-Visualisierung.  
   * **Vibe-Coding-Fokus:** Responsive Grid-Ansicht, Farbintensität basierend auf erledigten Habits pro Tag.  
   * **Spec-Driven-Knackpunkt:** Datumsarithmetik (Tageswechsel, Zeitzonen), präzise Definition von "Streak" (zählt heute schon als unterbrochen, wenn noch nicht abgehakt?).

### **Schwere Probleme (Komplexere Algorithmen, Edge Cases & Data Flows)**

Hier stößt blindes Vibe Coding typischerweise an Halluzinationen oder Logikbrüche, während eine Spec klare Leitplanken setzt.

> 9. **Secret Santa / Wichtel-Generator mit Restriktionen**  
   * **Ziel:** Namen eingeben, Ausschlusskriterien definieren (z. B. "A darf nicht B ziehen") und Zuteilungen generieren.  
   * **Vibe-Coding-Fokus:** Formular mit dynamischen Dropdowns für Ausschlüsse, verdeckte Ergebnis-Karten pro Person.  
   * **Spec-Driven-Knackpunkt:** Backtracking-Algorithmus gegen Deadlocks (wenn der letzte verbleibende Ziehende nur noch sich selbst ziehen könnte), Unlösbarkeits-Erkennung.  
> 10. **Regelbasierter Meeting-Slot-Finder**  
    * **Ziel:** Verfügbarkeiten von 3 Personen eintragen (Start-/Endzeiten als Blöcke) und freie, gemeinsame Schnittmengen finden.  
    * **Vibe-Coding-Fokus:** Interaktiver Kalender-Grid / Zeitleiste (9:00 bis 17:00 Uhr) mit farbigen Personen-Blöcken.  
    * **Spec-Driven-Knackpunkt:** Interval-Intersection-Algorithmus (Überlappungslogik), Pufferzeiten zwischen Meetings, Sortierung fragmentierter Zeitfenster.  
> 11. **Mini-Kassensystem (POS) mit Rabattstaffeln & Gutscheinen**  
    * **Ziel:** Warenkorb mit Produkten, prozentualen Gutscheincodes, "Nimm 3 zahl 2"-Aktionen und PDF/Text-Belegdruck.  
    * **Vibe-Coding-Fokus:** Kachel-Auswahl für Produkte mit Bildern/Icons, Slide-over-Warenkorb, druckoptimierte Quittung.  
    * **Spec-Driven-Knackpunkt:** Reihenfolge der Rabattanwendung (erst Mengenrabatt oder erst Prozentgutschein?), Besteuerungssätze (7 % vs. 19 %) und Rundungslogik bei Centbeträgen.  
> 12. **Board Game Round-Robin Turnierplaner**  
    * **Ziel:** 4–8 Spieler eingeben; Tool generiert Spielpaarungen über X Runden, sodass jeder möglichst gegen jeden spielt, inklusive Live-Tabelle.  
    * **Vibe-Coding-Fokus:** Interaktives Score-Board, schnelles Eintragen von Gewinnern/Punkten, animierte Ranglisten-Verschiebung.  
    * **Spec-Driven-Knackpunkt:** Berger-System / Paarungsalgorithmus für ungerade Spielerzahlen (Freilose/Byes), Tie-Breaker-Regeln (direkter Vergleich vs. Punktedifferenz).

### **Empfohlener Ablauf für die 5er-Teams**

> 1. **Runde 1: Vibe Coding (20 min):** Die Gruppe formuliert grobe Prompts ("Bau mir ein Tool, das..."), iteriert rein über visuelles Testen und lässt die KI Features frei interpretieren.  
> 2. **Review (5 min):** Wo sind Bugs aufgetreten? Wo hat das Modell Logik erfunden?  
> 3. **Runde 2: Spec-Driven (20 min):** Die Gruppe definiert vor dem Coden 5 Minuten lang Datenmodell, Validierungsregeln und Edge Cases (z. B. in einer kurzen Markdown-Spec) und übergibt diese als Kontext an das Tool.

---

*User prompt: Also die schweren Probleme finde ich irgendwie nicht so alltagstauglich. Nenne dafür 4 neue für die schweren.*

Response: Hier sind 4 alltagsnahe, praxisrelevante Aufgaben für die Kategorie **Schwer**, die sofort jeder versteht (aus dem Büro-, Vereins- oder Haushaltsalltag), bei denen die Logik unter der Haube aber tückisch genug ist, um blindes Vibe Coding scheitern zu lassen:

### **1\. Ausgaben-Ausgleich für Gruppenreisen (Mini-„Splitwise“)**

> * **Alltagsszenario:** Eine Gruppe von 5 Personen macht einen Wochenendausflug. Person A zahlt die Unterkunft für alle, B zahlt das Abendessen für A, B und C, D zahlt den Sprit. Wer schuldet wem wie viel?  
> * **Die Kernaufgabe:**  
  * Erfassen von Ausgaben: Wer hat bezahlt? Welcher Betrag? Für wen gilt die Ausgabe (alle oder nur eine Teilgruppe)?  
  * Automatische Berechnung der minimalen Transaktionen zum Schuldenausgleich (z. B. „B zahlt 24 € an A“ statt 10 Überweisungen im Kreis).  
> * **Vibe-Coding-Falle:** Das Prompten baut schnell hübsche Eingabemasken und Saldenlisten. Beim eigentlichen **Schuldenschnitt (Greedy-/Min-Cash-Flow-Algorithmus)** verheddert sich das Modell ohne Spec fast immer: Beträge gehen verloren, Zirkelschulden bleiben bestehen oder Summen gehen um Cent-Beträge nicht auf.  
> * **Spec-Driven-Stärke:** Ein definiertes Datenmodell (Expense, Participant, Balance) und eine klare Spezifikation für den Algorithmus zur Schuldenminimierung liefern auf Anhieb ein mathematisch korrektes Ergebnis.

### **2\. Vereins-Schichtplaner mit Mindestbesetzung & Fairness**

> * **Alltagsszenario:** Für ein Sommerfest, ein Vereinsturnier oder einen Tag der offenen Tür müssen Helfer für 4 Schichten (z. B. Grill, Kasse, Einlass, Abbau) eingeteilt werden. 10 Personen tragen ihre Verfügbarkeiten und Vorlieben ein.  
> * **Die Kernaufgabe:**  
  * Eingabematrix: Wer kann wann (Ja / Nein / Nur Notfall)?  
  * Automatische Zuteilung unter Randbedingungen: Jede Station muss einfach/doppelt besetzt sein, niemand darf zwei Schichten direkt hintereinander machen, und die Belastung soll gleichmäßig verteilt werden.  
> * **Vibe-Coding-Falle:** Die KI weist im Freistil gerne dieselben hilfsbereiten Personen mehrfach zu, ignoriert Pausenzeiten oder übersieht Notfall-Flags, sobald mehr als 3 Personen eingetragen sind.  
> * **Spec-Driven-Stärke:** Klare Prioritätsregeln (Hard Constraints wie „max. 1 Schicht pro Person“ vs. Soft Constraints wie „Wunschstation“) und deterministische Validierung der Zuteilungsmatrix.

### **3\. Smartes Meeting-Raum- & Ressourcen-Buchungssystem**

> * **Alltagsszenario:** Im Büro gibt es 2 Konferenzräume und 1 Beamer. Kolleginnen und Kollegen buchen Zeitfenster; manche Termine brauchen den Beamer, manche nur den Raum.  
> * **Die Kernaufgabe:**  
  * Buchungsmaske mit Datum, Startzeit, Endzeit, Teilnehmerzahl und optionaler Ressource (z. B. Beamer).  
  * Konflikterkennung und automatische Umbuchung: Wenn Raum A belegt ist, aber Raum B frei und groß genug ist, wird Raum B vorgeschlagen. Bei einer Buchung mit Beamer wird geprüft, ob sowohl ein Raum *als auch* der Beamer zeitgleich verfügbar sind.  
> * **Vibe-Coding-Falle:** Zeitintervall-Prüfungen (start1 \< end2 && end1 \> start2) gehen bei freiem Prompten regelmäßig schief (Grenzfälle wie: „Meeting endet exakt um 14:00, nächstes startet um 14:00“ werden fälschlicherweise als Kollision gewertet; Mehrtages- oder Mitternachts-Bugs).  
> * **Spec-Driven-Stärke:** Exakte Spezifikation der Kollisionsformel, Zeitzonen-/Datumsvalidierung und klar definierte Rückgabewerte für Buchungsstatus (CONFIRMED, CONFLICT\_ROOM, CONFLICT\_RESOURCE).

### **4\. Automatische Mitfahrgelegenheiten- & Fahrgemeinschafts-Planung**

> * **Alltagsszenario:** 8 Personen wollen zu einem Event (Seminar, Auswärtsspiel, Konzert). Einige bieten ihr Auto an (mit 2 bis 4 freien Plätzen), andere brauchen eine Mitfahrgelegenheit. Zudem gibt es 2 Abhol-Sammelpunkte (z. B. Hauptbahnhof, Park & Ride).  
> * **Die Kernaufgabe:**  
  * Fahrer erfassen (Auto-Kapazität, Route/Sammelpunkt).  
  * Mitfahrer erfassen (gewünschter Sammelpunkt, Gepäck Ja/Nein).  
  * Zuordnung der Mitfahrer auf Autos, sodass möglichst wenige Autos fahren müssen und kein Auto überbucht wird.  
> * **Vibe-Coding-Falle:** Die KI baut eine nette Karten- oder Listenübersicht, füllt aber Autos über deren Kapazitätsgrenze, teilt Mitfahrer falschen Treffpunkten zu oder „vergisst“ Personen, wenn die Kapazität knapp wird.  
> * **Spec-Driven-Stärke:** Eine feste Zuweisungslogik (Bin-Packing / Knapsack-Variante), geordnete Zuweisungsstufen und ein eindeutiger Unassigned-Pool für den Fall von Kapazitätsengpässen.

---

*User prompt: Jetzt brauchen einen Plan für eine 60 Minuten Breakoutsession: \- Teilnehmer (ca 15 bis 18\) kommen rein und bekommen ein 3D pritend emblen für die Einteilung in drei Gruppen. \- Kurze Vorstellung der Probleme auf dem großen Bildschirm. Aber nur oberflächlich, dass es sie gibt und welche Kategorien. \- Wir starten mit der Auslosung eines Problems zu jeder drei Gruppen. \- Dann stellen wir die Frage: Wie machen wir das jetzt? \- Es stehen drei MacBooks bereit. Auf diesen könnt ihr mittels KI und Vibecoding das Problem angehen. \- Anschließend werden die Lösungen vorgetragen und eine Retro gemacht. \- Anhand von 4 Leitfragen (gemeinsam, alle) \- Dann Vorstellung Spec Driven \- Dann gleiches Probklem lösen mit Spec Driven \- Zusammenkommen, Lösungen aufzeigen. \- Retro anhand von Leitfragen,. Ende Erstelle ein Plan mit Zeiten und ANweisungen für die Moderatoren (3 Stück)*

Response: Hier ist der vollständige Regie- und Zeitplan für die 60-minütige Breakout-Session.

Da 60 Minuten für zwei Bauphasen plus jeweils Präsentation und Retro straff getaktet sind, sind die Zeiten auf die Minute optimiert. Die drei Moderatoren (Mod 1, Mod 2, Mod 3\) agieren im Plenum als Team und betreuen während der Bauphasen jeweils fest eine der drei Gruppen als **Timekeeper & technischer Enabler**.

### **Zeit- und Ablaufplan (60 Minuten)**

| Min | Dauer | Phase | Hauptfokus |
| :---- | :---- | :---- | :---- |
| **00–05** | 5 Min | **Check-in & Teaming** | Einlass, Embleme verteilen, Gruppen finden |
| **05–08** | 3 Min | **Problemübersicht & Losung** | Kurzer Teaser der Kategorien, Ziehung der Aufgaben |
| **08–10** | 2 Min | **Impuls: „Wie machen wir das?“** | Arbeitsweise Vibe Coding erklären, Go an die MacBooks |
| **10–23** | 13 Min | **Phase 1: Vibe Coding** | Freies Prompten am Gruppen-MacBook (1 Laptop / Gruppe) |
| **23–29** | 6 Min | **Pitch & Retro 1** | Je 1 Min Screen-Share \+ 3 Min gemeinsame Retro (4 Leitfragen) |
| **29–33** | 4 Min | **Input: Spec-Driven Development** | Was fehlte vorhin? Das Konzept der präzisen Spec |
| **33–46** | 13 Min | **Phase 2: Spec-Driven** | Gleiches Problem: Erst 4 Min Spec schreiben, dann Code |
| **46–52** | 6 Min | **Pitch & Demo 2** | Je 1 Min Screen-Share \+ 3 Min Live-Edge-Case-Check |
| **52–60** | 8 Min | **Abschluss-Retro & Takeaway** | Erkenntnisvergleich anhand der Leitfragen, Wrap-up |

### **Detaillierter Regieplan & Moderatoren-Anweisungen**

#### **Minute 00–05: Einlass & Gruppenbildung (5 Min)**

> * **Ablauf:** Am Eingang zieht jeder Teilnehmer blind ein 3D-gedrucktes Emblem (z. B. drei verschiedene geometrische Formen oder Farben). Die Tische im Raum sind mit passenden Aufstellern markiert.  
> * **Moderatoren-Aufgaben:**  
  * **Mod 1:** Begrüßt an der Tür und reicht den Beutel/die Box mit den 3D-Emblemen.  
  * **Mod 2 & 3:** Stehen an den Tischen, nehmen die Teilnehmer in Empfang und weisen sie ihren Plätzen zu (5–6 Personen pro Tisch). MacBooks sind bereits eingeloggt, Browser und KI-IDE geöffnet.

#### **Minute 05–08: Problem-Teaser & Losung (3 Min)**

> * **Ablauf:** Mod 1 zeigt auf dem Hauptbildschirm eine Übersicht: „Es gibt 12 Szenarien in 3 Schwierigkeitsgraden (Leicht, Mittel, Schwer).“ Keine Detailerklärungen, nur die Bandbreite zeigen. Anschließend zieht jede Gruppe ein Los aus dem Beutel.  
> * **Moderatoren-Aufgaben:**  
  * **Mod 1:** Spricht im Plenum, zeigt die Slide, erklärt die drei Töpfe/Kategorien.  
  * **Mod 2 & 3:** Gehen mit den Lostöpfen zu den Tischen, lassen je einen Gruppenvertreter ziehen und kleben das gezogene Problem per Post-it an den Gruppen-Laptop.

#### **Minute 08–10: Der Impuls: „Wie machen wir das jetzt?“ (2 Min)**

> * **Ablauf:** Mod 1 stellt die provokante Einstiegsfrage: *„Ihr habt ein Problem, eine Gruppe von 5 Köpfen und genau einen Rechner. Wie lösen wir das jetzt in 13 Minuten?“*  
  * Antwort/Ansage: *„Keine Architekturdiagramme, keine langen Debatten. Wir nutzen Vibe Coding: Ein Laptop, Browser auf, redet mit der KI, tippt Prompts rein, testet direkt im Browser. Der Timer läuft ab JETZT\!“*  
> * **Moderatoren-Aufgaben:**  
  * **Mod 1:** Startet einen großen 13-Minuten-Countdown auf dem Hauptbildschirm.  
  * **Mod 2 & 3:** Klinken sich an Tisch 1 bzw. Tisch 2 ein; Mod 1 übernimmt Tisch 3\.

#### **Minute 10–23: Arbeitsphase 1 – Vibe Coding (13 Min)**

> * **Ablauf:** Die Teams sitzen um das MacBook. Ein Teilnehmer tippt („Driver“), der Rest souffliert („Navigator“-Prinzip).  
> * **Moderatoren-Aufgaben (jeder Moderator an seinem Tisch):**  
  * **Passiv beobachten, aktiv bremsen bei Overengineering:** Wenn die Gruppe anfängt, 5 Minuten über Datenstrukturen zu diskutieren, greift der Mod ein: *„Keine Theorie – tippt es direkt als Prompt ein\!“*  
  * Sicherstellen, dass die Gruppe die Anwendung zwischendurch wirklich ausprobiert (Klicken, Inputs testen).  
  * Nach 8 Minuten: Durchsage des Moderators am Tisch: *„Noch 5 Minuten\! Bringt es zu einem vorzeigbaren Stand.“*

#### **Minute 23–29: Showcase 1 & Gemeinsame Retro (6 Min)**

> * **Ablauf:**  
  * **Showcase (3 Min):** Gruppe 1, 2 und 3 werfen nacheinander für je 60 Sekunden ihr MacBook an den Beamer (oder halten es hoch) und klicken kurz durch.  
  * **Gemeinsame Retro (3 Min):** Mod 1 öffnet die 4 Leitfragen auf der Leinwand:  
    1. *Wie schnell hattet ihr ein erstes sichtbares Ergebnis?*  
    2. *Wann und warum hat die KI angefangen zu halluzinieren oder euch misszuverstehen?*  
    3. *Wer in der Gruppe wusste am Ende noch ganz genau, wie die Logik unter der Haube funktioniert?*  
    4. *Habt ihr Randfälle (z. B. leere Inputs, falsche Zahlen) aktiv getestet?*  
> * **Moderatoren-Aufgaben:**  
  * **Mod 1:** Moderiert zügig, nimmt kurze Schlagworte aus dem Plenum auf und notiert sie digital/am Flipchart.  
  * **Mod 2 & 3:** Achten strikt auf die 60-Sekunden-Demo-Zeit pro Gruppe.

#### **Minute 29–33: Kurzer Input: Spec-Driven Development (4 Min)**

> * **Ablauf:** Mod 1 präsentiert das Kontrastmodell:  
  * *„Vibe Coding ist großartig für schnelle Prototypen, kollabiert aber bei komplexer Business-Logik und Randfällen. Jetzt machen wir genau dasselbe Problem noch einmal – aber Spec-Driven.“*  
  * **Die 3 Schritte einer Mini-Spec (4 Minuten Vorbereitung):**  
    1. **Data Model:** Welche Felder existieren genau?  
    2. **Rules & Calculations:** Wie lautet die mathematische/fachliche Formel?  
    3. **Edge Cases:** Was passiert bei Fehleingaben, Nullwerten oder Grenzwerten?  
  * Die KI bekommt erst dann den Programmier-Befehl, wenn die Spec steht.  
> * **Moderatoren-Aufgaben:**  
  * **Mod 2 & 3:** Legen an den Tischen eine 1-seitige Markdown-Vorlage (oder ein kurzes Cheat-Sheet) bereit.

#### **Minute 33–46: Arbeitsphase 2 – Spec-Driven Development (13 Min)**

> * **Ablauf:**  
  * **Min 33–37 (4 Min):** Die Gruppe schreibt gemeinsam in einer Textdatei/einem Editor die Spec (Daten, Regeln, Edge Cases). Es wird noch **kein** Anwendungscode generiert\!  
  * **Min 37–46 (9 Min):** Die fertige Spec wird der KI übergeben mit dem Prompt: *„Setze exakt diese Spezifikation als funktionierende Web-App um. Halte dich strikt an die definierten Regeln und Randfälle.“*  
> * **Moderatoren-Aufgaben:**  
  * **Enforce the Spec:** Die Moderatoren stellen an ihren Tischen sicher, dass in den ersten 4 Minuten wirklich nur spezifiziert wird.  
  * Wenn die KI Code generiert, unterstützt der Mod dabei, diesen gezielt gegen die definierten Edge Cases zu testen.

#### **Minute 46–52: Showcase 2 & Edge-Case-Test (6 Min)**

> * **Ablauf:** Gleiche Runde wie vorhin, aber mit Stresstest:  
  * Je 1 Minute Demo pro Gruppe: Die Moderatoren geben einen fiesen Edge-Case-Wert ein (z. B. ungerade Personenzahl, Nullwert, Zirkelbezug).  
  * Klappt es diesmal?  
> * **Moderatoren-Aufgaben:**  
  * **Mod 2 & 3:** Spielen gezielt die Rolle des „bösen Testers“ an den Laptops und fordern die definierten Grenzfälle ein.

#### **Minute 52–60: Abschluss-Retro & Wrap-up (8 Min)**

> * **Ablauf:** Gemeinsame Diskussion im Stuhlkreis/Plenum anhand derselben 4 Leitfragen im direkten Vorher-Nachher-Vergleich:  
  1. *Entwicklungsgeschwindigkeit:* War Vibe Coding wirklich schneller, wenn man die Fehlersuche mit einrechnet?  
  2. *Kontrolle & Architektur:* Wo fühlte sich das Team als Architekt, wo nur als Passagier?  
  3. *Codequalität & Edge Cases:* Welche Fehler hat die Spec von vornherein verhindert?  
  4. *Praxis-Transfer:* Wann nutzen wir ab Montag Vibe Coding (UI-Entwürfe, Prototypen, Einweg-Skripte) und wann Spec-Driven (Kern-Logik, APIs, kollaborative Teamarbeit)?  
> * **Abschluss:** Kurzer Dank an die Runde, Übergabe eines Links/QR-Codes mit den Session-Materialien und Specs.

### **Checkliste für die 3 Moderatoren vor Beginn**

> * \[ \] **Tisch-Setup:** 3 MacBooks am Stromnetz, Bildschirm-Timeout deaktiviert, Gast-/Workshop-Accounts eingeloggt.  
> * \[ \] **Software:** KI-Tool / IDE geöffnet, ein einfacher lokaler Dev-Server oder eine funktionierende Web-Vorschau ist vorbereitet.  
> * \[ \] **Material:**  
  * Beutel mit 15–18 3D-Emblemen (3 Formen/Farben à 5–6 Stück).  
  * Beutel mit den 12 Aufgabenkärtchen.  
  * 3x Tisch-Spickzettel für die 3-teilige Mini-Spec (Daten, Regeln, Edge Cases).  
> * \[ \] **Technik:** Hauptbildschirm mit Countdown-Timer (z. B. webbasiert) und HDMI-/AirPlay-Verbindung für die Showcase-Pitches.

---

