
// Aaron Binay
// 9/16/2024

// show box color
// set/get box color
// click to add box
// double click box to remove itself
document.addEventListener("DOMContentLoaded", function (){

const [colorForm, colorInput, newBoxButton, boxContainer] =
["color-form", "color-input", "new-box-button", "box-container"].map(
    id => document.getElementById(id)
);

var boxColor = "red";
function updateColor(){
    boxColor = colorInput.value;
    if(boxColor === ""){return}
    boxContainer.querySelectorAll(".box").forEach(box => {
        box.style.backgroundColor = boxColor;
    });
    colorInput.value = "";
}
colorForm.addEventListener("submit",(event => {
    event.preventDefault();
    updateColor();
}));

newBoxButton.addEventListener("click", createBox);

let boxIdCounter = 0;
function createBox(){
    boxIdCounter++;
    const box = document.createElement("div");
    let myName = "box "+boxIdCounter;
    box.textContent = myName;
    box.className = "box";
    box.style.backgroundColor = boxColor;
    box.id = myName;
    boxContainer.appendChild(box);
}
createBox(); createBox(); createBox();

// event delegation
function getBox(event, boxElement){
    const b = event.target;
    if(b.className != "box"){return;}
    boxElement(b);
}
document.addEventListener("pointerover",(event)=>{getBox(event,(box)=>
    box.textContent = `x: ${event.pageX}, y: ${event.pageY}`
)});
document.addEventListener("pointerout",(event)=>{getBox(event,(box)=>
    box.textContent = box.id
)});
document.addEventListener("dblclick",(event)=>{getBox(event,(box)=>
    box.remove()
)});
document.addEventListener("keypress",(key)=>{
    if(key.code === "KeyN"){createBox();}
});

})