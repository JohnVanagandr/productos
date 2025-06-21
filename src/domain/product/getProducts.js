import { http } from "../../utils/request";

export const getProducts = async () => {
  // Enviamos los datos al servidor para obtener los productos
  const request = await http.get(`productos`, true, false);
  // Si no hay productos, lanzamos un error
  if (!request) {
    throw new Error("No se han podido obtener los productos");
  }
  // Devolvemos la respuesta
  return request;
}