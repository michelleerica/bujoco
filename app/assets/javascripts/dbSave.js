var design_id = null;

$(document).ready(function(){

  //------------ identify what is on canvas and save positions to Elements DB ------------

  $("#saveDBButton").click(function(){
//
    // ------ function obtaining info for initial save -----//
    if (designData.id === null && design_id === null){

      // ------ reminder to provide design name  -----//

      if ($('#setDesignName').val() === ""){
        $('#saveStatus').text('Please name your design');
        return;
      }

      var elements = canvas.getObjects();
      console.log(elements);


      var elems = [];

      for (var i = 80; i < elements.length; i++) {
        var left = elements[i].get('left');
        var top = elements[i].get('top');
        var angle = elements[i].get('angle');
        var scaleX = elements[i].get('scaleX');
        var scaleY = elements[i].get('scaleY');
        var flipX = elements[i].get('flipX');
        var flipY = elements[i].get('flipY');
        var flourish_id = elements[i].get('id');
        var elementInfo = {
          left: left,
          top: top,
          angle: angle,
          scaleX: scaleX,
          scaleY: scaleY,
          flipX: flipX,
          flipY: flipY,
          flourish_id: flourish_id
        };

        elems.push(elementInfo);
      }
      // console.log(elems);
      if (elems === null){
        $('#saveStatus').text('There is nothing to save');
        return;
      }
      saveElementData(elems)


    } else {
      // ------ function obtaining info for subsequent saves -----//

      var elements = canvas.getObjects();
      // console.log(elements);

      var elems = [];

      for (var i = 80; i < elements.length; i++) {
        var left = elements[i].get('left');
        var top = elements[i].get('top');
        var angle = elements[i].get('angle');
        var scaleX = elements[i].get('scaleX');
        var scaleY = elements[i].get('scaleY');
        var flipX = elements[i].get('flipX');
        var flipY = elements[i].get('flipY');
        var flourish_id = elements[i].get('id');
        var elementInfo = {
          left: left,
          top: top,
          angle: angle,
          scaleX: scaleX,
          scaleY: scaleY,
          flipX: flipX,
          flipY: flipY,
          flourish_id: flourish_id
        };

        elems.push(elementInfo);
      }
      // console.log(elems);
      if (elems ===null){
        $('#saveStatus').text('There is nothing to save');
        return;
      }
      updateElementData(elems)
    }
  });

  //----- function called on initial save ----//
  var saveElementData = function(info){
    console.log('IN SAVE ELEMENT DATA FUNCTION: element info:', info);

    var data = {
      name: $('#setDesignName').val(),
      elements: info
    };

    // if on edit page, design will have designData.id (provided as raw JSON)
    if (designData.id !== null){
      data.design_id = designData.id;
    }

    $.ajax({
      url: "/designs",
      data: data,
      dataType: 'json',
      method: 'POST'
    }).done(function(data){
      // debugger;
      console.log('DATA in ajax', data);
      $('#saveStatus').text('Your changes have been saved!');
      $('#designName').text(designData.name);


      // save design_id in a global variable,
      // and send it with all future requests
      // to prevent a new design being created each
      // time we save the elements
      design_id = data.id;
      $('#designId').text(design_id);

    }).fail(function(xhr, err, status) {
      console.log(xhr, err, status);
    });
  }; // saveElementData

  // function called on subsaq saves to save updated info to DB so element positions tracked
  var updateElementData = function(info){
    console.log('UPDATE ELEMENT element info:', info);
    // debugger;
    var data = {
      name: $('#setDesignName').val(),
      elements: info,
      design_id: designData.id // todo
    };

    //need to get design from params
    var url = "";

    if (data.design_id !== null) {
      url = "/designs/"+data.design_id
    } else {
      url = design_id
    };

    $.ajax({
      url: url,
      data: data,
      dataType: 'json',
      method: 'PUT'
    }).done(function(data){
      // debugger;
      console.log('DATA in ajax', data);
      $('#saveStatus').text('Your changes have been saved!');
      // save design_id in a global variable,
      // and send it with all future requests
      // to prevent a new design being created each
      // time we save the elements
      // design_id = data.id;

    }).fail(function(xhr, err, status) {
          console.log(xhr, err, status);
    });

  }
})
