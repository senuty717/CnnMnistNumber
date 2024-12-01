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
      
      // Verificar que dato tiene tiempo y asegurarnos que sea un número
      if (typeof dato.tiempo === 'number' && !isNaN(dato.tiempo)) {
        // Formateamos el tiempo si es válido
        dato.tiempo = dato.tiempo.toFixed(2) + ' ms';
      } else {
        dato.tiempo = 'Tiempo no disponible';
      }

      // Asegurarnos de que topPredicciones existe y tiene al menos 3 elementos
      if (Array.isArray(dato.topPredicciones) && dato.topPredicciones.length >= 3) {
        // Mostrar el Top 3
        p.textContent = `Modelo ${dato.modelo}: Predicción ${dato.topPredicciones[0].indice}, 
                         Tiempo: ${dato.tiempo}, 
                         Top 3 Predicciones: 
                         1) ${dato.topPredicciones[0].indice} (${(dato.topPredicciones[0].probabilidad * 100).toFixed(2)}%) 
                         2) ${dato.topPredicciones[1].indice} (${(dato.topPredicciones[1].probabilidad * 100).toFixed(2)}%) 
                         3) ${dato.topPredicciones[2].indice} (${(dato.topPredicciones[2].probabilidad * 100).toFixed(2)}%)`;
      } else {
        // Si no hay un Top 3 válido, mostrar un mensaje de error
        p.textContent = `Modelo ${dato.modelo}: Predicción no disponible, Tiempo: ${dato.tiempo}, 
                         Top 3 Predicciones no válidas`;
      }
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
  // Crear un array con los resultados de las predicciones para cada modelo
  const datosConsola = predicciones.map((pred) => {
    // Asegurarnos de que 'resultados' sea un array
    if (!Array.isArray(pred.resultados)) {
      return {
        indice: pred.indice,
        tiempo: pred.tiempo,
        modelo: pred.modelo,
        topPredicciones: []  // No tiene resultados válidos
      };
    }

    // Obtener las tres predicciones con mayor probabilidad para cada modelo
    const topPredicciones = pred.resultados
      .map((probabilidad, indice) => ({ indice, probabilidad }))
      .sort((a, b) => b.probabilidad - a.probabilidad) // Ordenar por probabilidad descendente
      .slice(0, 3); // Tomar solo las 3 principales

    return {
      indice: pred.indice,
      tiempo: pred.tiempo,
      modelo: pred.modelo,
      topPredicciones: topPredicciones // Incluir el top 3 de predicciones
    };
  });

  // Llamar a la función que muestra los datos en consola
  mostrarDatosConsola(datosConsola);
}

// Escuchar el evento personalizado 'actualizarPredicciones'
document.addEventListener('actualizarPredicciones', function(event) {
  const predicciones = event.detail;  // Datos de las predicciones pasados en el evento
  actualizarConsola(predicciones);
});
