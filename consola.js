function mostrarDatosConsola(datos) {
  const rol = localStorage.getItem("rol");

  if (rol !== 'admin') {
    console.log("Acceso restringido a la consola.");
    return;
  }

  const contenedorDatos = document.getElementById('datos-consola');
  contenedorDatos.innerHTML = '';

  if (Array.isArray(datos) && datos.length > 0) {
    datos.forEach(function(dato) {
      const p = document.createElement('p');
      let texto = `Modelo ${dato.modelo}: `;

      if (Array.isArray(dato.topPredicciones) && dato.topPredicciones.length > 0) {
        dato.topPredicciones.forEach((prediction, index) => {
          // Verificar si el valor de la predicción es NaN
          const predValor = isNaN(prediction.probabilidad) ? 'Valor inválido' : prediction.probabilidad.toFixed(2);
          texto += `Top ${index + 1} - Predicción: ${prediction.indice} (Probabilidad: ${predValor}), `;
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
