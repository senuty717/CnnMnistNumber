// Elementos de la tabla
const tablaResultado = document.getElementById("resultado-lista").getElementsByTagName('tbody')[0];

// Función para mostrar las predicciones en la tabla
function mostrarPredicciones(predicciones) {
  // Limpiar la tabla antes de agregar nuevos resultados
  tablaResultado.innerHTML = "";

  // Iterar sobre las predicciones y agregar una fila por cada modelo
  predicciones.forEach((prediccion, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>Modelo ${prediccion.modelo}</td>
      <td>${prediccion.indice}</td>
      <td><input type="checkbox" disabled checked></td>
    `;
    tablaResultado.appendChild(fila);
  });
}

// Escuchar el evento personalizado 'actualizarPredicciones' que se dispara desde script.js
document.addEventListener('actualizarPredicciones', function(event) {
  const predicciones = event.detail; // Los datos de las predicciones están en event.detail
  mostrarPredicciones(predicciones); // Mostrar las predicciones en la tabla
});

// Lógica para los botones
document.getElementById('guardar-btn').addEventListener('click', function() {
  // Aquí puedes añadir la lógica para guardar los resultados si es necesario
  alert("Resultados guardados.");
});

document.getElementById('listar-btn').addEventListener('click', function() {
  // Aquí puedes listar los resultados si fuera necesario
  alert("Mostrando resultados listados.");
});
