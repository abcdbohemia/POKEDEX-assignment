// pokeapi.co maxes at id of 893.
const maxPokemonID = 893;
const minPokemonID = 1;

function genPokemonID() {
    return Math.floor(Math.random() * (maxPokemonID - minPokemonID) + minPokemonID)
}

function genPokemonIDs(numberOfIDs) {
    const pokemonIDs = []
    for (let i = 0; i < numberOfIDs; i++) {
        const pokemonID = genPokemonID()
        pokemonIDs.push(pokemonID)
    }
    return pokemonIDs
}

async function fetchManyPokemon(count) {
    const pokemonIDs = genPokemonIDs(count)
    const promises = pokemonIDs.map(pokemonID => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    })
    // TODO: Deal with rejected promises.
    let responses = await Promise.all(promises)
    let pokemon = await Promise.all(responses.map(response => {
        return response.json();
    }))
    pokemon = pokemon.map(p => {
        let abilities = p.abilities.map(ability => {
            return ability.ability.name
        });
        return new Pokemon(p.name, p.sprites.front_default, abilities)
    })
    return pokemon
}

class Pokemon {
    constructor(name, imageURL, abilities) {
        this.name = name;
        this.imageURL = imageURL;
        this.abilities = abilities
    }
}

fetchManyPokemon(10).then(pokemon => console.log(pokemon))
