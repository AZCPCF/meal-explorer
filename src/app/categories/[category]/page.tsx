import { fetcher } from "@/lib/fetcher";
import { Meal } from "@/types/meal";
import { notFound } from "next/navigation";
import { MealCard } from "../_components/meal-card";
import Link from "next/link";

export async function generateStaticParams() {
  const {
    res: { categories },
  } = await fetcher<{ categories: { strCategory: string }[] }>(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  return categories.map((category) => ({
    category: category.strCategory,
  }));
}

export default async function categoriesSlugPage({
  params,
}: PageProps<"/categories/[category]">) {
  const { category } = await params;
  const {
    res: { meals },
  } = await fetcher<{ meals: Meal[] }>(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
      encodeURIComponent(category),
    { cache: "force-cache" }
  );
  if (!meals?.length) {
    notFound();
  }
  return (
    <div>
      <h1 className="text-4xl font-bolder mb-8">
        <Link href={"/"} className="text-blue-500">
          Home
        </Link>{" "}
        / {category}
      </h1>
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-8 max-lg:gap-4 max-md:gap-3">
        {meals.map((meal) => (
          <MealCard
            category={category}
            {...meal}
            key={"meal-" + meal.strMeal}
          />
        ))}
      </div>
    </div>
  );
}
