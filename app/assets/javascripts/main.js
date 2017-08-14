var design_id = null;

var canvas;

$(document).ready(function(){

if ($("body.designs.new").length ||
    $("body.designs.edit").length) {

  //------------ create canvas ------------ //

  canvas = new fabric.Canvas('mainCanvas', { selection: false, backgroundColor: "#FFF4F4" });
  var grid = 25;


 //------------ create grid ------------ //

  for (var i = 0; i < (1000 / grid); i++) {
    canvas.add(new fabric.Line([ i * grid, 0, i * grid, 1000], { stroke: '#ccc', selectable: false}));
    canvas.add(new fabric.Line([ 0, i * grid, 1000, i * grid], { stroke: '#ccc', selectable: false }))
  }


  //------------ snap to grid ------------ //
  // snap to grid (position # is rounded so flourishes are aligned on screen)
  canvas.on('object:moving', function(options) {
    options.target.set({
      left: Math.round(options.target.left / grid) * grid,
      top: Math.round(options.target.top / grid) * grid
    });
  });

  //------------ click events for moving images (used to get location info - can delete upon finalisation but CHECK FIRST) ------------ //
  var moveHandler = function (evt) {
    var movingObject = evt.target;
    if (movingObject === null) {
      return
    };
    console.log(movingObject, 'move handler: left: ',  movingObject.get('left'), 'top: ', movingObject.get('top'), 'scaleY: ',movingObject.get('scaleY'), 'scaleX: ', movingObject.get('scaleX'), 'angle: ', movingObject.get('angle'), 'aCoords: ', movingObject.get('aCoords'), 'object: ', movingObject.get('_element').id, 'object: ', movingObject.get('_element'));
    // debugger;
  };

  var customEvtHandler = function (evt) {
      console.log("I was triggered by a custom event.");
  };

  canvas.on({
      'mouse:up' : moveHandler

  });

  //------------ add text ------------ //

  // adding text
  // var text = new fabric.Text('Text inside canvas', {
  //   left: 40,
  //   top: 50
  // });
  // text.hasRotatingPoint = true;
  // canvas.add(text);


  // //------------ draw circle ------------ //
  // $("#b").click(function(){
  //
  //     var circle = new fabric.Circle({
  //       radius: 20, fill: 'green', left: 100, top: 100
  //     });
  //
  //     canvas.add(circle);
  //
  // 	});

    //------------ save canvas as jpeg ------------ //

  $("#saveDesktopButton").click(function(){
  	$("#mainCanvas").get(0).toBlob(function(blob){
  		saveAs(blob, "myIMG.jpeg");
  	});
  });

  //------------ click event for flourishes ------------ //
  // when flourish clicked, flourish added to canvas at 0.3 of full size. flourish_id passed through to image when rendered so flourish_id of element is saved to DB and used for re-render.
  $(".flourish").click(function(){
    var flourish_id = event.target.id;
    var public_id = event.target.getAttribute('public_id');

    console.log('ev', event.target, event.target.getAttribute('public_id'));

    var src = "http://res.cloudinary.com/michelleerica/image/upload/v1501323957/" + public_id + ".png";

    fabric.Image.fromURL(src, function(oImg){
      oImg.scale(.3);
      oImg.id = flourish_id;
      canvas.add(oImg);
    }, {crossOrigin: 'Anonymous'});
	});

  // ------------ delete element from canvas ------------ //

  $("#delete").click(function(){
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
  }


  // -------- user warning before navigating away --------/

  $('.warn').click(function(){
    if (confirm('Make sure you save before you go, otherwise your changes will be lost')){
      return true;

    } else {
      return false;
    }
  })
} // new / edit

}); // end of document ready
