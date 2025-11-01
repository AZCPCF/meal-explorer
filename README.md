# 🍽️ Meal Explorer — Next.js App with TheMealDB API

A modern, statically generated food discovery app built with Next.js (App Router), TypeScript, and Tailwind CSS. It fetches meal categories and recipes from [TheMealDB](https://www.themealdb.com/) and supports dynamic routing for categories and individual meals.

---

## 🚀 Features

- ⚡️ **Static Site Generation (SSG)** with `generateStaticParams` for optimal performance
- 🧭 **Dynamic Routing** for categories and meals:
  - `/` — Homepage with all meal categories
  - `/categories/[category]` — Meals in a selected category
  - `/categories/[category]/[meal]` — Detailed view of a specific meal
- 🎨 **Responsive UI** built with Tailwind CSS
- 🌐 **API Integration** with TheMealDB

---

## 🔧 Setup

1. **Clone the repo**

```bash
git clone https://github.com/your-username/meal-explorer.git
cd meal-explorer
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Run the dev server**

```bash
pnpm dev
# or
npm run dev
```

4. **Build for production**

```bash
pnpm build
# or
npm run build
```

---

## 🌍 API Reference

All data is fetched from [TheMealDB](https://www.themealdb.com/api.php):

- `GET /api/json/v1/1/categories.php` — List of meal categories
- `GET /api/json/v1/1/filter.php?c={category}` — Meals in a category
- `GET /api/json/v1/1/search.php?s={meal}` — Search for a meal by name

> ⚠️ Note: Some meal names contain special characters (e.g., `&`, spaces). These must be carefully encoded using `encodeURIComponent`, but in some cases (like `&`), you may need to decode `%26` back to `&` to match API expectations.

---

## 🧠 Static Generation Strategy

This app uses `generateStaticParams` to pre-render:

- All category pages (`/categories/[category]`)
- All meal pages (`/categories/[category]/[meal]`)

This ensures fast load times and SEO-friendly URLs.
