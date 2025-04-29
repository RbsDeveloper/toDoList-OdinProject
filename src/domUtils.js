import { format } from 'date-fns';
import { taskManager } from './taskManager';
//  Creates a DOM element with optional classes, text, and attributes.
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

//Populates a <select> element with project options.
export function populateProjectSelectEl (arr, destination) {
    arr.forEach(el => {
        let option = createElement('option', [], `${el.name}`, {value: `${el.name}`});
        destination.append(option);
    });
}

//Renders a task item in the DOM.
export function createTaskItem(taskObj, indexToAssign, destination) { 
      
    const taskItem = createElement('div', ['task-item'], '', {'data-task-index': `${indexToAssign}`, 'data-task-project':`${taskObj.project}`});
    const taskImportance = createElement('div', ['task-importance']);
    const taskInfo = createElement('div', ['task-info'])
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
    taskInfo.append(taskHeader, taskDescription, taskFooter);
    taskItem.append(taskImportance, taskInfo);
   

    switch(taskObj.priority){
        case 'Normal':
        taskImportance.classList.add('normal');
        break;
        
        case 'High':
        taskImportance.classList.add('high');
        break;

        case 'Urgent':
        taskImportance.classList.add('urgent');
        break;
    }

    if(taskObj.completed === true){
        taskCheckBox.checked = true;
        taskItem.classList.add('complete');
    }

    if (destination) {
        destination.append(taskItem);
    }
}

//Creates and appends a project button element.
export function createProjectBtn(projectToCreate, placeToAppend) {
    let projectBtn = createElement('div', ['project-item'], '', {"data-project": `${projectToCreate.name}`, 'data-active': false,});
    let projectName = createElement('span', ['projectName'], `${projectToCreate.name}`,);
    let deletebtn = createElement('button', ['delete-project-btn'], ``, {'aria-label': 'Delete Project'});
    let deleteIcon = createElement ('i', ['fa-solid', 'fa-trash']);
    deletebtn.append(deleteIcon)
    projectBtn.append(projectName, deletebtn);

    placeToAppend.appendChild(projectBtn);
}

//Pre-fills task form inputs for editing.
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

//Collects values from the task form inputs.
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

//Resets the active state for project and filter buttons.
export function resetBtnsActiveStates() {
    const filterBtns = document.querySelectorAll('.selectionBtn');
    const projectBtns = document.querySelectorAll('.project-item');

    projectBtns.forEach(el=> el.setAttribute('data-active', 'false'));
    filterBtns.forEach(el=> el.setAttribute('data-active', 'false'));
}

//Creates a plain task object (without class instantiation).
export function plainObjFactory(title, description, dD, importance, project) {
    return {
        title: title,
        description: description,
        dueDate: dD,
        priority: importance,
        project: project,
    }
}

//Creates a filter button with a nested span.
export function createFilterBtn(textContent, btnId, spanId) {
    const btn = createElement('button', ['btn', 'selectionBtn'], textContent, {id: btnId, 'data-active': 'false'})
    const span = createElement('span', [], '', {id: spanId})
    btn.appendChild(span);

    return btn
}

//Extracts and returns task-related project information from a task item's DOM element.
export function obtainProjectInfo(e) {
    const indexOfTheTask = e.target.closest('.task-item').getAttribute('data-task-index');
    const projectName = e.target.closest('.task-item').getAttribute('data-task-project');
    const indexOfTheProject = taskManager.projects.findIndex(item => item.name === projectName);

    return {indexOfTheTask, projectName, indexOfTheProject};
}

//Clears the destination and then adds the header based on what project or filter the user has clicked
export function cleanMainDisplay(headerText, destination) {
    const header = createElement('h2', ['mainHeader'], `${headerText}`);
    destination.innerHTML = '';
    destination.append(header)
}