**Zusammenfassung:** Bereitstellung des vollständigen Workshop-Ergebnisses als reiner Text zum einfachen Kopieren.

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