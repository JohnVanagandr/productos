import { login } from "../../auth/auth.js";
import { tiene_valores, validar_campos } from "../../helpers";

const loginController = async () => {
  // Esperamos a que se cargue el DOM
  await new Promise(requestAnimationFrame);
  // Obtenemos el formulario de login
  const form = document.getElementById("login-form");
  // Validaamos los campos del formulario
  form.addEventListener('submit', async (e) => {
    // Detenemos el evento submit para evitar que se recargue la pagina
    e.preventDefault();
    // Obtenermos los datos del método validar_campos y los guardamos en la variable data
    const data = validar_campos(form);    
    // Validamos que el objeto tenga los datos completos y no llegen vacios
    if (tiene_valores(data)) {
      // Enviamos los datos al método login y guardamos la respuesta en la variable response
      const response = await login(data);
      console.log(response); //Todavia no esta retornado nada el login      
    }    
  });

};

export default loginController;
