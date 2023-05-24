import Task from "./Task.js"
import projectTodoList from "./projectTodoList.js";

export default class ToDoList{
    constructor(){
        this.projectList = [];
        this.projectList.push(new projectTodoList("Inbox"));
        this.projectList.push(new projectTodoList("Today"));
        this.projectList.push(new projectTodoList("Upcoming"));
    }

     addProject(project){
        this.projectList.push(project);
    }

    getProject(x){
        return this.projectList[x];
    }

    getProjects(){
        return this.projectList;
    }
     }