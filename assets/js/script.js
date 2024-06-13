$('#back-button').on('click', () => {
    window.location.assign("index.html");
});

const apiCallBtnEl = document.querySelector('#api-call-btn');
const tcgPokemonNameInputEl = document.querySelector('#tcg-pokemon-name');
const searchResultsEl = document.querySelector('#TCG-search-results');

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
