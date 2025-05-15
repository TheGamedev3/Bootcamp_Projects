

const {port} = require('./Router');
const axios = require('axios');

async function shopFor(command, list, itemName, jsonData){
    
    try {
        let fullPath = `http://localhost:${port}/${command}/${list}`;
        if(typeof itemName === 'string'){fullPath = fullPath+'/'+itemName}
        else if(!jsonData && typeof itemName==='object'){jsonData = itemName}

        const response = await axios({
            url: fullPath,
            data: jsonData || {}
        });

        return response?.data;
    } catch (err) {
        console.error('❌ Error:', err.response?.status, err.response?.data);
    }
}
async function expectError(command, list, itemName, jsonData){
    
    try {
        let fullPath = `http://localhost:${port}/${command}/${list}`;
        if(typeof itemName === 'string'){fullPath = fullPath+'/'+itemName}
        else if(!jsonData && typeof itemName==='object'){jsonData = itemName}

        const response = await axios({
            url: fullPath,
            data: jsonData || {}
        });

        return response?.data;
    } catch {return}
}

module.exports = {shopFor, expectError};
