$('#back-button').on('click', () => {
    window.location.assign("index.html");
});

const apiCallBtnEl = document.querySelector('#api-call-btn');
const searchResultsEl = document.querySelector('#search-results');

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

  