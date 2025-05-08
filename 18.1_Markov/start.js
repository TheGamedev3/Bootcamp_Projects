
// run with "node start.js 300"

console.log("⚙️ Generating...");

const Generate = require('./Logic/Generator');
const wordCount = parseInt(process.argv[2]) || 100;

Generate(wordCount);

console.log("🏁 Finished!");
