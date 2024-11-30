// Datos de usuarios con contraseñas hash
const usuarios = {
  admin: {
    username: "admin",
    passwordHash: "e99a18c428cb38d5f260853678922e03abd8335e3b6dcd1f46e912f1e2a04548" // hash de admin123
  },
  empleado: {
    username: "empleado",
    passwordHash: "6b3a55e0261b0304143f805a249dabd243a5da508e649b3c6c3c5d05be5c31a6" // hash de empleado123
  },
  cliente: {
    username: "cliente",
    passwordHash: "c29a1d9a825d9a122b09a6a5699eb2a7e06a1f6a8fa940a6b091d1e37fc34376" // hash de cliente123
  }
};

// Función para generar el hash de la contraseña usando SHA-256
async function generarHash(contraseña) {
  const encoder = new TextEncoder();
  const data = encoder.encode(contraseña);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data); // generamos el hash
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convertimos el buffer en array de bytes
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // convertimos en cadena hexadecimal
  return hashHex;
}

// Función para mostrar el contenido basado en el rol
function mostrarContenido(rol) {
  switch (rol) {
    case 'admin':
      document.getElementById("admin-content").classList.remove("oculto");
      break;
    case 'empleado':
      document.getElementById("empleado-content").classList.remove("oculto");
      break;
    case 'cliente':
      document.getElementById("cliente-content").classList.remove("oculto");
      break;
  }
}

// Función para manejar el evento de inicio de sesión
async function login(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

  // Obtiene los valores ingresados por el usuario
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log('Usuario ingresado: ', username);  // Imprime el nombre de usuario
  console.log('Contraseña ingresada: ', password);  // Imprime la contraseña ingresada

  let rol = null; // Variable para almacenar el rol del usuario si las credenciales son correctas

  // Recorre la lista de usuarios y verifica las credenciales
  for (const [key, user] of Object.entries(usuarios)) {
    if (username === user.username) {
      // Genera el hash de la contraseña ingresada
      const hashIngresado = await generarHash(password);
      console.log('Hash ingresado: ', hashIngresado); // Imprime el hash generado

      // Compara el hash generado con el hash almacenado
      if (hashIngresado === user.passwordHash) {
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

// Evento para manejar el envío del formulario de login
document.getElementById("login-form").addEventListener("submit", login);
