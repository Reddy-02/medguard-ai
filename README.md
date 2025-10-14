# 🩺 MedGuard AI

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blueviolet)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-yellow)](https://vitejs.dev/)
[![GitHub stars](https://img.shields.io/github/stars/Reddy-02/medguard-ai?style=social)](https://github.com/Reddy-02/medguard-ai/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Reddy-02/medguard-ai?style=social)](https://github.com/Reddy-02/medguard-ai/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Reddy-02/medguard-ai)](https://github.com/Reddy-02/medguard-ai/issues)

---

## 🚀 Project Overview

**MedGuard AI** is a **next-generation web application** designed to solve the real-world problem of **fake/counterfeit medicines**, which can cause serious health risks.  

With **AI-powered image recognition**, **multilingual support**, and **modern interactive design**, MedGuard AI empowers users to:

1. Detect counterfeit medicines instantly  
2. Get accurate usage instructions for verified medicines  
3. Access guidance in multiple languages via text and voice  

This project demonstrates **full-stack web development skills**, **AI integration**, and **portfolio-ready UI/UX**, making it ideal for MAANG/FAANG-level presentation.

---

## 🎯 Problem Statement

Counterfeit medicines are a **growing global problem**, resulting in health risks, financial losses, and potential fatalities. Many people struggle to verify the authenticity of medicines before consumption.  

**MedGuard AI solves this by:**
- Allowing users to **upload or scan medicines**  
- Using **AI/ML models** to check authenticity  
- Providing **clear instructions** on how to use verified medicines  
- Supporting **multilingual interaction** to reach diverse users  

---

## 👥 User Personas

| Persona | Needs | Pain Points |
|---------|-------|------------|
| Patient | Verify medicine authenticity | Can't distinguish fake from real |
| Caregiver | Ensure proper usage of medicines | Confusion about dosage or disease-specific usage |
| Pharmacist | Check medicine authenticity quickly | Manual checking is time-consuming |
| Healthcare Organization | Reduce counterfeit medicine circulation | Needs reliable tech-assisted verification |

---

## 🎨 Features

### Core Features
- **Fake Medicine Detection:** Upload or scan medicine using AI-powered models  
- **Medicine Usage Guide:** Step-by-step instructions based on disease  
- **Multilingual Support:** English, Hindi, Telugu, and expandable  
- **Text & Voice Interaction:** TTS for instructions and user queries  

### Advanced Features
- **Interactive 3D UI:** Animated and modern interface components  
- **Responsive Design:** Works on desktop, tablet, and mobile  
- **Dark Mode:** TailwindCSS-based theme switching  
- **Performance Optimizations:** Fast loading with Vite + React + TailwindCSS  

---

## 🏗 Tech Stack

- **Frontend:** React 18, TypeScript, TailwindCSS, Vite  
- **AI/ML APIs:** Hugging Face for counterfeit detection, Coqui TTS / Open-source text-to-speech  
- **Languages Supported:** English, Hindi, Telugu (expandable)  
- **Version Control:** Git + GitHub  
- **Deployment Platforms:** Vercel / Netlify  

---

## 🖥 Technical Architecture

User
└─> Web Interface (React + Tailwind)
├─> Upload / Camera Input
├─> AI Detection Module (Hugging Face API)
├─> Multilingual TTS Module (Coqui / Open-source)
└─> UI Display (Results, Instructions, Feedback)

yaml
Copy code

**Data Flow:**
1. User uploads medicine image → Web interface  
2. AI module verifies authenticity → Returns real/fake  
3. Usage instructions fetched from database/API  
4. Text or TTS displayed to user  

*(Include architecture diagram here for portfolio showcase)*

---

## 📂 Project Structure

medguard-ai/
│
├─ src/
│ ├─ components/ # Reusable UI components
│ ├─ pages/ # Main pages: Home, Scanner, About
│ ├─ styles/ # Tailwind + global CSS
│ └─ assets/ # Images, logos, icons
│
├─ public/ # Static files
├─ package.json
├─ vite.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ .gitignore
└─ README.md

yaml
Copy code

---

## 💻 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Reddy-02/medguard-ai.git
cd medguard-ai
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Run locally
bash
Copy code
npm run dev
4️⃣ Open in browser
Go to http://localhost:5173

📦 Deployment
Vercel Deployment
Login to Vercel

Import GitHub repository

Set build command: npm run build

Set output directory: dist

Deploy live site

Netlify Deployment
Connect GitHub repository

Build command: npm run build

Publish directory: dist

🛠 Future Roadmap
Real-time camera scanning for tablets

Advanced AI models with higher accuracy

User profiles & scan history tracking

Medication reminder notifications

Progressive Web App (PWA) support for offline usage

📝 License
MIT License © 2025 Sai Srinivas Reddy

📬 Contact
Sai Srinivas Reddy

GitHub: https://github.com/Reddy-02

Email: saisrinivasreddy456@gmail.com
