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
import { Upload, Image as ImageIcon, Loader2, CheckCircle2, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type Language = "en" | "es" | "fr" | "de" | "hi" | "zh";

interface Translation {
  subtitle: string;
  uploadArea: { click: string; accepts: string };
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
}

// Translations
const translations: Record<Language, Translation> = {
  en: {
    subtitle: "Instant AI-based medicine authenticity check",
    uploadArea: { click: "Click to upload", accepts: "Tablet image (optional)" },
    tabletName: "Tablet Name",
    tabletPlaceholder: "e.g., Paracetamol",
    language: "Language",
    verifyButton: "Verify Tablet",
    verifying: "Verifying...",
    analyzingTablet: "Analyzing tablet...",
    checkingDatabase: "Checking medical database...",
    verifiedAuthentic: "Verified Authentic",
    medicationInfo: "Medication Info",
    dosageInfo: "Dosage Information",
    uses: "Uses",
    manufacturer: "Manufacturer",
    dosageAmount: "Dosage",
    frequency: "Frequency",
    speakInfo: "Listen",
  },
  es: {
    subtitle: "Verificación instantánea de autenticidad de medicamentos con IA",
    uploadArea: { click: "Haz clic para subir", accepts: "Imagen de tableta (opcional)" },
    tabletName: "Nombre de la Tableta",
    tabletPlaceholder: "ej., Paracetamol",
    language: "Idioma",
    verifyButton: "Verificar Tableta",
    verifying: "Verificando...",
    analyzingTablet: "Analizando tableta...",
    checkingDatabase: "Consultando base de datos médica...",
    verifiedAuthentic: "Autenticidad Verificada",
    medicationInfo: "Información del Medicamento",
    dosageInfo: "Información de Dosificación",
    uses: "Usos",
    manufacturer: "Fabricante",
    dosageAmount: "Dosis",
    frequency: "Frecuencia",
    speakInfo: "Escuchar",
  },
  fr: {
    subtitle: "Vérification instantanée de l'authenticité des médicaments par IA",
    uploadArea: { click: "Cliquez pour télécharger", accepts: "Image de comprimé (facultatif)" },
    tabletName: "Nom du Comprimé",
    tabletPlaceholder: "ex., Paracétamol",
    language: "Langue",
    verifyButton: "Vérifier le Comprimé",
    verifying: "Vérification...",
    analyzingTablet: "Analyse du comprimé...",
    checkingDatabase: "Consultation de la base médicale...",
    verifiedAuthentic: "Authenticité Vérifiée",
    medicationInfo: "Info Médicament",
    dosageInfo: "Information Posologique",
    uses: "Utilisations",
    manufacturer: "Fabricant",
    dosageAmount: "Dosage",
    frequency: "Fréquence",
    speakInfo: "Écouter",
  },
  de: {
    subtitle: "Sofortige KI-basierte Echtheitsprüfung von Medikamenten",
    uploadArea: { click: "Zum Hochladen klicken", accepts: "Tablettenbild (optional)" },
    tabletName: "Tablettenname",
    tabletPlaceholder: "z.B., Paracetamol",
    language: "Sprache",
    verifyButton: "Tablette Verifizieren",
    verifying: "Verifizierung...",
    analyzingTablet: "Tablette wird analysiert...",
    checkingDatabase: "Medizinische Datenbank wird überprüft...",
    verifiedAuthentic: "Echtheit Verifiziert",
    medicationInfo: "Medikamenteninfo",
    dosageInfo: "Dosierungsinformation",
    uses: "Anwendung",
    manufacturer: "Hersteller",
    dosageAmount: "Dosierung",
    frequency: "Häufigkeit",
    speakInfo: "Anhören",
  },
  hi: {
    subtitle: "एआई-आधारित त्वरित दवा प्रामाणिकता जांच",
    uploadArea: { click: "अपलोड करने के लिए क्लिक करें", accepts: "टैबलेट छवि (वैकल्पिक)" },
    tabletName: "टैबलेट का नाम",
    tabletPlaceholder: "जैसे, पैरासिटामोल",
    language: "भाषा",
    verifyButton: "टैबलेट सत्यापित करें",
    verifying: "सत्यापन हो रहा है...",
    analyzingTablet: "टैबलेट का विश्लेषण हो रहा है...",
    checkingDatabase: "चिकित्सा डेटाबेस की जांच हो रही है...",
    verifiedAuthentic: "प्रामाणिकता सत्यापित",
    medicationInfo: "दवा की जानकारी",
    dosageInfo: "खुराक की जानकारी",
    uses: "उपयोग",
    manufacturer: "निर्माता",
    dosageAmount: "खुराक",
    frequency: "आवृत्ति",
    speakInfo: "सुनें",
  },
  zh: {
    subtitle: "基于AI的即时药物真伪验证",
    uploadArea: { click: "点击上传", accepts: "药片图像（可选）" },
    tabletName: "药片名称",
    tabletPlaceholder: "例如：扑热息痛",
    language: "语言",
    verifyButton: "验证药片",
    verifying: "验证中...",
    analyzingTablet: "正在分析药片...",
    checkingDatabase: "正在查询医疗数据库...",
    verifiedAuthentic: "已验证正品",
    medicationInfo: "药物信息",
    dosageInfo: "剂量信息",
    uses: "用途",
    manufacturer: "生产厂家",
    dosageAmount: "剂量",
    frequency: "频率",
    speakInfo: "朗读",
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

// Text-to-Speech hook
function useTextToSpeech() {
  const getVoiceForLanguage = useCallback((lang: Language): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    const langPrefixes: Record<Language, string[]> = {
      en: ["en-US", "en-GB", "en"],
      es: ["es-ES", "es-MX", "es"],
      fr: ["fr-FR", "fr"],
      de: ["de-DE", "de"],
      hi: ["hi-IN", "hi"],
      zh: ["zh-CN", "zh-TW", "zh"],
    };

    const prefixes = langPrefixes[lang];
    for (const prefix of prefixes) {
      const voice = voices.find((v) => v.lang.startsWith(prefix));
      if (voice) return voice;
    }
    return voices[0] || null;
  }, []);

  const speak = useCallback((text: string, language: Language) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getVoiceForLanguage(language);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }, [getVoiceForLanguage]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return { speak, stop };
}

type VerificationState = "idle" | "analyzing" | "checking" | "verified";

// Mock medication data
const getMedicationData = (tabletName: string, language: Language) => {
  const data = {
    en: {
      uses: "Fever, Mild to moderate pain",
      manufacturer: "GSK Pharmaceuticals",
      dosageAmount: "500–1000mg",
      frequency: "Every 4–6 hours as needed",
    },
    es: {
      uses: "Fiebre, Dolor leve a moderado",
      manufacturer: "GSK Pharmaceuticals",
      dosageAmount: "500–1000mg",
      frequency: "Cada 4–6 horas según sea necesario",
    },
    fr: {
      uses: "Fièvre, Douleur légère à modérée",
      manufacturer: "GSK Pharmaceuticals",
      dosageAmount: "500–1000mg",
      frequency: "Toutes les 4–6 heures selon besoin",
    },
    de: {
      uses: "Fieber, Leichte bis mäßige Schmerzen",
      manufacturer: "GSK Pharmaceuticals",
      dosageAmount: "500–1000mg",
      frequency: "Alle 4–6 Stunden nach Bedarf",
    },
    hi: {
      uses: "बुखार, हल्का से मध्यम दर्द",
      manufacturer: "जीएसके फार्मास्यूटिकल्स",
      dosageAmount: "500–1000 मिलीग्राम",
      frequency: "हर 4–6 घंटे आवश्यकतानुसार",
    },
    zh: {
      uses: "发烧、轻度至中度疼痛",
      manufacturer: "葛兰素史克制药",
      dosageAmount: "500–1000毫克",
      frequency: "每4–6小时根据需要服用",
    },
  };

  return data[language];
};

// Upload Zone Component
function UploadZone({ t, disabled, onImageUpload }: { t: Translation; disabled?: boolean; onImageUpload: (file: File | null) => void }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | null) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
      onImageUpload(file);
    },
    [onImageUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleFile(file);
      }
    },
    [disabled, handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      handleFile(file);
    },
    [handleFile]
  );

  return (
    <label
      className={cn(
        "upload-zone flex flex-col items-center justify-center p-6 min-h-[180px]",
        disabled && "opacity-50 cursor-not-allowed",
        isDragging && "border-primary bg-primary/10"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
        disabled={disabled}
      />
      
      {preview ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={preview}
            alt="Tablet preview"
            className="max-h-32 max-w-full rounded-lg object-contain"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleFile(null);
            }}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold hover:bg-destructive/90 transition-colors"
          >
            ×
          </button>
        </div>
      ) : (
        <>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            {isDragging ? (
              <ImageIcon className="h-6 w-6 text-primary" />
            ) : (
              <Upload className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <p className="text-sm font-medium text-foreground">{t.uploadArea.click}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t.uploadArea.accepts}</p>
        </>
      )}
    </label>
  );
}

// Verification Card Component
function VerificationCard({
  t,
  tabletName,
  language,
  isVerifying,
  onTabletNameChange,
  onLanguageChange,
  onImageUpload,
  onVerify,
}: {
  t: Translation;
  tabletName: string;
  language: Language;
  isVerifying: boolean;
  onTabletNameChange: (name: string) => void;
  onLanguageChange: (lang: Language) => void;
  onImageUpload: (file: File | null) => void;
  onVerify: () => void;
}) {
  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in-up">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <UploadZone t={t} disabled={isVerifying} onImageUpload={onImageUpload} />
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="tablet-name" className="text-sm font-medium">
              {t.tabletName}
            </Label>
            <Input
              id="tablet-name"
              placeholder={t.tabletPlaceholder}
              value={tabletName}
              onChange={(e) => onTabletNameChange(e.target.value)}
              disabled={isVerifying}
              className="h-11 bg-secondary/50 border-border focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language" className="text-sm font-medium">
              {t.language}
            </Label>
            <Select
              value={language}
              onValueChange={(value) => onLanguageChange(value as Language)}
              disabled={isVerifying}
            >
              <SelectTrigger className="h-11 bg-secondary/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {Object.entries(languageNames).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={onVerify}
            disabled={isVerifying || !tabletName.trim()}
            className={cn(
              "btn-gradient w-full h-12 text-base",
              (!tabletName.trim() || isVerifying) && "opacity-60 cursor-not-allowed"
            )}
          >
            {isVerifying ? t.verifying : t.verifyButton}
          </button>
        </div>
      </div>
    </div>
  );
}

// Verification Status Component
function VerificationStatus({ t, status }: { t: Translation; status: "analyzing" | "checking" }) {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-center gap-4">
        <div className="relative">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="absolute inset-0 h-8 w-8 animate-ping opacity-20 rounded-full bg-primary" />
        </div>
        <div className="text-center">
          <p className="font-medium text-foreground">
            {status === "analyzing" ? t.analyzingTablet : t.checkingDatabase}
          </p>
          <div className="mt-2 flex gap-1.5 justify-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full bg-primary/60 animate-pulse-subtle"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Verified Banner Component
function VerifiedBanner({ t }: { t: Translation }) {
  return (
    <div className="success-banner p-5 animate-scale-in flex items-center justify-center gap-3">
      <CheckCircle2 className="h-7 w-7 text-white" />
      <span className="text-lg font-semibold text-white">
        {t.verifiedAuthentic}
      </span>
    </div>
  );
}

// Info Card Component
function InfoCard({
  title,
  items,
  onSpeak,
  speakLabel,
  className,
}: {
  title: string;
  items: { label: string; value: string }[];
  onSpeak: () => void;
  speakLabel: string;
  className?: string;
}) {
  return (
    <div className={cn("info-card animate-fade-in-up", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSpeak}
          className="h-9 gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
          title={speakLabel}
        >
          <Volume2 className="h-4 w-4" />
          <span className="hidden sm:inline text-xs">{speakLabel}</span>
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {item.label}
            </span>
            <span className="text-sm text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [, setUploadedImage] = useState<File | null>(null);
  const [verificationState, setVerificationState] = useState<VerificationState>("idle");
  
  const { speak, stop } = useTextToSpeech();
  const t = translations[language];
  const medicationData = getMedicationData(tabletName, language);

  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleVerify = useCallback(async () => {
    if (!tabletName.trim()) return;
    
    stop();
    setVerificationState("analyzing");
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setVerificationState("checking");
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setVerificationState("verified");
  }, [tabletName, stop]);

  const handleReset = useCallback(() => {
    setVerificationState("idle");
    setTabletName("");
    setUploadedImage(null);
    stop();
  }, [stop]);

  const speakMedicationInfo = useCallback(() => {
    const text = `${t.medicationInfo}. ${t.uses}: ${medicationData.uses}. ${t.manufacturer}: ${medicationData.manufacturer}`;
    speak(text, language);
  }, [t, medicationData, speak, language]);

  const speakDosageInfo = useCallback(() => {
    const text = `${t.dosageInfo}. ${t.dosageAmount}: ${medicationData.dosageAmount}. ${t.frequency}: ${medicationData.frequency}`;
    speak(text, language);
  }, [t, medicationData, speak, language]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 md:py-12 space-y-8">
        <p className="text-center text-muted-foreground text-sm md:text-base animate-fade-in">
          {t.subtitle}
        </p>

        {verificationState === "idle" && (
          <VerificationCard
            t={t}
            tabletName={tabletName}
            language={language}
            isVerifying={false}
            onTabletNameChange={setTabletName}
            onLanguageChange={setLanguage}
            onImageUpload={setUploadedImage}
            onVerify={handleVerify}
          />
        )}

        {(verificationState === "analyzing" || verificationState === "checking") && (
          <VerificationStatus t={t} status={verificationState} />
        )}

        {verificationState === "verified" && (
          <div className="space-y-6 stagger-children">
            <VerifiedBanner t={t} />

            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard
                title={t.medicationInfo}
                items={[
                  { label: t.uses, value: medicationData.uses },
                  { label: t.manufacturer, value: medicationData.manufacturer },
                ]}
                onSpeak={speakMedicationInfo}
                speakLabel={t.speakInfo}
              />
              <InfoCard
                title={t.dosageInfo}
                items={[
                  { label: t.dosageAmount, value: medicationData.dosageAmount },
                  { label: t.frequency, value: medicationData.frequency },
                ]}
                onSpeak={speakDosageInfo}
                speakLabel={t.speakInfo}
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="btn-gradient px-8 py-3 text-sm"
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
