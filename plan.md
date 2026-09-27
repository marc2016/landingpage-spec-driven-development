Zusammenfassung: Vollständiges Gesamtkonzept der Breakout-Session als reiner Plaintext zum einfachen Kopieren.
Konzept: Breakout-Session – OpenSpec vs. Vibe Coding in der öffentlichen Verwaltung (20 Minuten)
Rahmenbedingungen & Zielsetzung
Zielgruppe: 15 Personen (Entwickler, Tech Leads, IT-Consultants für Public Sector & E-Government).
Zeitrahmen: Exakt 20 Minuten (Lightning Session).
Kernbotschaft: Vibe Coding (unkontrolliertes Prompten) führt bei behördlichen Online-Formularen zum Desaster (BITV 2.0 Barrierefreiheits-Verstöße, DSGVO-Pannen bei Nachweis-Uploads, Inkompatibilität zu FIM- und XÖV-Fachverfahren). Der OpenSpec-Ansatz (Spec-First mit strukturierten Markdown-Verträgen) zähmt die KI durch deterministische Delta-Spezifikationen nach OZG- und FIM-Standards (Proposal -> Apply -> Archive).
Technische Architektur & Docker-Setup
Die Web-Anwendung ist im modernen Vercel-/Raycast-Look (React, Vite, Tailwind CSS, shadcn/ui) gebaut und läuft vollständig containerisiert.
Dockerfile (Multi-Stage Build):
Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
Stage 2: Production Server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
docker-compose.yml:
version: '3.8'
services:
openspec-app:
build: .
ports:
- "8080:80"
restart: unless-stopped
environment:
- VITE_DEFAULT_MODE=mock
networks:
- openspec-net
Optional für den Live-Modus im lokalen Netzwerk ohne Internet
ollama:
image: ollama/ollama:latest
ports:
- "11434:11434"
volumes:
- ollama_data:/root/.ollama
networks:
- openspec-net
profiles:
- live-llm
volumes:
ollama_data:
networks:
openspec-net:
driver: bridge
Dramaturgie & Zeitlicher Ablauf (20 Minuten)
Phase 1: Der Landingpage-Einstieg & Der Schmerz (00:00 – 00:04)
Die Szene: Die shadcn/ui-Landingpage öffnet sich auf dem Beamer.
Headline: „Vibe Coding ist tot. Willkommen im Zeitalter des Spec Driven Development in der Verwaltung.“
Die Live-Aktion: Sie tippen einen typischen Vibe-Coding-Prompt ein („Baue ein digitales Antragsformular für den Wohngeldantrag mit BundID-Login und Upload nach OZG“) und klicken auf „Vibe it! (Let AI guess)“.
Der Effekt: Die App simuliert das typische Chaos bei behördlichen Formularen (BITV 2.0-Barrierefreiheitsverstöße, ungesicherte Dateiuploads mit EXIF-Metadaten, fehlerhafte Haushaltsberechnung, fehlende eID-Vertrauensniveaus). Die Gruppe fühlt den alltäglichen Schmerz der OZG-Digitalisierung.
Phase 2: Die Mikro-Interaktion & Das Gegenmittel (00:04 – 00:08)
Die Aktion: Ein Klick schaltet die Landingpage in den OpenSpec-Modus um.
Das Plenum redet mit: Sie zeigen eine rohe User-Story („Als Bürgerin möchte ich den Wohngeldantrag online einreichen und Nachweise hochladen...“) und fragen die 15 Personen im Raum: „Was vergisst die KI bei behördlichen Anträgen zu 100%?“
Die Interaktion: Zwei Teilnehmer rufen Edge-Cases rein („BITV 2.0 Screenreader-Fokus! EXIF-Metadaten bereinigen! BundID-Vertrauensniveau!“). Sie tippen diese live ein.
Die Brücke: Die Gruppe sieht augenblicklich, wie diese Punkte als Behavior Contract (Markdown nach RFC-2119 mit MUST, MUST NOT, SHOULD) fixiert werden.
Phase 3: Der OpenSpec-Workflow in Aktion (00:08 – 00:15)
Die Artefakte: Sie triggern den Prozess (/opsx:propose). Die shadcn/ui-Tabs zeigen die Entstehung der Dateien:
proposal.md (Scope, OZG-Reifegrad & gesetzliche Grundlagen wie Wohngeld-Plus-Gesetz)
design.md (FIM-Datenfeldkatalog, Sanitization & BundID-Schnittstelle)
Delta-Specs (specs/antrag-wohngeld.delta.md mit ADDED, MODIFIED und RFC-2119-Schlüsselwörtern)
tasks.md (Schritt-für-Schritt-Checkliste)
Der Ausführungs-Beweis (/opsx:apply): Die Checkliste läuft durch. Ein sauberer Code-Diff im shadcn/ui-Accordion beweist: Der Agent hat exakt die im Plenum genannten BITV- und OZG-Compliance-Regeln fehlerfrei gebaut – keine Zeile zu viel, kein Raten.
Phase 4: Warum OpenSpec schlägt Vibe Coding (00:15 – 00:18)
Direkter Vergleich in der UI:
Rechtssicherheit & BITV 2.0: Vibe Coding = Gesetzliche Haftungsfalle. OpenSpec = Deterministischer, auditierbarer Vertrag.
Fachverfahren-Kompatibilität: Vibe Coding = Unstrukturierte Daten ohne FIM-/XÖV-Standard. OpenSpec = Schematreue Schnittstellen im Git-Repo.
Skalierbarkeit & Wartung: Vibe Coding bricht bei komplexen Verwaltungsabläufen ein. OpenSpec skaliert durch modulare Delta-Specs.
Phase 5: Call to Action (00:18 – 00:20)
Kein Foliengrab am Ende, sondern direkt der Ausblick für den nächsten Arbeitstag:
„Morgen im ersten Verwaltungs-Repo ausführen: npx openspec init“