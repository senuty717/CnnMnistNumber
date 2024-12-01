// Modificar la función para mostrar los top 3 de predicciones
function mostrarDatosConsola(datos) {
  // Verificamos si el usuario es administrador basándonos en el rol directamente
  const rol = localStorage.getItem("rol"); // Suponiendo que se guarda el rol en localStorage

  if (rol !== 'admin') {
    console.log("Acceso restringido a la consola.");
    return;  // Si no es admin, no mostramos la consola
  }

  const contenedorDatos = document.getElementById('datos-consola');
  
  // Limpiamos los datos previos
  contenedorDatos.innerHTML = '';

  // Si los datos son un array de resultados, los mostramos
  if (Array.isArray(datos)) {
    datos.forEach(function(dato) {
      const p = document.createElement('p');

      // Formateamos el tiempo si es válido
      if (typeof dato.tiempo === 'number' && !isNaN(dato.tiempo)) {
        dato.tiempo = dato.tiempo.toFixed(2) + ' ms';
      } else {
        dato.tiempo = 'Tiempo no disponible';
      }

      // Mostrar el modelo, los top 3 y el tiempo
      p.textContent = `Modelo ${dato.modelo}: Tiempo: ${dato.tiempo}`;
      
      // Mostrar el top 3 de predicciones para cada modelo
      const top3Container = document.createElement('ul');
      dato.top3.forEach((pred) => {
        const li = document.createElement('li');
        li.textContent = `Predicción: ${pred.indice} - Probabilidad: ${(pred.valor * 100).toFixed(2)}%`;
        top3Container.appendChild(li);
      });
      p.appendChild(top3Container);

      contenedorDatos.appendChild(p);
    });
  } else {
    // Si es solo un mensaje, lo mostramos
    const p = document.createElement('p');
    p.textContent = datos;
    contenedorDatos.appendChild(p);
  }
}

// Función para actualizar la consola con los resultados de las predicciones
function actualizarConsola(predicciones) {
  // Llamar a la función que muestra los datos en consola
  mostrarDatosConsola(predicciones);
}

// Escuchar el evento personalizado 'actualizarPredicciones'
document.addEventListener('actualizarPredicciones', function(event) {
  const predicciones = event.detail;  // Datos de las predicciones pasados en el evento
  actualizarConsola(predicciones);
});
