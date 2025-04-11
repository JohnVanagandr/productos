import './styles/style.css';
import "animate.css";
import { renderHeader } from "./components/header/Header.js";
import { router } from './router/router.js';

const header = document.getElementById("header");
renderHeader(header);

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);