// DEPENDENCIES
const searchResultsTableEl = $('#searchResultsTableEl');
const typeSelectEl = $('#type-select');
const searchTypeSelectEl = $('#search-type-select');

// TCG - TODO: MOVE THIS TO THE DETAILS PAGE
const apiCallBtnEl = document.querySelector('#api-call-btn');
const tcgPokemonNameInputEl = document.querySelector('#tcg-pokemon-name');
const searchResultsEl = document.querySelector('#TCG-search-results');

// GLOBAL DATA
let pokedex = []; //holds all Pokemon data for the page

// FUNCTIONS

// function observeSearchResultsRows()
// purpose: enable "lazy loading" of details stats in search results
// - observe when search results rows become visible
// - when they become visible, call the function to fetch the details
// - then remove the observer so that we don't fetch the details again
function observeSearchResultsRows (elements, rowIndex) {
  // "IntersectionObserver" in window means that the browser supports IntersectionObserver
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item, rowIndex) => {
        //"isIntersecting" means "is visible on screen, i.e it was in the first page of data or we've reached it by scrolling down"
        if (item.isIntersecting) {
          // ********* this is the point of this function! fetch the details when the row comes on screen
          fetchStatsForResultRow(item.target, rowIndex);
          // now that we have the stats, stop observing so that we don't call the API again
          observer.unobserve(item.target);
        }
      });
    });
    elements.forEach((element) => {
      // the code above created the observer. This attaches it to each search result row.
      observer.observe(element);
      console.log("observing element");
    });
  } else {
    // Deferred to post-MVP.
    // if we're here, then ("IntersectionObserver" in window) was false and the browser
    // does not support IntersectionBrowser. In that case, we would load everything even 
    // however, this is an edge case, only applicable if someone is using an out-of-date
    // browser. Deferred.
  }
}

// callPokemonTCGAPI
// calls the TCG API to get a Pokemon card image
// TODO: This will be used on the details page
const callPokemonTCGAPI = function () {
  const pokemonName = tcgPokemonNameInputEl.value.toLowerCase();
  if (!pokemonName) {
    alert('Please enter a Pokémon name for the TCG API');
    return;
  }
  const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`;
  const apiKey = 'b66dce1b-c439-4ca5-a3b3-048672d9ddd1';

  fetch(apiUrl, {
    headers: {
      'X-Api-Key': apiKey
    }
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    })
    .then(function (data) {
      console.log(data);
      displayCardData(data);
    })
    .catch(function (error) {
      alert('Unable to connect to Pokémon TCG API');
      console.error(error);
    });
};

// Displays a card from the TCG API Call 
// POC: this currently displays in an element called "searchResultsEl". When it moves to the
// Details page, the element will be called something specific
const displayCardData = function (data) {
  if (data.data.length > 0) {
    const card = data.data[1];
    const html = `
      <h2>${card.name}</h2>
      <img src="${card.images.small}" alt="${card.name}">
      <p>Set: ${card.set.name}</p>
      <p>Rarity: ${card.rarity}</p>
    `;
    searchResultsEl.innerHTML = html;
  } else {
    searchResultsEl.innerHTML = '<p>Could not find pokemon.</p>';
  }
};

//  composeResultRow()
//  Takes a single Pokemon object, as returned from the API, and composes a row for the results table
//  Parameters
//    pokemon:  a pokemon object
//    index:    row number, used to create the <tr> element ID
function composeResultsRow(pokemon, index) {
  const resultRow = $(`<tr id="pokemon-${index}" class="result-row-observed">
      <td> ${pokemon.name}</td>
      <td>  </td>
      <td>  </td>
      <td>  </td>
      <td>  </td>
      <td>  </td>
      <td>  </td>
      <td>  </td>
      <td>  </td>
      <td style="display: none">  </td>
      <td style="display:none"> <!-- This should be speed but it doesn't work - I don't know why! --> </td>
    </tr>
    `);
    return resultRow;
}

function filterPokemon(searchString) {
  searchResultsTableEl.empty();
  const filteredPokemon = pokedex.filter(pokemon => pokemon.name.toLowerCase().includes(searchString.toLowerCase()));
  // const notMatchingName = pokedex.filter(pokemon => !pokemon.name.toLowerCase().includes(searchString.toLowerCase()));
  // console.log(notMatchingName)
  filteredPokemon.forEach((pokemon, ii) => {
    const resultRow = composeResultsRow(pokemon, ii);
    searchResultsTableEl.append(resultRow);
  });
}

function showAndHideByType(event) {
  console.log("Stub of showAndHideByType(): todo, implement the function");
}

// fetchPokedex()
// calls PokeAPI to get an Pokedex of all pokemon (1302)
// stores them locally so that we can build on them
function initPage() {
  fetch(POKEAPI.URL_GET_INDEX_OF_ALL, {
  })
  .then(function (response) {
     if (response.ok) {
       return response.json();
     } else {
       alert(`Error fetching Pokedex of Pokemon: ${response.statusText}`);
     }
   })
   .then(function (data) {
    // store the Pokedex locally so that we can build on it and don't have to get it again
     //localStorage.setItem(STRINGS.RAW_POKEDEX, JSON.stringify(data.results));

    pokedex = data.results;
    loadSearchResultsTable();
   })
   .catch(function (error) {
     alert('Unable to get Pokedex of Pokemon from PokeAPI');
     console.error(error);
   });
}

function loadSearchResultsTable() {
  // build the table of results
   pokedex.forEach((pokemon, ii) => {
     const resultRow = composeResultsRow(pokemon, ii);
     searchResultsTableEl.append(resultRow);
   });
   const resultRows = document.querySelectorAll('.result-row-observed');
   observeSearchResultsRows(resultRows);
}

//USER INTERACTIONS

// TODO - move this to the pokemon-details.js because it does not apply to index.html
// From Details page, on click of back button, return to index.html
$('#back-button').on('click', () => {
  window.location.assign("index.html");
});

searchTypeSelectEl.on('input', function () {
  const searchString = $(this).val();
  filterPokemon(searchString);
});

apiCallBtnEl.addEventListener('click', callPokemonTCGAPI);
typeSelectEl.on('change',showAndHideByType); 
// INIT
$(document).ready( function () {
  initPage();
});