//Model
const inputField = document.getElementById('todos-grapper');
const addBtn = document.querySelector('.add-btn');

//View
function addTodo(){
    const inputFieldValue = inputField.value;
    const todosContainer = document.querySelector('.todos-container');

    if(!(inputFieldValue === '')){
        const newTodoHTML = document.createElement('li');
        newTodoHTML.innerHTML = `
            <div class="unchecked-icon"></div>
            <h3 class="todo-text">${inputFieldValue}</h3>
            <div class="delete-btn">
                <img src="icons/icon-cross.svg" alt="delete button with an x shape">
            </div>
        `;
        todosContainer.appendChild(newTodoHTML);
        inputField.value = '';
    }
}

function deleteTodo(){
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(deleteBtn=>{
        deleteBtn.addEventListener('pointerup', ()=>{
            const todo = deleteBtn.parentElement;
            todo.remove();
        });
    });
}

//Controller
addBtn.addEventListener('pointerup', addTodo);

setInterval(deleteTodo, 1);