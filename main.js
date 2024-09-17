import { recipes } from "./assets/data/recipes.js";
import { initializeDropdowns } from "./Filter/dropDown.js";
import { displayRecipes } from "./RecipeCard/displayRecipe.js";
import { mainSearchRecipes, filterRecipes } from "./mainSearch.js";

displayRecipes(recipes);
initializeDropdowns(recipes);

let newRecipes = [];

document.getElementById("searchButton").addEventListener("click", () => {
  newRecipes = mainLaunch();
});

document.getElementById("research").addEventListener("input", () => {
  newRecipes = mainLaunch();
});


document.getElementsByClassName("clearButtonMainSearch")[0].addEventListener("click", () => {
    const searchTerm = document.getElementById("research");
    searchTerm.value = ''; 
    mainLaunch();
    document.querySelector(".fa-solid.fa-x").style.display="none";
  });


// Define the function to set up dropdown handlers
export function setupDropdownHandlers() {
  var tags = document.getElementsByClassName("dropdown-item");
  console.log("Number of tags:", tags.length);
  let mainRecipe = []
  if (newRecipes.length === 0){
    mainRecipe = recipes
  } else {
    mainRecipe = newRecipes
  }

  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    tag.addEventListener("click", function () {
      tagHandler(tag);
      previousTagCheck();
      filterRecipes(mainRecipe);
    });
  }
}

// construire un tableau avec les tags selectionnes + ceux qui viennent etre clickés ! DONE
function tagHandler(tag) {
  let mainRecipe = []
  if (newRecipes.length === 0){
    mainRecipe = recipes
  } else {
    mainRecipe = newRecipes
  }
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
  console.log(`this is the tag`,tag)
  tag.style.display = "none"; // Hide the original tag from the dropdown

  // Event listener to remove the tag and add it back to the dropdown
  tagButton.addEventListener("click", function () {
    // Remove the entire button element
    selectedTagContainer.removeChild(tagButton);
    tag.classList.add("dropdown-item");
    tag.style.display = "block"; // Show the tag back in the dropdown list
    filterRecipes(mainRecipe);
  });
  filterRecipes(mainRecipe);
}
// chercher si des tags sont deja selectionnés ! DONE !
export function previousTagCheck() {
  var selectedTags = document.querySelectorAll(".selected-tag-item");
  var tagCount = selectedTags.length; 
  console.log("Number of active selected tags:", tagCount);
  console.log(selectedTags);
  if (tagCount > 0) {
    console.log("Previously selected tags:", selectedTags);
    return selectedTags;
  } else {
    console.log("There are no tags to select from");
  }
}




function mainLaunch() {
  console.log("MAINLAUCH");
  const searchTerm = document.getElementById("research").value;
  const errorMessage = `Aucune recette ne contient "${searchTerm}". Vous pouvez chercher «tarte aux pommes», «poisson», etc.`;
  const displayNoRecipe = document.querySelector(".subSearchText");
  const clearbutton = document.querySelector(".fa-solid.fa-x")

  if (searchTerm.length > 0) {
    clearbutton.style.display = 'flex';
  } else {
    clearbutton.style.display = 'none';  // Hide clear button when searchTerm is empty
  }

  if (searchTerm.length >= 3) {
    console.log("Search is looking for this searchTerm:", searchTerm);
    const searchResults = mainSearchRecipes(searchTerm, recipes);

    if (searchResults.length === 0) {
      displayNoRecipe.innerText = errorMessage;
      clearbutton.style.display = 'flex'
      

    } else {
      if (displayNoRecipe){
      displayNoRecipe.innerText = '';
      // clearbutton.style.display = 'none'

      }
      
      displayRecipes(searchResults);
      previousTagCheck(searchResults);
      initializeDropdowns(searchResults);
      setupDropdownHandlers(searchResults);

    }
    return searchResults;
  } else if (searchTerm.length === 0) {
    displayNoRecipe.innerText = '';
    
    displayRecipes(recipes)
    previousTagCheck(recipes);
    initializeDropdowns(recipes);
    setupDropdownHandlers(recipes);
  }
  return recipes;
}

// Call this function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  setupDropdownHandlers(); // Call the reusable function
});
