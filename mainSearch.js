import { recipes } from "./assets/data/recipes.js";
import { initializeDropdowns } from "./Filter/dropDown.js";
import { displayRecipes } from "./RecipeCard/displayRecipe.js";
import { previousTagCheck, setupDropdownHandlers } from "./main.js"

// export function mainSearchRecipes(query, recipes) {
//     console.log('searchRecipes called with:', { query, recipes });
//     // Ensure the query is a string
    
//     query = query.toLowerCase();
//     console.log('Converted query to lowercase:', query);

//     return recipes.filter(recipe => {
//         const nameMatch = recipe.name.toLowerCase().includes(query);
//         const ingredientMatch = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(query));
//         const descriptionMatch = recipe.description.toLowerCase().includes(query);

//         return nameMatch || ingredientMatch || descriptionMatch;
//     });
// }

export function mainSearchRecipes(query, recipes) {
    console.log('searchRecipes called with:', { query, recipes });

    // Ensure the query is a string
    query = query.toLowerCase();
    console.log('Converted query to lowercase:', query);

    // Initialize an array to hold the matching recipes
    const matchingRecipes = [];

    // Iterate through the recipes array
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        
        const nameMatch = recipe.name.toLowerCase().indexOf(query) !== -1;
        const ingredientMatch = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().indexOf(query) !== -1);
        const descriptionMatch = recipe.description.toLowerCase().indexOf(query) !== -1;

        // If any of the conditions match, add the recipe to the matchingRecipes array
        if (nameMatch || ingredientMatch || descriptionMatch) {
            matchingRecipes.push(recipe);
        }
    }

    return matchingRecipes;
}



// lancer la fonction filterRecipes avec parametre (tableau de tags + Recipes){}
export function filterRecipes() {
    var selectedTags = Array.from(
      document.querySelectorAll(".selected-tag-item")
    ).map((tag) => tag.textContent.toLowerCase());
    console.log(selectedTags);
    var filteredRecipes = recipes.filter((recipe) => {
      return selectedTags.every((tag) => {
        const ingredientMatch = recipe.ingredients.some((ing) => ing.ingredient.toLowerCase().includes(tag));
        const applianceMatch = recipe.appliance.toLowerCase().includes(tag);
        const utensilMatch = recipe.ustensils.some((ut) => ut.toLowerCase().includes(tag));
  
        return ingredientMatch || applianceMatch || utensilMatch;
      });
    });
    console.log("Filtered Recipes:", filteredRecipes);
    displayRecipes(filteredRecipes);
    previousTagCheck(filteredRecipes);
    initializeDropdowns(filteredRecipes); /// build a comparaison function to adjust a given parameter here.
    setupDropdownHandlers(filteredRecipes);
  }