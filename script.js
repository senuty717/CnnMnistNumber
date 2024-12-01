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

function predecir() {
  // Redimensiona el dibujo a 28x28 píxeles en el minicanvas
  resample_single(canvas, 28, 28, minicanvas);
  var imgData = ctx2.getImageData(0, 0, 28, 28);
  var arr = [];
  var arr28 = [];

  for (var p = 0, i = 0; p < imgData.data.length; p += 4) {
    var valor = imgData.data[p + 3] / 255; // Normaliza valor alfa de 0 a 1
    arr28.push([valor]);
    if (arr28.length == 28) {
      arr.push(arr28);
      arr28 = [];
    }
  }

  arr = [arr]; // Organiza el arreglo en la forma requerida para Tensor4D (1,28,28,1)
  var tensor4 = tf.tensor4d(arr);

  // Función para obtener el top 3 de índices y probabilidades
  function obtenerTop3(resultados) {
    return Array.from(resultados)
      .map((valor, indice) => ({ indice, valor }))
      .sort((a, b) => b.valor - a.valor) // Ordenar por valor descendente
      .slice(0, 3); // Tomar los 3 primeros
  }

  // Predicción para cada modelo
  var inicio1 = performance.now();
  var resultados1 = modelo.predict(tensor4).dataSync();
  var top3Modelo1 = obtenerTop3(resultados1); // Obtener el top 3
  var fin1 = performance.now();
  var tiempo1 = fin1 - inicio1;

  var inicio2 = performance.now();
  var resultados2 = modelo2.predict(tensor4).dataSync();
  var top3Modelo2 = obtenerTop3(resultados2);
  var fin2 = performance.now();
  var tiempo2 = fin2 - inicio2;

  var inicio3 = performance.now();
  var resultados3 = modelo3.predict(tensor4).dataSync();
  var top3Modelo3 = obtenerTop3(resultados3);
  var fin3 = performance.now();
  var tiempo3 = fin3 - inicio3;

  var inicio4 = performance.now();
  var resultados4 = modelo4.predict(tensor4).dataSync();
  var top3Modelo4 = obtenerTop3(resultados4);
  var fin4 = performance.now();
  var tiempo4 = fin4 - inicio4;

  // Crear un objeto con los resultados
  const predicciones = [
    { modelo: 1, top3: top3Modelo1, tiempo: tiempo1 },
    { modelo: 2, top3: top3Modelo2, tiempo: tiempo2 },
    { modelo: 3, top3: top3Modelo3, tiempo: tiempo3 },
    { modelo: 4, top3: top3Modelo4, tiempo: tiempo4 }
  ];

  // Disparar un evento personalizado con los resultados
  const evento = new CustomEvent('actualizarPredicciones', {
    detail: predicciones
  });
  document.dispatchEvent(evento);
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
