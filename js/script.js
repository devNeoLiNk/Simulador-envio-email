// VARIABLES
const btnSend = document.querySelector("#enviar"),
  btnReset = document.getElementById("reset"),
  form = document.getElementById("send-email");

const regExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// EVENTOS
/* Inicia la app */
document.addEventListener("DOMContentLoaded", () => {
  startApp();

  document.addEventListener("input", formValidation);

  form.addEventListener("submit", sendEmail);
});

// FUNCIONES
function startApp() {
  btnSend.disabled = true;
  // btnSend.classList.add('disabled');
}

// Función que valida formulario
function formValidation(e) {
  inputValidation(e);
  reValidation(e);

  regExp.test(email.value) && asunto.value !== "" && mensaje.value !== ""
    ? (btnSend.disabled = false)
    : (btnSend.disabled = true);
}

// Función que válida los inputs del formulario
function inputValidation(e) {
  if (e.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error) error.remove();

    e.target.classList.remove("border-red");
    e.target.classList.add("border-green");
  } else {
    e.target.classList.remove("border-green");
    e.target.classList.add("border-red");
    showValidation("Todos los campos son obligatorios");
  }
}

// Función que valida que el correo sea valido
function reValidation(e) {
  if (e.target.type === "email") {
    if (regExp.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) error.remove();

      e.target.classList.remove("border-red");
      e.target.classList.add("border-green");
    } else {
      e.target.classList.remove("border-green");
      e.target.classList.add("border-red");
      showValidation("Email no válido");
    }
  }
}

// Función que muestra la validacion en pantalla
function showValidation(msg) {
  const errorMsg = document.createElement("p");
  errorMsg.textContent = msg;
  errorMsg.classList.add("errorMsg-style", "error");

  const erroresArr = document.querySelectorAll(".error");

  if (erroresArr.length === 0) form.appendChild(errorMsg);
}

// Enviando email
function sendEmail(e) {
  e.preventDefault();

  // Mostrar Spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  setTimeout(() => {
    spinner.style.display = "none";

    const msgSendEmail = document.createElement("p");
    msgSendEmail.textContent = "El correo se envió correctamente";
    msgSendEmail.classList.add("msgSendEmail-style");

    // inserta leyenda
    form.insertBefore(msgSendEmail, spinner);

    // removiendo parrafo
    setTimeout(() => {
      msgSendEmail.remove();
      resetForm();
    }, 2000);
  }, 3000);
}

// Función que limpia el formulario
function resetForm() {
  document.location.reload();
}
