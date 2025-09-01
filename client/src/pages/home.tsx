import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/recipe-card";
import { Search, Leaf, Clock, DollarSign, TrendingUp, Play } from "lucide-react";
import type { Recipe } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: trendingRecipes, isLoading } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes/trending"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      setLocation("/recipes");
    }
  };

  const handleFilterClick = (category: string) => {
    setLocation(`/recipes?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        {/* Floating Food Elements Background */}
        <div className="absolute inset-0 food-background">
          {/* Spice Particles */}
          <div className="spice-particle spice-1">🌿</div>
          <div className="spice-particle spice-2">🧄</div>
          <div className="spice-particle spice-3">🌶️</div>
          <div className="spice-particle spice-4">🧅</div>
          <div className="spice-particle spice-5">🥬</div>
          <div className="spice-particle spice-6">🥕</div>
          <div className="spice-particle spice-7">🍅</div>
          <div className="spice-particle spice-8">🫑</div>
          
          {/* Cooking Utensils */}
          <div className="utensil-float utensil-1">🥄</div>
          <div className="utensil-float utensil-2">🍴</div>
          <div className="utensil-float utensil-3">🔪</div>
          
          {/* Rice and Grains */}
          <div className="grain-float grain-1">🌾</div>
          <div className="grain-float grain-2">🍚</div>
          <div className="grain-float grain-3">🌿</div>
          
          {/* Traditional Elements */}
          <div className="traditional-element element-1">🥣</div>
          <div className="traditional-element element-2">🫖</div>
          <div className="traditional-element element-3">🍵</div>
        </div>
        
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 bg-opacity-15 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-green-300 bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-500 bg-opacity-12 rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-28 h-28 bg-green-400 bg-opacity-8 rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative hero-content">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 hero-title">
              Simple Recipes for
              <span className="text-accent block hero-subtitle" data-testid="text-hero-subtitle">Students</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto hero-description" data-testid="text-hero-description">
              Affordable, healthy, and easy-to-make meals perfect for international students and cooking beginners.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8 hero-search">
              <div className="relative search-container">
                <Input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl bg-white text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-accent search-input"
                  data-testid="input-search-recipes"
                />
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 search-icon" />
                <Button
                  type="submit"
                  className="absolute right-2 top-2 bg-accent text-white hover:bg-orange-600 transition-colors btn-scale"
                  data-testid="button-search"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8 hero-filters">
              <Button
                variant="ghost"
                className="filter-pill filter-pill-1 bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                onClick={() => handleFilterClick("Vegetarian")}
                data-testid="filter-vegetarian"
              >
                <Leaf className="w-4 h-4 mr-2" />
                Vegetarian
              </Button>
              <Button
                variant="ghost"
                className="filter-pill filter-pill-2 bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                onClick={() => handleFilterClick("Quick Meals")}
                data-testid="filter-quick-meals"
              >
                <Clock className="w-4 h-4 mr-2" />
                Quick Meals
              </Button>
              <Button
                variant="ghost"
                className="filter-pill filter-pill-3 bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                onClick={() => handleFilterClick("Budget")}
                data-testid="filter-budget"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Budget Friendly
              </Button>
              <Button
                variant="ghost"
                className="filter-pill filter-pill-4 bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                onClick={() => handleFilterClick("Trending")}
                data-testid="filter-trending"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center hero-cta">
              <Link href="/recipes">
                <Button
                  className="bg-accent text-white hover:bg-orange-600 transition-all duration-300 btn-scale px-8 py-3 text-lg"
                  data-testid="button-explore-recipes"
                >
                  Explore Recipes
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-300 btn-scale px-8 py-3 text-lg"
                data-testid="button-watch-demo"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Statistics Dashboard */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-statistics">
              By the Numbers
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-statistics-description">
              Empowering students with authentic Nepali recipes
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-total-recipes">
              <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-sm font-medium text-foreground">Authentic Recipes</div>
              <div className="text-xs text-muted-foreground mt-1">Traditional & Modern</div>
            </div>
            
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-avg-time">
              <div className="text-4xl font-bold text-orange-600 mb-2">35</div>
              <div className="text-sm font-medium text-foreground">Avg Cook Time</div>
              <div className="text-xs text-muted-foreground mt-1">Minutes per recipe</div>
            </div>
            
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-budget-friendly">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-sm font-medium text-foreground">Budget Meals</div>
              <div className="text-xs text-muted-foreground mt-1">Under $3.50 per serving</div>
            </div>
            
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-student-favorites">
              <div className="text-4xl font-bold text-purple-600 mb-2">4.7★</div>
              <div className="text-sm font-medium text-foreground">Avg Rating</div>
              <div className="text-xs text-muted-foreground mt-1">Student approved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Success Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-testimonials">
            Student Success Stories
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-testimonials-description">
            Real stories from international students who mastered Nepali cooking
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border" data-testid="testimonial-priya">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-foreground">Priya Sharma</h4>
                <p className="text-sm text-muted-foreground">Engineering Student, UK</p>
              </div>
            </div>
            <p className="text-foreground/80 italic mb-4">
              "I never cooked before coming to university. These simple Nepali recipes helped me connect with my culture while learning to cook. Now I make Dal Bhat every week!"
            </p>
            <div className="flex text-yellow-400">
              ★★★★★
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border" data-testid="testimonial-alex">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-foreground">Alex Chen</h4>
                <p className="text-sm text-muted-foreground">Business Student, Canada</p>
              </div>
            </div>
            <p className="text-foreground/80 italic mb-4">
              "As an international student on a tight budget, these affordable recipes saved me so much money. The Momo recipe is absolutely perfect!"
            </p>
            <div className="flex text-yellow-400">
              ★★★★★
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border" data-testid="testimonial-sara">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-foreground">Sara Patel</h4>
                <p className="text-sm text-muted-foreground">Medical Student, Australia</p>
              </div>
            </div>
            <p className="text-foreground/80 italic mb-4">
              "The step-by-step instructions are so clear! I went from burning toast to making authentic Chhoyela. My Nepali friends were amazed!"
            </p>
            <div className="flex text-yellow-400">
              ★★★★★
            </div>
          </div>
        </div>
      </div>

      {/* Trending Recipes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-trending-recipes">
            Trending Recipes
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-trending-description">
            Popular dishes our students love
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : trendingRecipes && trendingRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="grid-trending-recipes">
            {trendingRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg" data-testid="text-no-trending-recipes">
              No trending recipes available at the moment.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/recipes">
            <Button
              variant="secondary"
              className="group relative px-12 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-110 active:scale-95 hover:-translate-y-2 overflow-hidden border-2 border-green-400/30 hover:border-green-300/50"
              data-testid="button-view-all-recipes"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-300/30 to-green-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></span>
              <span className="relative z-10 flex items-center space-x-3">
                <span className="tracking-wide">View All Recipes</span>
                <span className="transform transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110 text-xl">→</span>
              </span>
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-none"></div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
