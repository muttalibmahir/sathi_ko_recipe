import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const recipeCategories = [
    { name: "All Recipes", href: "/recipes", description: "View all authentic Nepali recipes" },
    { name: "Vegetarian", href: "/recipes?category=Vegetarian", description: "Plant-based traditional dishes" },
    { name: "Non-Veg", href: "/recipes?category=Non-Veg", description: "Meat and poultry specialties" },
    { name: "Quick Meals", href: "/recipes?quick=true", description: "Ready in 30 minutes or less" },
    { name: "Budget", href: "/recipes?budget=true", description: "Affordable student-friendly meals" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    return href !== "/" && location.startsWith(href);
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <img 
                    src="/src/assets/logo.png" 
                    alt="Sathi Ko Recipe Logo" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Sathi Ko Recipe</h1>
                  <p className="text-xs text-muted-foreground">Simple Recipe</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} data-testid={`link-${item.name.toLowerCase()}`}>
                <span
                  className={`nav-link font-medium transition-colors duration-200 cursor-pointer ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            
            {/* Recipes Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild data-testid="dropdown-recipes">
                <Button 
                  variant="ghost" 
                  className={`nav-link font-medium transition-all duration-200 flex items-center space-x-1 hover:scale-105 active:scale-95 ${
                    location.startsWith('/recipes')
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <span>Recipes</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 animate-in slide-in-from-top-2 duration-200">
                {recipeCategories.map((category, index) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={category.href} data-testid={`dropdown-${category.name.toLowerCase().replace(' ', '-')}`}>
                      <div className="cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-all duration-150 hover:scale-[1.02] active:scale-95" style={{animationDelay: `${index * 50}ms`}}>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-muted-foreground">{category.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-40 mobile-menu open">
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-10 h-10 rounded-md flex items-center justify-center">
                    <img 
                      src="/src/assets/logo.png" 
                      alt="Sathi Ko Recipe Logo" 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="font-semibold">Sathi Ko Recipe</span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="button-close-mobile-menu"
                className="p-1"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} data-testid={`mobile-link-${item.name.toLowerCase()}`}>
                  <div
                    className="block py-2 px-4 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
              
              {/* Mobile Recipe Categories */}
              <div className="border-t border-border pt-4 mt-4">
                <div className="font-semibold text-sm text-muted-foreground mb-3 px-4">Recipe Categories</div>
                {recipeCategories.map((category) => (
                  <Link key={category.name} href={category.href} data-testid={`mobile-category-${category.name.toLowerCase().replace(' ', '-')}`}>
                    <div
                      className="block py-2 px-4 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-muted-foreground">{category.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
