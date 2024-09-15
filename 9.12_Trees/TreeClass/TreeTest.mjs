
import {states,NT,getNode} from "./Tree.mjs";

// create tree
const origin = NT("Top", 2,
    NT("A", 4,
        NT("A1", 1),
        NT("A2", 0)
    ),
    NT("B", 8,
        NT("B1", -4),
        NT("B2", -9),
        NT("B3", 11)
    ),
    NT("C", 0)
)
states.origin = origin;
origin.display();



// test all functions
function print(...str){
    str.forEach(line => console.log(line+"\n"));
}print(
    `sum: ${origin.sumValues()}`,
    `evens: ${origin.countEvens()}`,
    `nodes greater than 5 in node B's branch: ${(getNode("B").numGreater(5))}`,
);