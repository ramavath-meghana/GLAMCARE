import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Users, MessageCircle, Sparkles, Leaf, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/HERO.png";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "AI Skin Analysis",
      description: "Upload a photo for skin health assessment and personalized wellness recommendations",
    },
    {
      icon: Sparkles,
      title: "Home Remedies",
      description: "Get natural, safe remedies using kitchen ingredients for common skin concerns",
    },
    {
      icon: Users,
      title: "Expert Dermatologists",
      description: "Book appointments with verified doctors across major Indian cities",
    },
    {
      icon: MessageCircle,
      title: "AI Wellness Chat",
      description: "Get instant answers about skin health and wellness 24/7",
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
                Healthy Inside,
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Radiant Outside
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Your skin reflects your inner health. Discover holistic skincare solutions through AI analysis, natural remedies, and expert dermatology - all focused on wellness, not beauty standards.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/analyze">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-smooth">
                    <Camera className="w-5 h-5 mr-2" />
                    Analyze Your Skin
                  </Button>
                </Link>
                <Link to="/doctors">
                  <Button size="lg" variant="outline" className="transition-smooth">
                    <Users className="w-5 h-5 mr-2" />
                    Find Doctors
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/remedies">
                  <Button size="lg" variant="secondary" className="transition-smooth">
                    <Leaf className="w-5 h-5 mr-2" />
                    Home Remedies
                  </Button>
                </Link>
                <Link to="/products">
                  <Button size="lg" variant="secondary" className="transition-smooth">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Recommended Products
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="Healthy skin reflects inner wellness"
                className="rounded-2xl shadow-soft relative z-10 w-full"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 z-20 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  "True skin health comes from within - nutrition, hydration, sleep, and balance."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Holistic Skin Wellness
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combining AI technology with natural remedies and expert care - focused on health, not cosmetic standards
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

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-lg text-muted-foreground mb-8">
              At GlamCare, we believe that external skin health is a reflection of internal wellness. 
              We focus on education about diet, lifestyle, and habits rather than cosmetic beauty standards. 
              Our recommendations are health-focused, inclusive, and ethical.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">🥗 Nutrition First</h4>
                <p className="text-sm text-muted-foreground">What you eat directly impacts your skin</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">💧 Hydration</h4>
                <p className="text-sm text-muted-foreground">Water is the foundation of healthy skin</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">😴 Rest & Balance</h4>
                <p className="text-sm text-muted-foreground">Sleep and stress management matter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-primary rounded-2xl p-12 text-center shadow-glow">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Understand your skin's needs and discover how internal health reflects on the outside
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
