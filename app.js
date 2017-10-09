/* PENDING ITEMS
COMPLETED TASKS HAS TO BE WITH 'CHECK MARK' AND STRIKETHRU
DELETED ITEM HAS TO BE REMOVED FROM LOCAL STORAGE
DO SOME NICE FRONT END
 */

function taskFromStorage () {
  var localTask = localStorage.getItem('task')
  if (localTask) {
    JSON.parse(localTask).forEach((item) => {
      console.log('items are', item)
      var ptag = document.createElement('p')
      ptag.textContent = item
      addedItem.appendChild(ptag)
    })
  }
}

var list = document.querySelectorAll('#addedItem')
var addedItem = document.querySelector('#addedItem')
var add = document.forms['todo']
taskFromStorage()
var valueStorage = []
// var add = document.querySelector('#add')
add.addEventListener('submit', addTask)
function addTask (e) {
  e.preventDefault()
  var value = add.querySelector('input[type="text"]').value

  valueStorage.push(value)
  console.log(valueStorage)
  localStorage.setItem('task', JSON.stringify(valueStorage))
  var ptag = document.createElement('p')
  ptag.textContent = value
  addedItem.appendChild(ptag)
}

// console.log(list)
Array.from(list).forEach((item) => {
  item.addEventListener('click', (e) => {
    if (e.target.tagName === 'p') {
      var li = e.target
      li.parentNode.removeChild(li)
    }
  })
})
