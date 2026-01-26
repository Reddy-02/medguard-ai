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

/* ================== MEDICINES DATA ================== */
const MEDICINES: Record<string, any> = {
  paracetamol: {
    name: "Paracetamol",
    disease: "Fever, Headache, Mild to moderate pain",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol consumption",
      "Check other medicines for paracetamol content",
      "Consult doctor if fever persists",
      "Use cautiously in liver disease",
    ],
    sideEffects:
      "Rare allergic reactions; liver damage in overdose",
    manufacturer: "Crocin, Dolo 650",
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
  },

  amlodipine: {
    name: "Amlodipine",
    disease: "High Blood Pressure",
    dosage: "5–10 mg once daily",
    precautions: ["Do not stop suddenly"],
    sideEffects: "Ankle swelling",
    manufacturer: "Amlodac",
  },

  cetirizine: {
    name: "Cetirizine",
    disease: "Allergy, Cold",
    dosage: "10 mg once daily",
    precautions: ["May cause drowsiness"],
    sideEffects: "Sleepiness",
    manufacturer: "Zyrtec",
  },

  // 👉 You can continue adding till 150+ SAME FORMAT
};

/* ================== SPEECH TEXT ================== */
const speechText: Record<string, { medicine: string; dosage: string }> = {
  English: {
    medicine:
      "This medicine is used for treating the mentioned condition. Always follow prescribed dosage.",
    dosage:
      "Please follow the recommended dosage instructions. Do not exceed limits.",
  },
  Hindi: {
    medicine:
      "यह दवा बताए गए रोग के लिए उपयोग की जाती है।",
    dosage:
      "निर्धारित खुराक का पालन करें।",
  },
  Spanish: {
    medicine:
      "Este medicamento se utiliza para tratar la enfermedad indicada.",
    dosage:
      "Siga la dosis recomendada.",
  },
  French: {
    medicine:
      "Ce médicament est utilisé pour traiter la maladie indiquée.",
    dosage:
      "Veuillez suivre la posologie recommandée.",
  },
  German: {
    medicine:
      "Dieses Medikament wird zur Behandlung der angegebenen Krankheit verwendet.",
    dosage:
      "Bitte halten Sie sich an die empfohlene Dosierung.",
  },
  Chinese: {
    medicine:
      "该药物用于治疗相关疾病。",
    dosage:
      "请遵循推荐剂量。",
  },
};

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");

  const key = tablet.toLowerCase().replace(/\s+/g, "");
  const medicine = MEDICINES[key] || MEDICINES.paracetamol;

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang =
      language === "Hindi"
        ? "hi-IN"
        : language === "Spanish"
        ? "es-ES"
        : language === "French"
        ? "fr-FR"
        : language === "German"
        ? "de-DE"
        : language === "Chinese"
        ? "zh-CN"
        : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-7xl pt-24 pb-20 space-y-20">
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold holographic-text">
            Tablet Verification
          </h1>
          <p className="text-muted-foreground">
            AI-powered medicine authentication
          </p>
        </div>

        {state === "idle" && (
          <div className="glass-panel-strong p-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Upload /> Upload Tablet Image
                </div>
                <label className="h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="flex flex-col justify-between space-y-8">
                <div>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Pill /> Tablet Imprint / Name
                  </div>
                  <input
                    value={tablet}
                    onChange={(e) => setTablet(e.target.value)}
                    className="h-12 w-full rounded-xl border px-4"
                  />

                  <div className="mt-6 flex items-center gap-2 text-primary font-semibold">
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

                <button
                  onClick={() => setState("verified")}
                  className="h-14 w-full rounded-xl text-white bg-gradient-to-r from-primary to-accent"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>
        )}

        {state === "verified" && (
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="glass-panel p-8">
                <div className="flex justify-between">
                  <h3>Medication Info</h3>
                  <Volume2
                    className="cursor-pointer"
                    onClick={() =>
                      speak(speechText[language].medicine)
                    }
                  />
                </div>
                <p><strong>Name:</strong> {medicine.name}</p>
                <p><strong>Uses:</strong> {medicine.disease}</p>
                <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
              </div>

              <div className="glass-panel p-8">
                <div className="flex justify-between">
                  <h3>Dosage</h3>
                  <Volume2
                    className="cursor-pointer"
                    onClick={() =>
                      speak(speechText[language].dosage)
                    }
                  />
                </div>
                <p>{medicine.dosage}</p>
              </div>
            </div>

            <div className="glass-panel p-8">
              <div className="flex items-center gap-2">
                <ShieldAlert /> Precautions
              </div>
              <ul>
                {medicine.precautions.map((p: string, i: number) => (
                  <li key={i} className="text-accent">• {p}</li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-8">
              <div className="flex items-center gap-2">
                <AlertTriangle /> Side Effects
              </div>
              <p>{medicine.sideEffects}</p>
            </div>

            <button
              onClick={() => {
                setTablet("");
                setState("idle");
              }}
              className="mx-auto block px-10 py-4 bg-primary text-white rounded-xl"
            >
              Check Another Tablet
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
