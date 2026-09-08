// rafce short cut for this
// import PASTA from "../Assets/Vodka_Pasta.jpeg";
import { RECIPE_DATA } from "./recipe-data.js";
import RecipeInfo from "./RecipeInfo.jsx";
import IngredientList from "./IngredientList.jsx";
import RecipeImg from "./RecipeImg.jsx";
import InstructionList from "./InstructionList.jsx";
import Card from "./Card.jsx";

const RecipeCard = () => {
  return (
    <Card>
      <RecipeInfo
        title={RECIPE_DATA.title}
        description={RECIPE_DATA.description}
      />
      <RecipeImg imgSrc={RECIPE_DATA.imgSrc} imgAlt={RECIPE_DATA.imgAlt} />

      <IngredientList ingredients={RECIPE_DATA.ingredients} />

      <InstructionList instructions={RECIPE_DATA.instructions} />
    </Card>
  );
};

export default RecipeCard;
