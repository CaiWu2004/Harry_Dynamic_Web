import { useContext } from "react";
import RecipesContext from "../context/todos";

const useRecipesContext = () => {
  return useContext(RecipesContext);
};

export default useRecipesContext;
