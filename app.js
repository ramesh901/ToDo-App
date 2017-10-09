var list = document.querySelectorAll('#addedItem p')
var addedItem = document.querySelector('#addedItem')
var add = document.forms['todo']
//var add = document.querySelector('#add')
add.addEventListener('submit',(e) => {
    e.preventDefault()
    var value = add.querySelector('input[type="text"]').value
    var ptag = document.createElement('p')
    ptag.textContent = value
    addedItem.appendChild(ptag)

    console.log(value)
})

console.log(list)
Array.from(list).forEach((item) => {
    item.addEventListener('click',(e) => {
       var parent = e.target.parentElement 
       //"item.parentElement" and "e.target.parentElement" are same
       parent.removeChild(item) 
    })

})