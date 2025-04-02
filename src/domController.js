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

        document.querySelector('[data-project="Inbox"]').remove();
    }

        function renderTask(project) {
            const taskDestination = document.getElementById('taskBoard');
            taskDestination.innerHTML='';
            let taskArray = project.tasks;
            taskArray.forEach((el, index)=>{
                createTaskItem(el, index, taskDestination);
            })
        } 


    return {openProjectForm, closeProjectForm, openTaskForm, closeTaskForm, updateProjectSelect, displayProjects, renderTask};
})()

