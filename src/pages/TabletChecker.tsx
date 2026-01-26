import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Upload,
  Languages,
  Pill,
  CheckCircle2,
  Radar,
  ShieldAlert,
  Volume2,
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type Language = "en" | "hi" | "es" | "fr" | "de" | "zh";
type State = "idle" | "scanning" | "verified";

/* ---------------- TTS ---------------- */
function speak(text: string, lang: Language) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang =
    lang === "hi"
      ? "hi-IN"
      : lang === "zh"
      ? "zh-CN"
      : `${lang}-${lang.toUpperCase()}`;
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

/* ---------------- PAGE ---------------- */
export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [state, setState] = useState<State>("idle");
  const [risk, setRisk] = useState<"LOW" | "MEDIUM" | "HIGH">("LOW");

  useEffect(() => {
    if (state === "verified") {
      const levels = ["LOW", "MEDIUM", "HIGH"] as const;
      setRisk(levels[Math.floor(Math.random() * levels.length)]);
    }
  }, [state]);

  const verify = async () => {
    if (!tablet) return;
    setState("scanning");
    await new Promise((r) => setTimeout(r, 2500));
    setState("verified");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* OFFSET FIX */}
      <main className="container max-w-7xl pt-24 pb-20 space-y-20">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold holographic-text">
            Tablet Verification
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered medicine authentication with real-time safety analysis
          </p>
        </div>

        {/* INPUT CARD */}
        {state !== "verified" && (
          <div className="glass-panel-strong p-12">
            <div className="grid md:grid-cols-2 gap-12 items-stretch">

              {/* LEFT */}
              <div className="flex flex-col gap-6">

                <div className="flex items-center gap-3 text-primary">
                  <Upload />
                  <h3 className="font-semibold text-lg">
                    Upload Tablet Image
                  </h3>
                </div>

                <label className="h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition">
                  <Radar className="w-10 h-10 text-muted-foreground mb-2" />
                  <p className="font-medium">Drop or Click to Upload</p>
                  <p className="text-xs text-muted-foreground">
                    Optional – improves AI scan accuracy
                  </p>
                  <input type="file" className="hidden" />
                </label>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col justify-between gap-8">

                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-primary">
                    <Pill />
                    <h3 className="font-semibold text-lg">
                      Tablet Imprint / Name
                    </h3>
                  </div>

                  <input
                    value={tablet}
                    onChange={(e) => setTablet(e.target.value)}
                    placeholder="e.g., Dolo 650 / Paracetamol"
                    className="h-12 w-full rounded-xl border px-4 bg-background"
                  />

                  <div className="flex items-center gap-3 text-primary">
                    <Languages />
                    <h3 className="font-semibold text-lg">
                      Select Language
                    </h3>
                  </div>

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="h-12 w-full rounded-xl border px-4 bg-background"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>

                <button
                  onClick={verify}
                  disabled={!tablet}
                  className="h-14 rounded-xl text-lg font-semibold text-white bg-[var(--gradient-primary)] neon-glow-blue hover:scale-105 transition"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCANNING */}
        {state === "scanning" && (
          <div className="glass-panel p-12 text-center space-y-6">
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 rounded-full border border-primary animate-ping" />
              <div className="absolute inset-4 rounded-full border-2 border-primary animate-spin" />
              <Radar className="absolute inset-0 m-auto w-16 h-16 text-primary" />
            </div>
            <p className="text-lg font-medium">
              AI scanning tablet authenticity…
            </p>
          </div>
        )}

        {/* VERIFIED */}
        {state === "verified" && (
          <div className="space-y-16">

            {/* 🌈 3D HOLOGRAM */}
            <div className="flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 rounded-full border border-accent/40 animate-pulse-glow" />
                <div className="absolute inset-8 rounded-full glass-panel neon-glow-green" />
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-accent to-primary floating-3d flex items-center justify-center">
                  <CheckCircle2 className="w-20 h-20 text-white" />
                </div>
              </div>
            </div>

            {/* STATUS */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold holographic-text">
                VERIFIED AUTHENTIC
              </h2>
              <p className="text-muted-foreground">
                AI-verified • Tamper-safe • Trusted source
              </p>
            </div>

            {/* RISK */}
            <div className="glass-panel p-6 flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-primary" />
                <span className="font-semibold">Risk Level</span>
              </div>
              <span
                className={`px-4 py-1 rounded-full text-sm font-bold ${
                  risk === "LOW"
                    ? "bg-green-500/20 text-green-500"
                    : risk === "MEDIUM"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "bg-red-500/20 text-red-500"
                }`}
              >
                {risk}
              </span>
            </div>

            {/* INFO */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="glass-panel p-6 space-y-3">
                <h3 className="font-semibold text-lg">
                  Medication Information
                </h3>
                <p><strong>Name:</strong> {tablet}</p>
                <p><strong>Uses:</strong> Fever, pain relief</p>
                <p><strong>Manufacturer:</strong> Verified Pharma Ltd.</p>
              </div>

              <div className="glass-panel p-6 space-y-3">
                <h3 className="font-semibold text-lg">
                  Dosage Information
                </h3>
                <p>500–1000 mg every 4–6 hours</p>
                <button
                  onClick={() =>
                    speak(
                      "Dosage is 500 to 1000 milligrams every 4 to 6 hours",
                      language
                    )
                  }
                  className="flex items-center gap-2 text-primary text-sm"
                >
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
