import { taskManager } from "./taskManager.js";
import { domController } from "./domController.js";
import { createProjectBtn, editModule, getFormInputValues, obtainProjectInfo, resetBtnsActiveStates,} from "./domUtils.js";

let indexOfTaskToBeChanged;
let indexOfTheProjectThatRequiresChanges;

//Sets up initial UI state, event listeners, and renders existing data on load.
export function handleInitialContentLoading() {
    domController.displayProjects()
    domController.reRenderCurrentView()
    //opening & closing project modal
    document.getElementById('newProjectBtn').addEventListener('click', domController.openProjectForm)
    document.getElementById('cancelBtn').addEventListener('click', domController.closeProjectForm)

    //opening & closing task modal
    document.getElementById('addTask').addEventListener('click', domController.openTaskForm);
    document.getElementById('cancelTask').addEventListener('click', domController.closeTaskForm);

    domController.updateProjectSelect()
}

//Handles creation of a new project from form input and updates the UI.
export function handleProjectCreation(e) {
    e.preventDefault();
   
    const projectsBtnsContainer = document.getElementById('projectsContainer');
   
    taskManager.createNewProject()
    domController.updateProjectSelect()
    
    createProjectBtn(taskManager.projects[taskManager.projects.length-1], projectsBtnsContainer);
    domController.closeProjectForm() 
}

//Handles task form submission for both creating and editing tasks.
export function handleTaskActions(e) {
    e.preventDefault();
    const dualPurposeBtn = document.getElementById('createTask');
    
    if(dualPurposeBtn.getAttribute('data-purpose')==='create'){
            
        const formValues = getFormInputValues()
    
        let taskToCheck = taskManager.createNewTask(formValues);
        domController.closeTaskForm();
        document.getElementById('newTaskForm').reset();
        domController.reRenderCurrentView()    
    
    } else {
            
        taskManager.editTask(indexOfTheProjectThatRequiresChanges, indexOfTaskToBeChanged)
    
        domController.closeTaskForm();
        document.getElementById('newTaskForm').reset();
    
        dualPurposeBtn.innerText = 'create';
        dualPurposeBtn.setAttribute('data-purpose','create');
        indexOfTaskToBeChanged = '';
        indexOfTheProjectThatRequiresChanges = '';
    }
}

//Handles filter button clicks (Today, Completed, Overdue), updates active state and view.
export function handleFilterBtnActions(e) {
    if(e.target.id === 'today-task'){
        resetBtnsActiveStates()
        e.target.setAttribute('data-active', 'true')
        domController.setCurrentView('filter', e.target.id)
        domController.reRenderCurrentView()
    }

    if(e.target.id === 'completed-task'){
        resetBtnsActiveStates()
        e.target.setAttribute('data-active', 'true')
        domController.setCurrentView('filter', e.target.id)
        domController.reRenderCurrentView()
    }

    if(e.target.id === 'overdue-task'){
        resetBtnsActiveStates()
        e.target.setAttribute('data-active', 'true')
        domController.setCurrentView('filter', e.target.id)
        domController.reRenderCurrentView()
    }
}

//Handles clicks on project buttons: switch view or delete a project.
export function handleProjectBtnClick(e) {
    if(e.target.closest('.delete-project-btn')){
        const projectToDelete = e.target.closest('.project-item').getAttribute('data-project');
        taskManager.deleteProject(projectToDelete)
        e.target.closest('.project-item').remove();
        domController.updateProjectSelect()
        return
    }

    if(e.target.closest('.project-item')){
    
       resetBtnsActiveStates()
        
       const targetProject = e.target.closest('.project-item');
       targetProject.setAttribute('data-active', 'true')

        domController.setCurrentView('project', targetProject.getAttribute('data-project'));
        domController.reRenderCurrentView()
    }
}

//Handles task-related UI actions: delete, edit, or toggle completion status.
export function handleTaskItem(e) {
     if(e.target.closest(".delete-task-btn")){
           
        taskManager.deleteTask(obtainProjectInfo(e).indexOfTheTask, obtainProjectInfo(e).indexOfTheProject)
        domController.renderTask(taskManager.projects[obtainProjectInfo(e).indexOfTheProject]);
        return
    }
    
    if(e.target.closest(".edit-task-btn")){
        const purposebtn = document.getElementById("createTask");
        purposebtn.innerText = 'edit';
        purposebtn.setAttribute('data-purpose','edit');
       
        indexOfTaskToBeChanged = obtainProjectInfo(e).indexOfTheTask;
        indexOfTheProjectThatRequiresChanges = obtainProjectInfo(e).indexOfTheProject
            
        editModule(taskManager.projects, obtainProjectInfo(e).indexOfTheTask, obtainProjectInfo(e).indexOfTheProject)
        domController.openTaskForm();
        return
    }
    
    if(e.target.tagName==='INPUT' && e.target.type==='checkbox'){
        
        const task = e.target.closest('.task-item');
    
        taskManager.projects[obtainProjectInfo(e).indexOfTheProject].tasks[obtainProjectInfo(e).indexOfTheTask].toggleCompleted();
    
        if(taskManager.projects[obtainProjectInfo(e).indexOfTheProject].tasks[obtainProjectInfo(e).indexOfTheTask].completed===true){
            task.classList.add('complete')
        }else{
            task.classList.remove('complete')
        }
        console.log(taskManager.projects[obtainProjectInfo(e).indexOfTheProject].tasks[obtainProjectInfo(e).indexOfTheTask].completed)
        domController.reRenderCurrentView()
    }
}