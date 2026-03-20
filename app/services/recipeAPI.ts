
const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export const fetchRandomRecipe = async () => {
  const response = await fetch(`${API_BASE_URL}random.php`);
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  const data = await response.json();
  return data.meals[0];
}

export const fetchRecipeById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}lookup.php?i=${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes`);
  }
  const data = await response.json();
  return data.meals[0];
}

export const fetchRecipesBySearch = async (query: string) => {
  const response = await fetch(`${API_BASE_URL}search.php?s=${query}`);
  if (!response.ok) {
    throw new Error(`Failed to search recipes`);
  }
  const data = await response.json();
  return data.meals || [];
}

export const fetchRandomRecipes = async (count = { limit: 9 }) => {
  const recipes = [];
  for (let i = 0; i < count.limit; i++) {
    const recipe = await fetchRandomRecipe();
    recipes.push(recipe);
  }
  return recipes;
}  

export const fetchFavoriteRecipes = async (userId: string) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/favorites?sub_id=${import.meta.env.VITE_USER_ID}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": import.meta.env.VITE_API_KEY,
                },
            }
        );
        if (!response.ok) throw new Error("Failed to fetch favourites");
        return await response.json();
    } catch (error) {
        console.error("Error fetching favourites:", error);
        throw error;
    }
}

export const addRecipeToFavorites = async (userId: string, recipe: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/favourites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_API_KEY,
            },
            body: JSON.stringify({
                image_id: imageId,
                sub_id: import.meta.env.VITE_USER_ID,
            }),
        });
        if (!response.ok) throw new Error("Failed to add favorite");
        return await response.json();
    } catch (error) {
        console.error("Error adding favorite:", error);
        throw error;
    }
}

export const removeRecipeFromFavorites = async (userId: string, recipeId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/favourites/${favouriteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_API_KEY,
            },
        });
        if (!response.ok) throw new Error("Failed to remove favorite");
        return response;
    } catch (error) {
        console.error("Error removing favorite:", error);
        throw error;
    }
}