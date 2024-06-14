//DEPENDENCIES
const requestAPI = POKEAPI.URL_SEARCH_BY_NAME + '493';   



fetch(requestAPI)
.then(function (response) {
    return response.json();
}).then(function(data){
    const pokedata = data;

    //Set Pokemon name section.
    setPokeName(pokedata);

    setPokedexData(pokedata);
})


function setPokeName(data){
    $('#pokeName').text(data.name.toLocaleUpperCase());
}

function setPokedexData(data){
    $('#nat-num').text(data.id);
    
     $('#type').text(getType(data.types))
    // Cannot find species data in api. Will change to a different value in API
    // $('#species').text()
    $('#height').text(data.height / 10 + 'm');
    $('#weight').text(data.weight / 10 + 'kg');
    $('#abilities').text(getAbil(data.abilities));
}

function getType(data){
    let retStr = '';
   
    for(let i=0; i< data.length; i++){
        retStr+=data[i].type.name+ " ";
    }
    return retStr;
}

function getAbil(data){
    let retStr = '';
    for(let i=0; i< data.length; i++){
        retStr+=data[i].ability.name+ ", ";
    }
    retStr.trim();
    retStr = retStr.substring(0,retStr.length-2);
    return retStr;
}