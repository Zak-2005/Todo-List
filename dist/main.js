(()=>{"use strict";class e{constructor(e,t,o,c){this.title=e,this.description=t,this.dueDate=o,this.priority=c}setName(e){this.name=e}getName(){return this.title}getDueDate(){return this.dueDate}getDesc(){return this.description}getPriority(){return this.priority}}const t=document.querySelector(".toDos");class o{constructor(e){this.name=e,this.todoList=[]}getName(){return this.name}getTasks(){return this.todoList}addTask(t,o,c,r){this.todoList.push(new e(t,o,c,r))}displayTasks(){this.todoList.forEach((e=>{t.appendChild(e)}))}}const c=new class{constructor(){this.projectList=[],this.projectList.push(new o("Inbox")),this.projectList.push(new o("Today")),this.projectList.push(new o("Upcoming"))}addProject(e){this.projectList.push(e)}getProject(e){return this.projectList[e]}getProjects(){return this.projectList}};let r=0,n=!1,d=!1;class a{static todoWebsite(){a.buttons(),a.displayDefaultProjects()}static displayDefaultProjects(){a.clean(document.body);const e=document.querySelector(".defaultPages").childNodes;document.querySelector(".defaultPages").firstChild.classList.toggle("clickedPage");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(()=>{a.header(e[t].textContent),a.displayTodos(e[t].textContent,t),r=t})),e[t].addEventListener("click",(()=>{const o=document.querySelector(".clickedPage");null!==o&&o.classList.remove("clickedPage"),e[t].classList.toggle("clickedPage")}))}static displayAddedProject(){a.clean(document.body);const e=document.querySelector(".Projects").childNodes;for(let t=0;t<e.length;t++)e[t].firstChild.addEventListener("click",(()=>{a.header(e[t].firstChild.textContent),a.displayTodos(e[t].firstChild.textContent,t+3),r=t+3})),e[t].firstChild.addEventListener("click",(()=>{const o=document.querySelector(".clickedPage");null!==o&&o.classList.remove("clickedPage"),e[t].classList.toggle("clickedPage")}))}static header(e){document.querySelector(".pageTitle").textContent=e}static displayTodos(e,t){n=!1,document.querySelector(".toDos").innerHTML="",c.getProject(t).getTasks().forEach((e=>{a.createTask(e.getName(),e.getDueDate(),e.getDesc(),e.getPriority())}))}static createTask(e,t,o,n){const d=document.querySelector(".toDos"),a=document.createElement("div"),i=document.createElement("div");i.classList.add("todoInfo"),a.classList.add("todoItem");const s=document.createElement("div");s.classList.add("expand"),s.textContent=e,"Priority 1"===n?a.classList.add("priorityOne"):"Priority 2"===n?a.classList.add("priorityTwo"):"Priority 3"===n&&a.classList.add("priorityThree");let l=!1;s.addEventListener("click",(()=>{if(!1===l){l=!0,a.classList.add("clickedTodo"),i.classList.add("clicked");const e=document.createElement("div");e.textContent=o,i.appendChild(e);const t=document.createElement("div");t.textContent=n,i.appendChild(t);const c=document.createElement("button");c.textContent="Close",c.addEventListener("click",(()=>{a.classList.remove("clickedTodo"),i.classList.remove("clicked"),i.removeChild(e),i.removeChild(t),i.removeChild(c),l=!1})),i.appendChild(c)}})),i.appendChild(s);const u=document.createElement("div");u.classList.add("expand"),u.textContent=t,i.appendChild(u);const m=document.createElement("div");m.classList.add("todoControls");const p=document.createElement("input");p.type="checkbox",m.appendChild(p);const y=document.createElement("img");y.src="trash.png",y.addEventListener("click",(()=>{d.removeChild(a),c.getProject(r).getTasks().forEach((e=>{c.getProject(r).getTasks().splice(a,1)}))})),m.appendChild(y),a.appendChild(i),a.appendChild(m),d.appendChild(a)}static createProject(e){const t=document.querySelector(".Projects"),o=document.createElement("div");o.classList.add("projectItem");const n=document.createElement("div");n.textContent=e,o.appendChild(n);const d=document.createElement("img");d.src="trash.png",d.alt="trash project",d.addEventListener("click",(()=>{t.removeChild(o);const e=c.getProjects().indexOf(o);c.getProjects().splice(e,1),a.header("Inbox"),a.displayTodos("Inbox",0),r=0})),o.appendChild(d),t.appendChild(o)}static addProject(){const e=document.querySelector(".addedProjects"),t=document.createElement("div");t.classList.add("projectForm"),t.innerHTML='\n    <div class="form-project">\n        <form action="" class="form-project-container">\n          <label for="projectName"><b>Project Name</b></label>\n          <input type="text" placeholder="Enter Project Name" id="projectName" name="projectName" required />      \n          <div>\n          <button type="button" class="submitProject">Add Project</button>\n          <button type="button" class="projectCancel">\n            Cancel\n          </button>\n          </div>\n        </form>\n      </div>',e.appendChild(t),document.querySelector(".projectCancel").addEventListener("click",(()=>{e.removeChild(t),d=!1})),document.querySelector(".submitProject").addEventListener("click",(()=>{a.submitProjectForm(),d=!1}))}static submitProjectForm(e){c.addProject(new o(e)),a.createProject(document.querySelector("#projectName").value);const t=document.querySelector(".addedProjects"),r=document.querySelector(".projectForm");t.removeChild(r),a.displayAddedProject()}static addTask(){const e=document.querySelector(".toDos"),t=document.createElement("div");t.classList.add("form"),"Today"!==document.querySelector(".pageTitle").textContent?t.innerHTML='\n      <div class="form-popup">\n          <form action="" class="form-container">\n            <h1>Add Todo</h1>\n            <label for="taskName"><b>Task Name</b></label>\n            <input type="text" placeholder="Enter Task Name" id="taskName" name="taskName" required />\n  \n            <label for="desc"><b>Description</b></label>\n            <input type="text" placeholder="Enter Description" id="desc" name="desc" />\n  \n            <label for="dueDate"><b>Due Date</b></label>\n            <input type="date" id="dueDate" name="dueDate" required />\n  \n            <label for="Priority"><b>Priority</b></label>\n            <select id="priority" name="priority">\n            <option value="Priority 1">Priority 1</option>\n            <option value="Priority 2">Priority 2</option>\n            <option value="Priority 3">Priority 3</option>\n            </select>\n  \n            <button type="button" class="btn">Add Task</button>\n            <button type="button" class="btn-cancel">\n              Cancel\n            </button>\n          </form>\n        </div>':t.innerHTML='\n    <div class="form-popup">\n        <form action="" class="form-container">\n          <h1>Add Todo</h1>\n          <label for="taskName"><b>Task Name</b></label>\n          <input type="text" placeholder="Enter Task Name" id="taskName" name="taskName" required />\n\n          <label for="desc"><b>Description</b></label>\n          <input type="text" placeholder="Enter Description" id="desc" name="desc" />\n\n          <label for="Priority"><b>Priority</b></label>\n          <select id="priority" name="priority">\n          <option value="Priority 1">Priority 1</option>\n          <option value="Priority 2">Priority 2</option>\n          <option value="Priority 3">Priority 3</option>\n          </select>\n\n          <button type="button" class="btn">Add Task</button>\n          <button type="button" class="btn-cancel">\n            Cancel\n          </button>\n        </form>\n      </div>',e.appendChild(t),document.querySelector(".btn-cancel").addEventListener("click",(()=>{e.removeChild(t),n=!1})),document.querySelector(".btn").addEventListener("click",(()=>{a.submitForm(),n=!1}))}static submitForm(){const e=new Date;let t=String(e.getDate()).padStart(2,"0"),o=String(e.getMonth()+1).padStart(2,"0"),n=`${e.getFullYear()}-${o}-${t}`;"Today"!==document.querySelector(".pageTitle").textContent?(document.querySelector("#dueDate").value===n?c.getProject(1).addTask(document.querySelector("#taskName").value,document.querySelector("#desc").value,document.querySelector("#dueDate").value,document.querySelector("#priority").value):document.querySelector("#dueDate").value>n&&c.getProject(2).addTask(document.querySelector("#taskName").value,document.querySelector("#desc").value,document.querySelector("#dueDate").value,document.querySelector("#priority").value),c.getProject(r).addTask(document.querySelector("#taskName").value,document.querySelector("#desc").value,document.querySelector("#dueDate").value,document.querySelector("#priority").value),a.createTask(document.querySelector("#taskName").value,document.querySelector("#dueDate").value,document.querySelector("#desc").value,document.querySelector("#priority").value)):(c.getProject(r).addTask(document.querySelector("#taskName").value,document.querySelector("#desc").value,n,document.querySelector("#priority").value),a.createTask(document.querySelector("#taskName").value,n,document.querySelector("#desc").value,document.querySelector("#priority").value));const d=document.querySelector(".toDos"),i=document.querySelector(".form");d.removeChild(i)}static buttons(){document.querySelector(".home").addEventListener("click",(()=>{a.header("Inbox"),a.displayTodos("Inbox",0),r=0;const e=document.querySelector(".clickedPage");null!==e&&e.classList.remove("clickedPage"),document.querySelector(".defaultPages").firstChild.classList.toggle("clickedPage")})),document.querySelectorAll(".addTask").forEach((e=>{e.addEventListener("click",(()=>{!1===n&&(a.addTask(),n=!0)}))})),document.querySelector(".addProject").addEventListener("click",(()=>{!1===d&&(a.addProject(),d=!0)}))}static clean(e){for(var t=0;t<e.childNodes.length;t++){var o=e.childNodes[t];8===o.nodeType||3===o.nodeType&&!/\S/.test(o.nodeValue)?(e.removeChild(o),t--):1===o.nodeType&&a.clean(o)}}}document.addEventListener("DOMContentLoaded",a.todoWebsite)})();