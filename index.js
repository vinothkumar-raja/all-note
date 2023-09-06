import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    let listArray = Object.values(list.val())
    shoppingListEl.innerHTML = ""
    showList(listArray)
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    inputFieldEl.value = ""
})

function showList(listArray) {

    let htmlList = ""
    for(let i=0;i<listArray.length;i++) {
        htmlList = `<li>${listArray[i]}</li>`
    }

    shoppingListEl.innerHTML = htmlList
}