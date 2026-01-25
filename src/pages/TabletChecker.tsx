import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Upload, Volume2, CheckCircle, XCircle } from "lucide-react";

/* ---------------- MEDICINE DB (SAMPLE – extend to 150+) ---------------- */
const MED_DB: any = {
  paracetamol: {
    name: "Paracetamol 500mg",
    treats: "Fever, Headache, Mild to moderate pain",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    manufacturer: "Crocin, Dolo 650",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol consumption",
      "Check other medicines for paracetamol content",
      "Consult doctor if fever persists",
    ],
    sideEffects: "Rare allergic reactions; liver damage in overdose",
  },
};

const LANG_MAP: any = {
  English: "en-US",
  Hindi: "hi-IN",
  Spanish: "es-ES",
  French: "fr-FR",
  German: "de-DE",
  Chinese: "zh-CN",
};

export default function TabletChecker() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [tablet, setTablet] = useState("");
  const [lang, setLang] = useState("English");
  const [verified, setVerified] = useState<any>(null);
  const [status, setStatus] = useState<"verified" | "fake" | null>(null);

  /* ---------------- VERIFY ---------------- */
  const verifyTablet = () => {
    const data = MED_DB[tablet.toLowerCase()];
    if (data) {
      setVerified(data);
      setStatus("verified");
    } else {
      setVerified(null);
      setStatus("fake");
    }
  };

  /* ---------------- TEXT TO SPEECH ---------------- */
  const speak = () => {
    if (!verified) return;
    const text = `
      ${verified.name}.
      Treats ${verified.treats}.
      Dosage ${verified.dosage}.
    `;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = LANG_MAP[lang];
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  /* ---------------- TRUE 3D GLOBE ---------------- */
  useEffect(() => {
    if (!mountRef.current || !status) return;

    mountRef.current.innerHTML = "";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    mountRef.current.appendChild(renderer.domElement);

    const color = status === "verified" ? 0x34d399 : 0xef4444;

    const geometry = new THREE.SphereGeometry(1.3, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.003;
      sphere.rotation.x += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    return () => renderer.dispose();
  }, [status]);

  return (
    <div className="pt-24 pb-16">

      {/* INPUT CARD (UNCHANGED UI) */}
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl grid md:grid-cols-2 gap-6">
        <label className="border-dashed border-2 rounded-xl flex flex-col items-center justify-center h-44 cursor-pointer">
          <Upload />
          <span>Click to upload</span>
          <input type="file" className="hidden" />
        </label>

        <div className="flex flex-col gap-4">
          <input
            placeholder="paracetamol"
            value={tablet}
            onChange={(e) => setTablet(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            {Object.keys(LANG_MAP).map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>

          <button
            onClick={verifyTablet}
            className="py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-400 text-white"
          >
            Verify Tablet
          </button>
        </div>
      </div>

      {/* VERIFIED AUTHENTIC CARD */}
      {status && (
        <>
          <div
            className={`max-w-5xl mx-auto mt-10 p-6 rounded-2xl shadow-xl flex gap-4 items-center
            ${status === "verified"
              ? "bg-emerald-50 border border-emerald-400 shadow-emerald-300/50"
              : "bg-red-50 border border-red-400 shadow-red-300/50"}
            animate-pulse`}
          >
            {status === "verified" ? (
              <CheckCircle className="text-emerald-500 w-8 h-8" />
            ) : (
              <XCircle className="text-red-500 w-8 h-8" />
            )}
            <div>
              <p className="font-semibold text-lg">
                {status === "verified" ? "Verified Authentic" : "Not Verified"}
              </p>
              <p className="text-slate-500">
                {status === "verified"
                  ? "This tablet has been successfully verified"
                  : "This tablet was not found in our database"}
              </p>
            </div>
          </div>

          {/* TRUE 3D GLOBE */}
          <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-10 flex justify-center">
            <div ref={mountRef} />
          </div>
        </>
      )}

      {/* INFO */}
      {verified && (
        <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold flex items-center gap-2">
              Medication Info
              <button onClick={speak}>
                <Volume2 className="text-emerald-500" />
              </button>
            </h3>
            <p><b>Name:</b> {verified.name}</p>
            <p><b>Treats:</b> {verified.treats}</p>
            <p><b>Manufacturer:</b> {verified.manufacturer}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold">Dosage Information</h3>
            <p>{verified.dosage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
