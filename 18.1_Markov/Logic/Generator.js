

const fs = require('fs');
const path = require('path');

const markov = require('./Markov');
const GetSources = require('./Feed');

async function Generate(wordCount){
    await GetSources();
    const outputPath = path.resolve(__dirname, `../Output/output(${wordCount}).txt`);
    const stream = fs.createWriteStream(outputPath, { encoding: 'utf-8' });
    stream.write('\n\n');
    markov.play(wordCount,
        (append)=>stream.write(append)
    );

    stream.end('\n\n✅ Done writing.\n');
}

module.exports = Generate;