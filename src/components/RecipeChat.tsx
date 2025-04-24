import { useState } from "react";
import { ChatContainer, Message } from "./ChatContainer";
import { ChatInput } from "./ChatInput";
import { toast } from "sonner";

const initialMessages: Message[] = [];
const WEBHOOK_URL = "https://natanfernades.app.n8n.cloud/webhook-test/959eb742-da6d-41d8-8c4d-83caaaac362b";

export const RecipeChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const generateFakeRecipe = (ingredients: string): string => {
    const ingredientsList = ingredients.split(",").map(i => i.trim());
    
    return `
# ${ingredientsList.length <= 2 ? 'Prato Simples' : 'Prato Especial'} com ${ingredientsList[0]}

## Ingredientes
${ingredientsList.map(ing => `- ${ing}`).join('\n')}
${ingredientsList.length < 3 ? '- Sal e pimenta a gosto\n- Azeite\n- Temperos de sua preferência' : '- Temperos a gosto'}

## Modo de Preparo
1. Comece preparando ${ingredientsList[0]} em uma panela.
2. ${ingredientsList.length > 1 ? `Adicione ${ingredientsList[1]} e misture bem.` : 'Tempere a gosto e mexa ocasionalmente.'}
3. ${ingredientsList.length > 2 ? `Incorpore ${ingredientsList[2]} e continue cozinhando por 5-7 minutos.` : 'Cozinhe em fogo médio por 10 minutos.'}
4. Finalize com os temperos de sua preferência.
5. Sirva quente e bom apetite!

## Dica do Chef
${ingredientsList.length > 2 
  ? 'Esta receita fica ainda melhor se você deixar descansar por 5 minutos antes de servir!' 
  : 'Experimente adicionar ervas frescas no final para realçar o sabor!'}
    `;
  };

  const triggerWebhook = async (ingredients: string) => {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ingredients,
          timestamp: new Date().toISOString(),
        }),
      });

      console.log("Webhook triggered successfully");
    } catch (error) {
      console.error("Error triggering webhook:", error);
    }
  };

  const handleSend = (ingredients: string) => {
    if (!ingredients.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: ingredients,
      type: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Trigger webhook
    triggerWebhook(ingredients);

    // Simulate API delay
    setTimeout(() => {
      try {
        const recipe = generateFakeRecipe(ingredients);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: recipe,
          type: "ai",
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      } catch (error) {
        toast.error("Erro ao gerar a receita. Tente novamente.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <ChatContainer messages={messages} />
      </div>
      <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
};
