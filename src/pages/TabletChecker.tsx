import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Volume2 } from "lucide-react";

/* ---------------- TYPES ---------------- */
type Language = "en" | "es" | "fr" | "de" | "hi" | "zh";
type PageState = "idle" | "verified";

/* ---------------- STATIC DATA ---------------- */
const languageNames: Record<Language, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  hi: "Hindi",
  zh: "Chinese",
};

const medicine = {
  name: "Paracetamol",
  treats: "Fever, Headache, Mild to moderate pain",
  manufacturer: "Crocin, Dolo 650",
  dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
  precautions: [
    "Do not exceed maximum daily dose",
    "Avoid alcohol consumption",
    "Check other medicines for paracetamol content",
    "Consult doctor if fever persists",
  ],
  sideEffects: "Rare allergic reactions; liver damage in overdose",
};

/* ---------------- PAGE ---------------- */
export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [state, setState] = useState<PageState>("idle");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-14">

        {/* HEADER */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            Tablet Verification
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Upload an image or enter tablet details for instant AI verification.
            MedGuard AI is for informational purposes only. Always consult a
            licensed doctor or pharmacist before medication use.
          </p>
        </section>

        {/* INPUT CARD */}
        <section className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h3 className="font-semibold text-lg">Upload Tablet Image</h3>

          <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Upload className="h-8 w-8" />
            <span>Click to upload</span>
            <span className="text-xs">Tablet image (optional)</span>
          </div>

          <div className="space-y-2">
            <Label>Tablet Imprint / Name</Label>
            <Input
              placeholder="e.g., IBU 200 or Ibuprofen"
              value={tablet}
              onChange={(e) => setTablet(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Language</Label>
            <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languageNames).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-emerald-500"
            onClick={() => setState("verified")}
          >
            Verify Tablet
          </Button>
        </section>

        {/* VERIFIED SECTION */}
        {state === "verified" && (
          <section className="space-y-12">

            {/* 3D HOLOGRAM VERIFICATION */}
            <div className="flex justify-center py-10">
              <div className="relative w-72 h-72 perspective-[1200px]">

                <div className="absolute inset-0 rounded-full border border-emerald-400/40 animate-spin-slow" />
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-ping" />
                <div className="absolute inset-6 rounded-full border border-cyan-400/30 animate-pulse" />

                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 shadow-[0_0_80px_rgba(34,211,238,0.6)] flex items-center justify-center transform-gpu rotate-x-12 rotate-y-12 animate-float">
                  <div className="text-center text-white">
                    <div className="text-6xl font-extrabold drop-shadow-xl">✓</div>
                    <p className="mt-2 text-sm tracking-widest font-semibold">
                      VERIFIED
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-emerald-500 font-semibold">
                    Verified Authentic
                  </p>
                  <p className="text-xs text-muted-foreground">
                    AI security seal confirmed
                  </p>
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Medication Info</h3>
                  <Volume2 className="text-muted-foreground" />
                </div>
                <p><b>Name:</b> {medicine.name}</p>
                <p><b>Treats:</b> {medicine.treats}</p>
                <p><b>Manufacturer:</b> {medicine.manufacturer}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Dosage Information</h3>
                  <Volume2 className="text-muted-foreground" />
                </div>
                <p>{medicine.dosage}</p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">Precautions</h3>
              <ul className="space-y-2">
                {medicine.precautions.map((p, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="h-2 w-2 mt-2 rounded-full bg-emerald-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-2">
              <h3 className="font-semibold text-lg">Possible Side Effects</h3>
              <p className="text-muted-foreground">
                {medicine.sideEffects}
              </p>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <Button
                className="px-10 h-11 bg-blue-600"
                onClick={() => setState("idle")}
              >
                Check Another Tablet
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

