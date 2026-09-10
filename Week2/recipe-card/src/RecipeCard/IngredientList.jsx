import styles from "./RecipeCard.module.css";

const IngredientList = (props) => {
  const { ingredients } = props;
  return (
    <div className={styles.ingredient_list}>
      <h3 className={styles.list_title}>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => {
          return (
            <li key={index} className={styles.list_item}>
              <span className={styles.measure}>{ingredient.measure}</span>{" "}
              <span>{ingredient.item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientList;
