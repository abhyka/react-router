import { addToFavorites } from "../services/recipesApi";

export const clientAction = async({request}) => {
  const formData = await request.formData();
  const recipeId = formData.get("recipeId");
  await addToFavorites(recipeId);
}