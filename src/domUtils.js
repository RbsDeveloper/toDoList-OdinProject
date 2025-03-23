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
/*
 function createTask(arr, destination) {
    destination.innerHtml = '';
    arr.forEach((el, index)=>{
        const taskMainContainer = createElement('div', ['taskMainContainer'], '', {id: `${el.title+index}`});

        const taskDetailsContainer = createElement('div', ['taskDetails']);
        const taskCheckBox = createElement('input', [], '', {type: 'checkbox', id: `${el.title}check`});
        const taskTitle = createElement('label', [], `${el.title}`, {for: `${el.title}check`});
        taskDetailsContainer.append(taskCheckBox, taskTitle);

        const taskButtonsContainer = createElement('div', ['taskBtns'], '');
        const dueDate = createElement('p', ['dueDate'], `${el.dueDate}`);
        const descriptionContainer = createElement('div', ['descriptionContainer'], `<p>${el.description}</p>`)
        taskButtonsContainer.append(dueDate, descriptionContainer);

        taskMainContainer.append(taskDetailsContainer, taskButtonsContainer);

        destination.append(taskMainContainer);
    })
}*/

//That function materialize the task Object as a component and it also appends it to the display container
export function createTaskItem(arr, destination) { 
    destination.innerHTML = '';
    arr.forEach((el, index)=>{
        const taskItem = createElement('div', ['task-item'], '', {'data-task-index': `${index}`});
        const taskHeader = createElement('div', ['task-header'],);

        
        const taskCheckBox = createElement('input', [], '', {type: 'checkbox'});
        const taskTitle = createElement('h3', ['task-title'], `${el.title}`);
        const taskActions = createElement('div', ['task-actions'], '');
        const editBtn = createElement('button', ['edit-task-btn']);
        const editIcon = createElement('i', ['fa-solid', 'fa-pencil']);
        const deleteBtn = createElement('button', ['delete-task-btn']);
        const deleteIcon = createElement('i', ['fa-solid', 'fa-trash']);
        
        editBtn.append(editIcon);
        deleteBtn.append(deleteIcon);
        taskActions.append(editBtn, deleteBtn);
        taskHeader.append(taskCheckBox, taskTitle, taskActions);

        const taskDescription = createElement('p', ['task-description'], `${el.description}`);
        const taskFooter = createElement('div', ['task-footer'],);
        const taskDate = createElement('p', ['task-date'], `${el.dueDate}`);
        const taskProject = createElement('p', ['task-project'], `${el.project}`);

        taskFooter.append(taskDate, taskProject);
        taskItem.append(taskHeader, taskDescription, taskFooter);
        destination.append(taskItem);
    })
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