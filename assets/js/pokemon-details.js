//DEPENDENCIES
const requestAPI = POKEAPI.URL_SEARCH_BY_NAME + '1025';   
// const photoAPI = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' + '905' + '.png';
const photoAPI = "https://img.pokemondb.net/artwork/" + "pecharunt" + ".jpg" ;

fetch(requestAPI)
.then(function (response) {
    return response.json();
}).then(function(data){
    const pokedata = data;

    //Set Pokemon name section.
    setPokeName(pokedata);

    setPokePhoto(pokedata);
    console.log(pokedata.forms[0].url);

})


function setPokeName(data){
    $('#pokeName').text(data.name.toLocaleUpperCase());
}

function setPokePhoto(pokedata){
    $('#poke-photo').attr("src",photoAPI);
}