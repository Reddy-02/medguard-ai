import { useState } from "react";
import { Upload, Image as ImageIcon, Type, Globe2, Volume2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    
    // Simulate API call
    setTimeout(() => {
      setResult({
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
      });
      setLoading(false);
      toast.success("Tablet verified successfully!");
    }, 2000);
  };

  const handlePlayAudio = () => {
    toast.info("Audio playback not yet implemented");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="holographic-text">Tablet Checker</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload an image or enter tablet details to verify
            </p>
          </div>

          {/* Main Input Section */}
          <div className="glass-panel-strong p-8 lg:p-12 mb-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Upload */}
              <div className="space-y-4">
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
                    {image ? (
                      <img
                        src={image}
                        alt="Uploaded tablet"
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-primary group-hover:neon-glow-blue transition-all" />
                        <p className="text-lg font-medium mb-2">Click to upload</p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Text Input */}
              <div className="space-y-6">
                <div className="space-y-4">
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
                </div>

                <div className="space-y-4">
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
                </div>

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
                    "Check Tablet"
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* Verification Status */}
              <div className={`glass-panel-strong p-6 border-2 ${result.verified ? 'border-accent/50 neon-glow-green' : 'border-destructive/50'}`}>
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
              </div>

              {/* Detailed Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 hover-lift">
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
                </div>

                <div className="glass-panel p-6 hover-lift">
                  <h3 className="text-xl font-bold mb-4">Dosage Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {result.dosage}
                  </p>
                </div>

                <div className="glass-panel p-6 hover-lift md:col-span-2">
                  <h3 className="text-xl font-bold mb-4">Precautions</h3>
                  <ul className="space-y-2">
                    {result.precautions.map((precaution: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-panel p-6 hover-lift md:col-span-2">
                  <h3 className="text-xl font-bold mb-4">Possible Side Effects</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {result.sideEffects}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
