import {parse, format, isPast, isBefore, startOfToday} from 'date-fns';
import { taskManager } from './taskManager';
// Function to create an element with optional classes, text, and attributes
export function createElement(tag, classes = [], text = '', attributes = {}) {
    const element = document.createElement(tag);
      // Add classes if provided
    if(classes.length){
        element.classList.add(...classes);
    }
    // Add text content if provided
    if(text){
        element.textContent = text;
    }
    // Add attributes if provided
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }

    return element;
}   

export function populateProjectSelectEl (arr, destination) {
    arr.forEach(el => {
        let option = createElement('option', [], `${el.name}`, {value: `${el.name}`});
        destination.append(option);
    });
}

export function createTaskItem(taskObj, indexToAssign, destination) { 
      
        const taskItem = createElement('div', ['task-item'], '', {'data-task-index': `${indexToAssign}`, 'data-task-project':`${taskObj.project}`});
        const taskHeader = createElement('div', ['task-header'],);

        const taskCheckBox = createElement('input', [], '', {type: 'checkbox'});
        const taskTitle = createElement('h3', ['task-title'], `${taskObj.title}`);
        const taskActions = createElement('div', ['task-actions'], '');
        const editBtn = createElement('button', ['edit-task-btn']);
        const editIcon = createElement('i', ['fa-solid', 'fa-pencil']);
        const deleteBtn = createElement('button', ['delete-task-btn']);
        const deleteIcon = createElement('i', ['fa-solid', 'fa-trash']);
        
        editBtn.append(editIcon);
        deleteBtn.append(deleteIcon);
        taskActions.append(editBtn, deleteBtn);
        taskHeader.append(taskCheckBox, taskTitle, taskActions);

        const taskDescription = createElement('p', ['task-description'], `${taskObj.description}`);
        const taskFooter = createElement('div', ['task-footer'],);
        const taskDate = createElement('p', ['task-date'], `${format(new Date(taskObj.dueDate), 'PPP')}`);
        const taskProject = createElement('p', ['task-project'], `${taskObj.project}`);

        taskFooter.append(taskDate, taskProject);
        taskItem.append(taskHeader, taskDescription, taskFooter);
        console.log(taskObj.completed);
        if(taskObj.completed === true){
            taskCheckBox.checked = true;
            taskItem.classList.add('complete');
        }

        if (destination) {
            destination.append(taskItem);
        }
}

export function createProjectBtn(projectToCreate, placeToAppend) {
    let projectBtn = createElement('div', ['project-item'], '', {"data-project": `${projectToCreate.name}`, 'data-active': false,});
    let projectName = createElement('span', ['projectName'], `${projectToCreate.name}`,);
    let deletebtn = createElement('button', ['delete-project-btn'], ``, {'aria-label': 'Delete Project'});
    let deleteIcon = createElement ('i', ['fa-solid', 'fa-trash']);
    deletebtn.append(deleteIcon)
    projectBtn.append(projectName, deletebtn);

    placeToAppend.appendChild(projectBtn);
}

export function editModule(source, taskIndex, projectIndex) {
    let existingTitle = source[projectIndex].tasks[taskIndex].title;
    let existingDescription =source[projectIndex].tasks[taskIndex].description;
    let existingDueDate = source[projectIndex].tasks[taskIndex].dueDate;
    let existingPriority = source[projectIndex].tasks[taskIndex].priority;
    let existingProject = source[projectIndex].tasks[taskIndex].project;

    document.getElementById('taskTitle').value = existingTitle;
    document.getElementById('taskDescription').value = existingDescription;
    document.getElementById('taskDate').value = existingDueDate;
    document.getElementById('taskPriority').value = existingPriority;
    document.getElementById('taskProject').value = existingProject;
}

export function getFormInputValues() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDate').value;
    const priority = document.getElementById('taskPriority').value;
    const project = document.getElementById('taskProject').value;
    const checkbox = document.querySelector('input[type=checkbox]');
    const completed = checkbox ? checkbox.checked : false;
    
    return {title, description, dueDate, priority, project, completed};
} 

export function resetBtnsActiveStates() {
    const filterBtns = document.querySelectorAll('.selectionBtn');
    const projectBtns = document.querySelectorAll('.project-item');

    projectBtns.forEach(el=> el.setAttribute('data-active', 'false'));
    filterBtns.forEach(el=> el.setAttribute('data-active', 'false'));
}

export function triggerToday() {
    const today = format(new Date(), 'yyyy-MM-dd');
            
            const taskDestination = document.getElementById('taskBoard');
            taskDestination.innerHTML = '';
            
                for(let i = 0; i<taskManager.projects.length ; i++){
                    for(let j=0; j<taskManager.projects[i].tasks.length; j++){
                        if(taskManager.projects[i].tasks[j].dueDate===today){
                            console.log(taskManager.projects[i].tasks[j].title);
                            createTaskItem(taskManager.projects[i].tasks[j], j, taskDestination)
                        }
                    }
                }
                if(taskDestination.innerHTML === ''){
                    taskDestination.innerHTML = 'no data to display'
                }
};

export function triggerCompleted() {
    const taskDestination = document.getElementById('taskBoard');
            taskDestination.innerHTML = '';
    
            for(let i = 0; i<taskManager.projects.length ; i++){
                for(let j=0; j<taskManager.projects[i].tasks.length; j++){
                    if(taskManager.projects[i].tasks[j].completed === true){
                        console.log(taskManager.projects[i].tasks[j].title);
                        createTaskItem(taskManager.projects[i].tasks[j], j, taskDestination)
                    }
                }
            }
            if(taskDestination.innerHTML === ''){
                taskDestination.innerHTML = 'no data to display'
            }
}

export function triggerOverdue() {
    const taskDestination = document.getElementById('taskBoard');
        taskDestination.innerHTML = '';

        for(let i = 0; i<taskManager.projects.length ; i++){
            for(let j=0; j<taskManager.projects[i].tasks.length; j++){
                if(isBefore(new Date(taskManager.projects[i].tasks[j].dueDate), startOfToday())){
                    console.log(taskManager.projects[i].tasks[j].title);
                    createTaskItem(taskManager.projects[i].tasks[j], j, taskDestination)
                }
            }
        }
        if(taskDestination.innerHTML === ''){
            taskDestination.innerHTML = 'no data to display'
        }
}