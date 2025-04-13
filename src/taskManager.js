import { Task } from "./tasks.js";
import { Project } from "./projects.js";
import { getFormInputValues } from "./domUtils.js";
import { domController } from "./domController.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage.js";

// taskManager is an IIFE that handles all logic related to project and task management,
// including creation, deletion, editing, and synchronization with localStorage.

export const taskManager = (()=>{
    // Loads existing projects from localStorage or falls back to defaults inside loadFromLocalStorage
    let projects = loadFromLocalStorage();
    
    //Creates a new Project instance using the name provided in the project creation input field;
    function createNewProject () {
        const projectName = document.getElementById('new-project-input-name').value;

        let projectCreated = new Project(projectName);

        projects.push(projectCreated);
        console.log(projects);

        document.getElementById('new-project-input-name').value = '';

        saveToLocalStorage()
    }

      //Deletes a project by finding its index in the projects array using its name
      function deleteProject(projectName) {
        console.log(projects)
        const projectIndex = projects.findIndex(item=>item.name === projectName);
        projects.splice(projectIndex, 1);
        console.log(projects)
        saveToLocalStorage()
    }
    
    /*
    Creates a new Task instance using the passed task values, finds the corresponding
    project in the array, inserts the new task into that project’s task list,
    and updates localStorage.
    */
    function createNewTask(taskValues) {
        
        let taskCreated = new Task(taskValues.title, taskValues.description, taskValues.dueDate, taskValues.priority, taskValues.project, taskValues.completed);
        const result = projects.findIndex(item => item.name === taskCreated.project)
        projects[result].tasks.push(taskCreated);
        console.log(projects);
  
        saveToLocalStorage()
        return taskCreated;
        
    }

    //Deletes a task at a given index from a specific project 
    function deleteTask(taskIndex, projectIndex) {
        projects[projectIndex].tasks.splice(taskIndex, 1);
        saveToLocalStorage()
    }

    /*
    Edits a task within a project. If the task is moved to another project, it's removed
    from the current one and recreated in the new project. If not, the task's existing properties
    are updated using its setters. Then the view and localStorage are updated.
    */
    function editTask(projectData, taskData){
        
        const taskBeforeChanges = projects[projectData].tasks[taskData];

        const newFormValues = getFormInputValues();

        console.log(taskBeforeChanges);
        console.log(newFormValues);

        if(taskBeforeChanges.project !== newFormValues.project){
            document.querySelector(`[data-task-index = '${taskData}']`).remove();
            projects[projectData].tasks.splice(taskData, 1);
            createNewTask(newFormValues);
            domController.reRenderCurrentView()
        } else {
            
            const proto = Object.getPrototypeOf(taskBeforeChanges);
            const descriptors = Object.getOwnPropertyDescriptors(proto);
            
            for (const [key, value] of Object.entries(newFormValues)) {
                if (descriptors[key] && typeof descriptors[key].set === "function") {
                    taskBeforeChanges[key] = value;  // Calls the setter
                }
            }
            saveToLocalStorage()
            domController.reRenderCurrentView()
        }
        
    }
  
    return {projects, createNewProject, createNewTask, deleteProject, deleteTask, editTask}
})()
