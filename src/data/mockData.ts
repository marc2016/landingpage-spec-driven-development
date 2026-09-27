export interface EdgeCaseItem {
  id: string;
  title: string;
  category: string;
  rfcRule: string;
  addedByAudience?: boolean;
}

export const INITIAL_EDGE_CASES: EdgeCaseItem[] = [
  {
    id: 'bitv-accessibility',
    title: 'BITV 2.0 / Barrierefreiheit (Screenreader)',
    category: 'Inklusion & Recht',
    rfcRule: 'The form fields MUST link to error states via aria-describedby and MUST announce dynamic household row additions via aria-live="polite".',
  },
  {
    id: 'exif-sanitization',
    title: 'DSGVO / Nachweis-Upload (EXIF-GPS Bereinigung)',
    category: 'Datenschutz',
    rfcRule: 'The upload pipeline MUST strip all GPS location data and personal camera EXIF metadata from citizen attachments prior to storage.',
  },
  {
    id: 'eid-trust-level',
    title: 'BundID Vertrauensniveau („Substanziell“)',
    category: 'E-ID & Auth',
    rfcRule: 'The submission endpoint MUST NOT process applications lacking verified BundID eID credentials with minimum trust level "Substanziell".',
  },
  {
    id: 'fim-checksum',
    title: 'FIM-Datenfeldkatalog & Steuer-ID Prüfziffer',
    category: 'Interoperabilität',
    rfcRule: 'The payload MUST validate citizen Tax IDs according to ISO-7064 Mod 11,10 before dispatching the XML packet to the municipal Fachverfahren.',
  },
];

export const PROPOSAL_MD = `---
title: OZG-Onlineantrag: Wohngeld-Plus & Haushaltsberechnung
standard: OZG 2.0 / FIM (Föderales Informationsmanagement)
status: PROPOSED
target_level: OZG-Reifegrad 4
---

# Scope & Gesetzlicher Rahmen
Bereitstellung eines volldigitalen, barrierefreien Antragsformulars für Wohngeld (Mietzuschuss) nach dem Wohngeld-Plus-Gesetz mit direkter BundID-Kopplung.

## Ziele (Goals)
- Barrierefreiheit nach BITV 2.0 / WCAG 2.1 AA (obligatorisch für Bundes- und Landesbehörden).
- BundID-Authentifizierung mit Vertrauensniveau "Substanziell" (Online-Ausweis / Elster-Zertifikat).
- Strukturierte Datenübergabe an das Fachverfahren über XÖV / XFall-Standard.
- Datenschutzkonforme Bereinigung hochgeladener Nachweise (Mietbescheinigung, Einkommensnachweis).

## Nicht-Ziele (Non-Goals)
- Automatische Bewilligung ohne sachbearbeitende Prüfung (Letztentscheidung verbleibt im Fachamt).
- Eigenständige Zahlungsabwicklung (wird über das Kassenverfahren des Bundeslandes gesteuert).
`;

export const DESIGN_MD = `---
spec: design.md
component: OZGFormEngine / WohngeldAntragHandler
compliance: BITV 2.0, DSGVO Art. 5 (Datensparsamkeit), BSI TR-03107
---

# Technische Architektur & Behörden-Standards

## 1. Barrierefreiheit (BITV 2.0)
- Semantische HTML5-Formulargruppen (\`<fieldset>\`, \`<legend>\`).
- Vollständige Tastaturbedienbarkeit ohne Fokusfallen bei dynamischen Haushaltsmitgliedern.
- Kontrastverhältnis mindestens 4.5:1, Error-Announcements für Screenreader.

## 2. BundID & Datensparsamkeit Pipeline
\`\`\`
[Bürger füllt Antrag aus] 
       │
       ▼
[BundID Auth Guard] ──(Niveau < Substanziell)──► [HTTP 403 eID erforderlich]
       │ (Authentifiziert)
       ▼
[Dokumenten-Upload] ──(EXIF GPS / Metadaten)──► [Sanitization Filter]
       │ (Bereinigt)
       ▼
[FIM Schema Validierung] ──(Steuer-ID / IBAN fehlerhaft)──► [Feld-Feedback]
       │ (Konform)
       ▼
[XFall / XWohngeld XML Paket] ──► [Sichere Übermittlung via DVDV / Fachverfahren]
\`\`\`
`;

export const DELTA_SPEC_MD = `---
target: specs/ozg/antrag-wohngeld.delta.md
operation: DELTA
rfc: RFC-2119
authority: FITKO / IT-Planungsrat
---

## ADDED Requirements (Behördliche Compliance)

### REQ-OZG-101: BITV 2.0 Screenreader & Tastatur-Fokus
The dynamic form control for adding household members **MUST** programmatically shift focus to the newly created member header and **MUST** expose \`aria-invalid="true"\` alongside an accessible error description whenever mandatory fields are blank.

### REQ-OZG-102: DSGVO-konforme Nachweis-Bereinigung
The document ingestion worker **MUST** strip all EXIF metadata (specifically GPS coordinates, device identifiers, and timestamp tags) from citizen upload files (JPEG, PNG, PDF) prior to persisting them into the electronic record (E-Akte).

### REQ-OZG-103: BundID Mindestvertrauensniveau
The backend dispatch service **MUST NOT** accept form submissions with an authentication context lower than \`STORK-QAA-Level-3\` / eIDAS \`Substantial\`. Anonymous or PIN-only submissions **MUST** be rejected with official legal notice.

### REQ-OZG-104: FIM-Standard & Prüfziffer-Validierung
The citizen identification payload **MUST** validate the 11-digit German Tax ID (*steuerliche Identifikationsnummer*) against the official BZSt checksum algorithm before generating the XÖV envelope.
`;

export const TASKS_MD = [
  {
    id: 'task-1',
    title: 'Implement BITV 2.0 accessible form controls with aria-live bindings',
    completed: false,
    file: 'src/components/ozg/AccessibleFieldGroup.tsx',
  },
  {
    id: 'task-2',
    title: 'Build client-side EXIF/GPS metadata stripper for citizen uploads',
    completed: false,
    file: 'src/security/exifSanitizer.ts',
  },
  {
    id: 'task-3',
    title: 'Implement BundID assertion check (Trust Level: Substanziell)',
    completed: false,
    file: 'src/auth/bundIdGuard.ts',
  },
  {
    id: 'task-4',
    title: 'Add FIM-compliant Steuer-ID & XFall schema validation suite',
    completed: false,
    file: 'src/services/xfallValidator.ts',
  },
];

export const CODE_DIFF = {
  fileName: 'src/services/antragService.ts',
  diff: [
    { type: 'normal', text: ' export async function submitWohngeldAntrag(antrag: WohngeldData): Promise<SubmissionResult> {' },
    { type: 'delete', text: '-  // Vibe Coding Version: Ungeprüfter Upload & keine BITV/BundID Validierung' },
    { type: 'delete', text: '-  const rawAttachments = antrag.files;' },
    { type: 'delete', text: '-  return await legacyDb.insert("antraege", { ...antrag, rawAttachments });' },
    { type: 'add', text: '+  // OpenSpec REQ-OZG-103: BundID Vertrauensniveau prüfen' },
    { type: 'add', text: '+  bundIdGuard.assertTrustLevel(antrag.authContext, "Substanziell");' },
    { type: 'add', text: '+' },
    { type: 'add', text: '+  // OpenSpec REQ-OZG-104: FIM Steuer-ID Prüfziffer nach ISO-7064' },
    { type: 'add', text: '+  if (!validateTaxIdChecksum(antrag.antragsteller.steuerId)) {' },
    { type: 'add', text: '+    throw new ValidationError("Ungültige Steuer-ID nach BZSt-Prüfsumme");' },
    { type: 'add', text: '+  }' },
    { type: 'add', text: '+' },
    { type: 'add', text: '+  // OpenSpec REQ-OZG-102: DSGVO EXIF-Sanitization für Nachweise' },
    { type: 'add', text: '+  const sanitizedFiles = await Promise.all(' },
    { type: 'add', text: '+    antrag.files.map(file => exifSanitizer.stripMetadata(file))' },
    { type: 'add', text: '+  );' },
    { type: 'add', text: '+' },
    { type: 'add', text: '+  // OpenSpec REQ-OZG-101: XFall Envelope mit Prüfprotokoll' },
    { type: 'add', text: '+  return await xfallClient.dispatchToFachverfahren({' },
    { type: 'add', text: '+    ...antrag,' },
    { type: 'add', text: '+    attachments: sanitizedFiles,' },
    { type: 'add', text: '+    fimSchemaVersion: "1.3.0"' },
    { type: 'add', text: '+  });' },
    { type: 'normal', text: ' }' },
  ],
};
