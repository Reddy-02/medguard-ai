import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "sonner";

/* ===============================
   MEDGUARD – MEDICINE DATABASE
   =============================== */

const medicineDatabase: Record<string, any> = {
  paracetamol: {
    name: "Paracetamol",
    disease: "Fever, Headache, Mild to moderate pain",
    dosage: "500–1000 mg every 4–6 hours",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol consumption",
    ],
    sideEffects: "Rare allergic reactions",
    manufacturer: "Crocin, Dolo 650",
    verified: true,
  },

  ibuprofen: {
    name: "Ibuprofen",
    disease: "Pain, Inflammation, Fever",
    dosage: "200–400 mg every 6 hours",
    precautions: ["Take after food", "Avoid during pregnancy"],
    sideEffects: "Acidity, nausea",
    manufacturer: "Brufen, Ibugesic",
    verified: true,
  },

  aspirin: {
    name: "Aspirin",
    disease: "Pain, Fever, Blood thinning",
    dosage: "300–900 mg every 6 hours",
    precautions: ["Not for children below 16"],
    sideEffects: "Stomach irritation",
    manufacturer: "Disprin",
    verified: true,
  },
};

/* ===============================
   COMPONENT
   =============================== */

const TabletChecker = () => {
  const [image, setImage] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* IMAGE UPLOAD */
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

  /* VERIFY LOGIC */
  const handleVerify = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const key = textInput.toLowerCase().trim();

      if (!key) {
        toast.error("Enter medicine name or imprint");
        setLoading(false);
        return;
      }

      const found = medicineDatabase[key];

      if (found) {
        setResult(found);
        toast.success("Medicine verified");
      } else {
        setResult({
          name: "Unknown medicine",
          verified: false,
        });
        toast.error("Medicine not found");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 space-y-8">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Tablet Checker</h1>
          <p className="text-muted-foreground mt-2">
            Upload tablet image or enter medicine name
          </p>
        </div>

        {/* UPLOAD */}
        <div className="space-y-3">
          <Label>Upload Tablet Image (optional)</Label>
          <label className="flex items-center justify-center border border-dashed rounded-lg p-6 cursor-pointer">
            <Upload className="mr-2" />
            <span>Click to upload</span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </label>

          {image && (
            <img
              src={image}
              alt="tablet"
              className="max-h-48 mx-auto rounded-md"
            />
          )}
        </div>

        {/* INPUT */}
        <div className="space-y-3">
          <Label>Medicine Name / Imprint</Label>
          <Input
            placeholder="e.g. paracetamol"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <Button
          onClick={handleVerify}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Verifying..." : "Verify Tablet"}
        </Button>

        {/* RESULT */}
        {result && (
          <div className="border rounded-lg p-4">
            {result.verified ? (
              <>
                <h2 className="font-semibold text-lg">{result.name}</h2>
                <p><strong>Used for:</strong> {result.disease}</p>
                <p><strong>Dosage:</strong> {result.dosage}</p>
                <p><strong>Manufacturer:</strong> {result.manufacturer}</p>
              </>
            ) : (
              <p className="text-red-500">Medicine not verified</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default TabletChecker;
