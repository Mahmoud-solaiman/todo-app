//Model
const inputField = document.getElementById('todos-grapper');
const addBtn = document.querySelector('.add-btn');

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
    }
}

function deleteTodo(){
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(deleteBtn=>{
        deleteBtn.addEventListener('pointerup', ()=>{
            //Select todo
            const todo = deleteBtn.parentElement;
            //Remove todo
            todo.remove();
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

//Controller
//Adding todos
addBtn.addEventListener('pointerup', addTodo);
//Deleting todos
setInterval(deleteTodo, 1);
//Checking todos
setInterval(checkTodo, 1);