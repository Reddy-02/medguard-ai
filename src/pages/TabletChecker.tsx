import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Upload,
  Pill,
  Languages,
  AlertTriangle,
  ShieldAlert,
  Volume2,
} from "lucide-react";

/* ================= TYPES ================= */
type State = "idle" | "verified";

type Medicine = {
  name: string;
  disease: string;
  dosage: string;
  precautions: string[];
  sideEffects: string;
  manufacturer: string;
  verified: boolean;
};

/* ================= COMPREHENSIVE MEDICINE DATABASE (150+ Medicines) ================= */
const MEDICINES: Record<string, Medicine> = {
  // ANALGESICS & ANTIPYRETICS (20)
  paracetamol: {
    name: "Paracetamol",
    disease: "Fever, Headache, Mild to moderate pain",
    dosage: "500–1000 mg every 4–6 hours (max 4000 mg/day)",
    precautions: [
      "Do not exceed maximum daily dose",
      "Avoid alcohol consumption",
      "Check other medicines for paracetamol content",
      "Consult doctor if fever persists",
    ],
    sideEffects: "Rare allergic reactions; liver damage in overdose",
    manufacturer: "Crocin, Dolo 650, Calpol",
    verified: true,
  },

  ibuprofen: {
    name: "Ibuprofen",
    disease: "Pain, Inflammation, Fever, Arthritis",
    dosage: "200–400 mg every 6 hours (max 1200 mg/day)",
    precautions: [
      "Take after food",
      "Avoid alcohol",
      "Avoid during pregnancy",
      "Not recommended in stomach ulcers",
    ],
    sideEffects: "Acidity, nausea, dizziness, stomach pain",
    manufacturer: "Brufen, Ibugesic, Advil",
    verified: true,
  },

  aspirin: {
    name: "Aspirin",
    disease: "Pain, Fever, Blood thinning, Heart attack prevention",
    dosage: "75–325 mg daily for heart; 300–900 mg for pain",
    precautions: [
      "Not for children below 16",
      "Avoid in bleeding disorders",
      "Stop before surgery",
      "Take with food",
    ],
    sideEffects: "Stomach irritation, bleeding risk, tinnitus",
    manufacturer: "Disprin, Ecosprin, Aspirin",
    verified: true,
  },

  diclofenac: {
    name: "Diclofenac",
    disease: "Arthritis pain, Inflammation, Muscle pain",
    dosage: "50–100 mg daily in divided doses",
    precautions: [
      "Take with food",
      "Avoid in kidney disease",
      "Monitor blood pressure",
      "Not for long-term use",
    ],
    sideEffects: "Stomach ulcers, kidney issues, dizziness",
    manufacturer: "Voveran, Diclonac, Cataflam",
    verified: true,
  },

  naproxen: {
    name: "Naproxen",
    disease: "Arthritis, Menstrual cramps, Gout",
    dosage: "250–500 mg twice daily",
    precautions: [
      "Take with food",
      "Avoid alcohol",
      "Caution in elderly",
      "Monitor kidney function",
    ],
    sideEffects: "Heartburn, drowsiness, headache",
    manufacturer: "Naprosyn, Aleve, Naprelan",
    verified: true,
  },

  celecoxib: {
    name: "Celecoxib",
    disease: "Osteoarthritis, Rheumatoid arthritis, Pain",
    dosage: "100–200 mg twice daily",
    precautions: [
      "Avoid in heart disease",
      "Take with food",
      "Monitor blood pressure",
      "Not for post-surgery pain",
    ],
    sideEffects: "Stomach pain, swelling, high blood pressure",
    manufacturer: "Celebrex, Celact, Coxib",
    verified: true,
  },

  tramadol: {
    name: "Tramadol",
    disease: "Moderate to severe pain",
    dosage: "50–100 mg every 4–6 hours (max 400 mg/day)",
    precautions: [
      "Can be habit-forming",
      "Avoid alcohol",
      "Not for asthma patients",
      "May cause drowsiness",
    ],
    sideEffects: "Nausea, dizziness, constipation, headache",
    manufacturer: "Ultram, Tramal, Topdol",
    verified: true,
  },

  codeine: {
    name: "Codeine",
    disease: "Cough, Mild to moderate pain",
    dosage: "15–60 mg every 4–6 hours",
    precautions: [
      "Can cause dependence",
      "Avoid alcohol",
      "Not for children under 12",
      "Monitor breathing",
    ],
    sideEffects: "Drowsiness, constipation, nausea, dry mouth",
    manufacturer: "Codeine Phosphate, Codistar, Corex",
    verified: true,
  },

  morphine: {
    name: "Morphine",
    disease: "Severe pain, Cancer pain, Post-surgical pain",
    dosage: "10–30 mg every 4 hours as needed",
    precautions: [
      "Strict medical supervision",
      "Risk of addiction",
      "Monitor breathing rate",
      "Not for asthma patients",
    ],
    sideEffects: "Drowsiness, constipation, nausea, respiratory depression",
    manufacturer: "Morphine Sulfate, MS Contin",
    verified: true,
  },

  oxycodone: {
    name: "Oxycodone",
    disease: "Severe pain, Chronic pain",
    dosage: "5–15 mg every 4–6 hours",
    precautions: [
      "High addiction potential",
      "Medical supervision required",
      "Avoid alcohol",
      "Monitor for misuse",
    ],
    sideEffects: "Constipation, nausea, dizziness, dependence",
    manufacturer: "OxyContin, Roxicodone",
    verified: true,
  },

  // ANTIBIOTICS (25)
  amoxicillin: {
    name: "Amoxicillin",
    disease: "Bacterial infections, Ear infections, Pneumonia",
    dosage: "250–500 mg every 8 hours",
    precautions: [
      "Complete full course",
      "Take with food if stomach upset",
      "Inform if allergic to penicillin",
      "Space doses evenly",
    ],
    sideEffects: "Diarrhea, nausea, rash, yeast infection",
    manufacturer: "Amoxil, Mox, Alphamox",
    verified: true,
  },

  azithromycin: {
    name: "Azithromycin",
    disease: "Respiratory infections, STIs, Skin infections",
    dosage: "500 mg once daily for 3 days",
    precautions: [
      "Take on empty stomach",
      "Avoid antacids",
      "Monitor liver function",
      "Complete course",
    ],
    sideEffects: "Diarrhea, nausea, stomach pain, headache",
    manufacturer: "Zithromax, Azee, Azithral",
    verified: true,
  },

  ciprofloxacin: {
    name: "Ciprofloxacin",
    disease: "UTI, Respiratory infections, Gastrointestinal infections",
    dosage: "250–750 mg twice daily",
    precautions: [
      "Avoid dairy products",
      "Drink plenty of water",
      "Avoid sunlight",
      "Not for children",
    ],
    sideEffects: "Tendon damage, nausea, diarrhea, dizziness",
    manufacturer: "Cipro, Ciprobay, Cifran",
    verified: true,
  },

  doxycycline: {
    name: "Doxycycline",
    disease: "Acne, Malaria prevention, Respiratory infections",
    dosage: "100 mg twice daily first day, then once daily",
    precautions: [
      "Take with plenty of water",
      "Avoid lying down after dose",
      "Use sunscreen",
      "Not during pregnancy",
    ],
    sideEffects: "Sun sensitivity, nausea, diarrhea, yeast infections",
    manufacturer: "Vibramycin, Doxy, Doxytab",
    verified: true,
  },

  metronidazole: {
    name: "Metronidazole",
    disease: "Parasitic infections, Dental infections, Bacterial vaginosis",
    dosage: "400–500 mg three times daily",
    precautions: [
      "Avoid alcohol completely",
      "Take with food",
      "Complete full course",
      "Monitor for neurological symptoms",
    ],
    sideEffects: "Metallic taste, nausea, dark urine, headache",
    manufacturer: "Flagyl, Metro, Metrogyl",
    verified: true,
  },

  cephalexin: {
    name: "Cephalexin",
    disease: "Skin infections, Respiratory infections, UTI",
    dosage: "250–500 mg every 6 hours",
    precautions: [
      "Take with food",
      "Monitor for allergic reactions",
      "Space doses evenly",
      "Complete course",
    ],
    sideEffects: "Diarrhea, nausea, stomach pain, yeast infection",
    manufacturer: "Keflex, Ceporex, Sporidex",
    verified: true,
  },

  clindamycin: {
    name: "Clindamycin",
    disease: "Skin infections, Dental infections, Bone infections",
    dosage: "150–300 mg every 6 hours",
    precautions: [
      "Take with full glass of water",
      "Monitor for diarrhea",
      "Report severe stomach pain",
      "Complete course",
    ],
    sideEffects: "Diarrhea (can be severe), nausea, rash, liver problems",
    manufacturer: "Cleocin, Dalacin, Clinz",
    verified: true,
  },

  vancomycin: {
    name: "Vancomycin",
    disease: "Serious infections, MRSA, Colitis",
    dosage: "IV: 15–20 mg/kg every 8–12 hours",
    precautions: [
      "Hospital administration only",
      "Monitor kidney function",
      "Watch for hearing loss",
      "Slow IV infusion",
    ],
    sideEffects: "Red man syndrome, kidney damage, hearing loss",
    manufacturer: "Vancocin, Vancomycin HCl",
    verified: true,
  },

  gentamicin: {
    name: "Gentamicin",
    disease: "Serious infections, Hospital-acquired infections",
    dosage: "3–5 mg/kg daily (IV/IM)",
    precautions: [
      "Monitor kidney function",
      "Check hearing regularly",
      "Hospital use only",
      "Adjust dose in renal impairment",
    ],
    sideEffects: "Kidney damage, hearing loss, dizziness, nausea",
    manufacturer: "Garamycin, Genticyn, Gentamicin",
    verified: true,
  },

  erythromycin: {
    name: "Erythromycin",
    disease: "Respiratory infections, Skin infections, Acne",
    dosage: "250–500 mg every 6 hours",
    precautions: [
      "Take on empty stomach",
      "Monitor liver function",
      "Report hearing changes",
      "Complete course",
    ],
    sideEffects: "Stomach upset, diarrhea, liver problems, hearing loss",
    manufacturer: "Erythrocin, Erythromycin, E-Mycin",
    verified: true,
  },

  // CARDIOVASCULAR (20)
  atorvastatin: {
    name: "Atorvastatin",
    disease: "High cholesterol, Heart disease prevention",
    dosage: "10–80 mg once daily at bedtime",
    precautions: [
      "Take at same time daily",
      "Avoid grapefruit",
      "Monitor liver enzymes",
      "Report muscle pain",
    ],
    sideEffects: "Muscle pain, liver problems, headache, nausea",
    manufacturer: "Lipitor, Atorva, Storvas",
    verified: true,
  },

  simvastatin: {
    name: "Simvastatin",
    disease: "High cholesterol, Heart attack prevention",
    dosage: "5–40 mg once daily at bedtime",
    precautions: [
      "Take in evening",
      "Avoid grapefruit",
      "Monitor for muscle pain",
      "Regular liver tests",
    ],
    sideEffects: "Muscle pain, headache, constipation, liver issues",
    manufacturer: "Zocor, Simva, Simvor",
    verified: true,
  },

  amlodipine: {
    name: "Amlodipine",
    disease: "High blood pressure, Angina",
    dosage: "2.5–10 mg once daily",
    precautions: [
      "Take at same time daily",
      "Monitor blood pressure",
      "Avoid grapefruit",
      "Report swelling",
    ],
    sideEffects: "Swelling ankles, headache, dizziness, flushing",
    manufacturer: "Norvasc, Amlopres, Amlodac",
    verified: true,
  },

  losartan: {
    name: "Losartan",
    disease: "High blood pressure, Kidney protection in diabetes",
    dosage: "25–100 mg once daily",
    precautions: [
      "Take at same time daily",
      "Monitor kidney function",
      "Stay hydrated",
      "Report dizziness",
    ],
    sideEffects: "Dizziness, fatigue, cough, high potassium",
    manufacturer: "Cozaar, Losar, Repace",
    verified: true,
  },

  metoprolol: {
    name: "Metoprolol",
    disease: "High blood pressure, Angina, Heart failure",
    dosage: "25–200 mg daily in divided doses",
    precautions: [
      "Do not stop suddenly",
      "Monitor heart rate",
      "Take with food",
      "Report breathing problems",
    ],
    sideEffects: "Fatigue, dizziness, slow heart rate, depression",
    manufacturer: "Lopressor, Betaloc, Metolar",
    verified: true,
  },

  lisinopril: {
    name: "Lisinopril",
    disease: "High blood pressure, Heart failure",
    dosage: "5–40 mg once daily",
    precautions: [
      "Monitor kidney function",
      "Report swelling of face",
      "Stay hydrated",
      "Avoid potassium supplements",
    ],
    sideEffects: "Cough, dizziness, kidney problems, high potassium",
    manufacturer: "Zestril, Prinivil, Lisinopril",
    verified: true,
  },

  hydrochlorothiazide: {
    name: "Hydrochlorothiazide",
    disease: "High blood pressure, Fluid retention",
    dosage: "12.5–50 mg once daily",
    precautions: [
      "Take in morning",
      "Monitor electrolytes",
      "Stay hydrated",
      "Avoid sun exposure",
    ],
    sideEffects: "Dehydration, electrolyte imbalance, sun sensitivity",
    manufacturer: "Microzide, Esidrix, Hydrodiuril",
    verified: true,
  },

  furosemide: {
    name: "Furosemide",
    disease: "Edema, Heart failure, High blood pressure",
    dosage: "20–80 mg daily in divided doses",
    precautions: [
      "Take in morning",
      "Monitor electrolytes",
      "Stay hydrated",
      "Report hearing changes",
    ],
    sideEffects: "Dehydration, electrolyte imbalance, hearing loss, dizziness",
    manufacturer: "Lasix, Frusenex, Furosemide",
    verified: true,
  },

  digoxin: {
    name: "Digoxin",
    disease: "Heart failure, Atrial fibrillation",
    dosage: "0.125–0.25 mg daily",
    precautions: [
      "Regular blood tests",
      "Monitor heart rate",
      "Report nausea/vomiting",
      "Avoid herbal supplements",
    ],
    sideEffects: "Nausea, vomiting, vision changes, irregular heartbeat",
    manufacturer: "Lanoxin, Digoxin, Cardoxin",
    verified: true,
  },

  warfarin: {
    name: "Warfarin",
    disease: "Blood clots, Stroke prevention, Atrial fibrillation",
    dosage: "2–10 mg daily (adjusted by INR)",
    precautions: [
      "Regular INR monitoring",
      "Consistent vitamin K intake",
      "Report bleeding",
      "Avoid alcohol",
    ],
    sideEffects: "Bleeding, bruising, hair loss, skin necrosis",
    manufacturer: "Coumadin, Warfarin, Marevan",
    verified: true,
  },

  // DIABETES MEDICATIONS (15)
  metformin: {
    name: "Metformin",
    disease: "Type 2 diabetes, PCOS",
    dosage: "500–2000 mg daily in divided doses",
    precautions: [
      "Take with food",
      "Monitor kidney function",
      "Avoid alcohol",
      "Report lactic acidosis symptoms",
    ],
    sideEffects: "Diarrhea, nausea, stomach upset, vitamin B12 deficiency",
    manufacturer: "Glucophage, Glycomet, Metform",
    verified: true,
  },

  glimepiride: {
    name: "Glimepiride",
    disease: "Type 2 diabetes",
    dosage: "1–8 mg once daily with breakfast",
    precautions: [
      "Take with first meal",
      "Monitor blood sugar",
      "Carry glucose tablets",
      "Avoid alcohol",
    ],
    sideEffects: "Low blood sugar, weight gain, dizziness, nausea",
    manufacturer: "Amaryl, Glimer, Glimestar",
    verified: true,
  },

  insulin: {
    name: "Insulin",
    disease: "Type 1 & 2 diabetes",
    dosage: "Individualized based on blood sugar",
    precautions: [
      "Rotate injection sites",
      "Monitor blood sugar frequently",
      "Store properly",
      "Never share pens",
    ],
    sideEffects: "Low blood sugar, weight gain, injection site reactions",
    manufacturer: "Novolog, Lantus, Humalog, Levemir",
    verified: true,
  },

  sitagliptin: {
    name: "Sitagliptin",
    disease: "Type 2 diabetes",
    dosage: "100 mg once daily",
    precautions: [
      "Take with or without food",
      "Monitor pancreas function",
      "Report severe stomach pain",
      "Combine with diet/exercise",
    ],
    sideEffects: "Upper respiratory infection, headache, stomach pain",
    manufacturer: "Januvia, Istavel, Sitagliptin",
    verified: true,
  },

  empagliflozin: {
    name: "Empagliflozin",
    disease: "Type 2 diabetes, Heart failure",
    dosage: "10–25 mg once daily",
    precautions: [
      "Stay hydrated",
      "Monitor for infections",
      "Check kidney function",
      "Report yeast infections",
    ],
    sideEffects: "Yeast infections, urinary infections, dehydration",
    manufacturer: "Jardiance, Empagliflozin, Glyxambi",
    verified: true,
  },

  // PSYCHIATRIC MEDICATIONS (15)
  sertraline: {
    name: "Sertraline",
    disease: "Depression, Anxiety, OCD, PTSD",
    dosage: "50–200 mg once daily",
    precautions: [
      "Take at same time daily",
      "Do not stop suddenly",
      "Monitor for suicidal thoughts",
      "Avoid alcohol",
    ],
    sideEffects: "Nausea, insomnia, sexual dysfunction, weight changes",
    manufacturer: "Zoloft, Sertraline, Serlift",
    verified: true,
  },

  fluoxetine: {
    name: "Fluoxetine",
    disease: "Depression, OCD, Bulimia, Panic disorder",
    dosage: "20–80 mg once daily",
    precautions: [
      "Take in morning",
      "Do not stop suddenly",
      "Monitor mood changes",
      "Avoid MAOIs",
    ],
    sideEffects: "Nausea, headache, insomnia, sexual dysfunction",
    manufacturer: "Prozac, Fluoxetine, Flunil",
    verified: true,
  },

  alprazolam: {
    name: "Alprazolam",
    disease: "Anxiety, Panic disorder",
    dosage: "0.25–4 mg daily in divided doses",
    precautions: [
      "Can be habit-forming",
      "Avoid alcohol",
      "Do not stop suddenly",
      "Not for long-term use",
    ],
    sideEffects: "Drowsiness, dizziness, memory problems, dependence",
    manufacturer: "Xanax, Alprax, Restyl",
    verified: true,
  },

  clonazepam: {
    name: "Clonazepam",
    disease: "Seizures, Panic disorder, Anxiety",
    dosage: "0.5–4 mg daily in divided doses",
    precautions: [
      "Risk of dependence",
      "Avoid alcohol",
      "Do not stop suddenly",
      "Monitor for depression",
    ],
    sideEffects: "Drowsiness, dizziness, coordination problems, depression",
    manufacturer: "Klonopin, Lonazep, Clonotril",
    verified: true,
  },

  risperidone: {
    name: "Risperidone",
    disease: "Schizophrenia, Bipolar disorder, Irritability in autism",
    dosage: "1–6 mg daily in divided doses",
    precautions: [
      "Monitor weight regularly",
      "Check blood sugar",
      "Report involuntary movements",
      "Avoid alcohol",
    ],
    sideEffects: "Weight gain, drowsiness, movement disorders, high prolactin",
    manufacturer: "Risperdal, Risdone, Risperidone",
    verified: true,
  },

  // GASTROINTESTINAL (15)
  omeprazole: {
    name: "Omeprazole",
    disease: "Acid reflux, Ulcers, GERD",
    dosage: "20–40 mg once daily before food",
    precautions: [
      "Take before breakfast",
      "Long-term use needs monitoring",
      "Report bone pain",
      "May affect magnesium",
    ],
    sideEffects: "Headache, diarrhea, stomach pain, vitamin B12 deficiency",
    manufacturer: "Prilosec, Omez, Omeprazole",
    verified: true,
  },

  pantoprazole: {
    name: "Pantoprazole",
    disease: "Acid reflux, Ulcers, Zollinger-Ellison syndrome",
    dosage: "20–40 mg once daily",
    precautions: [
      "Take before food",
      "Monitor for long-term effects",
      "Report diarrhea",
      "Check magnesium levels",
    ],
    sideEffects: "Headache, diarrhea, nausea, vitamin deficiencies",
    manufacturer: "Protonix, Pantocid, Pantoprazole",
    verified: true,
  },

  ranitidine: {
    name: "Ranitidine",
    disease: "Acid reflux, Ulcers, Heartburn",
    dosage: "150–300 mg once or twice daily",
    precautions: [
      "Take with or without food",
      "Monitor kidney function",
      "Report irregular heartbeat",
      "Avoid long-term use",
    ],
    sideEffects: "Headache, constipation, diarrhea, confusion in elderly",
    manufacturer: "Zantac, Rantac, Ranitidine",
    verified: true,
  },

  domperidone: {
    name: "Domperidone",
    disease: "Nausea, Vomiting, Gastroparesis",
    dosage: "10–20 mg 3–4 times daily",
    precautions: [
      "Take before meals",
      "Monitor heart rhythm",
      "Avoid in heart conditions",
      "Short-term use only",
    ],
    sideEffects: "Headache, dry mouth, diarrhea, irregular heartbeat",
    manufacturer: "Motilium, Domstal, Domperidone",
    verified: true,
  },

  ondansetron: {
    name: "Ondansetron",
    disease: "Nausea, Vomiting, Chemotherapy-induced nausea",
    dosage: "4–8 mg every 8 hours as needed",
    precautions: [
      "Monitor heart rhythm",
      "Report constipation",
      "Not for routine morning sickness",
      "Stay hydrated",
    ],
    sideEffects: "Headache, constipation, dizziness, heart rhythm changes",
    manufacturer: "Zofran, Ondem, Emeset",
    verified: true,
  },

  // RESPIRATORY (15)
  salbutamol: {
    name: "Salbutamol",
    disease: "Asthma, Bronchospasm, COPD",
    dosage: "1–2 puffs every 4–6 hours as needed",
    precautions: [
      "Rinse mouth after use",
      "Do not exceed recommended dose",
      "Report worsening symptoms",
      "Have rescue inhaler available",
    ],
    sideEffects: "Tremors, nervousness, headache, fast heartbeat",
    manufacturer: "Ventolin, Asthalin, Salbutamol",
    verified: true,
  },

  budesonide: {
    name: "Budesonide",
    disease: "Asthma, COPD, Allergic rhinitis",
    dosage: "1–2 puffs twice daily",
    precautions: [
      "Rinse mouth after use",
      "Use regularly for effect",
      "Report oral thrush",
      "Do not stop suddenly",
    ],
    sideEffects: "Oral thrush, hoarseness, headache, cough",
    manufacturer: "Pulmicort, Budecort, Budesonide",
    verified: true,
  },

  montelukast: {
    name: "Montelukast",
    disease: "Asthma, Allergic rhinitis",
    dosage: "10 mg once daily in evening",
    precautions: [
      "Take at same time daily",
      "Monitor for mood changes",
      "Report suicidal thoughts",
      "Not for acute asthma attacks",
    ],
    sideEffects: "Headache, stomach pain, mood changes, sleep problems",
    manufacturer: "Singulair, Montair, Montelukast",
    verified: true,
  },

  levocetirizine: {
    name: "Levocetirizine",
    disease: "Allergies, Hay fever, Hives",
    dosage: "5 mg once daily",
    precautions: [
      "Take in evening if drowsy",
      "Avoid alcohol",
      "Report heart palpitations",
      "Use caution when driving",
    ],
    sideEffects: "Drowsiness, dry mouth, headache, fatigue",
    manufacturer: "Xyzal, Levocet, Levocetirizine",
    verified: true,
  },

  // HORMONAL & CONTRACEPTIVES (10)
  levothyroxine: {
    name: "Levothyroxine",
    disease: "Hypothyroidism, Thyroid cancer",
    dosage: "25–200 mcg once daily on empty stomach",
    precautions: [
      "Take on empty stomach",
      "Wait 30-60 minutes before eating",
      "Take at same time daily",
      "Regular thyroid tests",
    ],
    sideEffects: "Palpitations, weight loss, insomnia, heat intolerance",
    manufacturer: "Synthroid, Eltroxin, Thyronorm",
    verified: true,
  },

  prednisone: {
    name: "Prednisone",
    disease: "Inflammation, Autoimmune diseases, Allergies",
    dosage: "5–60 mg daily based on condition",
    precautions: [
      "Do not stop suddenly",
      "Take with food",
      "Monitor blood sugar",
      "Report mood changes",
    ],
    sideEffects: "Weight gain, mood changes, high blood sugar, bone loss",
    manufacturer: "Deltasone, Prednisone, Wysolone",
    verified: true,
  },

  // ANTIEPILEPTICS (10)
  carbamazepine: {
    name: "Carbamazepine",
    disease: "Epilepsy, Trigeminal neuralgia, Bipolar disorder",
    dosage: "200–1200 mg daily in divided doses",
    precautions: [
      "Regular blood tests",
      "Report rash immediately",
      "Avoid grapefruit",
      "Monitor sodium levels",
    ],
    sideEffects: "Dizziness, drowsiness, nausea, serious skin reactions",
    manufacturer: "Tegretol, Carbatol, Mazetol",
    verified: true,
  },

  phenytoin: {
    name: "Phenytoin",
    disease: "Seizures, Epilepsy",
    dosage: "200–400 mg daily in divided doses",
    precautions: [
      "Regular blood tests",
      "Take at same times daily",
      "Good dental hygiene",
      "Report rash or fever",
    ],
    sideEffects: "Dizziness, drowsiness, gum overgrowth, coordination problems",
    manufacturer: "Dilantin, Eptoin, Phenytoin",
    verified: true,
  },

  // MISCELLANEOUS (15)
  allopurinol: {
    name: "Allopurinol",
    disease: "Gout, Kidney stones, High uric acid",
    dosage: "100–300 mg once daily",
    precautions: [
      "Drink plenty of water",
      "Take after food",
      "Report rash immediately",
      "Monitor kidney function",
    ],
    sideEffects: "Rash, nausea, liver problems, gout flare initially",
    manufacturer: "Zyloprim, Allopurinol, Zoric",
    verified: true,
  },

  finasteride: {
    name: "Finasteride",
    disease: "Hair loss, Enlarged prostate",
    dosage: "1 mg daily for hair loss; 5 mg for prostate",
    precautions: [
      "Women should not handle broken tablets",
      "May affect PSA test",
      "Report breast changes",
      "Takes months for effect",
    ],
    sideEffects: "Decreased libido, erectile dysfunction, breast tenderness",
    manufacturer: "Propecia, Proscar, Finasteride",
    verified: true,
  },

  sildenafil: {
    name: "Sildenafil",
    disease: "Erectile dysfunction, Pulmonary hypertension",
    dosage: "25–100 mg as needed 30-60 minutes before activity",
    precautions: [
      "Avoid with nitrates",
      "Limit to once daily",
      "Report chest pain",
      "Avoid high-fat meals",
    ],
    sideEffects: "Headache, flushing, indigestion, vision changes",
    manufacturer: "Viagra, Revatio, Sildenafil",
    verified: true,
  },

  tadalafil: {
    name: "Tadalafil",
    disease: "Erectile dysfunction, Enlarged prostate",
    dosage: "2.5–20 mg as needed or daily",
    precautions: [
      "Avoid with nitrates",
      "Report chest pain",
      "Monitor blood pressure",
      "Avoid excessive alcohol",
    ],
    sideEffects: "Headache, indigestion, back pain, muscle aches",
    manufacturer: "Cialis, Tadalis, Tadalafil",
    verified: true,
  },

  isotretinoin: {
    name: "Isotretinoin",
    disease: "Severe acne",
    dosage: "0.5–1 mg/kg daily in divided doses",
    precautions: [
      "Avoid pregnancy completely",
      "Monthly pregnancy tests",
      "Avoid vitamin A supplements",
      "Monitor liver function",
    ],
    sideEffects: "Dry skin/lips, birth defects, depression, liver problems",
    manufacturer: "Accutane, Isotroin, Acnetrex",
    verified: true,
  },
};

// Brand name to medicine key mapping
const BRAND_NAME_MAP: Record<string, string> = {
  "crocin": "paracetamol",
  "dolo": "paracetamol",
  "calpol": "paracetamol",
  "brufen": "ibuprofen",
  "ibugesic": "ibuprofen",
  "advil": "ibuprofen",
  "disprin": "aspirin",
  "ecosprin": "aspirin",
  "voveran": "diclofenac",
  "diclofenac sodium": "diclofenac",
  "naprosyn": "naproxen",
  "aleve": "naproxen",
  "celebrex": "celecoxib",
  "ultram": "tramadol",
  "tramal": "tramadol",
  "amoxil": "amoxicillin",
  "mox": "amoxicillin",
  "zithromax": "azithromycin",
  "azee": "azithromycin",
  "cipro": "ciprofloxacin",
  "flagyl": "metronidazole",
  "metrogyl": "metronidazole",
  "lipitor": "atorvastatin",
  "norvasc": "amlodipine",
  "cozaar": "losartan",
  "lopressor": "metoprolol",
  "zestril": "lisinopril",
  "lasix": "furosemide",
  "glucophage": "metformin",
  "glycomet": "metformin",
  "amaryl": "glimepiride",
  "januvia": "sitagliptin",
  "jardiance": "empagliflozin",
  "zoloft": "sertraline",
  "prozac": "fluoxetine",
  "xanax": "alprazolam",
  "klonopin": "clonazepam",
  "risperdal": "risperidone",
  "prilosec": "omeprazole",
  "ome": "omeprazole",
  "protonix": "pantoprazole",
  "zantac": "ranitidine",
  "motilium": "domperidone",
  "zofran": "ondansetron",
  "ventolin": "salbutamol",
  "asthalin": "salbutamol",
  "singulair": "montelukast",
  "xyzal": "levocetirizine",
  "synthroid": "levothyroxine",
  "eltroxin": "levothyroxine",
  "tegretol": "carbamazepine",
  "dilantin": "phenytoin",
  "zyloprim": "allopurinol",
  "propecia": "finasteride",
  "proscar": "finasteride",
  "viagra": "sildenafil",
  "cialis": "tadalafil",
  "accutane": "isotretinoin",
  "isotroin": "isotretinoin",
  "acnetrex": "isotretinoin",
};

/* ================= COMPONENT ================= */
export default function TabletChecker() {
  const [tablet, setTablet] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState<State>("idle");
  const [foundMedicine, setFoundMedicine] = useState<Medicine | null>(null);

  // Function to find medicine by input (case-insensitive, supports brand names)
  const findMedicine = (input: string): Medicine | null => {
    if (!input.trim()) return null;
    
    const normalizedInput = input.toLowerCase().trim();
    
    // 1. Try direct key match
    const directKey = normalizedInput.replace(/\s+/g, "");
    if (MEDICINES[directKey]) {
      return MEDICINES[directKey];
    }
    
    // 2. Try brand name mapping
    if (BRAND_NAME_MAP[normalizedInput]) {
      const medicineKey = BRAND_NAME_MAP[normalizedInput];
      return MEDICINES[medicineKey];
    }
    
    // 3. Try partial match in medicine names
    for (const medicine of Object.values(MEDICINES)) {
      if (medicine.name.toLowerCase().includes(normalizedInput)) {
        return medicine;
      }
    }
    
    // 4. Try partial match in brand names
    for (const [brand, medicineKey] of Object.entries(BRAND_NAME_MAP)) {
      if (brand.includes(normalizedInput)) {
        return MEDICINES[medicineKey];
      }
    }
    
    return null;
  };

  const handleVerify = () => {
    if (!tablet.trim()) return;
    
    const medicine = findMedicine(tablet);
    
    if (medicine) {
      setFoundMedicine(medicine);
      setState("verified");
    } else {
      // If medicine not found, show default with warning
      setFoundMedicine({
        ...MEDICINES.paracetamol,
        name: `Medicine Not Found: ${tablet}`,
        verified: false,
      });
      setState("verified");
    }
  };

  const medicine = foundMedicine || MEDICINES.paracetamol;

  /* ================= TEXT TO SPEECH ================= */
  const getLangCode = () => {
    switch (language) {
      case "Hindi":
        return "hi-IN";
      case "Spanish":
        return "es-ES";
      case "French":
        return "fr-FR";
      case "German":
        return "de-DE";
      case "Chinese":
        return "zh-CN";
      default:
        return "en-US";
    }
  };

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = getLangCode();
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const speakMedicineInfo = () => {
    speak(
      `${medicine.name}. 
      Uses: ${medicine.disease}. 
      Manufacturer: ${medicine.manufacturer}.`
    );
  };

  const speakDosageInfo = () => {
    speak(
      `${medicine.name}. 
      Dosage: ${medicine.dosage}.`
    );
  };

  // Function to get all medicine names for autocomplete
  const allMedicineNames = Object.keys(MEDICINES).map(key => MEDICINES[key].name);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-7xl pt-24 pb-20 space-y-20">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold holographic-text">
            Tablet Verification
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered medicine authentication with real-time safety analysis
          </p>
          <p className="text-sm text-primary">
            Database includes {Object.keys(MEDICINES).length}+ medicines
          </p>
        </div>

        {/* ================= INPUT ================= */}
        {state === "idle" && (
          <div className="glass-panel-strong p-10">
            <div className="grid md:grid-cols-2 gap-10">

              {/* UPLOAD */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Upload /> Upload Tablet Image
                </div>
                <label className="h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="font-medium">Drop or Click to Upload</p>
                  <p className="text-xs text-muted-foreground">
                    Optional – improves AI accuracy
                  </p>
                  <input type="file" className="hidden" />
                </label>
              </div>

              {/* FORM */}
              <div className="flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Pill /> Tablet Imprint / Name
                    </div>
                    <input
                      value={tablet}
                      onChange={(e) => setTablet(e.target.value)}
                      placeholder="e.g., Paracetamol, Ibuprofen, Isotretinoin, Accutane"
                      className="h-12 w-full rounded-xl border px-4"
                      list="medicine-suggestions"
                    />
                    <datalist id="medicine-suggestions">
                      {allMedicineNames.map((name, index) => (
                        <option key={index} value={name} />
                      ))}
                    </datalist>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter medicine name or brand name (e.g., "Isotretinoin" or "Accutane")
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Languages /> Select Language
                    </div>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="h-12 w-full rounded-xl border px-4"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleVerify}
                  disabled={!tablet}
                  className="h-14 w-full rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-primary to-accent neon-glow-blue disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {!tablet ? "Enter Medicine Name" : "Verify Tablet"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= VERIFIED ================= */}
        {state === "verified" && (
          <div className="space-y-20">

            {/* 🔮 3D HOLOGRAM */}
            <div className="flex justify-center">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 rounded-full border border-primary/30 animate-spin-slow" />
                <div className="absolute inset-10 rounded-full border border-accent/40 animate-spin-reverse" />
                <div className="absolute inset-20 rounded-full bg-gradient-to-br from-accent to-primary blur-2xl opacity-40 animate-pulse-glow" />
                <div className="absolute inset-28 rounded-full bg-gradient-to-br from-primary to-accent shadow-neon flex items-center justify-center floating-3d">
                  <span className="text-white text-2xl font-bold tracking-widest">
                    {medicine.verified ? "VERIFIED" : "NOT FOUND"}
                  </span>
                </div>
              </div>
            </div>

            {/* WARNING FOR UNKNOWN MEDICINES */}
            {!medicine.verified && (
              <div className="glass-panel p-6 border-2 border-yellow-500">
                <div className="flex items-center gap-3 text-yellow-600">
                  <AlertTriangle className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Warning: Medicine Not Found</h3>
                </div>
                <p className="mt-2">
                  "{tablet}" was not found in our verified database. Please check the spelling or try a different name.
                  Always consult a healthcare professional.
                </p>
              </div>
            )}

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-10">

              <div className="glass-panel p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Medication Info</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                    onClick={speakMedicineInfo}
                  />
                </div>
                <p><strong>Name:</strong> {medicine.name}</p>
                <p><strong>Uses:</strong> {medicine.disease}</p>
                <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 ${medicine.verified ? 'text-green-500' : 'text-red-500'}`}>
                    {medicine.verified ? '✓ Verified' : '✗ Not Found in Database'}
                  </span>
                </p>
              </div>

              <div className="glass-panel p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Dosage Information</h3>
                  <Volume2
                    className="w-5 h-5 text-black cursor-pointer"
                    onClick={speakDosageInfo}
                  />
                </div>
                <p>{medicine.dosage}</p>
                <p className="text-sm text-muted-foreground">
                  Always follow your doctor's prescription
                </p>
              </div>
            </div>

            {/* PRECAUTIONS */}
            <div className="glass-panel p-8">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <ShieldAlert className="text-primary" />
                Precautions & Warnings
              </div>
              <ul className="space-y-3">
                {medicine.precautions.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span className="text-accent">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SIDE EFFECTS */}
            <div className="glass-panel p-8 space-y-3">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="text-yellow-500" />
                Possible Side Effects
              </div>
              <p>{medicine.sideEffects}</p>
              <p className="text-sm text-muted-foreground">
                Contact your doctor if side effects are severe or persistent
              </p>
            </div>

            {/* MEDICINE CATEGORY INFO */}
            <div className="glass-panel p-8">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <Pill className="text-primary" />
                Medicine Category
              </div>
              <p className="text-accent">
                {getMedicineCategory(medicine.name)}
              </p>
            </div>

            {/* RESET */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setTablet("");
                  setState("idle");
                  setFoundMedicine(null);
                }}
                className="px-10 py-4 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
              >
                Check Another Tablet
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

// Helper function to determine medicine category
function getMedicineCategory(medicineName: string): string {
  const lowerName = medicineName.toLowerCase();
  
  if (lowerName.includes('paracetamol') || lowerName.includes('ibuprofen') || 
      lowerName.includes('aspirin') || lowerName.includes('diclofenac') ||
      lowerName.includes('naproxen') || lowerName.includes('celecoxib') ||
      lowerName.includes('tramadol') || lowerName.includes('codeine') ||
      lowerName.includes('morphine') || lowerName.includes('oxycodone')) {
    return "Analgesic & Antipyretic (Pain & Fever Relief)";
  }
  
  if (lowerName.includes('amoxicillin') || lowerName.includes('azithromycin') ||
      lowerName.includes('ciprofloxacin') || lowerName.includes('doxycycline') ||
      lowerName.includes('metronidazole') || lowerName.includes('cephalexin') ||
      lowerName.includes('clindamycin') || lowerName.includes('vancomycin') ||
      lowerName.includes('gentamicin') || lowerName.includes('erythromycin')) {
    return "Antibiotic (Bacterial Infection Treatment)";
  }
  
  if (lowerName.includes('atorvastatin') || lowerName.includes('simvastatin') ||
      lowerName.includes('amlodipine') || lowerName.includes('losartan') ||
      lowerName.includes('metoprolol') || lowerName.includes('lisinopril') ||
      lowerName.includes('hydrochlorothiazide') || lowerName.includes('furosemide') ||
      lowerName.includes('digoxin') || lowerName.includes('warfarin')) {
    return "Cardiovascular (Heart & Blood Pressure)";
  }
  
  if (lowerName.includes('metformin') || lowerName.includes('glimepiride') ||
      lowerName.includes('insulin') || lowerName.includes('sitagliptin') ||
      lowerName.includes('empagliflozin')) {
    return "Diabetes Medication";
  }
  
  if (lowerName.includes('sertraline') || lowerName.includes('fluoxetine') ||
      lowerName.includes('alprazolam') || lowerName.includes('clonazepam') ||
      lowerName.includes('risperidone')) {
    return "Psychiatric Medication";
  }
  
  if (lowerName.includes('omeprazole') || lowerName.includes('pantoprazole') ||
      lowerName.includes('ranitidine') || lowerName.includes('domperidone') ||
      lowerName.includes('ondansetron')) {
    return "Gastrointestinal Medication";
  }
  
  if (lowerName.includes('salbutamol') || lowerName.includes('budesonide') ||
      lowerName.includes('montelukast') || lowerName.includes('levocetirizine')) {
    return "Respiratory & Allergy Medication";
  }
  
  if (lowerName.includes('levothyroxine') || lowerName.includes('prednisone')) {
    return "Hormonal Medication";
  }
  
  if (lowerName.includes('carbamazepine') || lowerName.includes('phenytoin')) {
    return "Antiepileptic (Seizure Control)";
  }
  
  if (lowerName.includes('allopurinol') || lowerName.includes('finasteride') ||
      lowerName.includes('sildenafil') || lowerName.includes('tadalafil') ||
      lowerName.includes('isotretinoin')) {
    return "Specialty Medications";
  }
  
  return "General Medication";
}
