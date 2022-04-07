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
fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", {method: "GET"})
.then(response => response.json())
.then(data =>{
    deck_id = data.deck_id
    document.getElementById("remainingcards").innerText = `Remaining cards: ${data.remaining}` 
})
deck_done = false
enableDrawCards()
}

function drawCards(){
    // check for deck id - new deck button has been clicked
    if(deck_id&&deck_done===false){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deck_id}/draw/?count=2`, {method: "GET"})
    .then(response => response.json())
    .then(data =>{
        document.getElementById("remainingcards").innerText = `Remaining cards: ${data.remaining}`
        for(let card of data.cards){
            // changing from pop to allow new cards dealt to auto appear
            cards.unshift(card)
        }
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
}

function enableDrawCards(){
    document.getElementById("drawcards").style.display = "block"

}

function renderCards(){
    let cardsHTML = ""
    if(cards){
    for(let i=0;i<numCards;i++){
         cardsHTML+=
            `<img src="${cards[i].image}"/>`
    }
    document.getElementById("cardsEL").innerHTML = cardsHTML
    }
    // placing here because of api data return delay
    // was causing problems in main
    document.getElementById("game-announcements").innerText = determineHigherScore(cards[0].value, cards[1].value)
}

function determineScore(card){
    if(card <=10){
        return Number(card)
    }
    if(card==="JACK"){
        return 11
    }
    if(card==="QUEEN"){
        return 12
    }
    if(card==="KING"){
        return 13
    }
    else{
        return 14
    }
}

function determineHigherScore(card1, card2){
    // another option is to put all cards values in an array ordered from smallest to largest. you can then look up the array index of each value. larger index num = larger value.
    // arrayofcards = ["2", "3"..."KING", "ACE"]
    // const card1ValueIndex = arrayofcards.indexOf(card1.value)
    // const card2ValueIndex = arrayofcards.indexOf(card2.value)
    const card1_score = determineScore(card1)
    document.getElementById("computerscore").innerText= `Computer: ${card1_score} Score: ${computer_score}`
    const card2_score = determineScore(card2)
    document.getElementById("myscore").innerText= `Me: ${card2_score} Score: ${user_score}`
    if(card1_score===card2_score){
        return "Its a tie! War!"
    }else if(card1_score>card2_score){
            computer_score+=1
            document.getElementById("computerscore").innerText= `Computer: ${card1_score} Score: ${computer_score}`
            return "Computer wins!"
        }else{
            user_score+=1
            document.getElementById("myscore").innerText= `Me: ${card2_score} Score: ${user_score}`
            return "You win!"
        }
}



// promise - statement of what will happen - you will get a response
// promise states
// pending - yet to be completed
// fullfilled or resolved - response returned
//  rejected - no response within given time frame
// .then() runs when promise is fullfilled