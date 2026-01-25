import { useState } from "react";
import { CheckCircle, Upload } from "lucide-react";

/* ---------------- MEDICINE DB (sample) ---------------- */
const DB: any = {
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

export default function TabletChecker() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const verify = () => {
    setResult(DB[name.toLowerCase()] || null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-white to-slate-100">

      {/* ---------------- FORM ---------------- */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <p className="font-medium mb-2">Upload Tablet Image</p>

        {/* REAL IMAGE UPLOAD */}
        <label className="cursor-pointer block border-2 border-dashed rounded-xl h-44 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-400 transition">
          <Upload />
          <span className="mt-2">Click to upload (PNG / JPG)</span>
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </label>

        {image && (
          <p className="text-sm text-emerald-600 mt-2">
            Selected: {image.name}
          </p>
        )}

        <p className="mt-6 font-medium">Tablet Imprint / Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full border rounded-xl px-4 py-3"
          placeholder="Paracetamol"
        />

        <button
          onClick={verify}
          className="mt-6 w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-emerald-400"
        >
          Verify Tablet
        </button>
      </div>

      {/* ---------------- VERIFIED RESULT ---------------- */}
      {result && (
        <>
          {/* VERIFIED AUTHENTIC BAR */}
          <div className="max-w-5xl mx-auto mt-10">
            <div className="relative flex gap-4 items-center p-6 rounded-2xl bg-white border border-emerald-300 animate-glow-pulse">
              <CheckCircle className="text-emerald-500 w-8 h-8" />
              <div>
                <p className="font-semibold text-lg">Verified Authentic</p>
                <p className="text-slate-500">
                  This tablet has been successfully verified
                </p>
              </div>
            </div>
          </div>

          {/* ---------------- GLOBE (REAL GRID) ---------------- */}
          <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-10 flex justify-center">
            <div className="relative w-[320px] h-[320px]">

              {/* GRID SPHERE */}
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 animate-spin-slow"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M10 0 L0 0 0 10"
                      fill="none"
                      stroke="rgba(52,211,153,.3)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="url(#grid)"
                />
              </svg>

              {/* INNER RING */}
              <div className="absolute inset-10 rounded-full border-4 border-emerald-400 animate-spin-reverse" />

              {/* CENTER TEXT */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-emerald-600 font-semibold tracking-widest">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* ---------------- INFO ---------------- */}
          <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-semibold mb-2">Medication Info</h3>
              <p><b>Name:</b> {result.name}</p>
              <p><b>Treats:</b> {result.treats}</p>
              <p><b>Manufacturer:</b> {result.manufacturer}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-semibold mb-2">Dosage Information</h3>
              <p>{result.dosage}</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-2">Precautions</h3>
            <ul className="list-disc ml-6">
              {result.precautions.map((p: string, i: number) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-2">Possible Side Effects</h3>
            <p>{result.sideEffects}</p>
          </div>
        </>
      )}
    </div>
  );
}
