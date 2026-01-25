import { useState } from "react";
import { Search, Upload, Volume2, Home, CheckCircle } from "lucide-react";

export default function TabletChecker() {
  const [activeTab, setActiveTab] = useState("Tablet Checker");
  const [tabletName, setTabletName] = useState("paracetamol");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [verified, setVerified] = useState(false);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ===== NAVIGATION BAR ===== */}
      <nav className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("Home")}
                className={`text-sm font-medium ${activeTab === "Home" ? "text-[#1e40af]" : "text-[#64748b] hover:text-[#334155]"}`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("Tablet Checker")}
                className={`flex items-center space-x-2 text-sm font-medium ${activeTab === "Tablet Checker" ? "text-[#1e40af]" : "text-[#64748b] hover:text-[#334155]"}`}
              >
                <CheckCircle size={16} />
                <span>Tablet Checker</span>
              </button>
              <button
                onClick={() => setActiveTab("Us")}
                className={`text-sm font-medium ${activeTab === "Us" ? "text-[#1e40af]" : "text-[#64748b] hover:text-[#334155]"}`}
              >
                Us
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-64 pl-10 pr-4 py-2 bg-[#f1f5f9] rounded-lg border border-[#cbd5e1] focus:outline-none focus:border-[#3b82f6] text-sm text-[#334155] placeholder:text-[#94a3b8]"
              />
              <Search className="absolute left-3 top-2.5 text-[#94a3b8]" size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
            Tablet Verification
          </h1>
          <p className="text-[#64748b]">
            Upload an image or enter tablet details for instant AI verification
          </p>
        </div>

        {/* ===== INPUT SECTION ===== */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div>
              <h3 className="font-medium text-[#334155] mb-4">Upload Tablet Image</h3>
              <div className="border-2 border-dashed border-[#cbd5e1] rounded-lg p-8 text-center hover:border-[#3b82f6] transition-colors cursor-pointer bg-[#f8fafc]">
                <Upload className="mx-auto text-[#94a3b8] mb-3" size={40} />
                <div className="text-[#334155] font-medium mb-1">Click to upload</div>
                <div className="text-sm text-[#64748b]">PNG, JPG up to 10MB</div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              {/* Tablet Name */}
              <div>
                <label className="font-medium text-[#334155] block mb-2">
                  Tablet Imprint/Name
                </label>
                <input
                  type="text"
                  value={tabletName}
                  onChange={(e) => setTabletName(e.target.value)}
                  placeholder="e.g., IBU 200 or Ibuprofen"
                  className="w-full px-4 py-3 border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#3b82f6] text-[#334155] bg-white"
                />
              </div>

              {/* Language Select */}
              <div>
                <label className="font-medium text-[#334155] block mb-2">
                  Select Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#3b82f6] text-[#334155] bg-white"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                </select>
              </div>

              {/* Divider */}
              <div className="border-t border-[#e2e8f0] my-4"></div>

              {/* Verify Button */}
              <button
                onClick={() => setVerified(true)}
                className="w-full bg-[#3b82f6] text-white font-medium py-3.5 rounded-lg hover:bg-[#2563eb] transition-colors"
              >
                Verify Tablet
              </button>
            </div>
          </div>
        </div>

        {/* ===== VERIFICATION RESULT ===== */}
        {verified && (
          <div className="space-y-8">
            {/* Verified Banner */}
            <div className="bg-gradient-to-r from-[#d1fae5] to-[#bbf7d0] border border-[#86efac] rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-[#10b981] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#065f46]">
                    Verified Authentic
                  </h2>
                  <p className="text-[#047857]">
                    This tablet has been successfully verified
                  </p>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Medication Info */}
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-[#1e293b]">Medication Info</h3>
                  <button
                    onClick={() => speak("Medication Info. Name: Paracetamol 500mg. Treats: Pain Relief, Fever Reduction, Headache. Manufacturer: Various Generic Manufacturers")}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Volume2 className="text-[#64748b]" size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-[#64748b] mb-1">Name</div>
                    <div className="text-[#334155] font-medium">Paracetamol 500mg</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#64748b] mb-1">Treats</div>
                    <div className="text-[#334155]">Pain Relief, Fever Reduction, Headache</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#64748b] mb-1">Manufacturer</div>
                    <div className="text-[#334155]">Various Generic Manufacturers</div>
                  </div>
                </div>
              </div>

              {/* Dosage Information */}
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-[#1e293b]">Dosage Information</h3>
                  <button
                    onClick={() => speak("Dosage Information. Adults: 500-1000mg every 4-6 hours. Maximum 4000mg per day.")}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Volume2 className="text-[#64748b]" size={20} />
                  </button>
                </div>
                <p className="text-[#334155]">
                  500–1000 mg every 4–6 hours (max 4000 mg/day)
                </p>
                <p className="mt-3 text-[#334155]">
                  Adults: 500-1000mg every 4-6 hours. Maximum 4000mg per day.
                </p>
              </div>
            </div>

            {/* Precautions */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
              <h3 className="text-xl font-bold text-[#1e293b] mb-4">Precautions</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ef4444] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#334155]">Do not exceed recommended dose</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ef4444] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#334155]">Avoid alcohol consumption</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ef4444] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#334155]">Not recommended with other paracetamol-containing products</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ef4444] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#334155]">Consult doctor if symptoms persist</span>
                </li>
              </ul>
            </div>

            {/* Side Effects */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
              <h3 className="text-xl font-bold text-[#1e293b] mb-4">Possible Side Effects</h3>
              <p className="text-[#334155]">
                <span className="font-medium">Rare:</span> Allergic reactions, liver damage (overdose), skin rash
              </p>
            </div>

            {/* Additional Info with 500mg */}
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-2">Info</h3>
                  <div className="text-4xl font-bold text-[#1e40af]">500mg</div>
                  <p className="text-sm text-[#64748b] mt-1">Tablet Strength</p>
                </div>
                <div className="text-right">
                  <div className="text-[#334155] mb-1">Dosage Information</div>
                  <div className="text-lg text-[#1e293b]">Adults: 500-1000mg every 4-6 hours</div>
                  <div className="text-sm text-[#64748b]">Maximum 4000mg per day</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
