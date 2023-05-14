import inbox from "./inbox";
import test from "./projects"
import {sidebar, header} from "./mainStructure"
import "./styles.css";

const body = document.querySelector('body');
body.appendChild(header);
body.appendChild(sidebar);