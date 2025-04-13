import { createElement, createFilterBtn} from "./domUtils";

/* Creates the top header of the application */
function createHeader() {
    const header = createElement('header');

    const addTaskBtn = createElement('button', ['btn', 'addTaskBtn'], 'Add Task', {id:'addTask'})

    const logo = createElement('div', ['logo'], 'TaskForge');

    const btnContainer = createElement('div', ['header-btn-container']);

    const gitHubBtn = createElement('a', ["gitHubBtn"], '', {
        href: "https://github.com/RbsDeveloper",
        target: "_blank",
        "aria-label": "Github Profile",
    });

    const gitHubIcon = createElement('i', ['fa-brands', 'fa-github']);
    gitHubBtn.appendChild(gitHubIcon);

    const toggleMenuBtn = createElement('button', ['menuToggler'], '', {
        "aria-label": "Toggle Menu",
    });

    const menuIcon = createElement('i', ['fa-solid', 'fa-indent']);
    toggleMenuBtn.appendChild(menuIcon);

    btnContainer.append(gitHubBtn, toggleMenuBtn);
    header.append(addTaskBtn, logo, btnContainer);

    return header;
}

/* Creates the sidebar menu, including task filtering buttons */

function createMenu() {

    const aside = createElement('aside');

    const selectionBtnContainer = createElement('div', ['selectionBtnContainer'], '', {id: 'filteringBtnsContainer'});
    const todayBtn = createFilterBtn('Today', 'today-task', 'today-tasks-number');
    const completedBtn = createFilterBtn('Completed', 'completed-task', 'completed-tasks-number');
    const overdueBtn = createFilterBtn('Overdue', 'overdue-task', 'overdue-tasks-number');

    selectionBtnContainer.append(todayBtn, completedBtn, overdueBtn);

    const projectTitle = createElement('h1', ['projectTitle'], 'My projects');

    const projectContainer = createElement('div', ['projects-container'], '', {
        id: 'projectsContainer',
    })

    const newProjectbtn = createElement('button', ['btn', 'newProjectBtn'], 'New Project', {
        id: 'newProjectBtn',
    })


    aside.append(selectionBtnContainer, projectTitle, projectContainer, newProjectbtn);
    return aside;
}

/* Creates the main display area where tasks will be shown. */

function createMain() {
    const main = createElement('main', ['displayBoard'], '', {id: 'taskBoard',});

    return main;
}

/* Creates and returns a dialog for adding a new project. */

function createNewProjectDialog() {
    const dialog = createElement('dialog', ['newProjectDialog'], '', {id:'newProjectDialog'});
    const dialogTitle = createElement('h3', ['dialogTitle'], 'New Project');
    const dialogForm = createElement('form', ['newProjectDialogForm'], '', {id: 'projectForm'});
    const nameInput = createElement('input', [], '', {
        placeholder: 'Project name',
        id: 'new-project-input-name',
        required:'',
        name: 'projectName'
    });
    const btnsContainer = createElement('div', ['btnsContainer']);
    const createButton = createElement('button', ['createProjectBtn'], 'Create', {id:'createBtn', type:'submit'});
    const cancelButton = createElement('button', ['createProjectBtn'], 'Cancel', {id:'cancelBtn', type:'reset'});

    btnsContainer.append(createButton, cancelButton);
    dialogForm.append(nameInput, btnsContainer);
    dialog.append(dialogTitle, dialogForm);

    return dialog;
}

/* Creates and returns a dialog for creating or editing a task, with all necessary input fields and labels.*/

function createNewTaskDialog() {
    const dialog = createElement('dialog', ['newTaskDialog'], '', {id:'newTaskDialog'});
    const dialogTitle = createElement('h3', ['dialogTitle'], 'New Task');
    const dialogForm = createElement('form', ['newTaskDialogForm'], '', {id:'newTaskForm'});

    const titleLabel = createElement('label', [], 'Title', {for: 'taskTitle'});
    const titleInput = createElement('input', ['taskTitle'], '', {
        placeholder: '',
        id: 'taskTitle',
        required: '',
        name: 'taskTitle',
    });

    const descriptionLabel = createElement('label', [], 'Description', {
        for: 'taskDescription',
    });
    const descriptionInput = createElement('textarea', [], '', {
        name: 'taskDescription',
        id: 'taskDescription',
        required: '',
        minlength: '10',
        maxlength: '120',
    });
    
    const dateLabel = createElement('label', [], 'Date', {
        for: 'taskDate',
    });
    const dateInput = createElement('input', [], '', {
        type: 'date',
        name: 'taskDate',
        id: 'taskDate',
        required: '',
    });

    const priorityLabel = createElement('label', [], 'Priority', {
        for: 'taskPriority',
    });
    const priorityInput = createElement('select', [], '', {
        name: 'taskPriority',
        id: 'taskPriority',
        required: '',
    });
    const normalPriority = createElement('option', [], 'Normal', {value: 'Normal'});
    const highPriority = createElement('option', [], 'High', {value: 'High'});
    const urgentPriority = createElement('option', [], 'Urgent', {value: 'Urgent'});
    priorityInput.append(normalPriority, highPriority, urgentPriority);

    const projectLabel = createElement('label', [], 'Project', {
        for: 'taskProject',
    });
    const projectInput = createElement('select', [], '', {
        name: 'taskProject',
        id: 'taskProject',
        required: '',
    });

    const btnsContainer = createElement('div', ['btnsContainer']);
    const createButton = createElement('button', ['createProjectBtn'], 'Create', {id:'createTask', type:'submit', 'data-purpose':'create'});
    const cancelButton = createElement('button', ['cancelProjectBtn'], 'Cancel', {id:'cancelTask', type:'reset'});

    btnsContainer.append(createButton, cancelButton);

    dialogForm.append(titleLabel, titleInput, descriptionLabel, descriptionInput, dateLabel, dateInput, priorityLabel, priorityInput,projectLabel,projectInput, btnsContainer);
    dialog.append(dialogTitle, dialogForm);

    return dialog
}

/* Builds and appends the full layout of the application to the DOM. */

export function createLayout() {
 const content = document.getElementById('content');
 content.append(createHeader(), createMenu(), createMain(), createNewProjectDialog(), createNewTaskDialog());
}