

const link = require('../server');
const axios = require('axios');

async function API(action, bookRoute='', jsonData=null, expectError = false){
    try {
        let fullPath = `${link}/books/${bookRoute}`;
        
        // For GET/DELETE, data must be sent as `params`, not `data`
        const dataIndex = (action === "GET" || action === "DELETE")
            ? 'params' : 'data';

        const result = await axios({
            method: action.toLowerCase(),
            url: fullPath, [dataIndex]: jsonData
        });

        if(expectError){return false}
        return result?.data;

    } catch (err) {
        if(expectError){return err}
        console.error('❌ Error:', err.response?.status, err.response?.data);
    }
}

module.exports = API;
