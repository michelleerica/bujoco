
var design_id = null;

$(document).ready(function(){

  //------------ create canvas ------------ //
if ($("body.designs.new").length ||
    $("body.designs.edit").length ||
    $("body.designs.show").length) {
  var canvas = new fabric.Canvas('mainCanvas', { selection: false });
  var grid = 25;

  //------------ click events for moving images (used to get location info - can delete upon finalisation but CHECK FIRST) ------------ //
  var moveHandler = function (evt) {
    var movingObject = evt.target;
    if (movingObject === null) {
      return
    };
    console.log('move handler: left: ',  movingObject.get('left'), 'top: ', movingObject.get('top'), 'height: ',movingObject.get('scaleY'), 'width: ', movingObject.get('scaleX'), 'angle: ', movingObject.get('angle'), 'aCoords: ', movingObject.get('aCoords'), 'object: ', movingObject.get('_element').id, 'object: ', movingObject.get('_element'));
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

  $("#save").click(function(){
  	$("#mainCanvas").get(0).toBlob(function(blob){
  		saveAs(blob, "myIMG.jpeg");
  	});
  });

  // ------ image upload to cloudinary -------//

  var public_id = ""
  $("#saveButton").click(function(){
    $("#mainCanvas").get(0).toBlob(function(blob){
      $('#image_upload').unsigned_cloudinary_upload("test123",
        { cloud_name: 'michelleerica', tags: 'browser_uploads' },
             { multiple: false }
      )
        .bind('cloudinarydone', function(e, data) {
             console.log('DONE!', data);
             // ajax send to rails server: data.result.public_id
             public_id = data.result.public_id
            //  debugger;
            console.log('public_id', public_id);
            saveData(public_id);
           })
           .fileupload('add', { files: [ blob ] });
         });
        //  debugger;
        //  saveData(public_id);
    })
    //  ------ save cloudinary data to DB ------- //

  var saveData = function(image){
    var info = image;
    console.log('line 100: ', info);
    $.ajax({
      url: "/designs",
      data: {image: info},
      dataType: 'json',
      method: 'POST'
    }).done(function(data){
      // debugger;
      console.log('DATA in ajax', data);
      $('#saveStatus').text('CLOUDINARY SAVED worked')
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


  //------------ identify whats on canvas ------------ //

  $("#WHAT").click(function(){
  	//  selectAllCanvasObjects();
    // canvas.setActiveGroup(new fabric.Group(canvas.getObjects())).renderAll();
    var elements = canvas.getObjects();
    console.log(elements);

    var l

    var elems = [];

    for (var i = 80; i < elements.length; i++) {
      var left = elements[i].get('left');
      var top = elements[i].get('top');
      var height = elements[i].get('height');
      var width = elements[i].get('width');
      var angle = elements[i].get('angle');
      var flourish_id = elements[i].get('id');

      // var url = elements[i].get('_element').currentSrc;
      // debugger;
      var re = /\/[^\/]+$/
      // var flourish = url.match(re);
      // var flourish = found[0]
      // flourish = flourish[0].replace(/.png/g, '');
      // flourish = flourish.substr(1)
      // debugger;
      console.log('left',left,'top',top);
      var elementInfo = {
        left: left,
        top: top,
        height: height,
        width: width,
        angle: angle,
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
      name: '',  // .val();
      elements: info
    };

    if( design_id ){
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
      $('#saveStatus').text('DB save worked')

      // save design_id in a global variable,
      // and send it with all future requests
      // to prevent a new design being created each
      // time we save the elements
      design_id = data.id;

    }).fail(function(xhr, err, status) {
          console.log(xhr, err, status);
    });

  }

// console.log('move handler: left: ',  movingObject.get('left'), 'top: ', movingObject.get('top'), 'height: ',movingObject.get('scaleY'), 'width: ', movingObject.get('scaleX'), 'angle: ', movingObject.get('angle'), 'aCoords: ', movingObject.get('aCoords'), 'object: ', movingObject.get('_element').id);

} //designs new

if ($("body.designs.show").length) {
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

    }, {crossOrigin: 'Anonymous'})

  } //for loop
} //design#show page

}); // end of document ready
