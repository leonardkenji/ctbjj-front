import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

import { useManualCheckin, useQrCheckin } from "../hooks/useCheckins";
import { useStudentSearch } from "../hooks/useStudents";
import { Navbar } from "../layout/Navbar";
import type { CheckIn, Student } from "../types/models";

// ── Professor dashboard ────────────────────────────────────────────────────────

export function ProfessorDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-12 pt-20 pb-12">
        <div className="pt-4 mb-8">
          <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-secondary mb-2">Professor</p>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Painel do Professor</h1>
        </div>
        <button
          onClick={() => navigate("/checkin")}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-80 transition-opacity"
        >
          Abrir Check-in
        </button>
      </div>
    </div>
  );
}

// ── Kiosk page ─────────────────────────────────────────────────────────────────

type KioskMode = "idle" | "qr" | "manual" | "success";

export function CheckinKioskPage() {
  const [mode, setMode] = useState<KioskMode>("idle");
  const [checkedInName, setCheckedInName] = useState("");
  const navigate = useNavigate();
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSuccess(name: string) {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setCheckedInName(name);
    setMode("success");
    resetTimerRef.current = setTimeout(() => setMode("idle"), 3000);
  }

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-foreground/10">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          ← Sair
        </button>
        <span className="font-semibold">Check-in</span>
        <div className="w-14" />
      </header>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        {mode === "idle" && (
          <IdleScreen onQr={() => setMode("qr")} onManual={() => setMode("manual")} />
        )}
        {mode === "qr" && (
          <QrScreen onBack={() => setMode("idle")} onSuccess={handleSuccess} />
        )}
        {mode === "manual" && (
          <ManualScreen onBack={() => setMode("idle")} onSuccess={handleSuccess} />
        )}
        {mode === "success" && <SuccessScreen name={checkedInName} />}
      </div>
    </div>
  );
}

// ── Idle ───────────────────────────────────────────────────────────────────────

function IdleScreen({ onQr, onManual }: { onQr: () => void; onManual: () => void }) {
  return (
    <div className="flex flex-col items-center gap-8 text-center w-full max-w-md">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Registrar presença</h1>
        <p className="mt-2 text-sm text-muted">Escolha como deseja fazer o check-in</p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <button
          onClick={onQr}
          className="flex flex-col items-center gap-4 rounded-2xl border border-foreground/15 bg-white py-10 sm:py-12 hover:border-foreground/30 hover:bg-foreground/3 transition-all shadow-sm"
        >
          <QrCodeIcon />
          <div>
            <p className="font-semibold">QR Code</p>
            <p className="text-xs text-muted mt-0.5">Escaneie o cartão do aluno</p>
          </div>
        </button>
        <button
          onClick={onManual}
          className="flex flex-col items-center gap-4 rounded-2xl border border-foreground/15 bg-white py-10 sm:py-12 hover:border-foreground/30 hover:bg-foreground/3 transition-all shadow-sm"
        >
          <SearchIcon />
          <div>
            <p className="font-semibold">Por nome</p>
            <p className="text-xs text-muted mt-0.5">Digite o nome do aluno</p>
          </div>
        </button>
      </div>
    </div>
  );
}

// ── Success ────────────────────────────────────────────────────────────────────

function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CheckIcon className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-black">Check-in realizado!</h2>
      <p className="text-lg sm:text-xl text-muted">{name}</p>
      <p className="text-sm text-foreground/30 mt-2">Voltando em instantes...</p>
    </div>
  );
}

// ── QR scanner ─────────────────────────────────────────────────────────────────

function QrScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: (name: string) => void }) {
  const [retryKey, setRetryKey] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center gap-6 text-center max-w-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <XIcon className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-sm text-red-600">{errorMsg}</p>
        <div className="flex gap-3">
          <button
            onClick={() => { setErrorMsg(null); setRetryKey((k) => k + 1); }}
            className="rounded-xl border border-foreground/20 px-5 py-2.5 text-sm hover:bg-foreground/5 transition-colors"
          >
            Tentar novamente
          </button>
          <button onClick={onBack} className="px-4 py-2.5 text-sm text-muted hover:text-foreground transition-colors">
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <QrScannerView key={retryKey} onBack={onBack} onSuccess={onSuccess} onError={setErrorMsg} />
  );
}

function QrScannerView({
  onBack,
  onSuccess,
  onError,
}: {
  onBack: () => void;
  onSuccess: (name: string) => void;
  onError: (msg: string) => void;
}) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasScanned = useRef(false);
  const { mutate: checkin } = useQrCheckin();

  useEffect(() => {
    const scanner = new Html5Qrcode("kiosk-qr-reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          if (hasScanned.current) return;
          hasScanned.current = true;
          scanner.stop().then(() => {
            checkin(decodedText, {
              onSuccess: (data: CheckIn) => onSuccess(data.studentName),
              onError: () => onError("QR Code inválido ou aluno não encontrado."),
            });
          });
        },
        undefined,
      )
      .catch(() => onError("Não foi possível acessar a câmera. Verifique as permissões."));

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <p className="text-sm text-muted">Aponte a câmera para o QR Code do aluno</p>
      <div id="kiosk-qr-reader" className="w-full overflow-hidden rounded-xl" />
      <button onClick={onBack} className="text-sm text-muted hover:text-foreground transition-colors">
        ← Voltar
      </button>
    </div>
  );
}

// ── Manual search ──────────────────────────────────────────────────────────────

function ManualScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: (name: string) => void }) {
  const [query, setQuery] = useState("");
  const { data: results, isLoading } = useStudentSearch(query);
  const { mutate: checkin, isPending } = useManualCheckin();

  function handleCheckin(student: Student) {
    checkin(student.id, {
      onSuccess: () => onSuccess(student.name),
    });
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o nome do aluno..."
        className="w-full rounded-xl border border-foreground/20 bg-background px-4 py-3 text-sm outline-none placeholder:text-foreground/30 focus:border-primary transition-colors"
      />

      {isLoading && <p className="text-sm text-slate-500">Buscando...</p>}
      {results && results.length === 0 && query.length > 0 && (
        <p className="text-sm text-slate-500">Nenhum aluno encontrado.</p>
      )}

      <ul className="flex flex-col gap-2">
        {results?.map((student) => (
          <li key={student.id}>
            <button
              disabled={isPending}
              onClick={() => handleCheckin(student)}
              className="w-full rounded-xl border border-foreground/10 bg-white px-4 py-3 text-left hover:bg-foreground/5 transition-colors disabled:opacity-50 shadow-sm"
            >
              <p className="font-medium">{student.name}</p>
              <p className="text-xs text-muted">{student.email}</p>
            </button>
          </li>
        ))}
      </ul>

      <button onClick={onBack} className="mt-2 self-start text-sm text-muted hover:text-foreground transition-colors">
        ← Voltar
      </button>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function QrCodeIcon() {
  return (
    <svg className="w-10 h-10 text-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h.01M14 17h.01M17 14h.01M17 17h.01M20 14h.01M20 17h.01M14 20h.01M17 20h.01M20 20h.01" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-10 h-10 text-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}
