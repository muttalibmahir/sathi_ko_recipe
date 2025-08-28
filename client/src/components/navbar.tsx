import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-provider";
import { Menu, X, Utensils, Phone } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    return href !== "/" && location.startsWith(href);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-orange-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="text-site-title">
                  Sathi Ko Recipe
                </h1>
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
                      ? "text-orange-500"
                      : "text-gray-600 dark:text-gray-300 hover:text-orange-500"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Contact & Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium" data-testid="text-contact-number">12 34 56</span>
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
                  <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xs">SR</span>
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
