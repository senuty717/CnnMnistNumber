// Variables para almacenar los modelos cargados
var modelo = null;
var modelo2 = null;
var modelo3 = null;
var modelo4 = null;

// Configuración y acceso a los elementos canvas
var canvas = document.getElementById("grancanvas"); // Canvas principal donde se dibuja
var ctx1 = canvas.getContext("2d"); // Contexto 2D del canvas principal
var minicanvas = document.getElementById("minicanvas"); // Canvas pequeño donde se redimensiona la imagen
var ctx2 = minicanvas.getContext("2d"); // Contexto 2D del minicanvas

// Función para limpiar los canvases
function limpiar() {
  // Limpia el canvas grande y el de dibujo
  ctx1.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas grande
  drawingcanvas.clear(); // Limpia el canvas de dibujo
}

// Función para realizar las predicciones con los modelos cargados
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
    arr28.push([valor]); // Agrega el valor al subarreglo
    if (arr28.length == 28) {
      arr.push(arr28); // Una vez que el subarreglo tenga 28 elementos, lo agrega a `arr`
      arr28 = []; // Reinicia el subarreglo
    }
  }

  arr = [arr]; // Organiza el arreglo en la forma requerida para Tensor4D (1,28,28,1)

  var tensor4 = tf.tensor4d(arr); // Crea el tensor necesario para el modelo

  // Predicción de cada modelo y muestra de resultados en la tabla
  var inicio1 = performance.now(); // Inicia la medición de tiempo para el primer modelo
  var resultados = modelo.predict(tensor4).dataSync(); // Realiza la predicción con el primer modelo
  var mayorIndice1 = resultados.indexOf(Math.max.apply(null, resultados)); // Obtiene el índice del valor máximo
  var fin1 = performance.now(); // Finaliza la medición de tiempo
  var tiempo1 = fin1 - inicio1; // Calcula el tiempo que tomó la predicción
  console.log("Predicción 1", mayorIndice1, "Tiempo:", tiempo1.toFixed(2) + " ms");
  document.getElementById("resultado").innerHTML = mayorIndice1; // Muestra el resultado del primer modelo

  var inicio2 = performance.now(); // Inicia la medición de tiempo para el segundo modelo
  var resultados2 = modelo2.predict(tensor4).dataSync(); // Realiza la predicción con el segundo modelo
  var mayorIndice2 = resultados2.indexOf(Math.max.apply(null, resultados2)); // Obtiene el índice del valor máximo
  var fin2 = performance.now(); // Finaliza la medición de tiempo
  var tiempo2 = fin2 - inicio2; // Calcula el tiempo que tomó la predicción
  console.log("Predicción 2", mayorIndice2, "Tiempo:", tiempo2.toFixed(2) + " ms");
  document.getElementById("resultado2").innerHTML = mayorIndice2; // Muestra el resultado del segundo modelo

  var inicio3 = performance.now(); // Inicia la medición de tiempo para el tercer modelo
  var resultados3 = modelo3.predict(tensor4).dataSync(); // Realiza la predicción con el tercer modelo
  var mayorIndice3 = resultados3.indexOf(Math.max.apply(null, resultados3)); // Obtiene el índice del valor máximo
  var fin3 = performance.now(); // Finaliza la medición de tiempo
  var tiempo3 = fin3 - inicio3; // Calcula el tiempo que tomó la predicción
  console.log("Predicción 3", mayorIndice3, "Tiempo:", tiempo3.toFixed(2) + " ms");
  document.getElementById("resultado3").innerHTML = mayorIndice3; // Muestra el resultado del tercer modelo

  var inicio4 = performance.now(); // Inicia la medición de tiempo para el cuarto modelo
  var resultados4 = modelo4.predict(tensor4).dataSync(); // Realiza la predicción con el cuarto modelo
  var mayorIndice4 = resultados4.indexOf(Math.max.apply(null, resultados4)); // Obtiene el índice del valor máximo
  var fin4 = performance.now(); // Finaliza la medición de tiempo
  var tiempo4 = fin4 - inicio4; // Calcula el tiempo que tomó la predicción
  console.log("Predicción 4", mayorIndice4, "Tiempo:", tiempo4.toFixed(2) + " ms");
  document.getElementById("resultado4").innerHTML = mayorIndice4; // Muestra el resultado del cuarto modelo

  // Crear un objeto con los resultados de todas las predicciones
  const predicciones = [
    { indice: mayorIndice1, tiempo: tiempo1, modelo: 1 }, // Predicción del primer modelo
    { indice: mayorIndice2, tiempo: tiempo2, modelo: 2 }, // Predicción del segundo modelo
    { indice: mayorIndice3, tiempo: tiempo3, modelo: 3 }, // Predicción del tercer modelo
    { indice: mayorIndice4, tiempo: tiempo4, modelo: 4 }  // Predicción del cuarto modelo
  ];

  // Disparar un evento personalizado con los resultados de las predicciones
  const evento = new CustomEvent('actualizarPredicciones', {
    detail: predicciones  // Los detalles del evento contienen las predicciones
  });
  document.dispatchEvent(evento);  // Disparamos el evento para que 'consola.js' lo escuche
}

// Función para redimensionar la imagen en el canvas de origen a un tamaño nuevo en el canvas de destino
function resample_single(canvas, width, height, resize_canvas) {
  // Redimensiona la imagen de `canvas` a un nuevo tamaño en `resize_canvas` utilizando el filtro de Hermite
  var width_source = canvas.width; // Ancho del canvas original
  var height_source = canvas.height; // Alto del canvas original
  width = Math.round(width); // Redondea el ancho solicitado
  height = Math.round(height); // Redondea el alto solicitado

  var ratio_w = width_source / width; // Relación de redimensionado en ancho
  var ratio_h = height_source / height; // Relación de redimensionado en alto
  var ratio_w_half = Math.ceil(ratio_w / 2); // Mitad de la relación en ancho
  var ratio_h_half = Math.ceil(ratio_h / 2); // Mitad de la relación en alto

  var ctx = canvas.getContext("2d"); // Contexto 2D del canvas original
  var ctx2 = resize_canvas.getContext("2d"); // Contexto 2D del canvas redimensionado
  var img = ctx.getImageData(0, 0, width_source, height_source); // Obtiene los datos de la imagen original
  var img2 = ctx2.createImageData(width, height); // Crea un nuevo espacio de imagen con el tamaño redimensionado
  var data = img.data; // Datos de la imagen original
  var data2 = img2.data; // Datos de la nueva imagen redimensionada

  // Algoritmo para redimensionar la imagen utilizando el filtro de Hermite
  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      var x2 = (i + j * width) * 4; // Calcula la posición en el nuevo canvas
      var weight = 0; // Peso para el color
      var weights = 0; // Peso acumulado para los colores
      var weights_alpha = 0; // Peso acumulado para el canal alfa
      var gx_r = 0; // Componente roja
      var gx_g = 0; // Componente verde
      var gx_b = 0; // Componente azul
      var gx_a = 0; // Componente alfa
      var center_y = (j + 0.5) * ratio_h; // Coordenada Y del centro
      var yy_start = Math.floor(j * ratio_h); // Inicio del rango de píxeles en el eje Y
      var yy_stop = Math.ceil((j + 1) * ratio_h); // Fin del rango de píxeles en el eje Y
      for (var yy = yy_start; yy < yy_stop; yy++) {
        var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half; // Distancia relativa en Y
        var center_x = (i + 0.5) * ratio_w; // Coordenada X del centro
        var w0 = dy * dy; // Cuadrado de la distancia
        var xx_start = Math.floor(i * ratio_w); // Inicio del rango de píxeles en el eje X
        var xx_stop = Math.ceil((i + 1) * ratio_w); // Fin del rango de píxeles en el eje X
        for (var xx = xx_start; xx < xx_stop; xx++) {
          var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half; // Distancia relativa en X
          var w = Math.sqrt(w0 + dx * dx); // Peso total (en función de la distancia)
          if (w >= 1) continue; // Si el peso es mayor o igual a 1, lo omite

          weight = 2 * w * w * w - 3 * w * w + 1; // Fórmula del filtro de Hermite
          var pos_x = 4 * (xx + yy * width_source); // Calcula la posición en el canvas original

          gx_a += weight * data[pos_x + 3]; // Calcula el valor alfa
          weights_alpha += weight; // Acumula el peso alfa

          if (data[pos_x + 3] < 255) weight = weight * data[pos_x + 3] / 250; // Ajusta el peso por el alfa
          gx_r += weight * data[pos_x]; // Calcula el componente rojo
          gx_g += weight * data[pos_x + 1]; // Calcula el componente verde
          gx_b += weight * data[pos_x + 2]; // Calcula el componente azul
          weights += weight; // Acumula el peso total
        }
      }
      data2[x2] = gx_r / weights; // Asigna el valor promedio para el rojo
      data2[x2 + 1] = gx_g / weights; // Asigna el valor promedio para el verde
      data2[x2 + 2] = gx_b / weights; // Asigna el valor promedio para el azul
      data2[x2 + 3] = gx_a / weights_alpha; // Asigna el valor promedio para el alfa
    }
  }
  ctx2.putImageData(img2, 0, 0); // Pone la imagen redimensionada en el canvas de destino
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
