var list = document.querySelectorAll('#addedItem')
var addedItem = document.querySelector('#addedItem')
var add = document.forms['todo']

function taskFromStorage () {
  var localTask = localStorage.getItem('task')
  if (localTask) {
    createDomFromStorage(localTask)
  }
}

function createDomFromStorage (value) {
  JSON.parse(value).forEach((item) => {
    createDomFromObject(item)
  })
}

function createDomFromObject (value) {
  var div = document.createElement('div')
  div.setAttribute('id', value['id'])
  var checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  //checkbox.setAttribute('id', generateTaskID())
  var label = document.createElement('label')
  label.textContent = value['title']
  label.setAttribute('class', 'container')
  if (value['completed']) {
    div.setAttribute('class', 'labelStrike')
    checkbox.checked = true
  }

  var span = document.createElement('span')
  span.textContent = 'delete'
  span.setAttribute('class', 'delete')
  var spanCheck = document.createElement('span')
  spanCheck.setAttribute('class', 'checkmark')
  addedItem.appendChild(div)
  div.appendChild(label)
  label.appendChild(checkbox)
  label.appendChild(spanCheck)
  label.appendChild(span)

}

var generateID = (function () {
  var globalIdCounter = 0
  return function (baseStr) {
    return (baseStr + Date.now() + globalIdCounter++)
  }
})()

var generateTaskID = (function () {
  var globalIdCounter = 1
  return function () {
    return (globalIdCounter++)
  }
})()

taskFromStorage()

// var add = document.querySelector('#add')
add.addEventListener('submit', addTask)
function addTask (e) {
  e.preventDefault()
  var value = add.querySelector('input[type="text"]').value
  add.querySelector('input[type="text"]').value = ''
  //console.log('value is', value)
  if (value.trim()) {
    var taskObject = saveData(value)
    createDomFromObject(taskObject)
  }
}

function saveData (value) {
  var temp = {}
  temp['id'] = generateID('task')
  temp['title'] = value
  temp['completed'] = false
  var valueStorage = getStorage()
  valueStorage.push(temp)
  //console.log(valueStorage)
  localStorage.setItem('task', JSON.stringify(valueStorage))
  return temp
}

function getStorage () {
  var valueStorage = []
  var tempValue = localStorage.getItem('task')
  if (tempValue != null) {
    // console.log("temp Value is", tempValue)
    // console.log(typeof(tempValue))
    JSON.parse(tempValue).forEach((item) => valueStorage.push(item))
  }
  return valueStorage
}

function removeTask (value) {
  var valueStorage = getStorage()
  var findObject = valueStorage.find((e) => e.id === value)
  var index = valueStorage.indexOf(findObject)
  valueStorage.splice(index, 1)
  localStorage.setItem('task', JSON.stringify(valueStorage))
}

// console.log(list)
Array.from(list).forEach((item) => {
  item.addEventListener('click', (e) => {
    var li = e.target.parentNode
    var divId = li.parentNode
    if (e.target.className === 'delete') {
      var id = li.parentNode.getAttribute('id')
      divId.parentNode.removeChild(divId)
      //console.log('delete id is', id, typeof (id))
      removeTask(id)
    }
    var valueStorage = getStorage()
    var findObject = valueStorage.find((e) => e.id === divId.getAttribute('id'))
    

    var index = valueStorage.indexOf(findObject)

    if (e.target.checked) {
      
      li.parentNode.setAttribute('class', 'labelStrike')

      findObject['completed'] = true
      valueStorage[index] = findObject
      localStorage.setItem('task', JSON.stringify(valueStorage))
    }
    if (e.target.checked === false) {
      divId.setAttribute('class', '')
      findObject['completed'] = false
      valueStorage[index] = findObject
      localStorage.setItem('task', JSON.stringify(valueStorage))
    }
  })
})

