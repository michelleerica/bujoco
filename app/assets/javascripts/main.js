
var design_id = null;

var canvas;

$(document).ready(function(){

  //------------ create canvas ------------ //
if ($("body.designs.new").length ||
    $("body.designs.edit").length) {
  canvas = new fabric.Canvas('mainCanvas', { selection: false, backgroundColor: "#FFF4F4" });
  var grid = 25;

  //------------ click events for moving images (used to get location info - can delete upon finalisation but CHECK FIRST) ------------ //
  var moveHandler = function (evt) {
    var movingObject = evt.target;
    if (movingObject === null) {
      return
    };
    console.log(movingObject, 'move handler: left: ',  movingObject.get('left'), 'top: ', movingObject.get('top'), 'scaleY: ',movingObject.get('scaleY'), 'scaleX: ', movingObject.get('scaleX'), 'angle: ', movingObject.get('angle'), 'aCoords: ', movingObject.get('aCoords'), 'object: ', movingObject.get('_element').id, 'object: ', movingObject.get('_element'));
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
    canvas.add(new fabric.Line([ i * grid, 0, i * grid, 1000], { stroke: '#ccc', selectable: false}));
    canvas.add(new fabric.Line([ 0, i * grid, 1000, i * grid], { stroke: '#ccc', selectable: false }))
  }

  //------------ add text ------------ //

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

    //------------ save canvas as jpeg ------------ //

  $("#saveDesktopButton").click(function(){
  	$("#mainCanvas").get(0).toBlob(function(blob){
  		saveAs(blob, "myIMG.jpeg");
  	});
  });

  // // ------ image upload to cloudinary -------//
  //
  // var info = "";
  //
  // $("#saveClButton").click(function(){
  //   $("#mainCanvas").get(0).toBlob(function(blob){
  //     $('#image_upload').unsigned_cloudinary_upload("test123",
  //       { cloud_name: 'michelleerica', tags: 'browser_uploads', backup: true },
  //            { multiple: true }
  //     )
  //       .bind('cloudinarydone', function(e, data) {
  //            console.log('DONE!', data);
  //            // ajax send to rails server: data.result.public_id
  //            public_id = data.result.public_id
  //
  //            debugger;
  //           saveClData(public_id);
  //          })
  //          .fileupload('add', { files: [ blob ] });
  //        });
  //
  // })
  //   //  ------ save cloudinary data to DB ------- //
  //
  // var saveClData = function(image){
  //   var data = {
  //     image: image,
  //   };
  //   // debugger;
  //
  //   if (design_id){
  //     data.design_id = design_id;
  //   } else if (designData.id !== null){
  //     data.design_id = designData.id
  //   }
  //
  //   console.log('line 115: ', image, 'id: ', design_id);
  //
  //   $.ajax({
  //     url: "/designs/cloudinary",
  //     data: data,
  //     dataType: 'json',
  //     method: 'POST'
  //   }).done(function(data){
  //     // debugger;
  //     console.log('DATA in ajax', data);
  //     $('#saveStatus').text('CLOUDINARY SAVE successful')
  //     // design_id = data.id;
  //     console.log('design_id', design_id,'data.id', data.id);
  //     canvas.deactivateAll();
  //     canvas.selection = false;
  //     canvas.forEachObject(function(o) {
  //         o.selectable = false;
  //     });
  //     $('#flourishes').click(false);
  //
  //   }).fail(function(xhr, err, status) {
  //         console.log(xhr, err, status);
  //   });
  //
  // }; //ajax request

  //------------ click event for flourishes ------------ //
  // when flourish clicked, flourish added to canvas
  $(".flourishes").click(function(){
    // debugger;
      var flourish_id = event.target.id;
      var public_id = event.target.getAttribute('public_id');
      // debugger;
      var src = "http://res.cloudinary.com/michelleerica/image/upload/v1501323957/" + public_id + ".png";

      fabric.Image.fromURL(src, function(oImg){
        oImg.scale(.2);
        oImg.id = flourish_id;
        canvas.add(oImg);
      }, {crossOrigin: 'Anonymous'});
	});

    // ------------ delete element from canvas ------------ //

  $("#delete").click(function(){
    canvas.isDrawingMode = false;
    deleteObjects();
  });

  var deleteObjects = function(){
  	var activeObject = canvas.getActiveObject(),
      activeGroup = canvas.getActiveGroup();
      console.log('TO DELETE');
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

} // new / edit

}); // end of document ready
