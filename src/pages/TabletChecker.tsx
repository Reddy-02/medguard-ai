import { useState } from "react";
import { Volume2 } from "lucide-react";

export default function TabletChecker() {
  const [verified] = useState(true);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-white to-slate-50">

      {/* PAGE HEADING */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent">
          Tablet Verification
        </h1>
        <p className="mt-2 text-gray-500">
          Upload an image or enter tablet details for instant AI verification
        </p>
      </div>

      {/* INPUT CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-10">
        <div className="grid md:grid-cols-2 gap-6">

          {/* UPLOAD */}
          <div>
            <label className="font-semibold text-black block mb-2">
              Upload Tablet Image
            </label>
            <div className="border-2 border-dashed rounded-xl h-44 flex flex-col justify-center items-center text-gray-500 cursor-pointer">
              <span className="text-2xl">⬆</span>
              <span className="mt-2">Click to upload</span>
              <span className="text-sm">PNG, JPG up to 10MB</span>
            </div>
          </div>

          {/* INPUTS */}
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-black block mb-1">
                Tablet Imprint / Name
              </label>
              <input
                defaultValue="paracetamol"
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>

            <div>
              <label className="font-semibold text-black block mb-1">
                Select Language
              </label>
              <select className="w-full rounded-lg border px-4 py-2">
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
              </select>
            </div>

            <button className="w-full mt-2 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-green-400">
              Verify Tablet
            </button>
          </div>
        </div>
      </div>

      {/* VERIFIED STATUS */}
      <div
        className={`max-w-5xl mx-auto rounded-xl px-6 py-4 mb-8 border shadow
        ${verified ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}
      >
        <h3 className="font-bold text-black">
          {verified ? "Verified Authentic" : "Not Verified"}
        </h3>
        <p className="text-gray-600">
          {verified
            ? "This tablet has been successfully verified"
            : "This tablet could not be verified"}
        </p>
      </div>

      {/* GRID GLOBE */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10 flex justify-center">
        <div style={{ width: 260, height: 260 }}>
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#9BE6C4" strokeWidth="0.6" />
            <ellipse cx="100" cy="100" rx="90" ry="80" fill="none" stroke="#9BE6C4" strokeWidth="0.4" />
            <ellipse cx="100" cy="100" rx="90" ry="60" fill="none" stroke="#9BE6C4" strokeWidth="0.4" />
            <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="#9BE6C4" strokeWidth="0.4" />
            <ellipse cx="100" cy="100" rx="80" ry="90" fill="none" stroke="#9BE6C4" strokeWidth="0.4" />
            <ellipse cx="100" cy="100" rx="60" ry="90" fill="none" stroke="#9BE6C4" strokeWidth="0.4" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="#6AD7A6" strokeWidth="4" />
            <text x="100" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="#6AD7A6">
              {verified ? "VERIFIED" : "UNVERIFIED"}
            </text>
          </svg>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        {/* MEDICATION INFO */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-black">Medication Info</h3>
            <Volume2 className="text-black w-5 h-5" />
          </div>
          <p><b>Name:</b> Paracetamol 500mg</p>
          <p><b>Treats:</b> Fever, Headache, Mild to moderate pain</p>
          <p><b>Manufacturer:</b> Crocin, Dolo 650</p>
        </div>

        {/* DOSAGE */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-black mb-3">Dosage Information</h3>
          <p>500–1000 mg every 4–6 hours (max 4000 mg/day)</p>
        </div>
      </div>

      {/* PRECAUTIONS */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
        <h3 className="font-bold text-black mb-3">Precautions</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Do not exceed maximum daily dose
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Avoid alcohol consumption
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Consult doctor if fever persists
          </li>
        </ul>
      </div>

      {/* SIDE EFFECTS */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
        <h3 className="font-bold text-black mb-2">Possible Side Effects</h3>
        <p>Rare allergic reactions; liver damage in overdose</p>
      </div>
    </div>
  );
}
