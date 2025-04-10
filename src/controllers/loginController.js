import { login } from "../auth/auth.js";

const loginController = async () => {
  // Esperamos a que se cargue el DOM
  await new Promise(requestAnimationFrame);
  
    const btn = document.querySelector("#loginBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        login();
        location.hash = "home";
      });
    } else {
      console.error("No se encontró el botón de login");
    }

};

export default loginController;
