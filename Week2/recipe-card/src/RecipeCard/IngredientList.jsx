const IngredientList = (props) => {
  const { ingredients } = props;
  return (
    <>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>;
        })}
      </ul>
    </>
  );
};

export default IngredientList;
