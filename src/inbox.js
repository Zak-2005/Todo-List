export const content = document.createElement("div");
content.classList.add("content");

const inboxHeader = document.createElement("div");
inboxHeader.classList.add("inboxHeader");

const inboxTitle = document.createElement('div');
inboxTitle.classList.add('pageTitle');
inboxTitle.textContent = "Inbox"

const inboxCommands = document.createElement('div');
inboxCommands.classList.add('inboxCommands')

const addTask = document.createElement("img");
addTask.src = "../addTask.png";
addTask.alt = "add task";

const priority = document.createElement('div');
priority.textContent = "Priority"

inboxCommands.appendChild(addTask);
inboxCommands.appendChild(priority)

inboxHeader.appendChild(inboxTitle);
inboxHeader.appendChild(inboxCommands);

content.appendChild(inboxHeader);

const inboxContent = document.createElement('div');
inboxContent.classList.add('inboxContent');

function Todo (title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

let ToDo = [];

const addToDo = () => {
  const newTodo = new Todo(
    document.getElementById("Title").value,
    document.getElementById("description").value,
    document.getElementById("dueDate").value,
    document.getElementById("priority").value
  );
  ToDo.push(newTodo);
  displayToDo(newTodo);
  clearForm();
}

const listOfToDos = document.createElement("div");
listOfToDos.classList.add("listOfToDos");
content.appendChild(listOfToDos);

const displayToDo = (todo)=>{
  const toDoInfo = document.createElement("div");
  toDoInfo.classList.add("todo");

  const title = document.createElement("li");
  title.classList.add("title");
  title.textContent = todo.title;
  toDoInfo.appendChild(title);

  const description = document.createElement("li");
  description.classList.add("description");
  description.textContent = todo.description;
  toDoInfo.appendChild(description);

  const dueDate = document.createElement("li");
  dueDate.classList.add("dueDate");
  dueDate.textContent = todo.dueDate
  toDoInfo.appendChild(dueDate);

  const priority = document.createElement("li");
  priority.classList.add("priority");
  priority.textContent = todo.priority;
  toDoInfo.appendChild(priority);

  listOfToDos.appendChild(toDoInfo);
}

const form = () =>{
  const formPopUp = document.createElement('div');
  formPopUp.setAttribute('id', 'add');

  const formElement = document.createElement('form');
  formElement.classList.add('form-container');

  const formHead = document.createElement('div');
  formHead.classList.add('form-title')
  formHead.textContent = "Add To Do:";
  formElement.appendChild(formHead);

  const {title, inputTitle} = taskName();
  formElement.appendChild(title);
  formElement.appendChild(inputTitle);

  const { description, inputDescription } = Description();
  formElement.appendChild(description);
  formElement.appendChild(inputDescription);

  const { dueDate, inputDueDate } = DueDate();
  formElement.appendChild(dueDate);
  formElement.appendChild(inputDueDate);

  const { priority, inputPriority } = Priority();
    formElement.appendChild(priority);
    formElement.appendChild(inputPriority);

  const addTodo = document.createElement('div');
  addTodo.classList.add("addTodo");
  addTodo.textContent = 'Add ToDo';
  addTodo.addEventListener('click', () =>{
    if(inputTitle.value.length>0){
    addToDo();
    content.removeChild(formPopUp);
    oneForm=false;
    }
    else{
      alert("Enter a task name");
    }
  })
 
  formElement.appendChild(addTodo);

    formPopUp.appendChild(formElement)
    return {formPopUp}
  }

  const taskName = () =>{
    const title = document.createElement('label');
    title.setAttribute("for", "Title");
    title.textContent= "Task Name";
    const inputTitle = document.createElement('input');
    inputTitle.type = "text";
    inputTitle.placeholder = "Enter Task Name";
    inputTitle.id = "Title";
    inputTitle.name = "Title";
    return {title, inputTitle};
  }

  const Description = () =>{
    const description = document.createElement('label');
    description.setAttribute("for", "description");
    description.textContent= "Description";
    const inputDescription = document.createElement('input');
    inputDescription.type = "text";
    inputDescription.placeholder = "Enter Description";
    inputDescription.id = "description";
    inputDescription.name = "description";
    return {description, inputDescription};
  }

  const DueDate = () =>{
    const dueDate = document.createElement('label');
    dueDate.setAttribute("for", "dueDate");
    dueDate.textContent= "Due Date:";
    const inputDueDate = document.createElement('input');
    inputDueDate.type = "date";
    inputDueDate.id = "dueDate";
    inputDueDate.name = "dueDate";

    return {dueDate, inputDueDate};
  }

  const Priority = () =>{
    const priority = document.createElement('label');
    priority.setAttribute("for", "priority");
    priority.textContent= "Priority:";

    const inputPriority = document.createElement('select');
    inputPriority.id = "priority";
    inputPriority.name = "priority";

    const priority1 = document.createElement('option');
    priority1.value = "Priority 1";
    priority1.text = "Priority 1";
    inputPriority.appendChild(priority1);

    const priority2 = document.createElement('option');
    priority2.value = "Priority 2";
    priority2.text = "Priority 2";
    inputPriority.appendChild(priority2);

    const priority3 = document.createElement('option');
    priority3.value = "Priority 3";
    priority3.text = "Priority 3";
    inputPriority.appendChild(priority3);

    return {priority, inputPriority};
  }

  
  function clearForm() {
    document.getElementById("Title").value = "";
    document.getElementById("description").value = "";
  }
  
  let oneForm = false;
  addTask.addEventListener("click", () => {
    if(oneForm==false){
    const formTest = form();
    content.appendChild(formTest.formPopUp);
    oneForm=true;
    }
  });