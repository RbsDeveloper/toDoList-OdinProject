import { taskManager } from "./taskManager";
import { createTaskItem } from "./domUtils";
import { format, isBefore, startOfToday } from 'date-fns';


/*
Filters and displays all tasks that are due today.
Clears the task board, checks each task's due date,
and appends only the tasks matching today's date.
If no tasks match, displays a fallback message.
*/
export const today = format(new Date(), 'yyyy-MM-dd');

export function triggerToday() {
    
            
            const taskDestination = document.getElementById('taskBoard');
            taskDestination.innerHTML = '';
            
                for(let i = 0; i<taskManager.projects.length ; i++){
                    for(let j=0; j<taskManager.projects[i].tasks.length; j++){
                        if(taskManager.projects[i].tasks[j].dueDate===today){
                            console.log(taskManager.projects[i].tasks[j].title);
                            createTaskItem(taskManager.projects[i].tasks[j], j, taskDestination)
                        }
                    }
                }
                if(taskDestination.innerHTML === ''){
                    taskDestination.innerHTML = 'no data to display'
                }
};

/**
Filters and displays all completed tasks.
Iterates through every task in all projects,
and appends only those with the completed flag set to true.
Displays a message if none are found.
*/
export function triggerCompleted() {
    const taskDestination = document.getElementById('taskBoard');
            taskDestination.innerHTML = '';
    
            for(let i = 0; i<taskManager.projects.length ; i++){
                for(let j=0; j<taskManager.projects[i].tasks.length; j++){
                    if(taskManager.projects[i].tasks[j].completed === true){
                        console.log(taskManager.projects[i].tasks[j].title);
                        createTaskItem(taskManager.projects[i].tasks[j], j, taskDestination)
                    }
                }
            }
            if(taskDestination.innerHTML === ''){
                taskDestination.innerHTML = 'no data to display'
            }
}

/**
Filters and displays all tasks that are overdue.
Uses date-fns to compare each task’s due date with today’s date.
If a task’s due date is before today, it's rendered to the DOM.
Displays a fallback message if no overdue tasks exist.
*/
export function triggerOverdue() {
    const taskDestination = document.getElementById('taskBoard');
        taskDestination.innerHTML = '';

        for(let i = 0; i<taskManager.projects.length ; i++){
            for(let j=0; j<taskManager.projects[i].tasks.length; j++){
                if(isBefore(new Date(taskManager.projects[i].tasks[j].dueDate), startOfToday())){
                    console.log(taskManager.projects[i].tasks[j].title);
                    createTaskItem(taskManager.projects[i].tasks[j], j, taskDestination)
                }
            }
        }
        if(taskDestination.innerHTML === ''){
            taskDestination.innerHTML = 'no data to display'
        }
}