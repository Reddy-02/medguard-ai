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

/* ================= MEDICINES DATASET ================= */
const MEDICINES: Record<string, {
  name: string;
  disease: string;
  dosage: string;
  precautions: string[];
  sideEffects: string;
  manufacturer: string;
  verified: boolean;
}> = {
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

  ibuprofen: {
    name: "Ibuprofen",
    disease: "Pain, Inflammation, Fever",
    dosage: "200–400 mg every 6 hours (max 1200 mg/day)",
    precautions: [
      "Take after food",
      "Avoid alcohol",
      "Avoid during pregnancy",
      "Not recommended in stomach ulcers",
    ],
    sideEffects: "Acidity, nausea, dizziness",
    manufacturer: "Brufen, Ibugesic",
    verified: true,
  },

  aspirin: {
    name: "Aspirin",
    disease: "Pain, Fever, Blood thinning",
    dosage: "300–900 mg every 6 hours",
    precautions: [
      "Not for children below 16",
      "Avoid in bleeding disorders",
      "Stop before surgery",
      "Take with food",
    ],
    sideEffects: "Stomach irritation, bleeding risk",
    manufacturer: "Disprin, Ecosprin",
    verified: true,
  },

  diclofenac: {
    name: "Diclofenac",
    disease: "Joint pain, Muscle pain, Arthritis",
    dosage: "50 mg up to 2–3 times daily",
    precautions: [
      "Short-term use only",
      "Avoid in heart disease",
      "Take after meals",
    ],
    sideEffects: "Gastric pain, nausea",
    manufacturer: "Voveran",
    verified: true,
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
    verified: true,
  },

  azithromycin: {
    name: "Azithromycin",
    disease: "Respiratory and throat infections",
    dosage: "500 mg once daily for 3–5 days",
    precautions: [
      "Avoid unnecessary antibiotic use",
      "Take after food",
    ],
    sideEffects: "Nausea, loose stools",
    manufacturer: "Azee, Azithral",
    verified: true,
  },

  metformin: {
    name: "Metformin",
    disease: "Type 2 Diabetes",
    dosage: "500 mg twice daily after meals",
    precautions: [
      "Monitor kidney function",
      "Avoid alcohol",
    ],
    sideEffects: "Diarrhea, abdominal discomfort",
    manufacturer: "Glycomet",
    verified: true,
  },

  amlodipine: {
    name: "Amlodipine",
    disease: "High Blood Pressure",
    dosage: "5–10 mg once daily",
    precautions: [
      "Do not stop suddenly",
    ],
    sideEffects: "Ankle swelling",
    manufacturer: "Amlodac",
    verified: true,
  },

  cetirizine: {
    name: "Cetirizine",
    disease: "Allergy, Cold",
    dosage: "10 mg once daily",
    precautions: [
      "May cause drowsiness",
    ],
    sideEffects: "Sleepiness",
    manufacturer: "Zyrtec",
    verified: true,
  },
};

/* ================= SPEECH ================= */
const speechLang = (lang: string) => {
  switch (lang) {
    case "Hindi": return "hi-IN";
    case "Spanish": return "es-ES";
    case "French": return "fr-FR";
    case "German": return "de-DE";
    case "Chinese": return "zh-CN";
    default: return "en-US";
  }
};

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");

  const key = tablet.toLowerCase().replace(/\s+/g, "");
  const medicine = MEDICINES[key] || MEDICINES.paracetamol;

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = speechLang(language);
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-7xl pt-24 pb-20 space-y-20">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-5xl font-bold holographic-text">
            Tablet Verification
          </h1>
          <p className="text-muted-foreground">
            AI-powered medicine authentication with safety analysis
          </p>
        </div>

        {/* INPUT */}
        {state === "idle" && (
          <div className="glass-panel-strong p-10 grid md:grid-cols-2 gap-10">
            <label className="h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p>Upload Tablet Image (Optional)</p>
              <input type="file" className="hidden" />
            </label>

            <div className="space-y-6">
              <div>
                <div className="flex gap-2 text-primary font-semibold">
                  <Pill /> Tablet Name
                </div>
                <input
                  value={tablet}
                  onChange={(e) => setTablet(e.target.value)}
                  placeholder="Paracetamol / Ibuprofen"
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
                onClick={() => setState("verified")}
                disabled={!tablet}
                className="h-14 w-full bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold"
              >
                Verify Tablet
              </button>
            </div>
          </div>
        )}

        {/* VERIFIED */}
        {state === "verified" && (
          <div className="space-y-16">

            {/* 3D HOLOGRAM */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full border animate-spin-slow" />
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-accent to-primary blur-xl animate-pulse-glow" />
                <div className="absolute inset-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center floating-3d shadow-neon">
                  <span className="text-white tracking-widest font-bold">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* INFO */}
            <div className="grid md:grid-cols-2 gap-10">
              <div className="glass-panel p-8">
                <div className="flex justify-between">
                  <h3 className="font-semibold">Medication Info</h3>
                  <Volume2 className="text-black cursor-pointer"
                    onClick={() => speak(`${medicine.name}. ${medicine.disease}`)}
                  />
                </div>
                <p><b>Name:</b> {medicine.name}</p>
                <p><b>Uses:</b> {medicine.disease}</p>
                <p><b>Manufacturer:</b> {medicine.manufacturer}</p>
              </div>

              <div className="glass-panel p-8">
                <div className="flex justify-between">
                  <h3 className="font-semibold">Dosage</h3>
                  <Volume2 className="text-black cursor-pointer"
                    onClick={() => speak(medicine.dosage)}
                  />
                </div>
                <p>{medicine.dosage}</p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel p-8">
              <div className="flex gap-2 font-semibold">
                <ShieldAlert /> Precautions
              </div>
              <ul className="space-y-2 mt-3">
                {medicine.precautions.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="h-2 w-2 rounded-full bg-accent mt-2" />
                    <span className="text-accent">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="glass-panel p-8">
              <div className="flex gap-2 font-semibold">
                <AlertTriangle className="text-yellow-500" />
                Side Effects
              </div>
              <p className="mt-2 text-muted-foreground">
                {medicine.sideEffects}
              </p>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setTablet("");
                  setState("idle");
                }}
                className="px-10 py-4 bg-primary text-white rounded-xl font-semibold"
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
