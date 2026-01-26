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

type State = "idle" | "scanning" | "verified";

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
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = getLangCode();
    msg.rate = 0.9;
    msg.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

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

        {/* VERIFIED RESULT */}
        {state === "verified" && (
          <div className="space-y-16">

            {/* FAANG-LEVEL 3D HOLOGRAM */}
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

                <div className="absolute -bottom-10 w-full text-center text-accent font-semibold">
                  Authentic Medicine
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Medication Info</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                    onClick={() =>
                      speak(
                        `${tablet}. Used for fever and mild pain. Manufactured by Crocin.`
                      )
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
                      speak(
                        "Take 500 to 1000 milligrams every 4 to 6 hours. Maximum 4000 milligrams per day."
                      )
                    }
                  />
                </div>
                <p>500–1000 mg every 4–6 hours</p>
                <p className="text-muted-foreground">Max 4000 mg per day</p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel p-6 space-y-4">
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
                  setState("idle");
                  setTablet("");
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
