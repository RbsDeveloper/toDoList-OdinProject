import { createLayout } from "./layout.js";
import { taskManager } from "./taskManager.js";
import { domController } from "./domController.js";
import { createProjectBtn, editModule, getFormInputValues } from "./domUtils.js";

import "./styles.css";

createLayout()

document.addEventListener('DOMContentLoaded', ()=>{
 
    domController.displayProjects()
    //opening & closing project modal
    document.getElementById('newProjectBtn').addEventListener('click', domController.openProjectForm)
    document.getElementById('cancelBtn').addEventListener('click', domController.closeProjectForm)

    //opening & closing task modal
    document.getElementById('addTask').addEventListener('click', domController.openTaskForm);
    document.getElementById('cancelTask').addEventListener('click', domController.closeTaskForm);

    domController.updateProjectSelect()
})

//This is used to create a new project and also to display it as a btn in the aside
document.getElementById('projectForm').addEventListener('submit', (e)=>{
    e.preventDefault();

    const projectsBtnsContainer = document.getElementById('projectsContainer');

    taskManager.createNewProject()
    domController.updateProjectSelect()
    //domController.displayProjects()
    createProjectBtn(taskManager.projects[taskManager.projects.length-1], projectsBtnsContainer);
    domController.closeProjectForm()
});

let indexOfTaskToBeChanged;
let indexOfTheProjectThatRequiresChanges;

//This is used to create a new task
document.getElementById('newTaskForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const dualPurposeBtn = document.getElementById('createTask');

    if(dualPurposeBtn.getAttribute('data-purpose')==='create'){
        
        const formValues = getFormInputValues()

        let taskToCheck = taskManager.createNewTask(formValues);
        domController.closeTaskForm();
        document.getElementById('newTaskForm').reset();
        //console.log(taskToCheck.project)
        let btn = document.querySelector(`[data-project=${taskToCheck.project}]`);
        
        if(btn.getAttribute('data-active')==='true'){
            //This code should be in a function --- it's repetitive
            const projectIndex = taskManager.projects.findIndex(project=>project.name===taskToCheck.project);
            domController.renderTask(taskManager.projects[projectIndex]);
        }
    } else {
        console.log("this is for editing");
        
        
        taskManager.editTask(indexOfTheProjectThatRequiresChanges, indexOfTaskToBeChanged)

        domController.closeTaskForm();
        document.getElementById('newTaskForm').reset();

        dualPurposeBtn.innerText = 'create';
        dualPurposeBtn.setAttribute('data-purpose','create');
        indexOfTaskToBeChanged = '';
        indexOfTheProjectThatRequiresChanges = '';
    }
    

})

//This is an event listener created to select a project and to display his tasks or to delete the entire project
document.getElementById('projectsContainer').addEventListener('click', (e)=>{
    //console.log(e.target.closest('data-project'));
    const projectBtns = document.querySelectorAll('.project-item');

    if(e.target.closest('.delete-project-btn')){
        const projectToDelete = e.target.closest('.project-item').getAttribute('data-project');
        taskManager.deleteProject(projectToDelete)
        e.target.closest('.project-item').remove();//here i might have a little problem
        //domController.displayProjects()
        domController.updateProjectSelect()
        return
    }

    if(e.target.closest('.project-item')){
    
       projectBtns.forEach(el=> el.setAttribute('data-active', 'false'))

       const targetProject = e.target.closest('.project-item').getAttribute('data-project');

       e.target.closest('.project-item').setAttribute('data-active', 'true')
       const pIndex = taskManager.projects.findIndex(project=>project.name===targetProject);
       //console.log(pIndex)
       domController.renderTask(taskManager.projects[pIndex])
        return
    }
})



document.getElementById('taskBoard').addEventListener('click', (e)=>{
    
    if(e.target.closest(".delete-task-btn")){
       
        //REPETITIVE CODE
        const indexOfTheTask = e.target.closest('.task-item').getAttribute('data-task-index');
        const projectName = e.target.closest('.task-item').getAttribute('data-task-project');
        const indexOfTheProject = taskManager.projects.findIndex(item => item.name === projectName);
        
        taskManager.deleteTask(indexOfTheTask, indexOfTheProject);
        domController.renderTask(taskManager.projects[indexOfTheProject]);
        return
    }

    if(e.target.closest(".edit-task-btn")){
        const purposebtn = document.getElementById("createTask");
        purposebtn.innerText = 'edit';
        purposebtn.setAttribute('data-purpose','edit');
    //REPETITIVE CODE
        const indexOfTheTask = e.target.closest('.task-item').getAttribute('data-task-index');
        const projectName = e.target.closest('.task-item').getAttribute('data-task-project');
        const indexOfTheProject = taskManager.projects.findIndex(item => item.name === projectName);

        indexOfTaskToBeChanged = indexOfTheTask;
        indexOfTheProjectThatRequiresChanges = indexOfTheProject
        
        editModule(taskManager.projects, indexOfTheTask, indexOfTheProject)
        domController.openTaskForm();
        return
    }
    
})