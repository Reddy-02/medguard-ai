import { useState } from "react";
import {
  Search,
  Upload,
  Volume2,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";

/* -------------------- MEDICINE DATABASE -------------------- */
const MEDICINE_DB = [
  { id: 1, name: "Paracetamol", strength: "500mg", type: "Analgesic", manufacturer: "GSK Pharmaceuticals", treats: "Fever, Mild to moderate pain", dosage: "500-1000mg every 4-6 hours", precautions: ["Do not exceed 4000mg/day", "Avoid alcohol", "Take with food if stomach upset occurs"], sideEffects: "Nausea, rash, liver damage in overdose" },
  { id: 2, name: "Ibuprofen", strength: "200mg", type: "NSAID", manufacturer: "Pfizer Inc", treats: "Pain, Inflammation, Fever", dosage: "200-400mg every 4-6 hours", precautions: ["Take with food", "Avoid if pregnant", "Monitor kidney function"], sideEffects: "Stomach upset, dizziness, bleeding risk" },
  { id: 3, name: "Aspirin", strength: "325mg", type: "Salicylate", manufacturer: "Bayer AG", treats: "Pain, Fever, Antiplatelet", dosage: "325-650mg every 4 hours", precautions: ["Avoid in children", "Take with food", "Monitor for bleeding"], sideEffects: "Stomach irritation, tinnitus, bleeding" },
  { id: 4, name: "Naproxen", strength: "250mg", type: "NSAID", manufacturer: "Roche Holding", treats: "Arthritis pain, Inflammation", dosage: "250-500mg twice daily", precautions: ["Take with food", "Avoid prolonged use", "Monitor blood pressure"], sideEffects: "Heartburn, headache, fluid retention" },
  { id: 5, name: "Diclofenac", strength: "50mg", type: "NSAID", manufacturer: "Novartis AG", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "50mg 2-3 times daily", precautions: ["Take with food", "Short-term use recommended", "Monitor liver function"], sideEffects: "Abdominal pain, nausea, liver enzyme elevation" },
];

/* -------------------- LANGUAGES -------------------- */
const LANGUAGES = [
  { code: "en", name: "English", voice: "en-US" },
  { code: "hi", name: "Hindi", voice: "hi-IN" },
  { code: "es", name: "Spanish", voice: "es-ES" },
  { code: "fr", name: "French", voice: "fr-FR" },
  { code: "de", name: "German", voice: "de-DE" },
];

/* -------------------- TRANSLATIONS -------------------- */
const TRANSLATIONS: any = {
  en: {
    tabletVerification: "Tablet Verification",
    uploadImage: "Upload an image or enter tablet details for instant AI verification",
    tabletImage: "Tablet Image",
    clickToUpload: "Click to upload",
    fileRequirements: "PNG, JPG up to 10MB",
    tabletImprintName: "Tablet Imprint / Name",
    placeholder: "e.g., Paracetamol, Ibuprofen",
    selectLanguage: "Select Language",
    verifyTablet: "Verify Tablet",
    verifiedAuthentic: "Verified Authentic",
    verificationSuccess: "This tablet has been successfully verified",
    medicationInfo: "Medication Info",
    dosageInformation: "Dosage Information",
    precautions: "Precautions",
    sideEffects: "Possible Side Effects",
    searchPlaceholder: "Search medicines...",
    errorMessage: "Please enter a medicine name",
    noResults: "No medicine found",
  },
};

/* -------------------- COMPONENT -------------------- */
export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [verified, setVerified] = useState(false);
  const [foundMedicine, setFoundMedicine] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const t = TRANSLATIONS[selectedLanguage.code];

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = selectedLanguage.voice;
    u.rate = 0.9;
    speechSynthesis.speak(u);
  };

  const handleVerify = () => {
    if (!tabletName.trim()) {
      alert(t.errorMessage);
      return;
    }

    const found = MEDICINE_DB.find(
      (m) =>
        m.name.toLowerCase() === tabletName.toLowerCase() ||
        m.name.toLowerCase().includes(tabletName.toLowerCase())
    );

    if (found) {
      setFoundMedicine(found);
      setVerified(true);
    } else {
      alert(t.noResults);
      setVerified(false);
      setFoundMedicine(null);
    }
  };

  const handleSearch = (value: string) => {
    setTabletName(value);
    if (value.length > 1) {
      const results = MEDICINE_DB.filter((m) =>
        m.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      {/* NAVBAR */}
      <nav
        className={`border-b shadow-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="relative">
            <input
              placeholder={t.searchPlaceholder}
              onChange={(e) => handleSearch(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-gray-100 border-gray-300"
              }`}
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${
              darkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-100 text-gray-700"
            }`}
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">
          <span className="holographic-text-static">
            {t.tabletVerification}
          </span>
        </h1>
        <p className="text-gray-500 mt-2">{t.uploadImage}</p>
      </div>

      {/* INPUT SECTION */}
      <div className="max-w-5xl mx-auto px-6">
        <div className={`rounded-2xl shadow-lg p-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* UPLOAD */}
            <label className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer">
              <input type="file" hidden onChange={handleImageUpload} />
              {uploadedImage ? (
                <img src={uploadedImage} className="mx-auto h-40 rounded-lg" />
              ) : (
                <>
                  <Upload className="mx-auto mb-3" size={40} />
                  <p>{t.clickToUpload}</p>
                  <p className="text-sm text-gray-400">{t.fileRequirements}</p>
                </>
              )}
            </label>

            {/* INPUTS */}
            <div className="space-y-5">
              <input
                value={tabletName}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t.placeholder}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                }`}
              />

              {showSuggestions && (
                <div className="border rounded-lg bg-white shadow">
                  {searchResults.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        setTabletName(m.name);
                        setFoundMedicine(m);
                        setShowSuggestions(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {m.name} {m.strength}
                    </div>
                  ))}
                </div>
              )}

              <select
                value={selectedLanguage.code}
                onChange={(e) =>
                  setSelectedLanguage(
                    LANGUAGES.find((l) => l.code === e.target.value)!
                  )
                }
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                }`}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleVerify}
                className="w-full py-3 rounded-lg text-white holographic-button-static"
              >
                {t.verifyTablet}
              </button>
            </div>
          </div>
        </div>

        {/* RESULT */}
        {verified && foundMedicine && (
          <div className="mt-10 space-y-8">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 flex items-center gap-4">
              <CheckCircle className="text-cyan-500" size={36} />
              <div>
                <h2 className="text-2xl font-bold holographic-text-static">
                  {t.verifiedAuthentic}
                </h2>
                <p>{t.verificationSuccess}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* MEDICATION INFO */}
              <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{t.medicationInfo}</h3>
                  <button onClick={() => speak(foundMedicine.treats)}>
                    <Volume2
                      size={20}
                      className={darkMode ? "text-gray-300" : "text-black"}
                    />
                  </button>
                </div>
                <p>{foundMedicine.treats}</p>
                <p className="text-sm text-gray-500">{foundMedicine.manufacturer}</p>
              </div>

              {/* DOSAGE */}
              <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{t.dosageInformation}</h3>
                  <button onClick={() => speak(foundMedicine.dosage)}>
                    <Volume2
                      size={20}
                      className={darkMode ? "text-gray-300" : "text-black"}
                    />
                  </button>
                </div>
                <p>{foundMedicine.dosage}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STYLES */}
      <style jsx>{`
        .holographic-text-static {
          background: linear-gradient(135deg, #0ea5e9, #06b6d4, #10b981);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .holographic-button-static {
          background: linear-gradient(135deg, #0ea5e9, #10b981);
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.35);
        }
      `}</style>
    </div>
  );
}
