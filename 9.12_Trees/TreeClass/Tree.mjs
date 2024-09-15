
export class Tree{

    constructor(name, value,...children){
        this.name = name;
        this.value = value;
        this.children = children;
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
        this.children.forEach(node => node.display(layer+1));
        if(layer == 0){
            dots = "";
            console.log("");
        }
    }

    traverse(callable, layer = 0){

        // node, value, layer
        callable(this, this.value, layer);
        this.children.forEach(node => node.traverse(callable,layer+1));
    
    }

    findName(name){
        let foundN = null;
        this.traverse(function finder(n,v,l){
            if(foundN != null){return;}
            if(n.name === name){foundN = n; return;}
        });
        return foundN;
    }

    sumValues(){
        let sum = 0;
        this.traverse(function summer(n,v,l){
            sum+=v;
        });
        return sum;
    }

    countEvens(){
        let count = 0;
        this.traverse(function counter(n,v,l){
            if(v % 2 == 0){count += 1;}
        });
        return count;
    }

    numGreater(x){
        let count = 0;
        this.traverse(function counter(n,v,l){
            if(v > x){count += 1;}
        });
        return count;
    }
}

export function NT(name,...children){
    return new Tree(name,...children);
}

export const states = {
    origin: null
}
export function getNode(name){
    if(states.origin == null){return;}
    return states.origin.findName(name);
}