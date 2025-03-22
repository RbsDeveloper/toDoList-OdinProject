import { createLayout } from "./layout.js";
import { taskManager } from "./taskManager.js";
import { domController } from "./domController.js";
import { addProjectEventListener, obtainProjectName } from "./projects.js";
import "./styles.css";

createLayout()
//addProjectEventListener()
//obtainProjectName()

domController.displayProjects()

document.addEventListener('DOMContentLoaded', ()=>{
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
    taskManager.createNewProject()
    domController.updateProjectSelect()
    domController.displayProjects()
    domController.closeProjectForm()
});

//This is used to create a new task
document.getElementById('newTaskForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    let taskToCheck = taskManager.createNewTask();
    domController.closeTaskForm();
    console.log(taskToCheck.project)
    let btn = document.querySelector(`[data-project=${taskToCheck.project}]`);
    
    if(btn.getAttribute('data-active')==='true'){
        //This code should be in a function --- it's repetitive
        const projectIndex = taskManager.projects.findIndex(project=>project.name===taskToCheck.project);
        domController.renderTask(taskManager.projects[projectIndex]);
    }
})

//This is an event listener created to select a project and to display his tasks or to delete the entire project
document.getElementById('projectsContainer').addEventListener('click', (e)=>{
    console.log(e.target.closest('data-project'));
    const projectBtns = document.querySelectorAll('.project-item');

    if(e.target.closest('.delete-project-btn')){
        const projectToDelete = e.target.closest('.project-item').getAttribute('data-project');
        taskManager.deleteProject(projectToDelete)
        domController.displayProjects()
        return
    }

    if(e.target.closest('.project-item')){
       projectBtns.forEach(el=> el.setAttribute('data-active', 'false'))

       const targetProject = e.target.closest('.project-item').getAttribute('data-project');

       e.target.closest('.project-item').setAttribute('data-active', 'true')
       const pIndex = taskManager.projects.findIndex(project=>project.name===targetProject);
       console.log(pIndex)
       domController.renderTask(taskManager.projects[pIndex])

    }
})