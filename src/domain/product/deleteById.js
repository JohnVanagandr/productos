import { http } from "../../utils/request";

export const deleteProductById = async (id) => {  
  // Enviamos los datos al servidor para eliminar el producto
  const request = await http.delete(`productos/${id}`, true, false);
  // Si no hay productos, lanzamos un error
  if (!request) {
    throw new Error("No se han podido eliminar el producto");
  }
  // Devolvemos la respuesta
  return request;
 }
