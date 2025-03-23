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
            /*
            let projectBtn = createElement('div', ['project-item'], '', {"data-project": `${project.name}`, 'data-active': false,});
            let projectName = createElement('span', ['projectName'], `${project.name}`,);
            let deletebtn = createElement('button', ['delete-project-btn'], ``, {'aria-label': 'Delete Project'});
            let deleteIcon = createElement ('i', ['fa-solid', 'fa-trash']);
            deletebtn.append(deleteIcon)
            projectBtn.append(projectName, deletebtn);

            projectsContainer.appendChild(projectBtn);*/
            createProjectBtn(project, projectsContainer);
        })

        document.querySelector('[data-project="Inbox"]').remove();
    }

    function renderTask(project) {
        const taskDestination = document.getElementById('taskBoard');
        taskDestination.innerHTML='';
        let taskArray = project.tasks;
        console.log(taskArray)
        createTaskItem(taskArray, taskDestination);
    } 

    return {openProjectForm, closeProjectForm, openTaskForm, closeTaskForm, updateProjectSelect, displayProjects, renderTask};
})()