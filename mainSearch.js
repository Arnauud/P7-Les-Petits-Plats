// JS BEN.CH //
// https://jsben.ch/OGtyE

import { initializeDropdowns } from "./Filter/dropDown.js";
import { displayRecipes } from "./RecipeCard/displayRecipe.js";
import { previousTagCheck, setupDropdownHandlers } from "./main.js"

////////////////////////////////////
///////// ARRAY FUNCTION ///////////
////////////////////////////////////

export function mainSearchRecipes(query, recipes) {
  console.log('searchRecipes called with:', { query, recipes });

  // Ensure the query is a string and convert it to lowercase
  query = query.toLowerCase();
  console.log('Converted query to lowercase:', query);

  // Use the .filter() method to find all matching recipes
  const matchingRecipes = recipes.filter(recipe => {
      const nameMatch = recipe.name.toLowerCase().indexOf(query) !== -1;
      const descriptionMatch = recipe.description.toLowerCase().indexOf(query) !== -1;

      // Use .some() to check if any ingredient matches the query
      const ingredientMatch = recipe.ingredients.some(ing => 
          ing.ingredient.toLowerCase().indexOf(query) !== -1
      );

      // Return true if any match is found (name, description, or ingredient)
      return nameMatch || ingredientMatch || descriptionMatch;
  });

  return matchingRecipes;
}


////////////////////////////////////////////////////////////////////////////
////////////////////////////// FILTER RECIPES //////////////////////////////
////////////////////////////////////////////////////////////////////////////
export function filterRecipes(mainRecipe) {
    var selectedTags = Array.from(
      document.querySelectorAll(".selected-tag-item")
    ).map((tag) => tag.textContent.toLowerCase());
    console.log(mainRecipe);
    var filteredRecipes = mainRecipe.filter((recipe) => {
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