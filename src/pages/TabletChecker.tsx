import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Upload,
  Volume2,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";

/* ============================================================
   MEDICINE DATABASE
============================================================ */
const MEDICINE_DB = [
  { id: 1, name: "Paracetamol", strength: "500mg", type: "Analgesic", manufacturer: "GSK Pharmaceuticals", treats: "Fever, Mild to moderate pain", dosage: "500–1000mg every 4–6 hours", precautions: ["Do not exceed 4000mg/day", "Avoid alcohol"], sideEffects: "Nausea, liver damage in overdose" },
  { id: 2, name: "Ibuprofen", strength: "200mg", type: "NSAID", manufacturer: "Pfizer Inc", treats: "Pain, Inflammation", dosage: "200–400mg every 4–6 hours", precautions: ["Take with food", "Avoid in pregnancy"], sideEffects: "Stomach upset, dizziness" },
  { id: 3, name: "Aspirin", strength: "325mg", type: "Salicylate", manufacturer: "Bayer AG", treats: "Pain, Fever", dosage: "325–650mg every 4 hours", precautions: ["Avoid in children"], sideEffects: "Bleeding risk" },
];

/* ============================================================
   LANGUAGES
============================================================ */
const LANGUAGES = [
  { code: "en", name: "English", voice: "en-US" },
  { code: "hi", name: "Hindi", voice: "hi-IN" },
  { code: "es", name: "Spanish", voice: "es-ES" },
];

/* ============================================================
   TRANSLATIONS
============================================================ */
const T: any = {
  en: {
    title: "Tablet Verification",
    subtitle: "Instant AI-based medicine authenticity check",
    upload: "Upload Tablet Image",
    click: "Click to upload",
    placeholder: "Enter tablet name",
    language: "Select Language",
    verify: "Verify Tablet",
    verified: "Verified Authentic",
    medicationInfo: "Medication Info",
    dosage: "Dosage Information",
    precautions: "Precautions",
    sideEffects: "Side Effects",
    notFound: "Medicine not found",
  },
};

/* ============================================================
   COMPONENT
============================================================ */
export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [medicine, setMedicine] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const t = T[language.code];

  /* ===================== SPEECH ===================== */
  const speak = (text: string) => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = language.voice;
    u.rate = 0.9;
    speechSynthesis.speak(u);
  };

  /* ===================== SEARCH ===================== */
  useEffect(() => {
    if (tabletName.length > 1) {
      setSuggestions(
        MEDICINE_DB.filter((m) =>
          m.name.toLowerCase().includes(tabletName.toLowerCase())
        ).slice(0, 5)
      );
    } else {
      setSuggestions([]);
    }
  }, [tabletName]);

  /* ===================== VERIFY ===================== */
  const verifyTablet = () => {
    const found = MEDICINE_DB.find(
      (m) => m.name.toLowerCase() === tabletName.toLowerCase()
    );
    if (found) {
      setMedicine(found);
      setVerified(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      alert(t.notFound);
      setVerified(false);
    }
  };

  /* ===================== IMAGE ===================== */
  const uploadImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* ===================== NAVBAR ===================== */}
      <nav
        className={`border-b ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold holographic-text">
            {t.title}
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>

      {/* ===================== CONTENT ===================== */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <p className="text-center text-gray-500">{t.subtitle}</p>

        {/* INPUT CARD */}
        <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          {/* IMAGE */}
          <label className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer">
            <input hidden type="file" onChange={uploadImage} />
            {image ? (
              <img src={image} className="mx-auto h-40 rounded-lg" />
            ) : (
              <>
                <Upload className="mx-auto mb-2" size={36} />
                <p>{t.click}</p>
              </>
            )}
          </label>

          {/* INPUTS */}
          <div className="space-y-5">
            <input
              value={tabletName}
              onChange={(e) => setTabletName(e.target.value)}
              placeholder={t.placeholder}
              className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700"
            />

            {suggestions.length > 0 && (
              <div className="border rounded-lg bg-white shadow">
                {suggestions.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setTabletName(s.name);
                      setSuggestions([]);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {s.name} {s.strength}
                  </div>
                ))}
              </div>
            )}

            <select
              value={language.code}
              onChange={(e) =>
                setLanguage(LANGUAGES.find((l) => l.code === e.target.value)!)
              }
              className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code}>{l.name}</option>
              ))}
            </select>

            <button
              onClick={verifyTablet}
              className="w-full py-3 rounded-lg text-white holographic-button"
            >
              {t.verify}
            </button>
          </div>
        </div>

        {/* ===================== RESULT ===================== */}
        {verified && medicine && (
          <div className="space-y-8">
            {/* VERIFIED BANNER */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 flex items-center gap-4">
              <CheckCircle size={40} className="text-cyan-500" />
              <h2 className="text-2xl font-bold holographic-text">
                {t.verified}
              </h2>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* MEDICATION INFO */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                <div className="flex justify-between mb-3">
                  <h3 className="font-bold">{t.medicationInfo}</h3>
                  <button onClick={() => speak(medicine.treats)}>
                    <Volume2
                      className={darkMode ? "text-gray-300" : "text-black"}
                    />
                  </button>
                </div>
                <p>{medicine.treats}</p>
                <p className="text-sm text-gray-500">{medicine.manufacturer}</p>
              </div>

              {/* DOSAGE */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                <div className="flex justify-between mb-3">
                  <h3 className="font-bold">{t.dosage}</h3>
                  <button onClick={() => speak(medicine.dosage)}>
                    <Volume2
                      className={darkMode ? "text-gray-300" : "text-black"}
                    />
                  </button>
                </div>
                <p>{medicine.dosage}</p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold mb-2">{t.precautions}</h3>
              <ul className="list-disc ml-5">
                {medicine.precautions.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold mb-2">{t.sideEffects}</h3>
              <p>{medicine.sideEffects}</p>
            </div>
          </div>
        )}
      </div>

      {/* ===================== STYLES ===================== */}
      <style jsx>{`
        .holographic-text {
          background: linear-gradient(135deg, #0ea5e9, #06b6d4, #10b981);
          -webkit-background-clip: text;
          color: transparent;
        }
        .holographic-button {
          background: linear-gradient(135deg, #0ea5e9, #10b981);
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
        }
      `}</style>
    </div>
  );
}
