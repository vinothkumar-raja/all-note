import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://all-note-app-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "todoList")
const todoList = ref(database, "todoList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

onValue(todoList, function(list) {
    if (list.exists()) {
    let listArray = Object.entries(list.val())
    shoppingListEl.innerHTML = ""
    showList(listArray)
    } else {
        shoppingListEl.innerHTML = "No List Available to fetch...!"
    }

})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue !== "") {
        push(shoppingListInDB, inputValue)
    }
    inputFieldEl.value = ""
})

function showList(listArray) {

    for(let i=0;i<listArray.length;i++) {
        let currentList = listArray[i]
        let currentId = currentList[0]
        let currentValue = currentList[1]
        let newEl = document.createElement("li")
        newEl.textContent = currentValue
        // Challenge: Attach an event listener to newEl and make it so you console log the id of the item when it's pressed.
        newEl.addEventListener("click", function() {
            console.log(currentId)
            let exactLocationOfItemInDB = ref(database, `todoList/${currentId}`)
            remove(exactLocationOfItemInDB)
        })

        shoppingListEl.append(newEl)
    }

   

   
}