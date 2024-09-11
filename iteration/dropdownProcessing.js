// import { handleItemSelected } from "./itemHandlerProcessing.js";
// import { filterRecipes } from "../mainSearch";

function toLowerCaseItems(items) {
    return items.map(item => item.toLowerCase());
}

function removePluralOrXEnding(items) {
    return items.filter(item => !/[sx]$/.test(item));
}

function removeDuplicates(items) {
    return [...new Set(items)];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function sortItemsAlphabetically(items) {
    return items.sort((a, b) => a.localeCompare(b));
}

function formatItems(items) {
    return items.map(item => capitalizeFirstLetter(item));
}

////////////////////////////////////////////////////////////
// Function to createDropdownItems
////////////////////////////////////////////////////////////
export function createDropdownItems(items, dropdownMenu, recipes) {
    console.log(dropdownMenu);

    const searchField = dropdownMenu.querySelector('.dropdown-search');
    const searchFieldWrapper = searchField ? searchField.parentElement : null;

    // Clear the current dropdown menu content
    dropdownMenu.innerHTML = "";

    // Re-append the search field wrapper (input and clear button)
    if (searchFieldWrapper) {
        dropdownMenu.appendChild(searchFieldWrapper);
        console.log('Appended search field wrapper to dropdown menu.');
    }

    console.log('Processing items...');
    const lowercasedItems = toLowerCaseItems(items);
    const filteredItems = removePluralOrXEnding(lowercasedItems);
    const uniqueItems = removeDuplicates(filteredItems);
    const sortedItems = sortItemsAlphabetically(uniqueItems);
    const formattedItems = formatItems(sortedItems);

    var selectedTags = document.querySelectorAll(".selected-tag-item");

    formattedItems.forEach(item => {
        var check = false;
        selectedTags.forEach(tag => {
            if (item === tag.textContent) {
                check = true;
            }
        });
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.classList.add("dropdown-item");
        a.textContent = item;
        li.appendChild(a);
        if (check === false) {
            dropdownMenu.appendChild(li);
        }
    });

    // Handle the dropdown search input and clear button logic
    if (searchField) {
        searchField.focus();
        console.log('Focused on search field.');

        // Get all dropdown search inputs
        const dropdownSearchInputs = document.querySelectorAll('.dropdown-search');
    
        // Attach an event listener to each input
        dropdownSearchInputs.forEach(input => {
            input.addEventListener('input', function () {
                const filter = this.value.toLowerCase();
                const dropdownMenu = this.closest('.dropdown-menu');
                const listItems = dropdownMenu.querySelectorAll('li');
                const clearButton = this.nextElementSibling; // Select the clear button

                // Loop through all list items and hide those who don't match the search query
                listItems.forEach(item => {
                    const text = item.textContent || item.innerText;
                    if (text.toLowerCase().includes(filter)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Show or hide the clear button based on input value
                if (this.value.length > 0) {
                    clearButton.classList.add('show');
                } else {
                    clearButton.classList.remove('show');
                }
            });

            // Handle clear button click event
            const clearButton = input.nextElementSibling; // Get the corresponding clear button for this input
            clearButton.addEventListener('click', function () {
                input.value = ''; // Clear the input field
                input.dispatchEvent(new Event('input')); // Trigger input event to update the dropdown
                clearButton.classList.remove('show'); // Hide the clear button
            });
        });
    }

    console.log('Dropdown items created.');
}



////////////////////////////////////////////////////////////
// Function to Unique list with no duplicate
////////////////////////////////////////////////////////////

export function extractUniqueItems(recipes) {
    const allIngredients = [];
    const allAppliances = [];
    const allUtensils = [];

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient.ingredient);
        });
        allAppliances.push(recipe.appliance);
        recipe.ustensils.forEach(utensil => {
            allUtensils.push(utensil);
        });
    });

    return {
        allIngredients: removeDuplicates(allIngredients),
        allAppliances: removeDuplicates(allAppliances),
        allUtensils: removeDuplicates(allUtensils)
    };
}

////////////////////////////////////////////////////////////
// Function to Update Dropdown Menu list
////////////////////////////////////////////////////////////

function updateDropdown (){

}; 