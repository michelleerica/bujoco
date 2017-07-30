$(document).ready(function(){

  //------------ create canvas ------------ //

  var canvas = new fabric.Canvas('mainCanvas', { selection: false });
  var grid = 25;

  //------------ click events for moving images (used to get location info - can delete upon finalisation but CHECK FIRST) ------------ //
  var moveHandler = function (evt) {
    var movingObject = evt.target;
    if (movingObject === null) {
      return
    };
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


 //------------ create grid ------------ //

  for (var i = 0; i < (1000 / grid); i++) {
    canvas.add(new fabric.Line([ i * grid, 0, i * grid, 1000], { stroke: '#ccc', selectable: false }));
    canvas.add(new fabric.Line([ 0, i * grid, 1000, i * grid], { stroke: '#ccc', selectable: false }))
  }


  // adding text
  // var text = new fabric.Text('Text inside canvas', {
  //   left: 40,
  //   top: 50
  // });
  // text.hasRotatingPoint = true;
  // canvas.add(text);


  //------------ draw circle ------------ //

  $("#b").click(function(){

      var circle = new fabric.Circle({
        radius: 20, fill: 'green', left: 100, top: 100
      });

      canvas.add(circle);

  	});

    //------------ save canvas  as png ------------ //

  $("#save").click(function(){
  	$("#canvas").get(0).toBlob(function(blob){
  		saveAs(blob, "myIMG.jpeg");
  	});
  });

  //------------ click event for flourishes ------------ //
  // when flourish clicked, flourish added to canvas
  $(".flourishes").click(function(){
    // debugger;
      var imgElement = event.target.id;
      var src = "http://res.cloudinary.com/michelleerica/image/upload/v1501323957/"+imgElement+".png";

      fabric.Image.fromURL(src, function(oImg){
        oImg.scale(.2);
        canvas.add(oImg);
      });

  	});

    //------------ delete element from canvas ------------ //

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

  //------------ snap to grid ------------ //
  // snap to grid (position # is rounded so images are aligned)
  canvas.on('object:moving', function(options) {
    options.target.set({
      left: Math.round(options.target.left / grid) * grid,
      top: Math.round(options.target.top / grid) * grid
    });
  });

  //---------------------design show page---------------------//
    console.log('working??');

    // debugger;

    //rebuild existing design with element as saved in DB
    //use elements details (e.g. img, width, height etc) hidden on design show page in flourish div and add to canvas
  var $imgElementShow =$('.flourish');

    //flourish div created on show page as part of a loop. Number of flourish divs indicate how many elements there are to display
  for (var i = 0; i < $imgElementShow.length; i++) {
    var name = "#name" + i;
    ///may break if there is no space in name.... consider using if statement with a break to resolve

    var src = "http://res.cloudinary.com/michelleerica/image/upload/v1501323957/"+$(name).text()+".png";

    var left = "#left" + i;
    var top = "#top" + i;
    var width = "#width" + i;
    var height = "#height" + i;
    var angle = "#angle" + i;

    fabric.Image.fromURL(src, function(showImg){
      showImg.setLeft(parseInt($(left).text())),
      showImg.setTop(parseInt($(top).text())),
      showImg.setWidth(parseInt($(width).text())),
      showImg.setHeight(parseInt($(height).text())),
      showImg.setAngle(parseInt($(angle).text())),

      canvas.add(showImg);

      })

  } //for loop

}); // end of document ready
