



function play(length, streamer){
    var previousPhrase = '<Start/>';
    var previousWord = '<Start/>';
    let firstWord = true; let words = 0;

    for (let i = 0; i < length; i++) {

        const list = this.probabilities[previousPhrase];
        const word = list[Math.floor(Math.random() * list.length)];

        if(word === '</End>'){
            previousPhrase = '<Start/>';
            previousWord = '<Start/>';

            streamer('.');
        }else{
            previousPhrase = previousWord+' '+word;
            previousWord = word;
            
            words++;
            if(words >= this.lineLength){
                streamer('\n'+word); words=0;
            }else if(firstWord){
                streamer(word);
                firstWord = false;
            }else{
                streamer(' '+word);
            }
        }
    }
}

module.exports = play;