import { useState, useCallback, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Upload, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- TYPES ---------------- */
type Language = "en" | "es" | "fr" | "de" | "hi" | "zh";
type State = "idle" | "scanning" | "verified";

/* ---------------- MOCK DATA ---------------- */
const medication = {
  name: "Paracetamol",
  treats: "Fever, Headache, Mild to moderate pain",
  manufacturer: "Crocin, Dolo 650",
  dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
  precautions: [
    "Do not exceed maximum daily dose",
    "Avoid alcohol consumption",
    "Check other medicines for paracetamol content",
    "Consult doctor if fever persists",
  ],
  sideEffects: "Rare allergic reactions; liver damage in overdose",
  risk: "LOW",
};

/* ---------------- TTS ---------------- */
const speak = (text: string) => {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
};

/* ================= PAGE ================= */
export default function TabletChecker() {
  const [state, setState] = useState<State>("idle");
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState<Language>("en");

  const verify = useCallback(async () => {
    if (!tablet) return;
    setState("scanning");
    await new Promise((r) => setTimeout(r, 2000));
    setState("verified");
  }, [tablet]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-14 space-y-14">

        {/* ---------- HEADER ---------- */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold holographic-text">
            Tablet Verification
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Upload an image or enter tablet details for instant AI verification.
            Always consult a licensed doctor or pharmacist before use.
          </p>
        </div>

        {/* ---------- INPUT CARD ---------- */}
        {state !== "verified" && (
          <div className="glass-panel-strong max-w-4xl mx-auto p-10 grid md:grid-cols-2 gap-8 hover-lift">

            {/* Upload */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mb-3" />
              <span className="font-medium">Upload Tablet Image</span>
              <span className="text-xs text-muted-foreground">
                (optional)
              </span>
              <input type="file" className="hidden" />
            </label>

            {/* Inputs */}
            <div className="space-y-6">
              <Input
                placeholder="e.g., IBU 200 or Paracetamol"
                value={tablet}
                onChange={(e) => setTablet(e.target.value)}
              />

              <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={verify}
                className="w-full h-12 bg-[var(--gradient-primary)] text-white neon-glow-blue"
              >
                Verify Tablet
              </Button>
            </div>
          </div>
        )}

        {/* ---------- VERIFIED ---------- */}
        {state === "verified" && (
          <>
            {/* ===== 3D VERIFIED HOLOGRAM ===== */}
            <div className="flex justify-center py-10">
              <div className="relative w-80 h-80 flex items-center justify-center">

                <div className="absolute inset-0 rounded-full border border-accent/40 animate-pulse-glow" />
                <div className="absolute inset-6 rounded-full glass-panel neon-glow-green" />

                <div className="absolute inset-14 rounded-full bg-gradient-to-br
                  from-[hsl(var(--accent))]
                  via-[hsl(var(--neon-cyan))]
                  to-[hsl(var(--cyber-blue))]
                  neon-glow-green floating-3d flex items-center justify-center">

                  <div className="text-center text-white">
                    <div className="text-7xl font-extrabold drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]">
                      ✓
                    </div>
                    <p className="mt-2 text-xs tracking-[0.3em] font-semibold uppercase">
                      Verified
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-10 text-center">
                  <p className="text-lg font-semibold holographic-text">
                    Verified Authentic
                  </p>
                  <p className="text-xs text-muted-foreground">
                    AI Trust Seal • Risk Level: {medication.risk}
                  </p>
                </div>
              </div>
            </div>

            {/* ===== INFO GRID ===== */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

              {/* Medication */}
              <InfoCard title="Medication Info" onSpeak={() =>
                speak(`${medication.name}. ${medication.treats}. Manufacturer ${medication.manufacturer}`)
              }>
                <Info label="Name" value={medication.name} />
                <Info label="Treats" value={medication.treats} />
                <Info label="Manufacturer" value={medication.manufacturer} />
              </InfoCard>

              {/* Dosage */}
              <InfoCard title="Dosage Information" onSpeak={() =>
                speak(medication.dosage)
              }>
                <Info label="Dosage" value={medication.dosage} />
              </InfoCard>
            </div>

            {/* Precautions */}
            <Section title="Precautions">
              <ul className="space-y-2">
                {medication.precautions.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="h-2 w-2 mt-2 rounded-full bg-accent animate-pulse-glow" />
                    {p}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Side Effects */}
            <Section title="Possible Side Effects">
              {medication.sideEffects}
            </Section>

            <div className="text-center">
              <Button onClick={() => setState("idle")} className="px-10">
                Check Another Tablet
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */
function InfoCard({
  title,
  children,
  onSpeak,
}: {
  title: string;
  children: React.ReactNode;
  onSpeak: () => void;
}) {
  return (
    <div className="glass-panel p-6 hover-lift">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <Volume2 className="cursor-pointer" onClick={onSpeak} />
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p>{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-panel max-w-6xl mx-auto p-6">
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
