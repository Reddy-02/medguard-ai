import { useState } from "react";
import { Volume2 } from "lucide-react";

type Medicine = {
  name: string;
  treats: string;
  dosage: string;
  manufacturer: string;
  precautions: string[];
  sideEffects: string;
};

const MEDICINE_DB: Record<string, Medicine> = {
  paracetamol: {
    name: "Paracetamol 500mg",
    treats: "Pain relief, Fever reduction, Headache",
    dosage: "Adults: 500–1000mg every 4–6 hours. Maximum 4000mg per day.",
    manufacturer: "Various Generic Manufacturers",
    precautions: [
      "Do not exceed recommended dose",
      "Avoid alcohol consumption",
      "Not recommended with other paracetamol-containing products",
      "Consult doctor if symptoms persist",
    ],
    sideEffects:
      "Rare: Allergic reactions, liver damage (overdose), skin rash",
  },
};

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("paracetamol");
  const [verified, setVerified] = useState(false);

  const medicine = MEDICINE_DB[tabletName.toLowerCase()];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container max-w-5xl pt-24 pb-16 space-y-10">
      {/* ===== HEADING ===== */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black">
          <span className="text-blue-600">Tablet</span>{" "}
          <span className="text-green-500">Verification</span>
        </h1>
        <p className="mt-2 text-gray-500">
          Upload an image or enter tablet details for instant AI verification
        </p>
      </div>

      {/* ===== INPUT CARD ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-2 gap-6">
        {/* Upload */}
        <div>
          <h3 className="font-semibold text-black mb-2">
            Upload Tablet Image
          </h3>
          <label className="border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer text-gray-500">
            <input type="file" accept="image/png,image/jpeg" className="hidden" />
            <span className="text-lg">⬆</span>
            <span>Click to upload</span>
            <span className="text-sm">PNG, JPG up to 10MB</span>
          </label>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="font-semibold text-black">
              Tablet Imprint / Name
            </label>
            <input
              value={tabletName}
              onChange={(e) => setTabletName(e.target.value)}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="font-semibold text-black">Select Language</label>
            <select className="mt-1 w-full rounded-lg border px-4 py-2">
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Chinese</option>
            </select>
          </div>

          <button
            onClick={() => setVerified(!!medicine)}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-green-500"
          >
            Verify Tablet
          </button>
        </div>
      </div>

     <div style={{ width: 260, height: 260 }}>
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    {/* Outer boundary */}
    <circle
      cx="100"
      cy="100"
      r="90"
      fill="none"
      stroke="#9BE6C4"
      strokeWidth="0.6"
    />

    {/* Latitude lines */}
    <g stroke="#9BE6C4" strokeWidth="0.4" opacity="0.7">
      {Array.from({ length: 9 }).map((_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="100"
          rx="90"
          ry={80 - i * 8}
          fill="none"
        />
      ))}
    </g>

    {/* Longitude lines */}
    <g stroke="#9BE6C4" strokeWidth="0.4" opacity="0.7">
      {Array.from({ length: 9 }).map((_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="100"
          rx={80 - i * 8}
          ry="90"
          fill="none"
        />
      ))}
    </g>

    {/* Diagonal mesh */}
    <g stroke="#9BE6C4" strokeWidth="0.35" opacity="0.4">
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={20 + i * 13}
          y1="10"
          x2={180 - i * 13}
          y2="190"
        />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i + 20}
          x1="10"
          y1={20 + i * 13}
          x2="190"
          y2={180 - i * 13}
        />
      ))}
    </g>

    {/* Verification ring */}
    <circle
      cx="100"
      cy="100"
      r="45"
      fill="none"
      stroke="#6AD7A6"
      strokeWidth="4"
    />

    {/* VERIFIED text */}
    <text
      x="100"
      y="105"
      textAnchor="middle"
      fontFamily="Inter, Arial, sans-serif"
      fontSize="12"
      fontWeight="600"
      fill="#6AD7A6"
    >
      VERIFIED
    </text>
  </svg>
</div>

          {/* ===== INFO CARDS ===== */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-black">Medication Info</h3>
                <Volume2
                  className="text-black cursor-pointer"
                  onClick={() =>
                    speak(
                      `${medicine.name}. Treats ${medicine.treats}. Manufactured by ${medicine.manufacturer}`
                    )
                  }
                />
              </div>
              <p><b>Name:</b> {medicine.name}</p>
              <p><b>Treats:</b> {medicine.treats}</p>
              <p><b>Manufacturer:</b> {medicine.manufacturer}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-black">Dosage Information</h3>
                <Volume2
                  className="text-black cursor-pointer"
                  onClick={() => speak(medicine.dosage)}
                />
              </div>
              <p>{medicine.dosage}</p>
            </div>
          </div>

          {/* ===== PRECAUTIONS ===== */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-black mb-3">Precautions</h3>
            <ul className="space-y-2">
              {medicine.precautions.map((p, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* ===== SIDE EFFECTS ===== */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-black mb-2">Possible Side Effects</h3>
            <p>{medicine.sideEffects}</p>
          </div>
        </>
      )}
    </div>
  );
}
