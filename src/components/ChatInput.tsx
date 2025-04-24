
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Search } from "lucide-react";

interface ChatInputProps {
  onSend: (ingredients: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center">
        <Input
          placeholder="Digite os ingredientes que você tem (ex: arroz, feijão, cebola...)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="pr-24 pl-10 h-14 rounded-full border-primary/20 bg-background shadow-md focus-visible:ring-primary glass"
          disabled={isLoading}
        />
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <Button
          type="submit"
          size="sm"
          disabled={isLoading || !input.trim()}
          className={`absolute right-1.5 rounded-full h-10 ${
            !input.trim() ? "bg-muted text-muted-foreground" : "bg-gradient-futuristic"
          } transition-all duration-300`}
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
          ) : (
            <ArrowRight className="h-5 w-5" />
          )}
        </Button>
      </div>
    </form>
  );
};
