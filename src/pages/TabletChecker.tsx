import { useState } from "react";
import { Upload, Image as ImageIcon, Type, Globe2, Volume2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { VerificationAnimation } from "@/components/3d/VerificationAnimation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Medicine database for simulation
const medicineDatabase: Record<string, any> = {
  paracetamol: {
    name: "Paracetamol 500mg",
    disease: "Pain Relief, Fever Reduction, Headache",
    dosage: "Adults: 500-1000mg every 4-6 hours. Maximum 4000mg per day.",
    precautions: [
      "Do not exceed recommended dose",
      "Avoid alcohol consumption",
      "Not recommended with other paracetamol-containing products",
      "Consult doctor if symptoms persist"
    ],
    sideEffects: "Rare: Allergic reactions, liver damage (overdose), skin rash",
    manufacturer: "Various Generic Manufacturers",
    verified: true
  },
  ibuprofen: {
    name: "Ibuprofen 200mg",
    disease: "Pain Relief, Inflammation, Fever",
    dosage: "Adults: 200-400mg every 4-6 hours. Maximum 1200mg per day.",
    precautions: [
      "Take with food to reduce stomach upset",
      "Avoid alcohol consumption",
      "Not recommended during pregnancy",
      "May cause drowsiness"
    ],
    sideEffects: "Nausea, heartburn, dizziness, headache",
    manufacturer: "Generic Pharmaceuticals Inc.",
    verified: true
  },
  aspirin: {
    name: "Aspirin 300mg",
    disease: "Pain Relief, Fever Reduction, Blood Thinner",
    dosage: "Adults: 300-900mg every 4-6 hours. Maximum 4000mg per day.",
    precautions: [
      "Not for children under 16",
      "Take with food",
      "Consult doctor if on blood thinners",
      "Stop 7 days before surgery"
    ],
    sideEffects: "Stomach upset, heartburn, increased bleeding risk",
    manufacturer: "Generic Pharmaceuticals Inc.",
    verified: true
  }
};

export const TabletChecker = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imprint, setImprint] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheck = async () => {
    if (!image && !imprint) {
      toast.error("Please upload an image or enter tablet imprint");
      return;
    }

    setLoading(true);
    
    // Simulate API call with medicine lookup
    setTimeout(() => {
      // Search for medicine in database
      const searchTerm = imprint.toLowerCase().trim();
      let foundMedicine = null;

      // Check if the search term matches any medicine
      for (const [key, medicine] of Object.entries(medicineDatabase)) {
        if (searchTerm.includes(key) || key.includes(searchTerm)) {
          foundMedicine = medicine;
          break;
        }
      }

      if (foundMedicine) {
        setResult(foundMedicine);
        setLoading(false);
        toast.success("Tablet verified successfully!");
      } else {
        setResult({
          name: "Unknown Medicine",
          disease: "Not Found in Database",
          dosage: "Information not available",
          precautions: [
            "Medicine not found in our database",
            "Please verify the imprint carefully",
            "Consult a pharmacist for verification",
            "Try uploading a clear image"
          ],
          sideEffects: "Unable to determine - consult healthcare provider",
          manufacturer: "Unknown",
          verified: false
        });
        setLoading(false);
        toast.warning("Medicine not found in database");
      }
    }, 2000);
  };

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window && result) {
      const utterance = new SpeechSynthesisUtterance(
        `Medicine: ${result.name}. Used for: ${result.disease}. Dosage: ${result.dosage}`
      );
      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
      toast.success("Playing audio information");
    } else {
      toast.error("Text-to-speech not supported");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="holographic-text">Tablet Verification</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload an image or enter tablet details for instant AI verification
            </p>
          </motion.div>

          {/* Main Input Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel-strong p-8 lg:p-12 mb-8"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Upload */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Upload Tablet Image
                </Label>
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-64 glass-panel border-2 border-dashed border-primary/30 hover:border-primary cursor-pointer group transition-all hover-lift"
                  >
                    <AnimatePresence mode="wait">
                      {image ? (
                        <motion.img
                          key="image"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          src={image}
                          alt="Uploaded tablet"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      ) : (
                        <motion.div
                          key="placeholder"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center p-8"
                        >
                          <Upload className="w-12 h-12 mx-auto mb-4 text-primary group-hover:neon-glow-blue transition-all" />
                          <p className="text-lg font-medium mb-2">Click to upload</p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG up to 10MB
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>
                </div>
              </motion.div>

              {/* Text Input */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <Label htmlFor="imprint" className="text-lg font-semibold flex items-center gap-2">
                    <Type className="w-5 h-5 text-primary" />
                    Tablet Imprint/Name
                  </Label>
                  <Input
                    id="imprint"
                    placeholder="e.g., IBU 200 or Ibuprofen"
                    value={imprint}
                    onChange={(e) => setImprint(e.target.value)}
                    className="glass-panel text-lg h-14 border-primary/30 focus:border-primary focus:neon-glow-blue"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <Label className="text-lg font-semibold flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-primary" />
                    Select Language
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="glass-panel h-14 border-primary/30 text-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-panel-strong">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={handleCheck}
                    disabled={loading}
                    className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_40px_hsl(215_100%_40%/0.4)] transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </span>
                    ) : (
                      "Verify Tablet"
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 3D Verification Animation */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 400 }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-panel-strong rounded-2xl overflow-hidden mb-8"
              >
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <VerificationAnimation isVerified={false} />
                </Canvas>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Verification Status */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className={`glass-panel-strong p-6 border-2 ${result.verified ? 'border-accent/50 neon-glow-green' : 'border-destructive/50'}`}
                >
                  <div className="flex items-center gap-3">
                    {result.verified ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-accent" />
                        <div>
                          <h3 className="text-xl font-bold">Verified Authentic</h3>
                          <p className="text-muted-foreground">This tablet has been successfully verified</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-8 h-8 text-destructive" />
                        <div>
                          <h3 className="text-xl font-bold">Verification Failed</h3>
                          <p className="text-muted-foreground">Unable to verify this tablet</p>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* 3D Success Animation */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 300 }}
                  className="glass-panel-strong rounded-2xl overflow-hidden"
                >
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <VerificationAnimation isVerified={result.verified} />
                  </Canvas>
                </motion.div>

                {/* Detailed Information */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="grid md:grid-cols-2 gap-6"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    className="glass-panel p-6 hover-lift"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold">Medication Info</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePlayAudio}
                        className="hover:neon-glow-blue"
                      >
                        <Volume2 className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold text-lg">{result.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Treats</p>
                        <p className="font-medium">{result.disease}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Manufacturer</p>
                        <p className="font-medium">{result.manufacturer}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    className="glass-panel p-6 hover-lift"
                  >
                    <h3 className="text-xl font-bold mb-4">Dosage Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {result.dosage}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    className="glass-panel p-6 hover-lift md:col-span-2"
                  >
                    <h3 className="text-xl font-bold mb-4">Precautions</h3>
                    <ul className="space-y-2">
                      {result.precautions.map((precaution: string, index: number) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{precaution}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    className="glass-panel p-6 hover-lift md:col-span-2"
                  >
                    <h3 className="text-xl font-bold mb-4">Possible Side Effects</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {result.sideEffects}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
