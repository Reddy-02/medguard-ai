import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
type State = "idle" | "verifying" | "verified";

/* ---------------- MOCK DATA ---------------- */
const DATA = {
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
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [state, setState] = useState<State>("idle");

  const verify = async () => {
    if (!tablet.trim()) return;
    setState("verifying");
    await new Promise((r) => setTimeout(r, 2000));
    setState("verified");
  };

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
          <div className="glass-panel-strong max-w-5xl mx-auto p-10 hover-lift">
            <div className="grid md:grid-cols-2 gap-10 items-stretch">

              {/* LEFT : Upload */}
              <label
                className="flex flex-col items-center justify-center
                border-2 border-dashed rounded-2xl p-12
                text-center cursor-pointer transition
                hover:bg-secondary/50 h-full"
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="font-semibold text-lg">Upload Tablet Image</p>
                <p className="text-sm text-muted-foreground">
                  Optional – improves AI accuracy
                </p>
                <input type="file" className="hidden" />
              </label>

              {/* RIGHT : Inputs + Button */}
              <div className="flex flex-col justify-between space-y-8 h-full">

                <div className="space-y-5">
                  <Input
                    placeholder="e.g., Paracetamol / IBU 200"
                    value={tablet}
                    onChange={(e) => setTablet(e.target.value)}
                    className="h-12 text-base"
                  />

                  <Select
                    value={language}
                    onValueChange={(v) => setLanguage(v as Language)}
                  >
                    <SelectTrigger className="h-12">
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
                </div>

                {/* VERIFY BUTTON */}
                <Button
                  onClick={verify}
                  disabled={!tablet || state === "verifying"}
                  className={cn(
                    "h-14 text-lg font-semibold rounded-xl",
                    "bg-[var(--gradient-primary)] text-white",
                    "neon-glow-blue transition-all",
                    (!tablet || state === "verifying") &&
                      "opacity-60 cursor-not-allowed"
                  )}
                >
                  {state === "verifying" ? "Verifying..." : "Verify Tablet"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ---------- VERIFIED SECTION ---------- */}
        {state === "verified" && (
          <>
            {/* ===== 3D VERIFIED HOLOGRAM ===== */}
            <div className="flex justify-center py-10">
              <div className="relative w-80 h-80 flex items-center justify-center">

                <div className="absolute inset-0 rounded-full border border-accent/40 animate-pulse-glow" />
                <div className="absolute inset-6 rounded-full glass-panel neon-glow-green" />

                <div
                  className="absolute inset-14 rounded-full
                  bg-gradient-to-br
                  from-[hsl(var(--accent))]
                  via-[hsl(var(--neon-cyan))]
                  to-[hsl(var(--cyber-blue))]
                  neon-glow-green floating-3d
                  flex items-center justify-center"
                >
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
                    AI Trust Seal • Risk Level: {DATA.risk}
                  </p>
                </div>
              </div>
            </div>

            {/* ---------- INFO GRID ---------- */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <InfoCard
                title="Medication Info"
                onSpeak={() =>
                  speak(
                    `${DATA.name}. ${DATA.treats}. Manufacturer ${DATA.manufacturer}`
                  )
                }
              >
                <Info label="Name" value={DATA.name} />
                <Info label="Treats" value={DATA.treats} />
                <Info label="Manufacturer" value={DATA.manufacturer} />
              </InfoCard>

              <InfoCard
                title="Dosage Information"
                onSpeak={() => speak(DATA.dosage)}
              >
                <Info label="Dosage" value={DATA.dosage} />
              </InfoCard>
            </div>

            {/* Precautions */}
            <Section title="Precautions">
              <ul className="space-y-2">
                {DATA.precautions.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="h-2 w-2 mt-2 rounded-full bg-accent animate-pulse-glow" />
                    {p}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Side Effects */}
            <Section title="Possible Side Effects">
              {DATA.sideEffects}
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

/* ---------------- COMPONENTS ---------------- */
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel max-w-6xl mx-auto p-6">
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
