
// Aaron Binay
// 9/14/2024


// 1)
const coordinates = {
    x: 54.23,
    y: -98.41
}

const {x, y} = coordinates
console.log("secret coordinates found!", x,y);


// 2)
const locations = {
    first: "Oklahoma",
    second: "Canada",
    third: "My House",
    fourth: "The Moon"
}
const {first, second, ...remaining} = locations;
console.log("points of interest: [", first+",", second, "] unimportant:",remaining);


// 3)
const sequence = {
    first: 30,
    middle: undefined,
    last: 40
}
const decoded = {...sequence, middle: remaining.third}
console.log("door sequence:",decoded);


// 4)
const riddle = {
    ancientWord: "Hola",
    recentHistory: "Hello"
}
const {recentHistory: translation} = riddle
console.log("cryptic riddle:",translation);


// 5)
const library = [1,2,3,4];
const [firstNumber, secondNumber] = library;
console.log("library code:",firstNumber+", "+secondNumber);


// 6)
const riverOfReflection = ["stone1","stone2","stone3","stone4","stone5","stone6","stone7"];
const [stone1,,,,,stone6] = riverOfReflection
console.log(stone1+" & "+stone6+" have been located.");


// 7)
const caveOfShadows = ["tall shadow","secret1","secret2"];
const [firstShadow, ...theHidden] = caveOfShadows;
console.log("visible shadow:",firstShadow);
console.log("hidden shadows:",theHidden);


// 8)
function revealPath({origin, direction, distance}){
    const destination = {
        x: origin.x + direction.x * distance,
        y: origin.y + direction.y * distance,
    }
    console.log("new destination:", destination);
}
revealPath({
    origin: {x: 20,y: -10},
    direction: {x: 0.707, y: 0.707},
    distance: 40
});


// 9)
function mixPotion({ingredient1 = "Water", ingredient2 = "Fireflower"} = {}){
    console.log("potion created with: "+ingredient1+" & "+ingredient2);
}
mixPotion();
mixPotion({ingredient1: "salt", ingredient2: "vinegar"});


// 10)
function castSpell([i1,i2]){
    console.log("spell cast with: "+i1+" & "+i2);
}
castSpell(["floating feathers", "red roses", "salt", "vinegar"]);


// 11)
const hidden_secret = {A: undefined, B: {key: "Final Key"}};
function unconver_secret({B:{key: secret}}){console.log(secret);}
unconver_secret(hidden_secret);


// 12)
let slot1 = "StoneA"; let slot2 = "StoneB";
[slot1, slot2] = [slot2, slot1];
console.log("swapping:",slot1+" &",slot2)