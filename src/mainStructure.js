  import {content} from "./inbox"

  export const header = document.createElement("div");
  header.classList.add("header");

  const currentContent = document.querySelector(".content");
  currentContent.appendChild(content);

  const leftHeader = document.createElement("div");
  leftHeader.classList.add("leftHeader")
  const home = document.createElement("img");
  home.classList.add("home");
  home.src = "../homeTest.png"
  home.alt = "home";

  leftHeader.appendChild(home);

  const search = document.createElement("input");
  search.classList.add("search")
  search.type = "search";

  leftHeader.appendChild(search);
  
  header.appendChild(leftHeader);

  const rightHeader = document.createElement("div");
  rightHeader.classList.add('rightHeader');

  const addTask = document.createElement("img");
  addTask.src = "../addTask.png";
  addTask.alt = "add task";

  const notif = document.createElement("img");
  notif.src = "../notif.png";
  notif.alt = "notifications";

  rightHeader.appendChild(addTask);
  rightHeader.appendChild(notif);


  header.appendChild(rightHeader);


  export const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");


  const pages = document.createElement("ul");
  const inboxPage = document.createElement("li");
  inboxPage.addEventListener("click", () =>{
    currentContent.innerHTML = "";
    currentContent.appendChild(content);
  })
  inboxPage.textContent = "Inbox"
  const todayPage = document.createElement("li");
  todayPage.textContent = "Today"
  const upcomingPage = document.createElement("li");
  upcomingPage.textContent = "Upcoming"

  pages.appendChild(inboxPage);
  pages.appendChild(todayPage);
  pages.appendChild(upcomingPage);

  sidebar.appendChild(pages);

  export const projects = document.createElement("div");
  projects.classList.add("projects");

  const projectHeader = document.createElement("div");
  projectHeader.classList.add("projectHeader")

  const projectTitle = document.createElement("h1");
  projectTitle.textContent = "Projects";

  export const addProject = document.createElement("img");
  addProject.classList.add("addProject");
  addProject.src = "../addTask.png"
  projects.appendChild(addProject)

  

  projectHeader.appendChild(projectTitle);
  projectHeader.appendChild(addProject);

  const projectNames = document.createElement("ul");

  projects.appendChild(projectHeader);
  projects.appendChild(projectNames);

  sidebar.appendChild(projects);

