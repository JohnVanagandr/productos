import { http } from "../../utils/request";

export const login = async (data) => {
  // Enviamos los datos al servidor para iniciar sesión
  // y guardamos la respuesta en la variable request
  const request = await http.post("auth/login", data, false, false);  
  // Asignamos el token a la variable token
  const token = request.data.accessToken;
  const refreshToken = request.data.refreshToken;
  // Si no hay token, lanzamos un error
  if (!token) {
    throw new Error("No se ha podido iniciar sesión");
  }
  // Guardamos el token y el refreshToke en el localStorage
  localStorage.setItem("token", token);  
  localStorage.setItem("refreshToken", refreshToken);  
  // Lanzamos un evento para indicar a la aplicación que el usuario ha iniciado sesión
  window.dispatchEvent(
    new CustomEvent("auth-changed", {
      detail: { loggedIn: true },
    })
  );
  return request; 
}