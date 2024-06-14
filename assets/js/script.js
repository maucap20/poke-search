$('#back-button').on('click', () => {
    window.location.assign("index.html");
});
// DEPENDENCIES

// TCG - TODO: MOVE THIS TO THE DETAILS PAGE
const apiCallBtnEl = document.querySelector('#api-call-btn');
const tcgPokemonNameInputEl = document.querySelector('#tcg-pokemon-name');
const searchResultsEl = document.querySelector('#TCG-search-results');

// FOR SEARCH and SEARCH RESULTS
const loadPokedexBtnEl = $('#load-pokedex-btn');
const searchResultsTableEl = $('#searchResultsTableEl');


// FUNCTIONS

// fetchPokedex()
// calls PokeAPI to get an Pokedex of All 1302 pokemon (1302)
// stores them locally so that we can build on them
function fetchPokedex() {
  fetch(POKEAPI.URL_GET_INDEX_OF_ALL+"?limit=400", {
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
     localStorage.setItem(STRINGS.RAW_POKEDEX, JSON.stringify(data.results));
   })
   .catch(function (error) {
     alert('Unable to get Pokedex of Pokemon from PokeAPI');
     console.error(error);
   });
}

function fetchStatsForResultRow(rowElement) {
  log("stub: fetchStatsForResultRow(). To Do: call details API to get stats");
  // this function needs to get details and update them in two places
  // update in pokedex, so we have them in case the page is refreshed
  // update them in the <td>'s of the result row, so they are displayed onscreen
  
  // call details API with rowElement.url
  // const details = data from API
  // set attributes on the element for this row in the pokedex, i.e. pokedex[rowElement.index]
  // e.g. pokedex[rowElement.index].hp = details.hp
  // e.g. pokedex[rowElement.index].attack = details.attack
  // etc
  // update the 

}
function intersectObserve (elements) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          fetchStatsForResultRow(item.target);
          // now that we have the stats, stop observing so that we don't call the API again
          observer.unobserve(item.target);
        }
      });
    });
    elements.forEach((element) => {
      observer.observe(element);
      log("observing element");
    });
  } else {
    // no observer in browser, so brute force load all things even though it's slower.
  }
}

function loadSearchResultsTable() {
  fetchPokedex(); // gets bare-bones data into raw pokedex and stores it
  // get the raw pokedex from local storage. I tried returning the data from fetchPokedex(),
  // to skip storing and retreiving the raw pokedex, but had trouble with that
  const rawPokedex = JSON.parse(localStorage.getItem(STRINGS.RAW_POKEDEX));
  const localPokedex = [];
  
  rawPokedex.forEach((rawPokemon, ii) => {
    const pokObject = {
      name: rawPokemon.name,
      url: rawPokemon.url,
      type: 'a type!',
      total: "6",
      hp: "1",
      attack: "2",
      defense: "3"
    };
    localPokedex.push(pokObject);
  });
  
  // store the Pokedex with the newly added stats
  localStorage.setItem(STRINGS.POKEDEX_IN_LOCAL_STORAGE,JSON.stringify(localPokedex));
  
  // build the table of results
   localPokedex.forEach((pokemon, ii) => {
     const resultRow = composeResultsRow(pokemon, ii);
     searchResultsTableEl.append(resultRow);
   });
   const resultRows = document.querySelectorAll('.result-row-observed');
   intersectObserve(resultRows);
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
      <td> ${pokemon.type} </td>
      <td> ${pokemon.total} </td>
      <td> ${pokemon.hp} </td>
      <td> ${pokemon.attack} </td>
      <td> ${pokemon.defense} </td>
    </tr>
    `);
    return resultRow;
}



apiCallBtnEl.addEventListener('click', callPokemonTCGAPI);
loadPokedexBtnEl.on('click',loadSearchResultsTable);

// INIT
$(document).ready( function () {
  fetchPokedex();
  loadSearchResultsTable();
});
