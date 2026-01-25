import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Upload, Volume2 } from "lucide-react";

/* ================= MEDICINE DATABASE (SAMPLE – EXTEND TO 150+) ================= */
const MED_DB: Record<string, any> = {
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

const LANGS: Record<string, string> = {
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
  const [data, setData] = useState<any>(null);
  const [verified, setVerified] = useState<boolean | null>(null);

  /* ================= VERIFY ================= */
  const verifyTablet = () => {
    const med = MED_DB[tablet.toLowerCase()];
    if (med) {
      setData(med);
      setVerified(true);
    } else {
      setData(null);
      setVerified(false);
    }
  };

  /* ================= SPEAK ================= */
  const speak = () => {
    if (!data) return;
    const text = `
      ${data.name}.
      Treats ${data.treats}.
      Dosage ${data.dosage}.
    `;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANGS[language];
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };

  /* ================= 3D VERIFIED GLOBE ================= */
  useEffect(() => {
    if (!globeRef.current || verified === null) return;
    globeRef.current.innerHTML = "";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(340, 340);
    globeRef.current.appendChild(renderer.domElement);

    const mainColor = verified ? 0x6ee7b7 : 0xf87171;

    /* Outer dense wireframe globe */
    const globe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, 4),
      new THREE.MeshBasicMaterial({
        color: mainColor,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      })
    );
    scene.add(globe);

    /* Inner ring */
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.9, 1, 64),
      new THREE.MeshBasicMaterial({
        color: mainColor,
        transparent: true,
        opacity: 0.9,
      })
    );
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    /* TEXT INSIDE */
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = verified ? "#6ee7b7" : "#f87171";
    ctx.font = "bold 42px Inter";
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
      globe.rotation.y += 0.0018;
      globe.rotation.x += 0.0012;
      ring.rotation.z += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    return () => renderer.dispose();
  }, [verified]);

  return (
    <div className="pt-24 pb-16">

      {/* ================= INPUT CARD ================= */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-6">

        {/* Upload */}
        <label className="border-2 border-dashed rounded-xl h-44 flex items-center justify-center cursor-pointer">
          {image ? (
            <img src={image} className="h-full object-contain" />
          ) : (
            <div className="text-center">
              <Upload className="mx-auto mb-2" />
              <p>Click to upload</p>
              <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
            </div>
          )}
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) =>
              e.target.files &&
              setImage(URL.createObjectURL(e.target.files[0]))
            }
          />
        </label>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            className="border rounded-xl px-4 py-3"
            placeholder="e.g. IBU 200 or Ibuprofen"
            value={tablet}
            onChange={(e) => setTablet(e.target.value)}
          />

          <select
            className="border rounded-xl px-4 py-3"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {Object.keys(LANGS).map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>

          <button
            onClick={verifyTablet}
            className="rounded-xl py-4 text-white bg-gradient-to-r from-blue-600 to-emerald-400"
          >
            Verify Tablet
          </button>
        </div>
      </div>

      {/* ================= VERIFIED CARD ================= */}
      {verified !== null && (
        <div
          className={`max-w-5xl mx-auto mt-10 p-6 rounded-2xl border shadow-xl
          ${verified ? "bg-emerald-50 border-emerald-400" : "bg-red-50 border-red-400"}`}
        >
          <h3 className="font-semibold text-lg">
            {verified ? "Verified Authentic" : "Not Verified"}
          </h3>
          <p className="text-slate-500">
            {verified
              ? "This tablet has been successfully verified"
              : "This tablet is not found in our database"}
          </p>
        </div>
      )}

      {/* ================= 3D GLOBE ================= */}
      {verified !== null && (
        <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-10 flex justify-center">
          <div ref={globeRef} />
        </div>
      )}

      {/* ================= DETAILS ================= */}
      {data && (
        <>
          <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold flex items-center gap-2">
                Medication Info
                <button onClick={speak}>
                  <Volume2 className="text-emerald-500" />
                </button>
              </h3>
              <p><b>Name:</b> {data.name}</p>
              <p><b>Treats:</b> {data.treats}</p>
              <p><b>Manufacturer:</b> {data.manufacturer}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">Dosage Information</h3>
              <p>{data.dosage}</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold">Precautions</h3>
            <ul className="list-disc pl-6">
              {data.precautions.map((p: string) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="max-w-5xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold">Possible Side Effects</h3>
            <p>{data.sideEffects}</p>
          </div>
        </>
      )}
    </div>
  );
}
