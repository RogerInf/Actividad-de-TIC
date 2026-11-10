// Proyecto académico de inicio de sesión.
// Esta autenticación es exclusivamente didáctica.
// NO constituye un sistema seguro de autenticación.

// Referencias a los elementos del formulario.
const form = document.getElementById("login-form");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberInput = document.getElementById("remember");

const togglePassword = document.getElementById("toggle-password");

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const formMessage = document.getElementById("form-message");

// Credenciales de demostración de la guía.
const DEMO_EMAIL = "demo@correo.com";
const DEMO_PASSWORD = "demo12345";

// Recuperar el correo guardado. Nunca se guarda la contraseña.
const savedEmail = localStorage.getItem("login-demo-email");

if (savedEmail) {
    emailInput.value = savedEmail;
    rememberInput.checked = true;
}

// Limpiar los mensajes de error anteriores.
function clearErrors() {
    emailError.textContent = "";
    passwordError.textContent = "";

    emailInput.classList.remove("input-invalid");
    passwordInput.classList.remove("input-invalid");

    formMessage.textContent = "";
    formMessage.className = "form-message";
}

// Validar que los campos no estén vacíos.
function validateForm() {

    clearErrors();

    let valid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === "") {

        emailError.textContent = "Ingresa tu correo electrónico.";
        emailInput.classList.add("input-invalid");
        valid = false;
    }

    if (password.trim() === "") {

        passwordError.textContent = "Ingresa tu contraseña.";
        passwordInput.classList.add("input-invalid");
        valid = false;
    }

    return valid;
}

// Mostrar u ocultar la contraseña.
togglePassword.addEventListener("click", function () {

    const show = passwordInput.type === "password";

    passwordInput.type = show ? "text" : "password";

    togglePassword.textContent = show ? "Ocultar" : "Mostrar";

    togglePassword.setAttribute(
        "aria-label",
        show ? "Ocultar contraseña" : "Mostrar contraseña"
    );

    togglePassword.setAttribute("aria-pressed", String(show));
});

// Procesar el formulario.
form.addEventListener("submit", function (event) {

    // Evitar que la página se recargue antes de validar.
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Recordar únicamente el correo electrónico.
    if (rememberInput.checked) {

        localStorage.setItem("login-demo-email", email);

    } else {

        localStorage.removeItem("login-demo-email");
    }

    // Comparar con las credenciales de demostración.
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {

        formMessage.textContent =
            "¡Bienvenido! Has iniciado sesión correctamente.";

        formMessage.classList.add("success");

    } else {

        formMessage.textContent =
            "Correo o contraseña incorrectos. Verifica tus datos.";

        formMessage.classList.add("error");
    }
});

// Limpiar errores al modificar los campos.
emailInput.addEventListener("input", function () {

    emailError.textContent = "";
    emailInput.classList.remove("input-invalid");
});

passwordInput.addEventListener("input", function () {

    passwordError.textContent = "";
    passwordInput.classList.remove("input-invalid");
});

// Recuperación de contraseña simulada.
document.getElementById("forgot-link")
    .addEventListener("click", function (event) {

        event.preventDefault();

        formMessage.textContent =
            "La recuperación de contraseña no está disponible en esta demostración.";

        formMessage.className = "form-message";
    });
