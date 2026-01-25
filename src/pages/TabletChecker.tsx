import { useState } from "react";
import { Search, CheckCircle, Home } from "lucide-react";

export default function TabletChecker() {
  const [activeTab, setActiveTab] = useState("Tablet Checker");

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* ===== NAVIGATION BAR ===== */}
      <nav className="bg-white shadow-sm border-b border-[#e5e7eb]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("Home")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "Home"
                    ? "bg-[#e6f7ff] text-[#0086cc]"
                    : "text-[#666666] hover:text-[#333333]"
                  }`}
              >
                Home
              </button>

              <button
                onClick={() => setActiveTab("Tablet Checker")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors ${activeTab === "Tablet Checker"
                    ? "bg-[#e6f7ff] text-[#0086cc]"
                    : "text-[#666666] hover:text-[#333333]"
                  }`}
              >
                <CheckCircle size={16} />
                <span>Tablet Checker</span>
              </button>

              <button
                onClick={() => setActiveTab("Us")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "Us"
                    ? "bg-[#e6f7ff] text-[#0086cc]"
                    : "text-[#666666] hover:text-[#333333]"
                  }`}
              >
                Us
              </button>
            </div>

            <div className="relative w-72">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f3f4f6] rounded-lg border border-[#d1d5db] focus:outline-none focus:border-[#3b82f6] text-sm text-[#333333] placeholder:text-[#9ca3af]"
              />
              <Search className="absolute left-3 top-3 text-[#9ca3af]" size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container mx-auto px-6 py-8">
        {/* ===== VERIFIED BANNER ===== */}
        <div className="bg-gradient-to-r from-[#d1fae5] via-[#ecfdf5] to-[#d1fae5] rounded-2xl border border-[#a7f3d0] p-6 mb-8 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="relative">
                {/* Checkmark circle */}
                <div className="w-8 h-8 rounded-full border-2 border-[#10b981] flex items-center justify-center">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {/* Small dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#10b981] rounded-full border-2 border-white"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#065f46] mb-1">
                Verified Authentic
              </h1>
              <p className="text-[15px] text-[#374151]">
                This tablet has been successfully verified
              </p>
            </div>
          </div>
        </div>

        {/* ===== MAIN CARDS GRID ===== */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* ===== INFO CARD ===== */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#111827]">Info</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Large 500mg */}
            <div className="mb-6">
              <div className="text-5xl font-bold text-[#2563eb] mb-2">500mg</div>
              <div className="text-sm text-gray-500">Tablet Strength</div>
            </div>

            {/* Info Sections */}
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Treats</div>
                <div className="text-gray-800">Pain Relief, Fever Reduction, Headache</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Manufacturer</div>
                <div className="text-gray-800">Various Generic Manufacturers</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Type</div>
                <div className="text-gray-800">Analgesic & Antipyretic</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-500">Expiry</div>
                  <div className="text-gray-800">24 months from manufacture</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Storage</div>
                  <div className="text-gray-800">Room temperature</div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== DOSAGE INFORMATION CARD ===== */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#111827]">Dosage Information</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Dosage */}
            <div className="mb-6">
              <div className="text-gray-800 text-lg leading-relaxed mb-4">
                Adults: 500-1000mg every 4-6 hours. Maximum 4000mg per day.
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-blue-900">Recommended for:</div>
                    <div className="text-blue-800 text-sm">Headaches, Fever, Mild to Moderate Pain</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Age Groups Dosage */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Dosage by Age Group</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Adults (18+ years)</span>
                  <span className="font-medium text-gray-900">500-1000mg</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Children (12-17 years)</span>
                  <span className="font-medium text-gray-900">250-500mg</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">Children (6-11 years)</span>
                  <span className="font-medium text-gray-900">Consult doctor</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="font-medium text-gray-900 mb-3">Important Notes</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Take with water</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Do not exceed maximum daily dose</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Consult doctor if symptoms persist for more than 3 days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ===== ADDITIONAL SECTION ===== */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-8">
          <h2 className="text-2xl font-bold text-[#111827] mb-6">Safety Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Precautions</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Do not exceed recommended dose</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Avoid alcohol consumption</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Consult doctor if pregnant</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Side Effects</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Allergic reactions (rare)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Skin rash</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Liver damage (overdose)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Interactions</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Avoid with other painkillers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Consult doctor if on blood thinners</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
