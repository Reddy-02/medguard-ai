import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Upload,
  Pill,
  Languages,
  AlertTriangle,
  ShieldAlert,
  Volume2,
} from "lucide-react";

type State = "idle" | "verified";

/* ================= MEDICINE DATABASE ================= */
const MEDICINES: Record<
  string,
  {
    name: string;
    disease: string;
    dosage: string;
    precautions: string[];
    sideEffects: string;
    manufacturer: string;
    verified: boolean;
  }
> = {
  paracetamol: {
    name: "Paracetamol",
    disease: "Fever, Headache, Mild to moderate pain",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol consumption",
      "Check other medicines for paracetamol content",
      "Consult doctor if fever persists",
    ],
    sideEffects: "Rare allergic reactions; liver damage in overdose",
    manufacturer: "Crocin, Dolo 650",
    verified: true,
  },

  vitamind3: {
    name: "Vitamin D3",
    disease: "Vitamin D deficiency",
    dosage: "60,000 IU once weekly",
    precautions: ["Avoid overdose", "Monitor calcium levels"],
    sideEffects: "Rare hypercalcemia",
    manufacturer: "Calcirol",
    verified: true,
  },

  ibuprofen: {
    name: "Ibuprofen",
    disease: "Pain, Inflammation, Fever",
    dosage: "200–400 mg every 6 hours",
    precautions: [
      "Take after food",
      "Avoid alcohol",
      "Avoid during pregnancy",
    ],
    sideEffects: "Acidity, nausea",
    manufacturer: "Brufen",
    verified: true,
  },
};

/* ================= SPEECH TEXT ================= */
const speechText: Record<string, { medicine: string; dosage: string }> = {
  English: {
    medicine:
      "This medicine is used to treat the listed conditions. Please follow precautions carefully.",
    dosage:
      "Follow the dosage instructions provided. Do not exceed the recommended limit.",
  },
};

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");

  /* ================= FIXED LOOKUP (IMPORTANT) ================= */
  const normalizedKey = tablet
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const medicine = MEDICINES[normalizedKey];

  /* ================= TEXT TO SPEECH ================= */
  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-7xl pt-24 pb-20 space-y-20">
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
              <div>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Upload /> Upload Tablet Image
                </div>
                <label className="h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p>Drop or Click to Upload</p>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Pill /> Tablet Imprint / Name
                    </div>
                    <input
                      value={tablet}
                      onChange={(e) => setTablet(e.target.value)}
                      className="h-12 w-full rounded-xl border px-4"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Languages /> Select Language
                    </div>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="h-12 w-full rounded-xl border px-4"
                    >
                      <option>English</option>
                    </select>
                  </div>
                </div>

                <button
                  disabled={!tablet}
                  onClick={() => setState("verified")}
                  className="h-14 w-full rounded-xl text-white bg-gradient-to-r from-primary to-accent"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VERIFIED */}
        {state === "verified" && (
          <>
            {!medicine && (
              <div className="glass-panel p-6 text-center text-red-500 font-semibold">
                Medicine not found in database
              </div>
            )}

            {medicine && (
              <>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="glass-panel p-8">
                    <div className="flex justify-between">
                      <h3>Medication Info</h3>
                      <Volume2 onClick={() => speak(speechText.English.medicine)} />
                    </div>
                    <p><strong>Name:</strong> {medicine.name}</p>
                    <p><strong>Uses:</strong> {medicine.disease}</p>
                    <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
                  </div>

                  <div className="glass-panel p-8">
                    <div className="flex justify-between">
                      <h3>Dosage</h3>
                      <Volume2 onClick={() => speak(speechText.English.dosage)} />
                    </div>
                    <p>{medicine.dosage}</p>
                  </div>
                </div>

                <div className="glass-panel p-8">
                  <ShieldAlert /> Precautions
                  <ul>
                    {medicine.precautions.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="glass-panel p-8">
                  <AlertTriangle /> Side Effects
                  <p>{medicine.sideEffects}</p>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
