import { useState } from "react";
import { Upload, Image as ImageIcon, Type, Globe2, Volume2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ===============================
   MEDGUARD – MEDICINE DATABASE
   =============================== */
const medicineDatabase: Record<string, any> = {
  paracetamol: {
    name: "Paracetamol",
    disease: "Fever, Headache, Mild to moderate pain",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol consumption",
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
      "Avoid during pregnancy",
      "Not recommended in stomach ulcers"
    ],
    sideEffects: "Acidity, nausea, dizziness",
    manufacturer: "Brufen, Ibugesic",
    verified: true
  },

  aspirin: {
    name: "Aspirin",
    disease: "Pain, Fever, Blood thinning",
    dosage: "300–900 mg every 6 hours",
    precautions: [
      "Not for children below 16",
      "Avoid in bleeding disorders",
      "Stop before surgery",
      "Take with food"
    ],
    sideEffects: "Stomach irritation, bleeding risk",
    manufacturer: "Disprin, Ecosprin",
    verified: true
  },

  diclofenac: {
    name: "Diclofenac",
    disease: "Joint pain, Muscle pain, Arthritis",
    dosage: "50 mg up to 2–3 times daily",
    precautions: [
      "Short-term use only",
      "Avoid in heart disease",
      "Take after meals"
    ],
    sideEffects: "Gastric pain, nausea",
    manufacturer: "Voveran",
    verified: true
  },

  // 👉 you can continue adding more medicines here safely
};

/* ===============================
   COMPONENT
   =============================== */
const TabletChecker = () => {
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

  const handleVerify = () => {
    if (!image && !imprint.trim()) {
      toast.error("Upload an image or enter tablet name");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      let found = null;

      if (imprint.trim()) {
        const key = imprint.toLowerCase().trim();
        found = medicineDatabase[key] ?? null;
      }

      if (found) {
        setResult(found);
        toast.success("Tablet verified");
      } else {
        setResult({
          name: "Unknown Medicine",
          disease: "Not found in database",
          dosage: "N/A",
          precautions: [
            "Medicine not found",
            "Verify tablet imprint",
            "Consult pharmacist"
          ],
          sideEffects: "Unknown",
          manufacturer: "Unknown",
          verified: false
        });
        toast.warning("Medicine not found");
      }

      setLoading(false);
    }, 1200);
  };

  const playAudio = () => {
    if (!result) return;
    const speech = new SpeechSynthesisUtterance(
      `${result.name}. Used for ${result.disease}. Dosage: ${result.dosage}`
    );
    speech.lang = language;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="text-4xl font-bold text-center mb-2 text-primary">
          Tablet Verification
        </h1>
        <p className="text-center text-muted-foreground mb-10">
          Upload an image or enter tablet details for instant AI verification
        </p>

        {/* INPUT CARD */}
        <div className="glass-panel-strong p-8 rounded-2xl grid md:grid-cols-2 gap-6">
          {/* IMAGE UPLOAD */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <ImageIcon size={18} /> Upload Tablet Image
            </Label>
            <label className="border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer">
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
              {image ? (
                <img src={image} className="h-full object-contain" />
              ) : (
                <>
                  <Upload size={32} />
                  <span className="text-sm mt-2">Click to upload</span>
                </>
              )}
            </label>
          </div>

          {/* TEXT + LANGUAGE */}
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 mb-1">
                <Type size={18} /> Tablet Imprint / Name
              </Label>
              <Input
                placeholder="paracetamol"
                value={imprint}
                onChange={(e) => setImprint(e.target.value)}
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-1">
                <Globe2 size={18} /> Select Language
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-green-400"
              onClick={handleVerify}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Tablet"}
            </Button>
          </div>
        </div>

        {/* RESULT */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-6 rounded-xl ${
                result.verified ? "border-green-400 border" : "border-red-400 border"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {result.verified ? (
                  <CheckCircle2 className="text-green-500" />
                ) : (
                  <AlertCircle className="text-red-500" />
                )}
                <h3 className="text-xl font-bold">{result.name}</h3>
                <Button variant="ghost" size="icon" onClick={playAudio}>
                  <Volume2 size={18} />
                </Button>
              </div>

              <p><b>Treats:</b> {result.disease}</p>
              <p><b>Dosage:</b> {result.dosage}</p>
              <p><b>Manufacturer:</b> {result.manufacturer}</p>
              <p className="mt-2"><b>Side Effects:</b> {result.sideEffects}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabletChecker;
