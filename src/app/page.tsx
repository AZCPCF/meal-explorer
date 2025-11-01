import { fetcher } from "@/lib/fetcher";
import { Category } from "@/types/category";
import { CategoryCard } from "./_components/category-card";

export default async function Home() {
  const {
    res: { categories },
  } = await fetcher<{
    categories: Category[];
  }>("https://www.themealdb.com/api/json/v1/1/categories.php");
  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-8 max-lg:gap-4 max-md:gap-3">
      {categories.map((category) => (
        <CategoryCard {...category} key={"category-" + category.strCategory} />
      ))}
    </div>
  );
}
