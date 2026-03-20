
const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const FAVORITES_STORAGE_KEY = "favoriteRecipes";

type FavoriteRecipe = {
    id: string;
    image_id: string;
    image: {
        id: string;
        url: string;
    };
    created_at: string;
};

const readFavorites = (): FavoriteRecipe[] => {
    if (typeof window === "undefined") {
        return [];
    }

    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeFavorites = (favorites: FavoriteRecipe[]) => {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
};

const makeFavoriteId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }

    return `${Date.now()}`;
};

export const fetchRandomRecipe = async () => {
    const response = await fetch(`${API_BASE_URL}random.php`);
    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();
    return data.meals[0];
};

export const fetchRecipeById = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}lookup.php?i=${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();
    return data.meals[0];
};

export const fetchRecipesBySearch = async (query: string) => {
    const response = await fetch(`${API_BASE_URL}search.php?s=${query}`);
    if (!response.ok) {
        throw new Error("Failed to search recipes");
    }
    const data = await response.json();
    return data.meals || [];
};

export const fetchRandomRecipes = async (count = { limit: 9 }) => {
    const recipes = [];
    for (let i = 0; i < count.limit; i++) {
        const recipe = await fetchRandomRecipe();
        recipes.push(recipe);
    }
    return recipes;
};

export const fetchFavoriteRecipes = async () => {
    return readFavorites();
};

export const addToFavorites = async (imageId: string, imageUrl = "") => {
    const favorites = readFavorites();
    const alreadyExists = favorites.some((favorite) => favorite.image_id === imageId);

    if (alreadyExists) {
        return favorites;
    }

    const nextFavorites: FavoriteRecipe[] = [
        {
            id: makeFavoriteId(),
            image_id: imageId,
            image: {
                id: imageId,
                url: imageUrl,
            },
            created_at: new Date().toISOString(),
        },
        ...favorites,
    ];

    writeFavorites(nextFavorites);
    return nextFavorites;
};

export const addRecipeToFavorites = async (_userId: string, recipe: { id: string; url?: string }) => {
    return addToFavorites(recipe.id, recipe.url ?? "");
};

export const removeRecipeFromFavorites = async (favoriteId: string) => {
    const favorites = readFavorites();
    const nextFavorites = favorites.filter(
        (favorite) => favorite.id !== favoriteId && favorite.image_id !== favoriteId
    );

    writeFavorites(nextFavorites);
    return nextFavorites;
};