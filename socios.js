$(document).ready(function(){

  var generateHTML = function(myJSON){
    $.getJSON( "json/" + myJSON, function( data ) {
      var html = "";
      var i = 0;
      for(i = 0; i < data.items.length; i++){
        html += "<div class='container row-style margin'><br>"
        html +=  `
                    <div>
                      <img src="` + data.items[i]["img"] + `"class="circle margin-right left margin-top" style="height:75px;width:75px">
                    </div>
                    <div>
                      <h3>`+ data.items[i]["author"] +`</h3>
                      <h5>` + data.items[i]["title"] + `</h5><br>
                    </div>
                    <div id="accordion">
                      <h3><button type="button" class="btn">
                      <i class="fa-angle-double-down" aria-hidden="true"></i>

                      More
                    </button></h3>
                      <div>
                      <p class='hora'> 20/04/2015 13:00 </p>
                      <hr>
                        <p>` + data.items[i]["content"] + `</p>
                      </div>
                    </div>
                  </div>
              </div>`
      }
      $(".col-md-6").append(html);

      $(function(){
        $('#accordion:nth-child(1n)').accordion({
          collapsible: true,
          active: false,
          classes: {
            "ui-state-focus": "white"
          }
        });
      });

    });
  }

  var checkUpdate = function(){
    $.getJSON("json/update.json")
		.done(function(data){
      $(".bell-number").html(data.items.length);
		})
		.fail(function(jqxhr, status, error){
			$(".bell-number").html("0");
		});
  }

  $(".myposts").click(function(){
    checkUpdate();
    $('.col-md-6 div').remove();
    generateHTML("myline.json");
  });

  $(".bell").click(function(){
    $('.col-md-6 div').remove();
    generateHTML("update.json");
    generateHTML("timeline.json");
    $(".bell-number").html("0");
  })

  $(".home").click(function(){
    checkUpdate();
    $('.col-md-6 div').remove();
    generateHTML("timeline.json");
  });


  generateHTML("timeline.json");
  checkUpdate();

});
