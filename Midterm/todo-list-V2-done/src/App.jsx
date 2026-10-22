import { useState, useEffect } from "react";
import TodoCreate from "./components/TodoCreate";
//imports stuff from our custom hook such as recipes and fetchRecipes
import useRecipesContext from "./hooks/use-todos-context";

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
        <h1 className="text-3xl font-bold sm:text-4xl">Recipe Library</h1>
        <p className="mt-2 text-gray-600">
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
          <div className="grid gap-4 sm:grid-cols-2">
            {/* turn each matching recipe into a card. And key={recipe.id} helps React track cards as the list changes */}
            {/* basically takes the store recipes and create an article card for it so we can see each recipe individually */}
            {matchingRecipes.map((recipe) => (
              <article
                key={recipe.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-xl font-bold">{recipe.title}</h3>
                <p className="mt-1 text-sm font-medium text-green-800">
                  {recipe.cookingTime || "Cooking Time Not Set"}
                </p>
                <h4 className="mt-4 font-semibold">Ingredients</h4>
                <p className="whitespace-pre-wrap text-gray-700">
                  {recipe.ingredients}
                </p>

                <h4 className="mt-4 font-semibold">Instructions</h4>
                <p className="whitespace-pre-wrap text-gray-700">
                  {recipe.instructions}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
