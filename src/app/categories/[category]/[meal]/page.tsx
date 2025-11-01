import { fetcher } from "@/lib/fetcher";
import { MealAPI } from "@/types/meal";
import { normalizeMeal } from "@/utils/normalize-meal";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const {
    res: { categories },
  } = await fetcher<{ categories: { strCategory: string }[] }>(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  const allMeals = [];

  for (const { strCategory } of categories) {
    const {
      res: { meals },
    } = await fetcher<{ meals: { strMeal: string }[] }>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
        strCategory
      )}`
    );

    for (const meal of meals) {
      allMeals.push({
        category: strCategory,
        meal: meal.strMeal,
      });
    }
  }

  return allMeals;
}

export default async function MealPage({
  params,
}: PageProps<"/categories/[category]/[meal]">) {
  const { category, meal } = await params;

  const {
    res: { meals },
  } = await fetcher<{ meals: MealAPI[] }>(
    ("https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal)
      .replaceAll("%25", "")
      .replaceAll("%26", "&")
  );
  console.log(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=Blueberry%20&%20lemon%20friands"
  );
  console.log(
    ("https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal)
      .replaceAll("%25", "")
      .replaceAll("%26", "&")
  );
  const resMeal = normalizeMeal(meals[0]);

  if (!meal) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center text-white">
        <div className="bg-neutral-900 p-6 rounded-2xl shadow-xl w-[90%] max-w-md text-center">
          <p className="text-lg font-medium">Meal not found.</p>
          <Link
            href={`/categories/${category}`}
            className="block mt-4 text-blue-400 hover:underline"
          >
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-neutral-900 rounded-2xl shadow-2xl w-[95%] max-w-5xl overflow-hidden relative">
        {/* Close button */}
        <Link
          href={`/categories/${category}`}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white text-2xl transition"
        >
          ✕
        </Link>

        {/* Scrollable content */}
        <div className="max-h-[85vh] overflow-y-auto">
          {/* Header section */}
          <div className="p-6 md:p-8 text-center border-b border-neutral-800">
            <h2 className="text-3xl font-bold text-white mb-2">
              {resMeal.title}
            </h2>
            <p className="text-sm text-neutral-400">
              {resMeal.category} • {resMeal.area}
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full">
            <Image
              src={resMeal.thumbnail}
              alt={resMeal.title}
              width={800}
              height={600}
              className="w-full object-cover h-[250px] md:h-[350px]"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 text-white space-y-8">
            {/* Ingredients */}
            <section>
              <h3 className="text-lg font-semibold mb-3 border-b border-neutral-700 pb-1">
                Ingredients
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-300">
                {resMeal.ingredients.map((item, i) => (
                  <li key={i}>
                    <span className="text-white">{item.name}</span>{" "}
                    <span className="text-neutral-400">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section>
              <h3 className="text-lg font-semibold mb-3 border-b border-neutral-700 pb-1">
                Instructions
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {resMeal.instructions}
              </p>
            </section>

            {/* Footer button */}
            <div className="pt-2 flex justify-center md:justify-end">
              <Link
                href={`/categories/${category}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Back to Category
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
