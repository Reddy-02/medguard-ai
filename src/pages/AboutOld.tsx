import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

export const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      bio: "15+ years in pharmaceutical research and AI healthcare applications"
    },
    {
      name: "Alex Rodriguez",
      role: "Lead AI Engineer",
      bio: "Former Google AI researcher specializing in computer vision and pattern recognition"
    },
    {
      name: "Emma Thompson",
      role: "Product Director",
      bio: "Healthcare technology veteran with a passion for patient safety"
    },
    {
      name: "Dr. Michael Park",
      role: "Clinical Advisor",
      bio: "Board-certified pharmacist and medication safety expert"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* About Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About <span className="holographic-text">MedGuard AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make medication verification accessible to everyone. 
              Using cutting-edge AI and machine learning, we help people identify their 
              medications and understand how to use them safely.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="glass-panel-strong p-8 hover-lift">
              <h2 className="text-2xl font-bold mb-4 holographic-text">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower individuals worldwide with instant, accurate medication information 
                through advanced AI technology, reducing medication errors and improving patient safety.
              </p>
            </div>
            <div className="glass-panel-strong p-8 hover-lift">
              <h2 className="text-2xl font-bold mb-4 holographic-text">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where everyone has immediate access to reliable medication information, 
                regardless of language or location, creating a safer healthcare ecosystem for all.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Meet Our <span className="holographic-text">Team</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 text-center hover-lift group"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 group-hover:neon-glow-blue transition-all" />
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-panel-strong p-8">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="glass-panel border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="glass-panel border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="glass-panel border-primary/30 focus:border-primary resize-none"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_40px_hsl(215_100%_40%/0.4)] transition-all"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Have questions? We're here to help. Reach out through any of these channels.
                </p>
              </div>

              <div className="space-y-6">
                <div className="glass-panel p-6 flex items-start gap-4 hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">support@medguard.ai</p>
                  </div>
                </div>

                <div className="glass-panel p-6 flex items-start gap-4 hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="glass-panel p-6 flex items-start gap-4 hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123 Medical Plaza<br />
                      San Francisco, CA 94102<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
