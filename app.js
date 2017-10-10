var valueStorage = []

var list = document.querySelectorAll('#addedItem')
var addedItem = document.querySelector('#addedItem')
var add = document.forms['todo']

function taskFromStorage() {
  var localTask = localStorage.getItem('task')
  if (localTask) {
    JSON.parse(localTask).forEach((item) => {
      console.log('items are', item)
      valueStorage.push(item)
      var ptag = document.createElement('p')
      ptag.textContent = item["title"]
      addedItem.appendChild(ptag)
    })
  }
}

taskFromStorage()

// var add = document.querySelector('#add')
add.addEventListener('submit', addTask)
function addTask (e) {
  e.preventDefault()
  var value = add.querySelector('input[type="text"]').value
  saveData(value)  
  var ptag = document.createElement('p')
  ptag.textContent = value
  addedItem.appendChild(ptag)
}

function saveData(value) {
  var temp = {}
  temp["title"] = value
  temp["completed"] = false
  valueStorage.push(temp)
  console.log(valueStorage)
  localStorage.setItem('task', JSON.stringify(valueStorage))

}

function removeData(value) {
  var findObject = valueStorage.find((e) => e.title === value)
  var index = valueStorage.indexOf(findObject)
  valueStorage.splice(index,1)
  localStorage.setItem('task', JSON.stringify(valueStorage))

}

// console.log(list)
Array.from(list).forEach((item) => {
  item.addEventListener('click', (e) => {
    console.log("item to be deleted",e.target)
    console.log("delete item parent",e.target.parentNode)
    console.log("textcontent",e.target.textContent)
    var li = e.target
    li.parentNode.removeChild(li)
    removeData(e.target.textContent)
    
  })
})
