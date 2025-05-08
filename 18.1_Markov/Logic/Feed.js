

const fs = require('fs');
const path = require('path');

const markov = require('./Markov');

async function GetSources(){
    // get the first file under Source
    const folderPath = path.resolve(__dirname, '../Source');
    const files = fs.readdirSync(folderPath);

    if (files.length === 0) {
        console.error('❌ No files found in Source folder.');
    }
    const firstFile = path.join(folderPath, files[0]);

    // start scanning it
    const stream = fs.createReadStream(firstFile, { encoding: 'utf-8' });

    stream.on('data', chunk =>markov.scanString(chunk));

    return new Promise((res, reject) => {
        stream.on('error', reject);
        stream.on('end', res);
    });
}

module.exports = GetSources;