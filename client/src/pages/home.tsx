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
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white bg-opacity-5 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-28 h-28 bg-white bg-opacity-5 rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Simple Recipes for
              <span className="text-accent block" data-testid="text-hero-subtitle">Students</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
              Affordable, healthy, and easy-to-make meals perfect for international students and cooking beginners.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl bg-white text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  data-testid="input-search-recipes"
                />
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
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
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button
                variant="ghost"
                className="filter-pill bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                onClick={() => handleFilterClick("Vegetarian")}
                data-testid="filter-vegetarian"
              >
                <Leaf className="w-4 h-4 mr-2" />
                Vegetarian
              </Button>
              <Button
                variant="ghost"
                className="filter-pill bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                onClick={() => handleFilterClick("Quick Meals")}
                data-testid="filter-quick-meals"
              >
                <Clock className="w-4 h-4 mr-2" />
                Quick Meals
              </Button>
              <Button
                variant="ghost"
                className="filter-pill bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                onClick={() => handleFilterClick("Budget")}
                data-testid="filter-budget"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Budget Friendly
              </Button>
              <Button
                variant="ghost"
                className="filter-pill bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                onClick={() => handleFilterClick("Trending")}
                data-testid="filter-trending"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              className="px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors btn-scale"
              data-testid="button-view-all-recipes"
            >
              View All Recipes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
