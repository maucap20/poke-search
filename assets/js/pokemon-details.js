//DEPENDENCIES



const requestAPI = POKEAPI.URL_SEARCH_BY_NAME + '49'; 

// const photoAPI = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' + '905' + '.png';
// let photoAPI = "https://img.pokemondb.net/artwork/" + "darkrai" + ".jpg" ;
let photoAPI = "https://img.pokemondb.net/artwork/" ;



fetch(requestAPI)
.then(function (response) {
    return response.json();
}).then(function(data){
    const pokedata = data;

    photoAPI += pokedata.name + ".jpg";

    //Set Pokemon name section.
    setPokeName(pokedata);
    setPokedexData(pokedata);
    setStats(pokedata.stats);
    setPokePhoto(pokedata);


})


function setPokeName(data){
    $('#pokeName').text(data.name.toLocaleUpperCase());
}

function setPokedexData(data){
    $('#nat-num').text(data.id);
    
     $('#type').text(getType(data.types))
    $('#held-items').text(getHeldItem(data.held_items))
    $('#height').text(data.height / 10 + 'm');
    $('#weight').text(data.weight / 10 + 'kg');
    $('#abilities').text(getAbil(data.abilities));
}

function getType(data){
    let retStr = '';
   
    for(let i=0; i< data.length; i++){
        retStr+=data[i].type.name+ " ";
    }

    if(retStr===''){
        retStr = "NONE";
    }
    return retStr;
}

function getHeldItem(data){
    let retStr = '';
   
    for(let i=0; i< data.length; i++){
        retStr+=data[i].item.name+ ", ";
    }
    retStr.trim();
    retStr = retStr.substring(0,retStr.length-2);
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

// get details and update stats in the <td>'s of the result row
function fetchStatsForResultRow(rowElement, rowIndex) {
    // get the details url from the pokedex
    const requestAPI = pokedex[rowIndex].url; 
    
    fetch(requestAPI)
    .then(function (response) {
        return response.json();
    }).then(function(data){
        setBriefStats(data, rowElement, rowIndex);
    })
  }

// Sets brief stats on Main page
function setBriefStats(data, rowElement, pokemonIndex){
    const cells = rowElement.children;
    log(pokemonIndex);
    cells[MAIN_PAGE_COLUMNS.TYPE].textContent = getType(data.types);
    cells[MAIN_PAGE_COLUMNS.TOTAL].textContent = getTotalStat(data.stats);
    cells[MAIN_PAGE_COLUMNS.HP].textContent = data.stats[0].base_stat;
    cells[MAIN_PAGE_COLUMNS.ATTACK].textContent = data.stats[1].base_stat;
    cells[MAIN_PAGE_COLUMNS.DEFENSE].textContent = data.stats[2].base_stat;
    cells[MAIN_PAGE_COLUMNS.SPEC_ATTACK].textContent = data.stats[3].base_stat;
    cells[MAIN_PAGE_COLUMNS.SPEC_DEFENSE].textContent = data.stats[4].base_stat;
    cells[MAIN_PAGE_COLUMNS.SPEED].textContent = data.stats[5].base_stat;
    // this column contains the index number of the Pokemon in the Pokedex. 
    // it may be useful for calling the Details API when this row is clicked
    cells[MAIN_PAGE_COLUMNS.POKEMON_ID].textContent = pokemonIndex;

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
}

function setPokePhoto(pokedata){
    $('#poke-photo').attr("src",photoAPI);
}
