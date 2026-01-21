import { Shield, Heart, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";

export const About = () => {
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
              <span className="holographic-text">About MedGuard AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protecting global health with AI-powered medicine verification technology
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel-strong p-8 lg:p-12 mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-center holographic-text">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              MedGuard AI is committed to eliminating counterfeit medicines through cutting-edge artificial intelligence. 
              We believe everyone deserves access to authentic, safe medications. Our platform leverages advanced 
              machine learning to provide instant, accurate medicine verification, protecting millions of people worldwide.
            </p>
          </motion.div>

          {/* Core Values */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              {
                icon: Shield,
                title: "Safety First",
                description: "Your health and safety is our top priority"
              },
              {
                icon: Heart,
                title: "Accessibility",
                description: "Free verification for everyone, everywhere"
              },
              {
                icon: Zap,
                title: "Innovation",
                description: "Cutting-edge AI technology at your fingertips"
              },
              {
                icon: Users,
                title: "Community",
                description: "Building a safer healthcare ecosystem together"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="glass-panel p-6 text-center hover-lift group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow-blue group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel-strong p-8 lg:p-12 mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center holographic-text">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: "100+", label: "Verifications" },
                { number: "99.9%", label: "Accuracy" },
                { number: "Indian", label: "Based" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold holographic-text mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technology */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 lg:p-12"
          >
            <h2 className="text-3xl font-bold mb-6 holographic-text">Powered by AI</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              MedGuard AI utilizes state-of-the-art deep learning models trained on millions of verified medicine images. 
              Our neural networks can identify subtle differences between authentic and counterfeit medicines with unprecedented accuracy.
              ⚠️ MedGuard AI is for informational purposes only.
              Always consult a licensed doctor or pharmacist before medication use.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Key Technologies:</h3>
                <ul className="space-y-2">
                  {[
                    "Computer Vision AI",
                    "Deep Neural Networks",
                    "Real-time Image Processing",
                    "Multi-language NLP"
                  ].map((tech, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-muted-foreground">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Features:</h3>
                <ul className="space-y-2">
                  {[
                    "Instant Verification",
                    "Offline Capability",
                    "Voice Assistance",
                    "Global Database"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
