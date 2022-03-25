let deck_id;
let cards = []
const numCards = 2
let computer_score = 0
let user_score = 0
let deck_done = false

// hide draw cards button
document.getElementById("drawcards").style.display = "none"
// get deck of cards
document.getElementById("newdeck").addEventListener("click", getNewDeck)
// draw cards
document.getElementById("drawcards").addEventListener("click", drawCards)


function getNewDeck(){
    // console.log("Button clicked")
fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", {method: "GET"})
.then(response => response.json())
.then(data =>{
    // console.log(data)
    deck_id = data.deck_id
    // console.log("Deck id: ", deck_id)
    document.getElementById("remainingcards").innerText = `Remaining cards: ${data.remaining}` 
})
deck_done = false
enableDrawCards()
}

function drawCards(){
    // check for deck id - new deck button has been clicked
    if(deck_id&&deck_done===false){
    // console.log("Drawing cards")
    // console.log("deck id in draw cards: ", deck_id)
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deck_id}/draw/?count=2`, {method: "GET"})
    .then(response => response.json())
    .then(data =>{
        // console.log("Drawn cards: ", data)
        document.getElementById("remainingcards").innerText = `Remaining cards: ${data.remaining}`
        for(let card of data.cards){
            // changing from pop to allow new cards dealt to auto appear
            cards.unshift(card)
        }
        // console.log("Cards array: ", cards)
    renderCards()
        // if no cards left
    if(data.remaining===0){
        deck_done===true
        // let winner = determineWinner()
        document.getElementById("game-announcements").innerText = `Deck finished! ${determineWinner()}`
        document.getElementById("remainingcards").innerText = "Please draw new deck."
        // hide draw cards button
        disableDrawCards()
    }
    })
    
    
}
else{
    console.log("Need new deck")
}
}

function determineWinner(){
        if(computer_score === user_score){
            return "Its a tie!"
        }else if(computer_score>user_score){
            return "Computer won!"
        }else{
            return "You won!"
        }
}

function disableDrawCards(){
    document.getElementById("drawcards").style.display = "none"
    // document.getElementById("drawcards").button.disabled = true
}

function enableDrawCards(){
    document.getElementById("drawcards").style.display = "block"
    // document.getElementById("drawcards").button.disabled = false

}

function renderCards(){
    let cardsHTML = ""
    if(cards){
    // console.log("Rendering cards in renderCards: ", cards)
    // console.log("Cards length: ", cards.length)
    for(let i=0;i<numCards;i++){
        // console.log("In for loop")
         cardsHTML+=
            `<img src="${cards[i].image}"/>`
            // console.log("Cardshtml in for loop", cardsHTML)
    }
    document.getElementById("cardsEL").innerHTML = cardsHTML
    }
    // placing here because of api data return delay
    // was causing problems in main
    document.getElementById("game-announcements").innerText = determineHigherScore(cards[0].value, cards[1].value)
}

function determineScore(card){
    if(card <=10){
        // console.log(`Card is: ${card} value is ${Number(card)}`)
        return Number(card)
    }
    if(card==="JACK"){
        // console.log(`Card is: ${card} returning 11`)
        return 11
    }
    if(card==="QUEEN"){
        // console.log(`Card is: ${card} returning 12`)
        return 12
    }
    if(card==="KING"){
        // console.log(`Card is: ${card} returning 13`)
        return 13
    }
    else{
        // console.log(`Card is: ${card} returning 14`)
        return 14
    }
}

function determineHigherScore(card1, card2){
    // another option is to put all cards values in an array ordered from smallest to largest. you can then look up the array index of each value. larger index num = larger value.
    // arrayofcards = ["2", "3"..."KING", "ACE"]
    // const card1ValueIndex = arrayofcards.indexOf(card1.value)
    // const card2ValueIndex = arrayofcards.indexOf(card2.value)
    const card1_score = determineScore(card1)
    // console.log("Card1_score: ", card1_score)
    document.getElementById("computerscore").innerText= `Computer: ${card1_score} Score: ${computer_score}`
    const card2_score = determineScore(card2)
    // console.log("Card2_score: ", card2_score)
    document.getElementById("myscore").innerText= `Me: ${card2_score} Score: ${user_score}`
    if(card1_score===card2_score){
        // console.log("cards equal")
        return "Its a tie! War!"
    }else if(card1_score>card2_score){
            // console.log("Card 1 has larger score")
            computer_score+=1
            document.getElementById("computerscore").innerText= `Computer: ${card1_score} Score: ${computer_score}`
            return "Computer wins!"
        }else{
            // console.log("card 2 has larger score")
            user_score+=1
            document.getElementById("myscore").innerText= `Me: ${card2_score} Score: ${user_score}`
            return "You win!"
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