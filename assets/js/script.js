$('#back-button').on('click', () => {
    window.location.assign("index.html");
});

const apiCallBtnEl = document.querySelector('#api-call-btn');
const tcgPokemonNameInputEl = document.querySelector('#tcg-pokemon-name');
const searchResultsEl = document.querySelector('#TCG-search-results');
const fetchIndexBtnEl = $('#fetch-index-btn');

// fetchIndexOfAllPokemon()
// calls PokeAPI to get an index of All 1302 pokemon (1302)
// stores them locally so that we can build on them
function fetchIndexOfAllPokemon() {
  log("fetchIndexOfAllPokemon");
   fetch(POKEAPI.URL_GET_INDEX_OF_ALL, {
   })
   .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert(`Error fetching index of Pokemon: ${response.statusText}`);
      }
    })
    .then(function (data) {
      // store the index locally so that we can build on it and don't have to get it again
      localStorage.setItem(STRINGS.INDEX_IN_LOCAL_STORAGE, JSON.stringify(data.results));
    })
    .catch(function (error) {
      alert('Unable to get index of Pokemon from PokeAPI');
      console.error(error);
    })
    ;
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

apiCallBtnEl.addEventListener('click', callPokemonTCGAPI);

fetchIndexBtnEl.on('click',fetchIndexOfAllPokemon);
  

