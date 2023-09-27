// console.log("connected fetch");
const BASE_URL = "https://pokeapi.co/api/v2/";

// Fetch no async
// fetch(BASE_URL+"pokemon/ditto")
//     .then(res=>res.json())
//     .then(data=>console.log(data))

// Fetch async
const fetchPokemon = async (pokemon) => {
    try{
        // const response = await fetch(BASE_URL+"pokemon/ditto");
        const response = await fetch(BASE_URL+"pokemon/"+pokemon);

        const parsedResponse = await response.json();
        localStorage.setItem('currentPokeID',parsedResponse.id);
        return parsedResponse;
    }
    catch(err){
        console.log(err);
    }
}
//Obtener pokemon
document.getElementById('get-btn')
    .addEventListener('click',async () =>{
        const text = document.getElementById("poke-name").value.toLowerCase();
        const pokemon = await fetchPokemon(text)
        console.log(pokemon.name);
        await joinProcess(pokemon);
    })



const CARD_SECTION = document.getElementById('profiles');

////////////////////////////////////////
// - Obtener la info
// - Crear un contenedor para perfil clase = profile
// - Crear elemento para user_name
// - "" "" para description 
// - "" "" age
///  - "" " " lista de bandas. --> iterar por cada banda

const createCard = () => {
    const card = document.createElement('div');
    return card;
}


const createDescription = () => {
    const pokeElements = {
        pokemon_name: document.createElement('h2'),
        id: document.createElement('h3'),
        ability: document.createElement('p'),
        image: document.createElement('img')
    }
    return pokeElements;
}

const populateElements = (pokemon, pokeElements) => {
    pokeElements.pokemon_name.textContent = pokemon.name;
    pokeElements.id.textContent = "ID: " + String(pokemon.id);
    pokeElements.ability.textContent = "Habilidad: "+String(pokemon.abilities[0].ability.name);
    pokeElements.image.src = pokemon.sprites.front_default;
    return pokeElements;
}


const renderElements = (pokemon, pokeElements) => {
    pokemon.append(pokeElements.pokemon_name, pokeElements.id, pokeElements.ability,pokeElements.image);
}

const joinProcess = (pokemon) => {
    CARD_SECTION.innerHTML = ""; //Limpia el contenido del div
    const card = createCard();  //Se inician los procesos que hicimos en el JS-06
    const pokeElements = createDescription();

    const elementsWithData = populateElements(pokemon, pokeElements);
    renderElements(card, elementsWithData);
    CARD_SECTION.append(card);
}

document.addEventListener('DOMContentLoaded',async ()=>{
    const storeId = localStorage.getItem('currentPokeID');
    const initialId = storeId ? parseInt(storeId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon);
    console.log(pokemon.abilities[0].ability.name);
    await joinProcess(pokemon);
})

//Obtener anterior
document.getElementById('previous-btn')
    .addEventListener('click',async ()=>{
        const currentPokeId = parseInt(localStorage.getItem("currentPokeID"));
        const newId = Math.max(1,currentPokeId-1);
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
        await joinProcess(pokemon);
    })

//Obtener siguiente
document.getElementById('next-btn')
    .addEventListener('click',async ()=>{
        const currentPokeId = parseInt(localStorage.getItem("currentPokeID"));
        const newId = currentPokeId+1;
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
        await joinProcess(pokemon);
    })

//POST
fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type':'application/json; charset=UTF-8',
    }
}).then(res=>res.json()).then(json=>console.log(json));

//Ejercicios
//1 Arreglar el pokemon en localstorage ✓✓
// - Manipular el dom y agregar una tarjeta del pokemon. 
// - EL tamaño e info de la tarjeta es a consideración personal
// - La info para la tarjeta viene del local storage

