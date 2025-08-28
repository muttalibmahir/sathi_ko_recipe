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
        id: "2",
        title: "Sishne Jhol",
        description: "Nutritious soup made from stinging nettle leaves, rich in minerals and perfect for detox.",
        image: "/images/recipes/sishne-jhol.png",
        cookTime: 20,
        servings: 2,
        cost: 2.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.6,
        ratingCount: 38,
        ingredients: [
          "2 cups fresh stinging nettle leaves",
          "3 cups water",
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
          "Wash the nettle leaves thoroughly wearing gloves to avoid stings.",
          "Heat oil in a pot over medium heat. Add onion and sauté until golden.",
          "Add garlic and ginger, cook for 1 minute until fragrant.",
          "Add turmeric and cumin powder, stir for 30 seconds.",
          "Add nettle leaves and water, bring to a boil.",
          "Reduce heat and simmer for 15 minutes until leaves are tender.",
          "Season with salt and garnish with fresh cilantro before serving."
        ],
        nutritionFacts: {
          calories: 45,
          protein: 4,
          carbs: 8,
          fat: 2
        },
        cookingTips: [
          "Always use gloves when handling fresh nettle leaves",
          "Cooking removes the stinging property",
          "Rich in iron, calcium, and vitamins"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "3",
        title: "Phando",
        description: "A tangy soup using fermented leafy greens, a traditional village delicacy perfect for digestion.",
        image: "/images/recipes/phando.png",
        cookTime: 25,
        servings: 3,
        cost: 2.50,
        difficulty: "Medium",
        category: "Vegetarian",
        rating: 3.8,
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
        id: "4",
        title: "Chukar-Khanda",
        description: "A sour and spicy pickle made from hog plums and local spices, perfect as a tangy appetizer.",
        image: "/images/recipes/chukar-khanda.png",
        cookTime: 15,
        servings: 4,
        cost: 2.00,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 3.6,
        ratingCount: 25,
        ingredients: [
          "2 cups hog plums (lapsi), chopped",
          "2 tbsp mustard oil",
          "1 tsp mustard seeds",
          "1 tsp fenugreek seeds",
          "3-4 dried red chilies",
          "1 tsp turmeric powder",
          "2 tsp red chili powder",
          "Salt to taste",
          "1 tbsp garlic, minced"
        ],
        instructions: [
          "Heat mustard oil in a pan until it smokes, then reduce heat.",
          "Add mustard seeds and fenugreek seeds, let them splutter.",
          "Add dried red chilies and garlic, fry for 30 seconds.",
          "Add chopped hog plums and mix well.",
          "Add turmeric, chili powder, and salt. Mix thoroughly.",
          "Cook for 10-12 minutes, stirring occasionally until fruits soften.",
          "Let it cool and store in an airtight container."
        ],
        nutritionFacts: {
          calories: 85,
          protein: 2,
          carbs: 12,
          fat: 4
        },
        cookingTips: [
          "Use ripe but firm hog plums for best texture",
          "Can be stored for up to 2 weeks in refrigerator",
          "Great accompaniment to dal-bhat"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "5",
        title: "Karesa Bari",
        description: "A bitter gourd mash with mustard oil and chili, served as a flavorful side dish.",
        image: "/images/recipes/karesa-bari.png",
        cookTime: 20,
        servings: 4,
        cost: 2.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 3.8,
        ratingCount: 32,
        ingredients: [
          "2 large bitter gourds, sliced",
          "3 tbsp mustard oil",
          "1 tsp mustard seeds",
          "2-3 green chilies, chopped",
          "1 tsp turmeric powder",
          "1 tsp red chili powder",
          "Salt to taste",
          "1 tbsp garlic, minced",
          "Fresh cilantro for garnish"
        ],
        instructions: [
          "Slice bitter gourds and sprinkle salt, let sit for 10 minutes to reduce bitterness.",
          "Rinse and pat dry the bitter gourd slices.",
          "Heat mustard oil in a pan, add mustard seeds.",
          "Add garlic and green chilies, fry for 30 seconds.",
          "Add bitter gourd slices and cook for 10 minutes.",
          "Add turmeric, chili powder, and salt. Mix well.",
          "Mash slightly and cook for 5 more minutes.",
          "Garnish with cilantro and serve hot."
        ],
        nutritionFacts: {
          calories: 120,
          protein: 3,
          carbs: 8,
          fat: 9
        },
        cookingTips: [
          "Salting helps reduce the bitterness",
          "Don't over-mash, keep some texture",
          "Great for diabetics as bitter gourd helps control blood sugar"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "6",
        title: "Chukauni",
        description: "Creamy yogurt and potato salad mixed with turmeric and mustard, a cooling side dish.",
        image: "/images/recipes/chukauni.png",
        cookTime: 15,
        servings: 4,
        cost: 2.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.5,
        ratingCount: 45,
        ingredients: [
          "3 medium potatoes, boiled and cubed",
          "1 cup thick yogurt",
          "1 tbsp mustard oil",
          "1/2 tsp mustard seeds",
          "1/2 tsp turmeric powder",
          "1 tsp black mustard paste",
          "Salt to taste",
          "2 green chilies, finely chopped",
          "Fresh cilantro for garnish"
        ],
        instructions: [
          "Boil potatoes until tender, peel and cube them.",
          "In a bowl, whisk yogurt until smooth.",
          "Heat mustard oil, add mustard seeds and let them splutter.",
          "Add turmeric and pour over yogurt. Mix well.",
          "Add mustard paste, salt, and green chilies to yogurt.",
          "Gently fold in the cubed potatoes.",
          "Chill for 30 minutes before serving.",
          "Garnish with cilantro and serve cold."
        ],
        nutritionFacts: {
          calories: 180,
          protein: 6,
          carbs: 25,
          fat: 7
        },
        cookingTips: [
          "Use day-old boiled potatoes for better texture",
          "Adjust mustard paste according to taste preference",
          "Serve chilled for best flavor"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "7",
        title: "Sekuwa",
        description: "Grilled meat cubes marinated in traditional Nepali herbs and spices, perfect for barbecue.",
        image: "/images/recipes/sekuwa.png",
        cookTime: 45,
        servings: 4,
        cost: 8.50,
        difficulty: "Medium",
        category: "Non-Veg",
        rating: 4.9,
        ratingCount: 89,
        ingredients: [
          "1 kg goat meat or chicken, cut into cubes",
          "3 tbsp mustard oil",
          "2 tbsp ginger-garlic paste",
          "1 tsp turmeric powder",
          "2 tsp red chili powder",
          "1 tsp cumin powder",
          "1 tsp coriander powder",
          "2 tsp sekuwa masala",
          "Salt to taste",
          "2 tbsp yogurt",
          "Lemon wedges for serving"
        ],
        instructions: [
          "Cut meat into 2-inch cubes and clean thoroughly.",
          "In a bowl, mix all spices with yogurt and mustard oil.",
          "Marinate meat cubes in this mixture for at least 2 hours.",
          "Thread marinated meat onto skewers.",
          "Grill over charcoal or in oven at 200°C for 20-25 minutes.",
          "Turn occasionally and brush with remaining marinade.",
          "Cook until meat is tender and slightly charred.",
          "Serve hot with lemon wedges and beaten rice."
        ],
        nutritionFacts: {
          calories: 320,
          protein: 28,
          carbs: 4,
          fat: 22
        },
        cookingTips: [
          "Marinate overnight for deeper flavor",
          "Don't overcrowd skewers for even cooking",
          "Traditionally cooked over charcoal for smoky flavor"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "8",
        title: "Taruwa",
        description: "Seasonal vegetables deep-fried in chickpea or rice flour batter, crispy and delicious.",
        image: "/images/recipes/taruwa.png",
        cookTime: 30,
        servings: 4,
        cost: 3.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 3.9,
        ratingCount: 56,
        ingredients: [
          "2 cups mixed vegetables (eggplant, potato, cauliflower)",
          "1 cup chickpea flour (besan)",
          "2 tbsp rice flour",
          "1 tsp turmeric powder",
          "1 tsp red chili powder",
          "1/2 tsp carom seeds (ajwain)",
          "Salt to taste",
          "Water as needed",
          "Oil for deep frying"
        ],
        instructions: [
          "Cut vegetables into medium-sized pieces.",
          "In a bowl, mix chickpea flour, rice flour, and all spices.",
          "Add water gradually to make a thick batter.",
          "The batter should coat vegetables well but not be too runny.",
          "Heat oil in a deep pan to 180°C.",
          "Dip vegetables in batter and deep fry until golden brown.",
          "Fry in small batches to maintain oil temperature.",
          "Drain on paper towels and serve hot with chutney."
        ],
        nutritionFacts: {
          calories: 280,
          protein: 8,
          carbs: 35,
          fat: 12
        },
        cookingTips: [
          "Ensure vegetables are dry before dipping in batter",
          "Don't overcrowd the pan while frying",
          "Best enjoyed immediately while crispy"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "11",
        title: "Chhoyela",
        description: "Smoked and spiced meat (buffalo or chicken), served cold as a traditional Newari delicacy.",
        image: "/images/recipes/chhoyela.png",
        cookTime: 60,
        servings: 6,
        cost: 9.50,
        difficulty: "Hard",
        category: "Non-Veg",
        rating: 4.2,
        ratingCount: 78,
        ingredients: [
          "1 kg buffalo meat or chicken breast",
          "3 tbsp mustard oil",
          "2 tbsp ginger-garlic paste",
          "2 tsp red chili powder",
          "1 tsp turmeric powder",
          "2 tsp fenugreek powder",
          "1 tbsp timur (Sichuan pepper), ground",
          "Salt to taste",
          "2 tbsp chopped green onions",
          "1 tbsp chopped cilantro"
        ],
        instructions: [
          "Boil meat with salt and turmeric until fully cooked.",
          "Remove from water and let it cool completely.",
          "Shred the meat into small pieces using hands.",
          "Heat mustard oil until it smokes, then let it cool.",
          "Mix shredded meat with all spices and cooled mustard oil.",
          "Add ginger-garlic paste and mix thoroughly.",
          "Let it marinate for at least 30 minutes.",
          "Garnish with green onions and cilantro before serving.",
          "Serve cold with beaten rice and achar."
        ],
        nutritionFacts: {
          calories: 290,
          protein: 32,
          carbs: 3,
          fat: 16
        },
        cookingTips: [
          "Traditionally smoked over hay for authentic flavor",
          "Can be stored in refrigerator for 2-3 days",
          "Timur (Sichuan pepper) is essential for authentic taste"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "12",
        title: "Saanbheko",
        description: "A tender meat dish made by pressure-cooking with robust spices, rich and flavorful.",
        image: "/images/recipes/saanbheko.png",
        cookTime: 90,
        servings: 6,
        cost: 10.50,
        difficulty: "Medium",
        category: "Non-Veg",
        rating: 3.8,
        ratingCount: 65,
        ingredients: [
          "1 kg goat meat with bones",
          "3 tbsp mustard oil",
          "2 large onions, sliced",
          "3 tbsp ginger-garlic paste",
          "2 tsp turmeric powder",
          "3 tsp red chili powder",
          "2 tsp coriander powder",
          "1 tsp garam masala",
          "3 tomatoes, chopped",
          "Salt to taste",
          "Fresh cilantro for garnish"
        ],
        instructions: [
          "Clean and cut meat into medium pieces.",
          "Heat mustard oil in pressure cooker and fry onions until golden.",
          "Add ginger-garlic paste and fry for 2 minutes.",
          "Add all spices and fry for 30 seconds.",
          "Add tomatoes and cook until they break down.",
          "Add meat pieces and mix well with spices.",
          "Add salt and 1 cup water.",
          "Pressure cook for 6-7 whistles or until meat is tender.",
          "Garnish with cilantro and serve hot with rice."
        ],
        nutritionFacts: {
          calories: 380,
          protein: 35,
          carbs: 8,
          fat: 24
        },
        cookingTips: [
          "Don't add too much water as meat releases its own juices",
          "Adjust spices according to taste preference",
          "Tastes better the next day as flavors develop"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "13",
        title: "Momo",
        description: "Steamed dumplings filled with meat or vegetables, served with spicy dipping sauce.",
        image: "/images/recipes/momo.png",
        cookTime: 60,
        servings: 4,
        cost: 6.50,
        difficulty: "Medium",
        category: "Non-Veg",
        rating: 4.8,
        ratingCount: 234,
        ingredients: [
          "2 cups all-purpose flour",
          "500g ground chicken or pork",
          "1 large onion, finely chopped",
          "3 cloves garlic, minced",
          "1 tbsp ginger, minced",
          "2 green chilies, finely chopped",
          "1 tsp soy sauce",
          "1 tbsp vegetable oil",
          "Salt and pepper to taste",
          "Water for dough",
          "Chopped cilantro and green onions"
        ],
        instructions: [
          "Make dough with flour and water, knead until smooth. Rest for 30 minutes.",
          "Mix ground meat with onions, garlic, ginger, chilies, soy sauce, oil, salt, and pepper.",
          "Add chopped cilantro and green onions to the filling.",
          "Roll dough into small circles (3-4 inches diameter).",
          "Place 1 tbsp filling in center of each circle.",
          "Fold and pleat edges to seal dumplings.",
          "Steam in a steamer for 15-20 minutes.",
          "Serve hot with spicy tomato chutney."
        ],
        nutritionFacts: {
          calories: 320,
          protein: 18,
          carbs: 35,
          fat: 12
        },
        cookingTips: [
          "Don't overfill dumplings or they may burst",
          "Keep unused dough covered to prevent drying",
          "Can be pan-fried after steaming for crispy bottom"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "14",
        title: "Dal Bhat",
        description: "Classic Nepali staple: lentil soup with steamed rice and traditional sides, the heart of Nepali cuisine.",
        image: "/images/recipes/dal-bhat.png",
        cookTime: 45,
        servings: 4,
        cost: 3.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.5,
        ratingCount: 156,
        ingredients: [
          "1 cup yellow lentils (masoor dal)",
          "2 cups basmati rice",
          "1 medium onion, chopped",
          "3 cloves garlic, minced",
          "1 tsp ginger, minced",
          "2 tomatoes, chopped",
          "1 tsp turmeric powder",
          "1 tsp cumin seeds",
          "2 tbsp ghee or oil",
          "Salt to taste",
          "Fresh cilantro for garnish",
          "Green chilies"
        ],
        instructions: [
          "Wash and cook rice in a rice cooker or pot until fluffy.",
          "Wash lentils and cook with turmeric and salt until soft.",
          "Heat ghee in a pan, add cumin seeds and let them splutter.",
          "Add onions and cook until golden brown.",
          "Add garlic, ginger, and green chilies. Cook for 1 minute.",
          "Add tomatoes and cook until they break down.",
          "Add this tempering to cooked lentils and simmer for 10 minutes.",
          "Adjust consistency with water if needed.",
          "Garnish with cilantro and serve with rice and vegetables."
        ],
        nutritionFacts: {
          calories: 380,
          protein: 16,
          carbs: 68,
          fat: 8
        },
        cookingTips: [
          "Soak lentils for 30 minutes for faster cooking",
          "Traditionally served with pickles and vegetables",
          "Comfort food that's nutritionally complete"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "15",
        title: "Yomari",
        description: "Sweet steamed dumpling filled with jaggery and sesame paste, made during Yomari Punhi festival.",
        image: "/images/recipes/yomari.png",
        cookTime: 60,
        servings: 8,
        cost: 4.50,
        difficulty: "Medium",
        category: "Vegetarian",
        rating: 4.3,
        ratingCount: 89,
        ingredients: [
          "2 cups rice flour",
          "1 cup jaggery, grated",
          "1/2 cup sesame seeds",
          "1/4 cup grated coconut",
          "1 tsp cardamom powder",
          "Warm water for dough",
          "Pinch of salt",
          "1 tbsp ghee"
        ],
        instructions: [
          "Dry roast sesame seeds until golden, then grind coarsely.",
          "Mix jaggery, ground sesame, coconut, and cardamom for filling.",
          "Make dough with rice flour, warm water, and salt. Knead until smooth.",
          "Rest dough for 15 minutes covered with damp cloth.",
          "Take small portions of dough and shape into cups.",
          "Fill with jaggery mixture and seal by bringing edges together.",
          "Shape into traditional conch shell form.",
          "Steam for 20-25 minutes until cooked through.",
          "Brush with ghee and serve warm."
        ],
        nutritionFacts: {
          calories: 220,
          protein: 4,
          carbs: 45,
          fat: 6
        },
        cookingTips: [
          "Dough should be pliable but not sticky",
          "Traditional shape resembles a conch shell",
          "Often made during Yomari Punhi festival in December"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "16",
        title: "Sikarni",
        description: "Thickened curd dessert flavored with cardamom, nuts, and saffron, a royal Nepali sweet.",
        image: "/images/recipes/sikarni.png",
        cookTime: 30,
        servings: 4,
        cost: 3.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.1,
        ratingCount: 67,
        ingredients: [
          "2 cups thick yogurt",
          "1/2 cup condensed milk",
          "1/4 cup powdered sugar",
          "1/2 tsp cardamom powder",
          "2 tbsp chopped almonds",
          "2 tbsp chopped pistachios",
          "Few saffron strands",
          "1 tbsp warm milk"
        ],
        instructions: [
          "Hang yogurt in a muslin cloth for 2 hours to remove excess whey.",
          "Soak saffron in warm milk for 10 minutes.",
          "In a bowl, whisk the thick yogurt until smooth.",
          "Add condensed milk and powdered sugar, mix well.",
          "Add cardamom powder and saffron milk.",
          "Mix in half of the chopped nuts.",
          "Chill in refrigerator for at least 2 hours.",
          "Garnish with remaining nuts and serve cold."
        ],
        nutritionFacts: {
          calories: 220,
          protein: 8,
          carbs: 28,
          fat: 9
        },
        cookingTips: [
          "Use hung curd for thick consistency",
          "Adjust sweetness according to taste",
          "Best served chilled on festive occasions"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "17",
        title: "Dahi Phal",
        description: "A fresh mix of fruits and yogurt, lightly sweetened and perfect for hot summer days.",
        image: "/images/recipes/dahi-phal.png",
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
        id: "18",
        title: "Kheer",
        description: "Creamy rice pudding made with milk, rice, sugar, and cardamom, a beloved dessert across Nepal.",
        image: "/images/recipes/kheer.png",
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
      },
      {
        id: "20",
        title: "Lasune Golbhenda",
        description: "Tomato-based chutney enhanced with lots of garlic, a staple sauce in Nepali cuisine.",
        image: "/images/recipes/lasune-golbhenda.png",
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
        id: "21",
        title: "Dhaniya Sada",
        description: "Simple and fresh coriander chutney with lemon and chili, perfect accompaniment to any meal.",
        image: "/images/recipes/dhaniya-sada.png",
        cookTime: 10,
        servings: 4,
        cost: 1.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.3,
        ratingCount: 78,
        ingredients: [
          "2 cups fresh cilantro leaves",
          "3-4 green chilies",
          "3 cloves garlic",
          "1 inch ginger",
          "2 tbsp lemon juice",
          "1/2 tsp salt",
          "1 tsp sugar",
          "2-3 tbsp water"
        ],
        instructions: [
          "Wash cilantro leaves thoroughly and drain well.",
          "In a food processor, grind green chilies, garlic, and ginger first.",
          "Add cilantro leaves and grind to a smooth paste.",
          "Add lemon juice, salt, and sugar.",
          "Add water gradually to achieve desired consistency.",
          "Taste and adjust seasoning as needed.",
          "Serve fresh as a side with meals."
        ],
        nutritionFacts: {
          calories: 25,
          protein: 1,
          carbs: 5,
          fat: 0
        },
        cookingTips: [
          "Use fresh cilantro for best flavor",
          "Don't add too much water at once",
          "Store in refrigerator for up to 3 days"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "22",
        title: "Tilko Chhop",
        description: "Thick sesame seed paste used as dip or side condiment, rich in nutrients and flavor.",
        image: "/images/recipes/tilko-chhop.png",
        cookTime: 20,
        servings: 6,
        cost: 3.00,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.0,
        ratingCount: 34,
        ingredients: [
          "1 cup sesame seeds",
          "2-3 green chilies",
          "3 cloves garlic",
          "1 inch ginger",
          "1 tsp salt",
          "1 tbsp mustard oil",
          "1 tsp lemon juice"
        ],
        instructions: [
          "Dry roast sesame seeds in a pan until golden and aromatic.",
          "Let them cool completely.",
          "In a food processor, grind roasted sesame seeds to a fine powder.",
          "Add green chilies, garlic, and ginger. Grind to a paste.",
          "Add salt, mustard oil, and lemon juice.",
          "Mix well to form a thick paste.",
          "Store in an airtight container in refrigerator.",
          "Serve as a dip with vegetables or meat."
        ],
        nutritionFacts: {
          calories: 180,
          protein: 6,
          carbs: 6,
          fat: 16
        },
        cookingTips: [
          "Roast sesame seeds on low heat to prevent burning",
          "Adjust consistency with oil if too thick",
          "Rich source of calcium and healthy fats"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "23",
        title: "Sathi ko Mixed Thali",
        description: "A complete Nepali meal with chicken, goat curry, dal, vegetables, rice, and traditional sides.",
        image: "/images/recipes/sathi-ko-mixed-thali.png",
        cookTime: 120,
        servings: 2,
        cost: 12.50,
        difficulty: "Hard",
        category: "Non-Veg",
        rating: 4.9,
        ratingCount: 145,
        ingredients: [
          "1/2 kg chicken, cut into pieces",
          "1/2 kg goat meat",
          "1 cup lentils (dal)",
          "2 cups basmati rice",
          "Mixed vegetables (potato, cauliflower, beans)",
          "Tomato chutney ingredients",
          "Pickled vegetables",
          "1 sweet (kheer or sikarni)",
          "Spices for each curry",
          "Ghee and oil"
        ],
        instructions: [
          "Prepare dal bhat by cooking rice and lentils separately.",
          "Cook chicken curry with traditional spices and onion-tomato base.",
          "Prepare goat curry with pressure cooking and aromatic spices.",
          "Make mixed vegetable curry with seasonal vegetables.",
          "Prepare tomato chutney with garlic and spices.",
          "Cook rice until fluffy and aromatic.",
          "Arrange all items on a traditional thali plate.",
          "Serve hot with pickles and sweet dessert."
        ],
        nutritionFacts: {
          calories: 850,
          protein: 45,
          carbs: 78,
          fat: 35
        },
        cookingTips: [
          "Plan ahead as this meal takes time to prepare",
          "Each component should complement the others",
          "Traditional way of eating complete Nepali meal"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "1",
        title: "Quanti",
        description: "A hearty soup made from a mix of sprouted legumes, perfect for international students and cooking beginners.",
        image: "/images/recipes/quanti.png",
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
        image: "/images/recipes/sikarni.png",
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
        image: "/images/recipes/phando-generated.png",
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
        image: "/images/recipes/badame-dhaniya.png",
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
        image: "/images/recipes/dahi-phal-generated.png",
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
        image: "/images/recipes/lasune-golbhenda-generated.png",
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
        image: "/images/recipes/kheer-generated.png",
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
      },
      // Add the new recipes from the provided images
      {
        id: "30",
        title: "Dhania Sada",
        description: "A vibrant green cilantro chutney packed with fresh herbs, garlic, and spices - perfect as a condiment.",
        image: "/images/recipes/dhaniya-sada.png",
        cookTime: 10,
        servings: 4,
        cost: 1.50,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.5,
        ratingCount: 42,
        ingredients: [
          "2 cups fresh cilantro leaves",
          "4 cloves garlic",
          "2 green chilies",
          "1 inch piece ginger",
          "2 tbsp roasted sesame seeds",
          "1 tsp cumin powder",
          "Salt to taste",
          "2 tbsp mustard oil",
          "1 tsp lemon juice"
        ],
        instructions: [
          "Wash and roughly chop cilantro leaves, discarding thick stems.",
          "In a blender, combine cilantro, garlic, green chilies, and ginger.",
          "Add sesame seeds, cumin powder, and salt.",
          "Blend with minimal water to make a smooth paste.",
          "Add mustard oil and lemon juice, blend for 30 seconds.",
          "Taste and adjust salt and spices as needed.",
          "Store in refrigerator for up to a week."
        ],
        nutritionFacts: {
          calories: 35,
          protein: 2,
          carbs: 4,
          fat: 3
        },
        cookingTips: [
          "Use fresh cilantro for best flavor",
          "Mustard oil gives authentic taste but can substitute with olive oil",
          "Add a pinch of sugar if too spicy"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "31",
        title: "Tilko Chhop", 
        description: "A traditional sesame seed paste with spices, rich in flavor and nutrients, often served with rice or roti.",
        image: "/images/recipes/tilko-chhop.png",
        cookTime: 15,
        servings: 4,
        cost: 2.00,
        difficulty: "Medium",
        category: "Vegetarian", 
        rating: 4.3,
        ratingCount: 28,
        ingredients: [
          "1 cup sesame seeds",
          "3 cloves garlic",
          "2 dried red chilies",
          "1 tsp ginger, minced",
          "1/2 tsp turmeric powder",
          "1 tsp cumin seeds",
          "Salt to taste",
          "2 tbsp mustard oil",
          "1 tbsp lemon juice"
        ],
        instructions: [
          "Dry roast sesame seeds in a pan until golden and fragrant.",
          "Let cool completely and grind to a fine paste.",
          "Heat oil in a pan, add cumin seeds and dried chilies.",
          "Add garlic and ginger, sauté until fragrant.",
          "Add turmeric and the sesame paste.",
          "Mix well, add salt and cook for 2-3 minutes.",
          "Add lemon juice and serve warm or at room temperature."
        ],
        nutritionFacts: {
          calories: 180,
          protein: 6,
          carbs: 8,
          fat: 15
        },
        cookingTips: [
          "Roast sesame seeds on medium heat to prevent burning",
          "Can be stored for up to 2 weeks in refrigerator",
          "Consistency should be like thick paste"
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "32",
        title: "Badame Dhaniya",
        description: "A delicious almond and cilantro chutney with aromatic spices, perfect as a side dish or condiment.",
        image: "/images/recipes/dhaniya-sada.png",
        cookTime: 12,
        servings: 4,
        cost: 3.00,
        difficulty: "Easy",
        category: "Vegetarian",
        rating: 4.4,
        ratingCount: 35,
        ingredients: [
          "1/2 cup almonds, soaked",
          "1 cup fresh cilantro",
          "3 cloves garlic",
          "2 green chilies",
          "1 inch ginger piece",
          "1 tsp cumin seeds",
          "Salt to taste",
          "2 tbsp olive oil",
          "1 tbsp lime juice"
        ],
        instructions: [
          "Soak almonds in warm water for 30 minutes, then peel.",
          "Wash cilantro leaves thoroughly and drain.",
          "In a blender, combine almonds, cilantro, garlic, chilies, and ginger.",
          "Add cumin seeds and salt.",
          "Blend with minimal water to make a smooth paste.",
          "Add olive oil and lime juice, blend until well combined.",
          "Serve fresh or store refrigerated for up to 5 days."
        ],
        nutritionFacts: {
          calories: 95,
          protein: 4,
          carbs: 6,
          fat: 8
        },
        cookingTips: [
          "Soaking almonds makes them easier to blend",
          "Can add mint leaves for extra freshness",
          "Adjust consistency with water as needed"
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
    
    const allRecipes = Array.from(this.recipes.values());
    
    switch (category) {
      case "Vegetarian":
        return allRecipes.filter(recipe => recipe.category === "Vegetarian");
      case "Non-Veg":
        return allRecipes.filter(recipe => recipe.category === "Non-Veg");
      case "Quick Meals":
        return allRecipes.filter(recipe => recipe.cookTime <= 30);
      case "Budget":
        return allRecipes.filter(recipe => recipe.cost <= 3.50);
      default:
        return allRecipes.filter(recipe => recipe.category === category);
    }
  }

  async searchRecipes(query: string): Promise<Recipe[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.recipes.values()).filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      (recipe.ingredients as string[]).some((ingredient: string) => 
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
      nutritionFacts: insertRecipe.nutritionFacts || null,
      cookingTips: insertRecipe.cookingTips || null,
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
