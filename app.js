// Selectors - Sélectionner des éléments du DOM
const todoInput = document.querySelector(".todo-input");
const todoSubmit = document.querySelector(".todo-submit");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners - Ecouter les évenements sur les éléments du DOM sélectionnés précedemment et appel d'une fonction précise dans chacun des cas
document.addEventListener('DOMContentLoaded', getTodos);
todoSubmit.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions - Fonctions exécutées par les events listeners

function addTodo(event){
    //PREVENT FORM FROM SUBMITING
    event.preventDefault();
    //PREVENT ADDING A TO DO IF THE INPUT IS EMPTY
    if (todoInput.value != ''){
        //TO DO DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //CREATE LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //ADD TO DO TO LOCAL STORAGE
        saveLocalTodos(todoInput.value);
        //CHECK MARK BUTTON
        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add("check-btn");
        todoDiv.appendChild(checkButton)
        //CHECK TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
        //CLEAR TO DO INPUT VALUE
        todoInput.value ="";
    }
}

function deleteCheck(e) {
    const item = e.target;
    //DELETE TO DO
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //ANIMATION
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }
    if(item.classList[0] === 'check-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("check");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "checked":
                if (todo.classList.contains('check')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "unchecked":
                if (!todo.classList.contains('check')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //CHECK 
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //TO DO DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //CREATE LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //CHECK MARK BUTTON
        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add("check-btn");
        todoDiv.appendChild(checkButton)
        //CHECK TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    console.log(todo);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}