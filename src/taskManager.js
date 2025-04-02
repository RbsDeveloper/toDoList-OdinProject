import { Task } from "./tasks.js";
import { Project } from "./projects.js";
import { createTaskItem, getFormInputValues } from "./domUtils.js";
import { domController } from "./domController.js";
/*
    first it should create an inbox array to push here the tasks if thery are not realated to a certain project
    then i think 
*/

export const taskManager = (()=>{
    //Initiate the app with an Inbox and another project created
   
    let projects = [new Project('Inbox'), new Project('Secret')];
    projects[1].tasks.push({title: 'brainstorming', description: 'alslndxanxkjna', dueDate: '2025-03-27', priority: 'Normal', project: 'Secret',})
    
    //This function creates a new project and insert it in the projects array;
    function createNewProject () {
        const projectName = document.getElementById('new-project-input-name').value;

        let projectCreated = new Project(projectName);

        projects.push(projectCreated);
        console.log(projects);

        document.getElementById('new-project-input-name').value = '';
    }

      //Function used to delete a project
      function deleteProject(projectName) {
        console.log(projects)
       const projectIndex = projects.findIndex(item=>item.name === projectName);
        projects.splice(projectIndex, 1);
        console.log(projects)

    }
    
    //This func creates a new task and insert it in the project we want
    function createNewTask(taskValues) {

        //const taskValues =  getFormInputValues();
        
        let taskCreated = new Task(taskValues.title, taskValues.description, taskValues.dueDate, taskValues.priority, taskValues.project);
        const result = projects.findIndex(item => item.name === taskCreated.project)
        projects[result].tasks.push(taskCreated);
        console.log(projects);

        
        return taskCreated;
    }

    function deleteTask(taskIndex, projectIndex) {
        projects[projectIndex].tasks.splice(taskIndex, 1);
    }

    function editTask(projectData, taskData){
        
        const taskBeforeChanges = projects[projectData].tasks[taskData];

        const newFormValues = getFormInputValues();

        if(taskBeforeChanges.project !== newFormValues.project){
            document.querySelector(`[data-task-index = '${taskData}']`).remove();
            projects[projectData].tasks.splice(taskData, 1);
            createNewTask(newFormValues);
        } else {
            console.log('it worked just fine, code the new part');
            
            const proto = Object.getPrototypeOf(taskBeforeChanges);
            const descriptors = Object.getOwnPropertyDescriptors(proto);
            
            for (const [key, value] of Object.entries(newFormValues)) {
                if (descriptors[key] && typeof descriptors[key].set === "function") {
                    taskBeforeChanges[key] = value;  // Calls the setter
                }
            }

            domController.renderTask(projects[projectData]);
            
        }
        
    }
  
    
    return {projects, createNewProject, createNewTask, deleteProject, deleteTask, editTask}
})()
