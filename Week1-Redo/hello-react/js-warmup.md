<!-- 1. Arrow Functions -->

function double(n) {
return n \* 2
}

const double = (n) => n \* 2

<!-- Arrow function -->

function shout(word) {
return word.toUpperCase() \* '!'
}

const shout = (word) => word.toUpperCase + '!"

<!-- 2. Destructuring -->

const recipe = {title: 'Pancakes', servings: 4}

<!-- long way -->

const title = recipe.title

<!-- destructureing -->

const {title, servings} = recipe

cosnt user = {name: 'Ada', role: 'adamin'}

const {name, role} = user

<!-- 3. Template Literals -->

const name = 'Ada'
const greeting = `Hello, ${name}! You have ${2 + 3} messages`

const serving = `${title}, serves, ${servings}.`

<!-- .map() -->
