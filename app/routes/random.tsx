import { useState } from "react";
import type { Route } from "./+types/random";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Random Recipe" },
    { name: "description", content: "Get a random meal recipe!" },
  ];
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: string;
}

export default function Random() {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchRandomMeal() {
    setLoading(true);
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      setMeal(data.meals[0]);
    } finally {
      setLoading(false);
    }
  }

  const ingredients = meal
    ? Array.from({ length: 20 }, (_, i) => ({
        ingredient: meal[`strIngredient${i + 1}`],
        measure: meal[`strMeasure${i + 1}`],
      })).filter(({ ingredient }) => ingredient?.trim())
    : [];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Random Recipe
        </h1>

        <div className="flex justify-center mb-10">
          <button
            onClick={fetchRandomMeal}
            disabled={loading}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {loading ? "Fetching..." : "Give me a recipe!"}
          </button>
        </div>

        {meal && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {meal.strMeal}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {meal.strCategory} · {meal.strArea}
              </p>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Ingredients
              </h3>
              <ul className="grid grid-cols-2 gap-1 mb-6">
                {ingredients.map(({ ingredient, measure }) => (
                  <li
                    key={ingredient}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="font-medium">{measure}</span> {ingredient}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Instructions
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {meal.strInstructions}
              </p>

              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-6 text-sm text-orange-500 hover:underline"
                >
                  Watch on YouTube →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
