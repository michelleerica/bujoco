$(document).ready(function(){

  var canvas = new fabric.Canvas('c', { selection: false });
  var grid = 25;

  //handler for moving objects on canvas
  var moveHandler = function (evt) {
    var movingObject = evt.target;
    console.log('move handler: left: ',  movingObject.get('left'), 'top: ', movingObject.get('top'), 'height: ',movingObject.get('scaleY'), 'width: ', movingObject.get('scaleX'), 'angle: ', movingObject.get('angle'), 'aCoords: ', movingObject.get('aCoords'), 'object: ', movingObject.get('_element').id);
    // debugger;
  };

  //handler for done modifying objects on canvas
  var modifiedHandler = function (evt) {
      var modifiedObject = evt.target;
      console.log('modified handler:' +  modifiedObject.get('left'), modifiedObject.get('top'));
  };

  var customEvtHandler = function (evt) {
      console.log("I was triggered by a custom event.");
  };

  canvas.on({
      'mouse:up' : moveHandler,
      'object:modified' : modifiedHandler,
      // 'custom:event' : customEvtHandler
  });


// create grid

  for (var i = 0; i < (1000 / grid); i++) {
    canvas.add(new fabric.Line([ i * grid, 0, i * grid, 1000], { stroke: '#ccc', selectable: false }));
    canvas.add(new fabric.Line([ 0, i * grid, 1000, i * grid], { stroke: '#ccc', selectable: false }))
  }

  // create a rectangle object
  var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20,
  angle: 45


  });

  // adding text
  // var text = new fabric.Text('Text inside canvas', {
  //   left: 40,
  //   top: 50
  // });
  // text.hasRotatingPoint = true;
  // canvas.add(text);

  // "add" rectangle onto canvas
  canvas.add(rect);
  rect.set({ left: 20, top: 50 });
  canvas.renderAll();



  $("#b").click(function(){

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

  // delete

  $("#delete").click(function(){
    canvas.isDrawingMode = false;
    deleteObjects();
  });

  var deleteObjects = function(){
  	var activeObject = canvas.getActiveObject(),
      activeGroup = canvas.getActiveGroup();
      if (activeObject) {
        if (confirm('Are you sure?')) {
          canvas.remove(activeObject);
        }
      }
      else if (activeGroup) {
        if (confirm('Are you sure?')) {
          var objectsInGroup = activeGroup.getObjects();
          canvas.discardActiveGroup();
          objectsInGroup.forEach(function(object) {
            canvas.remove(object);
          });
        }
      }
  }


  // snap to grid
  canvas.on('object:moving', function(options) {
    options.target.set({
      left: Math.round(options.target.left / grid) * grid,
      top: Math.round(options.target.top / grid) * grid
    });
  });
}); // end of document ready
