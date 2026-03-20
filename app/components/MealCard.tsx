import { useFetcher, useRouteLoaderData } from "react-router";
import "./mealcard.css";

const MealCard = ({ meal }) => {
  const fetcher = useFetcher();
  const { favorites } = useRouteLoaderData("sidebar");

  const alreadyFavorited = favorites.some(
    (fav) => fav.image && fav.image.id === meal.id
  );
  const isSubmitting = Boolean(fetcher.formData);
  const isLiked = alreadyFavorited || isSubmitting;

  return (
    <div className="meal-card card">
      <img src={meal.url} alt="Random meal" />
      <div className="meal-card-actions">
        <fetcher.Form method="post" action="/favorites-action">
          <input type="hidden" name="imageId" value={meal.id} />
          <button type="submit" className="favorite-button btn">
            {isLiked ? "❤️" : "🤍"} {fetcher.state !== "idle" && "Saving..."}
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default MealCard;