// JS BEN.CH //
// https://jsben.ch/OGtyE

// import { recipes } from "./assets/data/recipes.js";
import { initializeDropdowns } from "./Filter/dropDown.js";
import { displayRecipes } from "./RecipeCard/displayRecipe.js";
import { previousTagCheck, setupDropdownHandlers } from "./main.js"



// export function mainSearchRecipes(query, recipes) {
//     console.log('searchRecipes called with:', { query, recipes });

//     // Ensure the query is a string
//     query = query.toLowerCase();
//     console.log('Converted query to lowercase:', query);

//     // Initialize an array to hold the matching recipes
//     let matchingRecipes = [];

//     // Iterate through the recipes array
//     for (let i = 0; i < recipes.length; i++) {
//         const recipe = recipes[i];
//         let nameMatch = false;
//         let ingredientMatch = false;
//         let descriptionMatch = false;

//         // Check if the recipe name contains the query
//         let j = 0;
//         while (j < recipe.name.length) {
//             if (recipe.name.toLowerCase().substring(j, j + query.length) === query) {
//                 nameMatch = true;
//                 break;
//             }
//             j++;
//         }

//         // Check if any ingredient contains the query
//         j = 0;
//         while (j < recipe.ingredients.length) {
//             let ingredient = recipe.ingredients[j].ingredient.toLowerCase();
//             let k = 0;
//             while (k < ingredient.length) {
//                 if (ingredient.substring(k, k + query.length) === query) {
//                     ingredientMatch = true;
//                     break;
//                 }
//                 k++;
//             }
//             if (ingredientMatch) break;
//             j++;
//         }

//         // Check if the recipe description contains the query
//         j = 0;
//         while (j < recipe.description.length) {
//             if (recipe.description.toLowerCase().substring(j, j + query.length) === query) {
//                 descriptionMatch = true;
//                 break;
//             }
//             j++;
//         }

//         // If any of the conditions match, add the recipe to the matchingRecipes array
//         if (nameMatch || ingredientMatch || descriptionMatch) {
//             matchingRecipes.push(recipe);
//         }
//     }

//     return matchingRecipes;
// }


// export function mainSearchRecipes(query, recipes) {
//   console.log('searchRecipes called with:', { query, recipes });

//     // Ensure the query is a string
//     query = query.toLowerCase();
//     console.log('Converted query to lowercase:', query);

//     // Initialize an array to hold the matching recipes
//     let matchingRecipes = [];

//     // Iterate through the recipes array
//     for (let i = 0; i < recipes.length; i++) {
//         const recipe = recipes[i];
        
//         const nameMatch = recipe.name.toLowerCase().indexOf(query) !== -1;
//         const ingredientMatch = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().indexOf(query) !== -1);
//         const descriptionMatch = recipe.description.toLowerCase().indexOf(query) !== -1;

//         // If any of the conditions match, add the recipe to the matchingRecipes array
//         if (nameMatch || ingredientMatch || descriptionMatch) {
//             matchingRecipes.push(recipe);
//         }
//     }

//     return matchingRecipes;
// }

// export function mainSearchRecipes(query, recipes) {
//   console.log('searchRecipes called with:', { query, recipes });

//   // Ensure the query is a string and convert it to lowercase
//   query = query.toLowerCase();
//   console.log('Converted query to lowercase:', query);

//   // Use the .filter() method to find all matching recipes
//   const matchingRecipes = recipes.filter(recipe => {
//       const nameMatch = recipe.name.toLowerCase().indexOf(query) !== -1;
//       const descriptionMatch = recipe.description.toLowerCase().indexOf(query) !== -1;

//       // Use .some() to check if any ingredient matches the query
//       const ingredientMatch = recipe.ingredients.some(ing => 
//           ing.ingredient.toLowerCase().indexOf(query) !== -1
//       );

//       // Return true if any match is found (name, description, or ingredient)
//       return nameMatch || ingredientMatch || descriptionMatch;
//   });

//   return matchingRecipes;
// }

export function mainSearchRecipes(query, recipes) {
  console.log('searchRecipes called with:', { query, recipes });

  // Ensure the query is a string and convert it to lowercase
  query = query.toLowerCase();
  console.log('Converted query to lowercase:', query);

  // Initialize an array to hold the matching recipes
  let matchingRecipes = [];

  // Iterate through the recipes array
  for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      
      // Convert recipe name and description to lowercase for comparison
      const nameMatch = recipe.name.toLowerCase().indexOf(query) !== -1;
      const descriptionMatch = recipe.description.toLowerCase().indexOf(query) !== -1;

      // Check if any ingredients match the query
      let ingredientMatch = false;
      for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
          if (ingredient.indexOf(query) !== -1) {
              ingredientMatch = true;
              break;
          }
      }

      // If any of the conditions match, add the recipe to the matchingRecipes array
      if (nameMatch || ingredientMatch || descriptionMatch) {
          matchingRecipes.push(recipe);
      }
  }

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