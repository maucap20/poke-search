//DEPENDENCIES



const requestAPI = POKEAPI.URL_SEARCH_BY_NAME + '125'; 
let photoAPI = "https://img.pokemondb.net/artwork/" ;



fetch(requestAPI)
.then(function (response) {
    return response.json();
}).then(function(data){
    const pokedata = data;

    photoAPI += pokedata.name + ".jpg";

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
    setBarLength('#HP-stat-bar', data[0].base_stat);
    $('#HP-min-stat').text(HPMinStatFormula(data[0].base_stat));
    $('#HP-max-stat').text(HPMaxStatFormula(data[0].base_stat));

    $('#Atk-growth-stat').text(data[1].base_stat);
    setBarLength('#Atk-stat-bar', data[1].base_stat);
    $('#Atk-min-stat').text(otherMinStatFormula(data[1].base_stat));
    $('#Atk-max-stat').text(otherMaxStatFormula(data[1].base_stat));

    $('#Def-growth-stat').text(data[2].base_stat);
    setBarLength('#Def-stat-bar', data[2].base_stat);
    $('#Def-min-stat').text(otherMinStatFormula(data[2].base_stat));
    $('#Def-max-stat').text(otherMaxStatFormula(data[2].base_stat));

    $('#SPAtk-growth-stat').text(data[3].base_stat);
    setBarLength('#SPAtk-stat-bar', data[3].base_stat);
    $('#SPAtk-min-stat').text(otherMinStatFormula(data[3].base_stat));
    $('#SPAtk-max-stat').text(otherMaxStatFormula(data[3].base_stat));

    $('#SPDef-growth-stat').text(data[4].base_stat);
    setBarLength('#SPDef-stat-bar', data[4].base_stat);
    $('#SPDef-min-stat').text(otherMinStatFormula(data[4].base_stat));
    $('#SPDef-max-stat').text(otherMaxStatFormula(data[4].base_stat));

    $('#spd-growth-stat').text(data[5].base_stat);
    setBarLength('#spd-stat-bar', data[5].base_stat);
    $('#spd-min-stat').text(otherMinStatFormula(data[5].base_stat));
    $('#spd-max-stat').text(otherMaxStatFormula(data[5].base_stat));


    $('#tot-growth-stat').text(getTotalStat(data));
   

}

function setBarLength(id, base_stat){
    let barLength = base_stat / 1.8;
  
    if(barLength < 30){
        $(id).css('background-color', 'red');
    }else if(barLength < 50){
        $(id).css('background-color', 'yellow');
    }else{
        $(id).css('background-color', 'green');
    }
    

    $(id).css('width', barLength+'%');
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
