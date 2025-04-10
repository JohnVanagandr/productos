import {  logout } from "../auth/auth.js";

const logoutController = async () => {
  // Esperamos a que se cargue el DOM
  await new Promise(requestAnimationFrame);

  const btn = document.querySelector("#logoutBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      logout();
      location.hash = "home";
    });
  } else {
    console.error("No se encontró el botón de logout");
  }
};

export default logoutController;
