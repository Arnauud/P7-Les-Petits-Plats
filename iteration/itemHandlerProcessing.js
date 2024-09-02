import { recipes } from "../assets/data/recipes.js";
import { filterRecipes } from "../mainSearch.js";
import { displayRecipes } from "../RecipeCard/displayRecipe.js";
import { createDropdownItems } from "./dropdownProcessing.js";


////////////////////////////////////////////////////////////
// Function to log selected items
////////////////////////////////////////////////////////////
export function updateSelectedItemsLog(recipes) {
    console.log('Imported recipes:', recipes);
    const selectedItems = Array.from(document.querySelectorAll('.selected-item'))
    .map(el => el.firstChild.textContent.trim());

    console.log(`Selected ingredients: ${selectedItems.join(', ')}`);
    console.log('Available recipes:', recipes);

    const matchingRecipes = filterRecipes(selectedItems, recipes);
    console.log('Matching recipes:', matchingRecipes);

    if (matchingRecipes.length === 0) {
        console.log('No matching recipes found.');
        return;
    }

    displayRecipes(matchingRecipes);
}
