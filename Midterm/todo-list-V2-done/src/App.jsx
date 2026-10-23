import { useState, useEffect } from "react";
import TodoCreate from "./components/CreateRecipe";
import TodoList from "./components/RecipeList";
//imports stuff from our custom hook such as recipes and fetchRecipes
import useRecipesContext from "./hooks/use-recipes-context";

const App = () => {
  const { recipes, isLoading, error, fetchRecipes } = useRecipesContext();
  const [search, setSearch] = useState("");

  //loads saved recipes when the App first appears
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  //search is a local state because it only controls this screen's search box
  const searchText = search.trim().toLowerCase();

  //takes our search and filter through
  // all the store recipe by title, ingredients, etc and bring out the one that matches
  //It also shows the errors etc as needed
  const matchingRecipes = recipes.filter((recipe) => {
    const title = String(recipe.title ?? "").toLowerCase();
    const ingredients = String(recipe.ingredients ?? "").toLowerCase();

    return title.includes(searchText) || ingredients.includes(searchText);
  });

  return (
    <main>
      <header className="mb-8">
        <h1 className="ml-2 text-3xl font-bold sm:text-4xl">Recipe Library</h1>
        <p className="ml-2 mt-2 text-gray-600">
          Save Your favorite Recipes and Find Something to Cook.
        </p>
      </header>

      <TodoCreate />

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Your Recipes</h2>

        <label className="mb-6 block">
          <span className="sr-only">Search Recipes</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Recipes or Ingredients"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </label>

        {/* the loading and the error message/control */}
        {isLoading ? (
          <p className="text-gray-600">Loading Recipes...</p>
        ) : error ? (
          <p role="alert" className="rounded bg-red-50 p-3 text-red-700">
            {error}
          </p>
        ) : recipes.length === 0 ? (
          <p className="rounded-lg bg-gray-100 p-5 text-gray-600">
            No Recipes yet. Add your first recipe above.
          </p>
        ) : matchingRecipes.length === 0 ? (
          <p>No recipes match "{search}". Try Again</p>
        ) : (
          <TodoList recipes={matchingRecipes} />
        )}
      </section>
    </main>
  );
};

export default App;
