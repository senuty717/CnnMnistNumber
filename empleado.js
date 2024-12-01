// Simula una base de datos para almacenar los elementos de las predicciones
let predicciones = [];

// Función para agregar un nuevo elemento (simulación de "Dar de Alta")
function darDeAlta() {
  const nuevoModelo = document.getElementById("nuevo-modelo").value;
  if (nuevoModelo) {
    const nuevoId = predicciones.length + 1;
    const nuevoElemento = {
      id: nuevoId,
      modelo: nuevoModelo,
      prediccion: 'Pendiente',
      acertada: 'No',
    };
    predicciones.push(nuevoElemento);
    actualizarTabla();
    document.getElementById("nuevo-modelo").value = ''; // Limpiar el campo
  } else {
    alert("Por favor, ingresa un nuevo modelo.");
  }
}

// Función para modificar un elemento existente (simulación de "Modificar Elemento")
function modificarElemento() {
  const modificarId = document.getElementById("modificar-id").value;
  const nuevoValor = document.getElementById("nuevo-valor").value;

  if (modificarId && nuevoValor) {
    const elemento = predicciones.find(item => item.id === parseInt(modificarId));
    if (elemento) {
      elemento.modelo = nuevoValor;
      actualizarTabla();
      document.getElementById("modificar-id").value = '';
      document.getElementById("nuevo-valor").value = '';
    } else {
      alert("Elemento no encontrado.");
    }
  } else {
    alert("Por favor, ingresa un ID válido y el nuevo valor.");
  }
}

// Función para eliminar un elemento (simulación de "Dar de Baja")
function darDeBaja() {
  const bajaId = document.getElementById("baja-id").value;
  if (bajaId) {
    predicciones = predicciones.filter(item => item.id !== parseInt(bajaId));
    actualizarTabla();
    document.getElementById("baja-id").value = '';
  } else {
    alert("Por favor, ingresa un ID válido.");
  }
}

// Función para buscar un elemento por ID (simulación de "Buscar Elemento")
function buscarElemento() {
  const buscarId = document.getElementById("buscar-id").value;
  const resultadoBuscar = document.getElementById("resultado-buscar");

  if (buscarId) {
    const elemento = predicciones.find(item => item.id === parseInt(buscarId));
    if (elemento) {
      resultadoBuscar.innerHTML = `ID: ${elemento.id}, Modelo: ${elemento.modelo}, Predicción: ${elemento.prediccion}, Acertada: ${elemento.acertada}`;
    } else {
      resultadoBuscar.innerHTML = "Elemento no encontrado.";
    }
  } else {
    resultadoBuscar.innerHTML = "Por favor, ingresa un ID válido.";
  }
}

// Función para listar todos los elementos en la tabla
function listarElementos() {
  actualizarTabla();
}

// Función para actualizar la tabla con los datos actuales
function actualizarTabla() {
  const tablaCuerpo = document.getElementById("resultado-lista").getElementsByTagName('tbody')[0];
  tablaCuerpo.innerHTML = ''; // Limpiar la tabla antes de actualizar

  predicciones.forEach(item => {
    const fila = tablaCuerpo.insertRow();
    fila.innerHTML = `
      <td>${item.id}</td>
      <td>${item.modelo}</td>
      <td>${item.prediccion}</td>
      <td>${item.acertada}</td>
      <td><button onclick="modificarFila(${item.id})">Modificar</button></td>
    `;
  });
}

// Función para manejar la modificación en la fila de la tabla
function modificarFila(id) {
  const elemento = predicciones.find(item => item.id === id);
  if (elemento) {
    const nuevoValor = prompt("Introduce el nuevo valor para el modelo:", elemento.modelo);
    if (nuevoValor) {
      elemento.modelo = nuevoValor;
      actualizarTabla();
    }
  }
}

// Función para predicción y guardar el resultado en la tabla
function predecir() {
  // En este ejemplo, se simulan los resultados con un conjunto de datos ficticios
  const resultado = [
    { modelo: "Modelo 1", prediccion: "5", acertada: "Sí" },
    { modelo: "Modelo 2", prediccion: "3", acertada: "No" },
    { modelo: "Modelo 3", prediccion: "7", acertada: "Sí" },
    { modelo: "Modelo 4", prediccion: "1", acertada: "No" }
  ];

  // Guardar los resultados en la "base de datos"
  resultado.forEach((item, index) => {
    predicciones.push({
      id: predicciones.length + 1,
      modelo: item.modelo,
      prediccion: item.prediccion,
      acertada: item.acertada,
    });
  });

  actualizarTabla();
}

// Asignación de eventos a los botones
document.getElementById("listar-btn").addEventListener("click", listarElementos);
document.getElementById("buscar-btn").addEventListener("click", buscarElemento);
document.getElementById("dar-alta-btn").addEventListener("click", darDeAlta);
document.getElementById("modificar-btn").addEventListener("click", modificarElemento);
document.getElementById("baja-btn").addEventListener("click", darDeBaja);

// También puedes agregar el botón para predecir
document.getElementById("predecir").addEventListener("click", predecir);
