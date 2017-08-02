
var design_id = null;

var canvas;

$(document).ready(function(){


if ($("body.designs.edit").length ||
    $("body.designs.new"))
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
      design_id:designData.id
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



}; //design#edit page

}); // end of document ready
