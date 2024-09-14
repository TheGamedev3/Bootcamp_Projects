
// Aaron Binay
// 9/14/2024

// 1)
function activateHyperdrive(){
    console.log("Hyperdrive activated!");
}

// 2)
const scanForLife = () => ("No lifeforms detected");
console.log(scanForLife());

// 3)
const currentCoordinates = () => ({x: 4, y: 2, z: -1});
console.log("coords:", currentCoordinates());

// 4)
let spacecraft = {
    receiveMessage: (msg => console.log("Message received:",msg)),

    activate(){this.receiveMessage("Hello, from Earth!");}

    // it prints fine, it requires the "this" KW in front of the function when within the object
    // if "this" was used within the arrow function "receiveMessage" however, it would fail
}

spacecraft.activate();