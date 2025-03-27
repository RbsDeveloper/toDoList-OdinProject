//Class used to create new tasks, i've used this instead of FactoryFuncs or objConstructor because of the large amount of instances
export class Task {
    constructor(title, description, dueDate, priority = "medium", project = "inbox") {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._project = project;
        this._completed = false;
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

      // Converts Task instance to plain object
      toPlainObject() {
        return {
            title: this._title,
            description: this._description,
            dueDate: this._dueDate,
            priority: this._priority,
            project: this._project,
            completed: this._completed
        };
    }

    // Recreates Task from plain object
    static from(obj) {
        let task = new Task(
            obj.title,
            obj.description,
            obj.dueDate,
            obj.priority,
            obj.project
        );
        if (obj.completed) task.toggleCompleted();
        return task;
    }
   
}
