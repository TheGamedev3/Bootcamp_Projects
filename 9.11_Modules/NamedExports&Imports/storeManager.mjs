import {displayContents, addItem, removeItem} from "./inventory.mjs"

displayContents();

addItem("Pencil");
addItem("Paper");
addItem("Pen");

displayContents();

removeItem("Pen");

displayContents();