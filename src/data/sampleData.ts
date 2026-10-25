import { StockItem } from "../types/stock";
import { Food } from "../types/food";

export const SAMPLE_STOCK: StockItem[] = [
  { id: "s1", foodId: "poulet-filet", name: "Filet de poulet", quantityG: 300, portionG: 100, location: "congelateur" },
  { id: "s2", foodId: "saucisses-poulet", name: "Saucisses de poulet", quantityG: 180, portionG: 30, location: "congelateur" },
  { id: "s3", foodId: "skyr", name: "Skyr nature", quantityG: 500, portionG: 150, location: "frigo" },
  { id: "s4", foodId: "huile-olive", name: "Huile d’olive", quantityG: 750, portionG: 10, location: "placard" },
];

export const SAMPLE_FOODS: Food[] = [
  { id: "poulet-filet", name: "Filet de poulet", category: "Protéines", kcal: 124, protein: 26, carbs: 0, fat: 1.4, coefficient: 0.75, packageG: 1000, aisle: "Viandes", origin: "coach" },
  { id: "saucisses-poulet", name: "Heck Simply Saucisses De Poulet", category: "Protéines", kcal: 130, protein: 21.6, carbs: 1.6, fat: 3.6, coefficient: 1, unitG: 30, aisle: "Viandes", origin: "coach" },
  { id: "patate-douce", name: "Patate douce", category: "Glucides", kcal: 86, protein: 0, carbs: 20, fat: 0, coefficient: 0.9, packageG: 1000, aisle: "Fruits et légumes", origin: "coach" },
  { id: "banane", name: "Banane", category: "Fruits", kcal: 89, protein: 0, carbs: 22.8, fat: 0, coefficient: 1, aisle: "Fruits et légumes", origin: "coach" },
  { id: "huile-olive", name: "Huile d’olive extra vierge", category: "Lipides", kcal: 900, protein: 0, carbs: 0, fat: 100, coefficient: 1, aisle: "Épicerie", origin: "coach" },
  { id: "skyr", name: "Skyr nature", category: "Autre", kcal: 63, protein: 11, carbs: 4, fat: 0.2, coefficient: 1, packageG: 450, aisle: "Frais", origin: "perso" },
];