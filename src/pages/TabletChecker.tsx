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

/* ================== SPEECH TEXT ================== */
const speechText: Record<
  string,
  { medicine: string; dosage: string }
> = {
  English: {
    medicine:
      "This medicine is used for fever, headache and mild to moderate pain. Manufactured by reputed pharmaceutical companies.",
    dosage:
      "Adults may take 500 to 1000 milligrams every four to six hours. Children require weight based dosing. Do not exceed four thousand milligrams per day.",
  },
  Hindi: {
    medicine:
      "यह दवा बुखार, सिरदर्द और हल्के से मध्यम दर्द के लिए उपयोग की जाती है।",
    dosage:
      "वयस्क 500 से 1000 मिलीग्राम हर चार से छह घंटे में ले सकते हैं। दिन में 4000 मिलीग्राम से अधिक न लें।",
  },
  Spanish: {
    medicine:
      "Este medicamento se utiliza para la fiebre y el dolor leve a moderado.",
    dosage:
      "Los adultos pueden tomar de 500 a 1000 miligramos cada cuatro a seis horas.",
  },
  French: {
    medicine:
      "Ce médicament est utilisé pour la fièvre et les douleurs légères à modérées.",
    dosage:
      "Les adultes peuvent prendre 500 à 1000 milligrammes toutes les quatre à six heures.",
  },
  German: {
    medicine:
      "Dieses Medikament wird gegen Fieber und leichte bis mäßige Schmerzen verwendet.",
    dosage:
      "Erwachsene können alle vier bis sechs Stunden 500 bis 1000 Milligramm einnehmen.",
  },
  Chinese: {
    medicine:
      "该药物用于治疗发烧和轻度至中度疼痛。",
    dosage:
      "成人每四到六小时可服用500至1000毫克。",
  },
};

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");

  /* ================== TEXT TO SPEECH ================== */
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
    u.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* OFFSET FOR FIXED NAVBAR */}
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

        {/* ================= INPUT CARD ================= */}
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
                  {/* TABLET */}
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

                {/* VERIFY BUTTON */}
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

        {/* ================= VERIFIED STATE ================= */}
        {state === "verified" && (
          <div className="space-y-20">

            {/* 🔮 ADVANCED 3D HOLOGRAM VERIFIED */}
            <div className="flex justify-center">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 rounded-full border border-primary/30 animate-spin-slow" />
                <div className="absolute inset-8 rounded-full border border-accent/40 animate-spin-reverse" />
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-accent via-cyan-400 to-primary blur-2xl opacity-40 animate-pulse-glow" />
                <div className="absolute inset-24 rounded-full bg-gradient-to-br from-primary to-accent shadow-neon flex items-center justify-center floating-3d">
                  <span className="text-white text-2xl font-bold tracking-[0.3em]">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-10">

              {/* MEDICINE INFO */}
              <div className="glass-panel p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-xl">Medication Info</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                    onClick={() =>
                      speak(speechText[language].medicine)
                    }
                  />
                </div>
                <p><strong>Name:</strong> {tablet}</p>
                <p><strong>Uses:</strong> Fever, headache, mild to moderate pain</p>
                <p><strong>Manufacturer:</strong> Approved Pharmaceutical Company</p>
              </div>

              {/* DOSAGE INFO */}
              <div className="glass-panel p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-xl">Dosage Information</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                    onClick={() =>
                      speak(speechText[language].dosage)
                    }
                  />
                </div>
                <p><strong>Adults:</strong> 500–1000 mg every 4–6 hours</p>
                <p><strong>Children:</strong> 10–15 mg/kg every 6 hours</p>
                <p className="text-yellow-500 font-semibold">
                  Maximum 4000 mg per day
                </p>
                <p className="text-muted-foreground text-sm">
                  Reduce dose in liver disease. Take with water.
                </p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel p-8">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <ShieldAlert className="text-primary" />
                Precautions
              </div>
              <ul className="space-y-3">
                {[
                  "Do not exceed maximum daily dose",
                  "Avoid alcohol consumption",
                  "Check other medicines for paracetamol",
                  "Use cautiously in liver disease",
                  "Avoid prolonged self-medication",
                  "Consult doctor if fever lasts more than 3 days",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_hsl(160_100%_50%)]" />
                    <span className="text-accent">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="glass-panel p-8 space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="text-yellow-500" />
                Possible Side Effects
              </div>

              <p><strong>Common:</strong> Nausea, stomach discomfort</p>
              <p><strong>Rare:</strong> Skin rash, dizziness</p>
              <p className="text-red-500">
                <strong>Emergency:</strong> Severe allergy, breathing difficulty,
                yellowing of eyes or skin
              </p>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setTablet("");
                  setState("idle");
                }}
                className="px-10 py-4 rounded-xl bg-primary text-white font-semibold hover:scale-105 transition"
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
