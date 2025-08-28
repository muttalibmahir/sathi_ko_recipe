import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/recipe-card";
import { Search, Phone, Utensils } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-hero-title">
            Simple Recipes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8" data-testid="text-hero-description">
            Step-by-step recipes for every type of meal lifestyle
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white" />
              </div>
              <Input
                type="text"
                placeholder="Search by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-16 py-4 text-white placeholder-gray-200 bg-green-800 border-green-800 rounded-full focus:ring-2 focus:ring-green-600 focus:border-transparent"
                data-testid="input-search-recipes"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4"
                  data-testid="button-search"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
              onClick={() => handleFilterClick("Vegetarian")}
              data-testid="filter-vegetarian"
            >
              Vegetarian
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
              onClick={() => handleFilterClick("Quick Meals")}
              data-testid="filter-quick-meals"
            >
              Quick Meals
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
              onClick={() => handleFilterClick("Non-Veg")}
              data-testid="filter-vegan"
            >
              Vegan
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
              onClick={() => handleFilterClick("Budget")}
              data-testid="filter-budget"
            >
              Budget Meals
            </Button>
          </div>
        </div>

        {/* All Recipes Section */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-testid="heading-all-recipes">
            All Recipes
          </h3>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : trendingRecipes && trendingRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="grid-trending-recipes">
            {trendingRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg" data-testid="text-no-trending-recipes">
              No recipes available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}