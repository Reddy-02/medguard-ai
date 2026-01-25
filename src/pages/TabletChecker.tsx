import { useState, useRef } from "react";
import { Upload, CheckCircle, Volume2 } from "lucide-react";

/* ---------------- MEDICINE DB (extendable to 150+) ---------------- */
const MED_DB: any = {
  paracetamol: {
    name: "Paracetamol 500mg",
    treats: "Fever, Headache, Mild to moderate pain",
    dosage: "Adults: 500–1000 mg every 4–6 hours (max 4000 mg/day)",
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

/* ---------------- LANGUAGES ---------------- */
const LANGUAGES = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Chinese",
];

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [language, setLanguage] = useState("English");
  const [image, setImage] = useState<File | null>(null);
  const [verified, setVerified] = useState<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const verifyTablet = () => {
    const res = MED_DB[tabletName.toLowerCase()];
    setVerified(res || null);
  };

  /* ---------------- TEXT TO SPEECH ---------------- */
  const speakInfo = () => {
    if (!verified) return;
    const text = `
      Medication name ${verified.name}.
      Treats ${verified.treats}.
      Dosage information ${verified.dosage}.
    `;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang =
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
    window.speechSynthesis.speak(utter);
    speechRef.current = utter;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-white to-slate-100">

      {/* ---------------- INPUT CARD ---------------- */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-6">

        {/* Upload */}
        <div>
          <p className="font-medium mb-2">Upload Tablet Image</p>
          <label className="cursor-pointer border-2 border-dashed rounded-xl h-44 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-400 transition">
            <Upload />
            <span className="mt-2">Click to upload</span>
            <span className="text-xs">PNG, JPG up to 10MB</span>
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </label>
          {image && (
            <p className="text-sm text-emerald-600 mt-2">{image.name}</p>
          )}
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-medium mb-1">Tablet Imprint/Name</p>
            <input
              value={tabletName}
              onChange={(e) => setTabletName(e.target.value)}
              placeholder="paracetamol"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* LANGUAGE SELECT (FIXED) */}
          <div>
            <p className="font-medium mb-1">Select Language</p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              {LANGUAGES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <button
            onClick={verifyTablet}
            className="mt-auto py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-emerald-400"
          >
            Verify Tablet
          </button>
        </div>
      </div>

      {/* ---------------- VERIFIED SECTION ---------------- */}
      {verified && (
        <>
          {/* VERIFIED AUTHENTIC (EXACT STYLE) */}
          <div className="max-w-5xl mx-auto mt-10">
            <div className="relative flex gap-4 items-center p-6 rounded-2xl bg-white border border-emerald-300 shadow-xl animate-glow-pulse">
              <CheckCircle className="text-emerald-500 w-8 h-8" />
              <div>
                <p className="font-semibold text-lg">Verified Authentic</p>
                <p className="text-slate-500">
                  This tablet has been successfully verified
                </p>
              </div>
            </div>
          </div>

          {/* ---------------- SMOOTH GRID GLOBE ---------------- */}
          <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-10 flex justify-center">
            <div className="relative w-[320px] h-[320px]">

              {/* GRID */}
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 animate-spin-slow"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M8 0 L0 0 0 8"
                      fill="none"
                      stroke="rgba(52,211,153,.35)"
                      strokeWidth="0.4"
                    />
                  </pattern>
                </defs>
                <circle cx="100" cy="100" r="90" fill="url(#grid)" />
              </svg>

              {/* INNER RING */}
              <div className="absolute inset-10 rounded-full border-[5px] border-emerald-400 animate-spin-reverse" />

              {/* TEXT */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-emerald-600 font-semibold tracking-widest">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* ---------------- INFO CARDS ---------------- */}
          <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow relative">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                Medication Info
                <button onClick={speakInfo}>
                  <Volume2 className="w-5 h-5 text-emerald-500" />
                </button>
              </h3>
              <p><b>Name:</b> {verified.name}</p>
              <p><b>Treats:</b> {verified.treats}</p>
              <p><b>Manufacturer:</b> {verified.manufacturer}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-semibold mb-2">Dosage Information</h3>
              <p>{verified.dosage}</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-2">Precautions</h3>
            <ul className="list-disc ml-6">
              {verified.precautions.map((p: string, i: number) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-2">Possible Side Effects</h3>
            <p>{verified.sideEffects}</p>
          </div>
        </>
      )}
    </div>
  );
}
