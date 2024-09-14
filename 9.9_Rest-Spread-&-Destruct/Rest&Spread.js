
// Aaron Binay
// 9/14/2024


// 1)
function animals_spotted(...sightings){
    sightings.forEach(animal => console.log(animal,"spotted!"))
}
animals_spotted("dog", "cat", "fish");


// 2)
const habitatsA = ["chilly forest", "tall mountain", "fun lake"];
const habitatsB = ["lumpy hills", "flat plains", "winding river"];
const merged_habitats = [...habitatsA, ...habitatsB];
console.log("Protected Habitats:",merged_habitats);


// 3)
const Pandas = {
    population: 20,
    habitat: "the burning dessert"
}

const saved_Pandas = {...Pandas, population: 500, habitat: "lush bamboo forest"}
console.log("Panda Status:", saved_Pandas);


// 4)
const fly = {
    genetics: "A"
}
const fly2 = {...fly};
fly2.genetics = fly.genetics+"B"
console.log("Original Fly:", fly, "Mutated Fly:",fly2);

// observations: the original fly seems unaffected and the fly2 has the new modifications

// 5)
const habitatA = {
    water_supply: {
        temp: 40,
        ammount: "a lot"
    },
    animal_status: {
        population: 5
    }
}
const habitatA_2 = {...habitatA};
habitatA_2.water_supply.temp = 90;
console.log("Original Water Temp:", habitatA.water_supply.temp, "New Water Temp:",habitatA_2.water_supply.temp);

// observations: the nested arrays weren't copied during the shallow copy, but instead just referenced the originals
