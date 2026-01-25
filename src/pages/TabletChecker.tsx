import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Upload, Volume2 } from "lucide-react";

/* ---------------- MEDICINE DATABASE (EXTENDABLE TO 150+) ---------------- */
const MED_DB: any = {
  paracetamol: {
    name: "Paracetamol",
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
  const globeRef = useRef<HTMLDivElement>(null);
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [verified, setVerified] = useState<boolean | null>(null);

  /* ---------------- VERIFY ---------------- */
  const verifyTablet = () => {
    const data = MED_DB[tablet.toLowerCase()];
    if (data) {
      setResult(data);
      setVerified(true);
    } else {
      setResult(null);
      setVerified(false);
    }
  };

  /* ---------------- TEXT TO SPEECH ---------------- */
  const speak = () => {
    if (!result) return;
    const text = `
      ${result.name}.
      Treats ${result.treats}.
      Dosage ${result.dosage}.
    `;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANG_MAP[language];
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };

  /* ---------------- 3D GLOBE ---------------- */
  useEffect(() => {
    if (!globeRef.current || verified === null) return;
    globeRef.current.innerHTML = "";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(320, 320);
    globeRef.current.appendChild(renderer.domElement);

    const color = verified ? 0x34d399 : 0xef4444;

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 32, 32),
      new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      })
    );
    scene.add(sphere);

    /* TEXT INSIDE GLOBE */
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = verified ? "#34d399" : "#ef4444";
    ctx.font = "bold 48px Inter";
    ctx.textAlign = "center";
    ctx.fillText(verified ? "VERIFIED" : "UNVERIFIED", 256, 140);

    const textTexture = new THREE.CanvasTexture(canvas);
    const textMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 1),
      new THREE.MeshBasicMaterial({ map: textTexture, transparent: true })
    );
    scene.add(textMesh);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    return () => renderer.dispose();
  }, [verified]);

  return (
    <div className="pt-24 pb-16">

      {/* INPUT CARD */}
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl grid md:grid-cols-2 gap-6">

        {/* UPLOAD */}
        <label className="border-dashed border-2 rounded-xl h-44 flex items-center justify-center cursor-pointer relative">
          {image ? (
            <img src={image} className="h-full object-contain" />
          ) : (
            <div className="text-center">
              <Upload className="mx-auto" />
              <p>Click to upload</p>
              <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
            </div>
          )}
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) =>
              e.target.files && setImage(URL.createObjectURL(e.target.files[0]))
            }
          />
        </label>

        {/* INPUTS */}
        <div className="flex flex-col gap-4">
          <input
            placeholder="e.g. IBU 200 or Ibuprofen"
            value={tablet}
            onChange={(e) => setTablet(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
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

      {/* VERIFIED CARD */}
      {verified !== null && (
        <div
          className={`max-w-5xl mx-auto mt-10 p-6 rounded-2xl shadow-xl border
          ${verified ? "bg-emerald-50 border-emerald-400" : "bg-red-50 border-red-400"}`}
        >
          <p className="font-semibold text-lg">
            {verified ? "Verified Authentic" : "Not Verified"}
          </p>
          <p className="text-slate-500">
            {verified
              ? "This tablet has been successfully verified"
              : "This tablet is not found in our database"}
          </p>
        </div>
      )}

      {/* 3D GLOBE */}
      {verified !== null && (
        <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-10 flex justify-center">
          <div ref={globeRef} />
        </div>
      )}

      {/* INFO */}
      {result && (
        <>
          <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold flex items-center gap-2">
                Medication Info
                <button onClick={speak}>
                  <Volume2 className="text-emerald-500" />
                </button>
              </h3>
              <p><b>Name:</b> {result.name}</p>
              <p><b>Treats:</b> {result.treats}</p>
              <p><b>Manufacturer:</b> {result.manufacturer}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">Dosage Information</h3>
              <p>{result.dosage}</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold">Precautions</h3>
            <ul className="list-disc pl-6">
              {result.precautions.map((p: string) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold">Possible Side Effects</h3>
            <p>{result.sideEffects}</p>
          </div>
        </>
      )}
    </div>
  );
}
