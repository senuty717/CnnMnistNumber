function mostrarDatosConsola(datos) {
  const rol = localStorage.getItem("rol");
  if (rol !== 'admin') {
    console.log("Acceso restringido a la consola.");
    return;
  }

  const contenedorDatos = document.getElementById('datos-consola');
  contenedorDatos.innerHTML = ''; // Limpiar los datos previos

  if (Array.isArray(datos)) {
    datos.forEach(function(dato) {
      const divModelo = document.createElement('div');
      divModelo.classList.add('modelo-consola');

      // Título del modelo
      const titulo = document.createElement('h4');
      titulo.textContent = `Modelo ${dato.modelo}`;
      divModelo.appendChild(titulo);

      // Tiempo de predicción
      const tiempo = document.createElement('p');
      tiempo.textContent = `Tiempo: ${dato.tiempo.toFixed(2)} ms`;
      divModelo.appendChild(tiempo);

      // Top 3 de predicciones
      const top3 = document.createElement('ol'); // Lista ordenada
      dato.top3.forEach((pred) => {
        const li = document.createElement('li');
        li.textContent = `Predicción ${pred.indice}: ${(pred.valor * 100).toFixed(2)}%`;
        top3.appendChild(li);
      });
      divModelo.appendChild(top3);

      // Agregar todo al contenedor principal
      contenedorDatos.appendChild(divModelo);
    });
  } else {
    const mensaje = document.createElement('p');
    mensaje.textContent = datos;
    contenedorDatos.appendChild(mensaje);
  }
}

// Función para actualizar la consola con los resultados de las predicciones
function actualizarConsola(predicciones) {
  // Crear un array con los resultados de las predicciones para cada modelo
  const datosConsola = predicciones.map((pred) => {
    return {
      indice: pred.indice,
      tiempo: pred.tiempo,
      modelo: pred.modelo  // Incluir el modelo
    };
  });

  // Llamar a la función que muestra los datos en consola
  mostrarDatosConsola(datosConsola);
}

// Escuchar el evento personalizado 'actualizarPredicciones'
document.addEventListener('actualizarPredicciones', function(event) {
  const predicciones = event.detail;  // Datos de las predicciones pasados en el evento
  actualizarConsola(predicciones);
});
