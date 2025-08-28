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
    { name: "All Recipes", icon: null },
    { name: "Vegetarian", icon: Leaf },
    { name: "Non-Veg", icon: Fish },
    { name: "Quick Meals", icon: Clock },
    { name: "Budget", icon: DollarSign },
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="heading-recipes">
            Our Recipes
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-recipes-description">
            Discover authentic Nepali recipes perfect for students
          </p>
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

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.name}
                variant={activeFilter === filter.name ? "default" : "secondary"}
                className={`filter-pill font-medium ${
                  activeFilter === filter.name
                    ? "active bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleFilterClick(filter.name)}
                data-testid={`filter-${filter.name.toLowerCase().replace(" ", "-")}`}
              >
                {Icon && <Icon className="w-4 h-4 mr-2" />}
                {filter.name}
              </Button>
            );
          })}
        </div>

        {/* Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-muted-foreground" data-testid="text-search-results">
              Search results for "{searchQuery}"
            </p>
          </div>
        )}

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
