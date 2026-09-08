const IngredientList = (props) => {
  const { ingredients } = props;
  return (
    <div className="ingredient_list">
      <h3 className="list_title">Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => {
          return (
            <li key={index} className="list-item">
              <span className="measure">{ingredient.measure}</span>{" "}
              <span>{ingredient.item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientList;
