document.addEventListener('DOMContentLoaded', function() {
    const searchBtnEl = document.getElementById('search-btn');
    const searchInputEl = document.getElementById('input-field');

    searchBtnEl.addEventListener('click', searchPokemon);
    searchInputEl.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchPokemon();
        }
    });

    async function searchPokemon() {
        const name = searchInputEl.value.trim().toLowerCase();
        
        const figureEl = document.getElementById('figure');
        const errorEl = document.getElementById('error-box');
        const imgEl = document.getElementById('pokemon-image');
        const nameEl = document.getElementById('pokemon-name');

        errorEl.style.display = 'none';
        errorEl.textContent = ''; 
        figureEl.style.display = 'none';
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            
            if (!response.ok) {
                throw new Error("Pokemon not found");
            }
            
            const data = await response.json();
            
            const imgSrc = data.sprites.front_default;
            imgEl.src = imgSrc;
            nameEl.textContent = data.name.toUpperCase();
            figureEl.style.display = 'block';
            searchInputEl.value = '';

        } catch (error) {
            const errorEl = document.getElementById('error-box');
            errorEl.textContent = "Oops! Pokemon not found. Try again.";
            errorEl.style.display = 'block';

            document.getElementById('figure').style.display = 'none';
            console.error(error);
        }
    }

    async function fetchPokemonList() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            const data = await response.json();
            const pokemonList = data.results;

            const pokemonNames = pokemonList.map(pokemon => capitalizeFirstLetter(pokemon.name));
            console.log("First 151 Pokémon:", pokemonNames);

        } catch (error) {
            console.error("Error fetching Pokémon list:", error);
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    fetchPokemonList();
});