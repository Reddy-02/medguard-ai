import { Pill, FileText, Shield, AlertTriangle, Clock, Users } from "lucide-react";

export const UsageGuide = () => {
  const guideCards = [
    {
      icon: Pill,
      title: "How to Use MedGuard AI",
      description: "Upload a clear photo of your tablet or enter its imprint code. Our AI will instantly identify it and provide comprehensive information.",
      steps: [
        "Take a clear, well-lit photo of the tablet",
        "Upload the image or enter the imprint code",
        "Select your preferred language",
        "Click 'Check Tablet' to verify",
        "Review the detailed results"
      ]
    },
    {
      icon: FileText,
      title: "Understanding Results",
      description: "Learn how to interpret the information provided by MedGuard AI for safe medication use.",
      steps: [
        "Medication name and active ingredients",
        "Medical conditions it treats",
        "Recommended dosage and frequency",
        "Important precautions and warnings",
        "Possible side effects to watch for"
      ]
    },
    {
      icon: Shield,
      title: "Safety Guidelines",
      description: "Follow these essential safety guidelines when using any medication.",
      steps: [
        "Always consult your healthcare provider",
        "Never exceed recommended dosage",
        "Check for drug interactions",
        "Store medications properly",
        "Report severe side effects immediately"
      ]
    },
    {
      icon: AlertTriangle,
      title: "When to Seek Help",
      description: "Recognize warning signs that require immediate medical attention.",
      steps: [
        "Severe allergic reactions (rash, swelling)",
        "Difficulty breathing or chest pain",
        "Unusual bleeding or bruising",
        "Severe or persistent side effects",
        "Suspected overdose or poisoning"
      ]
    },
    {
      icon: Clock,
      title: "Medication Timing",
      description: "Proper timing ensures maximum effectiveness and minimal side effects.",
      steps: [
        "Take medications at consistent times",
        "Follow 'with food' or 'empty stomach' instructions",
        "Space multiple medications appropriately",
        "Set reminders for complex schedules",
        "Don't skip doses without consulting doctor"
      ]
    },
    {
      icon: Users,
      title: "Special Populations",
      description: "Additional considerations for specific groups of people.",
      steps: [
        "Pregnant or breastfeeding women",
        "Children and infants (dosing by weight)",
        "Elderly patients (increased sensitivity)",
        "People with kidney or liver disease",
        "Patients taking multiple medications"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="holographic-text">Usage Guide</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about using MedGuard AI safely and effectively
            </p>
          </div>

          {/* Guide Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guideCards.map((card, index) => (
              <div
                key={index}
                className="glass-panel p-8 hover-lift group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:neon-glow-blue transition-all">
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {card.description}
                </p>
                
                <div className="space-y-3">
                  {card.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{stepIndex + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="mt-16 glass-panel-strong p-8 border-2 border-accent/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Important Disclaimer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  MedGuard AI is designed to provide medication information for educational purposes. 
                  It should not replace professional medical advice, diagnosis, or treatment. 
                  Always consult with a qualified healthcare provider before starting, stopping, 
                  or changing any medication regimen. In case of a medical emergency, 
                  call your local emergency number immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
