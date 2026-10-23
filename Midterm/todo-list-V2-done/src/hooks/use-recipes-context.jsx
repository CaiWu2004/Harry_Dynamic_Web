import { useContext } from "react";
import RecipesContext from "../context/recipes";

const useRecipesContext = () => {
  return useContext(RecipesContext);
};

export default useRecipesContext;
