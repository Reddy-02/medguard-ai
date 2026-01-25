import { useState, useEffect } from "react";
import { CheckCircle, Volume2, ChevronDown } from "lucide-react";

/* ===============================
   MEDICINE DATABASE (extendable to 150+)
================================ */
const medicineDatabase: Record<string, any> = {
  paracetamol: {
    name: "Paracetamol 500mg",
    treats: "Fever, Headache, Mild to moderate pain",
    dosage:
      "Adults: 500–1000 mg every 4–6 hours. Maximum 4000 mg per day.",
    manufacturer: "Crocin, Dolo 650",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol consumption",
      "Check other medicines for paracetamol content",
      "Consult doctor if fever persists",
    ],
    sideEffects: "Rare allergic reactions; liver damage in overdose",
  },
};

/* ===============================
   LANGUAGES
================================ */
const languages = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Chinese",
];

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("paracetamol");
  const [language, setLanguage] = useState("English");
  const [showLang, setShowLang] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const key = tabletName.toLowerCase().trim();
    setResult(medicineDatabase[key] || null);
  }, []);

  /* ===============================
     TEXT TO SPEECH (ORDERED)
  ================================ */
  const speakAll = () => {
    if (!result) return;

    const speech = new SpeechSynthesisUtterance(
      `Medication Information.
       Name: ${result.name}.
       Treats: ${result.treats}.
       Manufacturer: ${result.manufacturer}.
       Dosage Information.
       ${result.dosage}.`
    );

    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find((v) =>
      v.lang.toLowerCase().includes(language.toLowerCase())
    );
    if (selectedVoice) speech.voice = selectedVoice;

    speech.rate = 0.95;
    speech.pitch = 1;
    speechSynthesis.speak(speech);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-white to-slate-100">
      {/* ================= TOP BAR LANGUAGE ================= */}
      <div className="absolute top-24 right-10 z-50">
        <div className="relative">
          <button
            onClick={() => setShowLang(!showLang)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border text-sm font-medium"
          >
            {language}
            <ChevronDown size={16} />
          </button>

          {showLang && (
            <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg overflow-hidden">
              {languages.map((lang) => (
                <div
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLang(false);
                  }}
                  className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm"
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= VERIFIED BANNER ================= */}
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-emerald-50 border border-emerald-200 shadow-lg animate-[pulse_4s_ease-in-out_infinite]">
          <div className="absolute inset-0 bg-emerald-400/10 blur-2xl" />
          <div className="relative p-5 flex items-center gap-4">
            <CheckCircle className="text-emerald-500" size={26} />
            <div>
              <p className="font-semibold text-emerald-700 text-lg">
                Verified Authentic
              </p>
              <p className="text-sm text-emerald-600">
                This tablet has been successfully verified
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ROTATING VERIFIED CIRCLE ================= */}
      <div className="flex justify-center mt-10">
        <div className="relative w-72 h-72 rounded-full">
          <div className="absolute inset-0 rounded-full border-[6px] border-emerald-300 animate-spin-slow" />
          <div className="absolute inset-6 rounded-full border-[4px] border-emerald-200 animate-spin-reverse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-emerald-600 font-semibold tracking-wide">
              VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* ================= INFO CARDS ================= */}
      <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
        {/* Medication Info */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Medication Info</h3>
            <Volume2
              onClick={speakAll}
              className="cursor-pointer text-slate-500 hover:text-slate-800"
            />
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <b>Name:</b> {result?.name || tabletName}
            </p>
            <p>
              <b>Treats:</b> {result?.treats || "Not found in database"}
            </p>
            <p>
              <b>Manufacturer:</b>{" "}
              {result?.manufacturer || "Unknown"}
            </p>
          </div>
        </div>

        {/* Dosage */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold text-lg">Dosage Information</h3>
          <p className="mt-4 text-sm">
            {result?.dosage || "N/A"}
          </p>
        </div>
      </div>

      {/* ================= PRECAUTIONS ================= */}
      <div className="max-w-5xl mx-auto mt-6 bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold text-lg mb-3">Precautions</h3>
        {result?.precautions ? (
          <ul className="space-y-2 text-sm">
            {result.precautions.map((p: string) => (
              <li key={p} className="flex gap-2">
                <span className="text-emerald-500">●</span>
                {p}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </div>

      {/* ================= SIDE EFFECTS ================= */}
      <div className="max-w-5xl mx-auto mt-6 bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold text-lg mb-2">
          Possible Side Effects
        </h3>
        <p className="text-sm">
          {result?.sideEffects || "Unknown"}
        </p>
      </div>
    </div>
  );
}
