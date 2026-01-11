import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisDropdownProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: "primary" | "secondary" | "accent" | "muted";
}

const AnalysisDropdown = ({ 
  title, 
  icon, 
  children, 
  defaultOpen = false,
  variant = "primary"
}: AnalysisDropdownProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const variantStyles = {
    primary: "bg-gradient-primary/10 border-primary/20 hover:bg-gradient-primary/15",
    secondary: "bg-secondary/10 border-secondary/20 hover:bg-secondary/15",
    accent: "bg-accent/10 border-accent/20 hover:bg-accent/15",
    muted: "bg-muted/50 border-border hover:bg-muted/70",
  };

  return (
    <div className={cn("rounded-lg border transition-all", variantStyles[variant])}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h4 className="text-lg font-semibold">{title}</h4>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default AnalysisDropdown;
