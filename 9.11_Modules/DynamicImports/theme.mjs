
export var light = true;

export function setLightTheme(){
    light = true;
    console.log("lights on");
}

export function setDarkTheme(){
    light = false;
    console.log("lights off");
}