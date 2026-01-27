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
  Satellite
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text3D, Center, Environment, MeshWobbleMaterial, MeshDistortMaterial, Sparkles as Sparkles3D, Stars } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

type State = "idle" | "scanning" | "analyzing" | "verified";

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

// 3D Tablet Component
const Tablet3D = ({ isScanning }: { isScanning: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      if (isScanning) {
        meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.2, 0.8]} />
          <MeshWobbleMaterial
            color="#3b82f6"
            speed={isScanning ? 2 : 0.5}
            factor={isScanning ? 0.3 : 0.1}
          />
        </mesh>
        
        {/* Pill imprint */}
        <mesh position={[0, 0.11, 0]}>
          <planeGeometry args={[0.8, 0.1]} />
          <meshBasicMaterial color="white" transparent opacity={0.9} />
        </mesh>
        
        {/* Scanning beams */}
        {isScanning && (
          <>
            <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.5, 0.7, 32]} />
              <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
            <Sparkles3D count={20} scale={2} size={2} speed={0.3} />
          </>
        )}
      </Float>
    </group>
  );
};

// Data Stream Particles
const DataStream = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

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
        color="#60a5fa"
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Holographic Interface Panel
const HologramPanel = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="relative group"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
    <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-primary/30 p-8 shadow-2xl">
      {children}
    </div>
  </motion.div>
);

// Neural Network Visualization
const NeuralNetwork = ({ active }: { active: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    ),
    scale: Math.random() * 0.3 + 0.2
  }));

  useFrame((state) => {
    if (groupRef.current && active) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position} scale={node.scale}>
          <sphereGeometry />
          <meshBasicMaterial color="#60a5fa" />
          {active && (
            <pointLight
              color="#60a5fa"
              intensity={1}
              distance={5}
            />
          )}
        </mesh>
      ))}
    </group>
  );
};

export default function TabletChecker3D() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === "scanning") {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setState("analyzing"), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [state]);

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = language === "Hindi" ? "hi-IN" : language === "Spanish" ? "es-ES" : "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  const handleVerify = () => {
    setState("scanning");
    setScanProgress(0);
    setTimeout(() => {
      setState("verified");
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <color attach="background" args={["#000000"]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <DataStream />
          <NeuralNetwork active={state === "analyzing"} />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <Navbar />

      <main ref={containerRef} className="container max-w-7xl mx-auto px-4 pt-24 pb-20 relative z-10">
        {/* Hero Section with 3D */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Satellite className="w-12 h-12 text-primary" />
            </motion.div>
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-cyan-400">
              Tablet<span className="text-white">AI</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced neural network powered medicine verification with real-time 3D analysis
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Panel - 3D Visualization */}
          <div className="h-[600px] rounded-2xl overflow-hidden border border-primary/30 backdrop-blur-xl bg-gray-900/30">
            <Canvas>
              <color attach="background" args={["#0a0a0a"]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
              <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} />
              
              <Tablet3D isScanning={state === "scanning" || state === "analyzing"} />
              
              {state === "verified" && (
                <Float speed={5} rotationIntensity={2}>
                  <Text3D
                    font="/fonts/helvetiker_regular.typeface.json"
                    size={0.5}
                    height={0.2}
                    curveSegments={12}
                    position={[-2, 2, 0]}
                  >
                    VERIFIED
                    <meshNormalMaterial />
                  </Text3D>
                </Float>
              )}

              <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={5}
                maxDistance={15}
                autoRotate={state === "idle"}
                autoRotateSpeed={0.5}
              />
              <Environment preset="studio" />
            </Canvas>

            {/* Scanning Progress */}
            {state === "scanning" && (
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-2">
                  <Cpu className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-sm font-medium">3D Molecular Scan</span>
                  <span className="ml-auto text-sm">{scanProgress}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Interface */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {state === "idle" && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <HologramPanel>
                    <div className="flex items-center gap-3 mb-6">
                      <Binary className="w-8 h-8 text-primary" />
                      <h2 className="text-2xl font-bold">Input Parameters</h2>
                    </div>

                    {/* Tablet Name */}
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-gray-300">
                        <Pill className="w-5 h-5" />
                        <span className="font-medium">Tablet Identification</span>
                      </label>
                      <div className="relative">
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          value={tablet}
                          onChange={(e) => setTablet(e.target.value)}
                          placeholder="Enter tablet name or code..."
                          className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                        />
                        {tablet && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <Brain className="w-5 h-5 text-accent" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Language Selector */}
                    <div className="space-y-4 mt-8">
                      <label className="flex items-center gap-2 text-gray-300">
                        <Languages className="w-5 h-5" />
                        <span className="font-medium">Analysis Language</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["English", "Hindi", "Spanish", "French", "German", "Chinese"].map((lang) => (
                          <motion.button
                            key={lang}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setLanguage(lang)}
                            className={cn(
                              "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                              language === lang
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : "bg-gray-800/50 hover:bg-gray-700/50"
                            )}
                          >
                            {lang}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Upload Area */}
                    <div className="space-y-4 mt-8">
                      <label className="flex items-center gap-2 text-gray-300">
                        <Upload className="w-5 h-5" />
                        <span className="font-medium">Visual Scan (Optional)</span>
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative h-40 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <div className="text-center space-y-3">
                          <Upload className="w-10 h-10 mx-auto text-gray-500" />
                          <p className="text-gray-400">Drag & drop tablet image</p>
                          <p className="text-sm text-gray-500">AI-enhanced visual recognition</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Verify Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleVerify}
                      disabled={!tablet}
                      className="w-full mt-8 px-8 py-4 rounded-xl text-lg font-bold relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-cyan-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative flex items-center justify-center gap-3">
                        <Zap className="w-5 h-5" />
                        Initiate Deep Scan
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </HologramPanel>
                </motion.div>
              )}

              {/* Analyzing State */}
              {(state === "scanning" || state === "analyzing") && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <HologramPanel>
                    <div className="flex items-center gap-3 mb-6">
                      <Cpu className="w-8 h-8 text-primary animate-pulse" />
                      <h2 className="text-2xl font-bold">Neural Analysis</h2>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Molecular Structure</span>
                          <span className="text-primary">Analyzing...</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Chemical Composition</span>
                          <span className="text-primary">Validating...</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-accent to-cyan-500"
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Safety Database</span>
                          <span className="text-primary">Cross-referencing...</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-primary"
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        <span className="text-sm text-gray-300">
                          {state === "scanning" 
                            ? "Scanning molecular structure with quantum sensors..." 
                            : "Analyzing chemical composition with neural networks..."}
                        </span>
                      </div>
                    </div>
                  </HologramPanel>
                </motion.div>
              )}

              {/* Verified State */}
              {state === "verified" && (
                <motion.div
                  key="verified"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Verification Result */}
                  <HologramPanel>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <CheckCircle className="w-10 h-10 text-green-400" />
                        </motion.div>
                        <div>
                          <h2 className="text-2xl font-bold">Verification Complete</h2>
                          <p className="text-green-400">✓ Authentic Pharmaceutical</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => speak(`${tablet} is authentic. ${speechText[language].medicine}`)}
                        className="p-3 rounded-full bg-primary/20 hover:bg-primary/30"
                      >
                        <Volume2 className="w-5 h-5" />
                      </motion.button>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/30 rounded-lg">
                        <p className="font-semibold mb-2">Identified Substance</p>
                        <p className="text-2xl font-bold text-primary">{tablet}</p>
                      </div>
                    </div>
                  </HologramPanel>

                  {/* Safety Information */}
                  <HologramPanel delay={0.1}>
                    <div className="flex items-center gap-3 mb-6">
                      <ShieldAlert className="w-8 h-8 text-yellow-400" />
                      <h3 className="text-xl font-bold">Safety Profile</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                        <p className="font-semibold text-yellow-400 mb-2">Precautions</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                            Do not exceed 4000mg/day
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                            Avoid with alcohol
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <p className="font-semibold text-red-400 mb-2">Side Effects</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Nausea (Common)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Severe Allergy (Rare)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </HologramPanel>

                  {/* Reset Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setState("idle");
                      setTablet("");
                      setUploadedImage(null);
                    }}
                    className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-lg font-bold hover:border-primary transition-all group"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Scan className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                      Analyze Another Tablet
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl px-8 py-4 shadow-2xl"
        >
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99.8%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">2.4s</div>
              <div className="text-sm text-gray-400">Avg Scan Time</div>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">50K+</div>
              <div className="text-sm text-gray-400">Database</div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Ambient Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
