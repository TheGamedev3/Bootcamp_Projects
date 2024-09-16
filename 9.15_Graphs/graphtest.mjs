
import {Graph, P, toName} from "./graph.mjs"

var graph = new Graph();

function space(){console.log("")}
function print(...str){console.log(...str)}

space();
var square = P("A", P("B", P("C", P("D"))));
graph.addEdge(P("A"),P("D"));
graph.addVertex(square);
print("square created");
print(`bfs order: ${toName(graph.breadthFirstSearch())}`)
print(`dfs order: ${toName(graph.depthFirstSearch())}`)

space();
print("contains closed loop?",graph.hasCycle());
space();
graph.removeEdge(P("A"),P("D"));
print("the 'AD' edge removed!");
print("contains closed loop?",graph.hasCycle());

space();
P("E", P("F", P("G", P("H")))); // extra pathway
graph.addEdge(P("E"),P("D")); // connect it to the opened square
graph.addVertex(P("E"));
print("shortest pathway from B to G:",toName(graph.shortestPath(P("B"),P("G"))))

space();
graph.addEdge(P("B"),P("E"));
print("shortcut edge created from B to E!");
print("shortest pathway from B to G:",toName(graph.shortestPath(P("B"),P("G"))))



var graph2 = new Graph();

space();
print("new graph");
space();
var hexagon = P("A2", P("B2", P("C2", P("D2", P("E2", P("F2"))))));
graph2.addEdge(P("A2"),P("F2"));
graph2.addVertex(hexagon);
print("hexagon created");
print(`bfs order: ${toName(graph2.breadthFirstSearch())}`)
print(`dfs order: ${toName(graph2.depthFirstSearch())}`)