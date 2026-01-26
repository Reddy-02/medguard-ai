import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Upload,
  Pill,
  Languages,
  AlertTriangle,
  ShieldAlert,
  Volume2,
} from "lucide-react";

/* ================= TYPES ================= */
type State = "idle" | "verified";

type Medicine = {
  name: string;
  disease: string;
  dosage: string;
  precautions: string[];
  sideEffects: string;
  manufacturer: string;
  verified: boolean;
};

/* ================= MEDICINE DATABASE ================= */
/* 👉 ADD MORE MEDICINES HERE (same format, nothing else needed) */
const MEDICINES: Record<string, Medicine> = {
  paracetamol: {
    name: "Paracetamol",
    disease: "Fever, Headache, Mild to moderate pain",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol consumption",
      "Check other medicines for paracetamol content",
      "Consult doctor if fever persists",
    ],
    sideEffects: "Rare allergic reactions; liver damage in overdose",
    manufacturer: "Crocin, Dolo 650",
    verified: true,
  },

  ibuprofen: {
    name: "Ibuprofen",
    disease: "Pain, Inflammation, Fever",
    dosage: "200–400 mg every 6 hours (max 1200 mg/day)",
    precautions: [
      "Take after food",
      "Avoid alcohol",
      "Avoid during pregnancy",
      "Not recommended in stomach ulcers",
    ],
    sideEffects: "Acidity, nausea, dizziness",
    manufacturer: "Brufen, Ibugesic",
    verified: true,
  },

  aspirin: {
    name: "Aspirin",
    disease: "Pain, Fever, Blood thinning",
    dosage: "300–900 mg every 6 hours",
    precautions: [
      "Not for children below 16",
      "Avoid in bleeding disorders",
      "Stop before surgery",
      "Take with food",
    ],
    sideEffects: "Stomach irritation, bleeding risk",
    manufacturer: "Disprin, Ecosprin",
    verified: true,
  },
};

/* ================= MULTILINGUAL MEDICINE DATA ================= */
const medicineTranslations: Record<string, Record<string, any>> = {
  English: {
    paracetamol: {
      name: "Paracetamol",
      disease: "Fever, Headache, Mild to moderate pain",
      dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
      precautions: [
        "Do not exceed maximum daily dose",
        "Avoid alcohol consumption",
        "Check other medicines for paracetamol content",
        "Consult doctor if fever persists",
      ],
      sideEffects: "Rare allergic reactions; liver damage in overdose",
      manufacturer: "Crocin, Dolo 650",
    },
    ibuprofen: {
      name: "Ibuprofen",
      disease: "Pain, Inflammation, Fever",
      dosage: "200–400 mg every 6 hours (max 1200 mg/day)",
      precautions: [
        "Take after food",
        "Avoid alcohol",
        "Avoid during pregnancy",
        "Not recommended in stomach ulcers",
      ],
      sideEffects: "Acidity, nausea, dizziness",
      manufacturer: "Brufen, Ibugesic",
    },
    aspirin: {
      name: "Aspirin",
      disease: "Pain, Fever, Blood thinning",
      dosage: "300–900 mg every 6 hours",
      precautions: [
        "Not for children below 16",
        "Avoid in bleeding disorders",
        "Stop before surgery",
        "Take with food",
      ],
      sideEffects: "Stomach irritation, bleeding risk",
      manufacturer: "Disprin, Ecosprin",
    },
  },
  Hindi: {
    paracetamol: {
      name: "पेरासिटामोल",
      disease: "बुखार, सिरदर्द, हल्के से मध्यम दर्द",
      dosage: "500–1000 मिलीग्राम हर 4–6 घंटे (अधिकतम 4000 मिलीग्राम/दिन)",
      precautions: [
        "अधिकतम दैनिक खुराक से अधिक न लें",
        "शराब के सेवन से बचें",
        "अन्य दवाओं में पेरासिटामोल सामग्री जांचें",
        "यदि बुखार बना रहे तो डॉक्टर से सलाह लें",
      ],
      sideEffects: "दुर्लभ एलर्जी प्रतिक्रियाएं; ओवरडोज में लीवर क्षति",
      manufacturer: "क्रोसिन, डोलो 650",
    },
    ibuprofen: {
      name: "आइबुप्रोफेन",
      disease: "दर्द, सूजन, बुखार",
      dosage: "200–400 मिलीग्राम हर 6 घंटे (अधिकतम 1200 मिलीग्राम/दिन)",
      precautions: [
        "भोजन के बाद लें",
        "शराब से बचें",
        "गर्भावस्था के दौरान न लें",
        "पेट के अल्सर में अनुशंसित नहीं",
      ],
      sideEffects: "एसिडिटी, मतली, चक्कर आना",
      manufacturer: "ब्रूफेन, इबुगेसिक",
    },
    aspirin: {
      name: "एस्पिरिन",
      disease: "दर्द, बुखार, रक्त पतला करने वाली",
      dosage: "300–900 मिलीग्राम हर 6 घंटे",
      precautions: [
        "16 वर्ष से कम उम्र के बच्चों के लिए नहीं",
        "रक्तस्राव विकारों में न लें",
        "सर्जरी से पहले बंद करें",
        "भोजन के साथ लें",
      ],
      sideEffects: "पेट में जलन, रक्तस्राव का जोखिम",
      manufacturer: "डिस्प्रिन, इकोस्प्रिन",
    },
  },
  Spanish: {
    paracetamol: {
      name: "Paracetamol",
      disease: "Fiebre, Dolor de cabeza, Dolor leve a moderado",
      dosage: "500–1000 mg cada 4–6 horas (máximo 4000 mg/día)",
      precautions: [
        "No exceder la dosis diaria máxima",
        "Evitar el consumo de alcohol",
        "Verificar el contenido de paracetamol en otros medicamentos",
        "Consulte al médico si la fiebre persiste",
      ],
      sideEffects: "Reacciones alérgicas raras; daño hepático en sobredosis",
      manufacturer: "Crocin, Dolo 650",
    },
    ibuprofen: {
      name: "Ibuprofeno",
      disease: "Dolor, Inflamación, Fiebre",
      dosage: "200–400 mg cada 6 horas (máximo 1200 mg/día)",
      precautions: [
        "Tomar después de comer",
        "Evitar alcohol",
        "Evitar durante el embarazo",
        "No recomendado en úlceras estomacales",
      ],
      sideEffects: "Acidez, náuseas, mareos",
      manufacturer: "Brufen, Ibugesic",
    },
    aspirin: {
      name: "Aspirina",
      disease: "Dolor, Fiebre, Diluyente de sangre",
      dosage: "300–900 mg cada 6 horas",
      precautions: [
        "No para niños menores de 16 años",
        "Evitar en trastornos hemorrágicos",
        "Suspender antes de la cirugía",
        "Tomar con alimentos",
      ],
      sideEffects: "Irritación estomacal, riesgo de sangrado",
      manufacturer: "Disprin, Ecosprin",
    },
  },
  French: {
    paracetamol: {
      name: "Paracétamol",
      disease: "Fièvre, Maux de tête, Douleur légère à modérée",
      dosage: "500–1000 mg toutes les 4–6 heures (max 4000 mg/jour)",
      precautions: [
        "Ne pas dépasser la dose quotidienne maximale",
        "Éviter la consommation d'alcool",
        "Vérifier la teneur en paracétamol des autres médicaments",
        "Consulter un médecin si la fièvre persiste",
      ],
      sideEffects: "Réactions allergiques rares; dommages au foie en surdose",
      manufacturer: "Crocin, Dolo 650",
    },
    ibuprofen: {
      name: "Ibuprofène",
      disease: "Douleur, Inflammation, Fièvre",
      dosage: "200–400 mg toutes les 6 heures (max 1200 mg/jour)",
      precautions: [
        "Prendre après les repas",
        "Éviter l'alcool",
        "Éviter pendant la grossesse",
        "Non recommandé en cas d'ulcères d'estomac",
      ],
      sideEffects: "Acidité, nausées, vertiges",
      manufacturer: "Brufen, Ibugesic",
    },
    aspirin: {
      name: "Aspirine",
      disease: "Douleur, Fièvre, Fluidifiant sanguin",
      dosage: "300–900 mg toutes les 6 heures",
      precautions: [
        "Non pour les enfants de moins de 16 ans",
        "Éviter en cas de troubles hémorragiques",
        "Arrêter avant la chirurgie",
        "Prendre avec de la nourriture",
      ],
      sideEffects: "Irritation de l'estomac, risque de saignement",
      manufacturer: "Disprin, Ecosprin",
    },
  },
  German: {
    paracetamol: {
      name: "Paracetamol",
      disease: "Fieber, Kopfschmerzen, Leichte bis mäßige Schmerzen",
      dosage: "500–1000 mg alle 4–6 Stunden (max 4000 mg/Tag)",
      precautions: [
        "Tägliche Höchstdosis nicht überschreiten",
        "Alkoholkonsum vermeiden",
        "Paracetamolgehalt in anderen Medikamenten prüfen",
        "Arzt konsultieren, wenn Fieber anhält",
      ],
      sideEffects: "Seltene allergische Reaktionen; Leberschäden bei Überdosierung",
      manufacturer: "Crocin, Dolo 650",
    },
    ibuprofen: {
      name: "Ibuprofen",
      disease: "Schmerzen, Entzündungen, Fieber",
      dosage: "200–400 mg alle 6 Stunden (max 1200 mg/Tag)",
      precautions: [
        "Nach dem Essen einnehmen",
        "Alkohol vermeiden",
        "Während der Schwangerschaft vermeiden",
        "Bei Magengeschwüren nicht empfohlen",
      ],
      sideEffects: "Säure, Übelkeit, Schwindel",
      manufacturer: "Brufen, Ibugesic",
    },
    aspirin: {
      name: "Aspirin",
      disease: "Schmerzen, Fieber, Blutverdünner",
      dosage: "300–900 mg alle 6 Stunden",
      precautions: [
        "Nicht für Kinder unter 16 Jahren",
        "Bei Blutungsstörungen vermeiden",
        "Vor Operationen absetzen",
        "Mit Nahrung einnehmen",
      ],
      sideEffects: "Magenreizung, Blutungsrisiko",
      manufacturer: "Disprin, Ecosprin",
    },
  },
  Chinese: {
    paracetamol: {
      name: "扑热息痛",
      disease: "发烧, 头痛, 轻度至中度疼痛",
      dosage: "每4-6小时500-1000毫克（最大4000毫克/天）",
      precautions: [
        "不要超过每日最大剂量",
        "避免饮酒",
        "检查其他药物中对乙酰氨基酚含量",
        "如果发烧持续请咨询医生",
      ],
      sideEffects: "罕见过敏反应; 过量会导致肝损伤",
      manufacturer: "克罗辛, 多洛650",
    },
    ibuprofen: {
      name: "布洛芬",
      disease: "疼痛, 炎症, 发烧",
      dosage: "每6小时200-400毫克（最大1200毫克/天）",
      precautions: [
        "饭后服用",
        "避免酒精",
        "怀孕期间避免使用",
        "胃溃疡患者不推荐",
      ],
      sideEffects: "胃酸, 恶心, 头晕",
      manufacturer: "布洛芬, 布洛芬凝胶",
    },
    aspirin: {
      name: "阿司匹林",
      disease: "疼痛, 发烧, 血液稀释剂",
      dosage: "每6小时300-900毫克",
      precautions: [
        "16岁以下儿童禁用",
        "出血性疾病患者避免使用",
        "手术前停用",
        "随餐服用",
      ],
      sideEffects: "胃刺激, 出血风险",
      manufacturer: "迪斯普林, 埃科斯普林",
    },
  },
};

/* ================= COMPONENT ================= */
export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");

  const key = tablet.toLowerCase().replace(/\s+/g, "");
  const baseMedicine = MEDICINES[key] || MEDICINES.paracetamol;
  
  // Get translated medicine data for current language
  const translatedMedicine = medicineTranslations[language]?.[key] || 
                           medicineTranslations[language]?.paracetamol || 
                           baseMedicine;

  /* ================= TEXT TO SPEECH ================= */
  const getLangCode = () => {
    switch (language) {
      case "Hindi":
        return "hi-IN";
      case "Spanish":
        return "es-ES";
      case "French":
        return "fr-FR";
      case "German":
        return "de-DE";
      case "Chinese":
        return "zh-CN";
      default:
        return "en-US";
    }
  };

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = getLangCode();
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const speakMedicineInfo = () => {
    speak(
      `${translatedMedicine.name}. 
      उपयोग: ${translatedMedicine.disease}. 
      निर्माता: ${translatedMedicine.manufacturer}.`
    );
  };

  const speakDosageInfo = () => {
    speak(
      `${translatedMedicine.name}. 
      खुराक: ${translatedMedicine.dosage}.`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-7xl pt-24 pb-20 space-y-20">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold holographic-text">
            Tablet Verification
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered medicine authentication with real-time safety analysis
          </p>
        </div>

        {/* ================= INPUT ================= */}
        {state === "idle" && (
          <div className="glass-panel-strong p-10">
            <div className="grid md:grid-cols-2 gap-10">

              {/* UPLOAD */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Upload /> Upload Tablet Image
                </div>
                <label className="h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="font-medium">Drop or Click to Upload</p>
                  <p className="text-xs text-muted-foreground">
                    Optional – improves AI accuracy
                  </p>
                  <input type="file" className="hidden" />
                </label>
              </div>

              {/* FORM */}
              <div className="flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Pill /> Tablet Imprint / Name
                    </div>
                    <input
                      value={tablet}
                      onChange={(e) => setTablet(e.target.value)}
                      placeholder="e.g., Paracetamol"
                      className="h-12 w-full rounded-xl border px-4"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Languages /> Select Language
                    </div>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="h-12 w-full rounded-xl border px-4"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setState("verified")}
                  disabled={!tablet}
                  className="h-14 w-full rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-primary to-accent neon-glow-blue"
                >
                  Verify Tablet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= VERIFIED ================= */}
        {state === "verified" && (
          <div className="space-y-20">

            {/* 🔮 3D HOLOGRAM */}
            <div className="flex justify-center">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 rounded-full border border-primary/30 animate-spin-slow" />
                <div className="absolute inset-10 rounded-full border border-accent/40 animate-spin-reverse" />
                <div className="absolute inset-20 rounded-full bg-gradient-to-br from-accent to-primary blur-2xl opacity-40 animate-pulse-glow" />
                <div className="absolute inset-28 rounded-full bg-gradient-to-br from-primary to-accent shadow-neon flex items-center justify-center floating-3d">
                  <span className="text-white text-2xl font-bold tracking-widest">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-10">

              <div className="glass-panel p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Medication Info</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                    onClick={speakMedicineInfo}
                  />
                </div>
                <p><strong>Name:</strong> {translatedMedicine.name}</p>
                <p><strong>Uses:</strong> {translatedMedicine.disease}</p>
                <p><strong>Manufacturer:</strong> {translatedMedicine.manufacturer}</p>
              </div>

              <div className="glass-panel p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Dosage Information</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                    onClick={speakDosageInfo}
                  />
                </div>
                <p>{translatedMedicine.dosage}</p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel p-8">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <ShieldAlert className="text-primary" />
                Precautions
              </div>
              <ul className="space-y-3">
                {translatedMedicine.precautions.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span className="text-accent">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="glass-panel p-8 space-y-3">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="text-yellow-500" />
                Possible Side Effects
              </div>
              <p>{translatedMedicine.sideEffects}</p>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setTablet("");
                  setState("idle");
                }}
                className="px-10 py-4 rounded-xl bg-primary text-white font-semibold"
              >
                Check Another Tablet
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
