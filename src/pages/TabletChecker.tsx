import { useState } from "react";

const LANGUAGES = ["English", "Spanish", "French", "German", "Hindi", "Chinese"];

const DB: any = {
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
  const [data, setData] = useState<any>(null);

  const verify = () => {
    setData(DB[tablet.toLowerCase()] || { verified: false });
  };

  const speakInfo = () => {
    if (!data?.verified) return;
    const text = `Medication Info. Name ${data.name}. Treats ${data.treats}. Dosage Information. ${data.dosage}`;
    const u = new SpeechSynthesisUtterance(text);
    u.lang =
      lang === "Hindi"
        ? "hi-IN"
        : lang === "Chinese"
        ? "zh-CN"
        : "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };

  const verifiedGlow = data?.verified
    ? "shadow-[0_0_30px_rgba(34,197,94,0.35)]"
    : "shadow-[0_0_30px_rgba(239,68,68,0.35)]";

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

      {/* ================= INPUT CARD ================= */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-8">
        <label className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-slate-50">
          <input type="file" accept="image/png,image/jpeg" className="hidden" />
          <div className="font-semibold">Upload Tablet Image</div>
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

      {/* ================= VERIFIED STATUS ================= */}
      {data && (
        <div
          className={`max-w-5xl mx-auto mt-8 p-6 rounded-xl bg-white border ${verifiedGlow}`}
        >
          <h3 className="font-bold text-black">
            {data.verified ? "Verified Authentic" : "Not Verified"}
          </h3>
          <p className="text-gray-600">
            {data.verified
              ? "This tablet has been successfully verified"
              : "Verification failed"}
          </p>
        </div>
      )}

      {/* ================= GRID GLOBE ================= */}
      {data && (
        <div className="max-w-5xl mx-auto bg-white mt-6 rounded-xl shadow-xl p-10 flex justify-center">
          <svg width="300" height="300" viewBox="0 0 300 300">
            {[...Array(40)].map((_, i) => (
              <circle
                key={i}
                cx="150"
                cy="150"
                r={145 - i * 3}
                fill="none"
                stroke="#22c55e"
                strokeOpacity="0.25"
              />
            ))}

            <circle
              cx="150"
              cy="150"
              r="90"
              fill="none"
              stroke="#22c55e"
              strokeWidth="7"
            />

            <text
              x="150"
              y="156"
              textAnchor="middle"
              fontSize="18"
              fill="#22c55e"
              fontWeight="600"
              letterSpacing="2"
            >
              {data.verified ? "VERIFIED" : "UNVERIFIED"}
            </text>
          </svg>
        </div>
      )}

      {/* ================= INFO ================= */}
      {data?.verified && (
        <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-black">Medication Info</h3>
              <button onClick={speakInfo}>
                <svg width="20" height="20" fill="black" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3z" />
                </svg>
              </button>
            </div>
            <p><b>Name:</b> {data.name}</p>
            <p><b>Treats:</b> {data.treats}</p>
            <p><b>Manufacturer:</b> {data.manufacturer}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-black">Dosage Information</h3>
            <p>{data.dosage}</p>
          </div>
        </div>
      )}

      {data?.verified && (
        <>
          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-black">Precautions</h3>
            <ul className="mt-3 space-y-2">
              {data.precautions.map((p: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-black">Possible Side Effects</h3>
            <p>{data.sideEffects}</p>
          </div>
        </>
      )}
    </div>
  );
}
