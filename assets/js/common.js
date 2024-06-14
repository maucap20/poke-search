// Common data

const POKEAPI = {
    URL_SEARCH_BY_TYPE: "https://pokeapi.co/api/v2/type/",
    URL_SEARCH_BY_NAME: "https://pokeapi.co/api/v2/pokemon/",
    URL_GET_INDEX_OF_ALL: "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0"
}

const STRINGS = {
    INDEX_IN_LOCAL_STORAGE: "localPokedex",
    POKEDEX_IN_LOCAL_STORAGE: "localPokedex",
    RAW_POKEDEX: "rawPokedex"
}
// utility functions
function log(msg) { console.log(msg);}