const loadView = async (view, params = {}) => {
  try {
    // Consultamos la vista
    const response = await fetch(`./src/views/${view}.html`);
    if (!response.ok) throw new Error(`No se pudo cargar ${view}`);
    const html = await response.text();
    // Agregamos la vista a div#app
    document.getElementById("app").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};

export default loadView;