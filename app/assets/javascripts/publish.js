
var design_id = null;

var canvas;

$(document).ready(function(){

  if ($("body.designs.new").length ||
      $("body.designs.edit").length) {

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
          } else if (designData.id !== null){
            data.design_id = designData.id
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
            // design_id = data.id;
            console.log('design_id', design_id,'data.id', data.id);
            canvas.deactivateAll();
            canvas.selection = false;
            canvas.forEachObject(function(o) {
                o.selectable = false;
            });
            $('#flourishes').click(false);

            notifySave();

          }).fail(function(xhr, err, status) {
                console.log(xhr, err, status);
          });

        }; //ajax request


    var notifySave = function(){


    }
    // winNotification: function(winner) {
    //   players[ winner ].score++;
    //   $('.cell').css('backgroundColor', '#FDF0D5');
    //   $('.grid').addClass('animated bounce flash');
    //   $("body").css('backgroundColor', '#D81E5B');
    //   $("h1").addClass('notification animated bounce swing rollIn');
    //   $(".scoreboard").addClass('animated swing');
    //   $(players[ winner ].scoreID).html(players[ winner ].score);
    //   if (players[ winner ].number === "billMurray"){
    //     $("h1").html("Bill Murray won!");
    //   } else {
    //     $("h1").html("Player " +  players[ winner ].number  + " won!");
    //   }
    //   gameLogic.gameOver()
    //   return;
    // }
  } // if statement
});
