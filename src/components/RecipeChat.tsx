import { useState } from "react";
import { ChatContainer, Message } from "./ChatContainer";
import { ChatInput } from "./ChatInput";
import { toast } from "sonner";
import { Card } from "./ui/card";
import { BookOpenText, ChefHat, ListOrdered, Utensils } from "lucide-react";

const initialMessages: Message[] = [];
const WEBHOOK_URL = "https://natanfernades.app.n8n.cloud/webhook-test/959eb742-da6d-41d8-8c4d-83caaaac362b";

export const RecipeChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const formatRecipe = (recipe: string): JSX.Element => {
    const sections = recipe.split('\n\n');
    const title = sections[0].replace('# ', '');
    const ingredients = sections[1].replace('## Ingredientes\n', '').split('\n');
    const preparation = sections[2].replace('## Modo de Preparo\n', '').split('\n');
    const tip = sections[3].replace('## Dica do Chef\n', '');

    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center gap-3">
          <ChefHat className="w-8 h-8 text-primary animate-bounce" />
          <h2 className="text-2xl font-bold text-gradient">{title}</h2>
        </div>
        
        <Card className="glass-card p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Ingredientes</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {ing.replace('- ', '')}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Modo de Preparo</h3>
            </div>
            <ol className="space-y-3 text-muted-foreground">
              {preparation.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-medium">
                    {i + 1}
                  </span>
                  <span className="flex-1">{step.replace(/^\d+\.\s/, '')}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex items-start gap-2 p-4 bg-primary/5 rounded-lg">
            <BookOpenText className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <h4 className="font-medium mb-1">Dica do Chef</h4>
              <p className="text-sm text-muted-foreground">{tip}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  };

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

    const userMessage: Message = {
      id: Date.now().toString(),
      content: ingredients,
      type: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    triggerWebhook(ingredients);

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
