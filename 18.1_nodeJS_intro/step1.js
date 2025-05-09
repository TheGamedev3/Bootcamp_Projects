

// ✅ node step1 one

const {firstArg: name, cat} = require('./functions');

(async()=>{
    const result = await cat(name)
    
    console.log(`Contents of '${name}':\n${result}`);
})();
