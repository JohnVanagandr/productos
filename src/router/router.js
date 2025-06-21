import { isAuthenticated } from "../auth/auth";
import loadView from "../utils/loadView";
import { routes } from "./routes";

export const router = async() => {
  // Eliminamos '#/' los dos primeros caracteres
  let hash = location.hash.slice(2);  
  // Validamos si es un conjunto de rutas, pasamos el hash y nos retorna el objeto de rutas y un arreglo con los parametros
  const [rutas, path] = objetoRuta(hash);
  
  // desestructuramos la respuesta de la función matchRoute, esto nos devuelve la ruta y los parámetros
  const [matchedRoute, params] = matchRoute(path, rutas);  
  
  // cuando matchedRoute nos retona null lo enviamos al inicio
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

const objetoRuta = (path) => {  
  try {
    const pathParts = path.split("/");
    // Preguntamos si la ruta tiene 3 partes
    // Si la ruta tiene 3 partes es un grupo de rutas
    if (pathParts.length === 3) {
      const [grupo, ruta, parametro] = pathParts;
      // Tomamos el grupo de rutas
      const grupoRuta = routes[grupo];
      pathParts.shift();
      // console.log(grupoRuta, grupo, ruta, parametro);
      return [grupoRuta, pathParts];
    }    
    let bandera = false;
    // Validamos si la ruta contiene un grupo de rutas y retonamos el grupo de rutas
    // Recorremos las rutas
    for (const route in routes) { 
      // Validamos si la ruta es igual a la ruta del objeto
      if (route === pathParts[0]) {
        // Validamos si la ruta continua con un grupo de rutas
        // Extraemos las propiedades del objeto
        const atributos = Object.entries(routes[route]);   
        // Recorremos las propiedades del objeto
        for (const [key, value] of atributos) {
          // Validamos si la propiedad es un objeto
          if (typeof value === "object") {
            // Retornamos el grupo de rutas
            return [routes[route], pathParts];
          }
        }
        // Si no tiene un grupo de rutas retornamos retornamos todas las rutas
        return [routes, pathParts];
      }
      bandera = true;
    }
    // Preguntamos si la ruta no tiene un grupo de rutas
    // Si no tiene un grupo de rutas retornamos retornamos todas las rutas
    if (bandera) {
      // Si no tiene un grupo de rutas retornamos retornamos todas las rutas
      return [routes, pathParts];
      
    }     
  } catch (error) {
    console.log(error);    
  }
};

const matchRoute = (path, rutas) => {
  // Recorremos las rutas
  for (const route in rutas) {
    // dividimos la ruta y el path en partes
    const routeParts = route.split("/");
    // const pathParts = path.split("/");
    // preguntamos si la ruta y el path no tienen la misma longitud para saltar la iteración
    if (routeParts.length !== path.length) continue;
    // decalramos un objeto params para guardar los parametros de la ruta
    const params = {};
    // Comparamos las partes de la ruta con el path
    const matched = routeParts.every((part, i) => {      
      // preguntamos si la parte de la ruta empieza con ":" es un parametro
      if (part.startsWith(":")) {
        // Guardamos el nombre del parametro en el objeto params
        const paramName = part.slice(1);
        // guardamos el valor del parametro en el objeto params
        params[paramName] = path[i];
        // retornamos true
        return true;
      }
      // preguntamos si la parte de la ruta es igual al path  si son iguales retornamos true
      return part === path[i];
    });      
    // preguntamos si encontramos una coincidencia y retornamos la ruta y los parametros
    if (matched) return [rutas[route], params];
  }
  // Si no encontramos una coincidencia retornamos null
  return [null, null];
}