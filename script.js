
document.getElementById("newdeck").addEventListener("click", getNewDeck)
// get deck of cards

function getNewDeck(){
    console.log("Button clicked")
fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", {method: "GET"})
.then(response => response.json())
.then(data =>{
    console.log(data)
})
}

setTimeout(callBack, 2000)

function callBack(){
    console.log("I finally ran!")
}

