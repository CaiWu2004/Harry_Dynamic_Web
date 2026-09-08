const RecipeInfo = (props) => {
  return (
    <div className="recipe_info">
      <h1 className="recipe_title">{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default RecipeInfo;
