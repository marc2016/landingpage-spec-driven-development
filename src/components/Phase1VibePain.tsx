import { useState, FC } from 'react';
import { Flame, AlertTriangle, XCircle, ArrowRight, ShieldAlert, RefreshCw } from 'lucide-react';

interface Phase1VibePainProps {
  onNextPhase: () => void;
}

export const Phase1VibePain: FC<Phase1VibePainProps> = ({ onNextPhase }) => {
  const [prompt, setPrompt] = useState(
    'Baue ein digitales Antragsformular für den Wohngeldantrag mit BundID-Login und Dokumenten-Upload nach OZG'
  );
  const [isVibing, setIsVibing] = useState(false);
  const [vibeTriggered, setVibeTriggered] = useState(false);

  const handleVibe = () => {
    setIsVibing(true);
    setVibeTriggered(false);
    setTimeout(() => {
      setIsVibing(false);
      setVibeTriggered(true);
    }, 1200);
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-red-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>Phase 1 (00:00 – 00:04): Der Schmerz in der Verwaltung</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Vibe Coding ist tot. <br />
          <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            Willkommen im Zeitalter des Spec Driven Development in der Verwaltung.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
          Unkontrolliertes Prompten führt bei behördlichen Online-Formularen ins Desaster: Verstöße gegen BITV 2.0 Barrierefreiheit, DSGVO-Datenpannen und inkompatible Fachverfahren.
        </p>
      </div>

      {/* Interactive Vibe Coding Prompt Box */}
      <div className="mt-10 max-w-3xl mx-auto bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-zinc-300 font-medium">ozg-antrag-vibe.prompt</span>
          </div>
          <span className="text-[11px] text-zinc-500">Ungeprüfter Verwaltungs-Prompt</span>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Typischer Entwickler-Prompt für ein Behörden-Formular:
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="z.B. Baue ein digitales Antragsformular für den Wohngeldantrag nach OZG..."
              className="w-full bg-zinc-950/80 border border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-zinc-100 font-mono outline-none transition-all placeholder:text-zinc-600 resize-none"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-zinc-500 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
            Keine FIM-Standards • Keine BITV-Prüfung • Reines KI-Raten
          </div>

          <button
            onClick={handleVibe}
            disabled={isVibing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-medium text-sm shadow-lg shadow-red-600/25 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isVibing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>KI ratet bei Verwaltungsregeln...</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4 text-amber-300" />
                <span>Vibe it! (Let AI guess)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulated Chaos Effect */}
      {vibeTriggered && (
        <div className="mt-8 max-w-4xl mx-auto space-y-6 animate-slide-up">
          {/* Chaos Banner */}
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 flex items-start gap-3 shadow-xl">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-red-200">
                Alarm: 4 schwere Compliance- und Barrierefreiheits-Verstöße im generierten Antragsformular!
              </h4>
              <p className="text-xs text-red-300/80 mt-1">
                Die KI hat ein Formular erzeugt, das oberflächlich modern aussieht – aber vor Gericht, beim Datenschutzbeauftragten und im Fachamt sofort durchfällt:
              </p>
            </div>
          </div>

          {/* Grid of Simulated Failures in Public Administration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-red-900/40 hover:border-red-600/50 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-red-400 font-bold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Bug 01: BITV 2.0 / Barrierefreiheit
                </span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono">
                  Rechtsverstoß BGG
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Keine <code className="text-amber-300 font-mono">aria-describedby</code> Verknüpfungen für Fehlerhinweise. Tastatur-Fokusfalle bei dynamischen Haushaltsmitgliedern – Blinde Bürger können den Antrag nicht absenden.
              </p>
              <div className="text-[11px] font-mono text-zinc-500 bg-zinc-950 p-2 rounded border border-zinc-800">
                &lt;input type="text" placeholder="Fehler!" /&gt; // 0 Screenreader-Support
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/90 border border-red-900/40 hover:border-red-600/50 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-red-400 font-bold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Bug 02: DSGVO EXIF-Datenleck
                </span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono">
                  Datenschutz-Panne
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Bürger laden Fotos des Mietvertrags hoch. Die KI speichert ungefiltert GPS-Wohnortkoordinaten und Kamera-Seriennummern in der E-Akte (Verstoß gegen Art. 5 DSGVO).
              </p>
              <div className="text-[11px] font-mono text-zinc-500 bg-zinc-950 p-2 rounded border border-zinc-800">
                await uploadAttachment(file); // Keine EXIF/GPS-Bereinigung
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/90 border border-red-900/40 hover:border-red-600/50 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-red-400 font-bold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Bug 03: BundID Vertrauensniveau fehlt
                </span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono">
                  Formunwirksam
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Die KI implementiert einen simplen Benutzername/Passwort-Login. Der Wohngeldantrag erfordert jedoch zwingend Vertrauensniveau „Substanziell“ (Online-Ausweis / eID).
              </p>
              <div className="text-[11px] font-mono text-zinc-500 bg-zinc-950 p-2 rounded border border-zinc-800">
                if (user.isLoggedIn) // Keine eIDAS Vertrauensniveau-Assertion
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/90 border border-red-900/40 hover:border-red-600/50 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-red-400 font-bold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Bug 04: Fachverfahren-Inkompatibilität
                </span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono">
                  FIM / XÖV Bruch
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Freitext-JSON statt normierter FIM-Felder (D110) und keine ISO-7064 Prüfziffer für Steuer-IDs. Der Datensatz kann im Amt nicht eingelesen werden.
              </p>
              <div className="text-[11px] font-mono text-zinc-500 bg-zinc-950 p-2 rounded border border-zinc-800">
                {'data = { steuerId: "12345" }; // Unvalidiert, bricht XFall-Schema'}
              </div>
            </div>
          </div>

          {/* Pain Metric Bar */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-around gap-4 text-center">
            <div>
              <div className="text-2xl font-extrabold text-red-400">0 %</div>
              <div className="text-xs text-zinc-400">BITV 2.0 Konformität</div>
            </div>
            <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
            <div>
              <div className="text-2xl font-extrabold text-amber-400">Haftungsrisiko</div>
              <div className="text-xs text-zinc-400">Rechtssicherheit im OZG</div>
            </div>
            <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
            <div>
              <div className="text-2xl font-extrabold text-zinc-400">Inkompatibel</div>
              <div className="text-xs text-zinc-400">Fachverfahren-Schnittstelle</div>
            </div>
          </div>

          {/* CTA to Phase 2 */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onNextPhase}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Das Gegenmittel aktivieren: OpenSpec im E-Government</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
