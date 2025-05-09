

const fs = require("fs");

async function cat(name) {
    return await new Promise((res, reject)=>{
        fs.readFile(`./${name}.txt`, (err, data) => {
            if (err) {
              return reject(err.message);
            }
            res(data.toString());
        });
    });
}

async function catWrite(name, contents) {
    return await new Promise((res, reject)=>{
        fs.writeFile(`./output/${name}.txt`, contents, (err) => {
          if (err) {
            return reject(err.message);
          }
          res();
        });
    });
}


const axios = require("axios");

async function webCat(url) {
    return await new Promise((res, reject)=>{
        axios({
            method: 'get',
            url,
            responseType: 'stream'
        })
        .then(response => {
            let data = '';
            response.data.on('data', chunk => {
                data += chunk.toString();
            });

            response.data.on('end',()=>res(data));

            response.data.on('error', reject);
        })
        .catch(reject);
    });
}

const startArgs = [...process.argv];
startArgs.shift(); startArgs.shift();

const outFlag = startArgs.indexOf('--out');
let destination = (...args)=>console.log(...args);
if(outFlag !== -1){
    const pathName = startArgs[outFlag+1];
    destination = async(contents)=>{
        await catWrite(pathName, contents);
    }
    startArgs.splice(outFlag, 2);
}

const firstArg = startArgs[0];

async function ambiguous(arg) {
    let result = null;
    try{
        result = await cat(arg);
    }catch{
        // must be wrong input
    }
    if(result !== null){return result}

    try{
        result = await webCat(arg);
    }catch{
        // must be wrong input
    }
    return result;
}

async function printOutput(output){
    await destination(output);
}

module.exports = {cat, webCat, ambiguous, firstArg, startArgs, printOutput};