
let API = "https://pokeapi.co/api/v2";
let $btn = $("button");
let $pokeArea = $("#pokemon-area");

$btn.on("click", start);
async function start(){

$pokeArea.empty();

// Part 1, make a request, get all names and urls for all pokemon
let all_pokemon = await $.getJSON(`${API}/pokemon/?limit=1000`);
console.log(all_pokemon);

// Part 2, pick 3 of those at random, and get their data
function pick(){
    let arr = all_pokemon.results;
    if(arr.length === 0){ return null; }
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr.splice(randomIndex, 1)[0];
}
let picked = []; // Example array
for(let i = 0; i < 3; i++){
  picked.push(await $.getJSON(pick()));
}
console.log(`Picked pokemons: `, picked);

// Part 3, picked -> .species URL, flavor text entry
let flavored = false;
for(const poke of picked){
    const species = await $.getJSON(poke.species.url);

    let desc = species.flavor_text_entries.find(
    entry => entry.language.name === "en"
    );

    const name = poke.name;
    if(desc != undefined){
        flavored = true;
        desc = desc.flavor_text;
        console.log(`${name}: ${desc}`);
    }else{
        desc = "";
    }
    const image = poke.sprites.front_default;
    create_card(name,image,desc);

}
if(!flavored){console.log("(no flavor text found)");}
  
// Part 4, style the cards
function create_card(name,imgSrc,description){
    const cardCSS = `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
    $pokeArea.append(cardCSS);
}

}
