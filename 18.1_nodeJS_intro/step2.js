

// ✅ node step2 https://github.com/axios/axios#installing

const {firstArg: url, webCat} = require('./functions');

(async()=>{
    const result = await webCat(url)
    
    console.log(`Contents of '${url}':\n${result}`);
})();
