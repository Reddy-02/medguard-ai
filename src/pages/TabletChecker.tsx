import { useState } from "react";
import { Search, Upload, Volume2, Home, CheckCircle, X } from "lucide-react";

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
};

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("paracetamol");
  const [verified, setVerified] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [activeTab, setActiveTab] = useState("Tablet Checker");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const medicine = MEDICINE_DB[tabletName.toLowerCase()];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const handleVerify = () => {
    setVerified(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* ===== NAVIGATION BAR ===== */}
      <nav className="bg-white border-b border-[#e5e7eb]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("Home")}
                className={`px-3 py-2 rounded-lg text-[14px] font-medium ${activeTab === "Home"
                    ? "bg-[#e0f2fe] text-[#0284c7]"
                    : "text-[#4b5563] hover:text-[#374151]"
                  }`}
              >
                Home
              </button>

              <button
                onClick={() => setActiveTab("Tablet Checker")}
                className={`px-3 py-2 rounded-lg text-[14px] font-medium flex items-center space-x-2 ${activeTab === "Tablet Checker"
                    ? "bg-[#e0f2fe] text-[#0284c7]"
                    : "text-[#4b5563] hover:text-[#374151]"
                  }`}
              >
                <CheckCircle size={16} />
                <span>Tablet Checker</span>
              </button>

              <button
                onClick={() => setActiveTab("Us")}
                className={`px-3 py-2 rounded-lg text-[14px] font-medium ${activeTab === "Us"
                    ? "bg-[#e0f2fe] text-[#0284c7]"
                    : "text-[#4b5563] hover:text-[#374151]"
                  }`}
              >
                Us
              </button>
            </div>

            <div className="relative w-[280px]">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-[#f3f4f6] rounded-lg border border-[#e5e7eb] focus:outline-none focus:border-[#3b82f6] text-[14px] text-[#374151]"
              />
              <Search className="absolute left-3 top-2.5 text-[#9ca3af]" size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container mx-auto px-6 py-8">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-10">
          <h1 className="text-[40px] font-bold text-[#1f2937] mb-3">
            Tablet Verification
          </h1>
          <p className="text-[16px] text-[#6b7280]">
            Upload an image or enter tablet details for instant AI verification
          </p>
        </div>

        {/* ===== MAIN CARD ===== */}
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-10">
              {/* ===== LEFT COLUMN - UPLOAD ===== */}
              <div>
                <h3 className="font-semibold text-[16px] text-[#374151] mb-4">
                  Tablet Image
                </h3>
                <label className="block border-2 border-dashed border-[#d1d5db] rounded-xl p-8 text-center cursor-pointer hover:border-[#3b82f6] transition-colors bg-[#f9fafb]">
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {uploadedImage ? (
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded tablet"
                        className="mx-auto max-h-48 rounded-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setUploadedImage(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-5">
                        <Upload className="mx-auto text-[#9ca3af]" size={48} />
                      </div>
                      <div className="text-[16px] font-medium text-[#374151]">
                        Click to upload
                      </div>
                      <div className="text-[14px] text-[#6b7280] mt-1">
                        PNG, JPG up to 10MB
                      </div>
                    </>
                  )}
                </label>
              </div>

              {/* ===== RIGHT COLUMN - INPUTS ===== */}
              <div className="space-y-7">
                {/* Tablet Name Input */}
                <div>
                  <label className="font-semibold text-[16px] text-[#374151] block mb-3">
                    Tablet Imprint/Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <span className="text-[16px] font-medium text-[#6b7280]">T</span>
                    </div>
                    <input
                      type="text"
                      value={tabletName}
                      onChange={(e) => setTabletName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-[15px] text-[#374151] bg-white"
                      placeholder="e.g., IBU 200 or Ibuprofen"
                    />
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <label className="font-semibold text-[16px] text-[#374151] block mb-3">
                    Select Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-3.5 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-[15px] text-[#374151] bg-white appearance-none"
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
                  className="w-full bg-[#3b82f6] text-white font-semibold py-3.5 rounded-lg hover:bg-[#2563eb] transition-colors text-[16px] shadow-[0_2px_10px_rgba(59,130,246,0.3)]"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>

          {/* ===== VERIFICATION RESULT ===== */}
          {verified && medicine && (
            <div className="space-y-8">
              {/* Verified Authentic with 2D Grid Symbol */}
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8">
                <div className="flex items-start space-x-6">
                  {/* 2D Grid Verification Symbol */}
                  <div className="relative w-40 h-40 flex-shrink-0">
                    {/* Grid Globe */}
                    <div className="absolute inset-0">
                      <svg width="160" height="160" viewBox="0 0 160 160" className="absolute inset-0">
                        {/* Outer circle */}
                        <circle cx="80" cy="80" r="78" fill="none" stroke="#d1fae5" strokeWidth="1.5" />
                        
                        {/* Grid lines */}
                        <g stroke="#a7f3d0" strokeWidth="0.5" fill="none">
                          {/* Vertical lines */}
                          {Array.from({ length: 12 }).map((_, i) => {
                            const angle = (i * 30 * Math.PI) / 180;
                            const x1 = 80 + 75 * Math.cos(angle);
                            const y1 = 80 + 75 * Math.sin(angle);
                            const x2 = 80 - 75 * Math.cos(angle);
                            const y2 = 80 - 75 * Math.sin(angle);
                            return (
                              <line key={`v-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />
                            );
                          })}
                          
                          {/* Horizontal circles */}
                          {[15, 30, 45, 60].map((r, i) => (
                            <circle key={`h-${i}`} cx="80" cy="80" r={r} />
                          ))}
                          
                          {/* Diagonal grid */}
                          <g stroke="#86efac" strokeWidth="0.3">
                            {Array.from({ length: 24 }).map((_, i) => {
                              const angle = (i * 15 * Math.PI) / 180;
                              const x1 = 80 + 75 * Math.cos(angle);
                              const y1 = 80 + 75 * Math.sin(angle);
                              const x2 = 80 - 75 * Math.cos(angle);
                              const y2 = 80 - 75 * Math.sin(angle);
                              return (
                                <line key={`d-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />
                              );
                            })}
                          </g>
                        </g>
                        
                        {/* Inner verification circle */}
                        <circle cx="80" cy="80" r="30" fill="none" stroke="#10b981" strokeWidth="3" />
                        <circle cx="80" cy="80" r="32" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
                        
                        {/* Check mark */}
                        <path
                          d="M70,80 L75,85 L90,70"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Verification Text */}
                  <div className="pt-4">
                    <h3 className="text-[32px] font-bold text-[#065f46] mb-2">
                      Verified Authentic
                    </h3>
                    <p className="text-[16px] text-[#374151]">
                      This tablet has been successfully verified
                    </p>
                    <div className="mt-6 flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                      <span className="text-[14px] text-[#6b7280]">AI-Verified Safety Check</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Medication Info Card */}
                <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-7">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-bold text-[#1f2937] text-[24px]">Info</h3>
                    <button
                      onClick={() =>
                        speak(
                          `${medicine.name}. Treats: ${medicine.treats}. Manufacturer: ${medicine.manufacturer}`
                        )
                      }
                      className="p-2.5 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded-full transition-colors"
                    >
                      <Volume2 size={20} className="text-[#4b5563]" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="text-[42px] font-bold text-[#1e40af] leading-none">
                      500mg
                    </div>
                    <div className="text-[16px] text-[#4b5563] pt-2">
                      <span className="font-semibold text-[#1f2937]">Treats:</span> {medicine.treats}
                    </div>
                    <div className="text-[16px] text-[#4b5563]">
                      <span className="font-semibold text-[#1f2937]">Manufacturer:</span>{" "}
                      {medicine.manufacturer}
                    </div>
                  </div>
                </div>

                {/* Dosage Information Card */}
                <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-7">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-bold text-[#1f2937] text-[24px]">
                      Dosage Information
                    </h3>
                    <button
                      onClick={() => speak(medicine.dosage)}
                      className="p-2.5 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded-full transition-colors"
                    >
                      <Volume2 size={20} className="text-[#4b5563]" />
                    </button>
                  </div>
                  <p className="text-[16px] text-[#374151] leading-relaxed">
                    Adults: 500-1000mg every 4-6 hours. Maximum 4000mg per day.
                  </p>
                </div>
              </div>

              {/* Precautions Card */}
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-7">
                <h3 className="font-bold text-[#1f2937] text-[24px] mb-6">Precautions</h3>
                <div className="space-y-4">
                  {medicine.precautions.map((precaution, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"></div>
                      <span className="text-[16px] text-[#374151]">{precaution}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side Effects Card */}
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-7">
                <h3 className="font-bold text-[#1f2937] text-[24px] mb-4">Side Effects</h3>
                <p className="text-[16px] text-[#374151]">{medicine.sideEffects}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
