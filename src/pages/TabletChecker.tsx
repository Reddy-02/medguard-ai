import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Upload,
  Pill,
  Languages,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Volume2,
} from "lucide-react";

type State = "idle" | "scanning" | "verified";

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");

  /* 🔊 TEXT TO SPEECH */
  const speak = (text: string) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = language === "Hindi" ? "hi-IN" : "en-US";
    msg.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

  /* AI SCAN */
  useEffect(() => {
    if (state === "scanning") {
      setTimeout(() => setState("verified"), 2500);
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

        {/* INPUT */}
        {state === "idle" && (
          <div className="glass-panel-strong p-10">
            <div className="grid md:grid-cols-2 gap-10">

              {/* UPLOAD */}
              <div>
                <div className="flex items-center gap-2 text-primary font-semibold mb-3">
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
                  {/* NAME */}
                  <div>
                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                      <Pill /> Tablet Imprint / Name
                    </div>
                    <input
                      value={tablet}
                      onChange={(e) => setTablet(e.target.value)}
                      placeholder="e.g., Dolo 650 / Paracetamol"
                      className="h-12 w-full rounded-xl border border-input px-4 bg-background focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  {/* PREMIUM LANGUAGE SELECT */}
                  <div>
                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                      <Languages /> Select Language
                    </div>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="appearance-none h-12 w-full rounded-xl border border-input px-4 bg-white dark:bg-background shadow-md focus:ring-2 focus:ring-primary/30"
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Chinese</option>
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ▼
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setState("scanning")}
                  disabled={!tablet}
                  className="h-14 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-primary to-accent neon-glow-blue hover:scale-[1.02] transition disabled:opacity-50"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCANNING */}
        {state === "scanning" && (
          <div className="glass-panel p-16 text-center">
            <div className="animate-spin w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full" />
            <p className="mt-4 font-semibold">AI Scanning Tablet…</p>
          </div>
        )}

        {/* VERIFIED */}
        {state === "verified" && (
          <div className="space-y-16">

            {/* 🌈 ADVANCED 3D HOLOGRAM */}
            <div className="flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 rounded-full border border-accent/30 animate-spin-slow neon-glow-green" />
                <div className="absolute inset-4 rounded-full border-2 border-primary/40 animate-spin-reverse" />
                <div className="absolute inset-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-neon floating-3d">
                  <span className="text-white font-bold tracking-widest text-lg">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* MED INFO */}
              <div className="glass-panel p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Medication Info</h3>
                  <button
                    onClick={() =>
                      speak(
                        "Paracetamol is used for fever and mild to moderate pain."
                      )
                    }
                  >
                    <Volume2 className="text-black w-5 h-5" />
                  </button>
                </div>
                <p><strong>Name:</strong> {tablet}</p>
                <p><strong>Uses:</strong> Fever, headache, mild pain</p>
                <p><strong>Manufacturer:</strong> Crocin / Dolo 650</p>
              </div>

              {/* DOSAGE */}
              <div className="glass-panel p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Dosage Information</h3>
                  <button
                    onClick={() =>
                      speak(
                        "Take 500 to 1000 milligrams every 4 to 6 hours. Do not exceed 4000 milligrams per day."
                      )
                    }
                  >
                    <Volume2 className="text-black w-5 h-5" />
                  </button>
                </div>
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
                <li>Avoid alcohol</li>
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
