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
  "ibu 200": {
    name: "Ibuprofen 200mg",
    treats: "Pain relief, Fever reduction, Inflammation",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    manufacturer: "Various Generic Manufacturers",
    precautions: [
      "Take with food or milk to avoid stomach upset",
      "Do not exceed recommended dosage",
      "Consult doctor if pain persists for more than 3 days",
      "Avoid if allergic to aspirin or other NSAIDs",
    ],
    sideEffects: "Mild: Upset stomach, dizziness. Severe: Allergic reactions, stomach bleeding",
  },
  ibuprofen: {
    name: "Ibuprofen 200mg",
    treats: "Pain relief, Fever reduction, Inflammation",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    manufacturer: "Various Generic Manufacturers",
    precautions: [
      "Take with food or milk to avoid stomach upset",
      "Do not exceed recommended dosage",
      "Consult doctor if pain persists for more than 3 days",
      "Avoid if allergic to aspirin or other NSAIDs",
    ],
    sideEffects: "Mild: Upset stomach, dizziness. Severe: Allergic reactions, stomach bleeding",
  },
  paracetamol: {
    name: "Paracetamol 500mg",
    treats: "Pain relief, Fever reduction",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    manufacturer: "Various Generic Manufacturers",
    precautions: [
      "Do not exceed recommended dose",
      "Avoid alcohol consumption",
      "Not recommended with other paracetamol-containing products",
      "Consult doctor if symptoms persist",
    ],
    sideEffects: "Rare: Allergic reactions, liver damage (overdose), skin rash",
  },
};

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [verified, setVerified] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const medicine = MEDICINE_DB[tabletName.toLowerCase()];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const handleVerify = () => {
    if (tabletName.toLowerCase() === "ibu 200" || tabletName.toLowerCase() === "ibuprofen") {
      setVerified(true);
    } else {
      setVerified(false);
      alert("Tablet not found in database. Please check the name and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto pt-8 md:pt-16 space-y-8">
        {/* ===== HEADING ===== */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Tablet Verification System
          </h1>
          <p className="mt-2 text-gray-600">
            Enter tablet details for instant verification
          </p>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Tablet Imprint/Name
              </h2>
              <input
                value={tabletName}
                onChange={(e) => setTabletName(e.target.value)}
                placeholder="e.g., IBU 200 or Ibuprofen"
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Select Language
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["English", "Hindi", "Spanish", "French", "German", "Chinese"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`p-3 rounded-lg border ${selectedLanguage === lang
                        ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleVerify}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 text-lg"
              >
                Verify Tablet
              </button>
            </div>
          </div>

          {/* Horizontal Divider */}
          {verified && (
            <>
              <div className="border-t border-gray-300 my-8"></div>

              {/* Verified Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Verified Authentic
                  </h3>
                </div>
                <p className="text-gray-700 ml-6">
                  This tablet has been successfully verified
                </p>
              </div>

              {/* Medication Info Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      Medication Info
                    </h3>
                    <Volume2
                      className="text-gray-600 cursor-pointer hover:text-blue-600"
                      onClick={() =>
                        speak(
                          `${medicine.name}. Manufactured by ${medicine.manufacturer}`
                        )
                      }
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Name</p>
                      <p className="text-lg font-medium text-gray-900">Paracetamol</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      Dosage Information
                    </h3>
                    <Volume2
                      className="text-gray-600 cursor-pointer hover:text-blue-600"
                      onClick={() => speak(medicine.dosage)}
                    />
                  </div>
                  <p className="text-gray-900 text-lg">
                    500–1000 mg every 4–6 hours (max 4000 mg/day)
                  </p>
                </div>
              </div>

              {/* Additional Information Sections */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    What it Treats
                  </h3>
                  <p className="text-gray-700">{medicine.treats}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Manufacturer
                  </h3>
                  <p className="text-gray-700">{medicine.manufacturer}</p>
                </div>
              </div>

              {/* Precautions Section */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Precautions
                </h3>
                <ul className="space-y-3">
                  {medicine.precautions.map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Side Effects Section */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Possible Side Effects
                </h3>
                <p className="text-gray-700">{medicine.sideEffects}</p>
              </div>
            </>
          )}
        </div>

        {/* Footer Note */}
        {!verified && (
          <div className="text-center text-gray-500 text-sm mt-8">
            <p>Enter tablet name and click "Verify Tablet" to check authenticity</p>
            <p className="mt-1">Example: IBU 200 or Ibuprofen</p>
          </div>
        )}
      </div>
    </div>
  );
}
