import { useState, useEffect } from "react";
import { Search, Upload, Volume2, Home, CheckCircle, AlertCircle } from "lucide-react";

// Medicine Database with 150+ entries
const MEDICINE_DB = [
  // Pain Relievers & Fever Reducers (20)
  { id: 1, name: "Paracetamol", strength: "500mg", type: "Analgesic", manufacturer: "GSK Pharmaceuticals", treats: "Fever, Mild to moderate pain", dosage: "500-1000mg every 4-6 hours", precautions: ["Do not exceed 4000mg/day", "Avoid alcohol", "Take with food if stomach upset occurs"], sideEffects: "Nausea, rash, liver damage in overdose" },
  { id: 2, name: "Ibuprofen", strength: "200mg", type: "NSAID", manufacturer: "Pfizer Inc", treats: "Pain, Inflammation, Fever", dosage: "200-400mg every 4-6 hours", precautions: ["Take with food", "Avoid if pregnant", "Monitor kidney function"], sideEffects: "Stomach upset, dizziness, bleeding risk" },
  { id: 3, name: "Aspirin", strength: "325mg", type: "Salicylate", manufacturer: "Bayer AG", treats: "Pain, Fever, Antiplatelet", dosage: "325-650mg every 4 hours", precautions: ["Avoid in children", "Take with food", "Monitor for bleeding"], sideEffects: "Stomach irritation, tinnitus, bleeding" },
  { id: 4, name: "Naproxen", strength: "250mg", type: "NSAID", manufacturer: "Roche Holding", treats: "Arthritis pain, Inflammation", dosage: "250-500mg twice daily", precautions: ["Take with food", "Avoid prolonged use", "Monitor blood pressure"], sideEffects: "Heartburn, headache, fluid retention" },
  { id: 5, name: "Diclofenac", strength: "50mg", type: "NSAID", manufacturer: "Novartis AG", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "50mg 2-3 times daily", precautions: ["Take with food", "Short-term use recommended", "Monitor liver function"], sideEffects: "Abdominal pain, nausea, liver enzyme elevation" },
  { id: 6, name: "Celecoxib", strength: "200mg", type: "COX-2 Inhibitor", manufacturer: "Pfizer Inc", treats: "Arthritis, Acute pain", dosage: "100-200mg twice daily", precautions: ["Cardiovascular risk", "Avoid in heart disease", "Take with food"], sideEffects: "Headache, abdominal pain, edema" },
  { id: 7, name: "Tramadol", strength: "50mg", type: "Opioid", manufacturer: "Johnson & Johnson", treats: "Moderate to severe pain", dosage: "50-100mg every 4-6 hours", precautions: ["Risk of addiction", "Avoid alcohol", "Caution in elderly"], sideEffects: "Dizziness, nausea, constipation, drowsiness" },
  { id: 8, name: "Codeine", strength: "30mg", type: "Opioid", manufacturer: "Sanofi SA", treats: "Mild to moderate pain, Cough", dosage: "15-60mg every 4-6 hours", precautions: ["Risk of dependence", "Avoid alcohol", "Monitor breathing"], sideEffects: "Drowsiness, constipation, nausea" },
  { id: 9, name: "Morphine", strength: "10mg", type: "Opioid", manufacturer: "Mallinckrodt Pharmaceuticals", treats: "Severe pain", dosage: "10-30mg every 4 hours", precautions: ["High risk of addiction", "Monitor respiratory rate", "Adjust dose in renal impairment"], sideEffects: "Respiratory depression, sedation, constipation" },
  { id: 10, name: "Oxycodone", strength: "5mg", type: "Opioid", manufacturer: "Purdue Pharma", treats: "Moderate to severe pain", dosage: "5-15mg every 4-6 hours", precautions: ["High abuse potential", "Monitor for dependence", "Avoid alcohol"], sideEffects: "Nausea, constipation, dizziness, respiratory depression" },
  { id: 11, name: "Hydrocodone", strength: "5mg", type: "Opioid", manufacturer: "Teva Pharmaceuticals", treats: "Moderate to severe pain", dosage: "5-10mg every 4-6 hours", precautions: ["Risk of addiction", "Avoid alcohol", "Monitor for misuse"], sideEffects: "Drowsiness, nausea, constipation, respiratory depression" },
  { id: 12, name: "Acetaminophen with Codeine", strength: "300/30mg", type: "Combination", manufacturer: "Janssen Pharmaceuticals", treats: "Moderate pain", dosage: "1-2 tablets every 4 hours", precautions: ["Do not exceed 4000mg acetaminophen/day", "Risk of addiction", "Avoid alcohol"], sideEffects: "Drowsiness, constipation, liver damage" },
  { id: 13, name: "Meloxicam", strength: "15mg", type: "NSAID", manufacturer: "Boehringer Ingelheim", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "7.5-15mg once daily", precautions: ["Take with food", "Monitor for GI bleeding", "Caution in elderly"], sideEffects: "Diarrhea, abdominal pain, edema" },
  { id: 14, name: "Ketorolac", strength: "10mg", type: "NSAID", manufacturer: "Roche Holding", treats: "Short-term moderate pain", dosage: "10mg every 4-6 hours", precautions: ["Short-term use only", "High risk of GI bleeding", "Monitor kidney function"], sideEffects: "GI bleeding, nausea, headache" },
  { id: 15, name: "Indomethacin", strength: "25mg", type: "NSAID", manufacturer: "Merck & Co", treats: "Gout, Arthritis", dosage: "25-50mg 2-3 times daily", precautions: ["Take with food", "Monitor for ulcers", "Avoid in elderly"], sideEffects: "Headache, dizziness, peptic ulcer" },
  { id: 16, name: "Piroxicam", strength: "20mg", type: "NSAID", manufacturer: "Pfizer Inc", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "20mg once daily", precautions: ["Take with food", "High risk of GI complications", "Monitor renal function"], sideEffects: "Dyspepsia, nausea, edema" },
  { id: 17, name: "Etodolac", strength: "400mg", type: "NSAID", manufacturer: "AbbVie Inc", treats: "Osteoarthritis, Pain", dosage: "400-1000mg daily in divided doses", precautions: ["Take with food", "Monitor for GI bleeding", "Caution in elderly"], sideEffects: "Dyspepsia, diarrhea, abdominal pain" },
  { id: 18, name: "Nabumetone", strength: "500mg", type: "NSAID", manufacturer: "GSK Pharmaceuticals", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "1000mg once daily", precautions: ["Take with food", "Monitor liver function", "Avoid in late pregnancy"], sideEffects: "Diarrhea, abdominal pain, dizziness" },
  { id: 19, name: "Sulindac", strength: "150mg", type: "NSAID", manufacturer: "Merck & Co", treats: "Osteoarthritis, Rheumatoid arthritis", dosage: "150-200mg twice daily", precautions: ["Take with food", "Monitor renal function", "Caution in elderly"], sideEffects: "GI pain, diarrhea, rash" },
  { id: 20, name: "Ketoprofen", strength: "100mg", type: "NSAID", manufacturer: "Sanofi SA", treats: "Rheumatoid arthritis, Osteoarthritis", dosage: "100-200mg daily in divided doses", precautions: ["Take with food", "Short-term use", "Monitor for GI bleeding"], sideEffects: "Dyspepsia, nausea, abdominal pain" },

  // Antibiotics (20)
  { id: 21, name: "Amoxicillin", strength: "500mg", type: "Antibiotic", manufacturer: "GSK Pharmaceuticals", treats: "Bacterial infections", dosage: "250-500mg every 8 hours", precautions: ["Complete full course", "Take with water", "Report allergic reactions"], sideEffects: "Diarrhea, nausea, rash" },
  { id: 22, name: "Azithromycin", strength: "250mg", type: "Macrolide", manufacturer: "Pfizer Inc", treats: "Respiratory infections", dosage: "500mg once daily for 3 days", precautions: ["Take on empty stomach", "Monitor QT interval", "Avoid antacids"], sideEffects: "Diarrhea, nausea, abdominal pain" },
  { id: 23, name: "Cephalexin", strength: "500mg", type: "Cephalosporin", manufacturer: "Lupin Pharmaceuticals", treats: "Skin infections, UTIs", dosage: "250-500mg every 6 hours", precautions: ["Take with food", "Complete full course", "Monitor for allergy"], sideEffects: "Diarrhea, nausea, rash" },
  { id: 24, name: "Doxycycline", strength: "100mg", type: "Tetracycline", manufacturer: "Mylan N.V.", treats: "Acne, Respiratory infections", dosage: "100mg twice daily", precautions: ["Take with water", "Avoid dairy products", "Use sunscreen"], sideEffects: "Photosensitivity, nausea, esophagitis" },
  { id: 25, name: "Ciprofloxacin", strength: "500mg", type: "Fluoroquinolone", manufacturer: "Bayer AG", treats: "UTIs, Respiratory infections", dosage: "250-750mg twice daily", precautions: ["Avoid antacids", "Monitor for tendonitis", "Stay hydrated"], sideEffects: "Nausea, diarrhea, tendon rupture risk" },
  { id: 26, name: "Levofloxacin", strength: "500mg", type: "Fluoroquinolone", manufacturer: "Janssen Pharmaceuticals", treats: "Pneumonia, Sinusitis", dosage: "250-750mg once daily", precautions: ["Avoid antacids", "Monitor blood sugar", "Report tendon pain"], sideEffects: "Nausea, insomnia, tendonitis" },
  { id: 27, name: "Metronidazole", strength: "500mg", type: "Antibiotic", manufacturer: "Pfizer Inc", treats: "Anaerobic infections, Parasites", dosage: "250-500mg three times daily", precautions: ["Avoid alcohol", "Take with food", "Complete full course"], sideEffects: "Metallic taste, nausea, dark urine" },
  { id: 28, name: "Clindamycin", strength: "300mg", type: "Lincosamide", manufacturer: "Pfizer Inc", treats: "Skin infections, Dental infections", dosage: "150-450mg every 6 hours", precautions: ["Take with full glass of water", "Monitor for diarrhea", "Report severe abdominal pain"], sideEffects: "Diarrhea, nausea, rash" },
  { id: 29, name: "Vancomycin", strength: "125mg", type: "Glycopeptide", manufacturer: "Pfizer Inc", treats: "MRSA infections", dosage: "125-500mg every 6-12 hours", precautions: ["IV administration only", "Monitor kidney function", "Check hearing"], sideEffects: "Red man syndrome, nephrotoxicity, ototoxicity" },
  { id: 30, name: "Linezolid", strength: "600mg", type: "Oxazolidinone", manufacturer: "Pfizer Inc", treats: "VRE infections, Pneumonia", dosage: "600mg every 12 hours", precautions: ["Monitor blood counts", "Avoid tyramine foods", "Short-term use"], sideEffects: "Thrombocytopenia, neuropathy, diarrhea" },
  { id: 31, name: "Meropenem", strength: "1g", type: "Carbapenem", manufacturer: "AstraZeneca", treats: "Severe infections", dosage: "1g every 8 hours", precautions: ["IV administration", "Monitor seizure risk", "Adjust in renal impairment"], sideEffects: "Diarrhea, rash, seizures" },
  { id: 32, name: "Piperacillin/Tazobactam", strength: "4.5g", type: "Penicillin/Beta-lactamase inhibitor", manufacturer: "Pfizer Inc", treats: "Hospital-acquired infections", dosage: "4.5g every 6-8 hours", precautions: ["IV administration", "Monitor kidney function", "Test for allergy"], sideEffects: "Diarrhea, rash, hypokalemia" },
  { id: 33, name: "Ceftriaxone", strength: "1g", type: "Cephalosporin", manufacturer: "Roche Holding", treats: "Meningitis, Gonorrhea", dosage: "1-2g once daily", precautions: ["IM/IV administration", "Monitor for diarrhea", "Avoid in penicillin allergy"], sideEffects: "Diarrhea, rash, gall bladder issues" },
  { id: 34, name: "Cefuroxime", strength: "500mg", type: "Cephalosporin", manufacturer: "GSK Pharmaceuticals", treats: "Respiratory infections, Lyme disease", dosage: "250-500mg twice daily", precautions: ["Take with food", "Complete full course", "Monitor for allergy"], sideEffects: "Diarrhea, nausea, rash" },
  { id: 35, name: "Trimethoprim/Sulfamethoxazole", strength: "160/800mg", type: "Sulfonamide", manufacturer: "Teva Pharmaceuticals", treats: "UTIs, Pneumocystis pneumonia", dosage: "1-2 tablets twice daily", precautions: ["Stay hydrated", "Monitor blood counts", "Avoid in G6PD deficiency"], sideEffects: "Rash, nausea, blood disorders" },
  { id: 36, name: "Nitrofurantoin", strength: "100mg", type: "Antibiotic", manufacturer: "Procter & Gamble", treats: "UTI prevention and treatment", dosage: "50-100mg four times daily", precautions: ["Take with food", "Avoid in renal impairment", "Monitor for pulmonary reactions"], sideEffects: "Nausea, pulmonary fibrosis, peripheral neuropathy" },
  { id: 37, name: "Fosfomycin", strength: "3g", type: "Antibiotic", manufacturer: "Zambon Company", treats: "Uncomplicated UTIs", dosage: "3g single dose", precautions: ["Take on empty stomach", "Mix with water", "Not for recurrent infections"], sideEffects: "Diarrhea, nausea, headache" },
  { id: 38, name: "Rifaximin", strength: "550mg", type: "Antibiotic", manufacturer: "Salix Pharmaceuticals", treats: "Traveler's diarrhea, Hepatic encephalopathy", dosage: "200mg three times daily or 550mg twice daily", precautions: ["Take with food", "Not for systemic infections", "Monitor liver function"], sideEffects: "Edema, dizziness, nausea" },
  { id: 39, name: "Daptomycin", strength: "500mg", type: "Lipopeptide", manufacturer: "Cubist Pharmaceuticals", treats: "Skin infections, Bacteremia", dosage: "4-6mg/kg once daily", precautions: ["IV administration", "Monitor CPK levels", "Adjust in renal impairment"], sideEffects: "Myopathy, rhabdomyolysis, diarrhea" },
  { id: 40, name: "Colistin", strength: "150mg", type: "Polymyxin", manufacturer: "Pfizer Inc", treats: "Multidrug-resistant Gram-negative infections", dosage: "2.5-5mg/kg/day in divided doses", precautions: ["IV administration", "Monitor kidney function", "Neurotoxicity risk"], sideEffects: "Nephrotoxicity, neurotoxicity, respiratory paralysis" },

  // Cardiovascular Drugs (20)
  { id: 41, name: "Atorvastatin", strength: "20mg", type: "Statin", manufacturer: "Pfizer Inc", treats: "High cholesterol", dosage: "10-80mg once daily", precautions: ["Take in evening", "Avoid grapefruit", "Monitor liver enzymes"], sideEffects: "Muscle pain, liver enzyme elevation, diabetes risk" },
  { id: 42, name: "Simvastatin", strength: "40mg", type: "Statin", manufacturer: "Merck & Co", treats: "High cholesterol", dosage: "5-40mg once daily", precautions: ["Take in evening", "Avoid grapefruit", "Monitor for muscle pain"], sideEffects: "Myopathy, liver dysfunction, headache" },
  { id: 43, name: "Rosuvastatin", strength: "10mg", type: "Statin", manufacturer: "AstraZeneca", treats: "High cholesterol", dosage: "5-40mg once daily", precautions: ["Take any time", "Monitor for proteinuria", "Asian patients need lower dose"], sideEffects: "Muscle pain, headache, abdominal pain" },
  { id: 44, name: "Lisinopril", strength: "10mg", type: "ACE Inhibitor", manufacturer: "AstraZeneca", treats: "Hypertension, Heart failure", dosage: "5-40mg once daily", precautions: ["Monitor potassium", "Check kidney function", "Report cough"], sideEffects: "Cough, dizziness, hyperkalemia" },
  { id: 45, name: "Losartan", strength: "50mg", type: "ARB", manufacturer: "Merck & Co", treats: "Hypertension, Diabetic nephropathy", dosage: "25-100mg once daily", precautions: ["Monitor potassium", "Check kidney function", "Avoid in pregnancy"], sideEffects: "Dizziness, hyperkalemia, back pain" },
  { id: 46, name: "Amlodipine", strength: "5mg", type: "Calcium Channel Blocker", manufacturer: "Pfizer Inc", treats: "Hypertension, Angina", dosage: "2.5-10mg once daily", precautions: ["Monitor for edema", "Take consistently", "Report palpitations"], sideEffects: "Edema, headache, flushing" },
  { id: 47, name: "Metoprolol", strength: "50mg", type: "Beta Blocker", manufacturer: "AstraZeneca", treats: "Hypertension, Angina, Heart failure", dosage: "25-200mg daily in divided doses", precautions: ["Do not stop abruptly", "Monitor heart rate", "Caution in asthma"], sideEffects: "Fatigue, dizziness, bradycardia" },
  { id: 48, name: "Carvedilol", strength: "12.5mg", type: "Beta Blocker", manufacturer: "GSK Pharmaceuticals", treats: "Heart failure, Hypertension", dosage: "3.125-25mg twice daily", precautions: ["Take with food", "Do not stop abruptly", "Monitor for dizziness"], sideEffects: "Dizziness, fatigue, hypotension" },
  { id: 49, name: "Furosemide", strength: "40mg", type: "Diuretic", manufacturer: "Sanofi SA", treats: "Edema, Hypertension", dosage: "20-80mg once or twice daily", precautions: ["Monitor electrolytes", "Take in morning", "Stay hydrated"], sideEffects: "Dehydration, electrolyte imbalance, hypotension" },
  { id: 50, name: "Hydrochlorothiazide", strength: "25mg", type: "Diuretic", manufacturer: "Merck & Co", treats: "Hypertension, Edema", dosage: "12.5-50mg once daily", precautions: ["Monitor electrolytes", "Take in morning", "Avoid in gout"], sideEffects: "Hypokalemia, dehydration, photosensitivity" },
  { id: 51, name: "Warfarin", strength: "5mg", type: "Anticoagulant", manufacturer: "Bristol-Myers Squibb", treats: "Blood clot prevention", dosage: "2-10mg once daily", precautions: ["Regular INR monitoring", "Consistent vitamin K intake", "Report bleeding"], sideEffects: "Bleeding, bruising, skin necrosis" },
  { id: 52, name: "Apixaban", strength: "5mg", type: "Anticoagulant", manufacturer: "Bristol-Myers Squibb", treats: "Stroke prevention in AF, DVT/PE", dosage: "2.5-5mg twice daily", precautions: ["Do not crush tablets", "Monitor renal function", "Report bleeding"], sideEffects: "Bleeding, anemia, nausea" },
  { id: 53, name: "Rivaroxaban", strength: "20mg", type: "Anticoagulant", manufacturer: "Bayer AG", treats: "Stroke prevention, DVT/PE", dosage: "10-20mg once daily", precautions: ["Take with food", "Monitor renal function", "Report unusual bleeding"], sideEffects: "Bleeding, anemia, dizziness" },
  { id: 54, name: "Clopidogrel", strength: "75mg", type: "Antiplatelet", manufacturer: "Sanofi SA", treats: "Heart attack prevention, Stroke", dosage: "75mg once daily", precautions: ["Do not stop abruptly", "Monitor for bleeding", "Genetic testing may be needed"], sideEffects: "Bleeding, bruising, rash" },
  { id: 55, name: "Ticagrelor", strength: "90mg", type: "Antiplatelet", manufacturer: "AstraZeneca", treats: "ACS prevention", dosage: "90mg twice daily", precautions: ["Take with aspirin", "Monitor for bleeding", "Report shortness of breath"], sideEffects: "Bleeding, dyspnea, bradycardia" },
  { id: 56, name: "Digoxin", strength: "0.25mg", type: "Cardiac Glycoside", manufacturer: "GlaxoSmithKline", treats: "Heart failure, AF", dosage: "0.125-0.25mg once daily", precautions: ["Monitor blood levels", "Check potassium", "Report visual changes"], sideEffects: "Nausea, vomiting, arrhythmias" },
  { id: 57, name: "Nitroglycerin", strength: "0.4mg", type: "Nitrate", manufacturer: "Pfizer Inc", treats: "Angina", dosage: "0.3-0.6mg sublingual as needed", precautions: ["Sit down before taking", "Store properly", "Avoid PDE5 inhibitors"], sideEffects: "Headache, hypotension, flushing" },
  { id: 58, name: "Isosorbide Mononitrate", strength: "30mg", type: "Nitrate", manufacturer: "AstraZeneca", treats: "Angina prevention", dosage: "30-120mg once daily", precautions: ["Take in morning", "Nitrate-free interval", "Avoid alcohol"], sideEffects: "Headache, dizziness, hypotension" },
  { id: 59, name: "Spironolactone", strength: "25mg", type: "Diuretic", manufacturer: "Pfizer Inc", treats: "Heart failure, Hypertension", dosage: "25-100mg once daily", precautions: ["Monitor potassium", "Avoid potassium supplements", "Report breast changes"], sideEffects: "Hyperkalemia, gynecomastia, menstrual irregularities" },
  { id: 60, name: "Eplerenone", strength: "25mg", type: "Diuretic", manufacturer: "Pfizer Inc", treats: "Heart failure, Hypertension", dosage: "25-50mg once daily", precautions: ["Monitor potassium", "Avoid grapefruit", "Check kidney function"], sideEffects: "Hyperkalemia, dizziness, fatigue" },

  // Gastrointestinal Drugs (20)
  { id: 61, name: "Omeprazole", strength: "20mg", type: "PPI", manufacturer: "AstraZeneca", treats: "GERD, Ulcers", dosage: "20-40mg once daily", precautions: ["Take before meals", "Long-term use risks", "Monitor magnesium"], sideEffects: "Headache, diarrhea, increased infection risk" },
  { id: 62, name: "Pantoprazole", strength: "40mg", type: "PPI", manufacturer: "Wyeth Pharmaceuticals", treats: "GERD, Erosive esophagitis", dosage: "20-40mg once daily", precautions: ["Take before meals", "Short-term use recommended", "Monitor for fractures"], sideEffects: "Headache, diarrhea, abdominal pain" },
  { id: 63, name: "Esomeprazole", strength: "40mg", type: "PPI", manufacturer: "AstraZeneca", treats: "GERD, H. pylori", dosage: "20-40mg once daily", precautions: ["Take before meals", "Monitor magnesium", "Report persistent diarrhea"], sideEffects: "Headache, diarrhea, abdominal pain" },
  { id: 64, name: "Ranitidine", strength: "150mg", type: "H2 Blocker", manufacturer: "GSK Pharmaceuticals", treats: "GERD, Ulcers", dosage: "150mg twice daily", precautions: ["Take with or without food", "Adjust in renal impairment", "Monitor liver function"], sideEffects: "Headache, constipation, dizziness" },
  { id: 65, name: "Famotidine", strength: "20mg", type: "H2 Blocker", manufacturer: "Merck & Co", treats: "GERD, Ulcers", dosage: "20-40mg twice daily", precautions: ["Take with or without food", "Adjust in renal impairment", "Monitor for confusion in elderly"], sideEffects: "Headache, dizziness, constipation" },
  { id: 66, name: "Sucralfate", strength: "1g", type: "Mucosal Protectant", manufacturer: "Aptalis Pharma", treats: "Duodenal ulcers", dosage: "1g four times daily", precautions: ["Take on empty stomach", "Space from other medications", "Monitor aluminum levels"], sideEffects: "Constipation, dry mouth, dizziness" },
  { id: 67, name: "Misoprostol", strength: "200mcg", type: "Prostaglandin", manufacturer: "Pfizer Inc", treats: "Ulcer prevention", dosage: "200mcg four times daily", precautions: ["Avoid in pregnancy", "Take with food", "Monitor for diarrhea"], sideEffects: "Diarrhea, abdominal pain, miscarriage risk" },
  { id: 68, name: "Metoclopramide", strength: "10mg", type: "Prokinetic", manufacturer: "Baxter International", treats: "Gastroparesis, Nausea", dosage: "10mg 30 minutes before meals", precautions: ["Short-term use", "Monitor for movement disorders", "Avoid in elderly"], sideEffects: "Drowsiness, restlessness, tardive dyskinesia" },
  { id: 69, name: "Ondansetron", strength: "8mg", type: "Antiemetic", manufacturer: "GlaxoSmithKline", treats: "Nausea, Vomiting", dosage: "8mg every 8 hours", precautions: ["Monitor ECG", "Risk of serotonin syndrome", "Adjust in liver impairment"], sideEffects: "Headache, constipation, QT prolongation" },
  { id: 70, name: "Dimenhydrinate", strength: "50mg", type: "Antiemetic", manufacturer: "Johnson & Johnson", treats: "Motion sickness, Nausea", dosage: "50-100mg every 4-6 hours", precautions: ["May cause drowsiness", "Avoid alcohol", "Caution when driving"], sideEffects: "Drowsiness, dry mouth, blurred vision" },
  { id: 71, name: "Loperamide", strength: "2mg", type: "Antidiarrheal", manufacturer: "Johnson & Johnson", treats: "Diarrhea", dosage: "4mg initially then 2mg after each loose stool", precautions: ["Maximum 16mg/day", "Not for bacterial diarrhea", "Stay hydrated"], sideEffects: "Constipation, dizziness, abdominal pain" },
  { id: 72, name: "Bismuth Subsalicylate", strength: "262mg", type: "Antidiarrheal", manufacturer: "Procter & Gamble", treats: "Diarrhea, Indigestion", dosage: "524mg every 30-60 minutes", precautions: ["Avoid in aspirin allergy", "May darken stool", "Not for prolonged use"], sideEffects: "Dark stools, constipation, tinnitus" },
  { id: 73, name: "Mesalamine", strength: "800mg", type: "5-ASA", manufacturer: "Shire Pharmaceuticals", treats: "Ulcerative colitis", dosage: "2.4-4.8g daily in divided doses", precautions: ["Take with food", "Monitor kidney function", "Report fever"], sideEffects: "Headache, abdominal pain, pancreatitis" },
  { id: 74, name: "Sulfasalazine", strength: "500mg", type: "5-ASA", manufacturer: "Pfizer Inc", treats: "Rheumatoid arthritis, IBD", dosage: "500mg-3g daily in divided doses", precautions: ["Take with food", "Stay hydrated", "Monitor blood counts"], sideEffects: "Nausea, headache, oligospermia" },
  { id: 75, name: "Budesonide", strength: "3mg", type: "Corticosteroid", manufacturer: "AstraZeneca", treats: "Crohn's disease, Ulcerative colitis", dosage: "9mg once daily", precautions: ["Take in morning", "Taper gradually", "Monitor for adrenal suppression"], sideEffects: "Headache, nausea, mood changes" },
  { id: 76, name: "Dicyclomine", strength: "20mg", type: "Antispasmodic", manufacturer: "Allergan", treats: "Irritable bowel syndrome", dosage: "20mg four times daily", precautions: ["Take before meals", "Avoid in glaucoma", "Caution in elderly"], sideEffects: "Dry mouth, dizziness, blurred vision" },
  { id: 77, name: "Hyoscyamine", strength: "0.125mg", type: "Antispasmodic", manufacturer: "Covis Pharma", treats: "Irritable bowel syndrome", dosage: "0.125-0.25mg every 4 hours", precautions: ["Sublingual administration", "Avoid in glaucoma", "Monitor for urinary retention"], sideEffects: "Dry mouth, dizziness, blurred vision" },
  { id: 78, name: "Lactulose", strength: "10g/15mL", type: "Laxative", manufacturer: "Actavis", treats: "Constipation, Hepatic encephalopathy", dosage: "15-30mL daily", precautions: ["Take with juice", "Monitor electrolytes", "Adjust dose to response"], sideEffects: "Bloating, flatulence, diarrhea" },
  { id: 79, name: "Polyethylene Glycol", strength: "17g", type: "Laxative", manufacturer: "Braintree Laboratories", treats: "Constipation", dosage: "17g daily in 8oz water", precautions: ["Dissolve completely", "Stay hydrated", "Not for prolonged use"], sideEffects: "Bloating, cramping, diarrhea" },
  { id: 80, name: "Senna", strength: "8.6mg", type: "Stimulant Laxative", manufacturer: "Purdue Pharma", treats: "Constipation", dosage: "2 tablets at bedtime", precautions: ["Short-term use", "May cause cramping", "Not for abdominal pain"], sideEffects: "Abdominal cramps, diarrhea, electrolyte imbalance" },

  // Respiratory Drugs (20)
  { id: 81, name: "Albuterol", strength: "100mcg", type: "Bronchodilator", manufacturer: "GSK Pharmaceuticals", treats: "Asthma, COPD", dosage: "1-2 puffs every 4-6 hours", precautions: ["Rinse mouth after use", "Monitor heart rate", "Report worsening symptoms"], sideEffects: "Tremor, tachycardia, headache" },
  { id: 82, name: "Salmeterol", strength: "50mcg", type: "Long-acting Bronchodilator", manufacturer: "GSK Pharmaceuticals", treats: "Asthma, COPD", dosage: "1 puff twice daily", precautions: ["Not for acute attacks", "Use with steroid", "Monitor for paradoxical bronchospasm"], sideEffects: "Headache, tremor, palpitations" },
  { id: 83, name: "Fluticasone", strength: "250mcg", type: "Corticosteroid", manufacturer: "GSK Pharmaceuticals", treats: "Asthma, Allergic rhinitis", dosage: "1-2 puffs twice daily", precautions: ["Rinse mouth after use", "Monitor growth in children", "Report oral thrush"], sideEffects: "Oral thrush, hoarseness, headache" },
  { id: 84, name: "Montelukast", strength: "10mg", type: "Leukotriene Inhibitor", manufacturer: "Merck & Co", treats: "Asthma, Allergic rhinitis", dosage: "10mg once daily", precautions: ["Take in evening", "Monitor for mood changes", "Report suicidal thoughts"], sideEffects: "Headache, abdominal pain, mood changes" },
  { id: 85, name: "Ipratropium", strength: "20mcg", type: "Anticholinergic", manufacturer: "Boehringer Ingelheim", treats: "COPD", dosage: "2 puffs four times daily", precautions: ["Avoid eyes", "Rinse mouth", "Use spacer if needed"], sideEffects: "Dry mouth, cough, blurred vision" },
  { id: 86, name: "Tiotropium", strength: "18mcg", type: "Long-acting Anticholinergic", manufacturer: "Boehringer Ingelheim", treats: "COPD", dosage: "1 capsule daily via HandiHaler", precautions: ["Not for acute attacks", "Avoid eyes", "Proper inhalation technique"], sideEffects: "Dry mouth, constipation, UTI" },
  { id: 87, name: "Theophylline", strength: "300mg", type: "Methylxanthine", manufacturer: "Pfizer Inc", treats: "Asthma, COPD", dosage: "200-600mg daily in divided doses", precautions: ["Monitor blood levels", "Avoid smoking", "Many drug interactions"], sideEffects: "Nausea, tachycardia, seizures" },
  { id: 88, name: "Prednisone", strength: "20mg", type: "Corticosteroid", manufacturer: "Mylan N.V.", treats: "Asthma exacerbation, Inflammation", dosage: "5-60mg daily", precautions: ["Take with food", "Taper gradually", "Monitor blood glucose"], sideEffects: "Insomnia, weight gain, osteoporosis" },
  { id: 89, name: "Guaifenesin", strength: "400mg", type: "Expectorant", manufacturer: "Reckitt Benckiser", treats: "Chest congestion", dosage: "200-400mg every 4 hours", precautions: ["Stay hydrated", "Maximum 2400mg/day", "Not for persistent cough"], sideEffects: "Nausea, vomiting, rash" },
  { id: 90, name: "Dextromethorphan", strength: "30mg", type: "Antitussive", manufacturer: "Johnson & Johnson", treats: "Cough", dosage: "10-30mg every 4-8 hours", precautions: ["Avoid with MAOIs", "Maximum 120mg/day", "Not for productive cough"], sideEffects: "Drowsiness, dizziness, nausea" },
  { id: 91, name: "Codeine/Guaifenesin", strength: "10/300mg", type: "Antitussive/Expectorant", manufacturer: "Actavis", treats: "Cough with congestion", dosage: "10mL every 4 hours", precautions: ["Risk of addiction", "Avoid alcohol", "Not for children under 12"], sideEffects: "Drowsiness, constipation, nausea" },
  { id: 92, name: "Cetirizine", strength: "10mg", type: "Antihistamine", manufacturer: "Johnson & Johnson", treats: "Allergies", dosage: "5-10mg once daily", precautions: ["May cause drowsiness", "Adjust in renal impairment", "Avoid alcohol"], sideEffects: "Drowsiness, dry mouth, headache" },
  { id: 93, name: "Loratadine", strength: "10mg", type: "Antihistamine", manufacturer: "Merck & Co", treats: "Allergies", dosage: "10mg once daily", precautions: ["Take on empty stomach", "Adjust in liver impairment", "Generally non-sedating"], sideEffects: "Headache, dry mouth, fatigue" },
  { id: 94, name: "Fexofenadine", strength: "180mg", type: "Antihistamine", manufacturer: "Sanofi SA", treats: "Allergies", dosage: "60-180mg once daily", precautions: ["Take with water", "Avoid fruit juices", "Generally non-sedating"], sideEffects: "Headache, nausea, drowsiness" },
  { id: 95, name: "Diphenhydramine", strength: "25mg", type: "Antihistamine", manufacturer: "Johnson & Johnson", treats: "Allergies, Insomnia", dosage: "25-50mg every 4-6 hours", precautions: ["May cause drowsiness", "Avoid alcohol", "Caution when driving"], sideEffects: "Drowsiness, dry mouth, urinary retention" },
  { id: 96, name: "Pseudoephedrine", strength: "30mg", type: "Decongestant", manufacturer: "Johnson & Johnson", treats: "Nasal congestion", dosage: "30-60mg every 4-6 hours", precautions: ["Avoid in hypertension", "Monitor blood pressure", "Purchase restrictions apply"], sideEffects: "Insomnia, hypertension, palpitations" },
  { id: 97, name: "Phenylephrine", strength: "10mg", type: "Decongestant", manufacturer: "Bayer AG", treats: "Nasal congestion", dosage: "10mg every 4 hours", precautions: ["Avoid in hypertension", "Less effective than pseudoephedrine", "Monitor heart rate"], sideEffects: "Headache, hypertension, anxiety" },
  { id: 98, name: "Oxymetazoline", strength: "0.05%", type: "Nasal Decongestant", manufacturer: "Bayer AG", treats: "Nasal congestion", dosage: "2-3 sprays twice daily", precautions: ["Maximum 3 days use", "Risk of rebound congestion", "Avoid in glaucoma"], sideEffects: "Rebound congestion, burning, sneezing" },
  { id: 99, name: "Fluticasone Nasal", strength: "50mcg", type: "Nasal Steroid", manufacturer: "GSK Pharmaceuticals", treats: "Allergic rhinitis", dosage: "1-2 sprays each nostril daily", precautions: ["May take days to work", "Prime before first use", "Report nosebleeds"], sideEffects: "Nasal irritation, nosebleeds, headache" },
  { id: 100, name: "Mometasone Nasal", strength: "50mcg", type: "Nasal Steroid", manufacturer: "Merck & Co", treats: "Allergic rhinitis", dosage: "2 sprays each nostril daily", precautions: ["Prime before first use", "Regular use needed", "Report vision changes"], sideEffects: "Headache, nosebleeds, sore throat" },

  // Diabetes Medications (20)
  { id: 101, name: "Metformin", strength: "500mg", type: "Biguanide", manufacturer: "Bristol-Myers Squibb", treats: "Type 2 Diabetes", dosage: "500-1000mg twice daily", precautions: ["Take with meals", "Monitor kidney function", "Risk of lactic acidosis"], sideEffects: "GI upset, diarrhea, vitamin B12 deficiency" },
  { id: 102, name: "Glipizide", strength: "5mg", type: "Sulfonylurea", manufacturer: "Pfizer Inc", treats: "Type 2 Diabetes", dosage: "2.5-20mg daily", precautions: ["Take before meals", "Risk of hypoglycemia", "Monitor blood glucose"], sideEffects: "Hypoglycemia, weight gain, rash" },
  { id: 103, name: "Glyburide", strength: "5mg", type: "Sulfonylurea", manufacturer: "Sanofi SA", treats: "Type 2 Diabetes", dosage: "1.25-20mg daily", precautions: ["Take with breakfast", "Higher hypoglycemia risk", "Avoid in elderly"], sideEffects: "Hypoglycemia, weight gain, nausea" },
  { id: 104, name: "Pioglitazone", strength: "30mg", type: "Thiazolidinedione", manufacturer: "Takeda Pharmaceutical", treats: "Type 2 Diabetes", dosage: "15-45mg once daily", precautions: ["Monitor liver function", "Risk of heart failure", "May cause weight gain"], sideEffects: "Weight gain, edema, fractures" },
  { id: 105, name: "Sitagliptin", strength: "100mg", type: "DPP-4 Inhibitor", manufacturer: "Merck & Co", treats: "Type 2 Diabetes", dosage: "100mg once daily", precautions: ["Adjust in renal impairment", "Monitor for pancreatitis", "Generally weight neutral"], sideEffects: "Nasopharyngitis, headache, pancreatitis" },
  { id: 106, name: "Linagliptin", strength: "5mg", type: "DPP-4 Inhibitor", manufacturer: "Boehringer Ingelheim", treats: "Type 2 Diabetes", dosage: "5mg once daily", precautions: ["No renal adjustment needed", "Monitor for pancreatitis", "Use with caution in heart failure"], sideEffects: "Nasopharyngitis, cough, pancreatitis" },
  { id: 107, name: "Empagliflozin", strength: "10mg", type: "SGLT2 Inhibitor", manufacturer: "Boehringer Ingelheim", treats: "Type 2 Diabetes, Heart failure", dosage: "10-25mg once daily", precautions: ["Monitor for genital infections", "Stay hydrated", "Risk of ketoacidosis"], sideEffects: "Genital infections, UTI, dehydration" },
  { id: 108, name: "Canagliflozin", strength: "100mg", type: "SGLT2 Inhibitor", manufacturer: "Janssen Pharmaceuticals", treats: "Type 2 Diabetes", dosage: "100-300mg once daily", precautions: ["Monitor for amputations", "Risk of fractures", "Stay hydrated"], sideEffects: "Genital infections, UTI, increased amputation risk" },
  { id: 109, name: "Dapagliflozin", strength: "5mg", type: "SGLT2 Inhibitor", manufacturer: "AstraZeneca", treats: "Type 2 Diabetes, Heart failure", dosage: "5-10mg once daily", precautions: ["Monitor for bladder cancer", "Stay hydrated", "Risk of ketoacidosis"], sideEffects: "Genital infections, UTI, back pain" },
  { id: 110, name: "Exenatide", strength: "5mcg", type: "GLP-1 Agonist", manufacturer: "AstraZeneca", treats: "Type 2 Diabetes", dosage: "5-10mcg twice daily", precautions: ["Inject before meals", "Monitor for pancreatitis", "Nausea common initially"], sideEffects: "Nausea, vomiting, pancreatitis" },
  { id: 111, name: "Liraglutide", strength: "1.8mg", type: "GLP-1 Agonist", manufacturer: "Novo Nordisk", treats: "Type 2 Diabetes, Obesity", dosage: "0.6-1.8mg once daily", precautions: ["Inject any time", "Monitor for pancreatitis", "Titrate slowly"], sideEffects: "Nausea, diarrhea, pancreatitis" },
  { id: 112, name: "Semaglutide", strength: "0.5mg", type: "GLP-1 Agonist", manufacturer: "Novo Nordisk", treats: "Type 2 Diabetes, Obesity", dosage: "0.25-1mg once weekly", precautions: ["Inject weekly", "Monitor for pancreatitis", "Titrate slowly"], sideEffects: "Nausea, diarrhea, pancreatitis" },
  { id: 113, name: "Insulin Glargine", strength: "100 units/mL", type: "Long-acting Insulin", manufacturer: "Sanofi SA", treats: "Type 1 & 2 Diabetes", dosage: "Individualized, usually once daily", precautions: ["Inject at same time daily", "Rotate injection sites", "Monitor for hypoglycemia"], sideEffects: "Hypoglycemia, weight gain, lipodystrophy" },
  { id: 114, name: "Insulin Lispro", strength: "100 units/mL", type: "Rapid-acting Insulin", manufacturer: "Eli Lilly", treats: "Type 1 & 2 Diabetes", dosage: "Individualized, with meals", precautions: ["Inject 0-15 minutes before meals", "Rotate injection sites", "Monitor blood glucose"], sideEffects: "Hypoglycemia, weight gain, injection site reactions" },
  { id: 115, name: "Insulin Aspart", strength: "100 units/mL", type: "Rapid-acting Insulin", manufacturer: "Novo Nordisk", treats: "Type 1 & 2 Diabetes", dosage: "Individualized, with meals", precautions: ["Inject 0-10 minutes before meals", "Rotate injection sites", "Monitor for hypoglycemia"], sideEffects: "Hypoglycemia, weight gain, allergic reactions" },
  { id: 116, name: "NPH Insulin", strength: "100 units/mL", type: "Intermediate-acting Insulin", manufacturer: "Novo Nordisk", treats: "Type 1 & 2 Diabetes", dosage: "Individualized, 1-2 times daily", precautions: ["Roll vial, don't shake", "Cloudy appearance normal", "Monitor for hypoglycemia"], sideEffects: "Hypoglycemia, weight gain, lipodystrophy" },
  { id: 117, name: "Acarbose", strength: "50mg", type: "Alpha-glucosidase Inhibitor", manufacturer: "Bayer AG", treats: "Type 2 Diabetes", dosage: "25-100mg three times daily", precautions: ["Take with first bite of meal", "Monitor liver function", "Adjust slowly"], sideEffects: "Flatulence, diarrhea, abdominal pain" },
  { id: 118, name: "Miglitol", strength: "50mg", type: "Alpha-glucosidase Inhibitor", manufacturer: "Pfizer Inc", treats: "Type 2 Diabetes", dosage: "25-100mg three times daily", precautions: ["Take with first bite of meal", "Not absorbed systemically", "Adjust slowly"], sideEffects: "Flatulence, diarrhea, abdominal pain" },
  { id: 119, name: "Repaglinide", strength: "1mg", type: "Meglitinide", manufacturer: "Novo Nordisk", treats: "Type 2 Diabetes", dosage: "0.5-4mg with meals", precautions: ["Take with each meal", "Risk of hypoglycemia", "Skip dose if skipping meal"], sideEffects: "Hypoglycemia, weight gain, headache" },
  { id: 120, name: "Nateglinide", strength: "120mg", type: "Meglitinide", manufacturer: "Novartis AG", treats: "Type 2 Diabetes", dosage: "60-120mg with meals", precautions: ["Take 1-30 minutes before meals", "Skip dose if skipping meal", "Monitor blood glucose"], sideEffects: "Hypoglycemia, upper respiratory infection, back pain" },

  // Psychiatric & Neurological (20)
  { id: 121, name: "Sertraline", strength: "50mg", type: "SSRI", manufacturer: "Pfizer Inc", treats: "Depression, Anxiety", dosage: "50-200mg once daily", precautions: ["Take in morning", "Monitor for suicidal thoughts", "Taper gradually"], sideEffects: "Nausea, insomnia, sexual dysfunction" },
  { id: 122, name: "Fluoxetine", strength: "20mg", type: "SSRI", manufacturer: "Eli Lilly", treats: "Depression, OCD", dosage: "20-80mg once daily", precautions: ["Long half-life", "Monitor for activation", "Many drug interactions"], sideEffects: "Nausea, insomnia, weight changes" },
  { id: 123, name: "Escitalopram", strength: "10mg", type: "SSRI", manufacturer: "Lundbeck", treats: "Depression, Anxiety", dosage: "10-20mg once daily", precautions: ["Monitor for QT prolongation", "Taper gradually", "Report mood changes"], sideEffects: "Nausea, insomnia, sexual dysfunction" },
  { id: 124, name: "Venlafaxine", strength: "75mg", type: "SNRI", manufacturer: "Wyeth Pharmaceuticals", treats: "Depression, Anxiety", dosage: "75-225mg daily in divided doses", precautions: ["Monitor blood pressure", "Taper very slowly", "Risk of discontinuation syndrome"], sideEffects: "Nausea, hypertension, sweating" },
  { id: 125, name: "Duloxetine", strength: "30mg", type: "SNRI", manufacturer: "Eli Lilly", treats: "Depression, Neuropathic pain", dosage: "30-60mg once daily", precautions: ["Monitor liver function", "Taper gradually", "Avoid in narrow-angle glaucoma"], sideEffects: "Nausea, dry mouth, constipation" },
  { id: 126, name: "Bupropion", strength: "150mg", type: "NDRI", manufacturer: "GSK Pharmaceuticals", treats: "Depression, Smoking cessation", dosage: "150-300mg once daily", precautions: ["Risk of seizures", "Take in morning", "Monitor for agitation"], sideEffects: "Insomnia, dry mouth, tremor" },
  { id: 127, name: "Mirtazapine", strength: "15mg", type: "NaSSA", manufacturer: "Merck & Co", treats: "Depression", dosage: "15-45mg at bedtime", precautions: ["Sedating, take at night", "Monitor weight", "Risk of agranulocytosis"], sideEffects: "Sedation, weight gain, increased appetite" },
  { id: 128, name: "Trazodone", strength: "50mg", type: "SARI", manufacturer: "Pfizer Inc", treats: "Depression, Insomnia", dosage: "50-400mg at bedtime", precautions: ["Risk of priapism", "Take with food", "Monitor for serotonin syndrome"], sideEffects: "Sedation, dizziness, priapism" },
  { id: 129, name: "Amitriptyline", strength: "25mg", type: "Tricyclic", manufacturer: "Merck & Co", treats: "Depression, Neuropathic pain", dosage: "25-150mg at bedtime", precautions: ["Anticholinergic effects", "Monitor ECG", "Risk of overdose"], sideEffects: "Dry mouth, sedation, constipation" },
  { id: 130, name: "Clonazepam", strength: "0.5mg", type: "Benzodiazepine", manufacturer: "Roche Holding", treats: "Anxiety, Seizures", dosage: "0.5-2mg daily in divided doses", precautions: ["Risk of dependence", "Taper gradually", "Avoid alcohol"], sideEffects: "Sedation, dizziness, ataxia" },
  { id: 131, name: "Alprazolam", strength: "0.5mg", type: "Benzodiazepine", manufacturer: "Pfizer Inc", treats: "Anxiety, Panic disorder", dosage: "0.25-4mg daily in divided doses", precautions: ["High abuse potential", "Taper very slowly", "Avoid alcohol"], sideEffects: "Sedation, dizziness, dependence" },
  { id: 132, name: "Lorazepam", strength: "1mg", type: "Benzodiazepine", manufacturer: "Valeant Pharmaceuticals", treats: "Anxiety, Insomnia", dosage: "1-4mg daily in divided doses", precautions: ["Risk of dependence", "Taper gradually", "Elderly sensitive"], sideEffects: "Sedation, dizziness, confusion" },
  { id: 133, name: "Zolpidem", strength: "10mg", type: "Non-benzodiazepine", manufacturer: "Sanofi SA", treats: "Insomnia", dosage: "5-10mg at bedtime", precautions: ["Take right before bed", "Risk of complex sleep behaviors", "Short-term use"], sideEffects: "Dizziness, headache, sleepwalking" },
  { id: 134, name: "Eszopiclone", strength: "3mg", type: "Non-benzodiazepine", manufacturer: "Sunovion Pharmaceuticals", treats: "Insomnia", dosage: "1-3mg at bedtime", precautions: ["Take right before bed", "Unpleasant taste common", "Short-term use"], sideEffects: "Unpleasant taste, headache, dizziness" },
  { id: 135, name: "Risperidone", strength: "1mg", type: "Atypical Antipsychotic", manufacturer: "Janssen Pharmaceuticals", treats: "Schizophrenia, Bipolar", dosage: "1-6mg daily in divided doses", precautions: ["Monitor for metabolic syndrome", "Taper gradually", "Elderly dementia warning"], sideEffects: "Weight gain, sedation, hyperprolactinemia" },
  { id: 136, name: "Olanzapine", strength: "5mg", type: "Atypical Antipsychotic", manufacturer: "Eli Lilly", treats: "Schizophrenia, Bipolar", dosage: "5-20mg once daily", precautions: ["High metabolic risk", "Monitor glucose/lipids", "Weight gain common"], sideEffects: "Weight gain, sedation, hyperglycemia" },
  { id: 137, name: "Quetiapine", strength: "100mg", type: "Atypical Antipsychotic", manufacturer: "AstraZeneca", treats: "Schizophrenia, Bipolar", dosage: "50-800mg daily in divided doses", precautions: ["Monitor for cataracts", "Sedating, take at night", "Metabolic monitoring"], sideEffects: "Sedation, dizziness, weight gain" },
  { id: 138, name: "Aripiprazole", strength: "10mg", type: "Atypical Antipsychotic", manufacturer: "Otsuka Pharmaceutical", treats: "Schizophrenia, Bipolar", dosage: "10-30mg once daily", precautions: ["Monitor for akathisia", "Generally weight neutral", "Activating for some"], sideEffects: "Akathisia, headache, nausea" },
  { id: 139, name: "Lithium", strength: "300mg", type: "Mood Stabilizer", manufacturer: "GSK Pharmaceuticals", treats: "Bipolar disorder", dosage: "600-1800mg daily in divided doses", precautions: ["Monitor blood levels", "Stay hydrated", "Avoid NSAIDs"], sideEffects: "Tremor, polyuria, weight gain" },
  { id: 140, name: "Valproic Acid", strength: "500mg", type: "Anticonvulsant", manufacturer: "AbbVie Inc", treats: "Seizures, Bipolar", dosage: "500-2000mg daily in divided doses", precautions: ["Monitor liver function", "Avoid in pregnancy", "Monitor blood levels"], sideEffects: "Weight gain, tremor, hair loss" },

  // Additional Common Medications (10)
  { id: 141, name: "Levothyroxine", strength: "100mcg", type: "Thyroid Hormone", manufacturer: "AbbVie Inc", treats: "Hypothyroidism", dosage: "25-200mcg once daily", precautions: ["Take on empty stomach", "Wait 30-60 minutes before eating", "Consistent brand"], sideEffects: "Palpitations, weight loss, anxiety" },
  { id: 142, name: "Warfarin", strength: "5mg", type: "Anticoagulant", manufacturer: "Bristol-Myers Squibb", treats: "Blood clot prevention", dosage: "2-10mg once daily", precautions: ["Regular INR monitoring", "Consistent vitamin K intake", "Many drug interactions"], sideEffects: "Bleeding, bruising, skin necrosis" },
  { id: 143, name: "Allopurinol", strength: "300mg", type: "Xanthine Oxidase Inhibitor", manufacturer: "Zyloprim", treats: "Gout", dosage: "100-800mg once daily", precautions: ["Start low, go slow", "Monitor for rash", "Drink plenty of fluids"], sideEffects: "Rash, nausea, liver enzyme elevation" },
  { id: 144, name: "Colchicine", strength: "0.6mg", type: "Anti-inflammatory", manufacturer: "Takeda Pharmaceutical", treats: "Gout flare", dosage: "1.2mg initially, then 0.6mg 1 hour later", precautions: ["Maximum 1.8mg per episode", "Monitor for diarrhea", "Many drug interactions"], sideEffects: "Diarrhea, nausea, vomiting" },
  { id: 145, name: "Finasteride", strength: "5mg", type: "5-alpha Reductase Inhibitor", manufacturer: "Merck & Co", treats: "BPH, Hair loss", dosage: "1mg (hair loss) or 5mg (BPH) once daily", precautions: ["Pregnancy warning", "May affect PSA", "Report breast changes"], sideEffects: "Decreased libido, erectile dysfunction, breast tenderness" },
  { id: 146, name: "Tamsulosin", strength: "0.4mg", type: "Alpha Blocker", manufacturer: "Astellas Pharma", treats: "BPH", dosage: "0.4mg once daily", precautions: ["Take after same meal daily", "Risk of hypotension", "Monitor for dizziness"], sideEffects: "Dizziness, retrograde ejaculation, rhinitis" },
  { id: 147, name: "Sildenafil", strength: "50mg", type: "PDE5 Inhibitor", manufacturer: "Pfizer Inc", treats: "Erectile dysfunction", dosage: "25-100mg as needed", precautions: ["Avoid with nitrates", "Take 30-60 minutes before activity", "Monitor blood pressure"], sideEffects: "Headache, flushing, dyspepsia" },
  { id: 148, name: "Tadalafil", strength: "10mg", type: "PDE5 Inhibitor", manufacturer: "Eli Lilly", treats: "Erectile dysfunction, BPH", dosage: "2.5-20mg as needed or 2.5-5mg daily", precautions: ["Avoid with nitrates", "Long half-life", "Monitor for back pain"], sideEffects: "Headache, dyspepsia, back pain" },
  { id: 149, name: "Vitamin D3", strength: "1000 IU", type: "Vitamin Supplement", manufacturer: "Various", treats: "Vitamin D deficiency", dosage: "400-5000 IU once daily", precautions: ["Monitor blood levels", "Take with fatty meal", "Avoid excessive doses"], sideEffects: "Hypercalcemia, nausea, constipation" },
  { id: 150, name: "Omega-3 Fatty Acids", strength: "1000mg", type: "Fish Oil Supplement", manufacturer: "Various", treats: "High triglycerides", dosage: "1000-4000mg daily", precautions: ["May increase bleeding risk", "Fish allergy warning", "Take with meals"], sideEffects: "Fishy aftertaste, nausea, diarrhea" }
];

// Language configurations
const LANGUAGES = [
  { code: "en", name: "English", voice: "en-US" },
  { code: "hi", name: "Hindi", voice: "hi-IN" },
  { code: "es", name: "Spanish", voice: "es-ES" },
  { code: "fr", name: "French", voice: "fr-FR" },
  { code: "de", name: "German", voice: "de-DE" },
  { code: "zh", name: "Chinese", voice: "zh-CN" },
  { code: "ar", name: "Arabic", voice: "ar-SA" },
  { code: "ru", name: "Russian", voice: "ru-RU" },
  { code: "ja", name: "Japanese", voice: "ja-JP" },
  { code: "ko", name: "Korean", voice: "ko-KR" }
];

// Translations for different languages
const TRANSLATIONS = {
  en: {
    tabletVerification: "Tablet Verification",
    uploadImage: "Upload an image or enter tablet details for instant AI verification",
    tabletImage: "Tablet Image",
    clickToUpload: "Click to upload",
    fileRequirements: "PNG, JPG up to 10MB",
    tabletImprintName: "Tablet Imprint/Name",
    placeholder: "e.g., Paracetamol, Ibuprofen, Amoxicillin",
    selectLanguage: "Select Language",
    verifyTablet: "Verify Tablet",
    verifiedAuthentic: "Verified Authentic",
    verificationSuccess: "This tablet has been successfully verified",
    medicationInfo: "Medication Info",
    name: "Name",
    treats: "Treats",
    manufacturer: "Manufacturer",
    dosageInformation: "Dosage Information",
    precautions: "Precautions",
    sideEffects: "Possible Side Effects",
    type: "Type",
    strength: "Strength",
    searchPlaceholder: "Search medicines...",
    noResults: "No medicine found. Try another name.",
    errorMessage: "Please enter a medicine name to verify"
  },
  hi: {
    tabletVerification: "टैबलेट सत्यापन",
    uploadImage: "तत्काल एआई सत्यापन के लिए एक छवि अपलोड करें या टैबलेट विवरण दर्ज करें",
    tabletImage: "टैबलेट छवि",
    clickToUpload: "अपलोड करने के लिए क्लिक करें",
    fileRequirements: "PNG, JPG 10MB तक",
    tabletImprintName: "टैबलेट इम्प्रिंट/नाम",
    placeholder: "जैसे, पैरासिटामोल, इबुप्रोफेन, एमोक्सिसिलिन",
    selectLanguage: "भाषा चुनें",
    verifyTablet: "टैबलेट सत्यापित करें",
    verifiedAuthentic: "प्रमाणित प्रामाणिक",
    verificationSuccess: "इस टैबलेट को सफलतापूर्वक सत्यापित किया गया है",
    medicationInfo: "दवा की जानकारी",
    name: "नाम",
    treats: "इलाज करता है",
    manufacturer: "निर्माता",
    dosageInformation: "खुराक की जानकारी",
    precautions: "सावधानियां",
    sideEffects: "संभावित दुष्प्रभाव",
    type: "प्रकार",
    strength: "शक्ति",
    searchPlaceholder: "दवाइयां खोजें...",
    noResults: "कोई दवा नहीं मिली। कोई अन्य नाम आज़माएं।",
    errorMessage: "सत्यापित करने के लिए कृपया एक दवा का नाम दर्ज करें"
  },
  es: {
    tabletVerification: "Verificación de Tabletas",
    uploadImage: "Suba una imagen o ingrese detalles de la tableta para verificación instantánea con IA",
    tabletImage: "Imagen de la Tableta",
    clickToUpload: "Haga clic para subir",
    fileRequirements: "PNG, JPG hasta 10MB",
    tabletImprintName: "Marca/Nombre de la Tableta",
    placeholder: "ej., Paracetamol, Ibuprofeno, Amoxicilina",
    selectLanguage: "Seleccionar Idioma",
    verifyTablet: "Verificar Tableta",
    verifiedAuthentic: "Verificado Auténtico",
    verificationSuccess: "Esta tableta ha sido verificada exitosamente",
    medicationInfo: "Información del Medicamento",
    name: "Nombre",
    treats: "Trata",
    manufacturer: "Fabricante",
    dosageInformation: "Información de Dosificación",
    precautions: "Precauciones",
    sideEffects: "Posibles Efectos Secundarios",
    type: "Tipo",
    strength: "Potencia",
    searchPlaceholder: "Buscar medicamentos...",
    noResults: "No se encontró el medicamento. Intente con otro nombre.",
    errorMessage: "Por favor ingrese un nombre de medicamento para verificar"
  },
  fr: {
    tabletVerification: "Vérification des Comprimés",
    uploadImage: "Téléchargez une image ou entrez les détails du comprimé pour une vérification IA instantanée",
    tabletImage: "Image du Comprimé",
    clickToUpload: "Cliquez pour télécharger",
    fileRequirements: "PNG, JPG jusqu'à 10MB",
    tabletImprintName: "Marque/Nom du Comprimé",
    placeholder: "ex., Paracétamol, Ibuprofène, Amoxicilline",
    selectLanguage: "Sélectionner la Langue",
    verifyTablet: "Vérifier le Comprimé",
    verifiedAuthentic: "Vérifié Authentique",
    verificationSuccess: "Ce comprimé a été vérifié avec succès",
    medicationInfo: "Informations sur le Médicament",
    name: "Nom",
    treats: "Traite",
    manufacturer: "Fabricant",
    dosageInformation: "Informations sur le Dosage",
    precautions: "Précautions",
    sideEffects: "Effets Secondaires Possibles",
    type: "Type",
    strength: "Puissance",
    searchPlaceholder: "Rechercher des médicaments...",
    noResults: "Médicament non trouvé. Essayez un autre nom.",
    errorMessage: "Veuillez entrer un nom de médicament à vérifier"
  },
  de: {
    tabletVerification: "Tablettenüberprüfung",
    uploadImage: "Laden Sie ein Bild hoch oder geben Sie Tabletten details für sofortige KI-Überprüfung ein",
    tabletImage: "Tablettenbild",
    clickToUpload: "Zum Hochladen klicken",
    fileRequirements: "PNG, JPG bis zu 10MB",
    tabletImprintName: "Tablettenprägung/Name",
    placeholder: "z.B., Paracetamol, Ibuprofen, Amoxicillin",
    selectLanguage: "Sprache auswählen",
    verifyTablet: "Tablette überprüfen",
    verifiedAuthentic: "Verifiziert Authentisch",
    verificationSuccess: "Diese Tablette wurde erfolgreich verifiziert",
    medicationInfo: "Medikamenteninformation",
    name: "Name",
    treats: "Behandelt",
    manufacturer: "Hersteller",
    dosageInformation: "Dosierungsinformation",
    precautions: "Vorsichtsmaßnahmen",
    sideEffects: "Mögliche Nebenwirkungen",
    type: "Typ",
    strength: "Stärke",
    searchPlaceholder: "Medikamente suchen...",
    noResults: "Medikament nicht gefunden. Versuchen Sie einen anderen Namen.",
    errorMessage: "Bitte geben Sie einen Medikamentennamen zur Überprüfung ein"
  }
};

export default function TabletChecker() {
  const [activeTab, setActiveTab] = useState("Tablet Checker");
  const [tabletName, setTabletName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [verified, setVerified] = useState(false);
  const [foundMedicine, setFoundMedicine] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Get translations for current language
  const t = TRANSLATIONS[selectedLanguage.code as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage.voice;
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const handleVerify = () => {
    if (!tabletName.trim()) {
      alert(t.errorMessage);
      return;
    }

    const searchTerm = tabletName.toLowerCase();
    const found = MEDICINE_DB.find(med => 
      med.name.toLowerCase().includes(searchTerm) || 
      med.name.toLowerCase() === searchTerm
    );

    if (found) {
      setFoundMedicine(found);
      setVerified(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      alert(t.noResults);
      setVerified(false);
      setFoundMedicine(null);
    }
  };

  const handleSearch = (value: string) => {
    setTabletName(value);
    if (value.length > 1) {
      const results = MEDICINE_DB.filter(med =>
        med.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectMedicine = (medicine: any) => {
    setTabletName(medicine.name);
    setFoundMedicine(medicine);
    setSearchResults([]);
    setShowSuggestions(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* ===== NAVIGATION BAR ===== */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("Home")}
                className={`text-sm font-medium ${activeTab === "Home" ? "text-[#10b981]" : "text-gray-600 hover:text-gray-900"}`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("Tablet Checker")}
                className={`flex items-center space-x-2 text-sm font-medium ${activeTab === "Tablet Checker" ? "text-[#10b981]" : "text-gray-600 hover:text-gray-900"}`}
              >
                <CheckCircle size={16} />
                <span>Tablet Checker</span>
              </button>
              <button
                onClick={() => setActiveTab("Us")}
                className={`text-sm font-medium ${activeTab === "Us" ? "text-[#10b981]" : "text-gray-600 hover:text-gray-900"}`}
              >
                Us
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-64 pl-10 pr-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:border-[#10b981] text-sm text-gray-900 placeholder:text-gray-500"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/*
