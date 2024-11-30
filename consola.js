// Escuchar el evento personalizado "actualizarPredicciones"
document.addEventListener('actualizarPredicciones', function (evento) {
  const { predicciones, tiempoPromedio, modeloMasRapido, modeloMasLento } = evento.detail;

  // Obtener el contenedor de datos de la consola
  const datosConsola = document.getElementById('datos-consola');

  // Limpiar contenido anterior
  datosConsola.innerHTML = '';

  // Título de la sección de resultados
  const titulo = document.createElement('h3');
  titulo.textContent = 'Resultados de Predicción';
  datosConsola.appendChild(titulo);

  // Crear tabla para mostrar resultados
  const tabla = document.createElement('table');
  tabla.setAttribute('border', '1');
  tabla.style.width = '100%';
  tabla.style.borderCollapse = 'collapse';

  // Crear encabezados de la tabla
  const encabezado = document.createElement('tr');
  encabezado.innerHTML = `
    <th>Modelo</th>
    <th>Predicción</th>
    <th>Tiempo (ms)</th>
    <th>Top 3 Clases (Probabilidad)</th>
  `;
  tabla.appendChild(encabezado);

  // Agregar filas con los resultados de cada modelo
  predicciones.forEach(prediccion => {
    const fila = document.createElement('tr');
    const top3Clases = prediccion.probabilidades
      .map((prob, i) => ({ clase: i, prob }))
      .sort((a, b) => b.prob - a.prob)
      .slice(0, 3)
      .map(p => `Clase ${p.clase} (${p.prob.toFixed(2)})`)
      .join(', ');

    fila.innerHTML = `
      <td>Modelo ${prediccion.modelo}</td>
      <td>${prediccion.indice}</td>
      <td>${prediccion.tiempo.toFixed(2)}</td>
      <td>${top3Clases}</td>
    `;
    tabla.appendChild(fila);
  });

  // Agregar tabla al contenedor
  datosConsola.appendChild(tabla);

  // Mostrar información adicional (tiempo promedio, modelos más rápido y lento)
  const infoExtra = document.createElement('div');
  infoExtra.innerHTML = `
    <p><strong>Tiempo promedio:</strong> ${tiempoPromedio} ms</p>
    <p><strong>Modelo más rápido:</strong> Modelo ${modeloMasRapido}</p>
    <p><strong>Modelo más lento:</strong> Modelo ${modeloMasLento}</p>
  `;
  datosConsola.appendChild(infoExtra);
});
