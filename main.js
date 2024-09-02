import { recipes } from "./assets/data/recipes.js";
import { initializeDropdowns } from "./Filter/dropDown.js";
import { displayRecipes } from "./RecipeCard/displayRecipe.js";
import { mainSearchRecipes } from "./mainSearch.js";
import { updateSelectedItemsLog } from "./iteration/itemHandlerProcessing.js";

displayRecipes(recipes);
initializeDropdowns(recipes);
updateSelectedItemsLog(recipes);

document.getElementById("searchButton").addEventListener("click", () => {
  recipes = mainLaunch();
  
});

document.getElementById("research").addEventListener("input", () => {
  const recipes = mainLaunch();

});

// Define the function to set up dropdown handlers
function setupDropdownHandlers() {
  var tags = document.getElementsByClassName("dropdown-item");
  console.log("Number of tags:", tags.length);

  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    tag.addEventListener("click", function () {
      tagHandler(tag);
      previousTagCheck();
      filterRecipes();
    });
  }
}


// construire un tableau avec les tags selectionnes + ceux qui viennent etre clickés ! DONE
function tagHandler(tag) {
  var selectedTagContainer = document.getElementById("tag");
  var tagButton = document.createElement("button");
  var tagElement = document.createElement("a");

  tagElement.textContent = tag.textContent;
  tagElement.classList.add("selected-tag-item");
  // Create the remove button ("X")
  var removeButton = document.createElement("span");
  removeButton.textContent = "X"; // Set text to "X"
  removeButton.classList.add("remove-tag-button");
  // Append the tag and remove button to the tagButton
  tagButton.appendChild(tagElement);
  tagButton.appendChild(removeButton);
  selectedTagContainer.appendChild(tagButton);

  // Remove the tag from the dropdown list
  tag.classList.remove("dropdown-item");
  tag.style.display = "none"; // Hide the original tag from the dropdown

  // Event listener to remove the tag and add it back to the dropdown
  tagButton.addEventListener("click", function () {
    // Remove the entire button element
    selectedTagContainer.removeChild(tagButton);
    tag.classList.add("dropdown-item");
    tag.style.display = "block"; // Show the tag back in the dropdown list
    filterRecipes();
  });
  filterRecipes();
}
// chercher si des tags sont deja selectionnés ! DONE !
function previousTagCheck() {
  var selectedTags = document.querySelectorAll(".selected-tag-item"); // Assuming each tag has the class 'tag'
  var tagCount = selectedTags.length; // Count the number of tags
  console.log("Number of active selected tags:", tagCount);
  console.log(selectedTags)
  if (tagCount > 0) {
    console.log("Previously selected tags:", selectedTags);
    // To do: function to update the displayed recipes with the active tags
  } else {
    console.log("There are no tags to select from");
  }
}
// lancer la fonction filterRecipes avec parametre (tableau de tags + Recipes){}

function filterRecipes() {
  var selectedTags = Array.from(document.querySelectorAll(".selected-tag-item")).map((tag) => tag.textContent.toLowerCase());
  console.log(selectedTags);
  var filteredRecipes = recipes.filter((recipe) => {
    return selectedTags.every((tag) => {
      const ingredientMatch = recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(tag)
      );
      const applianceMatch = recipe.appliance.toLowerCase().includes(tag);
      const utensilMatch = recipe.ustensils.some((ut) =>
        ut.toLowerCase().includes(tag)
      );

      return ingredientMatch || applianceMatch || utensilMatch;
    });
  });
  console.log("Filtered Recipes:", filteredRecipes);
  displayRecipes(filteredRecipes);
  previousTagCheck(filteredRecipes)
  initializeDropdowns(filteredRecipes) /// build a comparaison function to adjust a given parameter here.
  setupDropdownHandlers(filteredRecipes)
}

function mainLaunch() {
  console.log("MAINLAUCH");
  const searchTerm = document.getElementById("research").value;
  if (searchTerm.length < 3) {
    console.log("Need more characters in mainSearch bar");
  } else {
    console.log("Search button clicked with search term:", searchTerm);
    const searchResults = mainSearchRecipes(searchTerm, recipes);
    console.log("Search results:", searchResults);
    displayRecipes(searchResults);
    previousTagCheck(searchResults)
    initializeDropdowns(searchResults)
    setupDropdownHandlers(searchResults)
  }
}


// Call this function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  setupDropdownHandlers();  // Call the reusable function
});