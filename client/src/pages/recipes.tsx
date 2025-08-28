import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/recipe-card";
import { Search, Leaf, Fish, Clock, DollarSign } from "lucide-react";
import type { Recipe } from "@shared/schema";

export default function Recipes() {
  const [activeFilter, setActiveFilter] = useState("All Recipes");
  const [searchQuery, setSearchQuery] = useState("");
  const [localSearch, setLocalSearch] = useState("");

  // Get URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const search = urlParams.get("search");
    
    if (category) {
      setActiveFilter(category);
    }
    if (search) {
      setSearchQuery(search);
      setLocalSearch(search);
    }
  }, []);

  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes", { category: activeFilter !== "All Recipes" ? activeFilter : undefined, search: searchQuery }],
  });

  const filters = [
    { name: "All Recipes", icon: null, description: "View all authentic Nepali recipes" },
    { name: "Vegetarian", icon: Leaf, description: "Plant-based traditional dishes" },
    { name: "Non-Veg", icon: Fish, description: "Meat and poultry specialties" },
    { name: "Quick Meals", icon: Clock, description: "Ready in 30 minutes or less" },
    { name: "Budget", icon: DollarSign, description: "Affordable student-friendly meals" },
  ];

  const handleFilterClick = (filterName: string) => {
    setActiveFilter(filterName);
    setSearchQuery("");
    setLocalSearch("");
    
    // Update URL
    const newUrl = filterName === "All Recipes" 
      ? "/recipes" 
      : `/recipes?category=${encodeURIComponent(filterName)}`;
    window.history.pushState({}, "", newUrl);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setActiveFilter("All Recipes");
      window.history.pushState({}, "", `/recipes?search=${encodeURIComponent(localSearch.trim())}`);
    } else {
      setSearchQuery("");
      window.history.pushState({}, "", "/recipes");
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="heading-recipes">
            Authentic Nepali Recipes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-recipes-description">
            Discover traditional Nepali cuisine with step-by-step guides perfect for international students and cooking beginners
          </p>
          {recipes && recipes.length > 0 && (
            <div className="mt-6 text-primary font-medium">
              <span className="bg-primary/10 px-4 py-2 rounded-full">
                {recipes.length} Traditional Recipes Available
              </span>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search recipes..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl"
              data-testid="input-search-recipes"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <Button
              type="submit"
              className="absolute right-2 top-2 bg-accent text-white hover:bg-orange-600 transition-colors btn-scale"
              data-testid="button-search"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Category Filters */}
        <div className="mb-12 animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Browse by Category</h2>
            <p className="text-muted-foreground">Find recipes that match your preferences and cooking style</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.name;
              return (
                <div
                  key={filter.name}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isActive ? "transform scale-105" : ""
                  }`}
                  onClick={() => handleFilterClick(filter.name)}
                  data-testid={`filter-${filter.name.toLowerCase().replace(" ", "-")}`}
                >
                  <div
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                      isActive
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {Icon ? (
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                        isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-accent ${
                        isActive ? "shadow-lg" : "opacity-80 group-hover:opacity-100"
                      }`}>
                        <span className="text-white font-bold text-lg">🍽️</span>
                      </div>
                    )}
                    
                    <h3 className={`font-semibold mb-2 transition-colors ${
                      isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                    }`}>
                      {filter.name}
                    </h3>
                    
                    <p className={`text-sm transition-colors ${
                      isActive ? "text-primary/80" : "text-muted-foreground"
                    }`}>
                      {filter.description}
                    </p>
                    
                    {recipes && (
                      <div className={`mt-3 text-xs font-medium ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}>
                        {filter.name === "All Recipes" 
                          ? `${recipes.length} recipes`
                          : filter.name === "Quick Meals"
                            ? `${recipes.filter(r => r.cookTime <= 30).length} recipes`
                            : filter.name === "Budget"
                              ? `${recipes.filter(r => r.cost <= 3.50).length} recipes`
                              : `${recipes.filter(r => r.category === filter.name).length} recipes`
                        }
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8">
          {searchQuery ? (
            <div className="text-center">
              <p className="text-lg text-muted-foreground" data-testid="text-search-results">
                Search results for <span className="font-medium text-primary">"{searchQuery}"</span>
              </p>
              {recipes && recipes.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} matching your search
                </p>
              )}
            </div>
          ) : activeFilter !== "All Recipes" ? (
            <div className="text-center">
              <p className="text-lg text-foreground font-medium">
                {activeFilter} Recipes
              </p>
              {recipes && recipes.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Showing {recipes.length} traditional {activeFilter.toLowerCase()} recipe{recipes.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          ) : recipes && recipes.length > 0 && (
            <div className="text-center">
              <p className="text-lg text-foreground font-medium">
                All Authentic Nepali Recipes
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Complete collection of {recipes.length} traditional recipes from Nepal
              </p>
            </div>
          )}
        </div>

        {/* Recipe Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
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
        ) : recipes && recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="grid-recipes">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg" data-testid="text-no-recipes">
              {searchQuery 
                ? `No recipes found for "${searchQuery}"`
                : `No recipes found in ${activeFilter}`
              }
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setActiveFilter("All Recipes");
                setSearchQuery("");
                setLocalSearch("");
                window.history.pushState({}, "", "/recipes");
              }}
              data-testid="button-view-all"
            >
              View All Recipes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
