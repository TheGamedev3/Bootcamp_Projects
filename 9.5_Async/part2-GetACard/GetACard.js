

// Aaron Binay
// 8/30/2024

function cardName(cardObject){
    return cardObject.value+" of "+cardObject.suit;
}

class cardObject{
    constructor(){
        this.info = null
    }
    async getCardData(deckId){
        this.info = await $.get("https://deckofcardsapi.com/api/deck/"+deckId+"/draw/?count=1");
    }
    get singleCard(){return this.info.cards[0];}
    get image(){return this.singleCard.image;}
    get cardName(){
        let card = this.singleCard;
        return card.value+" of "+card.suit;
    }
    get deckId(){return this.info.deck_id;}
}

async function getNewDeckId(){
    let newCard = await $.get("https://deckofcardsapi.com/api/deck/new/shuffle");
    return newCard.deck_id;
}
async function getSingleCard(deckId){
    let newCard = new cardObject();
    await newCard.getCardData(deckId);
    return newCard;
}

async function fetchBothCards(){
    let firstCard = await getSingleCard("new");
    let secondCard = await getSingleCard(firstCard.deckId);

    return [firstCard, secondCard];
}

async function printSteps1And2(){
    // Part 1
    let card1 = await getSingleCard("new");
    console.log(card1.cardName);

    // Part 2
    let cards = await fetchBothCards()
    console.log(cards[0].cardName,"&",cards[1].cardName);
}
printSteps1And2();

async function startPage(){
    let button = $('button');
    let cardArea = $('#card-area');

    let deckId = await getNewDeckId();
    button.show().on('click', async function() {
        let cardData = await getSingleCard(deckId);
        cardArea.append(
            $('<img>',{src: cardData.image,})
        );
        if (cardData.info.remaining === 0) button.remove();
    });
}
// Part 3
startPage();