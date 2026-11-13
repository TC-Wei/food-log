export type Meal = "早餐" | "午餐" | "點心" | "晚餐" | "宵夜";
export interface FoodItem {
  id: number;
  date: string;
  name: string;
  meal: Meal;
}
