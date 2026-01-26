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

/* ================= TYPES ================= */
type State = "idle" | "verified";

type Medicine = {
  name: string;
  disease: string;
  dosage: string;
  precautions: string[];
  sideEffects: string;
  manufacturer: string;
  verified: boolean;
};

/* ================= MEDICINE DATABASE ================= */
/* 👉 ADD MORE MEDICINES HERE (same format, nothing else needed) */
const MEDICINES: Record<string, Medicine> = {
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
};

/* ================= SPEECH TEXT ================= */
const speechText: Record<string, { medicine: string; dosage: string }> = {
  English: {
    medicine:
      "This medicine is used to treat the listed conditions. Follow precautions carefully.",
    dosage:
      "Please follow the dosage instructions carefully and do not exceed the maximum daily dose.",
  },
  Hindi: {
    medicine:
      "यह दवा बताए गए रोगों के इलाज के लिए उपयोग की जाती है।",
    dosage:
      "कृपया खुराक निर्देशों का सावधानीपूर्वक पालन करें।",
  },
  Spanish: {
    medicine:
      "Este medicamento se utiliza para tratar las condiciones mencionadas.",
    dosage:
      "Siga cuidadosamente las instrucciones de dosificación.",
  },
  French: {
    medicine:
      "Ce médicament est utilisé pour traiter les conditions mentionnées.",
    dosage:
      "Veuillez suivre attentivement les instructions de dosage.",
  },
  German: {
    medicine:
      "Dieses Medikament wird zur Behandlung der genannten Beschwerden verwendet.",
    dosage:
      "Bitte befolgen Sie die Dosierungsanweisungen genau.",
  },
  Chinese: {
    medicine:
      "该药物用于治疗所列疾病。",
    dosage:
      "请严格遵守用药剂量说明。",
  },
};

/* ================= COMPONENT ================= */
export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");

  const key = tablet.toLowerCase().replace(/\s+/g, "");
  const medicine = MEDICINES[key] || MEDICINES.paracetamol;

  /* ================= TEXT TO SPEECH ================= */
  const getLangCode = () => {
    switch (language) {
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

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = getLangCode();
    u.rate = 0.9;
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

        {/* ================= INPUT ================= */}
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
                  <div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Pill /> Tablet Imprint / Name
                    </div>
                    <input
                      value={tablet}
                      onChange={(e) => setTablet(e.target.value)}
                      placeholder="e.g., Paracetamol"
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
                      <option>Hindi</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setState("verified")}
                  disabled={!tablet}
                  className="h-14 w-full rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-primary to-accent neon-glow-blue"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= VERIFIED ================= */}
        {state === "verified" && (
          <div className="space-y-20">

            {/* 🔮 3D HOLOGRAM */}
            <div className="flex justify-center">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 rounded-full border border-primary/30 animate-spin-slow" />
                <div className="absolute inset-10 rounded-full border border-accent/40 animate-spin-reverse" />
                <div className="absolute inset-20 rounded-full bg-gradient-to-br from-accent to-primary blur-2xl opacity-40 animate-pulse-glow" />
                <div className="absolute inset-28 rounded-full bg-gradient-to-br from-primary to-accent shadow-neon flex items-center justify-center floating-3d">
                  <span className="text-white text-2xl font-bold tracking-widest">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-10">

              <div className="glass-panel p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Medication Info</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                    onClick={() =>
                           speak(
                             `${medicine.name}. 
                             Uses: ${medicine.disease}. 
                             Manufacturer: ${medicine.manufacturer}.`
                          )
                        }

                </div>
                <p><strong>Name:</strong> {medicine.name}</p>
                <p><strong>Uses:</strong> {medicine.disease}</p>
                <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
              </div>

              <div className="glass-panel p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Dosage Information</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                   onClick={() =>
                            speak(
                              `${medicine.name}. 
                              Dosage: ${medicine.dosage}.`
                          )
                       }

                  />
                </div>
                <p>{medicine.dosage}</p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel p-8">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <ShieldAlert className="text-primary" />
                Precautions
              </div>
              <ul className="space-y-3">
                {medicine.precautions.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span className="text-accent">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="glass-panel p-8 space-y-3">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="text-yellow-500" />
                Possible Side Effects
              </div>
              <p>{medicine.sideEffects}</p>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setTablet("");
                  setState("idle");
                }}
                className="px-10 py-4 rounded-xl bg-primary text-white font-semibold"
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
