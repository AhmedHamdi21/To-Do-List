const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const themeButtons = document.querySelectorAll('.theme-btn');
let savedTheme = localStorage.getItem('savedTheme') || 'standard';


toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteOrCheck);
themeButtons.forEach(button => button.addEventListener('click', changeTheme));


changeTheme(savedTheme);

function addToDo(event) {
    event.preventDefault();
    const todoText = toDoInput.value.trim();

    if (todoText === '') {
        alert("You must write something!");
        return;
    }

    const toDoDiv = createToDoElement(todoText);
    toDoList.appendChild(toDoDiv);
    savelocal(todoText);
    toDoInput.value = '';
}

function createToDoElement(todoText) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement('li');
    newToDo.innerText = todoText;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    const checked = createButton('<i class="fas fa-check"></i>', 'check-btn');
    const deleted = createButton('<i class="fas fa-trash"></i>', 'delete-btn');
    toDoDiv.append(checked, deleted);

    return toDoDiv;
}

function createButton(innerHtml, className) {
    const button = document.createElement('button');
    button.innerHTML = innerHtml;
    button.classList.add(className, `${savedTheme}-button`);
    return button;
}

function deleteOrCheck(event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
        const todoItem = target.parentElement;
        todoItem.classList.add("fall");
        removeLocalTodos(todoItem);
        todoItem.addEventListener('transitionend', () => todoItem.remove());
    } else if (target.classList.contains('check-btn')) {
        target.parentElement.classList.toggle("completed");
    }
}
function changeTheme(event) {
    let theme;
    if (event.target) {
        theme = event.target.dataset.theme;
    } else {
        theme = event;
    }
    document.body.className = theme;
    savedTheme = theme;
    localStorage.setItem('savedTheme', savedTheme);






 
    
}
