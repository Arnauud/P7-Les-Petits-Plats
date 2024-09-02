import { creationRecipeCard } from "./creationRecipeCard.js";

export function displayRecipes(recipes) {
    const main = document.getElementById('mainRecipe');
    // console.log('Clearing existing recipes from the main container.');
    main.innerHTML = "";  // Clear existing recipes
    
    const recipeCounter = document.querySelector('.recipeCounter');
    // console.log('Recipe counter element found:', recipeCounter);

    if (!recipes || recipes.length === 0) {
        // console.log('No recipes found, exiting displayRecipes function.');
        recipeCounter.textContent = "0 RECETTES";
        return;
    }

    console.log('Number of recipes to display:', recipes.length);

    let row = document.createElement('div');
    row.className = 'row';
    // console.log('Created initial row for recipes.');

    recipes.forEach((recipe, index) => {
        // console.log('Creating recipe card for recipe:', recipe);

        const recipeCardCol = document.createElement('div');
        recipeCardCol.className = 'col-md-4'; // 4 columns for each card to ensure 3 cards per row
        // console.log('Created column for recipe card.');

        const recipeCard = creationRecipeCard(recipe);
        // console.log('Recipe card created:', recipeCard);

        recipeCardCol.appendChild(recipeCard);
        row.appendChild(recipeCardCol);
        // console.log(`Appended recipe card to row. Recipe index: ${index}`);

        // After every third recipe, create a new row
        if ((index + 1) % 3 === 0) {
            // console.log('Appending row to main container.');
            main.appendChild(row);
            row = document.createElement('div');
            row.className = 'row';
            // console.log('Created new row for subsequent recipes.');
        }
    });

    // Append any remaining cards
    if (row.children.length > 0) {
        // console.log('Appending remaining recipe cards to the main container.');
        main.appendChild(row);
    }

    recipeCounter.textContent = `${recipes.length} RECETTE${recipes.length > 1 ? 'S' : ''}`;
    console.log(`Updated recipe counter text: ${recipeCounter.textContent}`);
}