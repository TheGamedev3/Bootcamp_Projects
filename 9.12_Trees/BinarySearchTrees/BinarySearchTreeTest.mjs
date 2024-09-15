import {BinarySearchTree, findSecondHighest} from "./BinarySearchTree.mjs"

var BST1 = new BinarySearchTree();

BST1.insertRecursively(4);
BST1.insert(1);
BST1.insert(6);
BST1.insertRecursively(5);
BST1.insertRecursively(10);
BST1.insert(21);
BST1.insertRecursively(0);
BST1.insert(-4);
BST1.insert(-3);

// node
//      left
//      right
BST1.display();


function print(...lines){
    lines.forEach(line => console.log(line+"\n"));
}print(

    `found node 10 loopy! ${BST1.findIteratively(10).value}`,
    `found node -4 recursively! ${BST1.findRecursively(-4).value}`,
    `there is no node 98! (${BST1.findIteratively(98)})`,

    `dfs pre order ${BST1.dfsPreOrder().map(n => n.value)}`,
    
    `dfs in order ${BST1.dfsInOrder().map(n => n.value)}`,
    `dfs in order iter ${BST1.dfsInOrderIteratively().map(n => n.value)}`,
    
    `dfs post order ${BST1.dfsPostOrder().map(n => n.value)}`,
    `bfs order ${BST1.bfs().map(n => n.value)}`,

    `is balanced? ${BST1.isBalanced()}`,

    `second highest number: ${findSecondHighest(BST1).value}`,
    
)


BST1.remove(6);
BST1.remove(1);
BST1.remove(0);

console.log("6 , 1, and 0  removed!");
BST1.display();
