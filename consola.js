// consola.js

function mostrarDatosConsola(datos) {
  // Verificamos si el usuario es administrador
  const esAdministrador = document.getElementById('admin-role');  // Buscamos el elemento con la clase 'admin'
  
  if (!esAdministrador) {
    console.log("Acceso restringido a la consola.");
    return;  // Si no es administrador, no mostramos los datos
  }

  const contenedorDatos = document.getElementById('datos-consola');
  
  // Limpiamos los datos previos
  contenedorDatos.innerHTML = '';

  // Si los datos son un array de resultados
  if (Array.isArray(datos)) {
    datos.forEach(function(dato) {
      const p = document.createElement('p');
      p.textContent = dato;
      contenedorDatos.appendChild(p);
    });
  } else {
    // Si es solo un mensaje
    const p = document.createElement('p');
    p.textContent = datos;
    contenedorDatos.appendChild(p);
  }
}

// Ejemplo de llamada a la función
mostrarDatosConsola([
  "Modelo 1: Predicción correcta",
  "Modelo 2: Predicción incorrecta",
  "Modelo 3: Predicción correcta",
  "Modelo 4: Predicción incorrecta"
]);
