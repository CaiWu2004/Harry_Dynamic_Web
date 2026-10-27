//I want to useState in this so I import it from react
//useState also temporary keep the edits in here until user saves it.
import { useState } from "react";

//recieve data and callbacks from parent
//props expected to be recieves are recipe, onSubmit, onDelete
//this does not connect to the server at all. its the parent that supplies the
// callbacks that connects the shared recioe state and API

//recieve three items from RecipeItems.jsx
const RecipeEdit = ({ recipe, onSubmit, onDelete }) => {
  //starts with current value if there something
  // use it if not use an empty string
  //EditedRecipe is the form's local, editable copy.
  // seperated from the saved recipe until form is submitted
  //It doesn't contatc server, it calls the callback from its parent
  //local form state
  const [editedRecipe, setEditedRecipe] = useState({
    //editedRecipe holds the current form values. starts with
    // saved recipes value's. When theres a
    // change this value gets updated and redrawn
    title: recipe.title ?? "",
    cookingTime: recipe.cookingTime ?? "",
    ingredients: recipe.ingredients ?? "",
    instructions: recipe.instructions ?? "",
  });

  //bookform validation from week08 B:
  //touch tracks which fields the user has
  // left or whether the form has been submitted.
  // it controls when calidation messages appear
  const [touched, setTouched] = useState({});

  const errors = {};
  if (!editedRecipe.title.trim()) {
    errors.title = "Enter a recipe name.";
  }
  if (!editedRecipe.cookingTime) {
    errors.cookingTime = "Choose a cooking time.";
  }
  if (!editedRecipe.ingredients.trim()) {
    errors.ingredients = "Enter the recipe ingredients.";
  }
  if (!editedRecipe.instructions.trim()) {
    errors.instructions = "Enter the recipe instructions.";
  }

  const showError = (field) => touched[field] && errors[field];

  const handleBlur = (event) => {
    setTouched((currentTouched) => ({
      ...currentTouched,
      [event.target.name]: true,
    }));
  };

  const fieldClass = (field) => {
    const base = "mt-1 w-full rounded-lg border px-3 py-2";
    return showError(field)
      ? `${base} border-red-500 bg-red-50`
      : `${base} border-gray-300`;
  };

  //each field has a name or identity
  //when user change something event.target is what they change
  //the handler reads the field's name and
  // new value and setEditedRecipe copies
  //  the existing form data and updates only that
  // named property
  const handleChange = (event) => {
    const { name, value } = event.target;
    //the ...currentRecipe preserves the other fields such as title, instructions etc.
    setEditedRecipe((currentRecipe) => ({
      ...currentRecipe,
      [name]: value,
    }));
  };

  // the onSubmit calls this handler and
  // the preventDefault prevent the page from reloading
  const handleSubmit = (event) => {
    event.preventDefault();

    // validate all fields
    setTouched({
      title: true,
      cookingTime: true,
      ingredients: true,
      instructions: true,
    });

    if (Object.keys(errors).length > 0) {
      return;
    }
    // the onSubmit recieve an object containing
    // the original recipe-including its id
    // with the edited fields copied over

    //only works if the parent provides an onSubmit prop wired to editRecipeById
    //Save Button -> handleSubmit ->
    // parent's onSubmit -> Context's editRecipe ->
    // API's updatedRecipe -> PUT/recipes/{id}
    onSubmit({ ...recipe, ...editedRecipe });
  };

  return (
    //this is the form we are making the save, edits, etc.
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-4 rounded-xl bg-white p-5"
    >
      <label htmlFor={`recipe-title-${recipe.id}`}>
        Recipe Name
        <input
          id={`recipe-title-${recipe.id}`}
          name="title"
          value={editedRecipe.title}
          onChange={handleChange}
          onBlur={handleBlur}
          // required
          aria-invalid={showError("title") ? true : undefined}
          aria-describedby={showError("title") ? "title-error" : undefined}
          className={fieldClass("title")}
        />
        {showError("title") && (
          <p id="title-error" className="mt-1 text-sm text-red-700">
            {errors.title}
          </p>
        )}
      </label>
      <label htmlFor={`recipe-cooking-time-${recipe.id}`}>
        Cooking Time
        <select
          id={`recipe-cooking-time-${recipe.id}`}
          name="cookingTime"
          value={editedRecipe.cookingTime}
          onChange={handleChange}
          onBlur={handleBlur}
          // required
          aria-invalid={showError("cookingTime") ? true : undefined}
          aria-describedby={
            showError("cookingTime") ? "cookingTime-error" : undefined
          }
          className={fieldClass("cookingTime")}
        >
          <option value="" disabled>
            Choose a cooking time{" "}
          </option>
          <option value="under 15 min">Under 15 Minutes</option>
          <option value="15-30 min">15 to 30 Minutes</option>
          <option value="30-60 min">30 to 60 Minutes</option>
          <option value="Over 60 min">Over 60 Minutes</option>
        </select>
        {showError("cookingTime") && (
          <p id="cookingTime-error" className="mt-1 text-sm text-red-700">
            {errors.cookingTime}
          </p>
        )}
      </label>
      <label htmlFor={`recipe-ingredients-${recipe.id}`}>
        Ingredients
        <textarea
          id={`recipe-ingredients-${recipe.id}`}
          name="ingredients"
          value={editedRecipe.ingredients}
          onChange={handleChange}
          onBlur={handleBlur}
          // required
          aria-invalid={showError("ingredients") ? true : undefined}
          aria-describedby={
            showError("ingredients") ? "ingredients-error" : undefined
          }
          rows="3"
          className={fieldClass("ingredients")}
        />
        {showError("ingredients") && (
          <p id="ingredients-error" className="mt-1 text-sm text-red-700">
            {errors.ingredients}
          </p>
        )}
      </label>
      <label htmlFor={`recipe-instructions-${recipe.id}`}>
        Instructions
        <textarea
          id={`recipe-instructions-${recipe.id}`}
          name="instructions"
          value={editedRecipe.instructions}
          onChange={handleChange}
          // required
          aria-invalid={showError("instructions") ? true : undefined}
          aria-describedby={
            showError("instructions") ? "instructions-error" : undefined
          }
          rows="4"
          className={fieldClass("instructions")}
        />
        {showError("instructions") && (
          <p id="instructions-error" className="mt-1 text-sm text-red-700">
            {errors.instructions}
          </p>
        )}
      </label>
      <div className="flex gap-3">
        {/* submits the form */}
        <button
          type="submit"
          className="rounded-lg bg-[#536333] px-5 py-2 font-semibold text-white"
        >
          Save Changes
        </button>
        {/* delete button is type=button prevents it 
from submitting 
the form. clicking it calls onDelete with the 
recipe's id */}
        <button
          type="button"
          onClick={() => onDelete(recipe.id)}
          className="rounded-lg border border-red-300 px-5 py-2  text-red-700"
        >
          Delete Recipe
        </button>
      </div>
    </form>
  );
};

export default RecipeEdit;
