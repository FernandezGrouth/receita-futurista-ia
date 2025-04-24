
import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";

export interface Message {
  id: string;
  content: string;
  type: "user" | "ai" | "system";
}

interface ChatContainerProps {
  messages: Message[];
}

export const ChatContainer = ({ messages }: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto px-4 py-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-slow" />
            <div className="absolute inset-2 bg-gradient-to-br from-primary via-secondary to-accent rounded-full animate-spin-slow" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Crie receitas incríveis</h2>
          <p className="text-muted-foreground max-w-md">
            Digite os ingredientes que você tem disponíveis e nossa IA irá sugerir receitas deliciosas para você preparar.
          </p>
        </div>
      )}
      {messages.map((message) => (
        <ChatMessage key={message.id} content={message.content} type={message.type} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
