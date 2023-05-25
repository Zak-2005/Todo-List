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

    getName(){
        return this.title;
    }

    getDueDate(){
        return this.dueDate;
    }

    getDesc(){
        return this.description;
    }
    
    getPriority(){
        return this.priority;
    }
}