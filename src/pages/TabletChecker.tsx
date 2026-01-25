import { useState } from "react";
import { Upload, Volume2, CheckCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/* -------------------- MEDICINE DATABASE -------------------- */
// (unchanged – keeping your full DB)
const MEDICINE_DB = [
  {
    id: 1,
    name: "Paracetamol",
    strength: "500mg",
    type: "Analgesic",
    manufacturer: "GSK Pharmaceuticals",
    treats: "Fever, Mild to moderate pain",
    dosage: "500–1000mg every 4–6 hours",
    precautions: ["Do not exceed 4000mg/day", "Avoid alcohol"],
    sideEffects: "Nausea, rash, liver damage in overdose",
  },
  {
    id: 2,
    name: "Ibuprofen",
    strength: "200mg",
    type: "NSAID",
    manufacturer: "Pfizer Inc",
    treats: "Pain, Inflammation, Fever",
    dosage: "200–400mg every 4–6 hours",
    precautions: ["Take with food", "Avoid if pregnant"],
    sideEffects: "Stomach upset, dizziness",
  },
];

/* -------------------- LANGUAGES -------------------- */
const LANGUAGES = [
  { code: "en", name: "English", voice: "en-US" },
  { code: "hi", name: "Hindi", voice: "hi-IN" },
];

/* -------------------- TRANSLATIONS -------------------- */
const TRANSLATIONS: any = {
  en: {
    title: "Tablet Verification",
    subtitle: "Verify medicine authenticity using AI",
    inputLabel: "Tablet Name",
    placeholder: "e.g. Paracetamol",
    language: "Select Language",
    verify: "Verify Tablet",
    verified: "Verified Authentic",
    info: "Medication Info",
    dosage: "Dosage",
    precautions: "Precautions",
    sideEffects: "Side Effects",
  },
  hi: {
    title: "टैबलेट सत्यापन",
    subtitle: "एआई द्वारा दवा की प्रामाणिकता जांचें",
    inputLabel: "टैबलेट नाम",
    placeholder: "जैसे पैरासिटामोल",
    language: "भाषा चुनें",
    verify: "सत्यापित करें",
    verified: "सत्यापित प्रामाणिक",
    info: "दवा जानकारी",
    dosage: "खुराक",
    precautions: "सावधानियां",
    sideEffects: "दुष्प्रभाव",
  },
};

export default function TabletChecker() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [tabletName, setTabletName] = useState("");
  const [found, setFound] = useState<any>(null);
  const [verified, setVerified] = useState(false);
  const [lang, setLang] = useState(LANGUAGES[0]);

  const t = TRANSLATIONS[lang.code];

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang.voice;
    speechSynthesis.speak(u);
  };

  const verifyTablet = () => {
    const res = MEDICINE_DB.find(
      (m) => m.name.toLowerCase() === tabletName.toLowerCase()
    );
    if (res) {
      setFound(res);
      setVerified(true);
    } else {
      alert("Medicine not found");
      setVerified(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-extrabold holographic-heading">
          {t.title}
        </h1>

        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          {isDark ? <Sun /> : <Moon />}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <p className="text-center text-gray-600 dark:text-gray-400">
          {t.subtitle}
        </p>

        {/* INPUT */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-4">
          <input
            value={tabletName}
            onChange={(e) => setTabletName(e.target.value)}
            placeholder={t.placeholder}
            className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />

          <select
            value={lang.code}
            onChange={(e) =>
              setLang(LANGUAGES.find(l => l.code === e.target.value)!)
            }
            className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>

          <button
            onClick={verifyTablet}
            className="w-full py-3 rounded-lg text-white holographic-button-static"
          >
            {t.verify}
          </button>
        </div>

        {/* RESULT */}
        {verified && found && (
          <div className="space-y-6">

            {/* VERIFIED BANNER */}
            <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20">
              <CheckCircle className="text-cyan-500" size={36} />
              <div>
                <h2 className="text-xl font-bold">{t.verified}</h2>
                <p>{found.name} {found.strength}</p>
              </div>
            </div>

            {/* INFO + DOSAGE */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* MEDICATION INFO */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{t.info}</h3>
                  <button
                    onClick={() =>
                      speak(
                        `Medicine name ${found.name}. Treats ${found.treats}. Manufacturer ${found.manufacturer}`
                      )
                    }
                  >
                    <Volume2
                      size={20}
                      className={isDark ? "text-gray-300" : "text-black"}
                    />
                  </button>
                </div>
                <p>{found.treats}</p>
                <p className="text-sm text-gray-500">{found.manufacturer}</p>
              </div>

              {/* DOSAGE */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{t.dosage}</h3>
                  <button onClick={() => speak(found.dosage)}>
                    <Volume2
                      size={20}
                      className={isDark ? "text-gray-300" : "text-black"}
                    />
                  </button>
                </div>
                <p>{found.dosage}</p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">{t.precautions}</h3>
              <ul className="list-disc ml-5">
                {found.precautions.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">{t.sideEffects}</h3>
              <p>{found.sideEffects}</p>
            </div>
          </div>
        )}
      </div>

      {/* STYLES */}
      <style>{`
        .holographic-heading {
          background: linear-gradient(135deg, #0ea5e9, #10b981);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .holographic-button-static {
          background: linear-gradient(135deg, #0ea5e9, #10b981);
          box-shadow: 0 4px 15px rgba(14,165,233,.4);
        }
      `}</style>
    </div>
  );
}
