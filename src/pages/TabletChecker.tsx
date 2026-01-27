import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Upload,
  Pill,
  Languages,
  AlertTriangle,
  Shield,
  Volume2,
  CheckCircle,
  Scan,
  X,
  Sparkles,
  ChevronRight,
  Loader2,
  Cpu,
  Zap,
  Brain,
  ShieldCheck,
  Database,
  FileSearch,
  Activity,
  Lock,
  Globe,
  RefreshCw,
  Maximize2,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Text3D, 
  Center, 
  Float, 
  OrbitControls, 
  Environment,
  MeshReflectorMaterial,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
  MeshPortalMaterial,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sky,
  Clouds,
  Cloud
} from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

type State = "idle" | "scanning" | "analyzing" | "verified" | "details";
type TabletType = "pill" | "capsule" | "tablet";

interface TabletData {
  id: string;
  name: string;
  type: TabletType;
  imprint: string;
  color: string;
  verified: boolean;
  lastVerified: Date;
}

const speechText: Record<string, { medicine: string; dosage: string }> = {
  English: {
    medicine: "This medicine is used for fever, headache and mild to moderate pain.",
    dosage: "Adults may take 500 to 1000 milligrams every four to six hours.",
  },
  Hindi: {
    medicine: "यह दवा बुखार, सिरदर्द और हल्के से मध्यम दर्द के लिए उपयोग की जाती है।",
    dosage: "वयस्क 500 से 1000 मिलीग्राम हर चार से छह घंटे में ले सकते हैं।",
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

// Modern 3D Tablet Model
const ModernTablet3D = ({ type = "pill", isActive = false, isVerified = false }: { 
  type: TabletType, 
  isActive: boolean, 
  isVerified: boolean 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (meshRef.current) {
      // Smooth floating animation
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.1;
      
      // Gentle rotation
      if (isActive) {
        meshRef.current.rotation.y = t * 0.5;
        meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
      }
    }
    
    if (groupRef.current && isVerified) {
      // Celebration animation for verified state
      groupRef.current.rotation.y += 0.01;
    }
  });

  const getTabletGeometry = () => {
    switch(type) {
      case "capsule":
        return <capsuleGeometry args={[0.5, 1, 16]} />;
      case "tablet":
        return <boxGeometry args={[1, 0.2, 0.6]} />;
      default: // pill
        return <sphereGeometry args={[0.5, 32, 16]} />;
    }
  };

  return (
    <group ref={groupRef}>
      <Float
        speed={2}
        rotationIntensity={isActive ? 1 : 0.3}
        floatIntensity={isActive ? 0.6 : 0.2}
      >
        <mesh ref={meshRef} castShadow receiveShadow>
          {getTabletGeometry()}
          <MeshTransmissionMaterial
            color={isVerified ? "#10b981" : "#3b82f6"}
            transmission={0.95}
            thickness={0.5}
            roughness={0.1}
            chromaticAberration={0.05}
            anisotropy={0.3}
            distortionScale={0.3}
            temporalDistortion={0.2}
          />
        </mesh>
        
        {/* Glow effect */}
        {isActive && (
          <pointLight
            position={[0, 0, 2]}
            intensity={2}
            color="#60a5fa"
            distance={5}
          />
        )}
        
        {/* Scanning rings */}
        {isActive && (
          <>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
              <ringGeometry args={[0.7, 0.8, 64]} />
              <meshBasicMaterial
                color="#3b82f6"
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
              <ringGeometry args={[0.9, 1, 64]} />
              <meshBasicMaterial
                color="#60a5fa"
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>
          </>
        )}
      </Float>
      
      {/* Verified badge */}
      {isVerified && (
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      )}
    </group>
  );
};

// Verification Scan Beam
const ScanBeam = ({ isScanning }: { isScanning: boolean }) => {
  const beamRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (beamRef.current && isScanning) {
      const t = state.clock.elapsedTime;
      beamRef.current.position.y = Math.sin(t * 3) * 2;
      beamRef.current.scale.y = 1 + Math.sin(t * 5) * 0.5;
    }
  });

  if (!isScanning) return null;

  return (
    <mesh ref={beamRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[0.05, 0.1, 3, 8]} />
      <meshBasicMaterial
        color="#3b82f6"
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Data Particles
const DataParticles = ({ count = 100 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#60a5fa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Floating Dashboard Card
const DashboardCard = ({ 
  children, 
  title, 
  icon: Icon, 
  color = "primary",
  delay = 0 
}: { 
  children: React.ReactNode; 
  title: string; 
  icon: React.ComponentType<any>;
  color?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative group"
  >
    <div className={`absolute -inset-1 bg-gradient-to-r from-${color} to-${color}/30 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`} />
    <div className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-${color}/10`}>
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  </motion.div>
);

// Glowing Button Component
const GlowButton = ({ 
  children, 
  onClick, 
  variant = "primary",
  disabled = false,
  loading = false
}: { 
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "success";
  disabled?: boolean;
  loading?: boolean;
}) => {
  const colors = {
    primary: "from-blue-500 to-cyan-500",
    secondary: "from-purple-500 to-pink-500",
    success: "from-emerald-500 to-teal-500"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className="relative px-8 py-4 rounded-xl font-semibold overflow-hidden group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${colors[variant]} opacity-${disabled ? "30" : "100"}`} />
      <div className={`absolute inset-0 bg-gradient-to-l ${colors[variant]} opacity-0 group-hover:opacity-100 transition-opacity`} />
      <span className="relative flex items-center justify-center gap-3">
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {children}
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

export default function ProfessionalTabletChecker() {
  const [state, setState] = useState<State>("idle");
  const [tabletName, setTabletName] = useState("");
  const [language, setLanguage] = useState("English");
  const [tabletType, setTabletType] = useState<TabletType>("pill");
  const [scanProgress, setScanProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock tablet database
  const [verifiedTablets, setVerifiedTablets] = useState<TabletData[]>([
    { id: "1", name: "Paracetamol 500mg", type: "pill", imprint: "P500", color: "white", verified: true, lastVerified: new Date() },
    { id: "2", name: "Ibuprofen 200mg", type: "tablet", imprint: "I200", color: "white", verified: true, lastVerified: new Date() },
    { id: "3", name: "Amoxicillin 250mg", type: "capsule", imprint: "A250", color: "red/white", verified: true, lastVerified: new Date() },
  ]);

  useEffect(() => {
    if (state === "scanning") {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setState("analyzing"), 300);
            return 100;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [state]);

  const handleVerify = () => {
    if (!tabletName.trim()) return;
    setState("scanning");
    setScanProgress(0);
    
    // Simulate complete verification process
    setTimeout(() => {
      setState("verified");
      
      // Add to verified tablets
      const newTablet: TabletData = {
        id: Date.now().toString(),
        name: tabletName,
        type: tabletType,
        imprint: tabletName.split(" ")[0].toUpperCase(),
        color: "white",
        verified: true,
        lastVerified: new Date()
      };
      
      setVerifiedTablets(prev => [newTablet, ...prev.slice(0, 2)]);
    }, 3000);
  };

  const handleReset = () => {
    setState("idle");
    setTabletName("");
    setUploadedImage(null);
    setScanProgress(0);
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "Hindi" ? "hi-IN" : "en-US";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <color attach="background" args={["#030712"]} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <DataParticles count={150} />
          
          <Environment preset="studio" />
          
          {/* Floating tablets in background */}
          {[-3, 0, 3].map((x, i) => (
            <group key={i} position={[x, -2 + Math.sin(Date.now() * 0.001 + i) * 0.5, -5]}>
              <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial color="#1e40af" transparent opacity={0.1} />
              </mesh>
            </group>
          ))}
        </Canvas>
      </div>

      <Navbar />

      <main className="container max-w-7xl mx-auto px-4 pt-24 pb-20 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">PharmaSecure Verification</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              Medical Authenticity
            </span>
            <br />
            <span className="text-white">Platform</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced AI-powered verification ensuring medication safety through 3D molecular analysis
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - 3D Visualization */}
          <div className="lg:col-span-2">
            <div className="h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl">
              <Canvas shadows camera={{ position: [0, 2, 8], fov: 60 }}>
                <color attach="background" args={["#0f172a"]} />
                
                {/* Lights */}
                <ambientLight intensity={0.3} />
                <directionalLight
                  position={[5, 5, 5]}
                  intensity={1}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                />
                <pointLight position={[-5, 5, 5]} intensity={0.5} color="#60a5fa" />
                
                {/* Main tablet */}
                <Center>
                  <ModernTablet3D 
                    type={tabletType}
                    isActive={state === "scanning" || state === "analyzing"}
                    isVerified={state === "verified"}
                  />
                </Center>
                
                {/* Scan beam */}
                <ScanBeam isScanning={state === "scanning"} />
                
                {/* Environment */}
                <Environment preset="studio" />
                <ContactShadows
                  position={[0, -1, 0]}
                  opacity={0.5}
                  scale={10}
                  blur={2}
                />
                
                {/* Orbit controls */}
                <OrbitControls
                  enableZoom={true}
                  enablePan={true}
                  minDistance={3}
                  maxDistance={15}
                  autoRotate={state === "idle"}
                  autoRotateSpeed={0.5}
                  enableDamping
                />
              </Canvas>
              
              {/* Controls overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {["pill", "tablet", "capsule"].map((type) => (
                      <motion.button
                        key={type}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setTabletType(type as TabletType)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                          tabletType === type
                            ? "bg-blue-500 text-white"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              {/* Progress indicator */}
              {(state === "scanning" || state === "analyzing") && (
                <div className="absolute top-6 left-6 right-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-400 font-medium">
                        {state === "scanning" ? "3D Scanning" : "AI Analysis"}
                      </span>
                      <span className="text-white">{scanProgress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${scanProgress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Recent Verifications */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Verifications</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {verifiedTablets.map((tablet) => (
                  <motion.div
                    key={tablet.id}
                    whileHover={{ y: -4 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Pill className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tablet.name}</p>
                        <p className="text-xs text-gray-400">{tablet.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-400 font-medium">
                        Verified
                      </span>
                      <span className="text-xs text-gray-400">
                        {tablet.lastVerified.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Control Interface */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {state === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <DashboardCard title="Tablet Identification" icon={FileSearch}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Tablet Name / Code</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={tabletName}
                            onChange={(e) => setTabletName(e.target.value)}
                            placeholder="Enter tablet identifier..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                          />
                          {tabletName && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Select Language</label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none"
                        >
                          {["English", "Hindi", "Spanish", "French", "German", "Chinese"].map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </DashboardCard>

                  <DashboardCard title="Image Upload" icon={Upload} color="purple">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative h-40 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors"
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const file = e.dataTransfer.files[0];
                        if (file) handleFileUpload(file);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                      />
                      
                      {uploadedImage ? (
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadedImage(null);
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full hover:bg-black/70"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center space-y-3">
                          <Upload className="w-10 h-10 mx-auto text-gray-500" />
                          <div>
                            <p className="font-medium">Drop or click to upload</p>
                            <p className="text-sm text-gray-400">Supports JPG, PNG, WEBP</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </DashboardCard>

                  <GlowButton
                    onClick={handleVerify}
                    disabled={!tabletName.trim()}
                    variant="primary"
                  >
                    <Scan className="w-5 h-5" />
                    Start Verification
                  </GlowButton>
                </motion.div>
              )}

              {state === "verified" && (
                <motion.div
                  key="verified"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <DashboardCard title="Verification Complete" icon={ShieldCheck} color="success">
                    <div className="text-center space-y-4">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
                      </motion.div>
                      
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">Authentic Medication</h4>
                        <p className="text-emerald-400 font-medium">{tabletName}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-lg">
                          <p className="text-xs text-gray-300">Manufacturer</p>
                          <p className="font-semibold">PharmaCorp Inc.</p>
                        </div>
                        <div className="p-3 bg-emerald-500/10 rounded-lg">
                          <p className="text-xs text-gray-300">Batch No.</p>
                          <p className="font-semibold">PC-2024-001</p>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>

                  <DashboardCard title="Safety Information" icon={AlertTriangle} color="yellow">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium">Recommended Dosage</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        500-1000mg every 4-6 hours. Max 4000mg per day.
                      </p>
                      
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="w-4 h-4 text-red-400" />
                          <span className="font-medium">Precautions</span>
                        </div>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• Avoid alcohol consumption</li>
                          <li>• Not for prolonged use</li>
                          <li>• Consult doctor if symptoms persist</li>
                        </ul>
                      </div>
                    </div>
                  </DashboardCard>

                  <div className="flex gap-4">
                    <GlowButton
                      onClick={() => speak(`${tabletName} verification complete. ${speechText[language].medicine}`)}
                      variant="secondary"
                    >
                      <Volume2 className="w-5 h-5" />
                      Hear Details
                    </GlowButton>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 font-semibold transition-colors"
                    >
                      Scan Another
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats Panel */}
            <DashboardCard title="System Status" icon={Activity}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">AI Accuracy</span>
                    <span className="text-emerald-400">99.8%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[99.8%]" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Database</span>
                    <span className="text-blue-400">50,412</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[85%]" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Response Time</span>
                    <span className="text-cyan-400">2.3s</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 w-[95%]" />
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Floating Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-2xl shadow-blue-500/30"
          >
            <Target className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </main>

      {/* Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px]" />
      </div>
    </div>
  );
}
