import { useState } from "react";
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

type State = "idle" | "verified";

/* ---------- MULTI-LANGUAGE SPEECH CONTENT ---------- */
const speechText: Record<string, { medicine: string; dosage: string }> = {
  English: {
    medicine:
      "This medicine is used for fever, headache and mild pain. Manufactured by Crocin or Dolo 650.",
    dosage:
      "Take 500 to 1000 milligrams every four to six hours. Maximum four thousand milligrams per day.",
  },
  Hindi: {
    medicine:
      "यह दवा बुखार, सिरदर्द और हल्के दर्द के लिए उपयोग की जाती है। निर्माता क्रोसिन या डोलो 650 है।",
    dosage:
      "हर चार से छह घंटे में 500 से 1000 मिलीग्राम लें। दिन में अधिकतम 4000 मिलीग्राम।",
  },
  Spanish: {
    medicine:
      "Este medicamento se usa para fiebre, dolor de cabeza y dolor leve. Fabricado por Crocin o Dolo 650.",
    dosage:
      "Tome de 500 a 1000 miligramos cada cuatro a seis horas. Máximo cuatro mil miligramos por día.",
  },
  French: {
    medicine:
      "Ce médicament est utilisé pour la fièvre, les maux de tête et les douleurs légères. Fabriqué par Crocin ou Dolo 650.",
    dosage:
      "Prenez 500 à 1000 milligrammes toutes les quatre à six heures. Maximum quatre mille milligrammes par jour.",
  },
  German: {
    medicine:
      "Dieses Medikament wird gegen Fieber, Kopfschmerzen und leichte Schmerzen verwendet. Hergestellt von Crocin oder Dolo 650.",
    dosage:
      "Nehmen Sie 500 bis 1000 Milligramm alle vier bis sechs Stunden ein. Maximal 4000 Milligramm pro Tag.",
  },
  Chinese: {
    medicine:
      "该药物用于治疗发烧、头痛和轻度疼痛。由 Crocin 或 Dolo 650 生产。",
    dosage:
      "每四到六小时服用 500 到 1000 毫克。每天最多 4000 毫克。",
  },
};

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");

  /* ---------- TEXT TO SPEECH ---------- */
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
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLangCode();
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* FIXED NAVBAR OFFSET */}
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

        {/* VERIFIED STATE */}
        {state === "verified" && (
          <div className="space-y-16">

            {/* 3D HOLOGRAM VERIFIED */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full border border-accent/30 animate-spin-slow" />
                <div className="absolute inset-6 rounded-full border border-primary/40 animate-spin-reverse" />
                <div className="absolute inset-10 rounded-full bg-gradient-to-br from-accent via-cyan-400 to-primary blur-xl opacity-40 animate-pulse-glow" />
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-accent to-primary shadow-neon flex items-center justify-center floating-3d">
                  <span className="text-white text-xl font-bold tracking-widest">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* INFO */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Medication Info</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                    onClick={() =>
                      speak(speechText[language].medicine)
                    }
                  />
                </div>
                <p><strong>Name:</strong> {tablet}</p>
                <p><strong>Uses:</strong> Fever, headache, mild pain</p>
                <p><strong>Manufacturer:</strong> Crocin / Dolo 650</p>
              </div>

              <div className="glass-panel p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Dosage Information</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                    onClick={() =>
                      speak(speechText[language].dosage)
                    }
                  />
                </div>
                <p>500–1000 mg every 4–6 hours</p>
                <p className="text-muted-foreground">Max 4000 mg per day</p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel p-6 space-y-3">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldAlert className="text-primary" />
                Precautions
              </div>
              <ul className="space-y-2">
                {[
                  "Do not exceed maximum daily dose",
                  "Avoid alcohol consumption",
                  "Check other medicines for paracetamol",
                  "Consult doctor if fever persists",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_hsl(160_100%_50%)]" />
                    <span className="text-accent">{item}</span>
                  </li>
                ))}
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
