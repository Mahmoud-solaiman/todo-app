//Model
const inputField = document.getElementById('todos-grapper');
const addBtn = document.querySelector('.add-btn');
const clearCompletedBtn = document.querySelector('.clear-completed');
const allBtn = document.querySelector('.all-btn');
const activeBtn = document.querySelector('.active-btn');
const completedBtn = document.querySelector('.completed-btn');

//View
function addTodo(){
    const inputFieldValue = inputField.value;
    const todosContainer = document.querySelector('.todos-container');
    //Check if the input field is empty or not
    if(!(inputFieldValue === '')){
        //Create the new todo markup
        const newTodoHTML = document.createElement('li');
        newTodoHTML.innerHTML = `
            <div class="check-box"></div>
            <h3 class="todo-text">${inputFieldValue}</h3>
            <div class="delete-btn">
                <img src="icons/icon-cross.svg" alt="delete button with an x shape">
            </div>
        `;
        //Append the new todo to its container
        todosContainer.appendChild(newTodoHTML);
        //Reset the field value
        inputField.value = '';
        //Set the left items value
        leftItems();
    }
}

function leftItems(){
    
    const checkBoxes = [...document.querySelectorAll('.check-box')];
    const leftItemsNum = checkBoxes.filter(checkBox=> {
        return !(checkBox.classList.contains('checked-box'));
    });

    const leftItems = document.querySelector('.left-items');
    leftItems.textContent = `${leftItemsNum.length} items left`;
}

function deleteTodo(){
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(deleteBtn=>{
        deleteBtn.addEventListener('pointerup', ()=>{
            //Select todo
            const todo = deleteBtn.parentElement;
            //Remove todo
            todo.remove();
            //Set the left items value
            leftItems();
        });
    });
}

function checkTodo(){
    const checkBoxes = document.querySelectorAll('.check-box');
    checkBoxes.forEach(checkBox=>{
        const todoText = checkBox.nextElementSibling;
        checkBox.addEventListener('pointerup', ()=>{
            //Check if the check box element is check or unchecked yet
            if(checkBox.children.length === 0){
                //Append the checked img if not yet
                const checkImg = document.createElement('img');
                checkImg.src = 'icons/icon-check.svg';
                checkBox.appendChild(checkImg);
                //Change the background of the check box
                checkBox.classList.add('checked-box');
                //line-through the todo text
                todoText.className = 'checked';
                //Set the left items value
                leftItems();
            }
        });
    });
}

function saveChanges(){
    const  todosContainer = document.querySelector('.todos-container');
    localStorage.setItem('todos', todosContainer.innerHTML);
}

function implementChanges(){
    const todosContainer = document.querySelector('.todos-container');
    todosContainer.innerHTML = localStorage.getItem('todos');
}

function clearCompleted(){
    //Select the completed todos
    const completedTodos = document.querySelectorAll('.checked-box');
    //Delete all the completed todos at once
    completedTodos.forEach(completedTodo=>{
        const todo = completedTodo.parentElement;
        todo.remove();
    });
}

function showAll(){
    const todos = document.querySelectorAll('li');
    todos.forEach(todo=>{
        todo.style.display = 'grid';
    });
    activeBtn.classList.remove('selected');
    completedBtn.classList.remove('selected');
    allBtn.classList.add('selected');
}

function showCompleted(){
    const checkBoxes = document.querySelectorAll('.checked-box');
    const allTodos = document.querySelectorAll('li');
    allTodos.forEach(todo=>{
        todo.style.display = 'none';
    });
    activeBtn.classList.remove('selected');
    completedBtn.classList.add('selected');
    allBtn.classList.remove('selected');
    checkBoxes.forEach(checkBox=>{
        const todo = checkBox.parentElement;
        todo.style.display = 'grid';
    });
}

function showActive(){
    const checkBoxes = document.querySelectorAll('.checked-box');
    const allTodos = document.querySelectorAll('li');
    allTodos.forEach(todo=>{
        todo.style.display = 'grid';
    });
    activeBtn.classList.add('selected');
    completedBtn.classList.remove('selected');
    allBtn.classList.remove('selected');
    checkBoxes.forEach(checkBox=>{
        const todo = checkBox.parentElement;
        todo.style.display = 'none';
    });
}

//Controller
//Adding todos
addBtn.addEventListener('pointerup', addTodo);
//Deleting todos
setInterval(deleteTodo, 1);
//Checking todos
setInterval(checkTodo, 1);
//Clear completed todos
clearCompletedBtn.addEventListener('pointerup', clearCompleted);
//Show all todos
allBtn.addEventListener('pointerup', showAll);
//Show completed todos
completedBtn.addEventListener('pointerup', showCompleted);
//Show active todos
activeBtn.addEventListener('pointerup', showActive);