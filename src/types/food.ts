// src/types/food.ts
export type FoodOrigin = "coach" | "perso";

export interface Food {
  id: string;
  name: string;
  category: string;     // "Protéines", "Glucides", "Lipides", "Fruits"...
  kcal: number;         // pour 100 g de cru
  protein: number;
  carbs: number;
  fat: number;
  coefficient: number;  // cru → cuit (1 = ne change pas de poids)
  packageG?: number;    // conditionnement d'achat, en g
  unitG?: number;       // poids d'une unité, en g (ex. 1 saucisse = 30)
  aisle?: string;       // rayon
  origin: FoodOrigin;
}