//Model
const inputField = document.getElementById('todos-grapper');
const addBtn = document.querySelector('.add-btn');
const clearCompletedBtn = document.querySelector('.clear-completed');
const allBtn = document.querySelector('.all-btn');
const activeBtn = document.querySelector('.active-btn');
const completedBtn = document.querySelector('.completed-btn');
const todosContainer = document.querySelector('.todos-container');
const allBtnMobile = document.querySelector('.all-btn-mobile');
const completedBtnMobile = document.querySelector('.completed-btn-mobile');
const activeBtnMobile = document.querySelector('.active-btn-mobile');
const lightDarkTheme = document.querySelector('.light-dark-theme');

//View
function addTodo(){
    const icon = document.getElementById('light-dark-theme-icon');
    const inputFieldValue = inputField.value;
    const todosContainer = document.querySelector('.todos-container');
    //Check if the input field is empty or not
    if(!(inputFieldValue === '')){
        //Create the new todo markup
        const newTodoHTML = document.createElement('li');
        newTodoHTML.setAttribute('draggable', true);
        newTodoHTML.classList.add('draggable');
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
        //Filter todos when adding a new one
        filterTodos();
        //Light theme check box
        if(icon.src === 'http://127.0.0.1:5500/icons/icon-moon.svg'){
            const checkBoxesLight = document.querySelectorAll('.check-box');
            checkBoxesLight.forEach(checkBoxLight=>{
                checkBoxLight.classList.add('check-box-light');
            });
        }
        //Drag and Drop to new todos
        dragAndDrop();
    }
    saveChanges();
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
            saveChanges();
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
                if(activeBtn.classList.contains('selected') || activeBtnMobile.classList.contains('selected')){
                    checkBox.parentElement.style.display = 'none';
                }
                saveChanges();
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

function showAll(all,active,completed){
    const todos = document.querySelectorAll('li');
    todos.forEach(todo=>{
        todo.style.display = 'grid';
    });
    active.classList.remove('selected');
    completed.classList.remove('selected');
    all.classList.add('selected');
}

function showCompleted(all,active,completed){
    const checkBoxes = document.querySelectorAll('.checked-box');
    const allTodos = document.querySelectorAll('li');
    allTodos.forEach(todo=>{
        todo.style.display = 'none';
    });
    active.classList.remove('selected');
    completed.classList.add('selected');
    all.classList.remove('selected');
    checkBoxes.forEach(checkBox=>{
        const todo = checkBox.parentElement;
        todo.style.display = 'grid';
    });
}

function showActive(all,active,completed){
    const checkBoxes = document.querySelectorAll('.checked-box');
    const allTodos = document.querySelectorAll('li');
    allTodos.forEach(todo=>{
        todo.style.display = 'grid';
    });
    active.classList.add('selected');
    completed.classList.remove('selected');
    all.classList.remove('selected');
    checkBoxes.forEach(checkBox=>{
        const todo = checkBox.parentElement;
        todo.style.display = 'none';
    });
}

function filterTodos(){
    const allTodos = document.querySelectorAll('li');
    const checkedTodos = document.querySelectorAll('.checked-box');

    if(allBtn.classList.contains('selected') || allBtnMobile.classList.contains('selected')){
        allTodos.forEach(todo=>{
            todo.style.display = 'grid';
        });
    } if(completedBtn.classList.contains('selected') || completedBtnMobile.classList.contains('selected')){
        allTodos.forEach(todo=>{
            todo.style.display = 'none';
        });
        checkedTodos.forEach(todo=>{
            const parentTodo = todo.parentElement;
            parentTodo.style.display = 'grid';
        });
    } else {
        allTodos.forEach(todo=>{
            todo.style.display = 'grid';
        });
        checkedTodos.forEach(todo=>{
            const parentTodo = todo.parentElement;
            parentTodo.style.display = 'none';
        });
    }
}

function toggleLightDark(){
    const icon = document.getElementById('light-dark-theme-icon');
    const containerLight = document.querySelector('.container');
    const fieldContainerLight = document.querySelector('.field-container');
    const controlPanelLight = document.querySelector('.control-panel');
    const filteringBtnsMobileLight = document.querySelector('.filtering-btns-mobile');
    const checkBoxesLight = document.querySelectorAll('.check-box');

    if(icon.src === 'https://mahmoud-solaiman.github.io/todo-app/icons/icon-sun.svg'){
        icon.src = 'https://mahmoud-solaiman.github.io/todo-app/icons/icon-moon.svg';
        icon.alt = 'Moon icon';
        containerLight.classList.add('container-light');
        fieldContainerLight.classList.add('field-container-light');
        controlPanelLight.classList.add('control-panel-light');
        todosContainer.classList.add('todos-container-light');
        filteringBtnsMobileLight.classList.add('filtering-btns-mobile-light');
        checkBoxesLight.forEach(checkBoxLight=>{
            checkBoxLight.classList.add('check-box-light');
        });
    } else {
        icon.src = 'https://mahmoud-solaiman.github.io/todo-app/icons/icon-sun.svg';
        icon.alt = 'Sun icon';
        containerLight.classList.remove('container-light');
        fieldContainerLight.classList.remove('field-container-light');
        controlPanelLight.classList.remove('control-panel-light');
        todosContainer.classList.remove('todos-container-light');
        filteringBtnsMobileLight.classList.remove('filtering-btns-mobile-light');
        checkBoxesLight.forEach(checkBoxLight=>{
            checkBoxLight.classList.remove('check-box-light');
        });
    }
}

function dragAndDrop(){
    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable=>{
        //Add the dragging class at the beginning of the drag
        draggable.addEventListener('dragstart', ()=>{
            draggable.classList.add('dragging');
        });

        //Remove the dragging class at the end of the drag
        draggable.addEventListener('dragend', ()=>{
            draggable.classList.remove('dragging');
        });
    });
    //Handling the drag over functionality
    todosContainer.addEventListener('dragover', e=>{
        e.preventDefault();
        const afterElement = getDragAfterElement(todosContainer, e.clientY);
        const draggable = document.querySelector('.dragging');
        if(afterElement === null){
            todosContainer.appendChild(draggable);
        } else {
            todosContainer.insertBefore(draggable, afterElement);
        }
    });

    //Determening which element to append before or after
    function getDragAfterElement(container, y){
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

        return draggableElements.reduce((closest, child)=>{
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height/2;
            if(offset < 0 && offset > closest.offset){
                return {
                    offset: offset,
                    element: child
                }
            } else {
                return closest;
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element;
    }
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
allBtn.addEventListener('pointerup', showAll.bind(null, allBtn, activeBtn, completedBtn));
//Show completed todos
completedBtn.addEventListener('pointerup', showCompleted.bind(null, allBtn, activeBtn, completedBtn));
//Show active todos
activeBtn.addEventListener('pointerup', showActive.bind(null, allBtn, activeBtn, completedBtn));
//Getting the todos from the local storage
implementChanges();
//Counting the number of items left
leftItems();

//Filtering buttons for phones
allBtnMobile.addEventListener('pointerup', showAll.bind(null, allBtnMobile, activeBtnMobile, completedBtnMobile));
activeBtnMobile.addEventListener('pointerup', showActive.bind(null, allBtnMobile, activeBtnMobile, completedBtnMobile));
completedBtnMobile.addEventListener('pointerup', showCompleted.bind(null, allBtnMobile, activeBtnMobile, completedBtnMobile));

//Toggle light and dark themes
lightDarkTheme.addEventListener('pointerup', toggleLightDark);

//Drag and drop 
dragAndDrop();