var design_id = null;

$(document).ready(function(){
  //------------ identify whats on canvas and save ------------ //

  $("#saveDBButton").click(function(){
    // debugger;


    if (designData.id === null && design_id === null){
      debugger;

      if ($('#setDesignName').val() === "" &&
          design_id === null){
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
        var flourish_id = elements[i].get('id');
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
      if (elems ===null){
        $('#saveStatus').text('There is nothing to save');
        return;
      }
      saveElementData(elems)

    } else {
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
      if (elems ===null){
        $('#saveStatus').text('There is nothing to save');
        return;
      }
      updateElementData(elems)
    }
  });

  var saveElementData = function(info){
    console.log('IN SAVE ELEMENT DATA FUNCTION: element info:', info);




    var data = {
      name: $('#setDesignName').val(),
      elements: info
    };
    // debugger;
    // if( design_id ){
    //   // debugger;
    //   data.design_id = design_id;
    // }
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
  }; //click handler

  var updateElementData = function(info){
    console.log('UPDATE ELEMENT element info:', info);
    // debugger;
    var data = {
      name: $('#setDesignName').val(),
      elements: info,
      design_id: designData.id //todo
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
