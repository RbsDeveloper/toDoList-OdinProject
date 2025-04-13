import { Task } from "./tasks";
import { Project } from "./projects";
import { taskManager } from "./taskManager";
import { plainObjFactory } from "./domUtils";

   export function saveToLocalStorage() {
        try{

            const plainProjects = taskManager.projects.map(project=> ({
                name: project.name,
                tasks: project.tasks.map(task=> plainObjFactory(task.title, task.description, task.dueDate, task.priority, task.project))
            }));

            localStorage.setItem('projects', JSON.stringify(plainProjects)) ;
            console.log('i have saved those projects:', plainProjects );

        } catch(error){
            console.error("❌ Error saving to localStorage:", error);
        }
    }

  export function loadFromLocalStorage() {
        try{
            const storedProjects = JSON.parse(localStorage.getItem('projects'));

            if(storedProjects){
                
                if(Array.isArray(storedProjects)){
                    const instantiatedProjects = storedProjects.map(obj=>{
                        let newProject = new Project(obj.name);
                        obj.tasks.forEach(taskObj=> {
                            let task = new Task(taskObj.title, taskObj.description, taskObj.dueDate, taskObj.priority, taskObj.project);
                            newProject.tasks.push(task);
                        })
                        return newProject
                    });
                    
                    console.log('✅ Data loaded:', instantiatedProjects);
                    return instantiatedProjects;
                }
            } else {
                return [new Project('Inbox'), new Project('coding')];
            }
            console.log('✅ Loaded projects:', instantiatedProjects);

        } catch(error) {
            console.error("❌ Error loading from localStorage:", error);
        } 
    }
 




