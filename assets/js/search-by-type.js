//////////////////////////////////////////////////////////////
// NOTE - this file will be merged with search-type-button.js

//DEPENDENCIES
const typeInput = $('#search-type-btn');
const submitSearchBtn = $('#submit-search-btn');

//alert(POKEAPI.URL_SEARCH_BY_TYPE);



function searchByType(event) {
    event.preventDefault();
    
    log(`${POKEAPI.URL_SEARCH_BY_TYPE}${typeInput.val()}`);//?remove
    fetch(`POKEAPI.URL_SEARCH_BY_TYPE${typeInput.val()}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
}

submitSearchBtn.on('click',searchByType);

//? TEST-REMOVE
typeInput.val(3);