

const commands=()=>{return{
    newDeck:"https://deckofcardsapi.com/api/deck/new/",
    shuffle:`https://deckofcardsapi.com/api/deck/${deckData?.deck_id}/shuffle/?remaining=false`,
    draw1Card:`https://deckofcardsapi.com/api/deck/${deckData?.deck_id}/draw/?count=1`
}}

import axios from "axios";
var deckData;

async function cardAPI(cmd, ...args){
    return (await axios.get(commands()[cmd], ...args))?.data;
}

import Magic_Proxy from "./MagicProx.js";

Magic_Proxy.deckReady = false;
Magic_Proxy.shuffling = false;
Magic_Proxy.drawingEligible = false;
Magic_Proxy.remaining = 0;

createDeck();
async function createDeck(){
    console.log('creating...');
    deckData = await cardAPI('newDeck');
    if(!deckData || !deckData.success){throw Error('deck failed to create!')}
    deckData = await cardAPI('shuffle');
    Magic_Proxy.remaining = deckData.remaining;
    Magic_Proxy.drawingEligible = true;
    console.log('ready!');
    Magic_Proxy.cardObjects=[];
    Magic_Proxy.deckReady = true;
}

var cycle = 0;
export async function reshuffleAll(){
    if(!deckData){return}
    Magic_Proxy.cardObjects=[]; cycle+=1;
    Magic_Proxy.shuffling = true;
    const data = await cardAPI('shuffle');
    Magic_Proxy.remaining = data.remaining;
    Magic_Proxy.shuffling = false;
    Magic_Proxy.drawingEligible = canDraw();
}

var drawing = 0;
const canDraw=()=>deckData && (!Magic_Proxy.shuffling) && (Magic_Proxy.remaining > 0)
export async function drawCard(){
    if(!canDraw()){return}
    let startCycle = cycle;
    Magic_Proxy.remaining-=1;
    drawing+=1;
    Magic_Proxy.drawing = true;
    Magic_Proxy.drawingEligible = canDraw();

    const scaffold = { image: 'https://deckofcardsapi.com/static/img/back.png' }; 
    Magic_Proxy.cardObjects.push(scaffold);
    Magic_Proxy.triggerChange('cardObjects');

    const data = await cardAPI('draw1Card');

    if(startCycle !== cycle){return}
    drawing-=1;
    if(drawing === 0){
        Magic_Proxy.drawing = false;
    }
    scaffold.image = data.cards[0].image;
    Magic_Proxy.triggerChange('cardObjects');
}
