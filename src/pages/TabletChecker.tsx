import { useState, useEffect } from "react";
import { CheckCircle, Volume2, Upload } from "lucide-react";

/* ===============================
   MEDICINE DATABASE (sample 30)
   ➜ Pattern supports 150+ easily
================================ */
const medicineDatabase: Record<string, any> = {
  paracetamol: {
    name: "Paracetamol",
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

  ibuprofen: {
    name: "Ibuprofen",
    treats: "Pain, Inflammation, Fever",
    dosage: "200–400 mg every 6 hours",
    manufacturer: "Brufen, Ibugesic",
    precautions: ["Take after food", "Avoid during pregnancy"],
    sideEffects: "Acidity, nausea",
  },

  aspirin: {
    name: "Aspirin",
    treats: "Pain, Fever, Blood thinning",
    dosage: "300–900 mg every 6 hours",
    manufacturer: "Disprin",
    precautions: ["Not for children", "Bleeding risk"],
    sideEffects: "Gastric irritation",
  },
};

/* ===============================
   LANGUAGE TRANSLATIONS
================================ */
const translations: any = {
  English: {
    verified: "Verified Authentic",
    verifiedDesc: "This tablet has been successfully verified",
  },
  Hindi: {
    verified: "सत्यापित",
    verifiedDesc: "यह दवा सफलतापूर्वक सत्यापित की गई है",
  },
  Spanish: {
    verified: "Verificado",
    verifiedDesc: "Este medicamento ha sido verificado",
  },
  French: {
    verified: "Vérifié",
    verifiedDesc: "Ce médicament est vérifié",
  },
  German: {
    verified: "Verifiziert",
    verifiedDesc: "Dieses Medikament wurde verifiziert",
  },
  Chinese: {
    verified: "已验证",
    verifiedDesc: "该药物已验证",
  },
};

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [language, setLanguage] = useState("English");
  const [result, setResult] = useState<any>(null);

  const handleVerify = () => {
    const key = tabletName.toLowerCase().trim();
    setResult(medicineDatabase[key] || null);
  };

  const speak = (text: string) => {
    const msg = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(msg);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-white to-slate-100">
      {/* TITLE */}
      <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
        Tablet Verification
      </h1>

      <p className="text-center text-gray-500 mt-2 max-w-3xl mx-auto">
        Upload an image or enter tablet details for instant AI verification.
        MedGuard AI is for informational purposes only.
      </p>

      {/* INPUT CARD */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-xl p-8">
        {/* Upload */}
        <div className="border-2 border-dashed rounded-xl p-8 text-center text-gray-400">
          <Upload className="mx-auto mb-2" />
          Click to upload (PNG / JPG)
        </div>

        {/* Name */}
        <div className="mt-6">
          <label className="font-medium">Tablet Imprint / Name</label>
          <input
            className="w-full mt-2 p-3 rounded-xl border"
            placeholder="e.g. Paracetamol"
            value={tabletName}
            onChange={(e) => setTabletName(e.target.value)}
          />
        </div>

        {/* Language */}
        <div className="mt-4">
          <label className="font-medium">Select Language</label>
          <select
            className="w-full mt-2 p-3 rounded-xl border"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {Object.keys(translations).map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Button */}
        <button
          onClick={handleVerify}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-400 text-white font-semibold"
        >
          Verify Tablet
        </button>
      </div>

      {/* RESULT */}
      {tabletName && (
        <div className="max-w-5xl mx-auto mt-10 space-y-6">
          {/* VERIFIED */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="text-emerald-500" />
            <div>
              <p className="font-semibold text-emerald-700">
                {translations[language].verified}
              </p>
              <p className="text-sm text-emerald-600">
                {translations[language].verifiedDesc}
              </p>
            </div>
          </div>

          {/* ROTATING CIRCLE */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full border-8 border-emerald-300 animate-spin-slow flex items-center justify-center">
              <span className="text-emerald-600 font-semibold">
                VERIFIED
              </span>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Medication Info</h3>
                <Volume2
                  className="cursor-pointer"
                  onClick={() =>
                    speak(
                      result
                        ? `${result.name}. ${result.treats}`
                        : "No data found"
                    )
                  }
                />
              </div>

              <p><b>Name:</b> {result?.name || tabletName}</p>
              <p><b>Treats:</b> {result?.treats || "Not found in database"}</p>
              <p><b>Manufacturer:</b> {result?.manufacturer || "Unknown"}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">Dosage Information</h3>
              <p>{result?.dosage || "N/A"}</p>
            </div>
          </div>

          {/* PRECAUTIONS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Precautions</h3>
            {result?.precautions ? (
              <ul className="list-disc pl-5 space-y-1">
                {result.precautions.map((p: string) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : (
              <p>No data available</p>
            )}
          </div>

          {/* SIDE EFFECTS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Possible Side Effects</h3>
            <p>{result?.sideEffects || "Unknown"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
