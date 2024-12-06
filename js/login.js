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
    passwordHash: "ccc13e8ab0819e3ab61719de4071ecae6c1d3cd35dc48b91cad3481f20922f9f" // hash de empleado123 (SHA-256)
  },
  cliente: {
    username: "cliente",
    passwordHash: "09a31a7001e261ab1e056182a71d3cf57f582ca9a29cff5eb83be0f0549730a9" // hash de cliente123 (SHA-256)
  }
};

// Función para generar el hash de la contraseña usando SHA-256
async function generarHash(contraseña) {
  const encoder = new TextEncoder(); // Codifica el texto de la contraseña
  const data = encoder.encode(contraseña); // Convierte la contraseña en un array de bytes
  const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Genera el hash usando SHA-256
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convierte el buffer en array de bytes
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Convierte en cadena hexadecimal
  console.log('Hash generado: ', hashHex);  // Imprime el hash generado en la consola
  return hashHex; // Devuelve el hash en formato hexadecimal
}

// Función para mostrar el contenido basado en el rol
function mostrarContenido(rol) {
  // Ocultar todo el contenido de roles (admin, empleado, cliente)
  adminContent.classList.add("oculto");
  empleadoContent.classList.add("oculto");
  clienteContent.classList.add("oculto");

  // Muestra el contenido correspondiente al rol
  switch (rol) {
    case 'admin':
      adminContent.classList.remove("oculto"); // Muestra el contenido del administrador
      // Guardar el rol en localStorage para uso futuro
      localStorage.setItem("rol", "admin");
      mostrarDatosConsola([  // Mostrar los datos de la consola después de iniciar sesión como admin
        "Modelo 1: Predicción correcta",
        "Modelo 2: Predicción incorrecta",
        "Modelo 3: Predicción correcta",
        "Modelo 4: Predicción incorrecta"
      ]);
      break;
    case 'empleado':
      empleadoContent.classList.remove("oculto"); // Muestra el contenido del empleado
      // Guardar el rol en localStorage para uso futuro
      localStorage.setItem("rol", "empleado");
      break;
    case 'cliente':
      clienteContent.classList.remove("oculto"); // Muestra el contenido del cliente
      // Guardar el rol en localStorage para uso futuro
      localStorage.setItem("rol", "cliente");
      break;
  }

  // Eliminar la clase 'oculto' de todos los elementos con la clase 'contenido-roles'
  const contenidosRoles = document.querySelectorAll('.contenido-roles');
  contenidosRoles.forEach(function(contenido) {
    contenido.classList.remove("oculto"); // Muestra los elementos de contenido de roles
  });

  // Mostrar la consola si el usuario es admin
  const consola = document.getElementById('consola');
  if (rol === 'admin') {
    consola.classList.remove('oculto'); // Muestra la consola para el administrador
  }
}

// Función para manejar el evento de inicio de sesión
form.addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  const username = document.getElementById("username").value; // Obtener el nombre de usuario ingresado
  const password = document.getElementById("password").value; // Obtener la contraseña ingresada

  let rol = null; // Variable para almacenar el rol del usuario si las credenciales son correctas

  // Recorre la lista de usuarios y verifica las credenciales
  for (const [key, user] of Object.entries(usuarios)) {
    if (username === user.username) { // Verifica si el nombre de usuario coincide
      // Genera el hash de la contraseña ingresada
      const hashIngresado = await generarHash(password); 
      console.log('Hash ingresado: ', hashIngresado); // Imprime el hash ingresado para la contraseña
      console.log('Hash almacenado para ' + username + ': ', user.passwordHash); // Imprime el hash almacenado para el usuario

      // Verifica si los hashes coinciden
      if (hashIngresado === user.passwordHash) {
        console.log('Contraseña correcta. Acceso permitido.'); // Si la contraseña es correcta
        rol = key; // Asigna el rol correspondiente basado en el usuario
        break; // Detiene el bucle porque las credenciales son válidas
      } else {
        console.log('Contraseña incorrecta'); // Si la contraseña no es correcta
      }
    }
  }

  // Muestra el contenido según el rol o un mensaje de error
  if (rol) {
    // Oculta el formulario de inicio de sesión si las credenciales son correctas
    loginForm.classList.add("oculto");

    // Muestra el contenido correspondiente al rol del usuario
    mostrarContenido(rol);

    // Mostrar mensaje de bienvenida (opcional)
    alert(`Bienvenido, ${username}!`); // Muestra un mensaje de bienvenida al usuario
  } else {
    // Si las credenciales son incorrectas, muestra un mensaje de error
    errorMessage.classList.remove("oculto");
    errorMessage.innerHTML = "Usuario o contraseña incorrectos."; // Mensaje de error
  }
});
