import { createIngredientItems } from '../iteration/ingredientProcessing.js'

export function creationRecipeCard(recipe){
    const recipeCard = document.createElement('div');
    recipeCard.className = 'card mb-4'; // Use Bootstrap card classes and margin-bottom for spacing

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.setAttribute("src", `./assets/visuals/recipe-pic/${recipe.image}`);
    img.setAttribute('alt', 'Recipe Image');

    const recipeCardBody = document.createElement('div');
    recipeCardBody.className = 'card-body';
    
    const recipeTimer = document.createElement('div');
    recipeTimer.className = 'card-timer';
    recipeTimer.innerHTML = `${recipe.time} min`;

    const h2 = document.createElement('h2');
    h2.className = 'card-title';
    h2.innerHTML = recipe.name;

    const recipeDescription = document.createElement('h3');
    recipeDescription.innerHTML = 'RECETTE';
    recipeDescription.className = 'card-description';

    const recipeCardText = document.createElement('p');
    recipeCardText.className = 'card-text truncate-text'; // Add truncate-text class for truncation
    recipeCardText.innerHTML = recipe.description;

    const recipeIngredient = document.createElement('h3');
    recipeIngredient.innerHTML = 'INGREDIENTS';
    recipeIngredient.className = 'card-ingredients';

    const ingredientItemSection = document.createElement('div');
    ingredientItemSection.className = 'row';

    // Iterate through all the ingredients
    createIngredientItems(recipe.ingredients, ingredientItemSection);

    recipeCardBody.appendChild(h2);
    recipeCardBody.appendChild(recipeDescription);
    recipeCardBody.appendChild(recipeCardText);
    recipeCardBody.appendChild(recipeIngredient);
    recipeCardBody.appendChild(ingredientItemSection);
    recipeCard.appendChild(recipeTimer);
    recipeCard.appendChild(img);
    recipeCard.appendChild(recipeCardBody);

    return recipeCard;
}
