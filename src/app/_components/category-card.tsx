import { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

export const CategoryCard = (props: Category) => {
  return (
    <Link
      href={"/categories/" + props.strCategory}
      className="bg-neutral-800/50 hover:shadow-md rounded-lg flex flex-wrap items-center max-lg:hover:scale-105 justify-center gap-4 py-4 hover:scale-110 duration-200"
    >
      <div className="w-full items-center flex justify-center">
        <Image
          src={props.strCategoryThumb}
          width={320}
          height={200}
          alt={props.strCategory}
        />
      </div>
      <h3 className="text-3xl max-lg:text-2xl max-md:text-xl w-full text-left px-4 max-lg:px-2S">
        {props.strCategory}
      </h3>
      <p className="line-clamp-3 px-4 max-w-full text-base max-lg:text-sm max-md:text-xs max-lg:px-2 text-neutral-400">
        {props.strCategoryDescription}
      </p>
    </Link>
  );
};
