// consola.js

// Función para mostrar los datos en la consola
function mostrarDatosConsola(datos) {
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

// Llamada a esta función con datos de ejemplo
mostrarDatosConsola([
  "Modelo 1: Predicción correcta",
  "Modelo 2: Predicción incorrecta",
  "Modelo 3: Predicción correcta",
  "Modelo 4: Predicción incorrecta"
]);
