// Modificar la función para mostrar los top 3 de predicciones
function mostrarDatosConsola(datos) {
  // Verificamos si el usuario es administrador basándonos en el rol directamente
  const rol = localStorage.getItem("rol"); // Suponiendo que se guarda el rol en localStorage

  if (rol !== 'admin') {
    console.log("Acceso restringido a la consola.");
    return;  // Si no es admin, no mostramos la consola
  }

  const contenedorDatos = document.getElementById('datos-consola');
  
  // Limpiamos los datos previos
  contenedorDatos.innerHTML = '';

  // Verificar si 'datos' es un array válido antes de usar forEach
  if (Array.isArray(datos) && datos.length > 0) {
    datos.forEach(function(dato) {
      const p = document.createElement('p');
      
      // Verificar que `dato` tiene tiempo y asegurarnos que sea un número
      if (typeof dato.tiempo === 'number' && !isNaN(dato.tiempo)) {
        // Formateamos el tiempo si es válido
        dato.tiempo = dato.tiempo.toFixed(2) + ' ms';
      } else {
        dato.tiempo = 'Tiempo no disponible';
      }
      
      p.textContent = `Modelo ${dato.modelo}: Predicción ${dato.indice}, Tiempo: ${dato.tiempo}`;
      contenedorDatos.appendChild(p);
    });
  } else {
    // Si los datos no son un array válido, mostramos un mensaje de error
    const p = document.createElement('p');
    p.textContent = 'No hay datos disponibles para mostrar.';
    contenedorDatos.appendChild(p);
  }
}

// Función para actualizar la consola con los resultados de las predicciones
function actualizarConsola(predicciones) {
  // Llamar a la función que muestra los datos en consola
  mostrarDatosConsola(predicciones);
}

// Escuchar el evento personalizado 'actualizarPredicciones'
document.addEventListener('actualizarPredicciones', function(event) {
  const predicciones = event.detail;  // Datos de las predicciones pasados en el evento
  actualizarConsola(predicciones);
});
