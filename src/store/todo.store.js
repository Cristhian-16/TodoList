import { Todo } from "../todos/models/todo";

export const todoFil = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const store = {
    todos: [
        new Todo('Learn React'),
        new Todo('Learn Vue'),
        new Todo('Learn Angular'),
        new Todo('Learn Svelte'),
    ],
    filter: todoFil.All
}

const initStore = () => {
    console.log(store);
    console.log('InitStore 🎈');
}

const loadStore = () => {
    throw Error('Not implemented');
}

const getTodo = (filtro = todoFil.All) => {
    switch (filtro) {
        case todoFil.All:
            return [...store.todos];

        case todoFil.Completed:
            return store.todos.filter(todo => todo.done);

        case todoFil.Pending:
            return store.todos.filter(todo => !todo.done);

        default:
            throw new Error(`Option ${filtro} not implemented`)
    }
}

/**
 * 
 * @param {string} description
 */
const addTodo = (description) => {

    if (!description) throw new Error('Description is required');

    store.todos.push(new Todo(description));
}

/**
 * 
 * @param {string} todoId Todo identifier
 */
const toggleTodo = (todoId) => {

    store.todos = store.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done
        }

        return todo;
    })
}

/**
 * 
 * @param {string} todoId Todo identifier 
 */
const deleteTood = (todoId) => {
    store.todos = store.todos.filter(todo => todo.id !== todoId);
}

const deleteCompleted = () => {
    store.todos = store.todos.filter(todo => !todo.done);
}

/**
 * 
 * @param {Filter} newFilter 
 */

const setFilter = (newFilter = todoFil.All) => {
    store.filter = newFilter;
}

const getCurrentFilter = () => {
    return store.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTood,
    getCurrentFilter,
    getTodo,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}