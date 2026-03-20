import { useFetcher } from "react-router";
import "./mealcard.css";

const MealCard = ({ meal }) => {
  const fetcher = useFetcher();
  const isSubmitting = Boolean(fetcher.formData);

  return (
    <div className="meal-card card">
      <img src={meal.url} alt="Random meal" />
      <div className="meal-card-actions">
        <fetcher.Form method="post" action="/favorites-action">
          <input type="hidden" name="imageId" value={meal.id} />
          <input type="hidden" name="imageUrl" value={meal.url} />
          <button type="submit" className="favorite-button btn">
            ❤️ {isSubmitting && "Saving..."}
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default MealCard;