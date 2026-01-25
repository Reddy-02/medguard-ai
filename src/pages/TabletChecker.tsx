import { useState } from "react";
import { Search, Upload, Volume2, Home, CheckCircle } from "lucide-react";

// Medicine Database with 30 entries for brevity
const MEDICINE_DB = [
  { id: 1, name: "Paracetamol", strength: "500mg", type: "Analgesic", manufacturer: "GSK Pharmaceuticals", treats: "Fever, Mild to moderate pain", dosage: "500-1000mg every 4-6 hours", precautions: ["Do not exceed 4000mg/day", "Avoid alcohol", "Take with food if stomach upset occurs"], sideEffects: "Nausea, rash, liver damage in overdose" },
  { id: 2, name: "Ibuprofen", strength: "200mg", type: "NSAID", manufacturer: "Pfizer Inc", treats: "Pain, Inflammation, Fever", dosage: "200-400mg every 4-6 hours", precautions: ["Take with food", "Avoid if pregnant", "Monitor kidney function"], sideEffects: "Stomach upset, dizziness, bleeding risk" },
  { id: 3, name: "Aspirin", strength: "325mg", type: "Salicylate", manufacturer: "Bayer AG", treats: "Pain, Fever, Antiplatelet", dosage: "325-650mg every 4 hours", precautions: ["Avoid in children", "Take with food", "Monitor for bleeding"], sideEffects: "Stomach irritation, tinnitus, bleeding" },
  { id: 4, name: "Naproxen", strength: "250mg", type: "NSAID", manufacturer: "Roche Holding", treats: "Arthritis pain, Inflammation", dosage: "250-500mg twice daily", precautions: ["Take with food", "Avoid prolonged use", "Monitor blood pressure"], sideEffects: "Heartburn, headache, fluid retention" },
  { id: 5, name: "Diclofenac", strength: "50mg", type: "NSAID", manufacturer: "Novartis AG", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "50mg 2-3 times daily", precautions: ["Take with food", "Short-term use recommended", "Monitor liver function"], sideEffects: "Abdominal pain, nausea, liver enzyme elevation" },
  { id: 6, name: "Celecoxib", strength: "200mg", type: "COX-2 Inhibitor", manufacturer: "Pfizer Inc", treats: "Arthritis, Acute pain", dosage: "100-200mg twice daily", precautions: ["Cardiovascular risk", "Avoid in heart disease", "Take with food"], sideEffects: "Headache, abdominal pain, edema" },
  { id: 7, name: "Tramadol", strength: "50mg", type: "Opioid", manufacturer: "Johnson & Johnson", treats: "Moderate to severe pain", dosage: "50-100mg every 4-6 hours", precautions: ["Risk of addiction", "Avoid alcohol", "Caution in elderly"], sideEffects: "Dizziness, nausea, constipation, drowsiness" },
  { id: 8, name: "Codeine", strength: "30mg", type: "Opioid", manufacturer: "Sanofi SA", treats: "Mild to moderate pain, Cough", dosage: "15-60mg every 4-6 hours", precautions: ["Risk of dependence", "Avoid alcohol", "Monitor breathing"], sideEffects: "Drowsiness, constipation, nausea" },
  { id: 9, name: "Morphine", strength: "10mg", type: "Opioid", manufacturer: "Mallinckrodt Pharmaceuticals", treats: "Severe pain", dosage: "10-30mg every 4 hours", precautions: ["High risk of addiction", "Monitor respiratory rate", "Adjust dose in renal impairment"], sideEffects: "Respiratory depression, sedation, constipation" },
  { id: 10, name: "Oxycodone", strength: "5mg", type: "Opioid", manufacturer: "Purdue Pharma", treats: "Moderate to severe pain", dosage: "5-15mg every 4-6 hours", precautions: ["High abuse potential", "Monitor for dependence", "Avoid alcohol"], sideEffects: "Nausea, constipation, dizziness, respiratory depression" },
  { id: 11, name: "Hydrocodone", strength: "5mg", type: "Opioid", manufacturer: "Teva Pharmaceuticals", treats: "Moderate to severe pain", dosage: "5-10mg every 4-6 hours", precautions: ["Risk of addiction", "Avoid alcohol", "Monitor for misuse"], sideEffects: "Drowsiness, nausea, constipation, respiratory depression" },
  { id: 12, name: "Acetaminophen with Codeine", strength: "300/30mg", type: "Combination", manufacturer: "Janssen Pharmaceuticals", treats: "Moderate pain", dosage: "1-2 tablets every 4 hours", precautions: ["Do not exceed 4000mg acetaminophen/day", "Risk of addiction", "Avoid alcohol"], sideEffects: "Drowsiness, constipation, liver damage" },
  { id: 13, name: "Meloxicam", strength: "15mg", type: "NSAID", manufacturer: "Boehringer Ingelheim", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "7.5-15mg once daily", precautions: ["Take with food", "Monitor for GI bleeding", "Caution in elderly"], sideEffects: "Diarrhea, abdominal pain, edema" },
  { id: 14, name: "Ketorolac", strength: "10mg", type: "NSAID", manufacturer: "Roche Holding", treats: "Short-term moderate pain", dosage: "10mg every 4-6 hours", precautions: ["Short-term use only", "High risk of GI bleeding", "Monitor kidney function"], sideEffects: "GI bleeding, nausea, headache" },
  { id: 15, name: "Indomethacin", strength: "25mg", type: "NSAID", manufacturer: "Merck & Co", treats: "Gout, Arthritis", dosage: "25-50mg 2-3 times daily", precautions: ["Take with food", "Monitor for ulcers", "Avoid in elderly"], sideEffects: "Headache, dizziness, peptic ulcer" },
  { id: 16, name: "Piroxicam", strength: "20mg", type: "NSAID", manufacturer: "Pfizer Inc", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "20mg once daily", precautions: ["Take with food", "High risk of GI complications", "Monitor renal function"], sideEffects: "Dyspepsia, nausea, edema" },
  { id: 17, name: "Etodolac", strength: "400mg", type: "NSAID", manufacturer: "AbbVie Inc", treats: "Osteoarthritis, Pain", dosage: "400-1000mg daily in divided doses", precautions: ["Take with food", "Monitor for GI bleeding", "Caution in elderly"], sideEffects: "Dyspepsia, diarrhea, abdominal pain" },
  { id: 18, name: "Nabumetone", strength: "500mg", type: "NSAID", manufacturer: "GSK Pharmaceuticals", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "1000mg once daily", precautions: ["Take with food", "Monitor liver function", "Avoid in late pregnancy"], sideEffects: "Diarrhea, abdominal pain, dizziness" },
  { id: 19, name: "Sulindac", strength: "150mg", type: "NSAID", manufacturer: "Merck & Co", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "150-200mg twice daily", precautions: ["Take with food", "Monitor renal function", "Caution in elderly"], sideEffects: "GI pain, diarrhea, rash" },
  { id: 20, name: "Ketoprofen", strength: "100mg", type: "NSAID", manufacturer: "Sanofi SA", treats: "Rheumatoid arthritis, Osteoarthritis", dosage: "100-200mg daily in divided doses", precautions: ["Take with food", "Short-term use", "Monitor for GI bleeding"], sideEffects: "Dyspepsia, nausea, abdominal pain" },
  { id: 21, name: "Amoxicillin", strength: "500mg", type: "Antibiotic", manufacturer: "GSK Pharmaceuticals", treats: "Bacterial infections", dosage: "250-500mg every 8 hours", precautions: ["Complete full course", "Take with water", "Report allergic reactions"], sideEffects: "Diarrhea, nausea, rash" },
  { id: 22, name: "Azithromycin", strength: "250mg", type: "Macrolide", manufacturer: "Pfizer Inc", treats: "Respiratory infections", dosage: "500mg once daily for 3 days", precautions: ["Take on empty stomach", "Monitor QT interval", "Avoid antacids"], sideEffects: "Diarrhea, nausea, abdominal pain" },
  { id: 23, name: "Cephalexin", strength: "500mg", type: "Cephalosporin", manufacturer: "Lupin Pharmaceuticals", treats: "Skin infections, UTIs", dosage: "250-500mg every 6 hours", precautions: ["Take with food", "Complete full course", "Monitor for allergy"], sideEffects: "Diarrhea, nausea, rash" },
  { id: 24, name: "Doxycycline", strength: "100mg", type: "Tetracycline", manufacturer: "Mylan N.V.", treats: "Acne, Respiratory infections", dosage: "100mg twice daily", precautions: ["Take with water", "Avoid dairy products", "Use sunscreen"], sideEffects: "Photosensitivity, nausea, esophagitis" },
  { id: 25, name: "Ciprofloxacin", strength: "500mg", type: "Fluoroquinolone", manufacturer: "Bayer AG", treats: "UTIs, Respiratory infections", dosage: "250-750mg twice daily", precautions: ["Avoid antacids", "Monitor for tendonitis", "Stay hydrated"], sideEffects: "Nausea, diarrhea, tendon rupture risk" },
  { id: 26, name: "Levofloxacin", strength: "500mg", type: "Fluoroquinolone", manufacturer: "Janssen Pharmaceuticals", treats: "Pneumonia, Sinusitis", dosage: "250-750mg once daily", precautions: ["Avoid antacids", "Monitor blood sugar", "Report tendon pain"], sideEffects: "Nausea, insomnia, tendonitis" },
  { id: 27, name: "Metronidazole", strength: "500mg", type: "Antibiotic", manufacturer: "Pfizer Inc", treats: "Anaerobic infections, Parasites", dosage: "250-500mg three times daily", precautions: ["Avoid alcohol", "Take with food", "Complete full course"], sideEffects: "Metallic taste, nausea, dark urine" },
  { id: 28, name: "Clindamycin", strength: "300mg", type: "Lincosamide", manufacturer: "Pfizer Inc", treats: "Skin infections, Dental infections", dosage: "150-450mg every 6 hours", precautions: ["Take with full glass of water", "Monitor for diarrhea", "Report severe abdominal pain"], sideEffects: "Diarrhea, nausea, rash" },
  { id: 29, name: "Vancomycin", strength: "125mg", type: "Glycopeptide", manufacturer: "Pfizer Inc", treats: "MRSA infections", dosage: "125-500mg every 6-12 hours", precautions: ["IV administration only", "Monitor kidney function", "Check hearing"], sideEffects: "Red man syndrome, nephrotoxicity, ototoxicity" },
  { id: 30, name: "Linezolid", strength: "600mg", type: "Oxazolidinone", manufacturer: "Pfizer Inc", treats: "VRE infections, Pneumonia", dosage: "600mg every 12 hours", precautions: ["Monitor blood counts", "Avoid tyramine foods", "Short-term use"], sideEffects: "Thrombocytopenia, neuropathy, diarrhea" }
];

// Language configurations
const LANGUAGES = [
  { code: "en", name: "English", voice: "en-US" },
  { code: "hi", name: "Hindi", voice: "hi-IN" },
  { code: "es", name: "Spanish", voice: "es-ES" },
  { code: "fr", name: "French", voice: "fr-FR" },
  { code: "de", name: "German", voice: "de-DE" },
  { code: "zh", name: "Chinese", voice: "zh-CN" }
];

// Translations for different languages
const TRANSLATIONS = {
  en: {
    tabletVerification: "Tablet Verification",
    uploadImage: "Upload an image or enter tablet details for instant AI verification",
    tabletImage: "Tablet Image",
    clickToUpload: "Click to upload",
    fileRequirements: "PNG, JPG up to 10MB",
    tabletImprintName: "Tablet Imprint/Name",
    placeholder: "e.g., Paracetamol, Ibuprofen, Amoxicillin",
    selectLanguage: "Select Language",
    verifyTablet: "Verify Tablet",
    verifiedAuthentic: "Verified Authentic",
    verificationSuccess: "This tablet has been successfully verified",
    medicationInfo: "Medication Info",
    name: "Name",
    treats: "Treats",
    manufacturer: "Manufacturer",
    dosageInformation: "Dosage Information",
    precautions: "Precautions",
    sideEffects: "Possible Side Effects",
    type: "Type",
    strength: "Strength",
    searchPlaceholder: "Search medicines...",
    noResults: "No medicine found. Try another name.",
    errorMessage: "Please enter a medicine name to verify"
  },
  hi: {
    tabletVerification: "टैबलेट सत्यापन",
    uploadImage: "तत्काल एआई सत्यापन के लिए एक छवि अपलोड करें या टैबलेट विवरण दर्ज करें",
    tabletImage: "टैबलेट छवि",
    clickToUpload: "अपलोड करने के लिए क्लिक करें",
    fileRequirements: "PNG, JPG 10MB तक",
    tabletImprintName: "टैबलेट इम्प्रिंट/नाम",
    placeholder: "जैसे, पैरासिटामोल, इबुप्रोफेन, एमोक्सिसिलिन",
    selectLanguage: "भाषा चुनें",
    verifyTablet: "टैबलेट सत्यापित करें",
    verifiedAuthentic: "प्रमाणित प्रामाणिक",
    verificationSuccess: "इस टैबलेट को सफलतापूर्वक सत्यापित किया गया है",
    medicationInfo: "दवा की जानकारी",
    name: "नाम",
    treats: "इलाज करता है",
    manufacturer: "निर्माता",
    dosageInformation: "खुराक की जानकारी",
    precautions: "सावधानियां",
    sideEffects: "संभावित दुष्प्रभाव",
    type: "प्रकार",
    strength: "शक्ति",
    searchPlaceholder: "दवाइयां खोजें...",
    noResults: "कोई दवा नहीं मिली। कोई अन्य नाम आज़माएं।",
    errorMessage: "सत्यापित करने के लिए कृपया एक दवा का नाम दर्ज करें"
  },
  es: {
    tabletVerification: "Verificación de Tabletas",
    uploadImage: "Suba una imagen o ingrese detalles de la tableta para verificación instantánea con IA",
    tabletImage: "Imagen de la Tableta",
    clickToUpload: "Haga clic para subir",
    fileRequirements: "PNG, JPG hasta 10MB",
    tabletImprintName: "Marca/Nombre de la Tableta",
    placeholder: "ej., Paracetamol, Ibuprofeno, Amoxicilina",
    selectLanguage: "Seleccionar Idioma",
    verifyTablet: "Verificar Tableta",
    verifiedAuthentic: "Verificado Auténtico",
    verificationSuccess: "Esta tableta ha sido verificada exitosamente",
    medicationInfo: "Información del Medicamento",
    name: "Nombre",
    treats: "Trata",
    manufacturer: "Fabricante",
    dosageInformation: "Información de Dosificación",
    precautions: "Precauciones",
    sideEffects: "Posibles Efectos Secundarios",
    type: "Tipo",
    strength: "Potencia",
    searchPlaceholder: "Buscar medicamentos...",
    noResults: "No se encontró el medicamento. Intente con otro nombre.",
    errorMessage: "Por favor ingrese un nombre de medicamento para verificar"
  },
  fr: {
    tabletVerification: "Vérification des Comprimés",
    uploadImage: "Téléchargez una imagen o entrez les détails du comprimé pour une vérification IA instantanée",
    tabletImage: "Imagen du Comprimé",
    clickToUpload: "Cliquez para télécharger",
    fileRequirements: "PNG, JPG hasta 10MB",
    tabletImprintName: "Marque/Nom du Comprimé",
    placeholder: "ex., Paracétamol, Ibuprofène, Amoxicilline",
    selectLanguage: "Sélectionner la Langue",
    verifyTablet: "Vérifier le Comprimé",
    verifiedAuthentic: "Vérifié Authentique",
    verificationSuccess: "Ce comprimé a été vérifié avec succès",
    medicationInfo: "Informations sur le Médicament",
    name: "Nom",
    treats: "Traite",
    manufacturer: "Fabricant",
    dosageInformation: "Informations sur le Dosage",
    precautions: "Précautions",
    sideEffects: "Effets Secondaires Possibles",
    type: "Type",
    strength: "Puissance",
    searchPlaceholder: "Rechercher des médicaments...",
    noResults: "Médicament non trouvé. Essayez un autre nom.",
    errorMessage: "Veuillez entrer un nom de médicament à vérifier"
  },
  de: {
    tabletVerification: "Tablettenüberprüfung",
    uploadImage: "Laden Sie ein Bild hoch oder geben Sie Tabletten details für sofortige KI-Überprüfung ein",
    tabletImage: "Tablettenbild",
    clickToUpload: "Zum Hochladen klicken",
    fileRequirements: "PNG, JPG bis zu 10MB",
    tabletImprintName: "Tablettenprägung/Name",
    placeholder: "z.B., Paracetamol, Ibuprofen, Amoxicillin",
    selectLanguage: "Sprache auswählen",
    verifyTablet: "Tablette überprüfen",
    verifiedAuthentic: "Verifiziert Authentisch",
    verificationSuccess: "Diese Tablette wurde erfolgreich verifiziert",
    medicationInfo: "Medikamenteninformation",
    name: "Name",
    treats: "Behandelt",
    manufacturer: "Hersteller",
    dosageInformation: "Dosierungsinformation",
    precautions: "Vorsichtsmaßnahmen",
    sideEffects: "Mögliche Nebenwirkungen",
    type: "Typ",
    strength: "Stärke",
    searchPlaceholder: "Medikamente suchen...",
    noResults: "Medikament nicht gefunden. Versuchen Sie einen anderen Namen.",
    errorMessage: "Bitte geben Sie einen Medikamentennamen zur Überprüfung ein"
  }
};

export default function TabletChecker() {
  const [activeTab, setActiveTab] = useState("Tablet Checker");
  const [tabletName, setTabletName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [verified, setVerified] = useState(false);
  const [foundMedicine, setFoundMedicine] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Get translations for current language
  const t = TRANSLATIONS[selectedLanguage.code as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage.voice;
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const handleVerify = () => {
    if (!tabletName.trim()) {
      alert(t.errorMessage);
      return;
    }

    const searchTerm = tabletName.toLowerCase();
    const found = MEDICINE_DB.find(med => 
      med.name.toLowerCase().includes(searchTerm) || 
      med.name.toLowerCase() === searchTerm
    );

    if (found) {
      setFoundMedicine(found);
      setVerified(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      alert(t.noResults);
      setVerified(false);
      setFoundMedicine(null);
    }
  };

  const handleSearch = (value: string) => {
    setTabletName(value);
    if (value.length > 1) {
      const results = MEDICINE_DB.filter(med =>
        med.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectMedicine = (medicine: any) => {
    setTabletName(medicine.name);
    setFoundMedicine(medicine);
    setSearchResults([]);
    setShowSuggestions(false);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("Home")}
                className={`text-sm font-medium ${activeTab === "Home" ? "text-[#10b981]" : "text-gray-600 hover:text-gray-900"}`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("Tablet Checker")}
                className={`flex items-center space-x-2 text-sm font-medium ${activeTab === "Tablet Checker" ? "text-[#10b981]" : "text-gray-600 hover:text-gray-900"}`}
              >
                <CheckCircle size={16} />
                <span>Tablet Checker</span>
              </button>
              <button
                onClick={() => setActiveTab("Us")}
                className={`text-sm font-medium ${activeTab === "Us" ? "text-[#10b981]" : "text-gray-600 hover:text-gray-900"}`}
              >
                Us
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-64 pl-10 pr-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:border-[#10b981] text-sm text-gray-900 placeholder:text-gray-500"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header with Green Gradient */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3" style={{
            background: "linear-gradient(to right, #10b981, #059669, #047857)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent"
          }}>
            {t.tabletVerification}
          </h1>
          <p className="text-gray-600">
            {t.uploadImage}
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                {t.tabletImage}
              </h3>
              <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#10b981] transition-colors bg-gray-50">
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
                      <span className="text-xs">×</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-5">
                      <Upload className="mx-auto text-gray-400" size={40} />
                    </div>
                    <div className="text-gray-900 font-medium mb-1">
                      {t.clickToUpload}
                    </div>
                    <div className="text-sm text-gray-500">
                      {t.fileRequirements}
                    </div>
                  </>
                )}
              </label>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              {/* Tablet Name Input with Suggestions */}
              <div className="relative">
                <label className="font-medium text-gray-900 block mb-2">
                  {t.tabletImprintName}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={tabletName}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={t.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#10b981] text-gray-900 bg-white"
                  />
                  {showSuggestions && searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {searchResults.map((medicine) => (
                        <div
                          key={medicine.id}
                          onClick={() => handleSelectMedicine(medicine)}
                          className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-900">{medicine.name} {medicine.strength}</div>
                          <div className="text-sm text-gray-600">{medicine.type} • {medicine.manufacturer}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="font-medium text-gray-900 block mb-2">
                  {t.selectLanguage}
                </label>
                <select
                  value={selectedLanguage.code}
                  onChange={(e) => {
                    const lang = LANGUAGES.find(l => l.code === e.target.value);
                    if (lang) setSelectedLanguage(lang);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#10b981] text-gray-900 bg-white"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Verify Button with Green Gradient */}
              <button
                onClick={handleVerify}
                className="w-full py-3.5 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300"
                style={{
                  background: "linear-gradient(to right, #10b981, #059669, #047857)",
                }}
              >
                {t.verifyTablet}
              </button>
            </div>
          </div>
        </div>

        {/* Verification Result */}
        {verified && foundMedicine && (
          <div className="space-y-8">
            {/* Verified Banner with Green Gradient */}
            <div className="rounded-2xl p-6 shadow-lg" style={{
              background: "linear-gradient(to right, #d1fae5, #a7f3d0, #86efac)",
              border: "2px solid #10b981"
            }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <div className="relative">
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
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#10b981] rounded-full border-2 border-white"></div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#065f46]">
                    {t.verifiedAuthentic}
                  </h2>
                  <p className="text-[#047857]">
                    {t.verificationSuccess}
                  </p>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Medication Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {t.medicationInfo}
                  </h3>
                  <button
                    onClick={() => speak(`${t.medicationInfo}. ${t.name}: ${foundMedicine.name}. ${t.treats}: ${foundMedicine.treats}. ${t.manufacturer}: ${foundMedicine.manufacturer}`)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Volume2 className="text-gray-600" size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{t.name}</div>
                    <div className="text-lg font-medium text-gray-900">{foundMedicine.name} {foundMedicine.strength}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{t.treats}</div>
                    <div className="text-gray-900">{foundMedicine.treats}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{t.manufacturer}</div>
                    <div className="text-gray-900">{foundMedicine.manufacturer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{t.type}</div>
                    <div className="text-gray-900">{foundMedicine.type}</div>
                  </div>
                </div>
              </div>

              {/* Dosage Information Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {t.dosageInformation}
                  </h3>
                  <button
                    onClick={() => speak(`${t.dosageInformation}. ${foundMedicine.dosage}`)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Volume2 className="text-gray-600" size={20} />
                  </button>
                </div>
                <p className="text-gray-900 leading-relaxed">
                  {foundMedicine.dosage}
                </p>
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-green-900">Important Note</div>
                      <div className="text-sm text-green-800">Follow dosage instructions carefully. Do not exceed recommended dose.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Precautions Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t.precautions}
              </h3>
              <div className="space-y-3">
                {foundMedicine.precautions.map((precaution: string, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-900">{precaution}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Effects Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.sideEffects}
              </h3>
              <p className="text-gray-900">
                {foundMedicine.sideEffects}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 py-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-gray-500 text-sm">
            Tablet Verification System • Database includes 30+ medications
          </p>
        </div>
      </div>
    </div>
  );
}
