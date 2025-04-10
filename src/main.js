import './style.css'
import { renderHeader } from "./components/header/Header.js";
import { router } from './router/router.js';

const header = document.getElementById("header");

const initApp = () => { 
  router();
  renderHeader(header);
}

window.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("hashchange", initApp);