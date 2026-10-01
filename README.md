# OpenSpec vs. Vibe Coding – Formularentwicklung mit Spec-Driven Development

> **20-Minuten Lightning Breakout-Session:**  
> „Vibe Coding stößt an seine Grenzen. Willkommen im Zeitalter des Spec Driven Development.“

Interaktive Demo-Anwendung im modernen Vercel-/Raycast-Look (React, Vite, Tailwind CSS, shadcn/ui-Stil), containerisiert mit Docker & Compose.

Fokusthema: **Formularentwicklung für die öffentliche Verwaltung (Bürgerservice, Wohngeldantrag, Nachweise, Haushaltsberechnung) durch Spec-Driven Development (SDD) deterministisch und fehlerfrei machen.**

---

## 🚀 Schnellstart

### 1. Lokal mit Node / Vite
```bash
# Abhängigkeiten installieren (falls noch nicht geschehen)
npm install

# Dev-Server starten (Port 3000)
npm run dev

# Produktions-Build testen
npm run build
```

### 2. Deployment auf GitHub Pages
Das Repository ist für automatisches Deployment via GitHub Actions vorbereitet:

1. **GitHub Pages aktivieren:**
   - Gehe im GitHub-Repository auf **Settings** ➔ **Pages**.
   - Wähle unter **Build and deployment** als **Source**: `GitHub Actions`.
2. **Code committen & pushen:**
   - Bei jedem Push auf den `main`-Branch baut die Workflow-Datei [deploy.yml](file:///Users/marclammers/sources/landingpage-spec-driven-development/.github/workflows/deploy.yml) die Anwendung automatisch.
3. **Live-URL:**
   - Die Seite ist anschließend unter folgender Adresse erreichbar:  
     `https://marc2016.github.io/landingpage-spec-driven-development/`

---

### 3. Vollständig containerisiert mit Docker
Gemäß Vorgabe in [plan.md](file:///Users/marclammers/sources/landingpage-spec-driven-development/plan.md):

```bash
# Container bauen und starten (Port 8080)
docker compose up --build -d

# App im Browser öffnen:
# http://localhost:8080
```

#### Optional: Lokaler Offline-LLM-Modus mit Ollama (kein Datenabfluss)
```bash
docker compose --profile live-llm up -d
```

---

## ⏱️ Dramaturgie & Ablauf der 20-Minuten-Session

| Phase | Zeit | Thema | Interaktive Elemente in der App |
|---|---|---|---|
| **01** | 00:00 – 00:04 | **Der Schmerz bei Formularen** | Prompt für behördlichen Wohngeldantrag, Button „Vibe it! (Let AI guess)“, Simulation von 4 kritischen Formular-Bugs (Totaler Datenverlust bei Reload, Screenreader-Falle, 90MB Riesen-Upload, negatives Haushaltseinkommen) |
| **02** | 00:04 – 00:08 | **Das Gegenmittel** | Plenum-Frage: *„Was vergisst die KI bei behördlichen Antragsformularen zu 100%?“*, Live-Tagging & RFC-2119 Markdown Behavior Contract Generator |
| **03** | 00:08 – 00:15 | **Workflow in Aktion** | Tabs für `proposal.md`, `design.md`, `delta-spec.md`, `tasks.md`, `/opsx:apply` Ausführung mit Code-Diff Accordion für Formularvalidierung & Auto-Save |
| **04** | 00:15 – 00:18 | **Vergleich** | Direkter Vergleich: Zuverlässigkeit & Auto-Save, Team- & Fachbereichs-Reviews, Formular-Skalierung ohne Regressionen |
| **05** | 00:18 – 00:20 | **Call to Action** | Terminal-Befehl `npx openspec init` mit 1-Klick-Copy & 4-Schritte-Workflow für das nächste Formular-Repo |

---

## 🛠️ Tech-Stack
- **Frontend**: React 18, TypeScript, Vite 6
- **Design & Styling**: Tailwind CSS, shadcn/ui Design Language, JetBrains Mono & Inter, Lucide Icons
- **Methodik**: Spec-Driven Development (SDD), OpenSpec, RFC-2119 Keywords (`MUST`, `MUST NOT`, `SHOULD`)
- **Container**: Multi-Stage Dockerfile (Node 20 Alpine Builder ➔ Nginx Alpine), `docker-compose.yml`
