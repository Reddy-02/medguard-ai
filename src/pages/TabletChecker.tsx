import { useState, useEffect } from "react";
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

// Language configurations with different voices
const LANGUAGES = [
  { code: "en", name: "English", voice: "en-US" },
  { code: "hi", name: "Hindi", voice: "hi-IN" },
  { code: "es", name: "Spanish", voice: "es-ES" },
  { code: "fr", name: "French", voice: "fr-FR" },
  { code: "de", name: "German", voice: "de-DE" },
  { code: "zh", name: "Chinese", voice: "zh-CN" },
];

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [verified, setVerified] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  const medicine = MEDICINE_DB[tabletName.toLowerCase()];

  const speak = (text: string, voiceCode?: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceCode || selectedLanguage.voice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const handleVerify = () => {
    if (tabletName.toLowerCase() === "ibu 200" || 
        tabletName.toLowerCase() === "ibuprofen" || 
        tabletName.toLowerCase() === "paracetamol") {
      setVerified(true);
    } else {
      setVerified(false);
      // Show error message
      const errorMessage = {
        en: "Tablet not found. Please enter 'IBU 200', 'Ibuprofen', or 'Paracetamol'",
        hi: "टैबलेट नहीं मिली। कृपया 'IBU 200', 'Ibuprofen', या 'Paracetamol' दर्ज करें",
        es: "Tableta no encontrada. Ingrese 'IBU 200', 'Ibuprofen' o 'Paracetamol'",
        fr: "Comprimé introuvable. Veuillez saisir 'IBU 200', 'Ibuprofen' ou 'Paracetamol'",
        de: "Tablette nicht gefunden. Bitte geben Sie 'IBU 200', 'Ibuprofen' oder 'Paracetamol' ein",
        zh: "未找到药片。请输入'IBU 200'、'Ibuprofen'或'Paracetamol'",
      };
      alert(errorMessage[selectedLanguage.code as keyof typeof errorMessage]);
    }
  };

  // Get text based on selected language
  const getTranslatedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      tabletImprint: {
        en: "Tablet Imprint/Name",
        hi: "टैबलेट इम्प्रिंट/नाम",
        es: "Marca/Nombre de la tableta",
        fr: "Marque/Nom du comprimé",
        de: "Tabletten-Prägung/Name",
        zh: "药片印记/名称",
      },
      placeholder: {
        en: "e.g., IBU 200 or Ibuprofen",
        hi: "जैसे, IBU 200 या Ibuprofen",
        es: "p. ej., IBU 200 o Ibuprofeno",
        fr: "ex. IBU 200 ou Ibuprofène",
        de: "z.B. IBU 200 oder Ibuprofen",
        zh: "例如：IBU 200 或布洛芬",
      },
      selectLanguage: {
        en: "Select Language",
        hi: "भाषा चुनें",
        es: "Seleccionar idioma",
        fr: "Choisir la langue",
        de: "Sprache auswählen",
        zh: "选择语言",
      },
      verifyTablet: {
        en: "Verify Tablet",
        hi: "टैबलेट सत्यापित करें",
        es: "Verificar tableta",
        fr: "Vérifier le comprimé",
        de: "Tablette überprüfen",
        zh: "验证药片",
      },
      verifiedAuthentic: {
        en: "Verified Authentic",
        hi: "प्रमाणित प्रामाणिक",
        es: "Verificado Auténtico",
        fr: "Vérifié Authentique",
        de: "Verifiziert Authentisch",
        zh: "已验证真实",
      },
      verificationSuccess: {
        en: "This tablet has been successfully verified",
        hi: "इस टैबलेट को सफलतापूर्वक सत्यापित किया गया है",
        es: "Esta tableta ha sido verificada exitosamente",
        fr: "Ce comprimé a été vérifié avec succès",
        de: "Diese Tablette wurde erfolgreich verifiziert",
        zh: "此药片已成功验证",
      },
      medicationInfo: {
        en: "Medication Info",
        hi: "दवा की जानकारी",
        es: "Información del medicamento",
        fr: "Informations sur le médicament",
        de: "Medikamenteninformation",
        zh: "药品信息",
      },
      name: {
        en: "Name",
        hi: "नाम",
        es: "Nombre",
        fr: "Nom",
        de: "Name",
        zh: "名称",
      },
      dosageInfo: {
        en: "Dosage Information",
        hi: "खुराक की जानकारी",
        es: "Información de dosificación",
        fr: "Informations sur le dosage",
        de: "Dosierungsinformationen",
        zh: "剂量信息",
      },
    };
    return translations[key]?.[selectedLanguage.code] || translations[key]?.en || key;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-3xl mx-auto pt-8 space-y-8">
        {/* ===== HEADING ===== */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Tablet Verification
          </h1>
          <p className="mt-2 text-gray-500">
            Enter tablet details for instant verification
          </p>
        </div>

        {/* ===== MAIN CARD ===== */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Tablet Name Input */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {getTranslatedText("tabletImprint")}
            </h2>
            <input
              value={tabletName}
              onChange={(e) => setTabletName(e.target.value)}
              placeholder={getTranslatedText("placeholder")}
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gradient-to-r focus:border-blue-500 focus:ring-0 text-lg"
              style={{
                background: "linear-gradient(to right, #f8fafc, #f1f5f9)",
              }}
            />
          </div>

          {/* Language Selection */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {getTranslatedText("selectLanguage")}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-lg font-medium ${selectedLanguage.code === lang.code
                      ? "border-gradient-to-r border-blue-500 bg-gradient-to-r from-blue-50 to-green-50 text-gradient-to-r from-blue-600 to-green-600"
                      : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  style={
                    selectedLanguage.code === lang.code
                      ? {
                        borderImage: "linear-gradient(to right, #3b82f6, #10b981) 1",
                      }
                      : {}
                  }
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t-2 border-gray-100 my-8"></div>

          {/* Verify Button */}
          <div>
            <button
              onClick={handleVerify}
              className="w-full py-5 rounded-xl text-white font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(to right, #2563eb, #059669)",
                boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)",
              }}
            >
              {getTranslatedText("verifyTablet")}
            </button>
          </div>

          {/* Verified Section - Only shows after verification */}
          {verified && (
            <>
              <div className="border-t-2 border-gray-100 my-8"></div>

              {/* Verified Authentic Card */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "linear-gradient(to right, rgba(34, 197, 94, 0.1), rgba(37, 99, 235, 0.1))",
                  border: "2px solid",
                  borderImage: "linear-gradient(to right, #10b981, #3b82f6) 1",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #10b981)",
                    }}
                  ></div>
                  <h3
                    className="text-2xl font-bold"
                    style={{
                      background: "linear-gradient(to right, #10b981, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {getTranslatedText("verifiedAuthentic")}
                  </h3>
                </div>
                <p
                  className="ml-7 text-gray-700"
                  style={{
                    background: "linear-gradient(to right, #374151, #4b5563)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {getTranslatedText("verificationSuccess")}
                </p>
              </div>

              {/* Medication Info Section */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Medication Info Card */}
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h3
                      className="text-xl font-bold"
                      style={{
                        background: "linear-gradient(to right, #1e40af, #065f46)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {getTranslatedText("medicationInfo")}
                    </h3>
                    <button
                      onClick={() =>
                        speak(
                          selectedLanguage.code === "en"
                            ? `Medication Info. Name: Paracetamol`
                            : getTranslatedText("medicationInfo") + ". " + getTranslatedText("name") + ": Paracetamol",
                          selectedLanguage.voice
                        )
                      }
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Volume2
                        className="w-6 h-6"
                        style={{
                          background: "linear-gradient(to right, #3b82f6, #10b981)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 mb-1">
                      {getTranslatedText("name")}
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        background: "linear-gradient(to right, #2563eb, #059669)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      Paracetamol
                    </p>
                  </div>
                </div>

                {/* Dosage Information Card */}
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h3
                      className="text-xl font-bold"
                      style={{
                        background: "linear-gradient(to right, #1e40af, #065f46)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {getTranslatedText("dosageInfo")}
                    </h3>
                    <button
                      onClick={() =>
                        speak(
                          selectedLanguage.code === "en"
                            ? "Dosage Information. 500–1000 mg every 4–6 hours, maximum 4000 mg per day"
                            : getTranslatedText("dosageInfo") + ". 500–1000 mg every 4–6 hours, maximum 4000 mg per day",
                          selectedLanguage.voice
                        )
                      }
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Volume2
                        className="w-6 h-6"
                        style={{
                          background: "linear-gradient(to right, #3b82f6, #10b981)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      />
                    </button>
                  </div>
                  <p
                    className="text-lg leading-relaxed"
                    style={{
                      background: "linear-gradient(to right, #374151, #4b5563)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    500–1000 mg every 4–6 hours (max 4000 mg/day)
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                <h3
                  className="text-xl font-bold mb-4"
                  style={{
                    background: "linear-gradient(to right, #1e40af, #065f46)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Precautions
                </h3>
                <ul className="space-y-4">
                  {MEDICINE_DB.paracetamol.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                        style={{
                          background: `linear-gradient(135deg, 
                            ${index % 2 === 0 ? "#3b82f6" : "#10b981"}, 
                            ${index % 2 === 0 ? "#10b981" : "#3b82f6"})`,
                        }}
                      ></div>
                      <span
                        className="text-gray-700"
                        style={{
                          background: "linear-gradient(to right, #374151, #4b5563)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        {precaution}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm mt-8 pb-8">
          <p
            style={{
              background: "linear-gradient(to right, #6b7280, #9ca3af)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Enter "IBU 200", "Ibuprofen", or "Paracetamol" to see verification results
          </p>
        </div>
      </div>

      {/* Add custom styles for gradient borders */}
      <style jsx>{`
        .border-gradient-to-r {
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        input:focus {
          border-image: linear-gradient(to right, #3b82f6, #10b981) 1;
        }
      `}</style>
    </div>
  );
}
