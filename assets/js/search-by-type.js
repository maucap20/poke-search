//DEPENDENCIES
const typeInput = $('#search-type-btn');
const submitSearchBtn = $('#submit-search-btn');

//alert(POKEAPI.URL_SEARCH_BY_TYPE);



function searchByType(event) {
    event.preventDefault();
    
    log(typeInput.val());//?remove
    fetch(POKEAPI.URL_SEARCH_BY_TYPE)
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