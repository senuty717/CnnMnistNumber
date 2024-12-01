// Variables globales
let idContador = 1; // Para crear un ID único por cada resultado

// Elementos de la tabla
const tablaResultado = document.getElementById("resultado-lista").getElementsByTagName('tbody')[0];

// Función para mostrar las predicciones en la tabla
function mostrarPredicciones(predicciones) {
  // Limpiar la tabla antes de agregar nuevos resultados
  tablaResultado.innerHTML = "";

  // Iterar sobre las predicciones y agregar una fila por cada modelo
  predicciones.forEach(prediccion => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${idContador++}</td>
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
