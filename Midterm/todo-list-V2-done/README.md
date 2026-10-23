# Recipe Library

## What this app is for

This App is used for recording and organising recipes you like and would be interested in making. You would basiclly input or submit a form with the recipe name, ingreditents, steps, and time and it will be save into the library which you can access anytime.

## User story

As a college student that lives on campus and someone who have a hard time deciding what to eat, I want to create an app that allows me to store all recipes I like or found in one place. So that is why I created this Recipe Library App which is meant to hold and save all recipes I found.

## How to run it

For this app to actually work so far I would need to:

1.  "npm run server" on one terminal;
2.  "npm run dev" on another sperare terminal

## Developer CheckList

- [ ] change the app's wording and design from a todo list to a recipe library.
- [ ] store the recipes in db.json under a recipe collection.
- [ ] update the API function in api.js to fetch, create, edit, and delete recipes instead of todos
- [ ] Make sure my create request sends all four fields: title, cooking time, ingredients, and instructions
- [ ] update the context in todos.jsx to manage the apps loading and error control
- [ ] build a controlled create and edit form. This includes value, onChange as well as buttons, forms, textareas, and options
- [ ] Be able to display the recipe and its four fields such as title, cooking time, ingredients, instructions
- [ ] Add/Create a searching function/filter to allow me to search for recipes and filter it out through ingredients, or name
- [ ] check out the app while in phone width
- [ ] Make sure to actually do the README.md and go back to it to make sure I am completing everything and not missing it out
- [ ] Additionals: I hope to create a libray page where all saved recipes will appear on the library page instead of on the same page as the forms. Maybe I can turn the form in to a hamburger menu and the page is a library with a navbar on top?
- [ ] I also hope to change the display of the recipes. I saw an app before where you can save a novel or game or someting and it would appear as a book on a shelve or a game cartiage/container.
- [ ] Use what was learned on thursday in my app such as the different types of forms, restrictions, etc.
- [ ] Add a picture feature so that an image of the dish can appear when hovered?
- [ ] If there is time maybe add a drag and drop option where I can drag and drop a recipe, website, or file into the app and it will save it.

## Revised checklist: what the work actually took

- [x] change the app's wording and design from a todo list to a recipe library.
- [x] store the recipes in `db.json` under a `recipe` collection.
- [x] update the API function in api.js to fetch, create, edit, and delete recipes instead of todos
- [x] Make sure my create request sends all four fields: title, cooking time, ingredients, and instructions
- [x] update the context in todos.jsx to manage the apps loading and error control
- [x] build a controlled create and edit form. This includes value, onChange as well as buttons, forms, textareas, and options
- [x] Be able to display the recipe and its four fields such as title, cooking time, ingredients, instructions
- [x] Add/Create a searching function/filter to allow me to search for recipes and filter it out through ingredients, or name
- [x] check out the app while in phone width
- [x] Make sure to actually do the README.md and go back to it to make sure I am completing everything and not missing it out
- [ ] Additionals: I hope to create a libray page where all saved recipes will appear on the library page instead of on the same page as the forms. Maybe I can turn the form in to a hamburger menu and the page is a library with a navbar on top?
- [ ] I also hope to change the display of the recipes. I saw an app before where you can save a novel or game or someting and it would appear as a book on a shelve or a game cartiage/container.
- [x] Use what was learned on thursday in my app such as the different types of forms, restrictions, etc.
- [ ] Add a picture feature so that an image of the dish can appear when hovered?
- [ ] If there is time maybe add a drag and drop option where I can drag and drop a recipe, website, or file into the app and it will save it.

## What I had missed:

## Why I Choose Context:

I choose context because my recipes saved data and actions such as edit, save, delete, are needed in different parts of the app. Context allows me to create them in one place and my costum hook than allow other componets to assess them and use it with out a long process. The form fields still uses only local components because those values only matter while I'm actually filling the form out or editing a recipe.

## What I would add with another week:
