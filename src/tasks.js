//Class used to create new tasks, i've used this instead of FactoryFuncs or objConstructor because of the large amount of instances
export class Task {
    constructor(title, description, dueDate, priority = "medium", project = "inbox", completed = false) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._project = project;
        this._completed = completed;
    }
    
    get title() {
        return this._title;
    }
    set title(newTitle){
        this._title = newTitle;
    }
 
    get description() {
        return this._description;
    }
    set description(newDesc) {
        this._description = newDesc;
    }

    get dueDate() {
        return this._dueDate;
    }
    set dueDate(newDate) {
        this._dueDate = newDate;
    }

    get priority() {
        return this._priority;
    }
    set priority(newPriority) {
        this._priority = newPriority;
    }

    get project() {
        return this._project;
    }
    set project(newProject) {
        this._project = newProject;
    }

    get completed() {
        return this._completed;
    }

    toggleCompleted() {
        this._completed = !this._completed
    }
   
}
