const endPoint = ' https://pokeapi.co/api/v2/pokemon?limit=1000000&offset=0';
const spritesCollection = document.querySelector('.sprites-collection');
const input = document.querySelector('.search-bar');

const fetchData = async () => {
    let response = await fetch(endPoint);
    let data = await response.json();
    let pokemons = data.results; 

    input.addEventListener('input', event => {
        const query = event.target.value.toLowerCase();

        if (query.length === 0) {
            spritesCollection.innerHTML = '';
            return;
        }

        const filteredPokemons = pokemons.filter(pokemon => pokemon.name.startsWith(query));
        
        spritesCollection.innerHTML = '';
        
        filteredPokemons.forEach(pokemon => {
            fetch(pokemon.url)
                .then(response => {
                    if(!response.ok) throw new Error(`sprite not found for ${pokemon.name}`);
                    return response.json();
                })
                .then(data => {
                    let spriteUrl = data.sprites.other.dream_world.front_default;
                    if(!spriteUrl) throw new Error(`No sprite available for ${pokemon.name}`);
                    
                    let sprite = document.createElement('img');
                    sprite.src = spriteUrl;
                    sprite.classList.add('pokemon');

                    spritesCollection.append(sprite);
                })
                .catch(error => console.error(error));
        }); 
    });
}
fetchData();

