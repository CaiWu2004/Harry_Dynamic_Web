import { createContext, useState, useCallback } from "react";
import {
  fetchRecipes as fetchRecipesRequest,
  createRecipe as createRecipeRequest,
  deleteRecipe as deleteRecipeRequest,
  updateRecipe as updateRecipeRequest,
} from "../api";

const RecipesContext = createContext();

const Provider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    try {
      const savedRecipes = await fetchRecipesRequest();
      setRecipes(savedRecipes);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Could not reach the server. Is `npm run server` running?");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createRecipe = async (recipe) => {
    try {
      const savedRecipe = await createRecipeRequest(recipe);
      setRecipes((currentRecipes) => [...currentRecipes, savedRecipe]);
      setError(null);
      return true;
    } catch (err) {
      console.error(err);
      setError("Could not save the recipe. Please try again.");
      return false;
    }
  };

  const deleteRecipeById = async (id) => {
    try {
      await deleteRecipeRequest(id);
      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe.id !== id),
      );
      setError(null);
      return true;
    } catch (err) {
      console.error(err);
      setError("Could not delete the recipe. Try again.");
      return false;
    }
  };

  const editRecipeById = async (recipe) => {
    try {
      const savedRecipe = await updateRecipeRequest(recipe);
      setRecipes((currentRecipes) =>
        currentRecipes.map((currentRecipe) =>
          currentRecipe.id === savedRecipe.id ? savedRecipe : currentRecipe,
        ),
      );
      setError(null);
      return true;
    } catch (err) {
      console.error(err);
      setError("Could not update the recipe. Please try again.");
      return false;
    }
  };

  const value = {
    recipes,
    isLoading,
    error,
    fetchRecipes,
    createRecipe,
    deleteRecipeById,
    editRecipeById,
  };

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
};

export { Provider };
export default RecipesContext;
