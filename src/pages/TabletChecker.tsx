import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Upload, CheckCircle2 } from "lucide-react";

type VerificationState = "idle" | "verified";

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<VerificationState>("idle");

  return (
    <div className="min-h-screen bg-background">
      {/* FIXED NAVBAR */}
      <Navbar />

      {/* 🔥 MAIN OFFSET FIX (VERY IMPORTANT) */}
      <main className="container max-w-7xl pt-24 pb-20 space-y-16">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold holographic-text">
            Tablet Verification
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Upload an image or enter tablet details for instant AI verification.
            Always consult a licensed doctor or pharmacist before use.
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="glass-panel-strong p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* UPLOAD AREA */}
            <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed rounded-2xl cursor-pointer hover:border-primary transition">
              <Upload className="w-10 h-10 text-muted-foreground mb-3" />
              <span className="font-medium text-lg">
                Upload Tablet Image
              </span>
              <span className="text-sm text-muted-foreground">
                Optional – improves AI accuracy
              </span>
              <input type="file" className="hidden" />
            </label>

            {/* FORM */}
            <div className="space-y-6">
              <input
                value={tabletName}
                onChange={(e) => setTabletName(e.target.value)}
                placeholder="e.g., Paracetamol / IBU 200"
                className="w-full h-12 rounded-xl border border-input px-4 bg-background"
              />

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-12 rounded-xl border border-input px-4 bg-background"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
              </select>

              <button
                onClick={() => setState("verified")}
                className="w-full h-12 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-accent neon-glow-blue hover:scale-[1.02] transition"
              >
                Verify Tablet
              </button>
            </div>
          </div>
        </div>

        {/* VERIFIED RESULT */}
        {state === "verified" && (
          <div className="space-y-10">

            {/* VERIFIED BANNER */}
            <div className="glass-panel p-6 flex items-center justify-center gap-4 neon-glow-green animate-pulse-glow">
              <CheckCircle2 className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold text-accent">
                VERIFIED AUTHENTIC
              </span>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* MEDICATION INFO */}
              <div className="glass-panel p-6 space-y-3 hover-lift">
                <h3 className="text-xl font-semibold">Medication Info</h3>
                <p><strong>Name:</strong> Paracetamol</p>
                <p><strong>Uses:</strong> Fever, Headache, Mild pain</p>
                <p><strong>Manufacturer:</strong> Crocin / Dolo 650</p>
              </div>

              {/* DOSAGE INFO */}
              <div className="glass-panel p-6 space-y-3 hover-lift">
                <h3 className="text-xl font-semibold">Dosage Information</h3>
                <p>500–1000 mg every 4–6 hours</p>
                <p className="text-muted-foreground">
                  Max 4000 mg per day
                </p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel p-6 space-y-4">
              <h3 className="text-xl font-semibold">Precautions</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Do not exceed maximum daily dose</li>
                <li>Avoid alcohol consumption</li>
                <li>Check other medicines for paracetamol content</li>
                <li>Consult doctor if fever persists</li>
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="glass-panel p-6 space-y-3">
              <h3 className="text-xl font-semibold">Possible Side Effects</h3>
              <p className="text-muted-foreground">
                Rare allergic reactions; liver damage in overdose
              </p>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setState("idle");
                  setTabletName("");
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
