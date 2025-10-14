# 🩺 MedGuard AI

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blueviolet)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-yellow)](https://vitejs.dev/)

---

## 🚀 Project Overview

**MedGuard AI** is an advanced, interactive web application designed to:

- Detect **fake medicines** using AI-powered image recognition  
- Provide **usage instructions** for real tablets  
- Support **multilingual interaction** via text or voice  
- Offer a **modern, responsive, and 3D-inspired UI/UX**


---

## 🎨 Features

- **Fake Medicine Detection** – AI/ML powered  
- **Tablet Usage Guide** – Disease-specific instructions  
- **Multilingual Support** – English, Hindi, Telugu, etc.  
- **Interactive UI/UX** – Modern design, animations, micro-interactions  
- **Responsive Design** – Desktop, tablet, and mobile friendly  
- **Dark Mode** – Seamless theme switching  
- **Fast Performance** – Powered by Vite + TailwindCSS

---

## 🏗 Tech Stack

- **Frontend:** React 18, TailwindCSS, Vite  
- **AI/ML APIs:** Hugging Face (image recognition), Coqui TTS / Open-source text-to-speech  
- **Languages Supported:** English, Hindi, Telugu, and more  
- **Deployment Ready:** Vercel / Netlify  

---

## 📂 Project Structure

medguard-ai/
│
├─ src/
│ ├─ components/ # React components
│ ├─ pages/ # Pages for Next.js or main HTML
│ ├─ styles/ # Tailwind + global CSS
│ └─ assets/ # Images, logos, icons
│
├─ public/ # Static files
├─ package.json
├─ vite.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
└─ README.md


---

## 💻 Getting Started


1️⃣ Clone the repository
```bash
git clone https://github.com/Reddy-02/medguard-ai.git
cd medguard-ai

2️⃣ Install dependencies
npm install

3️⃣ Run locally
npm run dev

4️⃣ Open in browser

Go to http://localhost:5173
 (Vite default port)

📦 Deployment

Deploy MedGuard AI easily using Vercel or Netlify:

Vercel

Login to Vercel

Import GitHub repository

Set build command: npm run build

Set output directory: dist

Deploy

Netlify

Similar steps: connect GitHub repo, build command npm run build, publish dist folder

🎯 Future Enhancements

Real-time camera scanning for tablets

Integrate advanced AI models for higher detection accuracy

User profiles & history to track scanned medicines

Medication reminders & alerts
