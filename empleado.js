// Asegurarnos de que los datos existan en localStorage o inicializarlo con algunos datos de ejemplo
if (!localStorage.getItem('predicciones')) {
  const datosIniciales = [
    { id: 1, modelo: 'CNN', prediccion: 5 },
    { id: 2, modelo: 'CNN+DO', prediccion: 3 },
    { id: 3, modelo: 'CNN+AD', prediccion: 9 }
  ];
  localStorage.setItem('predicciones', JSON.stringify(datosIniciales));
}

// Cargar los datos desde localStorage y mostrarlos en la tabla
function cargarDatos() {
  const predicciones = JSON.parse(localStorage.getItem('predicciones'));
  const tabla = document.getElementById('resultado-lista');
  
  // Limpiar la tabla antes de cargar nuevos datos
  tabla.innerHTML = '';

  // Si no hay datos, mostrar un mensaje
  if (predicciones.length === 0) {
    tabla.innerHTML = '<p>No hay datos disponibles.</p>';
    return;
  }

  // Crear filas para cada predicción
  predicciones.forEach(dato => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${dato.id}</td>
      <td>${dato.modelo}</td>
      <td>${dato.prediccion}</td>
      <td>
        <button onclick="modificarDato(${dato.id})">Modificar</button>
        <button onclick="eliminarDato(${dato.id})">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// Función para buscar un dato por ID
document.getElementById('buscar-id-btn').addEventListener('click', function() {
  const idBuscado = document.getElementById('buscar-id').value;
  const predicciones = JSON.parse(localStorage.getItem('predicciones'));
  
  const resultado = predicciones.find(dato => dato.id == idBuscado);

  const resultadoBuscar = document.getElementById('resultado-buscar');
  if (resultado) {
    resultadoBuscar.innerHTML = `
      <p>ID: ${resultado.id}</p>
      <p>Modelo: ${resultado.modelo}</p>
      <p>Predicción: ${resultado.prediccion}</p>
    `;
  } else {
    resultadoBuscar.innerHTML = '<p>No se encontró el dato.</p>';
  }
});

// Función para dar de alta un nuevo dato
document.getElementById('dar-alta-btn').addEventListener('click', function() {
  const nuevoDato = document.getElementById('nuevo-dato').value;
  if (nuevoDato.trim() === '') return;

  const predicciones = JSON.parse(localStorage.getItem('predicciones'));
  const nuevoId = predicciones.length ? predicciones[predicciones.length - 1].id + 1 : 1;
  const nuevoElemento = { id: nuevoId, modelo: 'Nuevo Modelo', prediccion: nuevoDato };

  predicciones.push(nuevoElemento);
  localStorage.setItem('predicciones', JSON.stringify(predicciones));
  cargarDatos(); // Recargar la tabla
});

// Función para modificar un dato
function modificarDato(id) {
  const predicciones = JSON.parse(localStorage.getItem('predicciones'));
  const dato = predicciones.find(d => d.id === id);

  const nuevoValor = prompt('Introduce el nuevo valor de la predicción:', dato.prediccion);
  if (nuevoValor !== null) {
    dato.prediccion = nuevoValor;
    localStorage.setItem('predicciones', JSON.stringify(predicciones));
    cargarDatos(); // Recargar la tabla
  }
}

// Función para eliminar un dato
function eliminarDato(id) {
  let predicciones = JSON.parse(localStorage.getItem('predicciones'));
  predicciones = predicciones.filter(d => d.id !== id);
  localStorage.setItem('predicciones', JSON.stringify(predicciones));
  cargarDatos(); // Recargar la tabla
}

// Función para mostrar la sección de empleado (luego de login)
function mostrarEmpleado() {
  // Ocultar formulario de login
  document.getElementById('login-form').classList.add('oculto');
  
  // Mostrar la sección de empleado
  document.getElementById('empleado-content').classList.remove('oculto');
  
  // Inicializar la carga de los datos de la tabla
  cargarDatos();
}

// Función para mostrar el formulario de búsqueda
document.getElementById('buscar-btn').addEventListener('click', function() {
  document.getElementById('form-buscar').classList.toggle('oculto');
});

// Función para mostrar el formulario de alta
document.getElementById('dar-alta-btn').addEventListener('click', function() {
  document.getElementById('form-dar-alta').classList.toggle('oculto');
});

// Función para manejar el inicio de sesión y mostrar el rol del empleado
function setRole(role) {
  if (role === 'employee') {
    mostrarEmpleado();
  }
}

// Mostrar el formulario de modificar cuando se haga clic
document.getElementById('modificar-btn').addEventListener('click', function() {
  document.getElementById('form-modificar').classList.toggle('oculto');
});

// Mostrar el formulario de baja cuando se haga clic
document.getElementById('baja-btn').addEventListener('click', function() {
  document.getElementById('form-baja').classList.toggle('oculto');
});
