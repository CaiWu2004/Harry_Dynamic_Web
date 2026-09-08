import { RECIPE_DATA } from "./recipe-data";

const RecipeImg = (props) => {
  const { imgSrc, imgAlt } = props;
  return <img src={imgSrc} alt={imgAlt} />;
};

export default RecipeImg;
