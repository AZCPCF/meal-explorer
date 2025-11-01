import { MealAPI } from "@/types/meal";

export const normalizeMeal = (meal: MealAPI) => {
  console.log("inno:::", meal);
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (name && name.trim() !== "") {
      ingredients.push({
        name: name.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    youtube: meal.strYoutube,
    tags: meal.strTags?.split(",") || [],
    ingredients,
  };
};
