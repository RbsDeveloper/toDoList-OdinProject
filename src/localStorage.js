import { Task } from "./tasks";
import { Project } from "./projects";
import { taskManager } from "./taskManager";
import { plainObjFactory } from "./domUtils";

const createdTasks = [
    {
      title: "Rename final_final.js",
      description: "I mean it this time. It's really final.",
      dueDate: "2025-05-09",
      priority: "Normal",
      project: "Spaghetti Code",
      completed: "false"
    },
    {
      title: "Push code and pray",
      description: "If the CI doesn’t yell, it’s good enough.",
      dueDate: "2025-05-11",
      priority: "High",
      project: "Spaghetti Code",
      completed: "false"
    },
    {
      title: "Replace one bug with three",
      description: "A classic programming hydra situation.",
      dueDate: "2025-05-13",
      priority: "Normal",
      project: "Spaghetti Code",
      completed: "false"
    },
    {
      title: "Comment my code",
      description: "For Future Me, who will still hate it.",
      dueDate: "2025-05-10",
      priority: "Urgent",
      project: "Spaghetti Code",
      completed: "false"
    },
    {
      title: "Write vague commit messages",
      description: "Because 'misc fixes' totally explains it.",
      dueDate: "2025-05-14",
      priority: "Normal",
      project: "Spaghetti Code",
      completed: "false"
    }
  ]

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
                const initialProjects = [new Project('Inbox'), new Project('Spaghetti Code')];
                createdTasks.forEach(task=>initialProjects[1].tasks.push(task));
                return initialProjects;
            }
            console.log('✅ Loaded projects:', instantiatedProjects);

        } catch(error) {
            console.error("❌ Error loading from localStorage:", error);
        } 
    }
 




