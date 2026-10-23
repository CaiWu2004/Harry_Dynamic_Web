//I want to useState in this so I import it from react
//useState also temporary keep the edits in here until user saves it.
import { useState } from "react";

//recieve data and callbacks from parent
//props expected to be recieves are recipe, onSubmit, onDelete
//this does not connect to the server at all. its the parent that supplies the
// callbacks that connects the shared recioe state and API
const TodoEdit = ({ recipe, onSubmit, onDelete }) => {
  //starts with current value if there something
  // use it if not use an empty string
  //EditedRecipe is the form's local, editable copy.
  // seperated from the saved recipe until form is submitted
  const [editedRecipe, setEditedRecipe] = useState({
    title: recipe.title ?? "",
    cookingTime: recipe.cookingTime ?? "",
    ingredients: recipe.ingredients ?? "",
    instructions: recipe.instructions ?? "",
  });
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
      className="grid gap-4 rounded-xl bg-white p-5"
    >
      <label>
        Recipe Name
        <input
          name="title"
          value={editedRecipe.title}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </label>
      <label>
        Cooking Time
        <select
          name="cookingTime"
          value={editedRecipe.cookingTime}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        >
          <option value="" disabled>
            Choose a cooking time{" "}
          </option>
          <option value="under 15 min">Under 15 Minutes</option>
          <option value="15-30 min">15 to 30 Minutes</option>
          <option value="30-60 min">30 to 60 Minutes</option>
          <option value="Over 60 min">Over 60 Minutes</option>
        </select>
      </label>
      <label>
        Ingredients
        <textarea
          name="ingredients"
          value={editedRecipe.ingredients}
          onChange={handleChange}
          required
          rows="3"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </label>
      <label>
        Instructions
        <textarea
          name="instructions"
          value={editedRecipe.instructions}
          onChange={handleChange}
          required
          rows="4"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
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

export default TodoEdit;
