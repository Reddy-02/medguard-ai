import { useEffect, useRef, useState } from "react";

/* -------------------- LANGUAGES -------------------- */
const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Hindi",
  "Chinese",
] as const;

/* -------------------- MEDICINE DATABASE (EXTENDABLE) -------------------- */
const MED_DB: Record<string, any> = {
  paracetamol: {
    name: "Paracetamol 500mg",
    treats: "Fever, Headache, Mild to moderate pain",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    manufacturer: "Crocin, Dolo 650",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol consumption",
      "Check other medicines for paracetamol content",
      "Consult doctor if fever persists",
    ],
    sideEffects: "Rare allergic reactions; liver damage in overdose",
    verified: true,
  },
};

/* -------------------- COMPONENT -------------------- */
export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [language, setLanguage] = useState("English");
  const [result, setResult] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* -------------------- VERIFY -------------------- */
  const verifyTablet = () => {
    const key = tabletName.toLowerCase().trim();
    setResult(MED_DB[key] || { verified: false });
  };

  /* -------------------- SPEAK -------------------- */
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang =
      language === "Hindi"
        ? "hi-IN"
        : language === "Chinese"
        ? "zh-CN"
        : "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24 pb-20">

      {/* -------------------- FORM CARD -------------------- */}
      <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Upload */}
          <label className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-slate-50">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
            />
            <div className="text-lg font-medium">Upload Tablet Image</div>
            <div className="text-sm text-gray-500 mt-2">
              Click to upload (PNG / JPG up to 10MB)
            </div>
          </label>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="font-medium">Tablet Imprint / Name</label>
              <input
                value={tabletName}
                onChange={(e) => setTabletName(e.target.value)}
                placeholder="e.g., Paracetamol"
                className="w-full mt-1 rounded-lg border px-4 py-2"
              />
            </div>

            <div>
              <label className="font-medium">Select Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full mt-1 rounded-lg border px-4 py-2"
              >
                {LANGUAGES.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>

            <button
              onClick={verifyTablet}
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-green-400"
            >
              Verify Tablet
            </button>
          </div>
        </div>
      </div>

      {/* -------------------- VERIFIED BANNER -------------------- */}
      {result && (
        <div
          className={`mx-auto max-w-5xl mt-8 p-6 rounded-xl shadow-lg ${
            result.verified
              ? "bg-green-50 border border-green-400 shadow-green-200"
              : "bg-red-50 border border-red-400 shadow-red-200"
          }`}
        >
          <h3 className="font-bold text-black">
            {result.verified ? "Verified Authentic" : "Not Verified"}
          </h3>
          <p className="text-gray-600">
            {result.verified
              ? "This tablet has been successfully verified"
              : "This tablet could not be verified"}
          </p>
        </div>
      )}

      {/* -------------------- 3D GRID GLOBE (STATIC LIKE IMAGE) -------------------- */}
      {result && (
        <div className="mx-auto max-w-5xl bg-white mt-6 rounded-xl shadow-xl p-10 flex justify-center">
          <div className="relative w-80 h-80 rounded-full border-8 border-green-300 opacity-80"
               style={{
                 backgroundImage:
                   "radial-gradient(circle, rgba(0,255,170,0.15) 1px, transparent 1px)",
                 backgroundSize: "12px 12px",
               }}>
            <div className="absolute inset-0 flex items-center justify-center text-green-400 font-semibold tracking-widest">
              {result.verified ? "VERIFIED" : "UNVERIFIED"}
            </div>
          </div>
        </div>
      )}

      {/* -------------------- INFO CARDS -------------------- */}
      {result?.verified && (
        <div className="mx-auto max-w-5xl mt-8 grid md:grid-cols-2 gap-6">

          {/* Medication Info */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-black">Medication Info</h3>
              <button onClick={() =>
                speak(
                  `${result.name}. Treats ${result.treats}. Manufactured by ${result.manufacturer}`
                )
              }>
                🔊
              </button>
            </div>
            <p><b>Name:</b> {result.name}</p>
            <p><b>Treats:</b> {result.treats}</p>
            <p><b>Manufacturer:</b> {result.manufacturer}</p>
          </div>

          {/* Dosage */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-black mb-2">Dosage Information</h3>
            <p>{result.dosage}</p>
          </div>
        </div>
      )}

      {/* Precautions */}
      {result?.verified && (
        <div className="mx-auto max-w-5xl mt-6 bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-black mb-3">Precautions</h3>
          <ul className="space-y-2">
            {result.precautions.map((p: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 rounded-full bg-green-400"></span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Side Effects */}
      {result?.verified && (
        <div className="mx-auto max-w-5xl mt-6 bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-black mb-2">Possible Side Effects</h3>
          <p>{result.sideEffects}</p>
        </div>
      )}
    </div>
  );
}
