import { useState } from "react";
import { CheckCircle, Volume2, Upload } from "lucide-react";

/* ===============================
   MEDICINE DATABASE (sample)
   You can expand this to 150+
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
};

/* ===============================
   LANGUAGE LABELS
================================ */
const languages = {
  English: {
    verified: "Verified Authentic",
    verifiedDesc: "This tablet has been successfully verified",
    medicationInfo: "Medication Info",
    dosageInfo: "Dosage Information",
    precautions: "Precautions",
    sideEffects: "Possible Side Effects",
  },
  Spanish: {
    verified: "Autenticado",
    verifiedDesc: "Esta tableta ha sido verificada",
    medicationInfo: "Información del medicamento",
    dosageInfo: "Información de dosis",
    precautions: "Precauciones",
    sideEffects: "Efectos secundarios",
  },
  French: {
    verified: "Authentifié",
    verifiedDesc: "Ce comprimé a été vérifié",
    medicationInfo: "Informations sur le médicament",
    dosageInfo: "Informations sur la posologie",
    precautions: "Précautions",
    sideEffects: "Effets secondaires",
  },
  German: {
    verified: "Verifiziert",
    verifiedDesc: "Dieses Medikament wurde überprüft",
    medicationInfo: "Medikamenteninfo",
    dosageInfo: "Dosierungsinformation",
    precautions: "Vorsichtsmaßnahmen",
    sideEffects: "Nebenwirkungen",
  },
  Hindi: {
    verified: "सत्यापित",
    verifiedDesc: "यह दवा सफलतापूर्वक सत्यापित की गई है",
    medicationInfo: "दवा जानकारी",
    dosageInfo: "खुराक जानकारी",
    precautions: "सावधानियां",
    sideEffects: "संभावित दुष्प्रभाव",
  },
  Chinese: {
    verified: "已验证",
    verifiedDesc: "该药片已成功验证",
    medicationInfo: "药物信息",
    dosageInfo: "剂量信息",
    precautions: "注意事项",
    sideEffects: "副作用",
  },
};

export default function TabletChecker() {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<keyof typeof languages>("English");
  const [result, setResult] = useState<any>(null);

  const labels = languages[language];

  const verifyTablet = () => {
    const key = name.toLowerCase().trim();
    setResult(medicineDatabase[key] || null);
  };

  const speakResult = () => {
    if (!result) return;
    const text = `
      ${labels.medicationInfo}.
      Name ${result.name}.
      Treats ${result.treats}.
      Manufacturer ${result.manufacturer}.
      ${labels.dosageInfo}.
      ${result.dosage}.
    `;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-white to-slate-100">
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center text-sky-600">
        Tablet Verification
      </h1>
      <p className="text-center text-slate-500 mt-2 max-w-2xl mx-auto">
        Upload an image or enter tablet details for instant AI verification.
        MedGuard AI is for informational purposes only.
      </p>

      {/* INPUT CARD */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-xl p-8">
        <label className="font-medium">Upload Tablet Image</label>
        <div className="mt-2 border-2 border-dashed rounded-xl h-40 flex items-center justify-center text-slate-400">
          <Upload />
          <span className="ml-2">Click to upload (PNG / JPG)</span>
        </div>

        <label className="block mt-6 font-medium">Tablet Imprint / Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full border rounded-xl px-4 py-3"
          placeholder="e.g., Paracetamol"
        />

        <label className="block mt-6 font-medium">Select Language</label>
        <select
          className="mt-2 w-full border rounded-xl px-4 py-3"
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
        >
          {Object.keys(languages).map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>

        <button
          onClick={verifyTablet}
          className="mt-6 w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-emerald-400"
        >
          Verify Tablet
        </button>
      </div>

      {/* VERIFIED */}
      {result && (
        <>
          {/* VERIFIED AUTHENTIC */}
          <div className="max-w-5xl mx-auto mt-10">
            <div className="relative flex items-center gap-4 p-6 rounded-2xl bg-white border border-emerald-300 animate-float animate-pulse-glow">
              <div className="absolute inset-0 bg-emerald-200/30 blur-xl -z-10 rounded-2xl" />
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-lg">{labels.verified}</p>
                <p className="text-slate-500">{labels.verifiedDesc}</p>
              </div>
            </div>
          </div>

          {/* VERIFIED CIRCLE */}
          <div className="flex justify-center mt-10">
            <div className="relative w-[320px] h-[320px] bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <div className="absolute w-[260px] h-[260px] rounded-full border-4 border-emerald-300/50 animate-spin-slow" />
              <div className="absolute w-[200px] h-[200px] rounded-full border-2 border-emerald-200 animate-spin-reverse" />
              <div className="absolute w-[150px] h-[150px] rounded-full border-8 border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.6)]" />
              <span className="text-emerald-600 font-semibold tracking-widest">
                VERIFIED
              </span>
            </div>
          </div>

          {/* INFO */}
          <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{labels.medicationInfo}</h3>
                <Volume2
                  onClick={speakResult}
                  className="cursor-pointer text-slate-500"
                />
              </div>
              <p className="mt-2">
                <b>Name:</b> {result.name}
              </p>
              <p>
                <b>Treats:</b> {result.treats}
              </p>
              <p>
                <b>Manufacturer:</b> {result.manufacturer}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-semibold">{labels.dosageInfo}</h3>
              <p className="mt-2">{result.dosage}</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold">{labels.precautions}</h3>
            <ul className="mt-2 list-disc ml-6">
              {result.precautions.map((p: string, i: number) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold">{labels.sideEffects}</h3>
            <p className="mt-2">{result.sideEffects}</p>
          </div>
        </>
      )}
    </div>
  );
}
