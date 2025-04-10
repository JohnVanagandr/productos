import { isAuthenticated } from "../auth/auth";
import loadView from "../utils/loadView";
import { routes } from "./routes";

export const router = async() => {
  // Eliminamos '#/' los dos primeros caracteres
  let hash = location.hash.slice(2);  
  // desestructuramos la respuesta de la función matchRoute, esto nos devuelve la ruta y los parámetros
  const [matchedRoute, params] = matchRoute(hash);
  // cuanod matchedRoute nos retona null lo enviamos al inicio
  if (!matchedRoute) {
    // Página inicial o raiz
    await loadView("home/index");
    routes["home"].controller();
    return;
  }
  // validamos si la ruta esta en el objeto de rutas
  if (!matchedRoute) {
    // Cargamos las página no encontrada
    await loadView("404");
  }
  // Validamos si la ruta es privada y el usuario no esta autenticado
  if (matchedRoute.private && !isAuthenticated()) {
    // Redirigimos al login
    location.hash = "#/login";
    return;
  }

  // Llamamos la vista
  await loadView(matchedRoute.template);
  // Llamamos el controlador
  matchedRoute.controller(params);
};

const matchRoute = (path) => {
  // Recorremos las rutas
  for (const route in routes) {
    // dividimos la ruta y el path en partes
    const routeParts = route.split("/");
    const pathParts = path.split("/");
    // preguntamos si la ruta y el path tienen la misma longitud
    if (routeParts.length !== pathParts.length) continue;
    // decalramos un objeto params para guardar los parametros de la ruta
    const params = {};
    // Comparamos las partes de la ruta con el path
    const matched = routeParts.every((part, i) => {      
      // preguntamos si la parte de la ruta empieza con ":" es un parametro
      if (part.startsWith(":")) {
        // Guardamos el nombre del parametro en el objeto params
        const paramName = part.slice(1);
        // guardamos el valor del parametro en el objeto params
        params[paramName] = pathParts[i];
        // retornamos true
        return true;
      }
      // preguntamos si la parte de la ruta es igual al path  si son iguales retornamos true
      return part === pathParts[i];
    });
    // preguntamos si encontramos una coincidencia y retornamos la ruta y los parametros
    if (matched) return [routes[route], params];
  }
  // Si no encontramos una coincidencia retornamos null
  return [null, null];
}