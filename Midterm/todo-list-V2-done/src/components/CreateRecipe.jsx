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

  //track wheather the user has tried to submit
  const [hasSubmitted, setHasSubmitted] = useState(false);

  //runs whenever changes are inputed.
  // the inputs name identifies which recipe property to update.
  //the other currentRecipe stays the same and only the one selected changed
  //new handle submit
  const handleChange = (event) => {
    const { name, value } = event.target;

    setRecipe((currentRecipe) => ({
      ...currentRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setHasSubmitted(true);

    const isInvalid =
      !recipe.title.trim() ||
      !recipe.cookingTime ||
      !recipe.ingredients.trim() ||
      !recipe.instructions.trim();

    if (isInvalid) {
      return;
    }

    const wasSaved = await createRecipe({
      ...recipe,
      title: recipe.title.trim(),
    });

    if (wasSaved) {
      setRecipe(emptyRecipe);
      setHasSubmitted(false);
    }
  };

  const errors = {
    title: hasSubmitted && !recipe.title.trim(),
    cookingTime: hasSubmitted && !recipe.cookingTime,
    ingredients: hasSubmitted && !recipe.ingredients.trim(),
    instructions: hasSubmitted && !recipe.instructions.trim(),
  };

  //runs when the form is submitted. it prevents the browser from relaoding the page.
  //this thanc alls createRecupe(recipe) from context. context calls
  // createRecipeReuqest(recipe) which is the API function in api.js
  //sendS A POST request to the JSON server's endpoint within recipe.
  //if it works context adds the new content and return true. than the form clears itself
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const wasSaved = await createRecipe(recipe);

  //   if (wasSaved) {
  //     setRecipe(emptyRecipe);
  //   }
  // };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-7"
    >
      <h2 className="mb-5 text-xl font-bold">Add a Recipe</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="recipe-title" className="block text-sm font-medium">
            {/* value and onCHange make each input contolled. 
          React holds the current 
          value and handleChanges updated it when ever 
          we make changes to it */}
            Recipe Name
          </label>
          <input
            id="recipe-title"
            name="title"
            type="text"
            value={recipe.title}
            onChange={handleChange}
            aria-invalid={errors.title || undefined}
            aria-describedby={errors.title ? "recipe-title-error" : undefined}
            placeholder="e.g. Spaghetti"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {errors.title && (
            <p id="recipe-title-error" className="mt-1 text-sm text-red-700">
              Enter a recipe name.
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="recipe-cooking-time"
            className="block text-sm font-medium"
          >
            Cooking Time
          </label>
          <select
            id="recipe-cooking-time"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            aria-invalid={errors.cookingTime || undefined}
            aria-describedby={
              errors.cookingTime ? "recipe-cooking-time-error" : undefined
            }
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
          {errors.cookingTime && (
            <p
              id="recipe-cooking-time-error"
              className="mt-1 text-sm text-red-700"
            >
              Choose a cooking time.
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="recipe-ingredients"
            className="block text-sm font-medium sm:col-span-2"
          >
            Ingredients
          </label>
          <textarea
            id="recipe-ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            aria-invalid={errors.ingredients || undefined}
            aria-describedby={
              errors.ingredients ? "recipe-ingredients-error" : undefined
            }
            rows="3"
            placeholder="List ingredients, separated by commas"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {errors.ingredients && (
            <p
              id="recipe-ingredients-error"
              className="mt-1 text-sm text-red-700"
            >
              Enter the recipe ingredients.
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="recipe-instructions"
            className="block text-sm font-medium sm:col-span-2"
          >
            Instructions
          </label>
          <textarea
            id="recipe-instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            aria-invalid={errors.instructions || undefined}
            aria-describedby={
              errors.instructions ? "recipe-instructions-error" : undefined
            }
            rows="4"
            placeholder="How do you make it?"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {errors.instructions && (
            <p
              id="recipe-instructions-error"
              className="mt-1 text-sm text-red-700"
            >
              Enter the recipe instructions
            </p>
          )}
        </div>
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
