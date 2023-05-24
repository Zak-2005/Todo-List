export default class Task{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    setName(name){
        this.name = name;
    }

    getName(name){
        return this.title;
    }

    getDueDate(dueDate){
        return this.dueDate;
    }
}