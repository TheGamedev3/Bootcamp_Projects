
import {states,NB,getNode,areCousins,
    lowestCommonAncestor, getElementsByTagName,
    getElementsByClassName
} from "./BinaryTree.mjs";

// create binary tree
const origin = NB("Top", 2,
    NB("A", 8,
        NB("A1", -4),
        NB("A2", -9)
    ),
    NB("B", 0,
        NB("B1", 3,
            null,
            NB("B1-A", 3)
        ),
    )
)
states.origin = origin;
origin.display();

getNode("A").class = "Water";
getNode("Top").class = "Water";
getNode("A1").class = "Water";

getNode("A2").class = "Fire";
getNode("B").class = "Fire";

getNode("B1-A").class = "Earth";

const serial = origin.serialize();


// test all functions
// comment out the ones you don't want to test for

function print(...str){
    str.forEach(line => console.log(line+"\n"));
}print(
    
    `min depth: ${origin.minDepth()}`,
    `max depth: ${origin.maxDepth()}`,
    `max path sum: ${origin.maxSum()}`,
    
    `next largest after 4: ${origin.nextLarger(4).name} (${origin.nextLarger(4).value})`,
    
    `are A1 and A2 cousins?: ${areCousins(getNode("A1"),getNode("A2"))}`,
    `are A2 and B1 cousins?: ${areCousins(getNode("A2"),getNode("B1"))}`,
    
    `SERIAL: ${serial}`,
    // (deserial at the bottom)

    `LCA of A1 and A2?: ${lowestCommonAncestor(getNode("A1"),getNode("A2"))}`,
    `LCA of A2 and B1?: ${lowestCommonAncestor(getNode("A2"),getNode("B1"))}`,
    
    // getElementById is the "getNode" function
    `The "A" nodes:${getElementsByTagName("A").map(n => " "+n.name)}`,
    `The "Water" nodes:${getElementsByClassName("Water").map(n => " "+n.name)}`,
    `The "Fire" nodes:${getElementsByClassName("Fire").map(n => " "+n.name)}`,

);

// deserialize
console.log("recreated hierarchy:",states.origin.deserialize(serial))