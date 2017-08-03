
var canvas;

$(document).ready(function(){

  if ($("body.designs.edit").length){
  console.log(elements);
  console.log('length', elements.length);

  for (var i = 0; i < elements.length; i++) {
    var e = elements[i];
    console.log('element: ', e);

    var src = "http://res.cloudinary.com/michelleerica/image/upload/v1501323957/"+ e.flourish.name +".png";

    var flourish = fabric.Image.fromURL(src, function(showImg){
      // used .bind(e) to set the value of 'this'
      showImg.setLeft(this.left); console.log('this.left', this.left);
      showImg.setTop(this.top);
      showImg.setAngle(this.angle);
      showImg.setScaleX(this.scaleX);
      showImg.setScaleY(this.scaleY);
      showImg.id = this.flourish.id;

      canvas.add(showImg);
      console.log('ON', i);

    }.bind(e), {crossOrigin: 'Anonymous'})

  }

  } //edit only
}); // end of document ready
