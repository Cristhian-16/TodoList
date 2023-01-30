import { Todo } from '../models/todo'
import { createTodoHTML } from './create-todo-html';


let element;
/**
 * 
 * @param {String} elementId 
 * @param {Todo} todo 
 */
export const renderTd = (elementId, todo = []) => {

    //TODO: Refactor this code
    if (!element)
        element = document.querySelector(elementId);

    if (!element) throw new Error('Element is required');

    element.innerHTML = '';

    todo.forEach(todo => {
        element.append(createTodoHTML(todo))
    })
}