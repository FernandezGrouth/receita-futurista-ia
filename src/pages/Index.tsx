
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { RecipeChat } from "@/components/RecipeChat";
import { FeatureCard } from "@/components/FeatureCard";
import { Book, Clock, Menu, MessageCircle, Search, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [showMobileFeatures, setShowMobileFeatures] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden rounded-full text-primary hover:text-primary hover:bg-primary/20"
              onClick={() => setShowMobileFeatures(!showMobileFeatures)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container flex-1 flex flex-col md:flex-row gap-8 py-12">
        <div className="w-full md:w-7/12 lg:w-8/12 flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight">
              Crie <span className="text-gradient">receitas</span> com os <br className="hidden md:block" />
              ingredientes que você tem
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Use nossa inteligência artificial para criar receitas deliciosas com os ingredientes disponíveis na sua cozinha.
            </p>
          </div>

          {/* Chat */}
          <div className="flex-1 min-h-[500px] glass-card rounded-2xl overflow-hidden">
            <RecipeChat />
          </div>
        </div>

        {/* Features sidebar - desktop */}
        <div className="hidden md:flex md:w-5/12 lg:w-4/12 flex-col gap-6">
          <FeatureCard 
            icon={Search}
            title="Pesquisa Inteligente"
            description="Nossa IA entende quais ingredientes você tem disponíveis e sugere as melhores combinações."
          />
          <FeatureCard 
            icon={Book}
            title="Receitas Completas"
            description="Receba instruções detalhadas, tempos de preparo e dicas de apresentação para suas receitas."
          />
          <FeatureCard 
            icon={Clock}
            title="Salve Suas Favoritas"
            description="Guarde suas receitas favoritas para consultar depois e nunca perder aquela ideia incrível."
          />
          <FeatureCard 
            icon={Share}
            title="Compartilhe"
            description="Envie receitas para amigos ou familiares por WhatsApp, email ou redes sociais."
          />
        </div>
        
        {/* Features for mobile - collapsible */}
        {showMobileFeatures && (
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard 
              icon={Search}
              title="Pesquisa Inteligente"
              description="Nossa IA entende quais ingredientes você tem disponíveis."
            />
            <FeatureCard 
              icon={Book}
              title="Receitas Completas"
              description="Receba instruções detalhadas e dicas para suas receitas."
            />
            <FeatureCard 
              icon={Clock}
              title="Salve Favoritas"
              description="Guarde suas receitas favoritas para consultar depois."
            />
            <FeatureCard 
              icon={Share}
              title="Compartilhe"
              description="Envie receitas para amigos por WhatsApp ou email."
            />
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="py-6 glass mt-auto">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo className="text-sm" />
            <span className="text-sm text-muted-foreground">© 2025 ReceitaIA. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
              Sobre
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
              Contato
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
              Termos
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
              Privacidade
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
