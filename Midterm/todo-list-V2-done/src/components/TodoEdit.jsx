//I want to useState in this so I import it from react
import { useState } from "react";

const TodoEdit = ({ recipe, onSubmit, onDelete }) => {
  const [editedRecipe, setEditedRecipe] = useState({
    title: recipe.title ?? "",
    cookingTime: recipe.cookingTime ?? "",
    ingredients: recipe.ingredients ?? "",
    instructions: recipe.instructions ?? "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditedRecipe((currentRecipe) => ({
      ...currentRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...recipe, ...editedRecipe });
  };

  return (
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
        <button
          type="submit"
          className="rounded-lg bg-[#536333] px-5 py-2 font-semibold text-white"
        >
          Save Changes
        </button>

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
