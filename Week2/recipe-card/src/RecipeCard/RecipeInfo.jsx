import styles from "./RecipeCard.module.css";

const RecipeInfo = (props) => {
  return (
    <div className={styles.recipe_info}>
      <h1 className={styles.recipe_title}>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default RecipeInfo;
