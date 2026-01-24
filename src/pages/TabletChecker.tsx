import { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Type,
  Globe2,
  Volume2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
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

/* ===============================
   MEDICINE DATABASE (RULE-BASED)
================================ */

const medicineDatabase: Record<string, any> = {
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
    ],
    sideEffects: "Acidity, nausea",
    manufacturer: "Brufen, Ibugesic",
    verified: true,
  },

  pantoprazole: {
    name: "Pantoprazole",
    disease: "Acid reflux, GERD",
    dosage: "40 mg once daily before food",
    precautions: ["Avoid long-term use without medical advice"],
    sideEffects: "Headache, nausea",
    manufacturer: "Pantocid",
    verified: true,
  },

  cetirizine: {
    name: "Cetirizine",
    disease: "Allergy, Cold",
    dosage: "10 mg once daily",
    precautions: ["May cause drowsiness"],
    sideEffects: "Sleepiness",
    manufacturer: "Zyrtec",
    verified: true,
  },
};

export const TabletChecker = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imprint, setImprint] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  /* IMAGE UPLOAD */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      toast.success("Image uploaded successfully");
    };
    reader.readAsDataURL(file);
  };

  /* CORE VERIFICATION LOGIC */
  const handleCheck = () => {
    const searchTerm = imprint.toLowerCase().trim();

    if (!image && searchTerm.length < 3) {
      toast.error("Please enter tablet name or imprint");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      let foundMedicine = null;

      /* SAFE SEARCH — NO EMPTY MATCHES */
      if (searchTerm.length >= 3) {
        for (const [key, medicine] of Object.entries(medicineDatabase)) {
          if (
            key.includes(searchTerm) ||
            medicine.name.toLowerCase().includes(searchTerm)
          ) {
            foundMedicine = medicine;
            break;
          }
        }
      }

      if (!foundMedicine) {
        setResult({
          name: "Unknown Medicine",
          disease: "Not found in database",
          dosage: "Information not available",
          precautions: [
            "Verify tablet name or imprint",
            "Image upload is for visual reference only",
            "Consult a pharmacist for confirmation",
          ],
          sideEffects: "Information unavailable",
          manufacturer: "Unknown",
          verified: false,
        });
        toast.warning("Medicine not found");
        setLoading(false);
        return;
      }

      setResult(foundMedicine);
      toast.success("Tablet verified successfully");
      setLoading(false);
    }, 2000);
  };

  /* TEXT TO SPEECH */
  const handlePlayAudio = () => {
    if (!result || !("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(
      `Medicine ${result.name}. Used for ${result.disease}. Dosage: ${result.dosage}`
    );
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
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
              Upload an image for visual reference and enter tablet name or imprint
              for accurate verification.
            </p>
          </motion.div>

          {/* INPUT PANEL */}
          <motion.div className="glass-panel-strong p-8 lg:p-12 mb-8">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* IMAGE */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Upload Tablet Image
                </Label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              {/* IMPRINT */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Type className="w-5 h-5 text-primary" />
                  Tablet Name / Imprint
                </Label>

                <Input
                  placeholder="e.g. Paracetamol, IBU 200"
                  value={imprint}
                  onChange={(e) => setImprint(e.target.value)}
                />

                <p className="text-sm text-muted-foreground">
                  Image upload is for visual reference.
                  Identification is based on tablet name or imprint.
                </p>
              </div>
            </div>

            <Button
              onClick={handleCheck}
              disabled={loading}
              className="mt-6 w-full"
            >
              {loading ? "Verifying..." : "Verify Tablet"}
            </Button>
          </motion.div>

          {/* RESULT */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div className="glass-panel-strong p-6">
                <h3 className="text-xl font-bold mb-2">{result.name}</h3>
                <p>{result.disease}</p>
                <p>{result.dosage}</p>
                <p className="text-sm text-muted-foreground">
                  Manufacturer: {result.manufacturer}
                </p>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayAudio}
                  className="mt-2"
                >
                  <Volume2 />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};
