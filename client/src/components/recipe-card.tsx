import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, DollarSign, Star } from "lucide-react";
import type { Recipe } from "@shared/schema";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? "text-yellow-star fill-current"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      );
    }
    
    return stars;
  };

  return (
    <div className="recipe-card bg-card rounded-xl shadow-lg overflow-hidden" data-testid={`card-recipe-${recipe.id}`}>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
        loading="lazy"
        onError={(e) => {
          // Fallback image if recipe image fails to load
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        }}
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant="secondary"
            className="bg-green-100 text-primary text-xs font-medium dark:bg-green-900 dark:text-green-300"
            data-testid={`badge-category-${recipe.id}`}
          >
            {recipe.category === "Vegetarian" ? "Veg" : recipe.category}
          </Badge>
          <div className="flex items-center space-x-1" data-testid={`rating-${recipe.id}`}>
            {renderStars(recipe.rating)}
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2" data-testid={`title-${recipe.id}`}>
          {recipe.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2" data-testid={`description-${recipe.id}`}>
          {recipe.description}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span className="flex items-center space-x-1" data-testid={`cook-time-${recipe.id}`}>
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime} min</span>
          </span>
          <span className="flex items-center space-x-1" data-testid={`servings-${recipe.id}`}>
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </span>
          <span className="flex items-center space-x-1" data-testid={`cost-${recipe.id}`}>
            <DollarSign className="w-4 h-4" />
            <span>${recipe.cost.toFixed(2)}</span>
          </span>
        </div>
        <Link href={`/recipe/${recipe.id}`} data-testid={`link-recipe-${recipe.id}`}>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-green-700 transition-colors btn-scale">
            View Recipe
          </Button>
        </Link>
      </div>
    </div>
  );
}
