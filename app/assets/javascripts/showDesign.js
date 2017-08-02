
var canvas;

$(document).ready(function(){

  if ($("body.designs.edit").length){
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

  } //edit only
}); // end of document ready
