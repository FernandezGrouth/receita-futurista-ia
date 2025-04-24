
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-primary rounded-full opacity-70 animate-pulse-slow" />
        <div className="absolute inset-1 bg-background rounded-full" />
        <div className="absolute inset-[5px] bg-gradient-to-br from-primary via-secondary to-accent rounded-full animate-spin-slow" />
      </div>
      <h1 className="text-xl font-bold">
        <span className="text-gradient">Receita</span>
        <span className="text-foreground">IA</span>
      </h1>
    </div>
  );
};
