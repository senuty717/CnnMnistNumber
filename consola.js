// Consola para manejar las predicciones de cada modelo

// Para cada predicción, muestra el resultado en consola
function mostrarDatosConsola(modelo, resultados, tiempo) {
  // Obtener el índice del valor máximo y el top 3
  const mayorIndice = resultados.indexOf(Math.max.apply(null, resultados));
  const top3 = obtenerTop3(resultados);

  console.log(`Predicción para el modelo ${modelo}`);
  console.log(`Predicción más alta: Clase ${mayorIndice}`);
  console.log("Top 3 Predicciones:", top3);
  console.log(`Tiempo de ejecución: ${tiempo.toFixed(2)} ms`);
  console.log("------------------------------------");
}

// Función auxiliar para obtener el top 3
function obtenerTop3(predicciones) {
  const prediccionesConIndices = Array.from(predicciones).map((valor, indice) => ({ indice, valor }));
  prediccionesConIndices.sort((a, b) => b.valor - a.valor);

  return prediccionesConIndices.slice(0, 3).map(item => ({
    clase: item.indice,
    confianza: (item.valor * 100).toFixed(2) + "%",
  }));
}
