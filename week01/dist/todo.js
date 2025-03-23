"use strict";
let todos = [];
let doneTasks = [];
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
};
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.classList.add('render-container_item');
    const span = document.createElement('span');
    span.classList.add('render-container_item-text');
    span.textContent = todo.text;
    const button = document.createElement('button');
    button.classList.add('render-container__item-button');
    button.textContent = isDone ? '삭제' : '완료';
    button.style.backgroundColor = isDone ? '#dc3545' : '#28a745';
    button.addEventListener('click', () => {
        isDone ? deleteTodo(todo) : completeTodo(todo);
    });
    li.appendChild(span);
    li.appendChild(button);
    return li;
};
const renderTasks = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
