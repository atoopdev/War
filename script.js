
document.getElementById("newdeck").addEventListener("click", getNewDeck)
// get deck of cards
let deck_id;

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