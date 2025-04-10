
export function isAuthenticated() {
  return localStorage.getItem("auth") === "true";
}

export function login() {
  localStorage.setItem("auth", "true");
  window.dispatchEvent(
    new CustomEvent("auth-changed", {
      detail: { loggedIn: true },
    })
  );
}

export function logout() {
  localStorage.removeItem("auth");
  window.dispatchEvent(
    new CustomEvent("auth-changed", {
      detail: { loggedIn: false },
    })
  );
}