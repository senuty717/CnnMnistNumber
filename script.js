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

  // Medir tiempo total de predicción
  console.time("Tiempo total");
  
  // Crear un objeto para almacenar resultados y tiempos
  let prediccionesConTiempos = {
    modelo1: { tiempo: 0, prediccion: null, probabilidades: null, imagen: arr, tensor: tensor4.shape },
    modelo2: { tiempo: 0, prediccion: null, probabilidades: null, imagen: arr, tensor: tensor4.shape },
    modelo3: { tiempo: 0, prediccion: null, probabilidades: null, imagen: arr, tensor: tensor4.shape },
    modelo4: { tiempo: 0, prediccion: null, probabilidades: null, imagen: arr, tensor: tensor4.shape }
  };

  // Predicción modelo 1
  console.time("Tiempo modelo 1");
  var resultados = modelo.predict(tensor4).dataSync();
  console.timeEnd("Tiempo modelo 1");
  var mayorIndice1 = resultados.indexOf(Math.max.apply(null, resultados));
  prediccionesConTiempos.modelo1.tiempo = performance.now(); // Tiempo para el modelo 1
  prediccionesConTiempos.modelo1.prediccion = mayorIndice1;
  prediccionesConTiempos.modelo1.probabilidades = resultados;

  // Predicción para el modelo 2
  console.time("Tiempo modelo 2");
  var resultados2 = modelo2.predict(tensor4).dataSync();
  console.timeEnd("Tiempo modelo 2");
  var mayorIndice2 = resultados2.indexOf(Math.max.apply(null, resultados2));
  prediccionesConTiempos.modelo2.tiempo = performance.now(); // Tiempo para el modelo 2
  prediccionesConTiempos.modelo2.prediccion = mayorIndice2;
  prediccionesConTiempos.modelo2.probabilidades = resultados2;

  // Predicción para el modelo 3
  console.time("Tiempo modelo 3");
  var resultados3 = modelo3.predict(tensor4).dataSync();
  console.timeEnd("Tiempo modelo 3");
  var mayorIndice3 = resultados3.indexOf(Math.max.apply(null, resultados3));
  prediccionesConTiempos.modelo3.tiempo = performance.now(); // Tiempo para el modelo 3
  prediccionesConTiempos.modelo3.prediccion = mayorIndice3;
  prediccionesConTiempos.modelo3.probabilidades = resultados3;

  // Predicción para el modelo 4
  console.time("Tiempo modelo 4");
  var resultados4 = modelo4.predict(tensor4).dataSync();
  console.timeEnd("Tiempo modelo 4");
  var mayorIndice4 = resultados4.indexOf(Math.max.apply(null, resultados4));
  prediccionesConTiempos.modelo4.tiempo = performance.now(); // Tiempo para el modelo 4
  prediccionesConTiempos.modelo4.prediccion = mayorIndice4;
  prediccionesConTiempos.modelo4.probabilidades = resultados4;

  console.timeEnd("Tiempo total");

  // Crear el objeto completo para el evento con tiempos y detalles
  const predicciones = {
    prediccionesConTiempos: prediccionesConTiempos,
    tensorDetails: {
      shape: tensor4.shape,
      dtype: tensor4.dtype
    }
  };

  // Disparar un evento personalizado con los resultados
  const evento = new CustomEvent('actualizarPredicciones', {
    detail: predicciones  // Los detalles del evento contienen las predicciones, tiempos y detalles del tensor
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
