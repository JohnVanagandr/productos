document.addEventListener("unauthorized", () => {
  localStorage.removeItem("token");
  location.hash = "#/login"; // Redirige a login
});
