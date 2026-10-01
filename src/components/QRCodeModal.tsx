import { FC, useState } from 'react';
import { MaterialIcon } from './MaterialIcon';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomCode: string;
}

export const QRCodeModal: FC<QRCodeModalProps> = ({ isOpen, onClose, roomCode }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const joinUrl = `${window.location.origin}${window.location.pathname}?join=1&code=${encodeURIComponent(
    roomCode
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate a clean visual QR code SVG using the standard matrix look
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    joinUrl
  )}&bgcolor=18181b&color=38bdf8`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-750 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
        >
          <MaterialIcon name="close" className="text-xl" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <MaterialIcon name="smartphone" className="text-sm" />
            <span>Live-Teilnahme</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Mit Smartphone einklinken</h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            QR-Code scannen oder Code eingeben, um Post-its live an die Wand zu werfen.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 shadow-inner">
          <div className="relative w-52 h-52 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <img
              src={qrSvgUrl}
              alt={`QR Code für ${joinUrl}`}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                // Fallback icon if offline
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Fallback QR Icon if offline */}
            <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-zinc-600 space-y-2">
              <MaterialIcon name="qr_code_2" className="text-6xl text-cyan-500/40" />
              <span className="text-xs text-zinc-400 font-medium">QR-Code Scanner</span>
            </div>
          </div>

          {/* Big Room Code Display */}
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Raum-Code
            </span>
            <div className="text-4xl font-extrabold font-mono tracking-widest text-cyan-400 bg-cyan-950/40 px-6 py-2 rounded-xl border border-cyan-500/30">
              {roomCode}
            </div>
          </div>
        </div>

        {/* Link sharing */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2 bg-zinc-950 border border-zinc-800 rounded-xl text-left">
            <input
              type="text"
              readOnly
              value={joinUrl}
              className="bg-transparent text-xs text-zinc-300 font-mono flex-1 outline-none px-2 truncate"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-all shrink-0"
            >
              {copied ? (
                <>
                  <MaterialIcon name="check" className="text-sm text-emerald-400" />
                  <span className="text-emerald-300">Kopiert!</span>
                </>
              ) : (
                <>
                  <MaterialIcon name="content_copy" className="text-sm" />
                  <span>Kopieren</span>
                </>
              )}
            </button>
          </div>

          <a
            href={joinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Teilnehmer-Ansicht in neuem Tab testen</span>
            <MaterialIcon name="open_in_new" className="text-xs" />
          </a>
        </div>
      </div>
    </div>
  );
};
