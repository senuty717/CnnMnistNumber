// Lista de usuarios con contraseñas cifradas
const usuarios = {
  administrador: {
    username: "admin",
    passwordHash: "e99a18c428cb38d5f260853678922e03abd8335e3b6dcd1f46e912f1e2a04548", // Hash de "admin123"
  },
  empleado: {
    username: "empleado",
    passwordHash: "6b3a55e0261b0304143f805a249dabd243a5da508e649b3c6c3c5d05be5c31a6", // Hash de "empleado123"
  },
  cliente: {
    username: "cliente",
    passwordHash: "c29a1d9a825d9a122b09a6a5699eb2a7e06a1f6a8fa940a6b091d1e37fc34376", // Hash de "cliente123"
  },
};

// Generar hash de una contraseña
async function generarHash(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// Lógica de inicio de sesión
async function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let rol = null;

  // Verificar credenciales
  for (const [key, user] of Object.entries(usuarios)) {
    if (username === user.username) {
      const hashIngresado = await generarHash(password);
      if (hashIngresado === user.passwordHash) {
        rol = key;
        break;
      }
    }
  }

  // Mostrar contenido según el rol
  if (rol) {
    document.getElementById("login-form").classList.add("oculto");
    mostrarContenido(rol);
  } else {
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.remove("oculto");
    errorMessage.textContent = "Usuario o contraseña incorrectos.";
  }
}

// Mostrar contenido según el rol
function mostrarContenido(rol) {
  if (rol === "administrador") {
    document.getElementById("contenedor-admin").classList.remove("oculto");
  } else if (rol === "empleado") {
    document.getElementById("contenedor-empleado").classList.remove("oculto");
  } else if (rol === "cliente") {
    document.getElementById("contenedor-cliente").classList.remove("oculto");
  }
}

// Asociar el evento al formulario
document
  .getElementById("formulario-login")
  .addEventListener("submit", login);
