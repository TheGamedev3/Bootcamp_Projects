
// Aaron Binay
// 9/14/2024

const mythicalCreatures = [
	{name: "Dragon", type: "Fire", lastSeen: "Volcano Valley"},
	{name: "Mermaid", type: "Water", lastSeen: "Coral Caves"},
	{name: "Unicorn", type: "Land", lastSeen: "Enchanted Forest"},
	{name: "Griffin", type: "Air", lastSeen: "Highwind Mountains"},
	{name: "Kraken", type: "Water", lastSeen: "Abyssal Depths"}
];

console.log("Water Type:", mythicalCreatures.find(creature => creature.type == "Water"));

console.log("The Griffin:", mythicalCreatures.find(creature => creature.name == "Griffin"));

console.log("Last seen in The Enchanted Forest:", mythicalCreatures.find(creature => creature.lastSeen == "Enchanted Forest"));