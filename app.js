var list = document.querySelectorAll('#addedItem')
var addedItem = document.querySelector('#addedItem')
var add = document.forms['todo']
//var add = document.querySelector('#add')
add.addEventListener('submit', addTask)
function addTask (e) {
    e.preventDefault()
    var value = add.querySelector('input[type="text"]').value
    var ptag = document.createElement('p')
    ptag.textContent = value
    addedItem.appendChild(ptag)

}

console.log(list)
Array.from(list).forEach((item) => {
    item.addEventListener('click', (e) => {
        if(e.target.tagName = 'p'){
            const li = e.target;
            li.parentNode.removeChild(li);
            
        }
    
    })

})
