export type StockLocation = "frigo" | "congelateur" | "placard";

export interface StockItem {
  id: string;
  foodId: string;
  name: string;
  quantityG: number; // toujours en cru
  portionG: number;  // taille d'une portion, en grammes
  location: StockLocation;
}