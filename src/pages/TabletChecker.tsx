import { useState } from "react";

/* ---------------- LANGUAGES ---------------- */
const LANGUAGES = ["English", "Spanish", "French", "German", "Hindi", "Chinese"];

/* ---------------- DATABASE (sample – extendable) ---------------- */
const MED_DB: any = {
  paracetamol: {
    verified: true,
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
  },
};

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [lang, setLang] = useState("English");
  const [result, setResult] = useState<any>(null);

  const verify = () => {
    setResult(MED_DB[tablet.toLowerCase()] || { verified: false });
  };

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "Hindi" ? "hi-IN" : lang === "Chinese" ? "zh-CN" : "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24 pb-20">

      {/* ================= HEADING ================= */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent">
          Tablet Verification
        </h1>
        <p className="text-gray-500 mt-2">
          Upload an image or enter tablet details for instant AI verification
        </p>
      </div>

      {/* ================= FORM ================= */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-8">
        <label className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-slate-50">
          <input type="file" accept="image/png,image/jpeg" className="hidden" />
          <div className="text-lg font-medium">Upload Tablet Image</div>
          <div className="text-sm text-gray-500 mt-2">
            Click to upload (PNG / JPG up to 10MB)
          </div>
        </label>

        <div className="space-y-4">
          <div>
            <label className="font-medium">Tablet Imprint / Name</label>
            <input
              value={tablet}
              onChange={(e) => setTablet(e.target.value)}
              className="w-full mt-1 rounded-lg border px-4 py-2"
              placeholder="e.g., Paracetamol"
            />
          </div>

          <div>
            <label className="font-medium">Select Language</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full mt-1 rounded-lg border px-4 py-2"
            >
              {LANGUAGES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <button
            onClick={verify}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-green-400"
          >
            Verify Tablet
          </button>
        </div>
      </div>

      {/* ================= VERIFIED BANNER ================= */}
      {result && (
        <div
          className={`max-w-5xl mx-auto mt-8 p-6 rounded-xl shadow-lg ${
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
              : "Verification failed"}
          </p>
        </div>
      )}

      {/* ================= GRID GLOBE (SVG – MATCHES IMAGE) ================= */}
      {result && (
        <div className="max-w-5xl mx-auto bg-white mt-6 rounded-xl shadow-xl p-10 flex justify-center">
          <svg width="320" height="320" viewBox="0 0 320 320">
            <defs>
              <radialGradient id="g" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.15" />
              </radialGradient>
            </defs>

            {/* outer grid */}
            {[...Array(36)].map((_, i) => (
              <circle
                key={i}
                cx="160"
                cy="160"
                r={155 - i * 4}
                fill="none"
                stroke="#6ee7b7"
                strokeOpacity="0.25"
              />
            ))}

            {/* inner ring */}
            <circle
              cx="160"
              cy="160"
              r="95"
              fill="none"
              stroke="#6ee7b7"
              strokeWidth="6"
            />

            {/* center text */}
            <text
              x="160"
              y="168"
              textAnchor="middle"
              fontSize="20"
              fill="#6ee7b7"
              fontWeight="600"
              letterSpacing="2"
            >
              {result.verified ? "VERIFIED" : "UNVERIFIED"}
            </text>
          </svg>
        </div>
      )}

      {/* ================= INFO ================= */}
      {result?.verified && (
        <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-black">Medication Info</h3>
              <button onClick={() => speak(result.name)}>
                {/* BLACK ICON */}
                <svg width="20" height="20" fill="black" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3z" />
                </svg>
              </button>
            </div>
            <p><b>Name:</b> {result.name}</p>
            <p><b>Treats:</b> {result.treats}</p>
            <p><b>Manufacturer:</b> {result.manufacturer}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-black">Dosage Information</h3>
            <p>{result.dosage}</p>
          </div>
        </div>
      )}

      {result?.verified && (
        <>
          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-black">Precautions</h3>
            <ul className="mt-3 space-y-2">
              {result.precautions.map((p: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="w-2 h-2 mt-2 rounded-full bg-green-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-black">Possible Side Effects</h3>
            <p>{result.sideEffects}</p>
          </div>
        </>
      )}
    </div>
  );
}
