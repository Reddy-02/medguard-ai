import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Globe2, CheckCircle2, Sparkles } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Pill3D } from "@/components/3d/Pill3D";
import { motion } from "framer-motion";

export const Home = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass-panel-strong rounded-full"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">AI-Powered Verification</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="holographic-text">MedGuard AI</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Verify medicine authenticity instantly with cutting-edge AI technology. 
                Protect yourself from counterfeit drugs with our advanced verification system.
                MedGuard AI is for informational purposes only.
                Always consult a licensed doctor or pharmacist before medication use.
              </p>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-wrap gap-4"
              >
                <motion.div variants={item}>
                  <Link to="/checker">
                    <Button size="lg" className="text-lg px-8 py-6 neon-glow-blue">
                      <Shield className="w-5 h-5 mr-2" />
                      Start Verification
                    </Button>
                  </Link>
                </motion.div>
                <motion.div variants={item}>
                  <Link to="/guide">
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right: 3D Capsule */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-[500px] glass-panel-strong rounded-3xl overflow-hidden"
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <OrbitControls enableZoom={false} enablePan={false} />
                <Pill3D />
              </Canvas>
              
              {/* Holographic overlay effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-4 glass-panel px-4 py-2 rounded-lg">
                  <span className="text-accent font-mono text-sm">SCANNING...</span>
                </div>
                <div className="absolute bottom-4 left-4 glass-panel px-4 py-2 rounded-lg">
                  <span className="text-primary font-mono text-sm">AI ACTIVE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="holographic-text">Advanced Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by cutting-edge AI and machine learning technology
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "AI Verification",
                description: "Advanced AI analyzes tablet images to detect counterfeit medicines instantly"
              },
              {
                icon: Zap,
                title: "Real-time Results",
                description: "Get verification results in milliseconds with our optimized AI engine"
              },
              {
                icon: Globe2,
                title: "Multi-language",
                description: "Support for 50+ languages with text-to-speech capabilities"
              },
              {
                icon: CheckCircle2,
                title: "99.9% Accuracy",
                description: "Industry-leading accuracy backed by millions of verified samples"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="glass-panel p-8 rounded-2xl hover-lift group"
              >
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow-blue group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Verify Your Medicine?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users protecting themselves from counterfeit drugs
          </p>
          <Link to="/checker">
            <Button size="lg" className="text-lg px-12 py-6 neon-glow-green">
              <Shield className="w-5 h-5 mr-2" />
              Start Free Verification
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};
