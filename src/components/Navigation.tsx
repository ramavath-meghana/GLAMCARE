import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/analyze", label: "Skin Analysis" },
    { path: "/doctors", label: "Find Doctors" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-primary shadow-soft group-hover:shadow-glow transition-all">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              GlamCare
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={location.pathname === link.path ? "secondary" : "ghost"}
                  className="transition-smooth"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <Link to="/analyze">
            <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
              Start Analysis
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
