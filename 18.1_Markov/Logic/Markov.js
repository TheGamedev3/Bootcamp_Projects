

const scanString = require('./Scan');
const play = require('./Play');

const markov={
    // phraseLength:2, // does nothing
    lineLength:14,

    // phrase --> next word
    probabilities:{},

    scanString: (storyBit)=>scanString.call(markov, storyBit),

    play: (wordCount, streamer)=>play.call(markov, wordCount, streamer),
}

module.exports = markov;