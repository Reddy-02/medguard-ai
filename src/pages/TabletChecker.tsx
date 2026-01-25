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
   MEDGUARD – MEDICINE DATABASE
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

  pantoprazole: {
    name: "Pantoprazole",
    disease: "Acid reflux",
    dosage: "40 mg once daily",
    precautions: ["Long-term use caution"],
    sideEffects: "Nausea",
    manufacturer: "Pantocid",
    verified: true,
  },

  cetirizine: {
    name: "Cetirizine",
    disease: "Allergic rhinitis, Cold",
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

  /* ===============================
     ✅ FIXED LOGIC (ONLY CHANGE)
  ================================ */
  const handleCheck = async () => {
    if (!image && imprint.trim().length < 3) {
      toast.error("Please enter tablet name or imprint");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const searchTerm = imprint.toLowerCase().trim();
      let foundMedicine = null;

      if (searchTerm.length >= 3) {
        // Prevent empty string from matching everything
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

      }

      if (foundMedicine) {
        setResult(foundMedicine);
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
            "Try uploading a clear image",
          ],
          sideEffects: "Unable to determine",
          manufacturer: "Unknown",
          verified: false,
        });
        toast.warning("Medicine not found in database");
      }

      setLoading(false);
    }, 2000);
  };

  const handlePlayAudio = () => {
    if ("speechSynthesis" in window && result) {
      const utterance = new SpeechSynthesisUtterance(
        `Medicine: ${result.name}. Used for: ${result.disease}. Dosage: ${result.dosage}`
      );
      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
    }
  };

  /* ===============================
     UI / UX — UNCHANGED
  ================================ */

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <motion.div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="holographic-text">Tablet Verification</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload an image or enter tablet details for instant verification
            </p>
          </motion.div>

          {/* INPUT */}
          <motion.div className="glass-panel-strong p-8 lg:p-12 mb-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <Label>Upload Tablet Image</Label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </div>

              <div>
                <Label>Tablet Imprint / Name</Label>
                <Input
                  placeholder="e.g., IBU 200 or Paracetamol"
                  value={imprint}
                  onChange={(e) => setImprint(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleCheck} disabled={loading} className="w-full mt-6">
              {loading ? "Verifying..." : "Verify Tablet"}
            </Button>
          </motion.div>

          {/* RESULT */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div className="glass-panel-strong p-6">
                <h3 className="text-xl font-bold">{result.name}</h3>
                <p>{result.disease}</p>
                <p>{result.dosage}</p>
                <p className="text-sm">Manufacturer: {result.manufacturer}</p>
                <Button variant="ghost" size="icon" onClick={handlePlayAudio}>
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
