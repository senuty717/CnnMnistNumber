// Esta función se encargará de mostrar los datos en la consola solo si el usuario es administrador
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

  // Si los datos son un array de resultados, los mostramos
  if (Array.isArray(datos)) {
    datos.forEach(function(dato) {
      const p = document.createElement('p');
      p.textContent = dato;
      contenedorDatos.appendChild(p);
    });
  } else {
    // Si es solo un mensaje, lo mostramos
    const p = document.createElement('p');
    p.textContent = datos;
    contenedorDatos.appendChild(p);
  }
}

// Función para actualizar la consola con los resultados de las predicciones
function actualizarConsola(predicciones) {
  const prediccionesConTiempos = predicciones.prediccionesConTiempos;
  const tensorDetails = predicciones.tensorDetails;
  
  // Crear un array con los resultados de las predicciones para cada modelo
  const datosConsola = [];

  // Información de cada modelo
  for (let i = 1; i <= 4; i++) {
    const modelo = prediccionesConTiempos[`modelo${i}`];
    datosConsola.push(`Modelo ${i}:`);
    datosConsola.push(`  Clase ganadora: ${modelo.prediccion}`);
    datosConsola.push(`  Probabilidades: ${modelo.probabilidades}`);
    datosConsola.push(`  Imagen de entrada: ${JSON.stringify(modelo.imagen)}`);
    datosConsola.push(`  Tiempo de predicción: ${modelo.tiempo} ms`);
  }

  // Mostrar los detalles del tensor
  datosConsola.push("Detalles del tensor:");
  datosConsola.push(`  Forma del tensor: ${tensorDetails.shape}`);
  datosConsola.push(`  Tipo del tensor: ${tensorDetails.dtype}`);

  // Llamar a la función que muestra los datos en consola
  mostrarDatosConsola(datosConsola);
}

// Escuchar el evento personalizado 'actualizarPredicciones'
document.addEventListener('actualizarPredicciones', function(event) {
  const predicciones = event.detail;  // Datos de las predicciones pasados en el evento
  actualizarConsola(predicciones);
});
