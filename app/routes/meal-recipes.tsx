import MealCard from "../components/MealCard";
import { fetchRandomMeals } from "../services/mealApi";
import { Link } from "react-router";

export function shouldRevalidate() {
  return false;
}

export async function clientLoader() {
  return fetchRandomMeals({ limit: 9 });
}

const RandomMeals = ({ loaderData }) => {
  const meals = loaderData;

  return (
    <div className="random-meals-container container">
      <div className="random-meals-header">
        <h1>Random Meals</h1>
      </div>

      <div className="meal-grid">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default RandomMeals;
