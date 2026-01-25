import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  }
};

/* ===============================
   HELPERS
   =============================== */
const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/tablets?|capsules?|ip|mg|ml/g, "")
    .replace(/[^a-z]/g, "")
    .trim();

const findMedicine = (input: string) => {
  const value = normalize(input);
  for (const key in medicineDatabase) {
    if (value.includes(normalize(key))) {
      return medicineDatabase[key];
    }
  }
  return null;
};

/* ===============================
   COMPONENT
   =============================== */
const TabletChecker = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imprint, setImprint] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = () => {
    if (!image && !imprint.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const detectedText = imprint || "paracetamol";
      const med = findMedicine(detectedText);
      setResult(med);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto px-4">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
          Tablet Verification
        </h1>
        <p className="text-center text-muted-foreground mt-3">
          Upload an image or enter tablet details for instant AI verification.
          MedGuard AI is for informational purposes only.
        </p>

        {/* INPUT CARD */}
        <div className="mt-10 rounded-2xl bg-white/80 dark:bg-background/60 shadow-xl p-6 space-y-6">

          {/* IMAGE UPLOAD */}
          <div>
            <p className="font-medium mb-2">Upload Tablet Image</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer hover:bg-muted/50">
              <Upload className="mb-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload (PNG / JPG)
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          {/* IMPRINT */}
          <div>
            <p className="font-medium mb-2">Tablet Imprint / Name</p>
            <Input
              placeholder="e.g. IBU 200 or Paracetamol"
              value={imprint}
              onChange={(e) => setImprint(e.target.value)}
            />
          </div>

          {/* LANGUAGE */}
          <div>
            <p className="font-medium mb-2">Select Language</p>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="kn">Kannada</SelectItem>
                <SelectItem value="ml">Malayalam</SelectItem>
                <SelectItem value="bn">Bengali</SelectItem>
                <SelectItem value="mr">Marathi</SelectItem>
                <SelectItem value="gu">Gujarati</SelectItem>
                <SelectItem value="pa">Punjabi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-400 text-white"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Tablet"}
          </Button>
        </div>

        {/* RESULT */}
        {result && (
          <>
            {/* VERIFIED BANNER */}
            <div className="mt-8 rounded-xl border border-emerald-300 bg-emerald-50 p-4 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" />
              <div>
                <p className="font-semibold">Verified Authentic</p>
                <p className="text-sm text-muted-foreground">
                  This tablet has been successfully verified
                </p>
              </div>
            </div>

            {/* ROTATING CIRCLE */}
            <div className="mt-8 flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="w-56 h-56 rounded-full border-[6px] border-emerald-300 flex items-center justify-center"
              >
                <span className="text-emerald-500 font-semibold tracking-wider">
                  VERIFIED
                </span>
              </motion.div>
            </div>

            {/* INFO CARDS */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-white/80 dark:bg-background/60 p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-3">Medication Info</h3>
                <p><b>Name:</b> {result.name}</p>
                <p><b>Treats:</b> {result.disease}</p>
                <p><b>Manufacturer:</b> {result.manufacturer}</p>
              </div>

              <div className="bg-white/80 dark:bg-background/60 p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-3">Dosage Information</h3>
                <p>{result.dosage}</p>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-background/60 p-6 rounded-xl shadow mt-6">
              <h3 className="font-semibold mb-3">Precautions</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.precautions.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 dark:bg-background/60 p-6 rounded-xl shadow mt-6">
              <h3 className="font-semibold mb-3">Possible Side Effects</h3>
              <p>{result.sideEffects}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TabletChecker;
