Zusammenfassung: Vollständiges Gesamtkonzept der Breakout-Session als reiner Plaintext zum einfachen Kopieren.
Konzept: Breakout-Session – OpenSpec vs. Vibe Coding bei Formularen in der öffentlichen Verwaltung (20 Minuten)
Rahmenbedingungen & Zielsetzung
Zielgruppe: 15 Personen (Entwickler, Tech Leads, IT-Consultants).
Zeitrahmen: Exakt 20 Minuten (Lightning Session).
Kernbotschaft: Vibe Coding (unkontrolliertes Prompten) scheitert bei komplexen Behördenformularen (Bürgerservice, Wohngeld, Anträge): Datenverlust beim Ausfüllen, fehlende Barrierefreiheit, inkonsistente Haushaltsberechnungen und unsichere Uploads. Der OpenSpec-Ansatz (Spec-Driven Development mit strukturierten Markdown-Verträgen) zähmt die KI durch deterministische Delta-Spezifikationen (Proposal -> Apply -> Archive).
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
  # Optional für den Live-Modus im lokalen Netzwerk ohne Internet
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
Headline: „Vibe Coding stößt an seine Grenzen. Willkommen im Zeitalter des Spec Driven Development.“
Die Live-Aktion: Sie tippen einen typischen Vibe-Coding-Prompt ein („Baue ein mehrstufiges digitales Antragsformular für den Wohngeldantrag mit dynamischen Haushaltsmitgliedern, Nachweis-Upload und Entwurfs-Speicherung“) und klicken auf „Vibe it! (Let AI guess)“.
Der Effekt: Die App simuliert das typische Chaos bei behördlichen Online-Formularen (Datenverlust beim Seitenwechsel, unvalidierte Riesen-Uploads, Rechenfehler beim Gesamteinkommen, Tastaturfalle ohne Screenreader-Führung). Die Gruppe fühlt den alltäglichen Schmerz unkontrollierten Promptens.
Phase 2: Die Mikro-Interaktion & Das Gegenmittel (00:04 – 00:08)
Die Aktion: Ein Klick schaltet die Landingpage in den OpenSpec-Modus um.
Das Plenum redet mit: Sie zeigen eine typische Bürger-Story („Als Bürgerin möchte ich den Antrag online schrittweise ausfüllen, Nachweise hochladen und den Entwurf speichern...“) und fragen die 15 Personen im Raum: „Was vergisst die KI bei behördlichen Antragsformularen zu 100%?“
Die Interaktion: Zwei Teilnehmer rufen Edge-Cases rein („Entwurfs-Zwischenspeicherung! Barrierefreie Screenreader-Fokusführung! Upload-Limits & Formatprüfung!“). Sie tippen diese live ein.
Die Brücke: Die Gruppe sieht augenblicklich, wie diese Punkte als Behavior Contract (Markdown nach RFC-2119 mit MUST, MUST NOT, SHOULD) fixiert werden.
Phase 3: Der OpenSpec-Workflow in Aktion (00:08 – 00:15)
Die Artefakte: Sie triggern den Prozess (/opsx:propose). Die shadcn/ui-Tabs zeigen die Entstehung der Dateien:
proposal.md (Formular-Scope, Multi-Step-Phasen & Nicht-Ziele)
design.md (Formular-State-Architektur, Auto-Save & Validierungskette)
Delta-Specs (specs/antragsformular.delta.md mit ADDED, MODIFIED und RFC-2119-Schlüsselwörtern)
tasks.md (Schritt-für-Schritt-Checkliste)
Der Ausführungs-Beweis (/opsx:apply): Die Checkliste läuft durch. Ein sauberer Code-Diff im shadcn/ui-Accordion beweist: Der Agent hat exakt die im Plenum genannten Formular- und Validierungsregeln fehlerfrei gebaut – keine Zeile zu viel, kein Raten.
Phase 4: Warum OpenSpec schlägt Vibe Coding (00:15 – 00:18)
Direkter Vergleich in der UI:
Reproduzierbarkeit: Vibe Coding = Unberechenbare Formularzustände & Datenverlust. OpenSpec = Deterministischer Vertrag für jedes Formularfeld.
Teamfähigkeit: Vibe Coding = Niemand blickt durch die Validierungslogik im PR. OpenSpec = Reviewbare Spezifikationen der Formularregeln im Git-Repo.
Skalierbarkeit: Vibe Coding = Jedes neue Formularfeld erzeugt Seiteneffekte und Regressionen. OpenSpec = Modulare Delta-Specs für Formularanpassungen.
Phase 5: Call to Action (00:18 – 00:20)
Kein Foliengrab am Ende, sondern direkt der Ausblick für den nächsten Arbeitstag:
„Morgen im ersten Formular-Repo ausführen: npx openspec init“