import { RECIPE_DATA } from "./recipe-data.js";

const RecipeInfo = () => {
  return (
    <div>
      <h1>{RECIPE_DATA.title}</h1>
      <p>{RECIPE_DATA.description}</p>
      <ul></ul>
    </div>
  );
};

export default RecipeInfo;
