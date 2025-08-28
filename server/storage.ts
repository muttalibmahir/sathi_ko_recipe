import { type Recipe, type InsertRecipe, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Recipe methods
  getAllRecipes(): Promise<Recipe[]>;
  getRecipeById(id: string): Promise<Recipe | undefined>;
  getRecipesByCategory(category: string): Promise<Recipe[]>;
  searchRecipes(query: string): Promise<Recipe[]>;
  getTrendingRecipes(limit?: number): Promise<Recipe[]>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private recipes: Map<string, Recipe>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.recipes = new Map();
    this.contacts = new Map();
    this.seedRecipes();
  }

  private seedRecipes() {
    const sampleRecipes: Recipe[] = [
      {
        id: "1",
        title: "Sishne Jhol",
        description: "Nutritious soup made from sprouted beans and fresh herbs. Rich in protein and perfect for cold days.",
        image: "/images/sishne-jhol.jpg",
        cookTime: 20,
        servings: 2,
        cost: 2.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.2,
        ratingCount: 38,
        ingredients: [
          "1 cup sprouted beans",
          "2 cups water",
          "1 medium onion, chopped",
          "2 cloves garlic, minced",
          "1 tsp ginger, minced",
          "1/2 tsp turmeric powder",
          "1 tsp cumin powder",
          "Salt to taste",
          "2 tbsp oil",
          "Fresh cilantro for garnish"
        ],
        instructions: [
          "Heat oil in a pot over medium heat. Add onion and sauté until golden.",
          "Add garlic and ginger, cook for 1 minute until fragrant.",
          "Add turmeric and cumin powder, stir for 30 seconds.",
          "Add sprouted beans and water, bring to a boil.",
          "Reduce heat and simmer for 15 minutes until beans are tender.",
          "Season with salt and garnish with fresh cilantro before serving."
        ],
        nutritionFacts: {
          calories: 180,
          protein: 12,
          carbs: 22,
          fat: 6
        },
        cookingTips: [
          "Soak beans overnight and sprout for 2-3 days for best results",
          "You can add vegetables like spinach or tomatoes for extra flavor",
          "Serve hot with rice or roti"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        title: "Quanti",
        description: "A hearty soup made from a mix of sprouted legumes, perfect for international students and cooking beginners.",
        image: "/images/quanti.jpg",
        cookTime: 45,
        servings: 4,
        cost: 3.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.0,
        ratingCount: 25,
        ingredients: [
          "1/2 cup mixed sprouted beans (black gram, kidney beans, chickpeas)",
          "3 cups water",
          "1 large onion, chopped",
          "3 cloves garlic, minced",
          "1 inch ginger, minced",
          "2 tomatoes, chopped",
          "1 tsp turmeric powder",
          "1 tsp cumin powder",
          "1 tsp coriander powder",
          "Salt to taste",
          "3 tbsp oil",
          "Fresh herbs for garnish"
        ],
        instructions: [
          "Heat oil in a large pot over medium heat.",
          "Add onions and cook until golden brown, about 5-7 minutes.",
          "Add garlic and ginger, cook for another minute.",
          "Add tomatoes and spices, cook until tomatoes break down.",
          "Add sprouted beans and water, bring to a boil.",
          "Reduce heat and simmer for 30-35 minutes until beans are tender.",
          "Season with salt and garnish with fresh herbs."
        ],
        nutritionFacts: {
          calories: 220,
          protein: 14,
          carbs: 28,
          fat: 8
        },
        cookingTips: [
          "Use a pressure cooker to reduce cooking time by half",
          "Mix different types of beans for varied texture and nutrition",
          "Can be made ahead and tastes even better the next day"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "3",
        title: "Sikarni",
        description: "Traditional Nepali sweet dessert made with thick milk, cardamom powder, and assorted nuts. Perfect for festivals and special occasions.",
        image: "/images/sikarni.jpg",
        cookTime: 15,
        servings: 4,
        cost: 3.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.2,
        ratingCount: 42,
        ingredients: [
          "2 cups whole milk",
          "1/2 cup heavy cream",
          "1/4 cup sugar",
          "1/2 tsp cardamom powder",
          "2 tbsp mixed nuts (chopped)",
          "1 tbsp pistachios"
        ],
        instructions: [
          "Heat the milk in a heavy-bottomed pan over medium heat. Bring it to a boil and let it simmer for 10-15 minutes until it reduces slightly.",
          "Add sugar and cardamom powder to the milk. Stir well and let it cook for another 5 minutes until the sugar completely dissolves.",
          "Remove from heat and let it cool to room temperature. Then refrigerate for at least 2 hours until chilled.",
          "Before serving, whip the heavy cream until soft peaks form. Gently fold it into the chilled milk mixture.",
          "Serve in individual bowls and garnish with chopped nuts and pistachios. Enjoy this traditional Nepali dessert chilled!"
        ],
        nutritionFacts: {
          calories: 220,
          protein: 8,
          carbs: 18,
          fat: 12
        },
        cookingTips: [
          "Use full-fat milk for the creamiest texture",
          "Don't skip the chilling time - it's essential for the right consistency",
          "You can substitute heavy cream with condensed milk for a sweeter version",
          "Toast the nuts lightly before adding for extra flavor"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "4",
        title: "Phando",
        description: "A tangy soup using fermented leafy greens, a traditional Nepali comfort food perfect for digestion.",
        image: "/images/phando.jpg",
        cookTime: 25,
        servings: 3,
        cost: 2.50,
        difficulty: "Medium",
        category: "Vegetarian",
        rating: 4.3,
        ratingCount: 19,
        ingredients: [
          "2 cups fermented leafy greens (gundruk)",
          "3 cups water",
          "1 medium onion, sliced",
          "2 cloves garlic, minced",
          "1 tsp ginger, minced",
          "1/2 tsp turmeric powder",
          "1 tsp cumin seeds",
          "2 dried red chilies",
          "Salt to taste",
          "2 tbsp oil"
        ],
        instructions: [
          "Rinse the fermented greens thoroughly and chop them finely.",
          "Heat oil in a pot and add cumin seeds and dried chilies.",
          "Add onions and cook until translucent.",
          "Add garlic, ginger, and turmeric. Cook for a minute.",
          "Add the fermented greens and water, bring to a boil.",
          "Simmer for 15-20 minutes until greens are tender.",
          "Season with salt and serve hot with rice."
        ],
        nutritionFacts: {
          calories: 150,
          protein: 6,
          carbs: 15,
          fat: 8
        },
        cookingTips: [
          "Fermented greens can be found in Asian grocery stores",
          "Adjust water quantity for desired consistency",
          "This soup aids digestion and is very nutritious"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "5",
        title: "Badame Dhaniya",
        description: "Nutty green chutney made from roasted peanuts and fresh cilantro, perfect as a side dish.",
        image: "/images/badame-dhaniya.jpg",
        cookTime: 15,
        servings: 4,
        cost: 2.00,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.5,
        ratingCount: 33,
        ingredients: [
          "1 cup roasted peanuts",
          "2 cups fresh cilantro leaves",
          "2-3 green chilies",
          "3 cloves garlic",
          "1 inch ginger",
          "1 tsp cumin seeds",
          "Salt to taste",
          "2 tbsp lemon juice",
          "2-3 tbsp water"
        ],
        instructions: [
          "Dry roast peanuts in a pan until lightly golden. Let cool.",
          "In a food processor, grind cumin seeds first until powdered.",
          "Add peanuts and grind to a coarse powder.",
          "Add cilantro, green chilies, garlic, and ginger.",
          "Add salt, lemon juice, and water as needed to make a smooth paste.",
          "Taste and adjust seasoning. Serve as a side dish or spread."
        ],
        nutritionFacts: {
          calories: 180,
          protein: 8,
          carbs: 6,
          fat: 15
        },
        cookingTips: [
          "Store in refrigerator for up to a week",
          "Can be used as a sandwich spread or dip",
          "Adjust chilies according to spice preference"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "6",
        title: "Dahi Phal",
        description: "Refreshing yogurt fruit salad perfect for hot days, a healthy and cooling dessert.",
        image: "/images/dahi-phal.jpg",
        cookTime: 10,
        servings: 2,
        cost: 4.00,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.8,
        ratingCount: 56,
        ingredients: [
          "1 cup thick yogurt",
          "1 apple, diced",
          "1 banana, sliced",
          "1/2 cup grapes, halved",
          "1/4 cup pomegranate seeds",
          "2 tbsp honey",
          "1/4 tsp black salt",
          "1/4 tsp chaat masala",
          "Fresh mint leaves for garnish"
        ],
        instructions: [
          "In a large bowl, whisk the yogurt until smooth.",
          "Add honey, black salt, and chaat masala to the yogurt.",
          "Gently fold in all the prepared fruits.",
          "Mix well ensuring fruits are well coated with yogurt.",
          "Chill in refrigerator for 30 minutes before serving.",
          "Garnish with fresh mint leaves and serve cold."
        ],
        nutritionFacts: {
          calories: 160,
          protein: 6,
          carbs: 32,
          fat: 3
        },
        cookingTips: [
          "Use seasonal fruits for best flavor",
          "Drain yogurt if too watery",
          "Serve immediately after adding fruits to prevent sogginess"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "7",
        title: "Lasune Golbhenda",
        description: "Spicy tomato and garlic curry, a Nepali comfort food that pairs perfectly with rice.",
        image: "/images/lasune-golbhenda.jpg",
        cookTime: 25,
        servings: 3,
        cost: 2.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.1,
        ratingCount: 29,
        ingredients: [
          "6 medium tomatoes, quartered",
          "8 cloves garlic, crushed",
          "2 tbsp mustard oil",
          "1/2 tsp turmeric powder",
          "1 tsp red chili powder",
          "1 tsp coriander powder",
          "Salt to taste",
          "1 tsp sugar",
          "Fresh cilantro for garnish"
        ],
        instructions: [
          "Heat mustard oil in a pan until it smokes slightly, then reduce heat.",
          "Add crushed garlic and fry until golden brown.",
          "Add tomatoes and mix well with the garlic.",
          "Add all spices, salt, and sugar. Mix thoroughly.",
          "Cover and cook on medium heat for 15-20 minutes, stirring occasionally.",
          "Mash lightly with a spoon to break down tomatoes.",
          "Garnish with cilantro and serve hot with rice."
        ],
        nutritionFacts: {
          calories: 120,
          protein: 3,
          carbs: 12,
          fat: 7
        },
        cookingTips: [
          "Use ripe tomatoes for best flavor",
          "Mustard oil adds authentic taste but can be substituted",
          "Don't over-mash, keep some tomato chunks for texture"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "8",
        title: "Kheer",
        description: "Creamy rice pudding with nuts and aromatic spices, a beloved dessert across Nepal.",
        image: "/images/kheer.jpg",
        cookTime: 45,
        servings: 6,
        cost: 4.50,
        difficulty: "Medium",
        category: "Vegetarian",
        rating: 4.7,
        ratingCount: 67,
        ingredients: [
          "1/2 cup basmati rice",
          "4 cups whole milk",
          "1/2 cup sugar",
          "1/4 tsp cardamom powder",
          "2 tbsp almonds, sliced",
          "2 tbsp pistachios, chopped",
          "1 tbsp raisins",
          "1 tbsp ghee"
        ],
        instructions: [
          "Wash and soak rice for 30 minutes, then drain.",
          "Heat ghee in a heavy-bottomed pan and lightly fry the rice.",
          "Add milk and bring to a boil, then simmer on low heat.",
          "Stir frequently and cook for 30-35 minutes until rice is completely soft.",
          "Add sugar and cardamom powder, cook for 5 more minutes.",
          "Add half of the nuts and all raisins, mix well.",
          "Serve hot or chilled, garnished with remaining nuts."
        ],
        nutritionFacts: {
          calories: 250,
          protein: 8,
          carbs: 38,
          fat: 8
        },
        cookingTips: [
          "Constant stirring prevents the milk from burning",
          "Can be made ahead and refrigerated for up to 3 days",
          "Consistency should be creamy, not too thick"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    sampleRecipes.forEach(recipe => {
      this.recipes.set(recipe.id, recipe);
    });
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getRecipeById(id: string): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    if (category === "All Recipes") {
      return this.getAllRecipes();
    }
    return Array.from(this.recipes.values()).filter(recipe => 
      recipe.category === category
    );
  }

  async searchRecipes(query: string): Promise<Recipe[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.recipes.values()).filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm)
      )
    );
  }

  async getTrendingRecipes(limit: number = 4): Promise<Recipe[]> {
    return Array.from(this.recipes.values())
      .sort((a, b) => (b.rating * b.ratingCount) - (a.rating * a.ratingCount))
      .slice(0, limit);
  }

  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const id = randomUUID();
    const recipe: Recipe = {
      ...insertRecipe,
      id,
      rating: 0,
      ratingCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.recipes.set(id, recipe);
    return recipe;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
