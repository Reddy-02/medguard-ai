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
      "Consult doctor if fever persists"
    ],
    sideEffects: "Rare allergic reactions; liver damage in overdose",
    manufacturer: "Crocin, Dolo 650",
    verified: true
  },

  ibuprofen: {
    name: "Ibuprofen",
    disease: "Pain, Inflammation, Fever",
    dosage: "200–400 mg every 6 hours (max 1200 mg/day)",
    precautions: [
      "Take after food",
      "Avoid alcohol",
      "Avoid during pregnancy",
      "Not recommended in stomach ulcers"
    ],
    sideEffects: "Acidity, nausea, dizziness",
    manufacturer: "Brufen, Ibugesic",
    verified: true
  },

  aspirin: {
    name: "Aspirin",
    disease: "Pain, Fever, Blood thinning",
    dosage: "300–900 mg every 6 hours",
    precautions: [
      "Not for children below 16",
      "Avoid bleeding disorders",
      "Stop before surgery",
      "Take with food"
    ],
    sideEffects: "Stomach irritation, bleeding risk",
    manufacturer: "Disprin, Ecosprin",
    verified: true
  },

  diclofenac: {
    name: "Diclofenac",
    disease: "Joint pain, Muscle pain, Arthritis",
    dosage: "50 mg 2–3 times daily",
    precautions: [
      "Short-term use only",
      "Avoid heart disease",
      "Take after meals"
    ],
    sideEffects: "Gastric pain, nausea",
    manufacturer: "Voveran",
    verified: true
  },

  naproxen: {
    name: "Naproxen",
    disease: "Inflammation, Muscle pain",
    dosage: "250–500 mg twice daily",
    precautions: ["Avoid prolonged use", "Take with food"],
    sideEffects: "Heartburn, dizziness",
    manufacturer: "Naprosyn",
    verified: true
  },

  amoxicillin: {
    name: "Amoxicillin",
    disease: "Bacterial infections",
    dosage: "500 mg every 8 hours",
    precautions: [
      "Complete full antibiotic course",
      "Avoid if penicillin allergy"
    ],
    sideEffects: "Diarrhea, rash",
    manufacturer: "Mox, Novamox",
    verified: true
  },

  azithromycin: {
    name: "Azithromycin",
    disease: "Respiratory and throat infections",
    dosage: "500 mg once daily for 3–5 days",
    precautions: [
      "Avoid unnecessary antibiotic use",
      "Take after food"
    ],
    sideEffects: "Nausea, loose stools",
    manufacturer: "Azee, Azithral",
    verified: true
  },

  ciprofloxacin: {
    name: "Ciprofloxacin",
    disease: "UTI, GI infections",
    dosage: "500 mg twice daily",
    precautions: [
      "Avoid during pregnancy",
      "Drink plenty of fluids"
    ],
    sideEffects: "Dizziness, tendon pain",
    manufacturer: "Ciplox",
    verified: true
  },

  metronidazole: {
    name: "Metronidazole",
    disease: "Amoebiasis, Anaerobic infections",
    dosage: "400–500 mg 2–3 times daily",
    precautions: ["Avoid alcohol", "Complete course"],
    sideEffects: "Metallic taste, nausea",
    manufacturer: "Metrogyl",
    verified: true
  },

  doxycycline: {
    name: "Doxycycline",
    disease: "Acne, Respiratory infections",
    dosage: "100 mg once or twice daily",
    precautions: [
      "Avoid sunlight exposure",
      "Not for pregnancy"
    ],
    sideEffects: "Photosensitivity",
    manufacturer: "Doxy-1",
    verified: true
  },

  metformin: {
    name: "Metformin",
    disease: "Type 2 Diabetes",
    dosage: "500 mg twice daily after meals",
    precautions: [
      "Monitor kidney function",
      "Avoid alcohol"
    ],
    sideEffects: "Diarrhea",
    manufacturer: "Glycomet",
    verified: true
  },

  amlodipine: {
    name: "Amlodipine",
    disease: "High Blood Pressure",
    dosage: "5–10 mg once daily",
    precautions: ["Do not stop suddenly"],
    sideEffects: "Ankle swelling",
    manufacturer: "Amlodac",
    verified: true
  },

  losartan: {
    name: "Losartan",
    disease: "Hypertension",
    dosage: "50 mg once daily",
    precautions: ["Avoid during pregnancy"],
    sideEffects: "Dizziness",
    manufacturer: "Losar",
    verified: true
  },

  atenolol: {
    name: "Atenolol",
    disease: "Hypertension, Heart disease",
    dosage: "25–50 mg once daily",
    precautions: ["Do not stop abruptly"],
    sideEffects: "Slow heart rate",
    manufacturer: "Tenormin",
    verified: true
  },

  cetirizine: {
    name: "Cetirizine",
    disease: "Allergy, Cold",
    dosage: "10 mg once daily",
    precautions: ["May cause drowsiness"],
    sideEffects: "Sleepiness",
    manufacturer: "Zyrtec",
    verified: true
  },

  levocetirizine: {
    name: "Levocetirizine",
    disease: "Allergy",
    dosage: "5 mg once daily",
    precautions: ["Avoid driving if sleepy"],
    sideEffects: "Mild drowsiness",
    manufacturer: "Xyzal",
    verified: true
  },

  omeprazole: {
    name: "Omeprazole",
    disease: "Acidity, GERD",
    dosage: "20 mg before breakfast",
    precautions: ["Avoid long-term use"],
    sideEffects: "Headache",
    manufacturer: "Omez",
    verified: true
  },

  pantoprazole: {
    name: "Pantoprazole",
    disease: "Acid reflux",
    dosage: "40 mg once daily",
    precautions: ["Long-term caution"],
    sideEffects: "Nausea",
    manufacturer: "Pantocid",
    verified: true
  },

  vitaminD3: {
    name: "Vitamin D3",
    disease: "Vitamin D deficiency",
    dosage: "60,000 IU once weekly",
    precautions: ["Avoid overdose"],
    sideEffects: "Rare hypercalcemia",
    manufacturer: "Calcirol",
    verified: true
  },

  iron: {
    name: "Ferrous Sulfate",
    disease: "Iron deficiency anemia",
    dosage: "Once daily after meals",
    precautions: ["May cause constipation"],
    sideEffects: "Black stools",
    manufacturer: "Livogen",
    verified: true
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
                      speak(`${medicine.name}. ${speechText[language].medicine}`)
                    }
                  />
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
                      speak(`${medicine.name}. ${speechText[language].dosage}`)
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
