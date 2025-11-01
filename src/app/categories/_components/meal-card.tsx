import { Meal } from "@/types/meal";
import Image from "next/image";
import Link from "next/link";

export const MealCard = (props: Meal & { category: string }) => {
  return (
    <Link
      href={`${props.category}/${props.strMeal}`}
      className="bg-neutral-800/60 hover:shadow-md rounded-lg flex flex-wrap items-center max-lg:hover:scale-105 gap-3 pb-4 hover:scale-110 duration-200"
    >
      <div className="w-full items-center flex justify-center rounded-lg">
        <Image
          src={props.strMealThumb}
          width={320}
          className="rounded-t-lg"
          height={200}
          alt={props.strMeal}
        />
      </div>
      <h3 className="text-xl max-lg:text-lg max-md:text-base w-full text-left px-3 max-lg:px-2 line-clamp-1">
        {props.strMeal}
      </h3>
    </Link>
  );
};
