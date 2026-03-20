import { Form, redirect } from "react-router";
import "./favorites.css";
import { fetchFavoriteRecipes, removeRecipeFromFavorites } from "../services/recipeAPI";

export const clientLoader = async () => {
  const favsData = await fetchFavoriteRecipes();

  return { favorites: favsData };
};

export const clientAction = async ({ request }) => {
  const formData = await request.formData();
  const favoriteId = formData.get("favoriteId");

  if (typeof favoriteId === "string" && favoriteId.length > 0) {
    await removeRecipeFromFavorites(favoriteId);
  }

  return redirect("/favorites");
};

const Favorites = ({ loaderData }) => {
    const {favorites} = loaderData;

    return (
        <div className="favorites-container container">
            <h1>My Favorite Recipes</h1>

            {favorites.length === 0 ? (
                <div className="no-favorites">
                    <p>You haven't added any recipes to your favorites yet.</p>
                </div>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="favorite-card card">
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
