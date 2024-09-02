export function createIngredientItems(ingredients, ingredientItemSection) {
    // Iterate through all the ingredients
    ingredients.forEach(ingredient => {
        const ingredientItemPair = document.createElement('div');
        ingredientItemPair.className = 'col-6';
        
        const ingredientName = document.createElement('div');
        ingredientName.className = 'ingredient-name';
        ingredientName.innerHTML = ingredient.ingredient;

        const ingredientQuantity = document.createElement('div');
        ingredientQuantity.className = 'ingredient-quantity';
        ingredientQuantity.innerHTML = ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : '';

        ingredientItemPair.appendChild(ingredientName);
        ingredientItemPair.appendChild(ingredientQuantity);
        ingredientItemSection.appendChild(ingredientItemPair);
    });
}
