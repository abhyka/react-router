import { useFetcher } from "react-router";
import "./mealcard.css";

/* export const clientAction = async({params, request}) => {
  const formData = await request.formData();
  const catImg = formData.get("imageId");
  const updates = Object.fromEntries(formData);
  await addToFavorites(params.imageId, updates);
  return { favorites: formData };
}
 */

const MealCard = ({ meal }) => {
  const fetcher = useFetcher();
  const isSubmitting = Boolean(fetcher.formData);

/*   const fetcher = useFetcher();
  const { favorites } = useRouteLoaderData("sidebar");

  const favored = favorites.some(
    (fav) => fav.image && fav.image.id === cat.id
  );

  const submitted = Boolean(fetcher.formData);
  const liked = favored || submitted;
 */

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