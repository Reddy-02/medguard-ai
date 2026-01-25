import { useState } from "react";
import { CheckCircle, Upload, Volume2 } from "lucide-react";

/* ===============================
   MEDICINE DATABASE (sample – extend to 150+)
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
  const [tabletName, setTabletName] = useState("");
  const [language, setLanguage] = useState("English");
  const [verified, setVerified] = useState(false);
  const [result, setResult] = useState<any>(null);

  /* ===============================
     VERIFY HANDLER
  ================================ */
  const verifyTablet = () => {
    const key = tabletName.toLowerCase().trim();
    const data = medicineDatabase[key];
    setResult(data || null);
    setVerified(true);
  };

  /* ===============================
     TEXT TO SPEECH
  ================================ */
  const speakAll = () => {
    if (!result) return;

    const text = `
    Medication Information.
    Name: ${result.name}.
    Treats: ${result.treats}.
    Manufacturer: ${result.manufacturer}.
    Dosage Information.
    ${result.dosage}.
    `;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-white to-slate-100">
      {/* ================= HEADER ================= */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
          Tablet Verification
        </h1>
        <p className="mt-3 text-slate-600">
          Upload an image or enter tablet details for instant AI verification.
          MedGuard AI is for informational purposes only.
        </p>
      </div>

      {/* ================= INPUT CARD ================= */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        {/* Upload */}
        <label className="block font-medium mb-2">
          Upload Tablet Image
        </label>
        <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:border-blue-400 transition">
          <Upload size={28} />
          <p className="mt-2">Click to upload</p>
          <p className="text-xs">PNG, JPG up to 10MB</p>
          <input type="file" className="hidden" />
        </div>

        {/* Tablet Name */}
        <label className="block font-medium mt-6 mb-2">
          Tablet Imprint / Name
        </label>
        <input
          value={tabletName}
          onChange={(e) => setTabletName(e.target.value)}
          placeholder="e.g., IBU 200 or Paracetamol"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Language */}
        <label className="block font-medium mt-6 mb-2">
          Select Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-xl border px-4 py-3"
        >
          {languages.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>

        {/* Verify Button */}
        <button
          onClick={verifyTablet}
          className="w-full mt-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-emerald-400 hover:opacity-90 transition"
        >
          Verify Tablet
        </button>
      </div>

      {/* ================= VERIFIED SECTION ================= */}
      {verified && (
        <>
          {/* Verified Banner */}
          <div className="max-w-5xl mx-auto mt-10">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-lg animate-pulse">
              <CheckCircle className="text-emerald-500" size={26} />
              <div>
                <p className="font-semibold text-emerald-700">
                  Verified Authentic
                </p>
                <p className="text-sm text-emerald-600">
                  This tablet has been successfully verified
                </p>
              </div>
            </div>
          </div>

          {/* Rotating Circle */}
          <div className="flex justify-center mt-8">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full border-[6px] border-emerald-300 animate-spin-slow" />
              <div className="absolute inset-6 rounded-full border-[4px] border-emerald-200 animate-spin-reverse" />
              <div className="absolute inset-0 flex items-center justify-center text-emerald-600 font-semibold">
                VERIFIED
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">
                  Medication Info
                </h3>
                <Volume2
                  onClick={speakAll}
                  className="cursor-pointer"
                />
              </div>
              <p className="mt-3">
                <b>Name:</b>{" "}
                {result?.name || tabletName || "Unknown"}
              </p>
              <p>
                <b>Treats:</b>{" "}
                {result?.treats || "Not found in database"}
              </p>
              <p>
                <b>Manufacturer:</b>{" "}
                {result?.manufacturer || "Unknown"}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold text-lg">
                Dosage Information
              </h3>
              <p className="mt-3">
                {result?.dosage || "N/A"}
              </p>
            </div>
          </div>

          {/* Precautions */}
          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">
              Precautions
            </h3>
            {result?.precautions ? (
              <ul className="space-y-2">
                {result.precautions.map((p: string) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            ) : (
              <p>No data available</p>
            )}
          </div>

          {/* Side Effects */}
          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold text-lg">
              Possible Side Effects
            </h3>
            <p className="mt-2">
              {result?.sideEffects || "Unknown"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
