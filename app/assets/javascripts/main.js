$(document).ready(function(){
//
  var canvas = new fabric.Canvas('mainCanvas', { selection: false });
  var grid = 25;

  //handler for moving objects on canvas
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


  $("#save").click(function(){
  	$("#canvas").get(0).toBlob(function(blob){
  		saveAs(blob, "myIMG.jpeg");
  	});
  });

  $(".flourishes").click(function(){
    // debugger;
      var imgElement = event.target.id;
      var src = "http://res.cloudinary.com/michelleerica/image/upload/v1501323957/"+imgElement+".png";

      fabric.Image.fromURL(src, function(oImg){
        oImg.scale(.2);
        canvas.add(oImg);
      });

  	});


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



  //---------------------design show page---------------------//
    console.log('working??');

    // debugger;

    //rebuild existing design with element as saved in DB
    //use elements details (e.g. img, width, height etc) hidden on design show page and add to canvas
    var $imgElementShow =$('.flourish');


    for (var i = 0; i < $imgElementShow.length; i++) {
      var name = "#name" + i;
      ///may break if there is no space in name.... consider using if statement with a break to resolve

      //new src bc element hidden is smaller)
      // name = name.split(' ').join('-')
      var src = "http://res.cloudinary.com/michelleerica/image/upload/v1501323957/"+$(name).text()+".png";

      var left = "#left" + i;
      var top = "#top" + i;
      var width = "#width" + i;
      var height = "#height" + i;
      var angle = "#angle" + i;


      fabric.Image.fromURL(src,
        function(showImg){
          showImg.setLeft(parseInt($(left).text())),
          showImg.setTop(parseInt($(top).text())),
          showImg.setWidth(parseInt($(width).text())),
          showImg.setHeight(parseInt($(height).text())),
          showImg.setAngle(parseInt($(angle).text())),

          canvas.add(showImg);

        })
      // })
        // height: 0.476,
        // width: 0.393
        // debugger;

  // debugger;
      // canvas.add(imgInstanceShow);
    // }
    // imgElementShow.width = 0.39276054560317036
    // var left = parseInt($('#left').text());


}
}); // end of document ready
