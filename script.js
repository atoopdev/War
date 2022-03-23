let deck_id;
let cards = []
const numCards = 2

// get deck of cards
document.getElementById("newdeck").addEventListener("click", getNewDeck)
// draw cards
document.getElementById("drawcards").addEventListener("click", drawCards)

function getNewDeck(){
    console.log("Button clicked")
fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", {method: "GET"})
.then(response => response.json())
.then(data =>{
    console.log(data)
    deck_id = data.deck_id
    console.log("Deck id: ", deck_id) 
})
}

function drawCards(){
    // check for deck id - new deck button has been clicked
    if(deck_id){
    // console.log("Drawing cards")
    // console.log("deck id in draw cards: ", deck_id)
    // console.log(`https://apis.scrimba.com/deckofcards/api/deck/${deck_id}/draw/?count=${numCards}`)
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deck_id}/draw/?count=2`, {method: "GET"})
    .then(response => response.json())
    .then(data =>{
        console.log("Drawn cards: ", data)
        for(let card of data.cards){
            cards.push(card)
        }
        console.log("Cards array: ", cards)
    })
    setTimeout(renderCards, 3000)
}
else{
    console.log("Need new deck")
}
}

function renderCards(){
    let cardsHTML = ""
    if(cards){
    console.log("Rendering cards in renderCards: ", cards)
    console.log("Cards length: ", cards.length)
    for(let i=0;i<2;i++){
        console.log("In for loop")
         cardsHTML+=
            `<img src="${cards[i].image}"/>`
            console.log("Cardshtml in for loop", cardsHTML)
    }
    document.getElementById("cardsEL").innerHTML = cardsHTML
    }
}

// setTimeout(callBack, 2000)

// function callBack(){
//     console.log("I finally ran!")
// }

// promise - statement of what will happen - you will get a response
// promise states
// pending - yet to be completed
// fullfilled or resolved - response returned
//  rejected - no response within given time frame
// .then() runs when promise is fullfilled