import { useState } from "react";
import useRecipesContext from "../hooks/use-recipes-context";

//defines the form's starting data
//title, cooking time, ingredients and instructions for the app
const emptyRecipe = {
  title: "",
  cookingTime: "",
  ingredients: "",
  instructions: "",
};

const TodoCreate = () => {
  //calls my custom hook in use-todos-context. the hook reads the
  // value privded by todos which is where this form
  // gets the createRecipe function
  const { createRecipe } = useRecipesContext();
  //gives the component ownership of the recipe being typed.
  // the input value are local form state;
  // the shred collection of saved recipe lives in context
  const [recipe, setRecipe] = useState(emptyRecipe);

  //runs whenever changes are inputed.
  // the inputs name identifies which recipe property to update.
  //the other currentRecipe stays the same and only the one selected changed
  const handleChange = (event) => {
    const { name, value } = event.target;

    setRecipe((currentRecipe) => ({
      ...currentRecipe,
      [name]: value,
    }));
  };
  //runs when the form is submitted. it prevents the browser from relaoding the page.
  //this thanc alls createRecupe(recipe) from context. context calls
  // createRecipeReuqest(recipe) which is the API function in api.js
  //sendS A POST request to the JSON server's endpoint within recipe.
  //if it works context adds the new content and return true. than the form clears itself
  const handleSubmit = async (event) => {
    event.preventDefault();

    const wasSaved = await createRecipe(recipe);

    if (wasSaved) {
      setRecipe(emptyRecipe);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-7"
    >
      <h2 className="mb-5 text-xl font-bold">Add a Recipe</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          {/* value and onCHange make each input contolled. 
          React holds the current 
          value and handleChanges updated it when ever 
          we make changes to it */}
          Recipe Name
          <input
            name="title"
            type="text"
            value={recipe.title}
            onChange={handleChange}
            required
            placeholder="e.g. Spaghetti"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block text-sm font-medium">
          Cooking Time
          <select
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
          >
            <option value="" disabled>
              Choose a Time You Would Like to Take
            </option>
            <option value="under 15 min">Under 15 Minutes</option>
            <option value="15-30 min">15 to 30 Minutes</option>
            <option value="30-60 min">30 to 60 Minutes</option>
            <option value="Over 60 min">Over 60 Minutes</option>
          </select>
        </label>

        <label className="block text-sm font-medium sm:col-span-2">
          Ingredients
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
            rows="3"
            placeholder="List ingredients, separated by commas"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block text-sm font-medium sm:col-span-2">
          Instructions
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
            rows="4"
            placeholder="How do you make it?"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-lg bg-[#536333] px-5 py-3 font-semibold text-white hover:bg-[#414f28] sm:w-auto"
      >
        Save Recipe
      </button>
    </form>
  );
};

export default TodoCreate;
