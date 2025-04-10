import headerHTML from './header.html?raw';
import "./header.css";
import { isAuthenticated } from '../../auth/auth';

export const renderHeader = (element) => {
  element.innerHTML = headerHTML;

  // Ocultamos o mostramos las rutas privadas
  const updateRoutes = (loggedIn) => {
    console.log("updateRoutes", loggedIn);
    // Obtenemos los enlaces privados y públicos    
    const privateLinks = element.querySelectorAll("[data-private]");
    const loginOnlyLinks = element.querySelectorAll("[data-public]");

    privateLinks.forEach((link) => {
      // Si el usuario está autenticado, mostramos la ruta privada
      link.style.display = loggedIn ? "inline-block" : "none";
    });

    loginOnlyLinks.forEach((link) => {
      // Si el usuario no está autenticado, mostramos la ruta pública
      link.style.display = loggedIn ? "none" : "inline-block";
    });
  };

  updateRoutes(isAuthenticated());

  // Escuchar cambios de autenticación
  window.addEventListener("auth-changed", (event) => {
    updateRoutes(event.detail.loggedIn);
  });
}
