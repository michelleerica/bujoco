
// var canvas;

$(document).ready(function(){


  var canvas = new fabric.Canvas('c', { selection: false });
  var grid = 25;

// create grid

for (var i = 0; i < (1000 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 1000], { stroke: '#ccc', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 1000, i * grid], { stroke: '#ccc', selectable: false }))
}
 //  // BACKGROUND IMAGE DOT PAPER
 //
 //  var canvas = window._canvas = new fabric.Canvas('c');
 //
 //  //
 // canvas.setBackgroundImage("../dotpaper.jpg", canvas.renderAll.bind(canvas), {
 //  //     backgroundImageOpacity: 0.5,
 //  //     backgroundImageStretch: false
 //  // });


    // create a wrapper around native canvas element (with id="c")
  // var canvas = new fabric.Canvas('c');

  // create a rectangle object
  var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20,
  angle: 45


  });

  // "add" rectangle onto canvas
  canvas.add(rect);
  rect.set({ left: 20, top: 50 });
  canvas.renderAll();


  // var circle = new fabric.Circle({
  //   radius: 20, fill: 'green', left: 100, top: 100
  // });
  // var triangle = new fabric.Triangle({
  //   width: 20, height: 30, fill: 'blue', left: 50, top: 50
  // });




  $("#b").click(function(){
  	// $("#c").get(0).toBlob(function(blob){
  		// saveAs(blob, "myIMG.png");
      var circle = new fabric.Circle({
        radius: 20, fill: 'green', left: 100, top: 100
      });

      canvas.add(circle);

  	});


  $("#e").click(function(){
  	$("#c").get(0).toBlob(function(blob){
  		saveAs(blob, "myIMG.jpeg");


  	});
  });
  $("#heart").click(function(){
  	// $("#c").get(0).toBlob(function(blob){
  		// saveAs(blob, "myIMG.png");

      // var triangle = new fabric.Triangle({
      //   width: 20, height: 30, fill: 'blue', left: 50, top: 50
      // });
      // canvas.add(triangle);

      var imgElement = document.getElementById('heart');
      var imgInstance = new fabric.Image(imgElement,{
        left: 100,
        top: 100,
        width: 20,
        height: 20

      });
      canvas.add(imgInstance)

  	});
  $("#calendarBox").click(function(){
  	// $("#c").get(0).toBlob(function(blob){
  		// saveAs(blob, "myIMG.png");

      // var triangle = new fabric.Triangle({
      //   width: 20, height: 30, fill: 'blue', left: 50, top: 50
      // });
      // canvas.add(triangle);

      var imgElement = document.getElementById('calendarBox');
      var imgInstance = new fabric.Image(imgElement,{
        left: 100,
        top: 100,
        width: 130,
        height: 150

      });
      canvas.add(imgInstance)

  	});
  $("#box").click(function(){
  	// $("#c").get(0).toBlob(function(blob){
  		// saveAs(blob, "myIMG.png");

      // var triangle = new fabric.Triangle({
      //   width: 20, height: 30, fill: 'blue', left: 50, top: 50
      // });
      // canvas.add(triangle);

      var imgElement = document.getElementById('box');
      var imgInstance = new fabric.Image(imgElement,{
        left: 100,
        top: 100,
        width: 130,
        height: 150

      });
      canvas.add(imgInstance)

  	});
  // });
  //
  // $( h1 ).click(function() {
  //   alert( "Handler for .click() called." );
  // });

  // snap to grid

canvas.on('object:moving', function(options) {
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});
}); // end of document ready
