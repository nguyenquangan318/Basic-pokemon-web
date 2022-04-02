const pokedex = document.getElementById('pokedex');
const searchBar = document.getElementById('searchBar');
let pokemon = [];
searchBar.addEventListener('keyup', (poke) =>{
    const searchString = poke.target.value.toLowerCase();
    const filterPokemon = pokemon.filter( (pokemon) =>{
        return (
        pokemon.name.toLowerCase().includes(searchString) ||
        pokemon.type.toLowerCase().includes(searchString)
    );
    })
    displayPokemon(filterPokemon);
    if(filterPokemon.length == 0){
        pokedex.innerHTML=`<p> No pokemon found</p>`;
    }
})

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(
            fetch(url)
            .then((res) => res.json())
            );
    }
    Promise.all(promises).then((results) => {
        pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
