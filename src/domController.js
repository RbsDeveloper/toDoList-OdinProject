import { createElement, populateProjectSelectEl, createTaskItem, createProjectBtn } from "./domUtils"
import { taskManager } from "./taskManager"

export const domController = (()=>{
    function openProjectForm () {
        document.getElementById('newProjectDialog').show()
    }

    function closeProjectForm() {
        document.getElementById('newProjectDialog').close()
    }

    function openTaskForm() {
        document.getElementById('newTaskDialog').show()
    }

    function closeTaskForm(){
        document.getElementById('newTaskDialog').close()
    }

    function updateProjectSelect() {
        const projectSelect = document.getElementById('taskProject');
        projectSelect.innerHTML = '';

        populateProjectSelectEl(taskManager.projects, projectSelect);
        
    }

    function displayProjects() {
        const projectsContainer = document.getElementById('projectsContainer');

        projectsContainer.innerHTML = '';

        taskManager.projects.forEach((project)=>{
            createProjectBtn(project, projectsContainer);
        })

        const inboxBtn = document.querySelector('[data-project="Inbox"]');
        inboxBtn.children[1].remove();
        inboxBtn.setAttribute('data-active', 'true');
    }

        function renderTask(project) {
            const taskDestination = document.getElementById('taskBoard');
            taskDestination.innerHTML='';
            let taskArray = project.tasks;
            taskArray.forEach((el, index)=>{
                createTaskItem(el, index, taskDestination);
            })
        }
        
        function renderFilteredTasks() {
            
        }


    return {openProjectForm, closeProjectForm, openTaskForm, closeTaskForm, updateProjectSelect, displayProjects, renderTask};
})()

/*
    cand dau click pe unul din butuoanele de filter ar trebuii sa :

    -facem loop prin fiecare proiect in taskurile lui
        daca task-ul bifeaza conditia, il afisam

    -logica pentru edit e ok, folosim index pt proiect dar si pentru task deci putem identifica task-ul in obiectul sau
    -problema este la functia de render, trebuie modificata astfel in-cat sa nu se bazeze pe un array

*/