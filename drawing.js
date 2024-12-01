// Definir el ancho del pincel y el color inicial
var brushWidth = 10;  // Ancho del pincel para el dibujo
var color = "#000000";  // Color del pincel (negro en este caso)
var drawingcanvas;  // Variable que almacenará el objeto del canvas

// Función autoejecutable para configurar el canvas de dibujo
(function () {
  // Función para obtener un elemento del DOM por su ID
  var $ = function (id) { return document.getElementById(id) };

  // Crear un nuevo objeto canvas de Fabric.js y asignarlo a la variable drawingcanvas
  // 'grancanvas' es el ID del elemento canvas en el HTML
  drawingcanvas = this.__canvas = new fabric.Canvas('grancanvas', {
    isDrawingMode: true  // Activar el modo de dibujo
  });

  // Desactivar las esquinas transparentes de los objetos de Fabric
  fabric.Object.prototype.transparentCorners = false;

  // Si el canvas está en modo de dibujo (lo está, por la propiedad isDrawingMode: true)
  if (drawingcanvas.freeDrawingBrush) {
    // Establecer el color del pincel al valor especificado en la variable 'color'
    drawingcanvas.freeDrawingBrush.color = color;
    // Establecer el ancho del pincel al valor especificado en la variable 'brushWidth'
    drawingcanvas.freeDrawingBrush.width = brushWidth;
  }
})();
