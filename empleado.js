// Array para almacenar los resultados guardados
let resultadosGuardados = [];

// Elementos de la tabla donde se mostrarán los resultados
const tablaResultado = document.getElementById("resultado-lista").getElementsByTagName('tbody')[0];

// Función para mostrar las predicciones en la tabla
function mostrarPredicciones(predicciones) {
  // Limpiar la tabla antes de agregar nuevos resultados
  tablaResultado.innerHTML = "";

  // Iterar sobre las predicciones y agregar una fila por cada modelo
  predicciones.forEach((prediccion, index) => {
    const fila = document.createElement("tr");  // Crear una nueva fila para cada predicción
    fila.innerHTML = `
      <td>${index + 1}</td>  <!-- Número de la predicción -->
      <td>Modelo ${prediccion.modelo}</td>  <!-- Nombre del modelo -->
      <td>${prediccion.indice}</td>  <!-- Índice de la predicción -->
      <td><input type="checkbox" class="acertado-checkbox" data-modelo="${prediccion.modelo}" ${prediccion.acertado ? "checked" : ""}></td>  <!-- Checkbox para marcar si la predicción fue acertada -->
    `;
    tablaResultado.appendChild(fila);  // Añadir la fila a la tabla
  });

  // Habilitar todos los checkboxes para asegurar que sean interactivos
  const checkboxes = document.querySelectorAll('.acertado-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.disabled = false;  // Asegurar que los checkboxes sean interactivos
  });
}

// Escuchar el evento personalizado 'actualizarPredicciones' que se dispara desde otro script
document.addEventListener('actualizarPredicciones', function (event) {
  const predicciones = event.detail;  // Obtener las predicciones del evento
  mostrarPredicciones(predicciones);  // Mostrar las predicciones en la tabla
});

// Lógica para el botón "Guardar"
document.getElementById('guardar-btn').addEventListener('click', function () {
  // Verificar si hay predicciones antes de guardar
  const checkboxes = document.querySelectorAll('.acertado-checkbox');
  if (checkboxes.length === 0) {
    alert("No hay resultados para guardar.");  // Si no hay predicciones, mostrar un mensaje
    return;
  }

  // Recopilar los resultados y el estado de los checkboxes
  const resultados = [];
  checkboxes.forEach(checkbox => {
    resultados.push({
      modelo: checkbox.getAttribute('data-modelo'),  // Obtener el modelo desde el atributo 'data-modelo'
      acertado: checkbox.checked,  // Obtener si el checkbox está marcado
      prediccion: checkbox.closest("tr").querySelector('td:nth-child(3)').textContent // Obtener el número de la predicción
    });
  });

  // Guardar los resultados en el array de resultados guardados
  resultadosGuardados.push(resultados);

  // Limpiar la tabla después de guardar los resultados
  tablaResultado.innerHTML = "";

  // Mostrar mensaje de éxito
  alert("Resultados guardados.");
  console.log("Resultados guardados:", resultados);  // Para depuración
});

// Lógica para el botón "Listar Resultados"
document.getElementById('listar-btn').addEventListener('click', function () {
  // Verificar si hay resultados guardados
  if (resultadosGuardados.length === 0) {
    alert("No hay resultados guardados.");  // Si no hay resultados guardados, mostrar un mensaje
    return;
  }

  // Crear la ventana emergente
  const ventanaFlotante = document.createElement("div");
  ventanaFlotante.id = "ventana-flotante";  // Asignar el ID para la ventana emergente
  ventanaFlotante.innerHTML = `
    <div class="ventana-contenido">
      <h3>Resultados Guardados</h3>
      <table class="tabla-listado">
        <thead>
          <tr>
            <th>ID</th>
            <th>Predicción</th>
            <th>Modelo</th>
            <th>Acertado</th>
          </tr>
        </thead>
        <tbody>
          <!-- Resultados serán insertados aquí -->
        </tbody>
      </table>
      <button id="cerrar-ventana">Aceptar</button>
    </div>
  `;

  // Agregar los resultados guardados a la tabla dentro de la ventana emergente
  const tbody = ventanaFlotante.querySelector('tbody');
  resultadosGuardados.forEach((resultados, index) => {
    resultados.forEach((resultado, subIndex) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${index + 1}-${subIndex + 1}</td>  <!-- Identificador único de la fila -->
        <td>${resultado.prediccion}</td>  <!-- Mostrar la predicción -->
        <td>Modelo ${resultado.modelo}</td>  <!-- Mostrar el modelo -->
        <td><input type="checkbox" ${resultado.acertado ? "checked" : ""} disabled></td>  <!-- Mostrar checkbox con el estado guardado -->
      `;
      tbody.appendChild(fila);  // Añadir la fila a la tabla de la ventana emergente
    });
  });

  // Agregar la ventana emergente al body
  document.body.appendChild(ventanaFlotante);

  // Lógica para el botón "Aceptar" (cerrar ventana)
  document.getElementById('cerrar-ventana').addEventListener('click', function () {
    ventanaFlotante.remove();  // Cerrar la ventana emergente al hacer clic en "Aceptar"
  });
});

// Listener para detectar cambios en los checkboxes (para depuración o lógica adicional)
document.addEventListener('change', (event) => {
  if (event.target.classList.contains('acertado-checkbox')) {
    console.log(`Checkbox cambiado: Modelo=${event.target.dataset.modelo}, Marcado=${event.target.checked}`);  // Para depuración
  }
});
