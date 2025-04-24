
import { cn } from "@/lib/utils";

type MessageType = "user" | "ai" | "system";

interface ChatMessageProps {
  content: string;
  type: MessageType;
}

export const ChatMessage = ({ content, type }: ChatMessageProps) => {
  const isRecipe = type === "ai" && content.startsWith("# ");

  return (
    <div
      className={cn(
        "animate-fade-in",
        type === "user"
          ? "ml-auto bg-primary text-primary-foreground rounded-xl rounded-br-sm p-4 max-w-[85%]"
          : type === "ai" && !isRecipe
          ? "mr-auto glass rounded-xl rounded-bl-sm p-4 max-w-[85%]"
          : isRecipe
          ? "mr-auto w-full max-w-3xl"
          : "mx-auto bg-muted text-muted-foreground text-sm py-2 px-4 rounded-xl"
      )}
    >
      {isRecipe ? <RecipeChat.format(content) /> : content}
    </div>
  );
};
