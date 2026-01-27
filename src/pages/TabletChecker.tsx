import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Upload,
  Pill,
  Languages,
  AlertTriangle,
  ShieldAlert,
  Volume2,
  CheckCircle,
  Scan,
  X,
  Sparkles,
  ChevronRight,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "verified";

const speechText: Record<
  string,
  { medicine: string; dosage: string }
> = {
  English: {
    medicine: "This medicine is used for fever, headache and mild to moderate pain. Manufactured by reputed pharmaceutical companies.",
    dosage: "Adults may take 500 to 1000 milligrams every four to six hours. Children require weight based dosing. Do not exceed four thousand milligrams per day.",
  },
  Hindi: {
    medicine: "यह दवा बुखार, सिरदर्द और हल्के से मध्यम दर्द के लिए उपयोग की जाती है।",
    dosage: "वयस्क 500 से 1000 मिलीग्राम हर चार से छह घंटे में ले सकते हैं। दिन में 4000 मिलीग्राम से अधिक न लें।",
  },
  Spanish: {
    medicine: "Este medicamento se utiliza para la fiebre y el dolor leve a moderado.",
    dosage: "Los adultos pueden tomar de 500 a 1000 miligramos cada cuatro a seis horas.",
  },
  French: {
    medicine: "Ce médicament est utilisé pour la fièvre et les douleurs légères à modérées.",
    dosage: "Les adultes peuvent prendre 500 à 1000 milligrammes toutes les quatre à six heures.",
  },
  German: {
    medicine: "Dieses Medikament wird gegen Fieber und leichte bis mäßige Schmerzen verwendet.",
    dosage: "Erwachsene können alle vier bis sechs Stunden 500 bis 1000 Milligramm einnehmen.",
  },
  Chinese: {
    medicine: "该药物用于治疗发烧和轻度至中度疼痛。",
    dosage: "成人每四到六小时可服用500至1000毫克。",
  },
};

const FloatingParticle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setPosition({
      x: Math.random() * 100,
      y: Math.random() * 100
    });
  }, []);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary/20 rounded-full"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const getLangCode = () => {
    switch (language) {
      case "Hindi": return "hi-IN";
      case "Spanish": return "es-ES";
      case "French": return "fr-FR";
      case "German": return "de-DE";
      case "Chinese": return "zh-CN";
      default: return "en-US";
    }
  };

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = getLangCode();
    u.rate = 0.9;
    u.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = () => {
    setState("loading");
    setTimeout(() => {
      setState("verified");
    }, 1500);
  };

  const handleReset = () => {
    setTablet("");
    setState("idle");
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} />
        ))}
      </div>

      <Navbar />

      <main className="container max-w-7xl pt-24 pb-20 space-y-20 relative z-10">
        {/* HEADER WITH ANIMATION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Scan className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Tablet Verification
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            AI-powered medicine authentication with real-time safety analysis
          </p>
        </motion.div>

        {/* INPUT CARD */}
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl opacity-20" />
              <div className="relative glass-panel-strong p-10 backdrop-blur-xl">
                <div className="grid md:grid-cols-2 gap-10">
                  {/* UPLOAD SECTION */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Upload className="w-6 h-6 text-primary" />
                      </motion.div>
                      <span className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Upload Tablet Image
                      </span>
                    </div>
                    
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={cn(
                        "relative h-64 border-2 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300",
                        isDragging 
                          ? "border-primary bg-primary/10 scale-105" 
                          : "border-dashed border-primary/30 hover:border-primary"
                      )}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        onChange={handleFileSelect}
                        accept="image/*"
                      />
                      
                      <AnimatePresence mode="wait">
                        {uploadedImage ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative w-full h-full rounded-xl overflow-hidden group"
                          >
                            <img 
                              src={uploadedImage} 
                              alt="Uploaded tablet" 
                              className="w-full h-full object-cover"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setUploadedImage(null);
                              }}
                              className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center p-8 space-y-4"
                          >
                            <motion.div
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Upload className="w-12 h-12 text-primary/60 mx-auto" />
                            </motion.div>
                            <div className="space-y-2">
                              <p className="font-semibold">Drop or click to upload</p>
                              <p className="text-sm text-muted-foreground">
                                Supports PNG, JPG, WEBP up to 10MB
                              </p>
                              <p className="text-xs text-primary">
                                Optional – improves AI accuracy
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.label>
                  </div>

                  {/* FORM SECTION */}
                  <div className="flex flex-col justify-between space-y-8">
                    <div className="space-y-8">
                      {/* TABLET INPUT */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <Pill className="w-6 h-6 text-primary" />
                          </motion.div>
                          <span className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Tablet Imprint / Name
                          </span>
                        </div>
                        <motion.div whileHover={{ scale: 1.01 }}>
                          <input
                            value={tablet}
                            onChange={(e) => setTablet(e.target.value)}
                            placeholder="e.g., Dolo 650 / Paracetamol"
                            className="h-14 w-full rounded-xl border-2 border-input bg-background/50 backdrop-blur-sm px-6 text-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                          />
                        </motion.div>
                      </div>

                      {/* LANGUAGE SELECTOR */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Languages className="w-6 h-6 text-primary" />
                          <span className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Select Language
                          </span>
                        </div>
                        <motion.div whileHover={{ scale: 1.01 }}>
                          <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="h-14 w-full rounded-xl border-2 border-input bg-background/50 backdrop-blur-sm px-6 text-lg focus:border-primary focus:ring-4 focus:ring-primary/20 appearance-none cursor-pointer"
                          >
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Chinese</option>
                          </select>
                        </motion.div>
                      </div>
                    </div>

                    {/* VERIFY BUTTON */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleVerify}
                      disabled={!tablet}
                      className="group relative h-16 w-full rounded-xl text-lg font-semibold text-white overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative flex items-center justify-center gap-3">
                        Verify Tablet
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {state === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-96 flex flex-col items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-4 border-primary/20 rounded-full"
                >
                  <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                </motion.div>
              </div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-8 text-xl font-semibold text-primary"
              >
                Analyzing tablet information...
              </motion.p>
            </motion.div>
          )}

          {/* VERIFIED STATE */}
          {state === "verified" && (
            <motion.div
              key="verified"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20"
            >
              {/* HOLOGRAPHIC VERIFICATION */}
              <div className="relative flex justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="relative w-96 h-96"
                >
                  {/* Glowing rings */}
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-primary/20"
                  />
                  <motion.div
                    animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 rounded-full border border-accent/30"
                  />
                  
                  {/* Main orb */}
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 0 20px theme(colors.primary/30)",
                        "0 0 40px theme(colors.primary/50)",
                        "0 0 20px theme(colors.primary/30)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/10 via-accent/10 to-primary/20 backdrop-blur-xl flex items-center justify-center"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl" />
                    
                    {/* Verification content */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="relative text-center space-y-6"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <CheckCircle className="w-24 h-24 text-primary mx-auto" />
                      </motion.div>
                      <div className="space-y-2">
                        <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          VERIFIED
                        </h3>
                        <p className="text-muted-foreground">Authenticity confirmed</p>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Floating particles */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-accent rounded-full"
                      style={{
                        left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                        top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* INFO GRID */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* MEDICINE INFO */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-panel p-8 space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Medication Info
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => speak(speechText[language].medicine)}
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <Volume2 className="w-5 h-5 text-primary" />
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <p><strong>Name:</strong> {tablet}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <p><strong>Uses:</strong> Fever, headache, mild to moderate pain</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <p><strong>Manufacturer:</strong> Approved Pharmaceutical Company</p>
                    </div>
                  </div>
                </motion.div>

                {/* DOSAGE INFO */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-panel p-8 space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Dosage Information
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => speak(speechText[language].dosage)}
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <Volume2 className="w-5 h-5 text-primary" />
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <p><strong>Adults:</strong> 500–1000 mg every 4–6 hours</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <p><strong>Children:</strong> 10–15 mg/kg every 6 hours</p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-3 bg-yellow-500/10 p-4 rounded-lg"
                    >
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <p className="text-yellow-500 font-semibold">
                        Maximum 4000 mg per day
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* PRECAUTIONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-panel p-8 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <ShieldAlert className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Precautions
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Do not exceed maximum daily dose",
                    "Avoid alcohol consumption",
                    "Check other medicines for paracetamol",
                    "Use cautiously in liver disease",
                    "Avoid prolonged self-medication",
                    "Consult doctor if fever lasts more than 3 days",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        className="mt-1 h-2 w-2 rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* SIDE EFFECTS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-panel p-8 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <AlertTriangle className="w-7 h-7 text-yellow-500" />
                  </motion.div>
                  <h3 className="font-semibold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Possible Side Effects
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    <p><strong>Common:</strong> Nausea, stomach discomfort</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <p><strong>Rare:</strong> Skin rash, dizziness</p>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10"
                  >
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <p className="text-red-500 font-semibold">
                      <strong>Emergency:</strong> Severe allergy, breathing difficulty, yellowing of eyes or skin
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* RESET BUTTON */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="group relative px-12 py-4 rounded-xl text-lg font-semibold text-white overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-3">
                    Check Another Tablet
                    <motion.span
                      animate={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Pill className="w-5 h-5" />
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* AMBIENT GLOW */}
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
    </div>
  );
}
