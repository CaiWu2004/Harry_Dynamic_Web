import axios from "axios";

const BASE = "http://localhost:3001";

//sends a GET request to /recipes and returns the saved recipe
export const fetchRecipes = async () => {
  const response = await axios.get(`${BASE}/recipes`);
  return response.data;
};

//sends a POST request with the full recpie object. That includes:
//title, cookingTime, ingredients, instructions
export const createRecipe = async (recipe) => {
  // every new todo starts not done, so the field exists from the beginning
  const response = await axios.post(`${BASE}/recipes`, recipe);
  return response.data;
};
//deletes recipe from db.json
export const deleteRecipe = async (id) => {
  await axios.delete(`${BASE}/recipes/${id}`);
};
//if changs are made: sends a PUT request with the entire edited recipe. PUT replaces the recipe
export const updateRecipe = async (recipe) => {
  // PUT REPLACES the record. Send the whole todo, not just the bit that
  // changed, or everything else on it is gone.
  const response = await axios.put(`${BASE}/recipes/${recipe.id}`, recipe);
  return response.data;
};

//this is gone because recipes don't need a todo-style completed checkbox
// export const toggleTodo = async (id, done) => {
//   // PATCH, not PUT: we are changing ONE field and leaving the rest alone.
//   // PUT would need the whole todo; PATCH merges what we send into what is
//   // already there.
//   const response = await axios.patch(`${BASE}/todos/${id}`, {done})
//   return response.data
// }
