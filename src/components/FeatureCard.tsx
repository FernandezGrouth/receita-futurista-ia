
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
      "rounded-xl glass p-6 hover:shadow-lg transition-all duration-300 animate-float", 
      className
    )}>
      <div className="bg-gradient-futuristic w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
