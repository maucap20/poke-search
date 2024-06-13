# Understanding Pokeapi data

Pokeapi is a public api at https://pokeapi.co/?ref=public_apis

## Uses in this project

### search pokemon by type

Return an array of pokemon of the specified type

*parameter(s)*
- type  an integer corresponding to a type, e.g. 3 is for "flying"

*returns*

MORE INFO ABOUT THIS - IN A GOOGLE DOC - maybe we should bring the contents of the doc into this file?
https://docs.google.com/document/d/1sa5toRNpeIZj5x-6NWrtX1FuIHIHn5GetmjooMZQd8o/edit#heading=h.s8xg0a3lty4l



**note** the example page https://pokemondb.net/pokedex/all may give the impression that the API for searching by name will match a partial name, 
e.g. enter "ch" in the "Name" field and the list immediately changes to show only those pokemon with "ch" in the name. However, it does not. That page is 
- calling the search by name API with a blank value for name
- retreiving 1300+ pokemon
- for every returned pokemon, calling another API to get details
- after every keystroke event in the name field, filtering the pokemon that are *displayed*, with no effect on the underlying data

The page responds instantly, so the data must cached; it would not be that fast if we made all those calls!
