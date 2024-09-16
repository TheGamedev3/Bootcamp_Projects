
var ids = {}
class Node {
    constructor(value, ...nodes) {
      this.value = value;
      this.adjacent = new Set();
      if(nodes.length != 0){
      this.adjacent.add(...nodes);
    }}
}

export function P(pointName,...args){
    const found = ids[pointName];
    if(found != undefined && found != null){return found;}
    const newPoint = new Node(pointName,...args);
    ids[pointName] = newPoint;
    return newPoint;
}

export function toName(array){
    return array.map(m => m.value);
}
  
export class Graph {
    constructor() {
      this.nodes = new Set();
    }
  
    // this function accepts a Node instance and adds it to the nodes property on the graph
    addVertex(vertex) {
        if(this.nodes.has(vertex)){return;}
        this.nodes.add(vertex)
        const me = this;
        vertex.adjacent.forEach(a => {
            me.addVertex(a);
        });
    }
  
    // this function accepts an array of Node instances and adds them to the nodes property on the graph
    addVertices(vertexArray) {
      this.nodes.add(...vertexArray)
    }
  
    // this function accepts two vertices and updates their adjacent values to include the other vertex
    addEdge(v1, v2) {
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    }
  
    // this function accepts two vertices and updates their adjacent values to remove the other vertex
    removeEdge(v1, v2) {
        v1.adjacent.delete(v2);
        v2.adjacent.delete(v1);
    }
  
    // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
    removeVertex(...vertex) {
        const me = this;
        vertex.forEach(v => {
            v.adjacent.forEach(e => {
                me.removeEdge(v,e);
            })
            me.nodes.delete(v);
        });
    }
  
    // this function returns an array of Node values using BFS
    breadthFirstSearch(start = null) {
        if(this.nodes.size === 0){return [];}
        if(start === null){
            start = [...this.nodes][0]
        }
        const orderedNodes = [];
        let newEntries = true;
        let currentLayer = []; let currentLayer2 = [start];
        function scanLayer(){
            currentLayer.forEach(n => {
                if(orderedNodes.find(N => N === n)){return;}
                orderedNodes.push(n);
                currentLayer2.push(...n.adjacent);
                newEntries = true;
            });
        }
        while(true){
            if(!newEntries){break;}
            newEntries = false;
            currentLayer = currentLayer2;
            currentLayer2 = [];
            scanLayer();
        }
        return orderedNodes;
    }
    // this function returns an array of Node values using DFS
    depthFirstSearch(start = null){
        if(this.nodes.size === 0){return [];}
        if(start === null){
            start = [...this.nodes][0]
        }
        const orderedNodes = [];
        function nextNode(n){
            orderedNodes.push(n);
            n.adjacent.forEach(a => {
                if(orderedNodes.find(A => A === a)){return;}
                nextNode(a)
            });
        } nextNode(start);
        return orderedNodes;
    }

    shortestPath(source, target){

        // broken this is depth not bredth

        if(source === target){return [source];}
        const explored = new Set();
        let pathFound = null;
        const queue = new Set();
        let fireAgain = true;
        function branch(a, myPath = []){
            if(pathFound != null || explored.has(a)){return;}
            const pathway = [...myPath];
            pathway.push(a);
            explored.add(a);
            if(a === target){pathFound = pathway; fireAgain = false; return;}
            a.adjacent.forEach(a => queue.add([a, pathway]));
            fireAgain = true;
        } queue.add([source,[]]);

        while(true){
            if(!fireAgain){break;}
            fireAgain = false;
            queue.forEach(v => branch(v[0],v[1]));
        }

        return pathFound;
    }
    hasCycle(start = null) {
        if(this.nodes.size === 0){return false;}
        if(start === null){
            start = [...this.nodes][0]
        }
        const orderedNodes = new Set();
        let result = false;
        function nextNode(n,pre=null){
            if(result){return;}
            orderedNodes.add(n);
            n.adjacent.forEach(a => {
                if(orderedNodes.has(a)){
                    if(pre != null && a != pre){
                        result = true;
                    } return;
                }
                nextNode(a,n)
            });
        } nextNode(start);
        return result;
    }
}
