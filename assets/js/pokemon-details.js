//DEPENDENCIES
const requestAPI = POKEAPI.URL_SEARCH_BY_NAME + '1';   



fetch(requestAPI)
.then(function (response) {
    return response.json();
}).then(function(data){
    const pokedata = data;

    //Set Pokemon name section.
    setPokeName(pokedata);

})


function setPokeName(data){
    $('#pokeName').text(data.name.toLocaleUpperCase());
}
