import { useState, useCallback, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  Volume2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- TYPES ---------------- */
type Language = "en" | "es" | "fr" | "de" | "hi" | "zh";
type VerificationState = "idle" | "analyzing" | "checking" | "verified";

/* ---------------- TRANSLATIONS ---------------- */
const translations = {
  en: {
    subtitle: "Instant AI-based medicine authenticity check",
    tabletName: "Tablet Name",
    placeholder: "e.g., Paracetamol",
    language: "Language",
    verify: "Verify Tablet",
    verified: "Verified Authentic",
    medicationInfo: "Medication Info",
    dosageInfo: "Dosage Information",
    precautions: "Precautions",
    sideEffects: "Possible Side Effects",
    riskLevel: "Risk Level",
  },
};

const languageNames: Record<Language, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  hi: "Hindi",
  zh: "Chinese",
};

/* ---------------- MOCK MED DATA ---------------- */
const medication = {
  uses: "Fever, mild to moderate pain",
  manufacturer: "GSK Pharmaceuticals",
  dosage: "500–1000mg",
  frequency: "Every 4–6 hours",
  precautions: [
    "Do not exceed recommended dose",
    "Avoid alcohol",
    "Consult doctor if pain persists",
    "Not for children without prescription",
  ],
  sideEffects: ["Nausea", "Dizziness", "Stomach upset", "Allergic reaction"],
};

/* ---------------- TTS ---------------- */
function useTTS() {
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };
  return { speak };
}

/* ---------------- COMPONENT ---------------- */
export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [state, setState] = useState<VerificationState>("idle");

  const t = translations.en;
  const { speak } = useTTS();

  const handleVerify = async () => {
    if (!tablet) return;
    setState("analyzing");
    await new Promise((r) => setTimeout(r, 1200));
    setState("checking");
    await new Promise((r) => setTimeout(r, 1200));
    setState("verified");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-10 space-y-10">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Tablet Checker</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* INPUT CARD */}
        {state === "idle" && (
          <div className="glass-card p-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <label className="upload-zone flex flex-col items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm mt-2">Click to upload</span>
            </label>

            <div className="space-y-5">
              <div>
                <Label>{t.tabletName}</Label>
                <Input
                  placeholder={t.placeholder}
                  value={tablet}
                  onChange={(e) => setTablet(e.target.value)}
                />
              </div>

              <div>
                <Label>{t.language}</Label>
                <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languageNames).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="btn-gradient w-full" onClick={handleVerify}>
                {t.verify}
              </Button>
            </div>
          </div>
        )}

        {/* SCANNING */}
        {(state === "analyzing" || state === "checking") && (
          <div className="glass-card p-8 max-w-xl mx-auto flex items-center gap-4 justify-center">
            <Loader2 className="animate-spin text-primary" />
            <span className="font-medium">
              {state === "analyzing" ? "Analyzing tablet…" : "Checking database…"}
            </span>
          </div>
        )}

        {/* VERIFIED RESULT */}
        {state === "verified" && (
          <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
            {/* HOLOGRAM BANNER */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-5 text-white flex items-center justify-center gap-3">
              <span className="absolute inset-0 animate-pulse bg-white/10" />
              <CheckCircle2 className="h-6 w-6 z-10" />
              <span className="text-lg font-semibold z-10">
                {t.verified}
              </span>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">{t.medicationInfo}</h3>
                <p><b>Uses:</b> {medication.uses}</p>
                <p className="mt-2"><b>Manufacturer:</b> {medication.manufacturer}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speak(medication.uses)}
                  className="mt-3"
                >
                  <Volume2 />
                </Button>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">{t.dosageInfo}</h3>
                <p><b>Dosage:</b> {medication.dosage}</p>
                <p className="mt-2"><b>Frequency:</b> {medication.frequency}</p>
              </div>
            </div>

            {/* RISK LEVEL */}
            <div className="glass-card p-6 flex items-center gap-4">
              <AlertTriangle className="text-yellow-500" />
              <div>
                <h3 className="font-semibold">{t.riskLevel}</h3>
                <div className="h-3 w-full rounded-full bg-muted mt-2">
                  <div className="h-3 w-[25%] rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Low Risk (Doctor recommended)
                </p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">{t.precautions}</h3>
              <ul className="list-disc ml-6 space-y-2">
                {medication.precautions.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">{t.sideEffects}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {medication.sideEffects.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <Button className="btn-gradient px-10" onClick={() => setState("idle")}>
                Check Another Tablet
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
