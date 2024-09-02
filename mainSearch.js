export function mainSearchRecipes(query, recipes) {
    console.log('searchRecipes called with:', { query, recipes });
    // Ensure the query is a string
    
    query = query.toLowerCase();
    console.log('Converted query to lowercase:', query);

    return recipes.filter(recipe => {
        const nameMatch = recipe.name.toLowerCase().includes(query);
        const ingredientMatch = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(query));
        const applianceMatch = recipe.appliance.toLowerCase().includes(query);
        const utensilMatch = recipe.ustensils.some(ut => ut.toLowerCase().includes(query));

        return nameMatch || ingredientMatch || applianceMatch || utensilMatch;
    });
}


export function filterRecipes(query, recipes){

    return recipes.filter(recipe => {
        const ingredientMatch = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(query));
        const applianceMatch = recipe.appliance.toLowerCase().includes(query);
        const utensilMatch = recipe.ustensils.some(ut => ut.toLowerCase().includes(query));

        return ingredientMatch || applianceMatch || utensilMatch;
    });
    return query

}