const RecipeImg = (props) => {
  const { imgSrc, imgAlt } = props;
  return <img className="img" src={imgSrc} alt={imgAlt} />;
};

export default RecipeImg;
