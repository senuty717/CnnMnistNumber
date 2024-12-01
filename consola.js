// Función para mostrar los datos en la consola solo si el usuario es administrador
function mostrarDatosConsola(datos) {
  // Verificamos si el usuario tiene el rol de administrador
  const rol = localStorage.getItem("rol"); // Se obtiene el rol desde localStorage

  // Si el rol no es 'admin', mostramos un mensaje de acceso restringido y salimos de la función
  if (rol !== 'admin') {
    console.log("Acceso restringido a la consola.");
    return;  // Si el rol no es admin, no continuamos con la visualización de los datos
  }

  // Obtenemos el contenedor de los datos en la consola
  const contenedorDatos = document.getElementById('datos-consola');
  
  // Limpiamos cualquier dato previo en el contenedor de la consola
  contenedorDatos.innerHTML = '';

  // Verificamos si los datos recibidos son un array
  if (Array.isArray(datos)) {
    // Iteramos sobre cada dato en el array
    datos.forEach(function(dato) {
      const p = document.createElement('p');  // Creamos un nuevo elemento de párrafo para cada dato
       
      // Verificamos que el dato tenga un campo 'tiempo' válido (es un número)
      if (typeof dato.tiempo === 'number' && !isNaN(dato.tiempo)) {
        // Si el tiempo es un número válido, lo formateamos a dos decimales
        dato.tiempo = dato.tiempo.toFixed(2) + ' ms';
      } else {
        // Si no es un número válido, asignamos un valor por defecto
        dato.tiempo = 'Tiempo no disponible';
      }
      
      // Asignamos el texto a mostrar en el párrafo con la información del modelo, índice y tiempo
      p.textContent = `Modelo ${dato.modelo}: Predicción ${dato.indice}, Tiempo: ${dato.tiempo}`;
      
      // Añadimos el párrafo al contenedor de datos
      contenedorDatos.appendChild(p);
    });
  } else {
    // Si los datos no son un array (es decir, es un solo mensaje), lo mostramos directamente
    const p = document.createElement('p');  // Creamos un nuevo párrafo
    p.textContent = datos;  // Asignamos el texto del mensaje
    contenedorDatos.appendChild(p);  // Añadimos el párrafo al contenedor
  }
}

// Función para actualizar la consola con los resultados de las predicciones
function actualizarConsola(predicciones) {
  // Creamos un array con los resultados de las predicciones, mapeando cada predicción
  const datosConsola = predicciones.map((pred) => {
    return {
      indice: pred.indice,    // Incluimos el índice de la predicción
      tiempo: pred.tiempo,    // Incluimos el tiempo de la predicción
      modelo: pred.modelo     // Incluimos el nombre del modelo
    };
  });

  // Llamamos a la función para mostrar los datos de la consola con el array generado
  mostrarDatosConsola(datosConsola);
}

// Escuchamos el evento personalizado 'actualizarPredicciones' que contiene los resultados de las predicciones
document.addEventListener('actualizarPredicciones', function(event) {
  const predicciones = event.detail;  // Extraemos los datos de las predicciones desde el evento
  actualizarConsola(predicciones);  // Llamamos a la función para actualizar la consola con las predicciones
});
