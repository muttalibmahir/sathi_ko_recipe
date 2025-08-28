import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import Recipes from "@/pages/recipes";
import RecipeDetail from "@/pages/recipe-detail";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/recipe/:id" component={RecipeDetail} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 15}s`,
      }}
    />
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="sathi-ko-recipe-theme">
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground animated-background">
            {/* Geometric Pattern Background */}
            <div className="geometric-pattern" />
            
            {/* Moving Orbs */}
            <div className="moving-orbs">
              <div className="orb orb-1"></div>
              <div className="orb orb-2"></div>
              <div className="orb orb-3"></div>
            </div>
            
            {/* Floating Particles */}
            <div className="floating-particles">
              {particles}
            </div>
            
            {/* Main Content */}
            <div className="relative z-10">
              <Navbar />
              <main>
                <Router />
              </main>
              <Footer />
            </div>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
