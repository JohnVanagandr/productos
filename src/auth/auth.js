
export function isAuthenticated() {
  const token = localStorage.getItem("token");
  // Verificar si existe
  if (!token) return false;

  // Verificar si tiene estructura de JWT (3 partes separadas por puntos)
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  // Si pasa las validaciones, decodificamos el token
  return true
}

export const authLogout = () =>{
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.dispatchEvent(
    new CustomEvent("auth-changed", {
      detail: { loggedIn: false },
    })
  );
}