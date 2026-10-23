import TodoItem from "./RecipeItems";

const TodoList = ({ recipes }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {recipes.map((recipe) => (
        <TodoItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default TodoList;
