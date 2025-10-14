# 🩺 MedGuard AI

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blueviolet)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-yellow)](https://vitejs.dev/)
[![GitHub stars](https://img.shields.io/github/stars/Reddy-02/medguard-ai?style=social)](https://github.com/Reddy-02/medguard-ai/stargazers)

---

## 🚀 Project Overview

**MedGuard AI** is a cutting-edge web application designed to **detect counterfeit medicines** and provide **accurate usage instructions**. It leverages modern **AI/ML models**, **computer vision**, and **multilingual TTS** to deliver a **seamless user experience** across devices.  

**Key objectives:**
- Identify fake medicines in real-time  
- Provide user-friendly usage instructions based on disease  
- Support multiple languages with text and voice interaction  
- Showcase advanced UI/UX with modern animations and 3D-inspired components  

---

## 🎨 Features

| Feature | Description |
|---------|-------------|
| **Fake Medicine Detection** | AI-powered image recognition to identify counterfeit tablets/capsules |
| **Usage Instructions** | Detailed guidance on how to take verified medicines based on disease |
| **Multilingual Support** | English, Hindi, Telugu (expandable) with voice and text |
| **Responsive Design** | Works seamlessly on Desktop, Tablet, and Mobile devices |
| **Modern UI/UX** | 3D-inspired layouts, smooth animations, interactive components |
| **Dark Mode** | Automatic theme switching with TailwindCSS dark mode |
| **Fast Performance** | Optimized using Vite + Tailwind + React |
| **Deployment Ready** | Works out-of-the-box with Vercel/Netlify |

---

## 🏗 Tech Stack

- **Frontend:** React 18, TailwindCSS, Vite, TypeScript  
- **AI/ML APIs:** Hugging Face (fake medicine detection), Coqui TTS / Open-source text-to-speech  
- **Languages Supported:** English, Hindi, Telugu  
- **Version Control:** Git + GitHub  
- **Deployment Platforms:** Vercel, Netlify  

---

## 📐 Architecture Overview

User
└─> Web Interface (React + Tailwind)
├─> Upload/Camera Input
├─> AI Detection (Hugging Face API)
├─> Multilingual TTS (Coqui / Open-Source)
└─> UI Display (Tablet info, usage guide, feedback)

yaml
Copy code

*Optional: Insert a diagram image of architecture here for portfolio impact.*

---

## 📂 Project Structure

medguard-ai/
│
├─ src/
│ ├─ components/ # Reusable React components (Buttons, Cards, Modals)
│ ├─ pages/ # Main pages (Home, Scanner, About)
│ ├─ styles/ # Tailwind + global CSS
│ └─ assets/ # Logos, icons, images
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
Default Vite port: http://localhost:5173

📦 Deployment
Vercel Deployment
Login to Vercel

Import GitHub repository

Set build command: npm run build

Set output directory: dist

Deploy and access your live site

Netlify Deployment
Connect GitHub repository to Netlify

Build command: npm run build

Publish directory: dist

Deploy live site


🎯 Future Enhancements
Real-time tablet scanning using camera API

Enhanced AI detection with higher accuracy

User account system with scan history & tracking

Medication reminder alerts

Progressive Web App (PWA) for offline support

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

📬 Contact
Sai Srinivas Reddy – GitHub | Email: saisrinivasreddy456@gmail.com
