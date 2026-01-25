import { useState } from "react";
import { Search, Upload, Volume2, Home, CheckCircle } from "lucide-react";

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
    treats: "Pain Relief, Fever Reduction, Headache",
    dosage: "Adults: 500-1000mg every 4-6 hours. Maximum 4000mg per day.",
    manufacturer: "Various Generic Manufacturers",
    precautions: [
      "Do not exceed recommended dose",
      "Avoid alcohol consumption",
      "Not recommended with other paracetamol-containing products",
      "Consult doctor if symptoms persist",
    ],
    sideEffects: "Allergic reactions, liver damage (overdose), skin rash",
  },
  ibuprofen: {
    name: "Ibuprofen 200mg",
    treats: "Pain Relief, Inflammation, Fever",
    dosage: "Adults: 200-400mg every 4-6 hours. Maximum 1200mg per day.",
    manufacturer: "Various Generic Manufacturers",
    precautions: [
      "Take with food",
      "Not recommended for long-term use",
      "Avoid if pregnant",
      "Consult doctor if symptoms persist",
    ],
    sideEffects: "Stomach upset, dizziness, nausea",
  },
  amoxicillin: {
    name: "Amoxicillin 500mg",
    treats: "Bacterial Infections",
    dosage: "Adults: 500mg every 8 hours. Complete full course.",
    manufacturer: "Various Pharmaceutical Companies",
    precautions: [
      "Complete full course",
      "Take with plenty of water",
      "Inform doctor of any allergies",
      "Do not share medication",
    ],
    sideEffects: "Diarrhea, nausea, rash",
  },
};

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("paracetamol");
  const [verified, setVerified] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [activeTab, setActiveTab] = useState("Tablet Checker");

  const medicine = MEDICINE_DB[tabletName.toLowerCase()];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const handleVerify = () => {
    setVerified(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* ===== NAVIGATION BAR ===== */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("Home")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${activeTab === "Home" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <Home size={18} />
                <span className="font-medium">Home</span>
              </button>

              <button
                onClick={() => setActiveTab("Tablet Checker")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${activeTab === "Tablet Checker" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <CheckCircle size={18} />
                <span className="font-medium">Tablet Checker</span>
              </button>

              <button
                onClick={() => setActiveTab("Us")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${activeTab === "Us" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <span className="font-medium">Us</span>
              </button>
            </div>

            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container mx-auto px-4 py-8">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tablet Verification
          </h1>
          <p className="text-gray-600">
            Upload an image or enter tablet details for instant AI verification
          </p>
        </div>

        {/* ===== MAIN CARD ===== */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* ===== LEFT COLUMN - UPLOAD ===== */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Tablet Image
                </h3>
                <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                  />
                  <div className="mb-4">
                    <Upload className="mx-auto text-gray-400" size={48} />
                  </div>
                  <div className="text-gray-700 font-medium">
                    Click to upload
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    PNG, JPG up to 10MB
                  </div>
                </label>
              </div>

              {/* ===== RIGHT COLUMN - INPUTS ===== */}
              <div className="space-y-6">
                {/* Tablet Name Input */}
                <div>
                  <label className="font-semibold text-gray-900 block mb-2">
                    Tablet Imprint/Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-gray-400">T</span>
                    </div>
                    <input
                      type="text"
                      value={tabletName}
                      onChange={(e) => setTabletName(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <label className="font-semibold text-gray-900 block mb-2">
                    Select Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                  </select>
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerify}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>

          {/* ===== VERIFICATION RESULT ===== */}
          {verified && medicine && (
            <div className="space-y-6">
              {/* Verified Authentic Banner */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-5 shadow-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-white" />
                  <div>
                    <h3 className="font-bold text-lg">Verified Authentic</h3>
                    <p className="text-green-100">
                      This tablet has been successfully verified
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Medication Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-900 text-xl">Info</h3>
                    <Volume2
                      className="text-gray-600 cursor-pointer hover:text-blue-600"
                      onClick={() =>
                        speak(
                          `${medicine.name}. Treats: ${medicine.treats}. Manufacturer: ${medicine.manufacturer}`
                        )
                      }
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl font-bold text-blue-600">
                        500mg
                      </div>
                    </div>
                    <div className="text-gray-700">
                      <span className="font-medium">Treats:</span> {medicine.treats}
                    </div>
                    <div className="text-gray-700">
                      <span className="font-medium">Manufacturer:</span>{" "}
                      {medicine.manufacturer}
                    </div>
                  </div>
                </div>

                {/* Dosage Information Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-900 text-xl">
                      Dosage Information
                    </h3>
                    <Volume2
                      className="text-gray-600 cursor-pointer hover:text-blue-600"
                      onClick={() => speak(medicine.dosage)}
                    />
                  </div>
                  <p className="text-gray-700">{medicine.dosage}</p>
                </div>
              </div>

              {/* Precautions Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 text-xl mb-4">Precautions</h3>
                <div className="space-y-3">
                  {medicine.precautions.map((precaution, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{precaution}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side Effects Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 text-xl mb-4">Side Effects</h3>
                <p className="text-gray-700">{medicine.sideEffects}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
