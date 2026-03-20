import { addToFavorites } from "../services/recipeAPI";

export const clientAction = async ({ request }) => {
  const formData = await request.formData();
  const imageId = formData.get("imageId");
  const imageUrl = formData.get("imageUrl");

  if (typeof imageId !== "string" || imageId.length === 0) {
    return null;
  }

  await addToFavorites(
    imageId,
    typeof imageUrl === "string" ? imageUrl : ""
  );

  return null;
};