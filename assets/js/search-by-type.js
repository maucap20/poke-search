//////////////////////////////////////////////////////////////
// NOTE - this file will be merged with search-type-button.js

//DEPENDENCIES
const typeSelectEl = $('#type-select');
const submitSearchBtn = $('#search-type-btn');
const searchResultsDIV = $('#searchResults');

const API = "https://pokeapi.co/api/v2/type/";

// callSearchByType(event)
// EventHandler function: returns JSON for an array of Pokemon of the type specified in the typeInput field
 function callSearchByType(event) {    
   event.preventDefault();
   const requestAPI = POKEAPI.URL_SEARCH_BY_TYPE + typeSelectEl.val();   
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

function showAndHideByType(event) {
  log("Stub of showAndHideByType(): todo, implement the function");
}

typeSelectEl.on('change',showAndHideByType); 
submitSearchBtn.on('click',callSearchByType);