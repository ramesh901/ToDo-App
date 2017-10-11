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
    createDomFromObject(item)
  })
}

function createDomFromObject(value) {
  var div = document.createElement('div')
  div.setAttribute('id',value["id"])
  var checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  var label = document.createElement('label')
  label.textContent = value["title"]
  var span = document.createElement('span')
  span.textContent = 'delete'
  span.setAttribute('class','delete')
  //checkbox.textContent = value
  //checkbox += "<br>"
  
  console.log("checkbox is", checkbox)

  addedItem.appendChild(div)
  div.appendChild(checkbox)
  div.appendChild(label)
  div.appendChild(span)
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
  console.log('value is',value)
  if(value.trim()){
  var taskObject = saveData(value)  
  createDomFromObject(taskObject)
  }
  
  

}

function saveData(value) {
  var temp = {}
  temp["id"] = generateID("task")
  temp["title"] = value
  temp["completed"] = false

  var valueStorage = []
  var tempValue = localStorage.getItem('task')
  
  if(tempValue != null) {
    //console.log("temp Value is", tempValue)
    //console.log(typeof(tempValue))
    JSON.parse(tempValue).forEach((item) => valueStorage.push(item))    
  }
  valueStorage.push(temp)
  console.log(valueStorage)
  localStorage.setItem('task', JSON.stringify(valueStorage))
  return temp

}

function removeTask(value) {
  var valueStorage = []
  var tempValue = localStorage.getItem('task')
  if (tempValue != null) {
    //console.log("temp Value is", tempValue)
    //console.log(typeof (tempValue))
    JSON.parse(tempValue).forEach((item) => valueStorage.push(item))
  }
  var findObject = valueStorage.find((e) => e.id === value)
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
    console.log('classname',e.target.className)
    if(e.target.className === 'delete') {
      var li = e.target.parentNode
      var id = e.target.parentNode.getAttribute('id')
    li.parentNode.removeChild(li)
    console.log('delete id is',id,typeof(id))
    removeTask(id)
    }
    
  })
})
