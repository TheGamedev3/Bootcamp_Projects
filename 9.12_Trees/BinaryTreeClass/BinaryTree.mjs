
export class BinaryTree{

    constructor(name, value, left = null, right = null){
        this.name = name;
        this.value = value;
        this.left = left;
        this.right = right;
    }
    isNull(node){
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
        console.log(dots+this.name+` (${this.value})`);
        if(!this.isNull(this.left) || !this.isNull(this.right)){
            
            const emptyString = "    ".repeat(layer+1)+" [empty]";
            if(!this.isNull(this.left)){
                this.left.display(layer+1);
            }else{
                console.log(emptyString);
            }
            if(!this.isNull(this.right)){
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

    traverse(callable, layer = 0){

        // node, value, layer, leaf
        callable(this, this.value, layer, this.isNull(this.left) && this.isNull(this.right));

        if(!this.isNull(this.left)){
            this.left.traverse(callable,layer+1);
        }
        if(!this.isNull(this.right)){
            this.right.traverse(callable,layer+1);
        }
    }

    // (binary trees don't inherently support parent pointers)
    parent(){
        let foundN = null;
        const ME = this;
        states.origin.traverse(function finder(n,v,y,l){
            if(foundN != null){return;}
            if(n.left === ME || n.right === ME){foundN = n; return;}
        });
        return foundN;
    }

    traverseUp(callable){
        callable(this);
        const p = this.parent();
        if(p != null){p.traverseUp(callable);}
    }

    findName(name){
        let foundN = null;
        this.traverse(function finder(n,v,y,l){
            if(foundN != null){return;}
            if(n.name === name){foundN = n; return;}
        });
        return foundN;
    }
    findNames(name){
        const foundN = [];
        this.traverse(function finder(n,v,y,l){
            if(n.name.startsWith(name)){foundN.push(n);}
        });
        return foundN;
    }
    findClasses(className){
        const foundN = [];
        this.traverse(function finder(n,v,y,l){
            if(n.class === className){foundN.push(n);}
        });
        return foundN;
    }

    minDepth(){
        let minist = -1;
        this.traverse(function (n,v,y,l){
            if(l && (minist === -1 || y < minist)){
                minist = y;
            }
        });
        return minist;
    }

    maxDepth(){
        let maxist = 0;
        this.traverse(function (n,v,y,l){
            if(l && (y >= maxist)){
                maxist = y;
            }
        });
        return maxist;
    }

    maxSum(){
        const all_paths = [];
        this.traverse(function (n,v,y,l){
            if(l){
                all_paths.push(0);
                n.traverseUp(function(harky){
                    all_paths[all_paths.length-1] += harky.value;
                })
            }
        });
        if(all_paths.length === 0){return -1;}
        return [Math.max(...all_paths)+", all path sums: "+all_paths];
    }

    nextLarger(x){
        let foundN = null;
        this.traverse(function finder(n,v,y,l){
            if(foundN != null){return;}
            if(n.value > x){foundN = n; return;}
        });
        return foundN;
    }

    serialize(object = null){
        let first = false;
        if(object === null){
            first = true;
            object = {};
        }
        object.name = this.name;
        object.value = this.value;
        object.class = this.class;
        object.left = {};
        object.right = {};
        if(!this.isNull(this.left)){
            this.left.serialize(object.left);
        }else{object.left = null;}
        if(!this.isNull(this.right)){
            this.right.serialize(object.right);
        }else{object.right = null;}
        if(first){return JSON.stringify(object);}
    }

    deserialize(stringy){
        const parsed = JSON.parse(stringy);
        function recreate(nodeData){
            if(nodeData === null){return;}
            const newTree = new BinaryTree(nodeData.name,nodeData.value,
                recreate(nodeData.left),
                recreate(nodeData.right)
            );
            if(nodeData.class != undefined){
                newTree.class = nodeData.class;
            }
            return newTree;
        }
        return recreate(parsed);
    }
}

export function NB(name, value, left, right){
    return new BinaryTree(name, value, left, right);
}

export const states = {
    origin: null
}
export function getNode(name){
    if(states.origin == null){return;}
    return states.origin.findName(name);
}
export function getElementsByTagName(name){
    if(states.origin == null){return;}
    return states.origin.findNames(name);
}
export function getElementsByClassName(name){
    if(states.origin == null){return;}
    return states.origin.findClasses(name);
}

function isNull(node){
    return node == null || node == undefined;
}

export function areCousins(nodeA, nodeB){
    if(isNull(nodeA) || isNull(nodeB)){return false;}
    if(nodeA.parent() === nodeB.parent()){return false;}
    if(isNull(nodeA.parent()) || isNull(nodeB.parent())){return false;}
    if(nodeA.parent().parent() === nodeB.parent().parent()){return true;}
}

export function lowestCommonAncestor(A, B){
    if(isNull(A) || isNull(B)){return null;}
    let LCA = null;
    const myLineage = [];
    A.traverseUp(function(ancestor){
        myLineage.push(ancestor);
    });
    B.traverseUp(function(ancestor){
        if(LCA != null){return;}
        if(myLineage.find(a => a == ancestor)){
            LCA = ancestor;
        }
    });
    return LCA.name;
}