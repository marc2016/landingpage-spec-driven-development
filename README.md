# OpenSpec vs. Vibe Coding – Formularentwicklung in der öffentlichen Verwaltung

> **20-Minuten Lightning Breakout-Session:**  
> „Vibe Coding ist tot. Willkommen im Zeitalter des Spec Driven Development in der Verwaltung.“

Interaktive Demo-Anwendung im modernen Vercel-/Raycast-Look (React, Vite, Tailwind CSS, shadcn/ui-Stil), containerisiert mit Docker & Compose.

Fokusthema: **Digitalisierung behördlicher Antragsformulare nach OZG 2.0, BITV 2.0 Barrierefreiheit, BundID und FIM-Datenfeldern.**

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
| **01** | 00:00 – 00:04 | **Der Schmerz im E-Gov** | OZG-Prompt (`"Wohngeldantrag mit BundID & Upload"`), Button „Vibe it! (Let AI guess)“, Simulation von 4 behördlichen K.O.-Kriterien (BITV 2.0-Verstoß, DSGVO EXIF-GPS Leck, fehlendes eID-Vertrauensniveau, FIM-Bruch) |
| **02** | 00:04 – 00:08 | **Das Gegenmittel** | Plenum-Frage: *„Was vergisst die KI bei behördlichen Anträgen zu 100%?“*, Live-Tagging & RFC-2119 Markdown Behavior Contract Generator |
| **03** | 00:08 – 00:15 | **Workflow in Aktion** | Tabs für `proposal.md` (OZG Reifegrad 4), `design.md` (FIM & BundID), `delta-spec.md`, `tasks.md`, `/opsx:apply` Ausführung mit Code-Diff Accordion |
| **04** | 00:15 – 00:18 | **Vergleich** | Direkter Vergleich: Rechtssicherheit & BITV 2.0, Fachverfahren-Kompatibilität (FIM/XÖV), OZG-Gesetzesnovellen |
| **05** | 00:18 – 00:20 | **Call to Action** | Terminal-Befehl `npx openspec init` mit 1-Klick-Copy & 4-Schritte-Workflow für Behörden-Repos |

---

## 🛠️ Tech-Stack
- **Frontend**: React 18, TypeScript, Vite 6
- **Design & Styling**: Tailwind CSS, shadcn/ui Design Language, JetBrains Mono & Inter, Lucide Icons
- **Fachstandards**: OZG 2.0, BITV 2.0 / WCAG 2.1 AA, BundID / eIDAS Substanziell, FIM Datenfelder (D110), XÖV / XFall
- **Container**: Multi-Stage Dockerfile (Node 20 Alpine Builder ➔ Nginx Alpine), `docker-compose.yml`
