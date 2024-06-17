// Common data

const POKEAPI = {
    URL_SEARCH_BY_TYPE: "https://pokeapi.co/api/v2/type/",
    URL_SEARCH_BY_NAME: "https://pokeapi.co/api/v2/pokemon/",
    URL_GET_INDEX_OF_ALL: "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0"
}

const MAIN_PAGE_COLUMNS = {
    NAME: 0,
    TYPE: 1,
    TOTAL: 2,
    HP: 3,
    ATTACK: 4,
    DEFENSE: 5,
    SPEC_ATTACK: 6,
    SPEC_DEFENSE: 7,
    SPEED: 8,
    POKEMON_ID: 9
}

const STRINGS = {
    INDEX_IN_LOCAL_STORAGE: "localPokedex",
    POKEDEX_IN_LOCAL_STORAGE: "localPokedex",
    RAW_POKEDEX: "rawPokedex"
}

function firstLetterCapitalize(string){
    let retString = string[0].toUpperCase();
    retString+=string.substring(1);
    return retString;
}
