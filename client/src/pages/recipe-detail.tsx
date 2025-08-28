import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  DollarSign, 
  BarChart, 
  Star, 
  Copy, 
  ChefHat
} from "lucide-react";
import type { Recipe } from "@shared/schema";

export default function RecipeDetail() {
  const [, params] = useRoute("/recipe/:id");
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  const { data: recipe, isLoading, error } = useQuery<Recipe>({
    queryKey: ["/api/recipes", params?.id],
    enabled: !!params?.id,
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < fullStars
              ? "text-yellow-star fill-current"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      );
    }
    
    return stars;
  };

  const handleIngredientCheck = (index: number, checked: boolean) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: checked
    }));
  };

  const copyIngredients = async () => {
    if (!recipe || !recipe.ingredients) return;
    
    const ingredientsList = recipe.ingredients.join('\n');
    try {
      await navigator.clipboard.writeText(ingredientsList);
      // Could show a toast notification here
    } catch (err) {
      console.error('Failed to copy ingredients:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-20 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4" data-testid="heading-recipe-not-found">
              Recipe Not Found
            </h1>
            <p className="text-muted-foreground mb-8" data-testid="text-recipe-error">
              The recipe you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/recipes">
              <Button data-testid="button-back-to-recipes">
                Back to Recipes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/recipes">
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            data-testid="button-back-to-recipes"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Recipes</span>
          </Button>
        </Link>

        {/* Recipe Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-80 object-cover rounded-xl shadow-lg"
              data-testid="img-recipe-main"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400";
              }}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-primary font-medium dark:bg-green-900 dark:text-green-300"
                  data-testid="badge-recipe-category"
                >
                  {recipe.category === "Vegetarian" ? "Veg" : recipe.category}
                </Badge>
                <div className="flex items-center space-x-1" data-testid="rating-stars">
                  {renderStars(recipe.rating)}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({recipe.rating ? recipe.rating.toFixed(1) : '0.0'})
                  </span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-3" data-testid="title-recipe">
                {recipe.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6" data-testid="description-recipe">
                {recipe.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg" data-testid="info-cook-time">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Cook Time</span>
                </div>
                <span className="text-2xl font-bold text-foreground">{recipe.cookTime} min</span>
              </div>
              <div className="bg-muted p-4 rounded-lg" data-testid="info-servings">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Servings</span>
                </div>
                <span className="text-2xl font-bold text-foreground">{recipe.servings}</span>
              </div>
              <div className="bg-muted p-4 rounded-lg" data-testid="info-cost">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Cost/Serve</span>
                </div>
                <span className="text-2xl font-bold text-foreground">${recipe.cost ? recipe.cost.toFixed(2) : '0.00'}</span>
              </div>
              <div className="bg-muted p-4 rounded-lg" data-testid="info-difficulty">
                <div className="flex items-center space-x-2 mb-1">
                  <BarChart className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Difficulty</span>
                </div>
                <span className="text-2xl font-bold text-foreground">{recipe.difficulty}</span>
              </div>
            </div>

            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-green-700 transition-colors btn-scale py-3 rounded-xl font-semibold"
              data-testid="button-cooking-mode"
            >
              <ChefHat className="w-5 h-5 mr-2" />
              Start Cooking Mode
            </Button>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-xl shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground" data-testid="heading-ingredients">
                  Ingredients
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyIngredients}
                  className="text-accent hover:text-orange-600 transition-colors"
                  title="Copy to clipboard"
                  data-testid="button-copy-ingredients"
                >
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
              <ul className="space-y-3" data-testid="list-ingredients">
                {(recipe.ingredients || []).map((ingredient, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Checkbox
                      id={`ingredient-${index}`}
                      checked={checkedIngredients[index] || false}
                      onCheckedChange={(checked) => handleIngredientCheck(index, checked as boolean)}
                      data-testid={`checkbox-ingredient-${index}`}
                    />
                    <label
                      htmlFor={`ingredient-${index}`}
                      className={`cursor-pointer ${
                        checkedIngredients[index] ? "line-through opacity-60" : ""
                      }`}
                    >
                      {String(ingredient)}
                    </label>
                  </li>
                ))}
              </ul>

              {/* Nutrition Facts */}
              {recipe.nutritionFacts && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="font-semibold text-lg mb-3" data-testid="heading-nutrition">
                    Nutrition Facts
                  </h3>
                  <div className="space-y-2 text-sm" data-testid="nutrition-facts">
                    <div className="flex justify-between">
                      <span>Calories</span>
                      <span className="font-medium">{recipe.nutritionFacts.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein</span>
                      <span className="font-medium">{recipe.nutritionFacts.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbs</span>
                      <span className="font-medium">{recipe.nutritionFacts.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fat</span>
                      <span className="font-medium">{recipe.nutritionFacts.fat}g</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="heading-instructions">
              Instructions
            </h2>
            <div className="space-y-6" data-testid="list-instructions">
              {(recipe.instructions || []).map((instruction, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="step-counter w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-lg text-foreground cooking-step">{String(instruction)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cooking Tips */}
            {recipe.cookingTips && recipe.cookingTips.length > 0 && (
              <div className="mt-12 bg-muted p-6 rounded-xl">
                <h3 className="text-xl font-bold text-foreground mb-4" data-testid="heading-cooking-tips">
                  👨‍🍳 Cooking Tips
                </h3>
                <ul className="space-y-2 text-muted-foreground" data-testid="list-cooking-tips">
                  {recipe.cookingTips.map((tip, index) => (
                    <li key={index}>• {String(tip)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
