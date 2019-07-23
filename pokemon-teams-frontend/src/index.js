const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const mainContainer = document.querySelector("main");

function getTrainers(){
    return fetch(TRAINERS_URL)
        .then(resp => resp.json())
}

function getTrainerPokemons(trainerID) {
    return fetch(`${TRAINERS_URL}/${trainerID}`).then(resp => resp.json());
}

function renderTrainers() {
    return getTrainers().then(trainers => {
        trainers.forEach(trainer => {
            console.log(trainer.name);
            const divContainer = document.createElement("div");
            divContainer.className = "card";
            divContainer.dataset.id = trainer.id;
            
            const trainerNamePTag = document.createElement("p");
            trainerNamePTag.innerText = trainer.name;
            divContainer.appendChild(trainerNamePTag);
            
            const addPokemonButton = document.createElement("button");
            addPokemonButton.innerText = "Add pokemon";
            addPokemonButton.className = "add-pokemon-button";
            addPokemonButton.dataset.id = trainer.id;


            divContainer.appendChild(addPokemonButton);

            const listPokemon = document.createElement("ul");
            divContainer.appendChild(listPokemon);

            getTrainerPokemons(trainer.id).then(pokemons => {
                pokemons.forEach(pokemon => {
                    const pokemonLI = document.createElement("li");
                    pokemonLI.innerText = pokemon.nickname;
                    
                    const pokemonReleaseButton = document.createElement("button");
                    pokemonReleaseButton.innerText = "Release";
                    pokemonReleaseButton.className = "release";
                    pokemonReleaseButton.dataset.id = pokemon.id;
                    pokemonReleaseButton.addEventListener('click', (event) => {
                        fetch(`${POKEMONS_URL}/${pokemon.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                "trainer_id": ""
                            })
                        }).then(()=> {
                            pokemonLI.remove();
                        })
                    })

                    pokemonLI.appendChild(pokemonReleaseButton);
                    listPokemon.appendChild(pokemonLI);
                })
            })
            mainContainer.appendChild(divContainer);
            console.log("trainers rendered");

        })
    })
}

renderTrainers();

function releasePokemon(event) {
 console.log(e.target)
}

function addPokemon(event) {

}

// document.addEventListener("DOMContentLoaded", () => {
//     const anyReleaseButton = document.querySelectorAll(".release");
//     anyReleaseButton.addEventListener('click', releasePokemon);

//     const anyAddPokemonButton = document.querySelectorAll(".add-pokemon-button");
//     anyAddPokemonButton.addEventListener('click', addPokemon);
// })

