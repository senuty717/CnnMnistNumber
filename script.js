    // Variables para almacenar los modelos cargados
    var modelo = null;
    var modelo2 = null;
    var modelo3 = null;
    var modelo4 = null;

    // Configuración y acceso a los elementos canvas
    var canvas = document.getElementById("grancanvas");
    var ctx1 = canvas.getContext("2d");
    var minicanvas = document.getElementById("minicanvas");
    var ctx2 = minicanvas.getContext("2d");

    function limpiar() {
      // Limpia el canvas grande y el de dibujo
      ctx1.clearRect(0, 0, canvas.width, canvas.height);
      drawingcanvas.clear();
    }
// Función que se ejecuta cuando el empleado realiza una predicción
function predecirEmpleado() {
  // Redimensiona el dibujo a 28x28 píxeles en el minicanvas
  resample_single(canvas, 28, 28, minicanvas);

  // Toma los datos de imagen del minicanvas
  var imgData = ctx2.getImageData(0, 0, 28, 28);
  var arr = [];
  var arr28 = [];

  // Convierte los datos de la imagen en un arreglo de blanco y negro
  for (var p = 0, i = 0; p < imgData.data.length; p += 4) {
    var valor = imgData.data[p + 3] / 255;
    arr28.push([valor]);
    if (arr28.length == 28) {
      arr.push(arr28);
      arr28 = [];
    }
  }

  arr = [arr]; // Organiza el arreglo en la forma requerida para Tensor4D (1,28,28,1)

  var tensor4 = tf.tensor4d(arr); // Crea el tensor necesario para el modelo

  // Predicción de cada modelo y muestra de resultados en la tabla
  var inicio1 = performance.now();
  var resultados = modelo.predict(tensor4).dataSync();
  var mayorIndice1 = resultados.indexOf(Math.max.apply(null, resultados));
  var fin1 = performance.now();
  var tiempo1 = fin1 - inicio1;

  var inicio2 = performance.now();
  var resultados2 = modelo2.predict(tensor4).dataSync();
  var mayorIndice2 = resultados2.indexOf(Math.max.apply(null, resultados2));
  var fin2 = performance.now();
  var tiempo2 = fin2 - inicio2;

  var inicio3 = performance.now();
  var resultados3 = modelo3.predict(tensor4).dataSync();
  var mayorIndice3 = resultados3.indexOf(Math.max.apply(null, resultados3));
  var fin3 = performance.now();
  var tiempo3 = fin3 - inicio3;

  var inicio4 = performance.now();
  var resultados4 = modelo4.predict(tensor4).dataSync();
  var mayorIndice4 = resultados4.indexOf(Math.max.apply(null, resultados4));
  var fin4 = performance.now();
  var tiempo4 = fin4 - inicio4;

  // Crear un objeto con los resultados
  const predicciones = {
    fecha: new Date().toLocaleString(),
    modelo1: mayorIndice1,
    modelo2: mayorIndice2,
    modelo3: mayorIndice3,
    modelo4: mayorIndice4,
    tiempo: Math.max(tiempo1, tiempo2, tiempo3, tiempo4).toFixed(2) + " ms" // Tiempo más largo entre las predicciones
  };

  // Agregar la predicción al historial
  agregarPrediccionHistorial(predicciones);
}

// Función para agregar una predicción al historial
function agregarPrediccionHistorial(prediccion) {
  const tabla = document.getElementById("tabla-predicciones").getElementsByTagName('tbody')[0];

  // Crear una nueva fila
  const nuevaFila = tabla.insertRow();

  // Crear celdas para cada dato de la predicción
  const celdaFecha = nuevaFila.insertCell(0);
  celdaFecha.textContent = prediccion.fecha;

  const celdaModelo1 = nuevaFila.insertCell(1);
  celdaModelo1.textContent = prediccion.modelo1;

  const celdaModelo2 = nuevaFila.insertCell(2);
  celdaModelo2.textContent = prediccion.modelo2;

  const celdaModelo3 = nuevaFila.insertCell(3);
  celdaModelo3.textContent = prediccion.modelo3;

  const celdaModelo4 = nuevaFila.insertCell(4);
  celdaModelo4.textContent = prediccion.modelo4;

  const celdaTiempo = nuevaFila.insertCell(5);
  celdaTiempo.textContent = prediccion.tiempo;
}

// Inicializar la interfaz para el empleado cuando se hace login
function mostrarContenido(rol) {
  // Ocultar todo el contenido de roles
  adminContent.classList.add("oculto");
  empleadoContent.classList.add("oculto");
  clienteContent.classList.add("oculto");

  // Mostrar el contenido correspondiente al rol
  switch (rol) {
    case 'empleado':
      empleadoContent.classList.remove("oculto");
      localStorage.setItem("rol", "empleado");
      break;
  }

  // Eliminar la clase 'oculto' de todos los elementos con la clase 'contenido-roles'
  const contenidosRoles = document.querySelectorAll('.contenido-roles');
  contenidosRoles.forEach(function(contenido) {
    contenido.classList.remove("oculto");
  });
}

function predecir() {
  // Redimensiona el dibujo a 28x28 píxeles en el minicanvas
  resample_single(canvas, 28, 28, minicanvas);
  // Toma los datos de imagen del minicanvas
  var imgData = ctx2.getImageData(0, 0, 28, 28);
  var arr = []; // Arreglo final que contendrá la imagen en formato adecuado
  var arr28 = []; // Subarreglo de 28 píxeles que se agregará a `arr`

  // Convierte los datos de la imagen en un arreglo de blanco y negro
  for (var p = 0, i = 0; p < imgData.data.length; p += 4) {
    var valor = imgData.data[p + 3] / 255; // Normaliza valor alfa de 0 a 1
    arr28.push([valor]); // Agrega al subarreglo
    if (arr28.length == 28) {
      arr.push(arr28);
      arr28 = [];
    }
  }

  arr = [arr]; // Organiza el arreglo en la forma requerida para Tensor4D (1,28,28,1)

  var tensor4 = tf.tensor4d(arr); // Crea el tensor necesario para el modelo

  // Predicción de cada modelo y muestra de resultados en la tabla
  var inicio1 = performance.now();
  var resultados = modelo.predict(tensor4).dataSync();
  var mayorIndice1 = resultados.indexOf(Math.max.apply(null, resultados));
  var fin1 = performance.now();
  var tiempo1 = fin1 - inicio1;
  console.log("Predicción 1", mayorIndice1, "Tiempo:", tiempo1.toFixed(2) + " ms");
  document.getElementById("resultado").innerHTML = mayorIndice1;

  var inicio2 = performance.now();
  var resultados2 = modelo2.predict(tensor4).dataSync();
  var mayorIndice2 = resultados2.indexOf(Math.max.apply(null, resultados2));
  var fin2 = performance.now();
  var tiempo2 = fin2 - inicio2;
  console.log("Predicción 2", mayorIndice2, "Tiempo:", tiempo2.toFixed(2) + " ms");
  document.getElementById("resultado2").innerHTML = mayorIndice2;

  var inicio3 = performance.now();
  var resultados3 = modelo3.predict(tensor4).dataSync();
  var mayorIndice3 = resultados3.indexOf(Math.max.apply(null, resultados3));
  var fin3 = performance.now();
  var tiempo3 = fin3 - inicio3;
  console.log("Predicción 3", mayorIndice3, "Tiempo:", tiempo3.toFixed(2) + " ms");
  document.getElementById("resultado3").innerHTML = mayorIndice3;

  var inicio4 = performance.now();
  var resultados4 = modelo4.predict(tensor4).dataSync();
  var mayorIndice4 = resultados4.indexOf(Math.max.apply(null, resultados4));
  var fin4 = performance.now();
  var tiempo4 = fin4 - inicio4;
  console.log("Predicción 4", mayorIndice4, "Tiempo:", tiempo4.toFixed(2) + " ms");
  document.getElementById("resultado4").innerHTML = mayorIndice4;

  // Crear un objeto con los resultados
const predicciones = [
  { indice: mayorIndice1, tiempo: tiempo1, modelo: 1 },
  { indice: mayorIndice2, tiempo: tiempo2, modelo: 2 },
  { indice: mayorIndice3, tiempo: tiempo3, modelo: 3 },
  { indice: mayorIndice4, tiempo: tiempo4, modelo: 4 }
];

// Disparar un evento personalizado con los resultados de las predicciones
const evento = new CustomEvent('actualizarPredicciones', {
  detail: predicciones  // Los detalles del evento contienen las predicciones
});
document.dispatchEvent(evento);  // Disparamos el evento para que 'consola.js' lo escuche
}

    function resample_single(canvas, width, height, resize_canvas) {
      // Redimensiona la imagen de `canvas` a un nuevo tamaño en `resize_canvas` utilizando el filtro de Hermite
      var width_source = canvas.width;
      var height_source = canvas.height;
      width = Math.round(width);
      height = Math.round(height);

      var ratio_w = width_source / width;
      var ratio_h = height_source / height;
      var ratio_w_half = Math.ceil(ratio_w / 2);
      var ratio_h_half = Math.ceil(ratio_h / 2);

      var ctx = canvas.getContext("2d");
      var ctx2 = resize_canvas.getContext("2d");
      var img = ctx.getImageData(0, 0, width_source, height_source);
      var img2 = ctx2.createImageData(width, height);
      var data = img.data;
      var data2 = img2.data;

      for (var j = 0; j < height; j++) {
        for (var i = 0; i < width; i++) {
          var x2 = (i + j * width) * 4;
          var weight = 0;
          var weights = 0;
          var weights_alpha = 0;
          var gx_r = 0;
          var gx_g = 0;
          var gx_b = 0;
          var gx_a = 0;
          var center_y = (j + 0.5) * ratio_h;
          var yy_start = Math.floor(j * ratio_h);
          var yy_stop = Math.ceil((j + 1) * ratio_h);
          for (var yy = yy_start; yy < yy_stop; yy++) {
            var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
            var center_x = (i + 0.5) * ratio_w;
            var w0 = dy * dy;
            var xx_start = Math.floor(i * ratio_w);
            var xx_stop = Math.ceil((i + 1) * ratio_w);
            for (var xx = xx_start; xx < xx_stop; xx++) {
              var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
              var w = Math.sqrt(w0 + dx * dx);
              if (w >= 1) continue;

              weight = 2 * w * w * w - 3 * w * w + 1;
              var pos_x = 4 * (xx + yy * width_source);

              gx_a += weight * data[pos_x + 3];
              weights_alpha += weight;

              if (data[pos_x + 3] < 255) weight = weight * data[pos_x + 3] / 250;
              gx_r += weight * data[pos_x];
              gx_g += weight * data[pos_x + 1];
              gx_b += weight * data[pos_x + 2];
              weights += weight;
            }
          }
          data2[x2] = gx_r / weights;
          data2[x2 + 1] = gx_g / weights;
          data2[x2 + 2] = gx_b / weights;
          data2[x2 + 3] = gx_a / weights_alpha;
        }
      }
      ctx2.putImageData(img2, 0, 0);
    }

    // Carga de modelos de forma asíncrona desde URLs de archivos JSON
    (async () => {
      console.log("Cargando modelo 1...");
      modelo = await tf.loadLayersModel("https://raw.githubusercontent.com/senuty717/RedesNeuronalesConvolucionalesMNIST/main/modelo_1.json");
      console.log("Modelo 1 cargado...");

      console.log("Cargando modelo 2...");
      modelo2 = await tf.loadLayersModel("https://raw.githubusercontent.com/senuty717/RedesNeuronalesConvolucionalesMNIST/main/modelo_2.json");
      console.log("Modelo 2 cargado...");

      console.log("Cargando modelo 3...");
      modelo3 = await tf.loadLayersModel("https://raw.githubusercontent.com/senuty717/RedesNeuronalesConvolucionalesMNIST/main/modelo_3.json");
      console.log("Modelo 3 cargado...");

      console.log("Cargando modelo 4...");
      modelo4 = await tf.loadLayersModel("https://raw.githubusercontent.com/senuty717/RedesNeuronalesConvolucionalesMNIST/main/modelo_4.json");
      console.log("Modelo 4 cargado...");
    })();
