import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Upload,
  Pill,
  Languages,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Activity,
} from "lucide-react";

type State = "idle" | "scanning" | "verified";

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");
  const [risk, setRisk] = useState<"LOW" | "MED" | "HIGH">("LOW");

  /* 🔊 TEXT TO SPEECH */
  const speakVerified = () => {
    const msg = new SpeechSynthesisUtterance(
      `Tablet verified authentic. Risk level ${risk}. Please use as prescribed.`
    );
    msg.lang = language === "Hindi" ? "hi-IN" : "en-US";
    msg.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

  /* ⏳ SIMULATED AI SCAN */
  useEffect(() => {
    if (state === "scanning") {
      setTimeout(() => {
        setRisk("LOW");
        setState("verified");
        speakVerified();
      }, 2500);
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-7xl pt-24 pb-20 space-y-16">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold holographic-text">
            Tablet Verification
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered medicine authentication with real-time safety analysis
          </p>
        </div>

        {/* INPUT CARD */}
        {state === "idle" && (
          <div className="glass-panel-strong p-10">
            <div className="grid md:grid-cols-2 gap-10">

              {/* UPLOAD */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Upload /> Upload Tablet Image
                </div>

                <label className="h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="font-medium">Drop or Click to Upload</p>
                  <p className="text-xs text-muted-foreground">
                    Optional – improves AI accuracy
                  </p>
                  <input type="file" className="hidden" />
                </label>
              </div>

              {/* FORM */}
              <div className="flex flex-col justify-between space-y-8">

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Pill /> Tablet Imprint / Name
                    </div>
                    <input
                      value={tablet}
                      onChange={(e) => setTablet(e.target.value)}
                      placeholder="e.g., Dolo 650 / Paracetamol"
                      className="h-12 w-full rounded-xl border border-input px-4 bg-background focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Languages /> Select Language
                    </div>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="h-12 w-full rounded-xl border border-input px-4 bg-background focus:ring-2 focus:ring-primary/30"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setState("scanning")}
                  disabled={!tablet}
                  className="h-14 w-full rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-primary to-accent neon-glow-blue hover:scale-[1.02] transition disabled:opacity-50"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ⚡ AI SCANNING */}
        {state === "scanning" && (
          <div className="flex flex-col items-center gap-6 glass-panel p-12">
            <Activity className="w-12 h-12 text-primary animate-spin" />
            <p className="text-lg font-semibold">AI Scanning in Progress</p>
            <div className="w-64 h-1 bg-muted rounded overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-primary to-accent animate-pulse" />
            </div>
          </div>
        )}

        {/* ✅ VERIFIED */}
        {state === "verified" && (
          <div className="space-y-14">

            {/* 🌈 3D HOLOGRAM */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-64 h-64 perspective-[1200px]">
                <div className="absolute inset-0 rounded-full border border-accent/40 animate-spin-slow neon-glow-green" />
                <div className="absolute inset-6 rounded-full border-2 border-primary/40 animate-spin-reverse" />
                <div className="absolute inset-14 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center floating-3d shadow-neon">
                  <span className="text-white font-bold tracking-widest">
                    VERIFIED
                  </span>
                </div>
              </div>

              <button
                onClick={speakVerified}
                className="px-6 py-2 rounded-xl glass-panel hover:neon-glow-blue transition"
              >
                🔊 Hear AI Confirmation
              </button>
            </div>

            {/* 📊 RISK LEVEL */}
            <div className="glass-panel p-6 text-center">
              <p className="font-semibold mb-2">Risk Level</p>
              <span className="px-6 py-2 rounded-full bg-green-500/20 text-green-600 font-bold">
                {risk}
              </span>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-6 space-y-2">
                <h3 className="font-semibold text-lg">Medication Info</h3>
                <p><strong>Name:</strong> {tablet}</p>
                <p><strong>Uses:</strong> Fever, headache, mild pain</p>
                <p><strong>Manufacturer:</strong> Crocin / Dolo 650</p>
              </div>

              <div className="glass-panel p-6 space-y-2">
                <h3 className="font-semibold text-lg">Dosage Information</h3>
                <p>500–1000 mg every 4–6 hours</p>
                <p className="text-muted-foreground">Max 4000 mg/day</p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldAlert className="text-primary" />
                Precautions
              </div>
              <ul className="list-disc list-inside text-muted-foreground mt-2">
                <li>Do not exceed maximum daily dose</li>
                <li>Avoid alcohol consumption</li>
                <li>Consult doctor if fever persists</li>
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="text-yellow-500" />
                Possible Side Effects
              </div>
              <p className="text-muted-foreground mt-2">
                Rare allergic reactions; liver damage in overdose
              </p>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setTablet("");
                  setState("idle");
                }}
                className="px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:scale-105 transition"
              >
                Check Another Tablet
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
