import { useState, useCallback, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* =========================
   INLINE TRANSLATIONS
========================= */

type Language = "en" | "es" | "fr" | "de" | "hi" | "zh";

type Translation = {
  subtitle: string;
  tabletName: string;
  tabletPlaceholder: string;
  language: string;
  verify: string;
  verifying: string;
  upload: string;
  accepts: string;
  analyzing: string;
  checking: string;
  verified: string;
  medicationInfo: string;
  dosageInfo: string;
  uses: string;
  manufacturer: string;
  dosage: string;
  frequency: string;
  speak: string;
};

const languageNames: Record<Language, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  hi: "Hindi",
  zh: "Chinese",
};

const translations: Record<Language, Translation> = {
  en: {
    subtitle: "Instant AI-based medicine authenticity check",
    tabletName: "Tablet Name",
    tabletPlaceholder: "e.g. Paracetamol",
    language: "Language",
    verify: "Verify Tablet",
    verifying: "Verifying...",
    upload: "Click to upload",
    accepts: "PNG, JPG up to 10MB",
    analyzing: "Analyzing tablet image…",
    checking: "Checking medical database…",
    verified: "Verified Authentic",
    medicationInfo: "Medication Info",
    dosageInfo: "Dosage Information",
    uses: "Uses",
    manufacturer: "Manufacturer",
    dosage: "Dosage",
    frequency: "Frequency",
    speak: "Speak",
  },
  es: {
    subtitle: "Verificación instantánea de medicamentos con IA",
    tabletName: "Nombre de la tableta",
    tabletPlaceholder: "ej. Paracetamol",
    language: "Idioma",
    verify: "Verificar tableta",
    verifying: "Verificando...",
    upload: "Haga clic para subir",
    accepts: "PNG, JPG hasta 10MB",
    analyzing: "Analizando imagen…",
    checking: "Verificando base de datos…",
    verified: "Autenticado",
    medicationInfo: "Información del medicamento",
    dosageInfo: "Información de dosis",
    uses: "Usos",
    manufacturer: "Fabricante",
    dosage: "Dosis",
    frequency: "Frecuencia",
    speak: "Hablar",
  },
  fr: {
    subtitle: "Vérification instantanée des médicaments par IA",
    tabletName: "Nom du comprimé",
    tabletPlaceholder: "ex. Paracétamol",
    language: "Langue",
    verify: "Vérifier",
    verifying: "Vérification...",
    upload: "Cliquez pour télécharger",
    accepts: "PNG, JPG jusqu'à 10MB",
    analyzing: "Analyse de l'image…",
    checking: "Vérification de la base…",
    verified: "Authentifié",
    medicationInfo: "Infos médicament",
    dosageInfo: "Dosage",
    uses: "Utilisation",
    manufacturer: "Fabricant",
    dosage: "Dosage",
    frequency: "Fréquence",
    speak: "Lire",
  },
  de: {
    subtitle: "Sofortige KI-basierte Medikamentenprüfung",
    tabletName: "Tablettenname",
    tabletPlaceholder: "z. B. Paracetamol",
    language: "Sprache",
    verify: "Überprüfen",
    verifying: "Überprüfung...",
    upload: "Zum Hochladen klicken",
    accepts: "PNG, JPG bis 10MB",
    analyzing: "Bildanalyse…",
    checking: "Datenbankprüfung…",
    verified: "Authentisch",
    medicationInfo: "Medikamenteninfo",
    dosageInfo: "Dosierung",
    uses: "Verwendung",
    manufacturer: "Hersteller",
    dosage: "Dosierung",
    frequency: "Häufigkeit",
    speak: "Sprechen",
  },
  hi: {
    subtitle: "एआई आधारित दवा सत्यापन",
    tabletName: "टैबलेट नाम",
    tabletPlaceholder: "जैसे पैरासिटामोल",
    language: "भाषा",
    verify: "सत्यापित करें",
    verifying: "सत्यापन...",
    upload: "अपलोड करने के लिए क्लिक करें",
    accepts: "PNG, JPG 10MB तक",
    analyzing: "छवि विश्लेषण…",
    checking: "डेटाबेस जांच…",
    verified: "प्रामाणिक",
    medicationInfo: "दवा जानकारी",
    dosageInfo: "खुराक",
    uses: "उपयोग",
    manufacturer: "निर्माता",
    dosage: "मात्रा",
    frequency: "आवृत्ति",
    speak: "सुनें",
  },
  zh: {
    subtitle: "基于 AI 的药品真实性验证",
    tabletName: "药品名称",
    tabletPlaceholder: "例如 对乙酰氨基酚",
    language: "语言",
    verify: "验证药品",
    verifying: "验证中...",
    upload: "点击上传",
    accepts: "PNG, JPG 最大10MB",
    analyzing: "图像分析中…",
    checking: "数据库检查中…",
    verified: "已验证",
    medicationInfo: "药品信息",
    dosageInfo: "用量信息",
    uses: "用途",
    manufacturer: "制造商",
    dosage: "剂量",
    frequency: "频率",
    speak: "朗读",
  },
};

/* =========================
   MOCK MEDICATION DATA
========================= */

const medication = {
  uses: "Fever, Mild to moderate pain",
  manufacturer: "GSK Pharmaceuticals",
  dosage: "500–1000mg",
  frequency: "Every 4–6 hours",
};

/* =========================
   COMPONENT
========================= */

type State = "idle" | "analyzing" | "checking" | "verified";

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [image, setImage] = useState<string | null>(null);
  const [state, setState] = useState<State>("idle");

  const t = translations[language];

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = language;
    window.speechSynthesis.speak(u);
  };

  const verify = async () => {
    if (!tabletName.trim()) return;
    setState("analyzing");
    await new Promise((r) => setTimeout(r, 1500));
    setState("checking");
    await new Promise((r) => setTimeout(r, 1500));
    setState("verified");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-10 space-y-8">
        <p className="text-center text-muted-foreground">{t.subtitle}</p>

        {/* INPUT CARD */}
        {state === "idle" && (
          <div className="glass-card p-6 grid md:grid-cols-2 gap-6">
            <label className="upload-zone">
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setImage(
                    e.target.files
                      ? URL.createObjectURL(e.target.files[0])
                      : null
                  )
                }
              />
              {image ? (
                <img src={image} className="max-h-32 mx-auto" />
              ) : (
                <>
                  <Upload className="mx-auto mb-2" />
                  <p>{t.upload}</p>
                  <span className="text-xs">{t.accepts}</span>
                </>
              )}
            </label>

            <div className="space-y-4">
              <div>
                <Label>{t.tabletName}</Label>
                <Input
                  value={tabletName}
                  onChange={(e) => setTabletName(e.target.value)}
                  placeholder={t.tabletPlaceholder}
                />
              </div>

              <div>
                <Label>{t.language}</Label>
                <Select
                  value={language}
                  onValueChange={(v) => setLanguage(v as Language)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languageNames).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="btn-gradient w-full" onClick={verify}>
                {t.verify}
              </Button>
            </div>
          </div>
        )}

        {/* SCANNING */}
        {(state === "analyzing" || state === "checking") && (
          <div className="glass-card p-6 flex items-center justify-center gap-4">
            <Loader2 className="animate-spin" />
            {state === "analyzing" ? t.analyzing : t.checking}
          </div>
        )}

        {/* VERIFIED */}
        {state === "verified" && (
          <div className="space-y-6">
            <div className="success-banner flex items-center gap-3">
              <CheckCircle2 />
              {t.verified}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="info-card">
                <h3>{t.medicationInfo}</h3>
                <p>{medication.uses}</p>
                <p>{medication.manufacturer}</p>
                <Button variant="ghost" onClick={() =>
                  speak(`${medication.uses}. ${medication.manufacturer}`)
                }>
                  <Volume2 /> {t.speak}
                </Button>
              </div>

              <div className="info-card">
                <h3>{t.dosageInfo}</h3>
                <p>{medication.dosage}</p>
                <p>{medication.frequency}</p>
                <Button variant="ghost" onClick={() =>
                  speak(`${medication.dosage}. ${medication.frequency}`)
                }>
                  <Volume2 /> {t.speak}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
