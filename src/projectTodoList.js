import Task from "./Task.js"

const todoContent = document.querySelector(".toDos")
export default class projectTodoList{
    constructor(name){
        this.name = name;
        this.todoList = [];
    }
    getName(){
        return this.name;
    }
    getTasks(){
        return this.todoList;
    }
    
    addTask(title, description, dueDate, priority){
        this.todoList.push(new Task(title, description, dueDate, priority));
    }

     displayTasks(){
        this.todoList.forEach((project)=>{
            todoContent.appendChild(project);
        })
        }
     }