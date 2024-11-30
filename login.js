// Definir los elementos de contenido para mostrar según el rol del usuario
const adminContent = document.getElementById("admin-content");
const empleadoContent = document.getElementById("empleado-content");
const clienteContent = document.getElementById("cliente-content");

// Selección de elementos del formulario
const form = document.getElementById("formulario-login");
const errorMessage = document.getElementById("error-message");
const loginForm = document.getElementById("login-form");

// Variables para simular una base de datos de usuarios (puedes cambiar esto según tus necesidades)
const usuarios = {
  admin: {
    username: "admin",
    passwordHash: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9" // hash de admin123 (SHA-256)
  },
  empleado: {
    username: "empleado",
    passwordHash: "4bbcb26a9fa1a2cfdbd3d3be38d1fc899680d60be21054b1295c2fc9d1dcb6c3" // hash de empleado123 (SHA-256)
  },
  cliente: {
    username: "cliente",
    passwordHash: "e3afed0047b08059d0fada10f400c1e5e1ed8304ecf9a047850052db65b6c299" // hash de cliente123 (SHA-256)
  }
};

// Función para generar el hash de la contraseña usando SHA-256
async function generarHash(contraseña) {
  const encoder = new TextEncoder();
  const data = encoder.encode(contraseña);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Genera el hash
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convierte el buffer en array de bytes
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Convierte en cadena hexadecimal
  console.log('Hash generado: ', hashHex);  // Imprime el hash generado
  return hashHex;
}

// Función para mostrar el contenido basado en el rol
function mostrarContenido(rol) {
  // Oculta todo el contenido antes de mostrar el contenido correcto
  adminContent.classList.add("oculto");
  empleadoContent.classList.add("oculto");
  clienteContent.classList.add("oculto");

  switch (rol) {
    case 'admin':
      adminContent.classList.remove("oculto");
      break;
    case 'empleado':
      empleadoContent.classList.remove("oculto");
      break;
    case 'cliente':
      clienteContent.classList.remove("oculto");
      break;
  }
}

// Función para manejar el evento de inicio de sesión
form.addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let rol = null; // Variable para almacenar el rol del usuario si las credenciales son correctas

  // Recorre la lista de usuarios y verifica las credenciales
  for (const [key, user] of Object.entries(usuarios)) {
    if (username === user.username) {
      // Genera el hash de la contraseña ingresada
      const hashIngresado = await generarHash(password);
      console.log('Hash ingresado: ', hashIngresado); // Imprime el hash generado
      console.log('Hash almacenado para ' + username + ': ', user.passwordHash); // Imprime el hash almacenado

      // Verifica si los hashes coinciden
      if (hashIngresado === user.passwordHash) {
        console.log('Contraseña correcta. Acceso permitido.');
        rol = key; // Asigna el rol correspondiente
        break; // Detiene el bucle porque las credenciales son válidas
      } else {
        console.log('Contraseña incorrecta'); // Si la contraseña no es correcta
      }
    }
  }

  // Muestra el contenido según el rol o un mensaje de error
  if (rol) {
    // Oculta el formulario de inicio de sesión
    loginForm.classList.add("oculto");

    // Muestra el contenido correspondiente al rol del usuario
    mostrarContenido(rol);

    // Mostrar mensaje de bienvenida (opcional)
    alert(`Bienvenido, ${username}!`);
  } else {
    // Muestra un mensaje de error si las credenciales son incorrectas
    errorMessage.classList.remove("oculto");
    errorMessage.innerHTML = "Usuario o contraseña incorrectos.";
  }
});
