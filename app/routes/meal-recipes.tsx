import MealCard from "../components/MealCard";
import { fetchRandomRecipes } from "../services/recipeAPI";
import { Link } from "react-router";

/* export function shouldRevalidate() {
  return false;
} */

export async function clientLoader() {
  const recipes = await fetchRandomRecipes({ limit: 9 });
  return { recipes };
}

const FavoriteRecipes = ({ loaderData }) => {
  const {recipes} = loaderData;

  return (
    <div className="favorite-recipes-container container">
      <div className="favorite-recipes-header">
        <h1>Recipes</h1>
      </div>

      <div className="meal-grid">
        {recipes.map((recipe) => (
          <MealCard key={recipe.id} meal={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
