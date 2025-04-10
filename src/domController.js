import { createElement, populateProjectSelectEl, createTaskItem, createProjectBtn,triggerToday, triggerCompleted, triggerOverdue } from "./domUtils"
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
        /*
        function renderFilteredTasks(propertyToCheck, value) {
            const taskDestination = document.getElementById('taskBoard');
            taskDestination.innerHTML = '';
        
            for(let i = 0; i<taskManager.projects.length ; i++){
                for(let j=0; j<taskManager.projects[i].tasks.length; j++){
                    if(taskManager.projects[i].tasks[j][`${propertyToCheck}`]===value){
                        console.log(taskManager.projects[i].tasks[j].title);
                        createTaskItem(taskManager.projects[i].tasks[j], j, taskDestination)
                    }
                }
            }
            if(taskDestination.innerHTML === ''){
                taskDestination.innerHTML = 'no data to display'
            }
        }*/


        const currentView = {
            type: 'project',
            value: 'Inbox',
        }

        function setCurrentView(type, value) {
            currentView.type = type;
            currentView.value = value;
        }

        function getCurrentView() {
            return {...currentView};
        }

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
