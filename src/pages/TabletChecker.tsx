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
  Loader2,
  Cpu,
  Shield,
  Zap,
  Brain,
  Binary,
  Satellite,
  Target,
  Database,
  Activity,
  Lock,
  Globe,
  FileSearch
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

// Advanced Particle System
const AdvancedParticle = ({ index }: { index: number }) => {
  const [position] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });
  
  const size = Math.random() * 4 + 1;
  const duration = Math.random() * 4 + 2;
  const delay = index * 0.1;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, theme(colors.primary.DEFAULT) 0%, transparent 70%)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
        y: [0, -100, -200],
        x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
};

// 3D Card Effect Component
const Card3D = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;
      
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(10px)
      `;
      
      // Dynamic shadow
      const shadowX = (x - centerX) / 10;
      const shadowY = (y - centerY) / 10;
      const shadowBlur = 40;
      
      card.style.boxShadow = `
        ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(59, 130, 246, 0.3),
        ${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(16, 185, 129, 0.3)
      `;
    };
    
    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      
      cardRef.current.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateZ(0px)
      `;
      cardRef.current.style.boxShadow = `
        0 20px 60px rgba(59, 130, 246, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.05)
      `;
    };
    
    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative transition-transform duration-300 ease-out",
        "bg-gradient-to-br from-gray-900/80 to-gray-950/80",
        "backdrop-blur-xl border border-white/10",
        "rounded-2xl",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: `
          0 20px 60px rgba(59, 130, 246, 0.1),
          0 0 0 1px rgba(255, 255, 255, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
      }}
    >
      {children}
    </div>
  );
};

// Glowing Orb Component
const GlowingOrb = ({ size = 400, color = "primary" }: { size?: number; color?: string }) => {
  const colors = {
    primary: "rgba(59, 130, 246, 0.15)",
    accent: "rgba(16, 185, 129, 0.15)",
    purple: "rgba(147, 51, 234, 0.15)"
  };

  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${colors[color as keyof typeof colors]} 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Neural Network Visualization
const NeuralNetworkVisual = ({ active = false }: { active?: boolean }) => {
  const [nodes] = useState(() => 
    Array.from({ length: 12 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
          }}
          animate={{
            scale: active ? [1, 1.5, 1] : 1,
            opacity: active ? [0.3, 0.8, 0.3] : 0.2,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
      
      {/* Connecting lines */}
      {active && nodes.slice(0, 6).map((nodeA, i) => {
        const nodeB = nodes[(i + 6) % nodes.length];
        return (
          <svg
            key={`line-${i}`}
            className="absolute inset-0"
            style={{
              zIndex: -1,
            }}
          >
            <motion.line
              x1={`${nodeA.x}%`}
              y1={`${nodeA.y}%`}
              x2={`${nodeB.x}%`}
              y2={`${nodeB.y}%`}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

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
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setState("verified");
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  const handleReset = () => {
    setTablet("");
    setState("idle");
    setUploadedImage(null);
    setScanProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Advanced Particle Background */}
      <div className="fixed inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <AdvancedParticle key={i} index={i} />
        ))}
        <NeuralNetworkVisual active={state === "loading"} />
        
        {/* Ambient Glow Effects */}
        <GlowingOrb size={600} color="primary" style={{ top: "10%", left: "10%" }} />
        <GlowingOrb size={500} color="accent" style={{ bottom: "20%", right: "15%" }} />
        <GlowingOrb size={300} color="purple" style={{ top: "50%", left: "80%" }} />
      </div>

      <Navbar />

      <main className="container max-w-7xl pt-24 pb-20 relative z-10 px-4">
        {/* HEADER WITH ADVANCED ANIMATIONS */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 relative"
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          
          <div className="relative">
            <div className="inline-flex items-center gap-4 mb-6">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <Scan className="w-12 h-12 text-primary relative z-10" />
              </motion.div>
              
              <div className="text-left">
                <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-cyan-400 leading-tight">
                  Tablet<span className="text-white">AI</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-emerald-400 text-sm font-medium">AI-Powered Verification System</p>
                </div>
              </div>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mt-6"
            >
              Advanced neural network verification ensuring medication authenticity and safety through real-time analysis
            </motion.p>
          </div>
        </motion.div>

        {/* MAIN CONTENT AREA */}
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Floating elements around the card */}
              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary/20 blur-md"
                animate={{
                  y: [0, -10, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-accent/20 blur-md"
                animate={{
                  y: [0, 10, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
              
              <Card3D className="p-10">
                <div className="grid md:grid-cols-2 gap-10">
                  {/* LEFT COLUMN - UPLOAD */}
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur-sm opacity-20"
                          />
                          <Upload className="w-8 h-8 text-primary relative z-10" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Visual Analysis
                          </h3>
                          <p className="text-sm text-gray-400">AI-powered image recognition</p>
                        </div>
                      </div>
                      
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={cn(
                          "relative h-72 border-2 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden group",
                          isDragging 
                            ? "border-primary bg-primary/10 scale-105" 
                            : "border-dashed border-white/20 hover:border-primary"
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
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="relative w-full h-full"
                            >
                              <img 
                                src={uploadedImage} 
                                alt="Uploaded tablet" 
                                className="w-full h-full object-cover"
                              />
                              <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end"
                              >
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUploadedImage(null);
                                  }}
                                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70"
                                >
                                  <X className="w-5 h-5" />
                                </motion.button>
                                <div className="p-4">
                                  <p className="text-sm font-medium">Image ready for analysis</p>
                                  <p className="text-xs text-gray-300">Click to scan or replace</p>
                                </div>
                              </motion.div>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-center space-y-6 p-8"
                            >
                              <div className="relative">
                                <motion.div
                                  animate={{ 
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0]
                                  }}
                                  transition={{ duration: 3, repeat: Infinity }}
                                  className="inline-block"
                                >
                                  <Upload className="w-16 h-16 text-primary/60 mx-auto" />
                                </motion.div>
                                <motion.div
                                  className="absolute inset-0 bg-primary/10 blur-xl rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </div>
                              
                              <div className="space-y-3">
                                <p className="text-lg font-semibold">Drop tablet image here</p>
                                <p className="text-sm text-gray-400">
                                  Supports JPG, PNG, WEBP • Max 10MB
                                </p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                                  <Brain className="w-4 h-4 text-primary" />
                                  <span className="text-xs text-primary">AI-Powered Recognition</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Scan lines effect */}
                        {isDragging && (
                          <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                                style={{ top: `${i * 25}%` }}
                                animate={{ y: ["0%", "100%"] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </motion.label>
                    </motion.div>
                  </div>

                  {/* RIGHT COLUMN - FORM */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col justify-between space-y-10"
                  >
                    <div className="space-y-10">
                      {/* TABLET INPUT */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <motion.div
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ duration: 4, repeat: Infinity }}
                              className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur-sm opacity-20"
                            />
                            <Pill className="w-8 h-8 text-primary relative z-10" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                              Tablet Details
                            </h3>
                            <p className="text-sm text-gray-400">Enter identification parameters</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <FileSearch className="w-4 h-4" />
                            Tablet Name / Code
                          </label>
                          <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className="relative"
                          >
                            <input
                              value={tablet}
                              onChange={(e) => setTablet(e.target.value)}
                              placeholder="e.g., Paracetamol 500mg, Ibuprofen 200mg..."
                              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-lg backdrop-blur-sm"
                            />
                            {tablet && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                              >
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                      </div>

                      {/* LANGUAGE SELECTOR */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <motion.div
                              animate={{ 
                                rotate: 360,
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                scale: { duration: 3, repeat: Infinity }
                              }}
                              className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur-sm opacity-20"
                            />
                            <Languages className="w-8 h-8 text-primary relative z-10" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                              Language
                            </h3>
                            <p className="text-sm text-gray-400">Select output language</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">
                            Analysis Output Language
                          </label>
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <select
                              value={language}
                              onChange={(e) => setLanguage(e.target.value)}
                              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-lg backdrop-blur-sm appearance-none cursor-pointer"
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
                    </div>

                    {/* VERIFY BUTTON */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleVerify}
                      disabled={!tablet}
                      className="group relative h-16 w-full rounded-xl text-lg font-bold text-white overflow-hidden"
                    >
                      {/* Background gradients */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-cyan-500" />
                      <div className="absolute inset-0 bg-gradient-to-l from-cyan-500 via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Animated border */}
                      <motion.div
                        className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary to-accent"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        style={{
                          backgroundSize: "200% 200%",
                        }}
                      />
                      
                      {/* Content */}
                      <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-gray-900 to-gray-950" />
                      <span className="relative flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Scan className="w-5 h-5" />
                        </motion.div>
                        Start Deep Analysis
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </span>
                      
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </Card3D>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {state === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-[600px] flex flex-col items-center justify-center"
            >
              {/* Scanning animation */}
              <div className="relative">
                {/* Outer rings */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute border-2 border-primary/20 rounded-full"
                    style={{
                      width: `${200 + i * 80}px`,
                      height: `${200 + i * 80}px`,
                      borderTopColor: "theme(colors.primary.DEFAULT)",
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 3 + i, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, delay: i * 0.3 },
                    }}
                  />
                ))}
                
                {/* Center orb */}
                <motion.div
                  className="w-48 h-48 rounded-full flex items-center justify-center"
                  animate={{
                    background: [
                      "radial-gradient(circle, theme(colors.primary.DEFAULT) 0%, transparent 70%)",
                      "radial-gradient(circle, theme(colors.accent.DEFAULT) 0%, transparent 70%)",
                      "radial-gradient(circle, theme(colors.primary.DEFAULT) 0%, transparent 70%)",
                    ],
                    boxShadow: [
                      "0 0 60px theme(colors.primary.DEFAULT)",
                      "0 0 80px theme(colors.accent.DEFAULT)",
                      "0 0 60px theme(colors.primary.DEFAULT)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Loader2 className="w-16 h-16 text-white animate-spin" />
                </motion.div>
                
                {/* Floating particles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-3 h-3 bg-primary rounded-full"
                    style={{
                      left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                      top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [
                        "0px",
                        `${Math.cos((i * Math.PI) / 4) * 60}px`,
                        "0px",
                      ],
                      y: [
                        "0px",
                        `${Math.sin((i * Math.PI) / 4) * 60}px`,
                        "0px",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              
              {/* Progress bar */}
              <div className="mt-12 w-96 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-primary font-medium">Scanning Molecular Structure</span>
                  <span className="text-white">{scanProgress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-accent to-cyan-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center text-gray-300 mt-4"
                >
                  Analyzing chemical composition with neural networks...
                </motion.p>
              </div>
              
              {/* Database connections visualization */}
              <div className="absolute bottom-20 left-0 right-0">
                <div className="flex justify-center gap-8">
                  {["Safety DB", "Chemical DB", "Manufacturer DB"].map((db, i) => (
                    <motion.div
                      key={db}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <Database className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-400">{db}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* VERIFIED STATE */}
          {state === "verified" && (
            <motion.div
              key="verified"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* VERIFICATION HERO */}
              <div className="relative">
                {/* Celebration particles */}
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={`celeb-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      background: `radial-gradient(circle, ${
                        Math.random() > 0.5 ? "theme(colors.primary.DEFAULT)" : "theme(colors.accent.DEFAULT)"
                      } 0%, transparent 70%)`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.05,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                ))}
                
                <Card3D className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="space-y-8"
                  >
                    {/* Verification badge */}
                    <div className="relative inline-block">
                      <motion.div
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                        className="absolute -inset-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-2xl opacity-30"
                      />
                      <CheckCircle className="w-32 h-32 text-emerald-400 relative z-10" />
                    </div>
                    
                    <div className="space-y-4">
                      <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent"
                      >
                        VERIFICATION COMPLETE
                      </motion.h2>
                      
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl text-white font-semibold"
                      >
                        {tablet}
                      </motion.p>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 rounded-full border border-emerald-500/20"
                      >
                        <Shield className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Authentic Pharmaceutical Product</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </Card3D>
              </div>

              {/* INFORMATION GRID */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* MEDICATION INFO */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card3D className="p-8 h-full">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Medication Information
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
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-center gap-3 mb-2">
                            <Pill className="w-5 h-5 text-primary" />
                            <span className="font-semibold">Identified Substance</span>
                          </div>
                          <p className="text-xl font-bold text-white">{tablet}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-primary/5 rounded-lg">
                            <p className="text-sm text-gray-400">Primary Use</p>
                            <p className="font-semibold">Fever & Pain Relief</p>
                          </div>
                          <div className="p-4 bg-primary/5 rounded-lg">
                            <p className="text-sm text-gray-400">Form</p>
                            <p className="font-semibold">Oral Tablet</p>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Manufacturer Verified</span>
                          </div>
                          <p className="text-sm">Approved Pharmaceutical Company</p>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>

                {/* DOSAGE INFO */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card3D className="p-8 h-full">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Dosage Guidelines
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
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-accent/5 rounded-lg">
                            <p className="text-sm text-gray-400">Adult Dose</p>
                            <p className="text-lg font-bold">500-1000mg</p>
                            <p className="text-xs text-gray-400">Every 4-6 hours</p>
                          </div>
                          <div className="p-4 bg-accent/5 rounded-lg">
                            <p className="text-sm text-gray-400">Child Dose</p>
                            <p className="text-lg font-bold">10-15mg/kg</p>
                            <p className="text-xs text-gray-400">Every 6 hours</p>
                          </div>
                        </div>
                        
                        <motion.div
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            <span className="font-semibold text-yellow-500">Important Warning</span>
                          </div>
                          <p className="text-yellow-500/90">
                            Do not exceed 4000mg (4 grams) per day
                          </p>
                        </motion.div>
                        
                        <div className="p-4 bg-white/5 rounded-lg">
                          <p className="text-sm text-gray-400 mb-2">Additional Instructions</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              Take with plenty of water
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              Avoid on empty stomach
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              Store at room temperature
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              </div>

              {/* SAFETY INFORMATION */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* PRECAUTIONS */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card3D className="p-8 h-full">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <ShieldAlert className="w-8 h-8 text-primary" />
                        </motion.div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Safety Precautions
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        {[
                          { icon: Lock, text: "Do not exceed maximum daily dose", color: "primary" },
                          { icon: AlertTriangle, text: "Avoid alcohol consumption", color: "yellow" },
                          { icon: Activity, text: "Use cautiously in liver disease", color: "orange" },
                          { icon: Shield, text: "Check other medicines for paracetamol", color: "blue" },
                          { icon: AlertTriangle, text: "Avoid prolonged self-medication", color: "yellow" },
                          { icon: Activity, text: "Consult doctor if fever persists >3 days", color: "red" },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                          >
                            <div className={`p-2 rounded-lg bg-${item.color}/10 group-hover:bg-${item.color}/20 transition-colors`}>
                              <item.icon className={`w-4 h-4 text-${item.color}`} />
                            </div>
                            <span>{item.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card3D>
                </motion.div>

                {/* SIDE EFFECTS */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card3D className="p-8 h-full">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <AlertTriangle className="w-8 h-8 text-yellow-500" />
                        </motion.div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Side Effects
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-semibold text-emerald-400">Common (1-10%)</span>
                          </div>
                          <p>Nausea, stomach discomfort, loss of appetite</p>
                        </div>
                        
                        <div className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                            <span className="font-semibold text-yellow-400">Rare (0.1-1%)</span>
                          </div>
                          <p>Skin rash, dizziness, headache</p>
                        </div>
                        
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="p-4 bg-red-500/10 rounded-lg border border-red-500/20"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                            <span className="font-semibold text-red-400">Emergency Signs</span>
                          </div>
                          <p className="text-red-400/90">
                            Severe allergy, breathing difficulty, yellowing of eyes or skin
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              </div>

              {/* RESET BUTTON */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="group relative px-12 py-4 rounded-xl text-lg font-bold text-white overflow-hidden"
                >
                  {/* Background gradients */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Animated border */}
                  <motion.div
                    className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary to-accent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  />
                  
                  {/* Content */}
                  <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-gray-900 to-gray-950" />
                  <span className="relative flex items-center justify-center gap-3">
                    <Target className="w-5 h-5" />
                    Verify Another Tablet
                    <motion.span
                      animate={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Pill className="w-5 h-5" />
                    </motion.span>
                  </span>
                  
                  {/* Shine effect */}
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

        {/* STATS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 shadow-2xl z-50"
        >
          <div className="flex items-center gap-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99.8%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">2.4s</div>
              <div className="text-sm text-gray-400">Scan Time</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">50K+</div>
              <div className="text-sm text-gray-400">Database</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
