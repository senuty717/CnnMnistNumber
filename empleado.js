// Asegurarnos de que los datos existan en localStorage o inicializarlo con algunos datos de ejemplo
if (!localStorage.getItem('predicciones')) {
  const datosIniciales = [
    { id: 1, modelo: 'CNN', prediccion: 5, acertada: false },
    { id: 2, modelo: 'CNN+DO', prediccion: 3, acertada: false },
    { id: 3, modelo: 'CNN+AD', prediccion: 9, acertada: false },
    { id: 4, modelo: 'CNN+LSTM', prediccion: 7, acertada: false }
  ];
  localStorage.setItem('predicciones', JSON.stringify(datosIniciales));
}

// Función para cargar los datos desde localStorage y mostrarlos en la tabla
function cargarDatos() {
  const predicciones = JSON.parse(localStorage.getItem('predicciones'));
  const tabla = document.getElementById('resultado-lista').getElementsByTagName('tbody')[0];
  
  // Limpiar la tabla antes de cargar nuevos datos
  tabla.innerHTML = '';

  // Si no hay datos, mostrar un mensaje
  if (predicciones.length === 0) {
    tabla.innerHTML = '<tr><td colspan="4">No hay datos disponibles.</td></tr>';
    return;
  }

  // Crear filas para cada predicción
  predicciones.forEach(dato => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${dato.modelo}</td>
      <td>${dato.prediccion}</td>
      <td>${dato.acertada ? 'Acertada' : 'No Acertada'}</td>
      <td>
        <button onclick="modificarDato(${dato.id})">Modificar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// Función para mostrar los datos cuando el botón "Listar Elementos" se hace clic
document.getElementById('listar-btn').addEventListener('click', function() {
  cargarDatos();  // Mostrar la lista de modelos
});

// Función para modificar la predicción de un modelo
function modificarDato(id) {
  const predicciones = JSON.parse(localStorage.getItem('predicciones'));
  const dato = predicciones.find(d => d.id === id);

  const nuevoValor = prompt('Introduce el nuevo valor de la predicción:', dato.prediccion);
  if (nuevoValor !== null) {
    dato.prediccion = nuevoValor;
    // Preguntar si la predicción fue acertada
    const acertada = prompt('¿La predicción es correcta? (sí/no):', 'no').toLowerCase() === 'sí';
    dato.acertada = acertada;

    localStorage.setItem('predicciones', JSON.stringify(predicciones));
    cargarDatos(); // Recargar la tabla con los datos actualizados
  }
}

// Esta función se llamará después de iniciar sesión correctamente
function setRole(role) {
  if (role === 'employee') {
    mostrarEmpleado();
  }
}

// Mostrar la sección del empleado tras iniciar sesión
function mostrarEmpleado() {
  document.getElementById('login-form').classList.add('oculto');
  document.getElementById('empleado-content').classList.remove('oculto');
}
