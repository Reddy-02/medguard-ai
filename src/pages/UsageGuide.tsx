import { Shield, Upload, Search, CheckCircle, AlertTriangle, Pill } from "lucide-react";
import { motion } from "framer-motion";

export const UsageGuide = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const steps = [
    {
      icon: Upload,
      title: "Upload Medicine Image",
      description: "Take a clear photo of your tablet or capsule. Ensure good lighting and focus.",
      tips: ["Use natural light", "Avoid shadows", "Center the tablet"]
    },
    {
      icon: Search,
      title: "AI Analysis",
      description: "Our advanced AI scans the image and cross-references with millions of verified medicine records.",
      tips: ["Process takes 2-3 seconds", "99.9% accuracy rate", "Real-time verification"]
    },
    {
      icon: CheckCircle,
      title: "Get Results",
      description: "Receive instant verification with detailed information about the medicine.",
      tips: ["Dosage information", "Side effects", "Precautions"]
    }
  ];

  const safetyTips = [
    {
      icon: Shield,
      title: "Always Verify",
      description: "Check every medicine before consumption, especially from new sources"
    },
    {
      icon: AlertTriangle,
      title: "Watch for Signs",
      description: "Look for unusual color, smell, or texture. These could indicate counterfeits"
    },
    {
      icon: Pill,
      title: "Check Packaging",
      description: "Authentic medicines have proper seals, batch numbers, and expiry dates"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="holographic-text">How to Use MedGuard AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to verify your medicine authenticity.
              MedGuard AI is for informational purposes only.
              Always consult a licensed doctor or pharmacist before medication use.
            </p>
          </motion.div>

          {/* Steps Section */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="glass-panel p-8 hover-lift group relative"
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl neon-glow-blue">
                  {index + 1}
                </div>

                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:neon-glow-blue transition-all">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-primary">Quick Tips:</p>
                  <ul className="space-y-1">
                    {step.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Safety Tips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel-strong p-8 lg:p-12 mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="holographic-text">Safety Guidelines</span>
            </h2>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {safetyTips.map((tip, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow-blue">
                    <tip.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
                  <p className="text-muted-foreground">{tip.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="glass-panel p-8 hover-lift">
              <h3 className="text-2xl font-bold mb-4">Multi-Language Support</h3>
              <p className="text-muted-foreground mb-6">
                Get medicine information in your preferred language with text-to-speech capabilities.
              </p>
              <div className="flex flex-wrap gap-2">
                {["English", "Spanish", "French", "German", "Hindi", "Chinese"].map((lang) => (
                  <span key={lang} className="px-3 py-1 glass-panel text-sm rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 hover-lift">
              <h3 className="text-2xl font-bold mb-4">Instant Results</h3>
              <p className="text-muted-foreground mb-6">
                Our AI processes images in real-time, providing you with immediate verification results.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm">Average processing time: 2-3 seconds</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm">99.9% accuracy rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm">Works offline after first load</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
