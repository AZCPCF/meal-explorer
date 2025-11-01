export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export interface MealAPI {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}
