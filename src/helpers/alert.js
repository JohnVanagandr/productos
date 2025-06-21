import Swal from "sweetalert2";

export const showSuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: message,
    customClass: {
      popup: "my-popup",
      confirmButton: "my-confirm-button",
      cancelButton: "my-cancel-button",
    },
    confirmButtonText: "Cerrar",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    allowOutsideClick: false, // Desactiva clic fuera del modal
    allowEscapeKey: false, // Desactiva tecla ESC
  });
};

export const showError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    customClass: {
      popup: "my-popup",
      confirmButton: "my-confirm-button",
      cancelButton: "my-cancel-button",
    },
    showConfirmButton: false,
    // showCancelButton: true,
    // cancelButtonText: "Cancelar",
    timer: 4000,
    timerProgressBar: true,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    allowOutsideClick: false, // Desactiva clic fuera del modal
    allowEscapeKey: false, // Desactiva tecla ESC
  });
};

export const showConfirm =  async (message) => {
  return Swal.fire({
    title: "¿Eliminar recurso?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "¡Si, eliminar!",
    customClass: {
      popup: "my-popup",
      confirmButton: "my-confirm-button",
      cancelButton: "my-cancel-button",
    },
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  }).then((result) => {
    return result.isConfirmed;
  });
};
