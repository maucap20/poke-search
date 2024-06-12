//////////////////////////////////////////////////////////////
// NOTE - this file will be merged with search-type-button.js

//DEPENDENCIES
const typeInput = $('#search-type-btn');
const submitSearchBtn = $('#submit-search-btn');
const searchResultsDIV = $('#searchResults');

const API = "https://pokeapi.co/api/v2/type/";

// callSearchByType(event)
// EventHandler function: returns JSON for an array of Pokemon of the type specified in the typeInput field
 function callSearchByType(event) {    
   event.preventDefault();
   const requestAPI = POKEAPI.URL_SEARCH_BY_TYPE + typeInput.val();   
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
       const resultRow = composeResultRow(thePokemon, ii, data.name);
       searchResultsDIV.append(resultRow);
       
     }
   });
}

//  composeResultRow()
//  Takes a single Pokemon object, as returned from the API, and composes a row for the results table
//  Parameters
//    pokemon:  a pokemon object
//    index:    row number, used to create the <tr> element ID
//    type:     the Pokemon type as text. TODO capitalize the first letter.
// 
function composeResultRow(pokemon, index, type) {
  const resultRow = $(`<tr id="pokemon-${index}">
      <td> ${pokemon.name}</td>
      <td> ${type} </td>
      <td> tbd </td>
      <td> tbd </td>
      <td> tbd </td>
      <td> tbd </td>
    </tr>
    `);

    return resultRow;
}

submitSearchBtn.on('click',callSearchByType);