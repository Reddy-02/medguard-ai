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

/* -------------------- TYPES -------------------- */
type Language = "en" | "es" | "fr" | "de" | "hi" | "zh";
type VerificationState = "idle" | "analyzing" | "checking" | "verified";

interface Translation {
  subtitle: string;
  tabletName: string;
  tabletPlaceholder: string;
  language: string;
  verifyButton: string;
  verifying: string;
  analyzingTablet: string;
  checkingDatabase: string;
  verifiedAuthentic: string;
  medicationInfo: string;
  dosageInfo: string;
  uses: string;
  manufacturer: string;
  dosageAmount: string;
  frequency: string;
  speakInfo: string;
  uploadArea: {
    click: string;
    accepts: string;
  };
}

/* -------------------- TRANSLATIONS -------------------- */
const translations: Record<Language, Translation> = {
  en: {
    subtitle: "Instant AI-based medicine authenticity check",
    tabletName: "Tablet Name",
    tabletPlaceholder: "e.g. Paracetamol",
    language: "Language",
    verifyButton: "Verify Tablet",
    verifying: "Verifying...",
    analyzingTablet: "Analyzing tablet image...",
    checkingDatabase: "Checking medical database...",
    verifiedAuthentic: "Verified Authentic",
    medicationInfo: "Medication Info",
    dosageInfo: "Dosage Information",
    uses: "Uses",
    manufacturer: "Manufacturer",
    dosageAmount: "Dosage",
    frequency: "Frequency",
    speakInfo: "Speak",
    uploadArea: {
      click: "Click to upload",
      accepts: "Tablet image (optional)",
    },
  },
  es: {
    subtitle: "Verificación instantánea de medicamentos con IA",
    tabletName: "Nombre de la Tableta",
    tabletPlaceholder: "ej. Paracetamol",
    language: "Idioma",
    verifyButton: "Verificar Tableta",
    verifying: "Verificando...",
    analyzingTablet: "Analizando imagen...",
    checkingDatabase: "Consultando base médica...",
    verifiedAuthentic: "Autenticidad Verificada",
    medicationInfo: "Información del Medicamento",
    dosageInfo: "Información de Dosis",
    uses: "Usos",
    manufacturer: "Fabricante",
    dosageAmount: "Dosis",
    frequency: "Frecuencia",
    speakInfo: "Escuchar",
    uploadArea: {
      click: "Subir imagen",
      accepts: "Imagen opcional",
    },
  },
  fr: {
    subtitle: "Vérification instantanée par IA",
    tabletName: "Nom du Comprimé",
    tabletPlaceholder: "ex. Paracétamol",
    language: "Langue",
    verifyButton: "Vérifier",
    verifying: "Vérification...",
    analyzingTablet: "Analyse en cours...",
    checkingDatabase: "Base médicale...",
    verifiedAuthentic: "Authentifié",
    medicationInfo: "Infos Médicament",
    dosageInfo: "Dosage",
    uses: "Utilisation",
    manufacturer: "Fabricant",
    dosageAmount: "Dose",
    frequency: "Fréquence",
    speakInfo: "Lire",
    uploadArea: {
      click: "Télécharger",
      accepts: "Image optionnelle",
    },
  },
  de: {
    subtitle: "KI-gestützte Medikamentenprüfung",
    tabletName: "Tablettenname",
    tabletPlaceholder: "z.B. Paracetamol",
    language: "Sprache",
    verifyButton: "Überprüfen",
    verifying: "Überprüfung...",
    analyzingTablet: "Analyse...",
    checkingDatabase: "Datenbank...",
    verifiedAuthentic: "Echt",
    medicationInfo: "Medikament Info",
    dosageInfo: "Dosierung",
    uses: "Anwendung",
    manufacturer: "Hersteller",
    dosageAmount: "Menge",
    frequency: "Häufigkeit",
    speakInfo: "Sprechen",
    uploadArea: {
      click: "Hochladen",
      accepts: "Optional",
    },
  },
  hi: {
    subtitle: "एआई द्वारा दवा सत्यापन",
    tabletName: "टैबलेट नाम",
    tabletPlaceholder: "जैसे पैरासिटामोल",
    language: "भाषा",
    verifyButton: "सत्यापित करें",
    verifying: "सत्यापन...",
    analyzingTablet: "विश्लेषण...",
    checkingDatabase: "डेटाबेस जाँच...",
    verifiedAuthentic: "प्रमाणित",
    medicationInfo: "दवा जानकारी",
    dosageInfo: "खुराक",
    uses: "उपयोग",
    manufacturer: "निर्माता",
    dosageAmount: "मात्रा",
    frequency: "आवृत्ति",
    speakInfo: "सुनें",
    uploadArea: {
      click: "अपलोड करें",
      accepts: "वैकल्पिक",
    },
  },
  zh: {
    subtitle: "AI 即时药物验证",
    tabletName: "药片名称",
    tabletPlaceholder: "如：扑热息痛",
    language: "语言",
    verifyButton: "验证",
    verifying: "验证中...",
    analyzingTablet: "分析中...",
    checkingDatabase: "查询数据库...",
    verifiedAuthentic: "已验证",
    medicationInfo: "药物信息",
    dosageInfo: "剂量信息",
    uses: "用途",
    manufacturer: "生产商",
    dosageAmount: "剂量",
    frequency: "频率",
    speakInfo: "朗读",
    uploadArea: {
      click: "上传图片",
      accepts: "可选",
    },
  },
};

const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  hi: "हिन्दी",
  zh: "中文",
};

/* -------------------- MOCK MED DATA -------------------- */
const getMedicationData = (_: string, __: Language) => ({
  uses: "Fever, Mild to moderate pain",
  manufacturer: "GSK Pharmaceuticals",
  dosageAmount: "500–1000mg",
  frequency: "Every 4–6 hours as needed",
});

/* -------------------- TEXT TO SPEECH -------------------- */
function useTextToSpeech() {
  const speak = (text: string, lang: Language) => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang =
      lang === "hi" ? "hi-IN" : lang === "zh" ? "zh-CN" : `${lang}-${lang.toUpperCase()}`;
    speechSynthesis.speak(u);
  };
  const stop = () => speechSynthesis.cancel();
  return { speak, stop };
}

/* -------------------- UPLOAD ZONE -------------------- */
function UploadZone({
  t,
  onImageUpload,
}: {
  t: Translation;
  onImageUpload: (f: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File | null) => {
    if (!file) {
      setPreview(null);
      onImageUpload(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    onImageUpload(file);
  };

  return (
    <label className="flex flex-col items-center justify-center h-[200px] rounded-xl border-2 border-dashed border-border bg-secondary/40 hover:bg-primary/5 transition cursor-pointer">
      <input type="file" hidden accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
      {preview ? (
        <img src={preview} className="max-h-32 rounded-lg" />
      ) : (
        <>
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 mb-3">
            <Upload className="text-primary" />
          </div>
          <p className="font-medium">{t.uploadArea.click}</p>
          <p className="text-xs text-muted-foreground">{t.uploadArea.accepts}</p>
        </>
      )}
    </label>
  );
}

/* -------------------- PAGE -------------------- */
export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [state, setState] = useState<VerificationState>("idle");
  const { speak, stop } = useTextToSpeech();

  const t = translations[language];
  const data = getMedicationData(tabletName, language);

  const verify = async () => {
    stop();
    setState("analyzing");
    await new Promise((r) => setTimeout(r, 1200));
    setState("checking");
    await new Promise((r) => setTimeout(r, 1200));
    setState("verified");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <main className="container py-16 space-y-12">
        {/* HEADER */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI-Powered Verification
          </span>
          <h1 className="text-4xl md:text-5xl font-bold">Tablet Checker</h1>
          <p className="max-w-2xl mx-auto text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* CARD */}
        {state === "idle" && (
          <div className="max-w-4xl mx-auto glass-card p-8 grid md:grid-cols-2 gap-6">
            <UploadZone t={t} onImageUpload={() => {}} />

            <div className="space-y-4">
              <Label>{t.tabletName}</Label>
              <Input value={tabletName} onChange={(e) => setTabletName(e.target.value)} placeholder={t.tabletPlaceholder} />

              <Label>{t.language}</Label>
              <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(languageNames).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="btn-gradient h-12 mt-2" disabled={!tabletName} onClick={verify}>
                {t.verifyButton}
              </Button>
            </div>
          </div>
        )}

        {(state === "analyzing" || state === "checking") && (
          <div className="glass-card p-8 flex justify-center gap-4">
            <Loader2 className="animate-spin text-primary" />
            <span>{state === "analyzing" ? t.analyzingTablet : t.checkingDatabase}</span>
          </div>
        )}

        {state === "verified" && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white flex gap-3 justify-center">
              <CheckCircle2 /> {t.verifiedAuthentic}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="info-card">
                <h3>{t.medicationInfo}</h3>
                <p>{data.uses}</p>
                <Button variant="ghost" onClick={() => speak(data.uses, language)}>
                  <Volume2 />
                </Button>
              </div>

              <div className="info-card">
                <h3>{t.dosageInfo}</h3>
                <p>{data.dosageAmount}</p>
                <Button variant="ghost" onClick={() => speak(data.dosageAmount, language)}>
                  <Volume2 />
                </Button>
              </div>
            </div>

            <div className="text-center">
              <Button className="btn-gradient px-8" onClick={() => setState("idle")}>
                Check Another Tablet
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
