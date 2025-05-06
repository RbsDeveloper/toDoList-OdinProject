import { Task } from "./tasks";
import { Project } from "./projects";
import { plainObjFactory } from "./domUtils";

   export function saveToLocalStorage(dataToSave) {
        try{

            const plainProjects = dataToSave.map(project=> ({
                name: project.name,
                tasks: project.tasks.map(task=> plainObjFactory(task.title, task.description, task.dueDate, task.priority, task.project, task.completed))
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
                            let task = new Task(taskObj.title, taskObj.description, taskObj.dueDate, taskObj.priority, taskObj.project, taskObj.completed);
                            newProject.tasks.push(task);
                        })
                        return newProject
                    });
                    
                    console.log('✅ Data loaded:', instantiatedProjects);
                    return instantiatedProjects;
                }
            } else {
                return []
            }
            console.log('✅ Loaded projects:', instantiatedProjects);

        } catch(error) {
            console.error("❌ Error loading from localStorage:", error);
        } 
    }
 




