import Task from "./Task";
import projectTodoList from "./projectTodoList";
import ToDoList from "./ToDoList";

const webpage = new ToDoList();
let project = 0;
let addTaskForm = false;
let addProjectForm = false;
export default class Page {
  static todoWebsite() {
    Page.buttons();
    Page.displayDefaultProjects();
  }

  static displayDefaultProjects() {
    Page.clean(document.body);
    const projects = document.querySelector(".defaultPages").childNodes;
    document.querySelector(".defaultPages").firstChild.classList.toggle("clickedPage")
    for (let i = 0; i < projects.length; i++) {
      projects[i].addEventListener("click", () => {
        Page.header(projects[i].textContent);
        Page.displayTodos(projects[i].textContent, i);
        project = i;
      });
      projects[i].addEventListener("click", ()=>{
        const clickedPage = document.querySelector(".clickedPage");
        if(clickedPage!==null){
          clickedPage.classList.remove("clickedPage");
        }
        projects[i].classList.toggle("clickedPage");
      })
    }
  }

  static displayAddedProject() {
    Page.clean(document.body);
    const addedProjects = document.querySelector(".Projects").childNodes;
    for (let i = 0; i < addedProjects.length; i++) {
      addedProjects[i].firstChild.addEventListener("click", () => {
        Page.header(addedProjects[i].firstChild.textContent);
        Page.displayTodos(addedProjects[i].firstChild.textContent, i + 3);
        project = i + 3;
      });
      addedProjects[i].firstChild.addEventListener("click", ()=>{
        const clickedPage = document.querySelector(".clickedPage");
        if(clickedPage!==null){
          clickedPage.classList.remove("clickedPage");
        }
        addedProjects[i].classList.toggle("clickedPage");
      })
    }
  }

  static header(name) {
    const projectHeader = document.querySelector(".pageTitle");
    projectHeader.textContent = name;
  }

  static displayTodos(name, counter) {
    addTaskForm = false;
    const todos = document.querySelector(".toDos");
    todos.innerHTML = "";
    const project = webpage.getProject(counter).getTasks();
    project.forEach((task) => {
      Page.createTask(
        task.getName(),
        task.getDueDate(),
        task.getPriority(),
        task.getDesc()
      );
    });
  }

  static createTask(name, dueDate, desc, prior) {
    const tasks = document.querySelector(".toDos");
    const task = document.createElement("div");

    const todoInfo = document.createElement("div");
    todoInfo.classList.add("todoInfo");

    task.classList.add("todoItem");

    const todoName = document.createElement("div");
    todoName.classList.add("expand");
    todoName.textContent = name;

    let clicked = false;
    todoName.addEventListener("click", () => {
      if (clicked === false) {
        clicked = true;
        task.classList.add("clickedTodo");

        todoInfo.classList.add("clicked");
        const description = document.createElement("div");
        description.textContent = desc;
        todoInfo.appendChild(description);

        const priority = document.createElement("div");
        priority.textContent = prior;
        todoInfo.appendChild(priority);

        const close = document.createElement("button");
        close.textContent = "Close";
        close.addEventListener("click", () => {
          task.classList.remove("clickedTodo")
          todoInfo.classList.remove("clicked");
          todoInfo.removeChild(description);
          todoInfo.removeChild(priority);
          todoInfo.removeChild(close);
          clicked = false;
        });
        todoInfo.appendChild(close);
      }
    });
    todoInfo.appendChild(todoName);

    const todoDate = document.createElement("div");
    todoDate.classList.add("expand");
    todoDate.textContent = dueDate;

    todoInfo.appendChild(todoDate);

    const todoControls = document.createElement("div");
    todoControls.classList.add("todoControls");

    const completeTodo = document.createElement("input");
    completeTodo.type = "checkbox";

    todoControls.appendChild(completeTodo);

    const trashTodo = document.createElement("img");
    trashTodo.src = "trash.png";
    trashTodo.addEventListener("click", () => {
      tasks.removeChild(task);
      webpage
        .getProject(project)
        .getTasks()
        .forEach((todo) => {
          webpage.getProject(project).getTasks().splice(task, 1);
        });
    });

    switch(prior){
      case "Priority 1": task.classList.add("priorityOne"); break;
      case "Priority 2": task.classList.add("priorityTwo"); break;
      case "Priority 3": task.classList.add("priorityThree"); break;
    }

    todoControls.appendChild(trashTodo);

    task.appendChild(todoInfo);
    task.appendChild(todoControls);

    tasks.appendChild(task);
  }

  static createProject(name) {
    const projects = document.querySelector(".Projects");

    const projectItem = document.createElement("div");
    projectItem.classList.add("projectItem");

    const projectName = document.createElement("div");
    projectName.textContent = name;

    projectItem.appendChild(projectName);

    const trashProject = document.createElement("img");
    trashProject.src = "trash.png";
    trashProject.alt = "trash project";
    trashProject.addEventListener("click", () => {
      projects.removeChild(projectItem);
      const index = webpage.getProjects().indexOf(projectItem);
      webpage.getProjects().splice(index, 1);
      Page.header("Inbox");
      Page.displayTodos("Inbox", 0);
      project = 0;
    });

    projectItem.appendChild(trashProject);

    projects.appendChild(projectItem);
  }

  static addProject() {
    const sidebar = document.querySelector(".addedProjects");
    const form = document.createElement("div");
    form.classList.add("projectForm");
    form.innerHTML = `
    <div class="form-project">
        <form action="" class="form-project-container">
          <label for="projectName"><b>Project Name</b></label>
          <input type="text" placeholder="Enter Project Name" id="projectName" name="projectName" required />      
          <div>
          <button type="button" class="submitProject">Add Project</button>
          <button type="button" class="projectCancel">
            Cancel
          </button>
          </div>
        </form>
      </div>`;
    sidebar.appendChild(form);
    const cancelProject = document.querySelector(".projectCancel");
    cancelProject.addEventListener("click", () => {
      sidebar.removeChild(form);
      addProjectForm = false;
    });
    const submit = document.querySelector(".submitProject");
    submit.addEventListener("click", () => {
      Page.submitProjectForm();
      addProjectForm = false;
    });
  }

  static submitProjectForm(name) {
    webpage.addProject(new projectTodoList(name));
    Page.createProject(document.querySelector("#projectName").value);
    const sidebar = document.querySelector(".addedProjects");
    const form = document.querySelector(".projectForm");
    sidebar.removeChild(form);
    Page.displayAddedProject();
  }
  static addTask() {
    const content = document.querySelector(".toDos");
    const form = document.createElement("div");
    form.classList.add("form");
    if (document.querySelector(".pageTitle").textContent !== "Today") {
      form.innerHTML = `
      <div class="form-popup">
          <form action="" class="form-container">
            <h1>Add Todo</h1>
            <label for="taskName"><b>Task Name</b></label>
            <input type="text" placeholder="Enter Task Name" id="taskName" name="taskName" required />
  
            <label for="desc"><b>Description</b></label>
            <input type="text" placeholder="Enter Description" id="desc" name="desc" />
  
            <label for="dueDate"><b>Due Date</b></label>
            <input type="date" id="dueDate" name="dueDate" required />
  
            <label for="Priority"><b>Priority</b></label>
            <select id="priority" name="priority">
            <option value="Priority 1">Priority 1</option>
            <option value="Priority 2">Priority 2</option>
            <option value="Priority 3">Priority 3</option>
            </select>
  
            <button type="button" class="btn">Add Task</button>
            <button type="button" class="btn-cancel">
              Cancel
            </button>
          </form>
        </div>`;
    } else {
      form.innerHTML = `
    <div class="form-popup">
        <form action="" class="form-container">
          <h1>Add Todo</h1>
          <label for="taskName"><b>Task Name</b></label>
          <input type="text" placeholder="Enter Task Name" id="taskName" name="taskName" required />

          <label for="desc"><b>Description</b></label>
          <input type="text" placeholder="Enter Description" id="desc" name="desc" />

          <label for="Priority"><b>Priority</b></label>
          <select id="priority" name="priority">
          <option value="Priority 1">Priority 1</option>
          <option value="Priority 2">Priority 2</option>
          <option value="Priority 3">Priority 3</option>
          </select>

          <button type="button" class="btn">Add Task</button>
          <button type="button" class="btn-cancel">
            Cancel
          </button>
        </form>
      </div>`;
    }
    content.appendChild(form);
    const cancelTask = document.querySelector(".btn-cancel");
    cancelTask.addEventListener("click", () => {
      content.removeChild(form);
      addTaskForm = false;
    });
    const submit = document.querySelector(".btn");
    submit.addEventListener("click", () => {
      Page.submitForm();
      addTaskForm = false;
    });
  }

  static submitForm() {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, "0");
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    if (document.querySelector(".pageTitle").textContent !== "Today") {
      if(document.querySelector("#dueDate").value === currentDate){
        webpage
        .getProject(1)
        .addTask(
          document.querySelector("#taskName").value,
          document.querySelector("#desc").value,
          document.querySelector("#dueDate").value,
          document.querySelector("#priority").value
        );
      }
      else if(document.querySelector("#dueDate").value > currentDate){
        webpage
        .getProject(2)
        .addTask(
          document.querySelector("#taskName").value,
          document.querySelector("#desc").value,
          document.querySelector("#dueDate").value,
          document.querySelector("#priority").value
        );
      }
      webpage
        .getProject(project)
        .addTask(
          document.querySelector("#taskName").value,
          document.querySelector("#desc").value,
          document.querySelector("#dueDate").value,
          document.querySelector("#priority").value
        );
      Page.createTask(
        document.querySelector("#taskName").value,
        document.querySelector("#dueDate").value,
        document.querySelector("#desc").value,
        document.querySelector("#priority").value
      );
    } else {
      webpage
        .getProject(project)
        .addTask(
          document.querySelector("#taskName").value,
          document.querySelector("#desc").value,
          currentDate,
          document.querySelector("#priority").value
        );
      Page.createTask(
        document.querySelector("#taskName").value,
        currentDate,
        document.querySelector("#desc").value,
        document.querySelector("#priority").value
      );
    }
    const content = document.querySelector(".toDos");
    const form = document.querySelector(".form");
    content.removeChild(form);
  }

  static buttons() {
    const home = document.querySelector(".home");
    home.addEventListener("click", () => {
      Page.header("Inbox");
      Page.displayTodos("Inbox", 0);
      project = 0;
      const clickedPage = document.querySelector(".clickedPage");
        if(clickedPage!==null){
          clickedPage.classList.remove("clickedPage");
        }
        document.querySelector(".defaultPages").firstChild.classList.toggle("clickedPage");
    });

    const addTask = document.querySelectorAll(".addTask");
    addTask.forEach((button) => {
      button.addEventListener("click", () => {
        if (addTaskForm === false) {
          Page.addTask();
          addTaskForm = true;
        }
      });
    });

    const addProject = document.querySelector(".addProject");
    addProject.addEventListener("click", () => {
      if (addProjectForm === false) {
        Page.addProject();
        addProjectForm = true;
      }
    });
  }

  static clean(node) {
    for (var n = 0; n < node.childNodes.length; n++) {
      var child = node.childNodes[n];
      if (
        child.nodeType === 8 ||
        (child.nodeType === 3 && !/\S/.test(child.nodeValue))
      ) {
        node.removeChild(child);
        n--;
      } else if (child.nodeType === 1) {
        Page.clean(child);
      }
    }
  }
}
