
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className 
}: FeatureCardProps) => {
  return (
    <div className={cn(
      "glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group", 
      className
    )}>
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-primary group-hover:text-secondary transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gradient">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
