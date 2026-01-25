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
      "Not suitable for patients with liver conditions",
      "Keep out of reach of children",
      "Store in a cool, dry place",
      "Check expiry date before consumption",
    ],
    sideEffects:
      "Rare: Allergic reactions, liver damage (overdose), skin rash, nausea, stomach pain",
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
        <h1 className="text-5xl font-bold text-black mb-4">
          <span 
            className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #2563eb, #10b981)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Tablet Verification
          </span>
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
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            style={{
              backgroundImage: "linear-gradient(to right, #2563eb, #10b981)",
            }}
          >
            Verify Tablet
          </button>
        </div>
      </div>

      {/* ===== VERIFIED STATUS ===== */}
      {verified && (
        <>
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-6 py-4 shadow-md">
            <h3 className="text-black font-semibold text-lg">
              Verified Authentic
            </h3>
            <p className="text-gray-600">
              This tablet has been successfully verified
            </p>
          </div>

          {/* ===== ENHANCED GRID GLOBE ===== */}
          <div className="bg-white rounded-2xl shadow-lg p-10 flex justify-center">
            <div style={{ width: 300, height: 300 }}>
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                {/* Background circle */}
                <circle cx="100" cy="100" r="95" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
                
                {/* Longitude lines (vertical ellipses) - Increased density */}
                <g stroke="#9BE6C4" strokeWidth="0.3" fill="none">
                  {/* Inner circles for grid effect */}
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((r) => (
                    <circle key={`inner-${r}`} cx="100" cy="100" r={r} />
                  ))}
                  
                  {/* Longitude lines - more lines */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 15 * Math.PI) / 180;
                    const rx = 90;
                    const ry = 45;
                    return (
                      <path
                        key={`long-${i}`}
                        d={`
                          M ${100 + rx * Math.cos(angle)} ${100 + ry * Math.sin(angle)}
                          A ${rx} ${ry} 0 0 1 ${100 - rx * Math.cos(angle)} ${100 - ry * Math.sin(angle)}
                          M ${100 + rx * Math.cos(angle)} ${100 + ry * Math.sin(angle)}
                          A ${rx} ${ry} 0 0 0 ${100 - rx * Math.cos(angle)} ${100 - ry * Math.sin(angle)}
                        `}
                      />
                    );
                  })}
                  
                  {/* Latitude lines (horizontal circles) - more lines */}
                  {Array.from({ length: 9 }).map((_, i) => {
                    const r = (i + 1) * 10;
                    return (
                      <ellipse
                        key={`lat-${i}`}
                        cx="100"
                        cy="100"
                        rx={r}
                        ry={r * 0.5}
                      />
                    );
                  })}
                  
                  {/* Additional diagonal grid lines */}
                  <g stroke="#c6f6d5" strokeWidth="0.2">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30 * Math.PI) / 180;
                      return (
                        <line
                          key={`diag-${i}`}
                          x1={100 + 90 * Math.cos(angle)}
                          y1={100 + 45 * Math.sin(angle)}
                          x2={100 - 90 * Math.cos(angle)}
                          y2={100 - 45 * Math.sin(angle)}
                        />
                      );
                    })}
                  </g>
                </g>
                
                {/* Main verification circle */}
                <circle cx="100" cy="100" r="45" fill="none" stroke="#10b981" strokeWidth="3" />
                <circle cx="100" cy="100" r="48" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
                
                {/* Animated rings for effect */}
                <circle cx="100" cy="100" r="52" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5">
                  <animate attributeName="r" values="52;55;52" dur="4s" repeatCount="indefinite" />
                </circle>
                
                <text x="100" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#10b981">
                  VERIFIED
                </text>
                <text x="100" y="120" textAnchor="middle" fontSize="10" fontWeight="500" fill="#3b82f6">
                  Authentic
                </text>
              </svg>
            </div>
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

          {/* ===== PRECAUTIONS WITH DUAL GRADIENT ===== */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-black mb-4">Precautions</h3>
            <ul className="space-y-3">
              {medicine.precautions.map((p, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span 
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, #3b82f6, #10b981)`,
                    }}
                  />
                  <span 
                    className="font-medium"
                    style={{
                      background: `linear-gradient(to right, #3b82f6, #10b981)`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {p}
                  </span>
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
