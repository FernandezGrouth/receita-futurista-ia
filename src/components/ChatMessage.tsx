
import { cn } from "@/lib/utils";

type MessageType = "user" | "ai" | "system";

interface ChatMessageProps {
  content: string;
  type: MessageType;
}

export const ChatMessage = ({ content, type }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-xl max-w-[85%] animate-fade-in",
        type === "user"
          ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
          : type === "ai"
          ? "mr-auto glass rounded-bl-sm"
          : "mx-auto bg-muted text-muted-foreground text-sm py-2"
      )}
    >
      {content}
    </div>
  );
};
