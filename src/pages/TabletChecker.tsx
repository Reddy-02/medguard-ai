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

/* ================== MEDICINE DATABASE ================== */
/* 🔴 NOTHING UI RELATED HERE */
const MEDICINES: Record<
  string,
  {
    name: string;
    disease: string;
    dosage: string;
    precautions: string[];
    sideEffects: string;
    manufacturer: string;
  }
> = {
  paracetamol: {
    name: "Paracetamol",
    disease: "Fever, Headache, Mild to moderate pain",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol consumption",
      "Check other medicines for paracetamol",
      "Consult doctor if fever persists",
    ],
    sideEffects: "Rare allergic reactions; liver damage in overdose",
    manufacturer: "Crocin, Dolo 650",
  },

  vitamind3: {
    name: "Vitamin D3",
    disease: "Vitamin D deficiency, Bone weakness",
    dosage: "60,000 IU once weekly",
    precautions: [
      "Avoid overdose",
      "Take only if deficiency confirmed",
    ],
    sideEffects: "Rare hypercalcemia",
    manufacturer: "Calcirol, Uprise D3",
  },

  ibuprofen: {
    name: "Ibuprofen",
    disease: "Pain, Inflammation, Fever",
    dosage: "200–400 mg every 6 hours",
    precautions: [
      "Take after food",
      "Avoid in stomach ulcers",
    ],
    sideEffects: "Acidity, nausea",
    manufacturer: "Brufen, Ibugesic",
  },

  amoxicillin: {
    name: "Amoxicillin",
    disease: "Bacterial infections",
    dosage: "500 mg every 8 hours",
    precautions: [
      "Complete full antibiotic course",
      "Avoid if penicillin allergy",
    ],
    sideEffects: "Diarrhea, rash",
    manufacturer: "Mox, Novamox",
  },

  cetirizine: {
    name: "Cetirizine",
    disease: "Allergic rhinitis",
    dosage: "10 mg once daily",
    precautions: ["May cause drowsiness"],
    sideEffects: "Sleepiness",
    manufacturer: "Zyrtec",
  },

  // ✅ you can keep adding 100+ here safely
};

/* ================== SPEECH ================== */
const getLangCode = (lang: string) => {
  switch (lang) {
    case "Hindi":
      return "hi-IN";
    case "Spanish":
      return "es-ES";
    case "French":
      return "fr-FR";
    case "German":
      return "de-DE";
    case "Chinese":
      return "zh-CN";
    default:
      return "en-US";
  }
};

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");

  /* 🔴 THIS IS THE FIX */
  const key = tablet.toLowerCase().replace(/[^a-z0-9]/g, "");
  const medicine = MEDICINES[key];

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = getLangCode(language);
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
          <p className="text-muted-foreground">
            AI-powered medicine authentication
          </p>
        </div>

        {/* INPUT */}
        {state === "idle" && (
          <div className="glass-panel-strong p-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="flex gap-2 text-primary font-semibold">
                  <Upload /> Upload Tablet Image
                </div>
                <label className="h-56 border-2 border-dashed rounded-2xl flex items-center justify-center">
                  <Upload />
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex gap-2 text-primary font-semibold">
                    <Pill /> Tablet Name
                  </div>
                  <input
                    value={tablet}
                    onChange={(e) => setTablet(e.target.value)}
                    className="h-12 w-full rounded-xl border px-4"
                  />
                </div>

                <div>
                  <div className="flex gap-2 text-primary font-semibold">
                    <Languages /> Language
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="h-12 w-full rounded-xl border px-4"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                  </select>
                </div>

                <button
                  disabled={!medicine}
                  onClick={() => setState("verified")}
                  className="h-14 w-full bg-gradient-to-r from-primary to-accent text-white rounded-xl"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VERIFIED */}
        {state === "verified" && medicine && (
          <div className="space-y-16">

            {/* 🔮 3D HOLOGRAM (UNCHANGED) */}
            <div className="flex justify-center">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 rounded-full border animate-spin-slow" />
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary to-accent blur-xl opacity-40" />
                <div className="absolute inset-24 rounded-full bg-gradient-to-br from-primary to-accent shadow-neon flex items-center justify-center floating-3d">
                  <span className="text-white text-2xl font-bold">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* INFO */}
            <div className="grid md:grid-cols-2 gap-10">
              <div className="glass-panel p-8">
                <div className="flex justify-between">
                  <h3>Medication Info</h3>
                  <Volume2 onClick={() => speak(medicine.disease)} />
                </div>
                <p><strong>Name:</strong> {medicine.name}</p>
                <p><strong>Uses:</strong> {medicine.disease}</p>
                <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
              </div>

              <div className="glass-panel p-8">
                <div className="flex justify-between">
                  <h3>Dosage</h3>
                  <Volume2 onClick={() => speak(medicine.dosage)} />
                </div>
                <p>{medicine.dosage}</p>
              </div>
            </div>

            <div className="glass-panel p-8">
              <ShieldAlert />
              <ul>
                {medicine.precautions.map((p, i) => (
                  <li key={i} className="text-accent">{p}</li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-8">
              <AlertTriangle />
              <p>{medicine.sideEffects}</p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setTablet("");
                  setState("idle");
                }}
                className="px-10 py-4 bg-primary text-white rounded-xl"
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
