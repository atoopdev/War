
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

// ----------------------------------------------------------------------------------

const people = [
    { name: "Jack", hasPet: true },
    { name: "Jill", hasPet: false },
    { name: "Alice", hasPet: true },
    { name: "Bob", hasPet: false },
]

// grab only objects where has pet == true

const peopleWithPets = people.filter(checkPet)

function checkPet(person){
    return person.hasPet
}

console.log(peopleWithPets)

// create own filter function using checkPets callback function (builds on above)

// function myArrayFilter(arr, func){
//     const newList = []
//     for(let i=0;i<arr.length;i++){
//         if(func(arr[i])){
//             newList.push(arr[i])
//         }
//     }
//     return newList
// }

function myArrayFilter(arr, callback){
    const newList = []
    for(let item of arr){
        if(callback(item)){
            newList.push(item)
        }
    }
    return newList
}

// get new filtered array using function above
const newPeopleWithPets = myArrayFilter(people, checkPet)
console.log("newPeopleWithPets: ", newPeopleWithPets)