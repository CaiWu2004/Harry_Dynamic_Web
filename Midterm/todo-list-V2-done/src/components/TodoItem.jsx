//track whether this recipe card shows its normal view or edited one
import { useState } from "react";
//the form displayed why editing
import TodoEdit from "./TodoEdit";
//read the shared recipe actions from context
import useRecipesContext from "../hooks/use-todos-context";

//recipe is passed in by the component that renders
// this item, the APP, while it maps over the recipes.
// The hook gets the edit and delete fucntions
// from the context provider
const TodoItem = ({ recipe }) => {
  const { deleteRecipeById, editRecipeById } = useRecipesContext();
  //this state belongs here only, in this one card, it starts as false so the recipe
  // display appears firest. Clicking edit changes
  // it to be true, which than display the edit form instead
  const [showEdit, setShowEdit] = useState(false);

  //recives the edited recipe from TodoEdit.
  //saved in TodoEdit -> handleSubmit here -> Context's editRecipeById -> API's updatedRecipe => server's PUT/recipes/{id}
  //Context function return true when saving is succeeds than setShowEdit switches it to true
  const handleSubmit = async (editedRecipe) => {
    const wasSaved = await editRecipeById(editedRecipe);

    if (wasSaved) {
      setShowEdit(false);
    }
  };

  //recives the recipe ID and calls the Context delete functions.
  const handleDelete = async (id) => {
    await deleteRecipeById(id);
  };
  //choosing between the form and the recipe display
  //when editing, this renders TodoEdit and passes it three props: recipe, onSubmit, onDelete
  //these props let the form report user actions back to its parent without directly accessig the server

  //if showEdit is false the component renders an
  // article with the recipes name, cooking time,
  // ingredients, and instructions. Tailwind
  // classes styles it.
  if (showEdit) {
    return (
      <TodoEdit
        recipe={recipe}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-xl font-bold">{recipe.title}</h3>
      <p className="mt-1 text-sm font-medium text-green-800">
        {recipe.cookingTime || "Cooking Time Not Set."}
      </p>

      <h4 className="mt-4 font-semibold">Ingredients</h4>
      <p className="whitespace-pre-wrap text-gray-700">{recipe.ingredients}</p>

      <h4 className="mt-4 font-semibold">Instructions</h4>
      <p className="whitespace-pre-wrap text-gray-700">{recipe.instructions}</p>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => setShowEdit(true)}
          className="rounded-lg bg-[#536333] px-4 py-2 font-semibold text-white"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => handleDelete(recipe.id)}
          className="rounded-lg border border-red-300 px-4 py-2  text-red-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default TodoItem;
