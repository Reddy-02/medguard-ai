import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- TYPES ---------------- */
type Language = "en" | "es" | "fr" | "de" | "hi" | "zh";
type State = "idle" | "verifying" | "verified";

/* ---------------- PAGE ---------------- */
export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [state, setState] = useState<State>("idle");

  const verify = async () => {
    if (!tablet) return;
    setState("verifying");
    await new Promise((r) => setTimeout(r, 2000));
    setState("verified");
  };

  const reset = () => {
    setTablet("");
    setState("idle");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-7xl py-14 space-y-16">

        {/* ---------------- HEADER ---------------- */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold holographic-text">
            Tablet Verification
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload an image or enter tablet details for instant AI verification.
            Always consult a licensed doctor or pharmacist before use.
          </p>
        </div>

        {/* ---------------- INPUT CARD ---------------- */}
        {state !== "verified" && (
          <div className="glass-panel-strong max-w-6xl mx-auto p-10">
            <div className="grid md:grid-cols-2 gap-10 items-stretch">

              {/* LEFT : UPLOAD */}
              <label
                className="
                  flex flex-col items-center justify-center
                  h-full min-h-[280px]
                  border-2 border-dashed rounded-2xl
                  p-10 text-center cursor-pointer
                  transition hover:bg-secondary/50
                "
              >
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-semibold">Upload Tablet Image</p>
                <p className="text-sm text-muted-foreground">
                  Optional – improves AI accuracy
                </p>
                <input type="file" className="hidden" />
              </label>

              {/* RIGHT : FORM */}
              <div className="flex flex-col h-full">

                {/* Inputs */}
                <div className="flex-1 space-y-6">
                  <Input
                    className="h-12 text-base"
                    placeholder="e.g., Paracetamol / IBU 200"
                    value={tablet}
                    onChange={(e) => setTablet(e.target.value)}
                  />

                  <Select
                    value={language}
                    onValueChange={(v) => setLanguage(v as Language)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* VERIFY BUTTON (FIXED) */}
                <div className="pt-8">
                  <Button
                    onClick={verify}
                    disabled={!tablet || state === "verifying"}
                    className={cn(
                      "w-full h-14 text-lg font-semibold rounded-xl",
                      "bg-[var(--gradient-primary)] text-white",
                      "neon-glow-blue transition-all",
                      (!tablet || state === "verifying") &&
                        "opacity-60 cursor-not-allowed"
                    )}
                  >
                    {state === "verifying" ? "Verifying..." : "Verify Tablet"}
                  </Button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ---------------- VERIFIED RESULT ---------------- */}
        {state === "verified" && (
          <div className="space-y-14">

            {/* 3D VERIFIED HOLOGRAM */}
            <div className="flex justify-center py-16">
              <div className="relative w-80 h-80 flex items-center justify-center">

                <div className="absolute inset-0 rounded-full border border-accent/40 animate-pulse-glow" />
                <div className="absolute inset-6 rounded-full glass-panel neon-glow-green" />

                <div className="absolute inset-14 rounded-full bg-gradient-to-br
                  from-[hsl(var(--accent))]
                  via-[hsl(var(--neon-cyan))]
                  to-[hsl(var(--cyber-blue))]
                  neon-glow-green floating-3d
                  flex items-center justify-center
                ">
                  <div className="text-center text-white">
                    <CheckCircle2 className="h-20 w-20 mx-auto mb-2" />
                    <p className="text-xs tracking-[0.35em] font-semibold uppercase">
                      Verified
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-12 text-center">
                  <p className="text-lg font-semibold holographic-text">
                    Verified Authentic
                  </p>
                  <p className="text-xs text-muted-foreground">
                    AI Security Seal • Tamper Safe
                  </p>
                </div>
              </div>
            </div>

            {/* INFO SECTIONS */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

              <div className="glass-panel p-6 hover-lift">
                <h3 className="text-lg font-semibold mb-4">Medication Info</h3>
                <p><strong>Name:</strong> {tablet}</p>
                <p><strong>Uses:</strong> Fever, mild to moderate pain</p>
                <p><strong>Manufacturer:</strong> GSK Pharmaceuticals</p>
              </div>

              <div className="glass-panel p-6 hover-lift">
                <h3 className="text-lg font-semibold mb-4">
                  Dosage Information
                </h3>
                <p>500–1000 mg every 4–6 hours</p>
                <p className="text-sm text-muted-foreground">
                  Max 4000 mg/day
                </p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel max-w-6xl mx-auto p-6">
              <h3 className="text-lg font-semibold mb-4">Precautions</h3>
              <ul className="space-y-2 text-sm">
                <li>• Do not exceed maximum daily dose</li>
                <li>• Avoid alcohol consumption</li>
                <li>• Check other medicines for paracetamol</li>
                <li>• Consult doctor if symptoms persist</li>
              </ul>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <Button
                onClick={reset}
                className="px-10 h-12 text-base rounded-xl"
              >
                Check Another Tablet
              </Button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
