
class Node{
    left = null;
    right = null;
    
    constructor(tree, value){
        this.value = value;
        this.tree = tree;
        this.root = tree.root
    }

    static isNull(node){
        return node == null || node == undefined;
    }

    display(layer = 0){
        let dots = "    ";
        if(layer == 0){
            dots = "";
            console.log("");
        }else{
            dots = dots.repeat(layer);
            dots+=" ";
        }
        console.log(dots+`(${this.value})`);
        if(!Node.isNull(this.left) || !Node.isNull(this.right)){
            
            const emptyString = "    ".repeat(layer+1)+" [empty]";
            if(!Node.isNull(this.left)){
                this.left.display(layer+1);
            }else{
                console.log(emptyString);
            }
            if(!Node.isNull(this.right)){
                this.right.display(layer+1);
            }else{
                console.log(emptyString);
            }
        }
        if(layer == 0){
            dots = "";
            console.log("");
        }
    }
}
export class BinarySearchTree{
    root = null;

    newNode(n){
        const node = new Node(this,n);
        if(this.root == null){
            this.root = node;
            return null;
        } return node;
    }
    display(){
        this.root.display();
    }
    // 0 - continue, 1 - equal, 2 - empty spot
    static flip(at,n,finding = false){
        let destiny = "left";
        if(n == at.value && finding){
            return [1, at]
        }else if(n >= at.value){
            destiny = "right";
        }
        if(at[destiny] === null){
            return [2, destiny]
        }else{
            return [0, destiny]
        }
    }
    insert(n){
        const NN = this.newNode(n);
        if(NN == null){return}
        let at = this.root;
        const ME = this;
        while(true){
            let [state, dir] = BinarySearchTree.flip(at,n);
            if(state === 2){
                at[dir] = NN;
                break;
            }else{
                at = at[dir];
                continue;
            }
        }
    }
    insertRecursively(n){
        const NN = this.newNode(n);
        if(NN == null){return}
        const ME = this;
        function recurse(at){
            let [state, dir] = BinarySearchTree.flip(at,n);
            if(state === 2){
                at[dir] = NN;
            }else{
                recurse(at[dir]);
            }
        } recurse(this.root);
    }

    findIteratively(n){
        let at = this.root;
        while(true){
            if(at === null || at === undefined){return undefined;}
            let [state, dir] = BinarySearchTree.flip(at,n,true);
            if(state === 1){
                return at;
            }else{
                at = at[dir];
                continue;
            }
        }
    }
    findRecursively(n){
        function recurse(at){
            if(at === null || at === undefined){return undefined;}
            let [state, dir] = BinarySearchTree.flip(at,n,true);
            if(state === 1){
                return at;
            }else{
                return recurse(at[dir]);
            }
        } return recurse(this.root);
    }

    dfsPreOrder(){
        const orderedNodes = [];
        function ins(node){
            if(Node.isNull(node)){return;}
            orderedNodes.push(node);
            ins(node.left);
            ins(node.right);
        }
        ins(this.root)
        return orderedNodes;
    }
    dfsInOrder(){
        const orderedNodes = [];
        function ins(node){
            if(Node.isNull(node)){return;}
            ins(node.left);
            orderedNodes.push(node);
            ins(node.right);
        }
        ins(this.root)
        return orderedNodes;
    }
    dfsInOrderIteratively(){
        const orderedNodes = [];
        const visited = [];
        const path = [];
        let at = this.root;
        while(true){
            const numbers = [at,at.left,at.right];
            let localLeast = -1;
            numbers.forEach(n => {
                if(Node.isNull(n)){return;}
                if(visited.find(a => a===n)){return;}
                if(localLeast === -1){
                    localLeast = n;
                }else if(n.value < localLeast.value){
                    localLeast = n;
                }
            });
            if(localLeast === -1){
                if(path.length === 0){break;}
                at = path.pop();
            }else{
                if(localLeast === at){
                    // only fires if its the very least
                    visited.push(at);
                    orderedNodes.push(at);
                }
                path.push(at);
                at = localLeast;
            }
        }
        return orderedNodes;
    }
    dfsPostOrder(){
        const orderedNodes = [];
        function ins(node){
            if(Node.isNull(node)){return;}
            ins(node.left);
            ins(node.right);
            orderedNodes.push(node);
        }
        ins(this.root)
        return orderedNodes;
    }
    isBalanced(){
        const originalRoot = this.root;
        this.root = originalRoot.left;
        const sizeA = this.dfsPreOrder().length;
        this.root = originalRoot.right;
        const sizeB = this.dfsPreOrder().length;
        this.root = originalRoot;
        return (sizeA === sizeB).toString()+": "+sizeA+" vrs "+sizeB
    }

    bfs(){
        const orderedNodes = [];
        function scanLayer(currentLayer){
            if(currentLayer.length === 0){return;}
            const nextLayer = [];
            currentLayer.forEach(n => {
                orderedNodes.push(n);
                if(!Node.isNull(n.left)){
                nextLayer.push(n.left)}
                if(!Node.isNull(n.right)){
                nextLayer.push(n.right)}
            });
            scanLayer(nextLayer);
        }
        scanLayer([this.root]);
        return orderedNodes
    }

    remove(n){
        let at = this.root;
        let found = null;
        let next = null;
        let dir = "left"
        while(true){
            [, dir] = BinarySearchTree.flip(at,n);
            next = at[dir];
            if(Node.isNull(next) || next.value === n){
                found = next;
                break;
            }
            at = next;
            continue;
        }
        if(Node.isNull(found)){return;}
        // find its parent
        if(!Node.isNull(found.right)){
            at[dir] = found.right;

            if(!Node.isNull(found.left)){
                // get leftmost
                let lefty = found.right;
                while(true){
                    const result = lefty.left;
                    if(Node.isNull(result)){break;}
                    lefty = result;
                }
                lefty.left = found.left;
            }
        }else{
            at[dir] = found.left;
        }
    }
}

export function findSecondHighest(BST){
    if(BST === null){return null;}
    const array = BST.dfsInOrder();
    if(array.length < 2){return null;}
    return array[array.length-2];
}