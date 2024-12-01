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
      if (Array.isArray(dato.topPredicciones) && dato.topPredicciones.length >= 3 && dato.topPredicciones.every(p => p.probabilidad && p.indice !== undefined)) {
        // Mostrar el Top 3
        p.textContent = `Modelo ${dato.modelo}: Predicción ${dato.topPredicciones[0].indice}, 
                         Tiempo: ${dato.tiempo}, 
                         Top 3 Predicciones: 
                         1) ${dato.topPredicciones[0].indice} (${(dato.topPredicciones[0].probabilidad * 100).toFixed(2)}%) 
                         2) ${dato.topPredicciones[1].indice} (${(dato.topPredicciones[1].probabilidad * 100).toFixed(2)}%) 
                         3) ${dato.topPredicciones[2].indice} (${(dato.topPredicciones[2].probabilidad * 100).toFixed(2)}%)`;
      } else {
        // Si no hay un Top 3 válido, mostrar un mensaje más informativo
        p.textContent = `Modelo ${dato.modelo}: Predicción no disponible, Tiempo: ${dato.tiempo}, 
                         No se pudieron obtener predicciones válidas.`;
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
