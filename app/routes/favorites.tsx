import { Form } from "react-router";
import "./favorites.css";
import { fetchFavoriteRecipes, removeRecipeFromFavorites } from "../services/recipeAPI";
import { redirect } from "react-router";

export const clientLoader = async() => {
  const favsData = await fetchFavoriteRecipes();

  return { favorites: favsData };
}

// export const clientAction = async ({ request }) => {
//     const formData = await request.formData();
//     const favoriteId = formData.get("favoriteId");
//     await removeRecipeFromFavorites(favoriteId);
//     return redirect("/favorites");
// }

const Favorites = ({ loaderData }) => {
    const {favorites} = loaderData;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="favorites-container container">
            <h1>My Favorite Recipes</h1>

            {favorites.length === 0 ? (
                <div className="no-favorites">
                    <p>You haven&quot;t added any recipes to your favorites yet.</p>
                    <p>Browse recipes and click the heart icon to add them here!</p>
                </div>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="favorite-card card">
                            <p className="added-date">
                                Added on {formatDate(favorite.created_at)}
                            </p>
                            <Form
                                className="remove-form"
                                method="post"
                                onSubmit={(event) => {
                                    const confirmed = confirm(
                                        "Please confirm you want to remove this favorite."
                                    );
                                    if (!confirmed) {
                                        event.preventDefault();
                                    }
                                }}
                            >
                                <input type="hidden" name="favoriteId" value={favorite.id} />
                                <button
                                    type="submit"
                                    className="remove-button"
                                    aria-label="Remove from favorites"
                                >
                                    ✕
                                </button>
                            </Form>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
