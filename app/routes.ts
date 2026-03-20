import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("random", "routes/random.tsx"),
  route('meal-recipes', 'routes/meal-recipes.tsx'),
] satisfies RouteConfig;