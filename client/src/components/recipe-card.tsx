import { Link } from "wouter";
import { Clock } from "lucide-react";
import type { Recipe } from "@shared/schema";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer" data-testid={`card-recipe-${recipe.id}`}>
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 md:h-56 object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback image if recipe image fails to load
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
            }}
          />
          {/* Green overlay for rounded corner effect */}
          <div className="absolute inset-0 bg-green-800 bg-opacity-20 rounded-2xl"></div>
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2" data-testid={`title-${recipe.id}`}>
            {recipe.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1" data-testid={`cook-time-${recipe.id}`}>
              <Clock className="w-4 h-4" />
              <span>{recipe.cookTime} min</span>
            </div>
            <div className="flex items-center space-x-1" data-testid={`cost-${recipe.id}`}>
              <span>${recipe.cost?.toFixed(2) || 'Free'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}