import Task from "./Task";
import projectTodoList from "./projectTodoList";
import ToDoList from "./ToDoList";

const webpage = new ToDoList();
let project = 0;
export default class Page {
  static todoWebsite() {
    Page.buttons();
    Page.displayProject();
  }

  static displayProject() {
    Page.clean(document.body);
    const projects = document.querySelector(".defaultPages").childNodes;
    for (let i = 0; i < projects.length; i++) {
      projects[i].addEventListener("click", () => {
        Page.header(projects[i].textContent);
        Page.displayTodos(projects[i].textContent, i);
        project = i;
      });
    }
  }

  static header(name) {
    const projectHeader = document.querySelector(".pageTitle");
    projectHeader.textContent = name;
  }

  static displayTodos(name, counter) {
    const todos = document.querySelector(".toDos");
    todos.innerHTML = "";
    const project = webpage.getProject(counter).getTasks();
    project.forEach((task) =>
      Page.createTask(task.getName(), task.getDueDate())
    );
  }

  static createTask(name, dueDate) {
    const tasks = document.querySelector(".toDos");
    tasks.innerHTML += `
    <div class="todoItem">
        <div>${name}</div>
        <div>${dueDate}</div>
    </div>
    `;
  }

  static createProject(name) {
    const projects = document.querySelector(".Projects");
    projects.innerHTML += `
    <div class="project">
        <div>${name}</div>
    </div>
    `;
  }

  static addProject() {
    const sidebar = document.querySelector(".Projects");
    const form = document.createElement("div");
    form.classList.add("projectForm");
    form.innerHTML = `
    <div class="form-project">
        <form action="" class="form-project-container">
          <label for="projectName"><b>Project Name</b></label>
          <input type="text" placeholder="Enter Project Name" id="projectName" name="projectName" required />      
          <div>
          <button type="button" class="submitProject">Add Project</button>
          <button type="button" class="btn cancel">
            Cancel
          </button>
          </div>
        </form>
      </div>`;
    sidebar.appendChild(form);
    const submit = document.querySelector(".submitProject");
    console.log(submit);
    submit.addEventListener("click", Page.submitProjectForm);
  }

  static submitProjectForm(name) {
    webpage.addProject(new projectTodoList(name));
    Page.createProject(document.querySelector("#projectName").value);
    const sidebar = document.querySelector(".Projects");
    const form = document.querySelector(".projectForm");
    sidebar.removeChild(form);
  }
  static addTask() {
    const content = document.querySelector(".toDos");
    const form = document.createElement("div");
    form.classList.add("form");
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
          <button type="button" class="btn cancel">
            Cancel
          </button>
        </form>
      </div>`;
    content.appendChild(form);
    const submit = document.querySelector(".btn");
    submit.addEventListener("click", () => Page.submitForm());
  }

  static submitForm() {
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
      document.querySelector("#dueDate").value
    );
    const content = document.querySelector(".toDos");
    const form = document.querySelector(".form");
    content.removeChild(form);
  }

  static buttons() {
    const addTask = document.querySelector(".addTask");
    addTask.addEventListener("click", Page.addTask);

    const addProject = document.querySelector(".addProject");
    addProject.addEventListener("click", Page.addProject);
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
