// these two do the same thing
// arrow functions
function shout(word) {
  return word.toUpperCase() + "!";
}

const shout = (word) => {
  return word.toUpperCase() + "!";
};

const shout = (word) => word.toUpperCase() + "!";

// Destructuring
const user = { name: "Ada", role: "admin" };

const { name, title } = user;

// Template literals
const recipe = { title: "Pancakes", servings: 4 };
// "Pancakes serves 4" recipe.title + ' serves ' + recipe.servings + '.'
const literal = `${recipe.title} serves ${recipe.servings}.`;

// .map()

const ingredients = ["butter", "eggs", "milk"];

const INGREDIENTS = ingredients.map((ingredient) => {
  return ingredient.toUpperCase();
});

const INGREDIENT = ingredients.map((ingredient) => ingredient.toUpperCase());

// Spread

// Ternary and &&
