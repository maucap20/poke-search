$('#back-button').on('click', () => {
    window.location.assign("index.html");
});

const apiCallBtnEl = document.querySelector('#api-call-btn');
const searchResultsEl = document.querySelector('#TCG-search-results');
const fetchIndexBtnEl = $('#fetch-index-btn');

// 
function fetchIndexOfAllPokemon() {
  log("fetchIndexOfAllPokemon");
   fetch(POKEAPI.URL_GET_INDEX_OF_ALL, {
   })
   .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert(`Error fetching index of all Pokemon: ${response.statusText}`);
      }
    })
    .then(function (data) {
      console.log(data);
      console.log(data.results);
      localStorage.setItem(STRINGS.INDEX_IN_LOCAL_STORAGE, JSON.parse(data.results));
  //    displayCardData(data);
    })
    // .catch(function (error) {
    //   alert('Unable to connect to Pokémon TCG API');
    //   console.error(error);
    // })
    ;
}

// callPokemonTCGAPI
// calls the TCG API to get a Pokemon card image
// TODO: This will be used on the details page
const callPokemonTCGAPI = function () {
  const apiUrl = 'https://api.pokemontcg.io/v2/cards/xy1-1';
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
        alert(`Error: ${response.statusText}`);
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
  const card = data.data;
  const html = `
    <h2>${card.name}</h2>
    <img src="${card.images.small}" alt="${card.name}">
    <p>Set: ${card.set.name}</p>
    <p>Rarity: ${card.rarity}</p>
  `;
  searchResultsEl.innerHTML = html;
};

apiCallBtnEl.addEventListener('click', callPokemonTCGAPI);
fetchIndexBtnEl.on('click',fetchIndexOfAllPokemon);
  