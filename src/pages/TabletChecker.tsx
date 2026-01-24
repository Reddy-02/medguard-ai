import { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Type,
  Globe2,
  Volume2,
  CheckCircle2,
  AlertCircle
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
  SelectValue
} from "@/components/ui/select";

/* ===============================
   MEDGUARD – MEDICINE DATABASE
   Rule-based | Free | Explainable
================================ */

const medicineDatabase: Record<string, any> = {
  paracetamol: {
    name: "Paracetamol",
    disease: "Fever, Headache, Mild to moderate pain",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol",
      "Check other medicines for paracetamol content",
      "Consult doctor if fever persists"
    ],
    sideEffects: "Rare allergic reactions; liver damage in overdose",
    manufacturer: "Crocin, Dolo 650",
    verified: true
  },

  ibuprofen: {
    name: "Ibuprofen",
    disease: "Pain, Inflammation, Fever",
    dosage: "200–400 mg every 6 hours (max 1200 mg/day)",
    precautions: [
      "Take after food",
      "Avoid alcohol",
      "Avoid during pregnancy"
    ],
    sideEffects: "Acidity, nausea",
    manufacturer: "Brufen, Ibugesic",
    verified: true
  },

  pantoprazole: {
    name: "Pantoprazole",
    disease: "Acid reflux, GERD",
    dosage: "40 mg once daily before food",
    precautions: ["Avoid long-term use"],
    sideEffects: "Headache, nausea",
    manufacturer: "Pantocid",
    verified: true
  },

  cetirizine: {
    name: "Cetirizine",
    disease: "Allergy, Cold",
    dosage: "10 mg once daily",
    precautions: ["May cause drowsiness"],
    sideEffects: "Sleepiness",
    manufacturer: "Zyrtec",
    verified: true
  }

  // ➕ Continue adding medicines in same format
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
      toast.success("Image uploaded");
    };
    reader.readAsDataURL(file);
  };

  const handleCheck = () => {
    /* 🚫 Prevent image-only verification */
    if (image && imprint.trim().length < 3) {
      toast.error("Please enter tablet name or imprint");
      return;
    }

    if (!image && imprint.trim().length < 3) {
      toast.error("Enter at least 3 characters of tablet name");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const searchTerm = imprint.toLowerCase().trim();
      let foundMedicine = null;

      /* ✅ SAFE SEARCH (NO EMPTY MATCHES) */
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
            "Consult a pharmacist"
          ],
          sideEffects: "Information unavailable",
          manufacturer: "Unknown",
          verified: false
        });
        toast.warning("Medicine not found");
        setLoading(false);
        return;
      }

      setResult(foundMedicine);
      toast.success("Tablet verified");
      setLoading(false);
    }, 1500);
  };

  const handlePlayAudio = () => {
    if (!result || !("speechSynthesis" in window)) return;

    const speech = new SpeechSynthesisUtterance(
      `Medicine ${result.name}. Used for ${result.disease}. Dosage ${result.dosage}`
    );
    speech.lang = language;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="text-4xl font-bold text-center mb-6">
          Tablet Verification
        </h1>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* IMAGE */}
          <div>
            <Label>Upload Tablet Image</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {/* INPUT */}
          <div>
            <Label>Tablet Name / Imprint</Label>
            <Input
              placeholder="e.g. Paracetamol, IBU 200"
              value={imprint}
              onChange={(e) => setImprint(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={handleCheck} disabled={loading}>
          {loading ? "Verifying..." : "Verify Tablet"}
        </Button>

        <AnimatePresence>
          {result && !loading && (
            <motion.div className="mt-8">
              <h2 className="text-xl font-bold">{result.name}</h2>
              <p>{result.disease}</p>
              <p>{result.dosage}</p>
              <p>{result.manufacturer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
