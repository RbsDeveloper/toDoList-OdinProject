import { Task } from "./tasks.js";
import { Project } from "./projects.js";


/*
    first it should create an inbox array to push here the tasks if thery are not realated to a certain project
    then i think 
*/

export const taskManager = (()=>{
    //Initiate the app with an Inbox and another project created
    let projects = [new Project('Inbox'), new Project('Secret')];
    
    //This function creates a new project and insert it in the projects array;
    function createNewProject () {
        const projectName = document.getElementById('new-project-input-name').value;

        let projectCreated = new Project(projectName);

        projects.push(projectCreated);

        console.log(projects);

        document.getElementById('new-project-input-name').value = '';
    }
    
    //This func creates a new task and insert it in the project we want
    function createNewTask() {
        const taskName = document.getElementById('taskTitle').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskPriority = document.getElementById('taskPriority').value;
        const taskProject = document.getElementById('taskProject').value 
        
        let taskCreated = new Task(taskName, taskDescription, taskDate, taskPriority, taskProject);
        const result = projects.findIndex(item => item.name === taskCreated.project)
        projects[result].tasks.push(taskCreated);
        console.log(projects);

        
        
        return taskCreated;
    }

    //Function used to delete a project
    function deleteProject(projectName) {
       const projectIndex = projects.findIndex(item=>item.name === projectName);
        projects.splice(projectIndex, 1);
        
    }
    
    return {projects, createNewProject, createNewTask, deleteProject}
})()

//daca atunci cand creez un task nou, acest task are un proiect selectat care coincide 
// cu un buton din aside cu data-active true, atunci dupa introducerea taskului trebuie sa bagam un re-render