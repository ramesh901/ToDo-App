var list = document.querySelectorAll('#addedItem')
var addedItem = document.querySelector('#addedItem')
var add = document.forms['todo']

function taskFromStorage() {
  var localTask = localStorage.getItem('task')
  if (localTask) {
    createDomFromStorage(localTask)
  }
}

function createDomFromStorage(value) {  
  JSON.parse(value).forEach((item) => {
    var ptag = document.createElement('p')
    ptag.textContent = item["title"]
    addedItem.appendChild(ptag)
  })
}

var generateID = (function () {
  var globalIdCounter = 0;
  return function (baseStr) {
    return (baseStr + Date.now() + globalIdCounter++);
  }
})();

taskFromStorage()

// var add = document.querySelector('#add')
add.addEventListener('submit', addTask)
function addTask (e) {
  e.preventDefault()
  var value = add.querySelector('input[type="text"]').value
  saveData(value)  
  var ptag = document.createElement('p')
  var checkbox = document.createElement('input')
  checkbox.setAttribute('type','checkbox')
  var label = document.createElement('label')
  label.textContent = value
  //checkbox.textContent = value
  //checkbox += "<br>"
  var br = document.createElement('BR')
  console.log("checkbox is",checkbox)
  ptag.textContent = value
  addedItem.appendChild(checkbox)
  addedItem.appendChild(label)
  addedItem.appendChild(br)

}

function saveData(value) {
  var temp = {}
  temp["id"] = generateID("task")
  temp["title"] = value
  temp["completed"] = false

  var valueStorage = []
  var tempValue = localStorage.getItem('task')
  
  if(tempValue != null) {
    console.log("temp Value is", tempValue)
    console.log(typeof(tempValue))
    JSON.parse(tempValue).forEach((item) => valueStorage.push(item))
    

    
  }
  valueStorage.push(temp)
  console.log(valueStorage)
  localStorage.setItem('task', JSON.stringify(valueStorage))

}

function removeTask(value) {
  var valueStorage = []
  var tempValue = localStorage.getItem('task')
  if (tempValue != null) {
    console.log("temp Value is", tempValue)
    console.log(typeof (tempValue))
    JSON.parse(tempValue).forEach((item) => valueStorage.push(item))
  }
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
    removeTask(e.target.textContent)
    
  })
})
