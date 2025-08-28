import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const recipes = pgTable("recipes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  cookTime: integer("cook_time").notNull(), // in minutes
  servings: integer("servings").notNull(),
  cost: real("cost").notNull(), // cost per serving in dollars
  difficulty: text("difficulty").notNull(), // Easy, Medium, Hard
  category: text("category").notNull(), // Vegetarian, Non-Veg, Quick Meals, Budget, Trending
  rating: real("rating").notNull().default(0),
  ratingCount: integer("rating_count").notNull().default(0),
  ingredients: json("ingredients").$type<string[]>().notNull(),
  instructions: json("instructions").$type<string[]>().notNull(),
  nutritionFacts: json("nutrition_facts").$type<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>(),
  cookingTips: json("cooking_tips").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  reason: text("reason").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  rating: true,
  ratingCount: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const selectRecipeSchema = createSelectSchema(recipes);

export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = z.infer<typeof selectRecipeSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
