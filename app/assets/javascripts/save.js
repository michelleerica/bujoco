// var design_id = null;
//
// $(document).ready(function(){
//   //------------ identify whats on canvas and save ------------ //
//   if ($("body.designs.new").length ||
//       $("body.designs.edit").length) {
//         $("#saveDBButton").click(function(){
//
//           var elements = canvas.getObjects();
//           console.log(elements);
//
//           var elems = [];
// 
//           for (var i = 80; i < elements.length; i++) {
//             var left = elements[i].get('left');
//             var top = elements[i].get('top');
//             var angle = elements[i].get('angle');
//             var scaleX = elements[i].get('scaleX');
//             var scaleY = elements[i].get('scaleY');
//             var flourish_id = elements[i].get('id');
//             console.log('scaleX', scaleX, 'scaleY', scaleY);
//             var elementInfo = {
//               left: left,
//               top: top,
//               angle: angle,
//               scaleX: scaleX,
//               scaleY: scaleY,
//               flourish_id: flourish_id
//             };
//
//             elems.push(elementInfo);
//           }
//           console.log(elems);
//           saveElementData(elems)
//
//       	});
//
//           var saveElementData = function(info){
//             console.log('IN SAVE ELEMENT DATA FUNCTION: element info:', info);
//
//             var data = {
//               name: $('#designName').val(),
//               elements: info
//             };
//             // debugger;
//             // if( design_id ){
//             //   // debugger;
//             //   data.design_id = design_id;
//             // }
//             if (design_id){
//               data.design_id = design_id;
//             } else if (designData.id !== null){
//               data.design_id = designData.id
//             }
//
//
//             $.ajax({
//               url: "/designs",
//               data: data,
//               dataType: 'json',
//               method: 'POST'
//             }).done(function(data){
//               // debugger;
//               console.log('DATA in ajax', data);
//               $('#saveStatus').text('DB save worked');
//
//
//               // save design_id in a global variable,
//               // and send it with all future requests
//               // to prevent a new design being created each
//               // time we save the elements
//               design_id = data.id;
//               $('#designId').text(design_id);
//
//             }).fail(function(xhr, err, status) {
//               console.log(xhr, err, status);
//             });
//           };
//
//               //---------------------update and save elements to DB---------------------//
//
//                 // debugger;
//
//                 //rebuild existing design with element as saved in DB
//                 //use elements details (e.g. img, width, height etc) hidden on design show page in flourish div and add to canvas
//               // var $imgElementShow =$('.flourish');
//               //
//               //   //flourish div created on show page as part of a loop. Number of flourish divs indicate how many elements there are to display
//
//               //------------ identify whats on canvas and update DB ------------ //
//           $("#updateDBButton").click(function(){
//             // debugger;
//             var elements = canvas.getObjects();
//             console.log(elements);
//
//             var elems = [];
//
//             for (var i = 80; i < elements.length; i++) {
//               var left = elements[i].get('left');
//               var top = elements[i].get('top');
//
//               var angle = elements[i].get('angle');
//               var scaleX = elements[i].get('scaleX');
//               var scaleY = elements[i].get('scaleY');
//               var flourish_id = elements[i].get('id');
//               console.log('scaleX', scaleX, 'scaleY', scaleY);
//               var elementInfo = {
//                 left: left,
//                 top: top,
//                 angle: angle,
//                 scaleX: scaleX,
//                 scaleY: scaleY,
//                 flourish_id: flourish_id
//               };
//
//               elems.push(elementInfo);
//             }
//             console.log(elems);
//             updateElementData(elems)
//
//           });
//
//           var updateElementData = function(info){
//             console.log('UPDATE ELEMENT element info:', info);
//             // debugger;
//             var data = {
//               name: $('#designName').val(),
//               elements: info,
//               design_id:designData.id
//             };
//
//             //need to get design from params
//             var url = "";
//
//             if (design_id){
//                   data.design_id = design_id;
//                 } else if (designData.id !== null){
//                   data.design_id = designData.id
//                 }
//
//
//             // debugger;
//
//             $.ajax({
//               url: url,
//               data: data,
//               dataType: 'json',
//               method: 'PUT'
//             }).done(function(data){
//               // debugger;
//               console.log('DATA in ajax', data);
//               $('#saveStatus').text('DB save worked');
//
//               // save design_id in a global variable,
//               // and send it with all future requests
//               // to prevent a new design being created each
//               // time we save the elements
//               // design_id = data.id;
//
//             }).fail(function(xhr, err, status) {
//                   console.log(xhr, err, status);
//             });
//
//           }
//
//   }
// })
