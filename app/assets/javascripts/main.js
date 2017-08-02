
var design_id = null;


var canvas;

$(document).ready(function(){

  //------------ create canvas ------------ //
if ($("body.designs.new").length ||
    $("body.designs.edit").length ||
    $("body.designs.show").length) {
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

  // ------ image upload to cloudinary -------//

  var info = "";

  $("#saveClButton").click(function(){
    $("#mainCanvas").get(0).toBlob(function(blob){
      $('#image_upload').unsigned_cloudinary_upload("test123",
        { cloud_name: 'michelleerica', tags: 'browser_uploads', backup: true },
             { multiple: true }
      )
        .bind('cloudinarydone', function(e, data) {
             console.log('DONE!', data);
             // ajax send to rails server: data.result.public_id
             public_id = data.result.public_id

             debugger;
            saveClData(public_id);
           })
           .fileupload('add', { files: [ blob ] });
         });

    })
    //  ------ save cloudinary data to DB ------- //

  var saveClData = function(image){
    var data = {
      image: image,
    };
    // debugger;
    if (design_id){
      data.design_id = design_id;
    }
    console.log('line 115: ', image, 'id: ', design_id);


    $.ajax({
      url: "/designs/cloudinary",
      data: data,
      dataType: 'json',
      method: 'POST'
    }).done(function(data){
      // debugger;
      console.log('DATA in ajax', data);
      $('#saveStatus').text('CLOUDINARY SAVE successful')
      design_id = data.id;
      console.log('design_id', design_id,'data.id', data.id);


    }).fail(function(xhr, err, status) {
          console.log(xhr, err, status);
    });

  }; //ajax request

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

    //------------ delete element from canvas ------------ //

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


  //------------ identify whats on canvas and save ------------ //

  $("#saveDBButton").click(function(){

    var elements = canvas.getObjects();
    console.log(elements);

    var elems = [];

    for (var i = 80; i < elements.length; i++) {
      var left = elements[i].get('left');
      var top = elements[i].get('top');

      var angle = elements[i].get('angle');
      var scaleX = elements[i].get('scaleX');
      var scaleY = elements[i].get('scaleY');
      var flourish_id = elements[i].get('id');
      console.log('scaleX', scaleX, 'scaleY', scaleY);
      var elementInfo = {
        left: left,
        top: top,
        angle: angle,
        scaleX: scaleX,
        scaleY: scaleY,
        flourish_id: flourish_id
      };

      elems.push(elementInfo);
    }
    console.log(elems);
    saveElementData(elems)

	});

  var saveElementData = function(info){
    console.log('element info:', info);

    var data = {
      name: $('#designName').val(),
      elements: info
    };
    // debugger;
    if( design_id ){
      // debugger;
      data.design_id = design_id;
    }

    $.ajax({
      url: "/designs",
      data: data,
      dataType: 'json',
      method: 'POST'
    }).done(function(data){
      // debugger;
      console.log('DATA in ajax', data);
      $('#saveStatus').text('DB save worked');


      // save design_id in a global variable,
      // and send it with all future requests
      // to prevent a new design being created each
      // time we save the elements
      design_id = data.id;
      $('#designId').text(design_id);

    }).fail(function(xhr, err, status) {
          console.log(xhr, err, status);
    });

  }


} //designs new

if ($("body.designs.show").length ||
    $("body.designs.edit"))
    {
  //---------------------design show page---------------------//
  console.log('working??');

    // debugger;

    //rebuild existing design with element as saved in DB
    //use elements details (e.g. img, width, height etc) hidden on design show page in flourish div and add to canvas
  // var $imgElementShow =$('.flourish');
  //
  //   //flourish div created on show page as part of a loop. Number of flourish divs indicate how many elements there are to display

  console.log(elements);
  console.log('length', elements.length);

  for (var i = 0; i < elements.length; i++) {
    let e = elements[i];
    console.log('element: ', e);

    var src = "http://res.cloudinary.com/michelleerica/image/upload/v1501323957/"+ e.flourish.name +".png";

    var flourish = fabric.Image.fromURL(src, function(showImg){
      // debugger;
      showImg.setLeft(e.left); console.log('e.left', e.left);
      showImg.setTop(e.top);
      showImg.setAngle(e.angle);
      showImg.setScaleX(e.scaleX);
      showImg.setScaleY(e.scaleY);
      showImg.id = e.flourish.id;

      canvas.add(showImg);
      console.log('ON', i);

    }, {crossOrigin: 'Anonymous'})

  }


  //------------ identify whats on canvas and update DB ------------ //

  $("#updateDBButton").click(function(){

    var elements = canvas.getObjects();
    console.log(elements);

    var elems = [];

    for (var i = 80; i < elements.length; i++) {
      var left = elements[i].get('left');
      var top = elements[i].get('top');

      var angle = elements[i].get('angle');
      var scaleX = elements[i].get('scaleX');
      var scaleY = elements[i].get('scaleY');
      var flourish_id = elements[i].get('id');
      console.log('scaleX', scaleX, 'scaleY', scaleY);
      var elementInfo = {
        left: left,
        top: top,
        angle: angle,
        scaleX: scaleX,
        scaleY: scaleY,
        flourish_id: flourish_id
      };

      elems.push(elementInfo);
    }
    console.log(elems);
    updateElementData(elems)

  });

  var updateElementData = function(info){
    console.log('element info:', info);
    // debugger;
    var data = {
      name: $('#designName').val(),
      elements: info,
      design_id:$('#designId')[0].innerHTML
    };

    //need to get design from params
    var url = "";

    if (data.design_id !== null) {
      url = "/designs/"+data.design_id
    } else {
      url = design_id
    };

    // debugger;

    $.ajax({
      url: url,
      data: data,
      dataType: 'json',
      method: 'PUT'
    }).done(function(data){
      // debugger;
      console.log('DATA in ajax', data);
      $('#saveStatus').text('DB save worked');

      // save design_id in a global variable,
      // and send it with all future requests
      // to prevent a new design being created each
      // time we save the elements
      // design_id = data.id;

    }).fail(function(xhr, err, status) {
          console.log(xhr, err, status);
    });

  }



}; //design#show page

}); // end of document ready
