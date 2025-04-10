import headerHTML from './header.html?raw';
import "./header.css";
import { isAuthenticated } from '../../auth/auth';

let header;

export const renderHeader = (element) => {
  header = document.createElement("div");
  header.classList.add("main-header");
  header.innerHTML = headerHTML;
  element.append(header);

  // Ocultar las rutas privadas si el usuario no está autenticado
  if (!isAuthenticated()) {
    header.querySelectorAll('[data-private]').forEach((el) => {
      el.style.display = 'none';
    });
  }
  // Ocultar las rutas públicas si el usuario está autenticado
  if (isAuthenticated()) {
    header.querySelectorAll('[data-public]').forEach((el) => {
      el.style.display = 'none';
    });    
  }
}
