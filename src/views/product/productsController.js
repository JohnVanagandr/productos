import { getProducts, deleteProductById } from "../../domain/product";
import { showConfirm, showSuccess } from "../../helpers";

const productController = async () => {
  // Listamos produtos
  const { data } = await getProducts();
  const tbody = document.querySelector('tbody');
  // Creamos el fragmento
  const fragmento = document.createDocumentFragment();
  
  data.map(({id, nombre, descripcion}) => {
    // Creamos los elementos
    const fila = document.createElement('tr');
    const tdNombre = document.createElement('td');
    const tdCategoria = document.createElement('td');
    const tdDescripcion = document.createElement('td');
    const tdAcciones = document.createElement('td');
    const botonera = document.createElement('div');
    const btnEditar = document.createElement('a');
    const btnEliminar = document.createElement('a');
    // Agregamos los nodos de texto
    tdNombre.textContent = nombre;
    tdCategoria.textContent = 'Categoria';
    tdDescripcion.textContent = descripcion
    btnEditar.textContent = 'Editar';
    btnEliminar.textContent = 'Eliminar';
    btnEditar.setAttribute("href", `#/products/edit/${id}`);
    btnEliminar.setAttribute("data-id", id);
    // Agregamos las clases
    botonera.classList.add('botonera');
    btnEditar.classList.add("btn", "btn--small");
    btnEliminar.classList.add("btn", "btn--small", "btn--danger");
    // Agregamos los botones a la botonera
    botonera.append(btnEditar, btnEliminar);
    tdAcciones.append(botonera);
    // Agregamos los elementos a la fila
    fila.append(tdNombre, tdCategoria, tdDescripcion, tdAcciones);
    // Agregamos la fila al fragmento
    fragmento.append(fila);    
  });
  // Agregamos el fragmento al cuerpor de la tabla
  tbody.append(fragmento);

  document.addEventListener('click', async(e) => {
    if (e.target.matches('.btn--danger')) {
      const name = e.target.closest('tr').querySelector('td').textContent;
      const id = e.target.dataset.id;
      const eliminar = await showConfirm(`¿Está seguro de eliminar el producto ${name}?`);     
      if (eliminar) {
        // Llamar a la función para eliminar el producto
        const request = await deleteProductById(id);        
        if (request.success) {
          // Mostrar mensaje de éxito
          showSuccess(request.message);
          // Eliminar la fila de la tabla
        }
      }
      
    }
  });
  
};

export default productController;
