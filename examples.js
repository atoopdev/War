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

// redo of above with more modern javascript for loop
// can run any array through any filter depending on what parameters passed
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

// ----------------------------------------------------------------------
// Given the array below, chain the `.filter` and `.map` array methods together to turn the array into an array of string email addresses of only the people in the array who voted. Log the array of email addresses to the console

const voters = [
    {name: "Joe", email: "joe@joe.com", voted: true},
    {name: "Jane", email: "jane@jane.com", voted: true},
    {name: "Bo", email: "bo@bo.com", voted: false},
    {name: "Bane", email: "bane@bane.com", voted: false}
]

function checkHasVoted(person){
    return person.voted
}

// method chaining

// const peopleWhoVoted = myArrayFilter(voters, checkHasVoted)
// determine who voted and then for each return email address
// peopleWhoVoted = voters.filter(checkHasVoted).map(voted => voted.email)
// another way to do without writing own function
peopleWhoVoted = voters.filter(voter => voter.voted).map(voter => voter.email)

console.log(peopleWhoVoted)