import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Scan, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Camera,
  Sparkles
} from 'lucide-react';

const TabletChecker = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        simulateVerification();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateVerification = () => {
    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      const isAuthentic = Math.random() > 0.3;
      setVerificationResult({
        isAuthentic,
        confidence: Math.floor(Math.random() * 30) + 70,
        details: {
          manufacturer: "Pfizer Inc.",
          medication: "Atorvastatin Calcium",
          dosage: "20mg",
          batchNumber: "BT235X789",
          expiryDate: "2026-12-31",
          manufacturingDate: "2024-01-15"
        },
        warnings: isAuthentic ? [] : ["Batch number mismatch", "Packaging irregularities detected"]
      });
      setIsVerifying(false);
    }, 2500);
  };

  const handleCameraCapture = () => {
    // Camera capture logic would go here
    alert("Camera capture would be implemented with device media API");
  };

  const handleManualEntry = () => {
    // Manual entry modal logic
    alert("Manual entry modal would open here");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      {/* Holographic Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl rounded-full" />
        <h1 className="relative text-5xl md:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Tablet Checker
        </h1>
        <p className="relative text-center text-gray-300 text-xl">
          Instant AI Verification for Pharmaceutical Authenticity
        </p>
        <div className="absolute -top-4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <div className="absolute -top-2 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Upload & Verification Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Holographic Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 rounded-3xl border border-emerald-500/30" />
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-2 border-emerald-400/30 rounded-full"
            />
          </div>

          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700 p-8 shadow-2xl">
            {/* Upload Area */}
            <div
              className={`border-2 ${isDragging ? 'border-emerald-500 border-dashed' : 'border-gray-600'} rounded-2xl p-12 text-center transition-all duration-300 ${!uploadedImage ? 'hover:border-emerald-400 cursor-pointer' : ''}`}
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
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block p-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full mb-6"
                  >
                    <Upload className="w-16 h-16 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4">Upload Tablet Image</h3>
                  <p className="text-gray-400 mb-6">Drag & drop or click to upload</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCameraCapture();
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <Camera className="w-5 h-5" />
                      Use Camera
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleManualEntry();
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full border border-gray-600 hover:border-gray-500 transition-colors"
                    >
                      Enter Details
                    </button>
                  </div>
                </>
              ) : (
                <div className="relative">
                  <div className="absolute -top-6 -right-6">
                    <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                  </div>
                  <div className="w-48 h-48 mx-auto mb-6 relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded tablet"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                    <div className="absolute inset-0 border-2 border-emerald-400/50 rounded-2xl" />
                  </div>
                  <p className="text-emerald-400 mb-6">Image ready for verification</p>
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="px-6 py-3 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-full border border-red-600/50 hover:border-red-500 transition-colors"
                  >
                    Upload New Image
                  </button>
                </div>
              )}
            </div>

            {/* Verification Status */}
            {isVerifying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 text-center"
              >
                <div className="inline-block relative">
                  <Scan className="w-16 h-16 text-cyan-400 animate-spin" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping" />
                </div>
                <h4 className="text-xl font-semibold mt-4 mb-2">AI Verification in Progress</h4>
                <p className="text-gray-400">Analyzing tablet features and security markers...</p>
                <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto mt-6">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Verification Result */}
            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {verificationResult.isAuthentic ? (
                      <>
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                        <div>
                          <h4 className="text-2xl font-bold text-emerald-400">Authentic</h4>
                          <p className="text-gray-400">Verified by AI</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-10 h-10 text-red-400" />
                        <div>
                          <h4 className="text-2xl font-bold text-red-400">Counterfeit Detected</h4>
                          <p className="text-gray-400">Verification Failed</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      {verificationResult.confidence}%
                    </div>
                    <p className="text-gray-400">Confidence Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(verificationResult.details).map(([key, value]) => (
                    <div key={key} className="bg-gray-900/50 rounded-xl p-3">
                      <p className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
                </div>

                {verificationResult.warnings.length > 0 && (
                  <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-4">
                    <h5 className="font-semibold text-red-300 mb-2">Security Warnings:</h5>
                    <ul className="space-y-1">
                      {verificationResult.warnings.map((warning, idx) => (
                        <li key={idx} className="text-red-200 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            {!isVerifying && !verificationResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={simulateVerification}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-3"
                  disabled={!uploadedImage}
                >
                  <Scan className="w-6 h-6" />
                  Start AI Verification
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Right Column - Features & Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Features */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 p-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose Tablet Checker?
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: "Military-Grade Security",
                  description: "Blockchain-backed verification with 256-bit encryption",
                  color: "emerald"
                },
                {
                  icon: Scan,
                  title: "Real-Time AI Analysis",
                  description: "Instant verification using computer vision and deep learning",
                  color: "cyan"
                },
                {
                  icon: Sparkles,
                  title: "Holographic Detection",
                  description: "Advanced hologram and security feature recognition",
                  color: "blue"
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-800/50 to-transparent hover:from-gray-800 transition-all"
                >
                  <div className={`p-3 rounded-xl bg-${feature.color}-500/20`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "99.8%", label: "Accuracy Rate" },
              { value: "2.4s", label: "Avg Verification" },
              { value: "50K+", label: "Tablets Verified" },
              { value: "24/7", label: "Active Monitoring" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-6 text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Hologram Preview */}
          <div className="relative bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 rounded-3xl border border-emerald-500/30 p-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full -translate-x-16 -translate-y-16 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full translate-x-16 translate-y-16 blur-3xl" />
            
            <h3 className="text-2xl font-bold mb-4 text-center">Live Hologram Detection</h3>
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 border-4 border-emerald-400/50 rounded-full animate-pulse" />
              <div className="absolute inset-4 border-4 border-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-8 border-4 border-emerald-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-24 h-24 text-emerald-400/70" />
              </div>
            </div>
            <p className="text-center text-gray-400 mt-6">
              Advanced holographic pattern recognition active
            </p>
          </div>
        </motion.div>
      </div>

      {/* AI ACTIVE Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full px-6 py-3 flex items-center gap-3 shadow-2xl"
      >
        <div className="w-3 h-3 bg-white rounded-full animate-ping" />
        <span className="font-semibold">AI ACTIVE</span>
        <Scan className="w-5 h-5 animate-spin" />
      </motion.div>
    </div>
  );
};

export default TabletChecker;
