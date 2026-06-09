import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Html5Qrcode } from "html5-qrcode";

import { useManualCheckin, useQrCheckin } from "../hooks/useCheckins";
import { useStudentSearch } from "../hooks/useStudents";
import { Navbar } from "../layout/Navbar";
import type { Student } from "../types/models";

export function ProfessorDashboardPage() {
  const [checkinOpen, setCheckinOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="px-32 py-16">
        <h1 className="text-2xl font-semibold">Painel do Professor</h1>

        <div className="mt-8">
          <button
            onClick={() => setCheckinOpen(true)}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-80 transition-opacity"
          >
            Registrar Check-in
          </button>
        </div>
      </div>

      <CheckinModal open={checkinOpen} onClose={() => setCheckinOpen(false)} />
    </>
  );
}

// ── Checkin modal ─────────────────────────────────────────────────────────────

type CheckinMode = "select" | "manual" | "qr";

function CheckinModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<CheckinMode>("select");

  function handleClose() {
    setMode("select");
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Check-in">
      {mode === "select" && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted">Escolha como registrar a presença:</p>
          <button
            onClick={() => setMode("manual")}
            className="rounded-xl border border-foreground/20 px-6 py-4 text-left hover:bg-foreground/5 transition-colors"
          >
            <p className="font-medium">Check-in manual</p>
            <p className="mt-1 text-sm text-muted">Busque o aluno pelo nome</p>
          </button>
          <button
            onClick={() => setMode("qr")}
            className="rounded-xl border border-foreground/20 px-6 py-4 text-left hover:bg-foreground/5 transition-colors"
          >
            <p className="font-medium">Ler QR Code</p>
            <p className="mt-1 text-sm text-muted">Abra a câmera e escaneie o cartão do aluno</p>
          </button>
        </div>
      )}

      {mode === "manual" && (
        <ManualCheckin onBack={() => setMode("select")} onSuccess={handleClose} />
      )}

      {mode === "qr" && (
        <QrCheckin onBack={() => setMode("select")} onSuccess={handleClose} />
      )}
    </Modal>
  );
}

// ── Manual check-in ───────────────────────────────────────────────────────────

function ManualCheckin({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [query, setQuery] = useState("");
  const { data: results, isLoading } = useStudentSearch(query);
  const { mutate: checkin, isPending } = useManualCheckin();

  function handleCheckin(student: Student) {
    checkin(student.id, { onSuccess });
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o nome do aluno..."
        className="w-full rounded-2xl border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
      />

      {isLoading && <p className="text-sm text-muted">Buscando...</p>}

      {results && results.length === 0 && query.length > 0 && (
        <p className="text-sm text-muted">Nenhum aluno encontrado.</p>
      )}

      <ul className="flex flex-col gap-2">
        {results?.map((student) => (
          <li key={student.id}>
            <button
              disabled={isPending}
              onClick={() => handleCheckin(student)}
              className="w-full rounded-xl border border-foreground/10 px-4 py-3 text-left hover:bg-foreground/5 transition-colors disabled:opacity-50"
            >
              <p className="font-medium">{student.name}</p>
              <p className="text-xs text-muted">{student.email}</p>
            </button>
          </li>
        ))}
      </ul>

      <button onClick={onBack} className="mt-2 text-sm text-muted hover:opacity-70 transition-opacity">
        ← Voltar
      </button>
    </div>
  );
}

// ── QR check-in ───────────────────────────────────────────────────────────────

function QrCheckin({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasScanned = useRef(false);
  const { mutate: checkin } = useQrCheckin();

  useEffect(() => {
    const scannerId = "qr-reader";
    const scanner = new Html5Qrcode(scannerId);
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
              onSuccess: () => {
                alert("✓ Check-in realizado com sucesso!");
                onSuccess();
              },
              onError: () => {
                alert("Erro ao registrar o check-in. Tente novamente.");
                hasScanned.current = false;
                onBack();
              },
            });
          });
        },
        undefined,
      )
      .catch(() => {
        alert("Não foi possível acessar a câmera. Verifique as permissões.");
        onBack();
      });

    return () => {
      scanner.isScanning && scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted">Aponte a câmera para o QR Code do aluno</p>
      <div id="qr-reader" className="w-full overflow-hidden rounded-xl" />
      <button onClick={onBack} className="text-sm text-muted hover:opacity-70 transition-opacity">
        ← Voltar
      </button>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md max-h-[90vh] flex flex-col bg-background rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose} className="text-xl leading-none hover:opacity-60 transition-opacity">×</button>
        </div>
        <div className="overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
