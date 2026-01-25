"use client";

import { useState } from "react";
import {
  Upload,
  CheckCircle,
  Volume2,
  Moon,
  Sun,
  ShieldCheck,
  Activity,
} from "lucide-react";

/* ---------------- DATA ---------------- */
const MEDICINE_DB = [
  {
    name: "Paracetamol",
    treats: "Fever, Mild to moderate pain",
    manufacturer: "GSK Pharmaceuticals",
    dosage: "500–1000mg every 4–6 hours",
    precautions: ["Do not exceed 4000mg/day", "Avoid alcohol"],
    sideEffects: "Nausea, liver damage in overdose",
    confidence: 98,
  },
];

/* ---------------- COMPONENT ---------------- */
export default function TabletChecker() {
  const [dark, setDark] = useState(false);
  const [verified, setVerified] = useState(false);
  const [scanning, setScanning] = useState(false);

  const medicine = MEDICINE_DB[0];

  const speak = (text: string) => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    speechSynthesis.speak(u);
  };

  const startVerification = () => {
    setScanning(true);
    setVerified(false);

    setTimeout(() => {
      setScanning(false);
      setVerified(true);
    }, 2500);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        dark ? "bg-[#050b14] text-white" : "bg-[#f6f9fc] text-gray-900"
      }`}
    >
      {/* GRID BACKGROUND (HOME MATCH) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-cyan-400" />
          <h1 className="text-xl font-bold holographic-text">
            MedGuard AI
          </h1>
        </div>
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg bg-white/10 backdrop-blur"
        >
          {dark ? <Sun /> : <Moon />}
        </button>
      </div>

      {/* MAIN CARD */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mt-10">
        <div className="glass-card p-10 rounded-3xl shadow-2xl">
          {/* STATUS */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold holographic-text">
              Tablet Verification
            </h2>
            <span className="px-4 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-300 flex items-center gap-2">
              <Activity size={14} /> AI ACTIVE
            </span>
          </div>

          {/* INPUT AREA */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* UPLOAD */}
            <div className="border-2 border-dashed rounded-2xl p-8 text-center hover:border-cyan-400 transition">
              <Upload className="mx-auto mb-3 text-cyan-400" size={40} />
              <p className="opacity-80">Upload Tablet Image</p>
            </div>

            {/* ACTION */}
            <div className="flex flex-col justify-center gap-4">
              <button
                onClick={startVerification}
                className="w-full py-4 rounded-xl text-white font-semibold holographic-button"
              >
                Verify Tablet
              </button>

              {scanning && (
                <p className="text-cyan-400 animate-pulse">
                  🔍 AI Scanning tablet authenticity...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* VERIFIED RESULT */}
        {verified && (
          <div className="mt-12 space-y-8">
            {/* VERIFIED BANNER */}
            <div className="verified-banner">
              <CheckCircle size={36} />
              <div>
                <h3 className="text-xl font-bold">Verified Authentic</h3>
                <p>AI Confidence Score: {medicine.confidence}%</p>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* MED INFO */}
              <InfoCard
                title="Medication Info"
                content={`${medicine.treats}\n${medicine.manufacturer}`}
                speak={() =>
                  speak(
                    `Medication treats ${medicine.treats}. Manufactured by ${medicine.manufacturer}`
                  )
                }
              />

              {/* DOSAGE */}
              <InfoCard
                title="Dosage Information"
                content={medicine.dosage}
                speak={() => speak(medicine.dosage)}
              />
            </div>
          </div>
        )}
      </div>

      {/* STYLES */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .holographic-text {
          background: linear-gradient(90deg, #0ea5e9, #06b6d4, #10b981);
          -webkit-background-clip: text;
          color: transparent;
        }

        .holographic-button {
          background: linear-gradient(90deg, #0ea5e9, #10b981);
          box-shadow: 0 0 30px rgba(14, 165, 233, 0.6);
        }

        .verified-banner {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          border-radius: 20px;
          background: linear-gradient(
            90deg,
            rgba(14, 165, 233, 0.25),
            rgba(16, 185, 129, 0.25)
          );
          box-shadow: 0 0 40px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  );
}

/* ---------------- SUB COMPONENT ---------------- */
function InfoCard({
  title,
  content,
  speak,
}: {
  title: string;
  content: string;
  speak: () => void;
}) {
  return (
    <div className="glass-card p-6 rounded-2xl relative">
      <button
        onClick={speak}
        className="absolute top-4 right-4 opacity-70 hover:opacity-100"
      >
        <Volume2 />
      </button>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="opacity-80 whitespace-pre-line">{content}</p>
    </div>
  );
}
