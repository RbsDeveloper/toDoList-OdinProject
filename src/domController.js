import { populateProjectSelectEl, createTaskItem, createProjectBtn, } from "./domUtils"
import { triggerToday, triggerCompleted, triggerOverdue } from "./filters"
import { taskManager } from "./taskManager"

export const domController = (()=>{
    //Opens the new project modal dialog.
    function openProjectForm () {
        document.getElementById('newProjectDialog').show()
    }

    //Closes the new project modal dialog.
    function closeProjectForm() {
        document.getElementById('newProjectDialog').close()
    }

    //Opens the new task modal dialog.
    function openTaskForm() {
        document.getElementById('newTaskDialog').show()
    }

    //Closes the new task modal dialog.
    function closeTaskForm(){
        document.getElementById('newTaskDialog').close()
    }

    //Updates the task form project dropdown with available projects.
    function updateProjectSelect() {
        const projectSelect = document.getElementById('taskProject');
        projectSelect.innerHTML = '';

        populateProjectSelectEl(taskManager.projects, projectSelect);
        
    }

    //Displays all projects as buttons in the sidebar.
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

    //Renders all tasks for a given project to the task board.
    function renderTask(project) {
        const taskDestination = document.getElementById('taskBoard');
        taskDestination.innerHTML='';
        let taskArray = project.tasks;
        taskArray.forEach((el, index)=>{
            createTaskItem(el, index, taskDestination);
        })
    }

    const currentView = {
        type: 'project',
        value: 'Inbox',
    }
    
    //Sets the current view type and value (project or filter).
    function setCurrentView(type, value) {
        currentView.type = type;
        currentView.value = value;
    }

    //Returns the current view (type and value).
    function getCurrentView() {
        return {...currentView};
    }

    //Re-renders the task board based on the current view.
    function reRenderCurrentView() {
        if(currentView.type==='project') {
            const pIndex = taskManager.projects.findIndex(project => project.name === currentView.value);
            renderTask(taskManager.projects[pIndex]);
        } else if (currentView.type === 'filter'){
            if (currentView.value === 'today-task') {
                triggerToday();
            } else if (currentView.value === 'completed-task') {
                triggerCompleted()
            } else if (currentView.value === 'overdue-task') {
                triggerOverdue()
            }
        }
    }

    return {openProjectForm, closeProjectForm, openTaskForm, closeTaskForm, updateProjectSelect, displayProjects, renderTask, currentView, setCurrentView, getCurrentView, reRenderCurrentView};
})()
