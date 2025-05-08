


var previousPhrase = null;
var previousWord = '<Start/>';

function scanString(str){
    // Remove commas and brackets ( and )
    str = str.replace(/[-(),"'*:`;\[\]]/g, '');

    if(previousPhrase === null){
        previousPhrase = (this.probabilities['<Start/>']??=[]);
    }
    const words = str.match(/\w+|[^\s\w]/g);
    
    words.forEach(word => {
        if(['.','!','?'].includes(word)){
            // setence end
            if(previousWord !== '<Start/>'){
                previousPhrase.push('</End>');
            }
            previousPhrase = (this.probabilities['<Start/>']??=[]);
            previousWord = '<Start/>';
            return;
        }
        if(previousPhrase){
            previousPhrase.push(word);
        }
        const i = previousWord+' '+word;
        previousPhrase = (this.probabilities[i]??=[])
        previousWord = word;
    });
}

module.exports = scanString;