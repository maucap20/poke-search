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

    setStats(pokedata.stats);
    setPokePhoto(pokedata);

})


function setPokeName(data){
    $('#pokeName').text(data.name.toLocaleUpperCase());
}

function setStats(data){
    console.log(data);
    $('#HP-growth-stat').text(data[0].base_stat);
    $('#HP-min-stat').text(HPMinStatFormula(data[0].base_stat));
    $('#HP-max-stat').text(HPMaxStatFormula(data[0].base_stat));

    $('#Atk-growth-stat').text(data[1].base_stat);
    $('#Atk-min-stat').text(otherMinStatFormula(data[1].base_stat));
    $('#Atk-max-stat').text(otherMaxStatFormula(data[1].base_stat));

    $('#Def-growth-stat').text(data[2].base_stat);
    $('#Def-min-stat').text(otherMinStatFormula(data[2].base_stat));
    $('#Def-max-stat').text(otherMaxStatFormula(data[2].base_stat));

    $('#SPAtk-growth-stat').text(data[3].base_stat);
    $('#SPAtk-min-stat').text(otherMinStatFormula(data[3].base_stat));
    $('#SPAtk-max-stat').text(otherMaxStatFormula(data[3].base_stat));

    $('#SPDef-growth-stat').text(data[4].base_stat);
    $('#SPDef-min-stat').text(otherMinStatFormula(data[4].base_stat));
    $('#SPDef-max-stat').text(otherMaxStatFormula(data[4].base_stat));

    $('#spd-growth-stat').text(data[5].base_stat);
    $('#spd-min-stat').text(otherMinStatFormula(data[5].base_stat));
    $('#spd-max-stat').text(otherMaxStatFormula(data[5].base_stat));


    $('#tot-growth-stat').text(getTotalStat(data));
   

}

function getTotalStat(data){
    let tot = 0;
    
    for(let i=0; i < 6;i++){
        tot+=data[i].base_stat;
    }
    return tot;
}

function HPMinStatFormula(gStat){
    return Math.floor(gStat*2+110);
}

function HPMaxStatFormula(gStat){
    return Math.floor(gStat*2+204);
}

function otherMinStatFormula(gStat){
    return Math.floor((gStat*2+5)*0.9);
}

function otherMaxStatFormula(gStat){
    return Math.floor((gStat*2+99)*1.1);

function setPokePhoto(pokedata){
    $('#poke-photo').attr("src",photoAPI);
}