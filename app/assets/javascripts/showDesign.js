
var canvas;

$(document).ready(function(){

// ----------- render canvas and elements (positions and flourish_id as saved to DB ------ //

  if ($("body.designs.edit").length){
    console.log(elements);
    console.log('length', elements.length);
    $('#designName').text(designData.name);

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
        showImg.setFlipX(this.flipX);
        showImg.setFlipY(this.flipY);
        showImg.id = this.flourish.id;

        canvas.add(showImg);
        console.log('ON', i);

      }.bind(e), {crossOrigin: 'Anonymous'})

    }

  } //edit only
}); // end of document ready
