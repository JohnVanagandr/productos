import { http } from "../../utils/request";

export const register = async (data) => {
  // Enviamos los datos al servidor para registrar un nuevo usuario
  // y guardamos la respuesta en la variable request
  const request = await http.post("auth/register", data, false, false);
  // si la respuesta es correcta, guardamos el token y el refreshToken
  if (request.success) {
    // Asignamos el token a la variable token
    const token = request.data.accessToken;
    const refreshToken = request.data.refreshToken;
    // Guardamos el token y el refreshToken en el localStorage
    // para poder usarlos en las peticiones posteriores
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    // Lanzamos un evento para indicar a la aplicación que el usuario ha iniciado sesión
    window.dispatchEvent(
      new CustomEvent("auth-changed", {
        detail: { loggedIn: true },
      })
    );
  }
  return request;
};
