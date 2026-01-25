import React, { useState, useRef, useEffect } from 'react';
import './TabletChecker.css';

// Theme type definition
type Theme = 'light' | 'dark' | 'hologram' | 'medical' | 'cyber';

interface VerificationResult {
  isAuthentic: boolean;
  confidence: number;
  details: {
    manufacturer: string;
    medication: string;
    dosage: string;
    batchNumber: string;
    expiryDate: string;
    manufacturingDate: string;
  };
  warnings: string[];
}

// Icons as React components to avoid external dependencies
const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ScanIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <rect x="7" y="7" width="10" height="10" rx="1" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const ThemeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const TabletChecker = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('hologram');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Theme configurations
  const themes = {
    dark: {
      primary: 'from-emerald-500 to-cyan-500',
      secondary: 'from-gray-800 to-gray-900',
      text: 'text-white',
      bg: 'bg-gray-900',
      border: 'border-gray-700',
      card: 'bg-gray-800/80',
    },
    light: {
      primary: 'from-blue-500 to-teal-500',
      secondary: 'from-gray-100 to-gray-200',
      text: 'text-gray-800',
      bg: 'bg-gray-50',
      border: 'border-gray-300',
      card: 'bg-white/80',
    },
    hologram: {
      primary: 'from-emerald-400 via-cyan-400 to-blue-400',
      secondary: 'from-gray-900/80 to-black/80',
      text: 'text-white',
      bg: 'bg-gradient-to-br from-gray-900 via-black to-gray-800',
      border: 'border-emerald-500/30',
      card: 'bg-gray-900/40 backdrop-blur-sm',
    },
    medical: {
      primary: 'from-blue-400 to-indigo-500',
      secondary: 'from-white to-blue-50',
      text: 'text-gray-800',
      bg: 'bg-gradient-to-br from-blue-50 to-white',
      border: 'border-blue-300',
      card: 'bg-white/90',
    },
    cyber: {
      primary: 'from-purple-500 to-pink-500',
      secondary: 'from-gray-900 to-black',
      text: 'text-white',
      bg: 'bg-gradient-to-br from-gray-900 via-purple-900 to-black',
      border: 'border-purple-500/50',
      card: 'bg-gray-900/60 backdrop-blur-sm',
    },
  };

  const currentTheme = themes[theme];

  // Progress animation for verification
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVerifying) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isVerifying]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startVerification = () => {
    if (!uploadedImage) return;
    
    setIsVerifying(true);
    setVerificationResult(null);
    setProgress(0);

    // Simulate verification process
    setTimeout(() => {
      const isAuthentic = Math.random() > 0.3;
      setVerificationResult({
        isAuthentic,
        confidence: Math.floor(Math.random() * 30) + 70,
        details: {
          manufacturer: theme === 'medical' ? "Johnson & Johnson" : 
                     theme === 'cyber' ? "NeuroPharma Inc." : "Pfizer Inc.",
          medication: theme === 'medical' ? "Ibuprofen" : 
                     theme === 'cyber' ? "NanoVax" : "Atorvastatin",
          dosage: "20mg",
          batchNumber: "BT" + Math.floor(Math.random() * 1000),
          expiryDate: "2026-12-31",
          manufacturingDate: "2024-01-15"
        },
        warnings: isAuthentic ? [] : [
          "Batch number mismatch",
          "Packaging irregularities detected",
          "Hologram verification failed"
        ]
      });
      setIsVerifying(false);
    }, 2500);
  };

  const clearVerification = () => {
    setUploadedImage(null);
    setVerificationResult(null);
    setIsVerifying(false);
    setProgress(0);
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    const simulatedImage = 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="${theme === 'light' ? '#f0f9ff' : theme === 'medical' ? '#eff6ff' : '#1a1a2e'}"/>
        <circle cx="200" cy="150" r="80" fill="${theme === 'light' ? '#bae6fd' : theme === 'medical' ? '#93c5fd' : '#0ea5e9'}"/>
        <rect x="160" y="130" width="80" height="40" rx="10" fill="white"/>
        <text x="200" y="155" text-anchor="middle" font-family="Arial" font-size="14" fill="black">TABLET</text>
      </svg>
    `);
    setUploadedImage(simulatedImage);
  };

  const handleManualEntry = () => {
    const manualData = prompt("Enter tablet details (separated by commas):\nManufacturer, Medication, Dosage, Batch");
    if (manualData) {
      const [manufacturer, medication, dosage, batch] = manualData.split(',');
      setVerificationResult({
        isAuthentic: true,
        confidence: 95,
        details: {
          manufacturer: manufacturer.trim(),
          medication: medication.trim(),
          dosage: dosage.trim(),
          batchNumber: batch.trim(),
          expiryDate: "2026-12-31",
          manufacturingDate: "2024-01-15"
        },
        warnings: []
      });
    }
  };

  const cycleTheme = () => {
    const themeOrder: Theme[] = ['hologram', 'dark', 'light', 'medical', 'cyber'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  return (
    <div className={`tablet-checker-container ${currentTheme.bg} ${currentTheme.text} min-h-screen p-4 md:p-8 transition-colors duration-500`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={cycleTheme}
          className={`p-3 rounded-full bg-gradient-to-r ${currentTheme.primary} shadow-lg hover:opacity-90 transition-all`}
          title="Change theme"
        >
          <ThemeIcon />
        </button>
        <span className="text-xs mt-1 block text-center capitalize">{theme}</span>
      </div>

      {/* Header */}
      <div className="relative mb-8 md:mb-12 text-center">
        <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.primary} opacity-20 blur-3xl rounded-full`} />
        <h1 className={`relative text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
          Tablet Checker
        </h1>
        <p className="relative text-lg md:text-xl opacity-80">
          Instant AI Verification for Pharmaceutical Authenticity
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        {/* Left Column - Upload & Verification */}
        <div className={`relative rounded-3xl ${currentTheme.card} backdrop-blur-sm border ${currentTheme.border} p-6 md:p-8 shadow-2xl`}>
          {/* Upload Area */}
          <div
            className={`border-2 ${isDragging ? 'border-dashed opacity-100' : 'border-dashed opacity-70'} ${currentTheme.border} rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer hover:opacity-100`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !uploadedImage && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />

            {!uploadedImage ? (
              <>
                <div className="inline-block p-4 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 mb-6 animate-bounce">
                  <div className="w-12 h-12 md:w-16 md:h-16">
                    <UploadIcon />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">Upload Tablet Image</h3>
                <p className="opacity-70 mb-6">Drag & drop or click to upload</p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCameraCapture();
                    }}
                    className={`px-6 py-3 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                  >
                    <div className="w-5 h-5">
                      <CameraIcon />
                    </div>
                    Use Camera
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleManualEntry();
                    }}
                    className="px-6 py-3 rounded-full border hover:opacity-90 transition-opacity"
                  >
                    Enter Details
                  </button>
                </div>
              </>
            ) : (
              <div className="relative">
                <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded tablet"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                  <div className={`absolute inset-0 border-2 ${currentTheme.border} rounded-2xl animate-pulse`} />
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-full border hover:opacity-90 transition-opacity"
                  >
                    Change Image
                  </button>
                  <button
                    onClick={clearVerification}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-600/50 hover:border-red-500 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Verification Button */}
          {uploadedImage && !isVerifying && !verificationResult && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={startVerification}
                className={`px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r ${currentTheme.primary} hover:opacity-90 transition-opacity flex items-center gap-3 shadow-xl`}
              >
                <div className="w-6 h-6 animate-pulse">
                  <ScanIcon />
                </div>
                Start AI Verification
              </button>
            </div>
          )}

          {/* Verification Progress */}
          {isVerifying && (
            <div className="mt-8 text-center">
              <div className="inline-block relative">
                <div className="w-12 h-12 md:w-16 md:h-16 animate-spin">
                  <ScanIcon />
                </div>
                <div className="absolute inset-0 animate-ping opacity-30">
                  <ScanIcon />
                </div>
              </div>
              <h4 className="text-xl font-semibold mt-4 mb-2">AI Verification in Progress</h4>
              <p className="opacity-70">Analyzing tablet features and security markers...</p>
              <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto mt-6">
                <div
                  className={`h-full bg-gradient-to-r ${currentTheme.primary} transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm opacity-70">{progress}% complete</p>
            </div>
          )}

          {/* Verification Result */}
          {verificationResult && (
            <div className={`mt-8 rounded-2xl p-6 border ${currentTheme.border} bg-gradient-to-br from-gray-800/30 to-gray-900/30`}>
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  {verificationResult.isAuthentic ? (
                    <>
                      <div className="w-8 h-8 md:w-10 md:h-10 text-green-400">
                        <CheckCircleIcon />
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-green-400">Authentic</h4>
                        <p className="text-sm opacity-70">Verified by AI</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 md:w-10 md:h-10 text-red-400">
                        <AlertTriangleIcon />
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-red-400">Counterfeit</h4>
                        <p className="text-sm opacity-70">Verification Failed</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="text-center md:text-right">
                  <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
                    {verificationResult.confidence}%
                  </div>
                  <p className="text-sm opacity-70">Confidence Score</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                {Object.entries(verificationResult.details).map(([key, value]) => (
                  <div key={key} className={`rounded-xl p-3 ${currentTheme.card}`}>
                    <p className="text-xs opacity-70 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="font-semibold truncate">{value}</p>
                  </div>
                ))}
              </div>

              {verificationResult.warnings.length > 0 && (
                <div className="rounded-xl p-4 bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-700/30">
                  <h5 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                    <div className="w-4 h-4">
                      <AlertTriangleIcon />
                    </div>
                    Security Warnings:
                  </h5>
                  <ul className="space-y-1">
                    {verificationResult.warnings.map((warning, idx) => (
                      <li key={idx} className="text-red-200 text-sm">
                        • {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Features & Stats */}
        <div className="space-y-6 md:space-y-8">
          {/* Features */}
          <div className={`rounded-3xl ${currentTheme.card} border ${currentTheme.border} p-6 md:p-8`}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
              Why Choose Tablet Checker?
            </h2>
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  icon: ShieldIcon,
                  title: "Military-Grade Security",
                  description: "Advanced encryption and blockchain verification"
                },
                {
                  icon: ScanIcon,
                  title: "Real-Time AI Analysis",
                  description: "Instant verification using computer vision"
                },
                {
                  icon: SparklesIcon,
                  title: "Holographic Detection",
                  description: "Advanced hologram and security feature recognition"
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-4 p-4 rounded-2xl ${currentTheme.card} hover:bg-gradient-to-r hover:from-gray-800/30 hover:to-transparent transition-all`}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${currentTheme.primary} bg-opacity-20`}>
                    <div className="w-6 h-6 md:w-8 md:h-8">
                      <feature.icon />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="opacity-70 text-sm md:text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              { value: "99.8%", label: "Accuracy Rate" },
              { value: "2.4s", label: "Avg Verification" },
              { value: "50K+", label: "Tablets Verified" },
              { value: "24/7", label: "Active Monitoring" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`rounded-2xl ${currentTheme.card} border ${currentTheme.border} p-4 md:p-6 text-center`}
              >
                <div className={`text-2xl md:text-4xl font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <p className="opacity-70 mt-2 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Hologram Preview */}
          <div className={`relative rounded-3xl overflow-hidden border ${currentTheme.border} p-6 md:p-8`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.primary} opacity-10`} />
            
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center relative">
              Live Hologram Detection
            </h3>
            
            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
              <div className={`absolute inset-0 border-4 ${currentTheme.border} rounded-full animate-pulse`} />
              <div className={`absolute inset-4 border-4 ${currentTheme.border} opacity-50 rounded-full animate-pulse`} style={{ animationDelay: '0.5s' }} />
              <div className={`absolute inset-8 border-4 ${currentTheme.border} opacity-30 rounded-full animate-pulse`} style={{ animationDelay: '1s' }} />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-24 md:h-24 opacity-70">
                  <ShieldIcon />
                </div>
              </div>
            </div>
            
            <p className="text-center opacity-70 mt-6 relative">
              Advanced holographic pattern recognition active
            </p>
            
            {/* Animated dots */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-current rounded-full animate-ping" />
            <div className="absolute top-4 right-4 w-2 h-2 bg-current rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-current rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-current rounded-full animate-ping" style={{ animationDelay: '0.9s' }} />
          </div>
        </div>
      </div>

      {/* AI ACTIVE Badge */}
      <div className={`fixed bottom-4 md:bottom-8 right-4 md:right-8 rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3 shadow-2xl bg-gradient-to-r ${currentTheme.primary} animate-pulse`}>
        <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
        <span className="font-semibold text-sm md:text-base">AI ACTIVE</span>
        <div className="w-4 h-4 md:w-5 md:h-5 animate-spin">
          <ScanIcon />
        </div>
      </div>
    </div>
  );
};

export default TabletChecker;
