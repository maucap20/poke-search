//////////////////////////////////////////////////////////////
// NOTE - this file will be merged with search-type-button.js

//DEPENDENCIES
const typeSelect = $('#search-type-select');
const submitSearchBtn = $('#search-type-btn');
const searchResultsDIV = $('#searchResults');

const API = "https://pokeapi.co/api/v2/type/";

// callSearchByType(event)
// EventHandler function: returns JSON for an array of Pokemon of the type specified in the typeInput field
 function callSearchByType(event) {    
   event.preventDefault();
   const requestAPI = POKEAPI.URL_SEARCH_BY_TYPE + typeSelect.val();   
   log(requestAPI);
   fetch(requestAPI)
   .then(function (response) {
     return response.json();
   })
   .then(function (data) {
     const arrayOfPokemon = data.pokemon;
     for (let ii = 0; ii < arrayOfPokemon.length; ++ii) {
      // get the singular pokemon object from the plural array
       const thePokemon = arrayOfPokemon[ii].pokemon;
       log(thePokemon);
       
     }
   });
}

//typeSelect.on('change',callSearchByType); // we could also implement this to search whenever the select changes value
submitSearchBtn.on('click',callSearchByType);