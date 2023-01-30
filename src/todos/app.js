import html from './app.html?raw';
import todoStore, { todoFil } from '../store/todo.store';
import { renderPending, renderTd } from './use-cases';

const ElemntIDs = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    todoCompleted: '.clear-completed',
    selectFilter: '.filtro',
    pendingCount: '#pending-count'
}

/**  
*
* @param {string} elementId
*/

export const App = (elementId) => {

    const renderTodos = () => {

        const todos = todoStore.getTodo(todoStore.getCurrentFilter());
        renderTd(ElemntIDs.TodoList, todos);
        conteoPending();
    }

    const conteoPending = () => {
        renderPending(ElemntIDs.pendingCount);
    }

    /* Funcion autoinvocada */
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        renderTodos();
    })();


    /* Referencias HTML */
    const newDescription = document.querySelector(ElemntIDs.newTodoInput);
    const todoListUL = document.querySelector(ElemntIDs.TodoList);
    const todoCompleted = document.querySelector(ElemntIDs.todoCompleted);
    const todoFilters = document.querySelectorAll(ElemntIDs.selectFilter);

    /* Listener */
    newDescription.addEventListener('keyup', (e) => {
        if (e.keyCode !== 13) return;
        if (e.target.value.trim().length === 0) return;

        todoStore.addTodo(e.target.value);
        renderTodos();
        e.target.value = '';
    })

    todoListUL.addEventListener('click', (e) => {
        const element = e.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        renderTodos();
    })


    todoListUL.addEventListener('click', (e) => {

        const destroy = e.target.className === 'destroy';
        const element = e.target.closest('[data-id]');
        if (!element || !destroy) return;
        todoStore.deleteTood(element.getAttribute('data-id'));
        renderTodos();
    })


    todoCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        renderTodos();
    })

    todoFilters.forEach(element => {
        element.addEventListener('click', (element) => {
            todoFilters.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(todoFil.All);
                    break;

                case 'Completados':
                    todoStore.setFilter(todoFil.Completed);
                    break;

                case 'Pendientes':
                    todoStore.setFilter(todoFil.Pending);
                    break;

                default:
                    todoStore.setFilter(todoFil.All);
            }

            renderTodos();
        })
    })
}
