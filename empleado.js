// Simulación de base de datos de empleados
let empleados = [
  { id: '1', nombre: 'Juan Pérez', rol: 'Desarrollador' },
  { id: '2', nombre: 'Ana López', rol: 'Diseñadora' }
];

// Función para mostrar la lista de empleados
function mostrarEmpleados() {
  const tabla = document.getElementById("empleados-lista").getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';  // Limpiar tabla

  empleados.forEach(empleado => {
    const fila = tabla.insertRow();
    fila.insertCell(0).textContent = empleado.id;
    fila.insertCell(1).textContent = empleado.nombre;
    fila.insertCell(2).textContent = empleado.rol;
    const acciones = fila.insertCell(3);

    // Crear botones para modificar o eliminar
    const btnModificar = document.createElement("button");
    btnModificar.textContent = "Modificar";
    btnModificar.onclick = () => editarEmpleado(empleado.id);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarEmpleado(empleado.id);

    acciones.appendChild(btnModificar);
    acciones.appendChild(btnEliminar);
  });
}

// Función para agregar o modificar un empleado
document.getElementById("formulario-empleado").addEventListener("submit", function(event) {
  event.preventDefault();

  const id = document.getElementById("empleado-id").value;
  const nombre = document.getElementById("empleado-nombre").value;
  const rol = document.getElementById("empleado-rol").value;

  // Comprobar si es un nuevo empleado o uno a modificar
  const empleadoExistente = empleados.find(emp => emp.id === id);
  if (empleadoExistente) {
    // Modificar empleado
    empleadoExistente.nombre = nombre;
    empleadoExistente.rol = rol;
  } else {
    // Agregar nuevo empleado
    empleados.push({ id, nombre, rol });
  }

  // Limpiar campos y actualizar la lista
  document.getElementById("formulario-empleado").reset();
  mostrarEmpleados();
});

// Función para eliminar un empleado
document.getElementById("eliminar-empleado").addEventListener("click", function() {
  const id = document.getElementById("empleado-id").value;
  empleados = empleados.filter(empleado => empleado.id !== id);
  mostrarEmpleados();
  document.getElementById("formulario-empleado").reset();  // Limpiar formulario
});

// Función para editar un empleado (cuando se da click en "Modificar")
function editarEmpleado(id) {
  const empleado = empleados.find(emp => emp.id === id);
  document.getElementById("empleado-id").value = empleado.id;
  document.getElementById("empleado-nombre").value = empleado.nombre;
  document.getElementById("empleado-rol").value = empleado.rol;
}

// Función para buscar empleados
document.getElementById("buscar-empleado").addEventListener("input", function(event) {
  const query = event.target.value.toLowerCase();
  const empleadosFiltrados = empleados.filter(empleado => empleado.nombre.toLowerCase().includes(query));
  
  const tabla = document.getElementById("empleados-lista").getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';  // Limpiar tabla

  empleadosFiltrados.forEach(empleado => {
    const fila = tabla.insertRow();
    fila.insertCell(0).textContent = empleado.id;
    fila.insertCell(1).textContent = empleado.nombre;
    fila.insertCell(2).textContent = empleado.rol;
    const acciones = fila.insertCell(3);

    const btnModificar = document.createElement("button");
    btnModificar.textContent = "Modificar";
    btnModificar.onclick = () => editarEmpleado(empleado.id);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarEmpleado(empleado.id);

    acciones.appendChild(btnModificar);
    acciones.appendChild(btnEliminar);
  });
}

// Mostrar la lista inicial de empleados
mostrarEmpleados();
