
import { register } from "../../domain/auth";
import { showSuccess, tiene_valores, validar_campos } from "../../helpers";
const registerController = async () => {
  // Esperamos a que se cargue el DOM
  await new Promise(requestAnimationFrame);
  // Obtenemos el formulario de registro
  const form = document.getElementById("register-form");
  // Validaamos los campos del formulario
  form.addEventListener('submit', async (e) => { 
    // Detenemos el evento submit para evitar que se recargue la pagina
    e.preventDefault();
    // Obtenermos los datos del método validar_campos y los guardamos en la variable data
    const data = validar_campos(form);    
    // Validamos que el objeto tenga los datos completos y no llegen vacios
    if (tiene_valores(data)) {
      // Enviamos los datos al método register y guardamos la respuesta en la variable response
      const response = await register(data);
      // console.log(response);
      if (response.success) {
        showSuccess(response.message);
        // Si la respuesta es correcta, redirigimos a la pagina de inicio
        window.location.href = "/#";
      }else {
        // Si la respuesta es incorrecta, mostramos los errores
        console.log(response.errors);        
      }
    }
  });
}

export default registerController;