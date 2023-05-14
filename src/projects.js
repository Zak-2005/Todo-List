import {projects, addProject} from "./mainStructure"

export const test = document.createElement("div");
function Project (title) {
  this.title = title;
}

let projectssss = [];

const addProjects = () => {
  const newProject = new Project(
    document.getElementById("Title").value
  );
  projectssss.push(newProject);
  displayProject(newProject);
  clearForm();
}

const listOfProjects = document.createElement("div");
listOfProjects.classList.add("listOfProjects");
projects.appendChild(listOfProjects);

const displayProject = (project)=>{
  const title = document.createElement("li");
  title.classList.add("title");
  title.textContent = project.title;

  listOfProjects.appendChild(title);
}

const form = () =>{
  const formPopUp = document.createElement('div');
  formPopUp.setAttribute('id', 'add');

  const formElement = document.createElement('form');
  formElement.classList.add('form-container');

  const formHead = document.createElement('div');
  formHead.classList.add('form-title')
  formHead.textContent = "Add Project:";
  formElement.appendChild(formHead);

  const {title, inputTitle} = taskName();
  formElement.appendChild(title);
  formElement.appendChild(inputTitle);

  const submitProject = document.createElement('div');
  submitProject.classList.add("addTodo");
  submitProject.textContent = 'Add Project';
  submitProject.addEventListener('click', () =>{
    if(inputTitle.value.length>0){
    addProjects();
    content.removeChild(formPopUp);
    oneForm=false;
    } 
    else{
      alert("Enter Project Name");
    }
  })
 
  formElement.appendChild(submitProject);

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

  
  function clearForm() {
    document.getElementById("Title").value = "";
  }
  
  const content = document.querySelector(".content")

  let oneForm = false;
  addProject.addEventListener("click", () => {
    console.log("hello")
    if(oneForm==false){
    const formTest = form();
    content.appendChild(formTest.formPopUp);
    oneForm=true;
    }
  });
