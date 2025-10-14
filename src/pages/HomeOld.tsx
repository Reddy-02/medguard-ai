import { Link } from "react-router-dom";
import { ArrowRight, Shield, Sparkles, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPill from "@/assets/hero-pill.jpg";

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(215_100%_40%/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(160_100%_50%/0.1),transparent_50%)]" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="text-left space-y-8">
              <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>AI-Powered Authentication</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Verify Your
                <span className="holographic-text block mt-2">
                  Medicine Instantly
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                Advanced AI technology to authenticate tablets, provide complete usage information, 
                and ensure your safety with hyper-realistic 3D verification.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/checker">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_40px_hsl(215_100%_40%/0.4)] transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Check Tablet Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>

                <Link to="/guide">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto glass-panel border-primary/30 hover:border-primary hover:neon-glow-blue"
                  >
                    Usage Guide
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { value: "99.9%", label: "Accuracy" },
                  { value: "50K+", label: "Medicines" },
                  { value: "24/7", label: "Available" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold holographic-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - 3D Pill */}
            <div className="relative lg:h-[600px] h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse-glow" />
              <div className="relative floating-3d">
                <img
                  src={heroPill}
                  alt="Holographic Medicine Tablet"
                  className="w-full h-auto max-w-lg rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Why Choose <span className="holographic-text">MedGuard AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology meets healthcare trust
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Trusted",
                description: "Bank-level encryption and HIPAA compliant security",
              },
              {
                icon: Zap,
                title: "Instant Results",
                description: "Get comprehensive information in seconds",
              },
              {
                icon: Globe,
                title: "Multi-Language",
                description: "Support for 50+ languages worldwide",
              },
              {
                icon: Sparkles,
                title: "AI-Powered",
                description: "Advanced machine learning for accuracy",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-panel p-8 hover-lift group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:neon-glow-blue transition-all">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel-strong p-12 lg:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Verify Your Medicine?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust MedGuard AI for safe medication verification
            </p>
            <Link to="/checker">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_60px_hsl(215_100%_40%/0.5)] transition-all duration-300 text-lg px-8 py-6"
              >
                Start Verification <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
