
export var listItems = [];

export function addItem(item){
    console.log("+",item);
    listItems.push(item);
}

export function removeItem(item){
    console.log("-",item);
    const i = listItems.indexOf(item);
    listItems.splice(i,1);
}

export function displayContents(){
    if(listItems.length === 0){
        console.log("empty inventory!");
        return
    }
    console.log("inventory:",listItems);
}