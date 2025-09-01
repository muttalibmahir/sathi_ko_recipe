import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SR</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Sathi Ko Recipe</h3>
                <p className="text-xs text-foreground/70">Simple Recipe</p>
              </div>
            </div>
            <p className="text-foreground/80 text-sm mb-4">
              Empowering international students and cooking beginners with simple, affordable, and delicious recipes from around the world.
            </p>
            <div className="flex space-x-3">
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="link-youtube"
              >
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/recipes" data-testid="footer-link-recipes">
                  <span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                    All Recipes
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=Quick Meals" data-testid="footer-link-quick-meals">
                  <span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                    Quick Meals
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=Budget" data-testid="footer-link-budget">
                  <span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                    Budget Recipes
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=Vegetarian" data-testid="footer-link-vegetarian">
                  <span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                    Vegetarian
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=Trending" data-testid="footer-link-trending">
                  <span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                    Trending
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Help Center
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Cooking Tips
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Submit Recipe
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-foreground/80 text-sm mb-4">
              Get weekly recipe inspiration and cooking tips delivered to your inbox.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-r-none"
                data-testid="input-newsletter-email"
              />
              <Button
                className="bg-primary text-primary-foreground hover:bg-green-700 rounded-l-none"
                data-testid="button-newsletter-subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-foreground/80 text-sm">
            © 2024 Sathi Ko Recipe. Made with <span className="text-red-500">❤</span> for students worldwide.
          </p>
          <p className="text-foreground/80 text-sm mt-2 sm:mt-0">
            Made with <span className="text-red-500">❤</span> by students, for students.
          </p>
        </div>
      </div>
    </footer>
  );
}
