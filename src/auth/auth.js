export function isAuthenticated() {
  // Validación ficticia: puedes adaptarla a token, localStorage, cookies, etc.
  return localStorage.getItem("isLoggedIn") === "true";
}

export function login() {
  localStorage.setItem("isLoggedIn", "true");
}

export function logout() {
  localStorage.removeItem("isLoggedIn");
}
