import { useState } from "react";
import { Search, Upload, Volume2, CheckCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/* -------------------- MEDICINE DATABASE -------------------- */
const MEDICINE_DB = [
  {
    id: 1,
    name: "Paracetamol",
    strength: "500mg",
    type: "Analgesic",
    manufacturer: "GSK Pharmaceuticals",
    treats: "Fever, Mild to moderate pain",
    dosage: "500–1000mg every 4–6 hours",
    precautions: ["Do not exceed 4000mg/day", "Avoid alcohol"],
    sideEffects: "Nausea, rash, liver damage in overdose",
  },
  {
    id: 2,
    name: "Ibuprofen",
    strength: "200mg",
    type: "NSAID",
    manufacturer: "Pfizer Inc",
    treats: "Pain, Inflammation, Fever",
    dosage: "200–400mg every 4–6 hours",
    precautions: ["Take with food", "Avoid if pregnant"],
    sideEffects: "Stomach upset, dizziness",
  },
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

/* -------------------- LANGUAGES -------------------- */
const LANGUAGES = [
  { code: "en", name: "English", voice: "en-US" },
  { code: "hi", name: "Hindi", voice: "hi-IN" },
];

/* -------------------- TRANSLATIONS -------------------- */
const TRANSLATIONS: any = {
  en: {
    title: "Tablet Verification",
    subtitle: "Verify medicine authenticity using AI",
    upload: "Upload Tablet Image",
    click: "Click to upload",
    inputLabel: "Tablet Name",
    placeholder: "e.g. Paracetamol",
    language: "Select Language",
    verify: "Verify Tablet",
    verified: "Verified Authentic",
    info: "Medication Info",
    dosage: "Dosage",
    precautions: "Precautions",
    sideEffects: "Side Effects",
  },
  hi: {
    title: "टैबलेट सत्यापन",
    subtitle: "एआई द्वारा दवा की प्रामाणिकता जांचें",
    upload: "टैबलेट चित्र अपलोड करें",
    click: "अपलोड करने के लिए क्लिक करें",
    inputLabel: "टैबलेट नाम",
    placeholder: "जैसे पैरासिटामोल",
    language: "भाषा चुनें",
    verify: "सत्यापित करें",
    verified: "सत्यापित प्रामाणिक",
    info: "दवा जानकारी",
    dosage: "खुराक",
    precautions: "सावधानियां",
    sideEffects: "दुष्प्रभाव",
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
    uploadImage: "Téléchargez una imagen o entrez les détails du comprimé para una vérification IA instantanée",
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
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [tabletName, setTabletName] = useState("");
  const [found, setFound] = useState<any>(null);
  const [verified, setVerified] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [lang, setLang] = useState(LANGUAGES[0]);

  const t = TRANSLATIONS[lang.code];

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang.voice;
    speechSynthesis.speak(u);
  };

  const verifyTablet = () => {
    const res = MEDICINE_DB.find(
      (m) => m.name.toLowerCase() === tabletName.toLowerCase()
    );
    if (res) {
      setFound(res);
      setVerified(true);
    } else {
      alert("Medicine not found");
      setVerified(false);
    }
  };

  const uploadImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors
      dark:bg-gray-900 dark:text-gray-100">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b
        border-gray-200 dark:border-gray-800">

        <h1 className="text-2xl font-bold holographic-text-static">
          {t.title}
        </h1>

        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200
            dark:bg-gray-700 dark:hover:bg-gray-600">
          {isDark ? <Sun /> : <Moon />}
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        <p className="text-center text-gray-600 dark:text-gray-400">
          {t.subtitle}
        </p>

        {/* INPUT CARD */}
        <div className="grid md:grid-cols-2 gap-6 bg-white dark:bg-gray-800
          rounded-2xl p-6 shadow-lg">

          {/* IMAGE UPLOAD */}
          <label className="border-2 border-dashed rounded-xl p-6 text-center
            cursor-pointer border-gray-300 dark:border-gray-600">
            <input type="file" hidden onChange={uploadImage} />
            {image ? (
              <img src={image} className="mx-auto h-40 rounded-lg" />
            ) : (
              <>
                <Upload className="mx-auto mb-2" />
                <p>{t.click}</p>
              </>
            )}
          </label>

          {/* INPUTS */}
          <div className="space-y-4">
            <label className="block font-medium">{t.inputLabel}</label>
            <input
              value={tabletName}
              onChange={(e) => setTabletName(e.target.value)}
              placeholder={t.placeholder}
              className="w-full px-4 py-2 rounded-lg border
                bg-gray-50 dark:bg-gray-700
                border-gray-300 dark:border-gray-600"
            />

            <label className="block font-medium">{t.language}</label>
            <select
              value={lang.code}
              onChange={(e) =>
                setLang(LANGUAGES.find(l => l.code === e.target.value)!)
              }
              className="w-full px-4 py-2 rounded-lg border
                bg-gray-50 dark:bg-gray-700
                border-gray-300 dark:border-gray-600">
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>

            <button
              onClick={verifyTablet}
              className="w-full py-3 rounded-lg text-white
                holographic-button-static">
              {t.verify}
            </button>
          </div>
        </div>

        {/* RESULT */}
        {verified && found && (
          <div className="space-y-6">

            <div className="flex items-center space-x-4 p-6 rounded-2xl
              bg-gradient-to-r from-cyan-500/20 to-emerald-500/20">
              <CheckCircle className="text-cyan-500" size={36} />
              <div>
                <h2 className="text-xl font-bold">{t.verified}</h2>
                <p>{found.name} {found.strength}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="font-bold mb-2">{t.info}</h3>
                <p>{found.treats}</p>
                <p className="text-sm text-gray-500">{found.manufacturer}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="font-bold mb-2">{t.dosage}</h3>
                <p>{found.dosage}</p>
                <button
                  onClick={() => speak(found.dosage)}
                  className="mt-3 flex items-center gap-2 text-cyan-500">
                  <Volume2 size={18} /> Speak
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">{t.precautions}</h3>
              <ul className="list-disc ml-5">
                {found.precautions.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">{t.sideEffects}</h3>
              <p>{found.sideEffects}</p>
            </div>
          </div>
        )}
      </div>

      {/* STYLES */}
      <style>{`
        .holographic-text-static {
          background: linear-gradient(135deg,#0ea5e9,#10b981);
          -webkit-background-clip: text;
          color: transparent;
        }
        .holographic-button-static {
          background: linear-gradient(135deg,#0ea5e9,#10b981);
          box-shadow: 0 4px 15px rgba(14,165,233,.4);
        }
      `}</style>
    </div>
  );
}
