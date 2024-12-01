function mostrarDatosConsola(datos) {
  const rol = localStorage.getItem("rol");

  if (rol !== 'admin') {
    console.log("Acceso restringido a la consola.");
    return; // Si no es admin, no mostramos la consola
  }

  const contenedorDatos = document.getElementById('datos-consola');

  // Limpiamos los datos previos
  contenedorDatos.innerHTML = '';

  // Verificar que `datos` es un array válido
  if (Array.isArray(datos) && datos.length > 0) {
    datos.forEach(function(dato) {
      const p = document.createElement('p');
      let texto = `Modelo ${dato.modelo}: `;

      // Verificar que `topPredictions` es un array y tiene elementos
      if (Array.isArray(dato.topPredicciones) && dato.topPredicciones.length > 0) {
        dato.topPredicciones.forEach((prediction, index) => {
          texto += `Top ${index + 1} - Predicción: ${prediction.indice} (Probabilidad: ${prediction.probabilidad.toFixed(2)}), `;
        });
      } else {
        texto += 'No hay predicciones válidas.';
      }

      // Formatear el tiempo si es un número válido
      if (typeof dato.tiempo === 'number' && !isNaN(dato.tiempo)) {
        dato.tiempo = dato.tiempo.toFixed(2) + ' ms';
      } else {
        dato.tiempo = 'Tiempo no disponible';
      }

      p.textContent = texto + `Tiempo: ${dato.tiempo}`;
      contenedorDatos.appendChild(p);
    });
  } else {
    const p = document.createElement('p');
    p.textContent = 'No hay datos disponibles para mostrar.';
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
