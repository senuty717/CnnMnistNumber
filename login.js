// Lista de usuarios con contraseñas cifradas (SHA-256)
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

// Generar hash de una contraseña usando SHA-256
async function generarHash(password) {
  // Convierte la contraseña a un ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Genera el hash usando Web Crypto
  const hash = await crypto.subtle.digest("SHA-256", data);

  // Convierte el hash (ArrayBuffer) a una cadena hexadecimal
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0")) // Formatea cada byte como hex
    .join(""); // Une todos los bytes para formar la cadena hash
}

// Lógica de inicio de sesión
async function login(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

  // Obtiene los valores ingresados por el usuario
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let rol = null; // Variable para almacenar el rol del usuario si las credenciales son correctas

  // Recorre la lista de usuarios y verifica las credenciales
  for (const [key, user] of Object.entries(usuarios)) {
    if (username === user.username) {
      // Genera el hash de la contraseña ingresada
      const hashIngresado = await generarHash(password);

      // Compara el hash generado con el hash almacenado
      if (hashIngresado === user.passwordHash) {
        rol = key; // Asigna el rol correspondiente
        break; // Detiene el bucle porque las credenciales son válidas
      }
    }
  }

  // Muestra el contenido según el rol o un mensaje de error
  if (rol) {
    // Oculta el formulario de inicio de sesión
    document.getElementById("login-form").classList.add("oculto");

    // Muestra el contenido correspondiente al rol del usuario
    mostrarContenido(rol);
  } else {
    // Muestra un mensaje de error si las credenciales son incorrectas
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.remove("oculto");
    errorMessage.textContent = "Usuario o contraseña incorrectos.";
  }
}

// Función para mostrar el contenido según el rol
function mostrarContenido(rol) {
  // Oculta todos los contenedores de roles
  document.getElementById("contenedor-admin").classList.add("oculto");
  document.getElementById("contenedor-empleado").classList.add("oculto");
  document.getElementById("contenedor-cliente").classList.add("oculto");

  // Muestra solo el contenedor correspondiente al rol del usuario
  if (rol === "administrador") {
    document.getElementById("contenedor-admin").classList.remove("oculto");
  } else if (rol === "empleado") {
    document.getElementById("contenedor-empleado").classList.remove("oculto");
  } else if (rol === "cliente") {
    document.getElementById("contenedor-cliente").classList.remove("oculto");
  }
}

// Asocia el evento "submit" al formulario de inicio de sesión
document.getElementById("formulario-login").addEventListener("submit", login);
