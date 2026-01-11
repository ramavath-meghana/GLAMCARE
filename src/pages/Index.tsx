import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Users, MessageCircle, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-skincare.jpg";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "AI Skin Analysis",
      description: "Upload a photo or use your camera for instant skin type detection and personalized recommendations",
    },
    {
      icon: Sparkles,
      title: "Home Remedies",
      description: "Get natural, effective remedies tailored to your specific skin concerns",
    },
    {
      icon: Users,
      title: "Expert Dermatologists",
      description: "Book appointments with verified doctors across major Indian cities",
    },
    {
      icon: MessageCircle,
      title: "AI Chatbot",
      description: "Get instant answers to your skincare questions 24/7",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Personal
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  AI Skincare Expert
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Analyze your skin instantly, get personalized remedies, and connect with expert dermatologists - all powered by AI
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/analyze">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-smooth">
                    <Camera className="w-5 h-5 mr-2" />
                    Analyze Your Skin
                  </Button>
                </Link>
                <Link to="/doctors">
                  <Button size="lg" variant="outline" className="transition-smooth">
                    Find Doctors
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="Skincare Analysis"
                className="rounded-2xl shadow-soft relative z-10 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need for Perfect Skin
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combining AI technology with expert dermatology care
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-soft hover:shadow-glow transition-smooth border border-border group"
              >
                <div className="p-3 rounded-lg bg-gradient-primary w-fit mb-4 group-hover:scale-110 transition-smooth">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-primary rounded-2xl p-12 text-center shadow-glow">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Start Your Skincare Journey Today
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust GlamCare for their skincare needs
            </p>
            <Link to="/analyze">
              <Button size="lg" variant="secondary" className="shadow-soft">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
