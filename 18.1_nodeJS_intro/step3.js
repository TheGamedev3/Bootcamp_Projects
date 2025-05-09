

// ✅ node step3 one
// ✅ node step3 https://github.com/axios/axios#installing

// ✅ node step3 one --out outputfile1
// ✅ node step3 --out outputfile2 https://github.com/axios/axios#installing

const {firstArg, ambiguous, printOutput} = require('./functions');

(async()=>{
    await printOutput(await ambiguous(firstArg));
})();
