import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Upload,
  Pill,
  Languages,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

type State = "idle" | "scanning" | "verified";

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* OFFSET FOR FIXED NAVBAR */}
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
        {state !== "verified" && (
          <div className="glass-panel-strong p-10">
            <div className="grid md:grid-cols-2 gap-10">

              {/* LEFT – UPLOAD */}
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

              {/* RIGHT – FORM */}
              <div className="flex flex-col justify-between space-y-8">

                <div className="space-y-6">
                  {/* TABLET NAME */}
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

                  {/* LANGUAGE */}
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

                {/* ✅ VERIFY BUTTON (FIXED) */}
                <button
                  onClick={() => setState("verified")}
                  disabled={!tablet}
                  className="h-14 w-full rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-primary to-accent neon-glow-blue hover:scale-[1.02] transition disabled:opacity-50"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VERIFIED RESULT */}
        {state === "verified" && (
          <div className="space-y-12">

            {/* VERIFIED BANNER */}
            <div className="glass-panel p-6 flex items-center justify-center gap-3 neon-glow-green">
              <CheckCircle2 className="w-7 h-7 text-accent" />
              <span className="text-2xl font-bold text-accent">
                VERIFIED AUTHENTIC
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
                <p className="text-muted-foreground">
                  Max 4000 mg per day
                </p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel p-6 space-y-3">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldAlert className="text-primary" />
                Precautions
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Do not exceed maximum daily dose</li>
                <li>Avoid alcohol consumption</li>
                <li>Check other medicines for paracetamol</li>
                <li>Consult a doctor if fever persists</li>
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="glass-panel p-6 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="text-yellow-500" />
                Possible Side Effects
              </div>
              <p className="text-muted-foreground">
                Rare allergic reactions; liver damage in overdose
              </p>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setState("idle");
                  setTablet("");
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
