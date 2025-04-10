
const BASE_URL = 'https://api.example.com';

/**
 * Función para obtener los headers de la petición, dependiendo de si se requiere autenticación o no
 * 
 * @param {*} auth // Si se requiere autenticación
 * @param {*} isForm // Si es un formulario o no
 * @returns // Headers de la petición
 */
const getHeaders = (auth = false, isForm = false) => {
  const headers = {};
  // Validamos si es un formulario o no
  if (!isForm) {
    // Si no es un formulario, agregamos el header de Content-Type
    headers["Content-Type"] = "application/json";
  }
  // Validamos si se requiere autenticación
  if (auth) {
    // Si se requiere autenticación, agregamos el header de Authorization
    const token = localStorage.getItem("token");
    // Validamos si existe el token, si no existe, no se agrega el header
    // Si existe, se agrega el header de Authorization
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  // Returnamos los headers
  return headers;
};

/**
 * Método para realizar la petición a la API, puede ser GET, POST, PUT o DELETE
 * 
 * @param {*} endponit // Endpoint de la API
 * @param {*} method  // Método de la petición (GET, POST, PUT, DELETE)
 * @param {*} data  // Datos de la petición (si es necesario)
 * @param {*} auth  // Si se requiere autenticación (true o false)
 * @param {*} isForm  // Si es un formulario (true o false)
 * @returns // Respuesta de la API
 */
const request = async (
  endponit,
  method = "GET",
  data = null,
  auth = true,
  isForm = false
) => {
  const config = {
    method,
    headers: getHeaders(auth, isForm),
  };
  
  if (data) config.body = isForm ? data : JSON.stringify(data);

  try {
    const response = await fetch(`${BASE_URL}${endponit}`, config);
    const result = await response.json();
    if (!response.ok) {
      // Emitimos un evento si el usuario no está autorizado
      if (response.status === 401) {
        document.dispatchEvent(new CustomEvent("unauthorized"));
      }
      throw new Error(result.message || "Error en la petición");
    }
    return result;
  } catch (error) {
    console.error(`Error ${method} ${endpoint}:`, error.message);
    throw error;
  }
};

export const http = {
  get: (endpoint, auth = false) => request(endpoint, "GET", null, auth),
  post: (endpoint, data, auth = false, isForm = false) => request(endpoint, "POST", data, auth, isForm),
  put: (endpoint, data, auth = false, isForm = false) => request(endpoint, "PUT", data, auth, isForm),
  del: (endpoint, auth = false) => request(endpoint, "DELETE", null, auth),
};
