// rafce short cut for this
// import PASTA from "../Assets/Vodka_Pasta.jpeg";

import RecipeInfo from "./RecipeInfo.jsx";
import IngredientList from "./IngredientList.jsx";
import RecipeImg from "./RecipeImg.jsx";
import InstructionList from "./InstructionList.jsx";
import Card from "./Card.jsx";

import { RECIPE_DATA } from "./recipe-data.js";

import styles from "./RecipeCard.module.css";

import UserRating from "./UserRating.jsx";

const RecipeCard = () => {
  return (
    <Card>
      <div className={styles.card_text}>
        <RecipeInfo
          title={RECIPE_DATA.title}
          description={RECIPE_DATA.description}
        />
        <RecipeImg imgSrc={RECIPE_DATA.imgSrc} imgAlt={RECIPE_DATA.imgAlt} />
        <div className={styles.card_lists}>
          <IngredientList ingredients={RECIPE_DATA.ingredients} />
          <InstructionList instructions={RECIPE_DATA.instructions} />
        </div>
        <UserRating />
      </div>
    </Card>
  );
};

export default RecipeCard;
