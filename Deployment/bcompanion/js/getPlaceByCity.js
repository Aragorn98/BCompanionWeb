function getPlaceByCity(param1) {
    $cityIndex = param1;
    $cityName = "empty";

    var $page = $('#page');
    $.ajax({
      type: 'GET',
      url: 'https://stormy-escarpment-89406.herokuapp.com/cities',
      beforeSend: function(){
      },  
      success: function (data) {
        $.each(data, function (index, item) {
          if ($cityIndex === index){
            $cityName = item.cityName;
          } else return;
        });
      },
      complete:function(data){
        $.ajax({
  
            type: 'GET',
            url: 'https://stormy-escarpment-89406.herokuapp.com/places/byCity?city_name=' +
            $cityName,
            beforeSend: function(){
              // Show image container
              $(".loader").fadeIn();
            },  
            success: function (data) {
              $.each(data, function (index, item) {
                $page.append(
                  "<div class='demo-card-square mdl-card mdl-shadow--2dp places'>" +
                  "<div class='mdl-card__title mdl-card--expand' style='background:" +
                  "url(" + decodeURIComponent(item.placePhoto) +
                  ") bottom right 15% no-repeat #46B6AC;'>" +
                  "<h2 class='mdl-card__title-text'>" + item.placeName + "</h2>" +
                  "</div>" +
                  "<div class='mdl-card__supporting-text'></div>" +
                  "<div class='mdl-card__actions mdl-card--border'>" +
                  "<button onClick='getPlaceByCity("+index+")' class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' id='" +
                  + index + "'>" +
                  "	  Выбрать" +
                  "	</button></div></div>"
                  );
              });
            },
            complete:function(data){
              // Hide image container
              $(".loader").hide();
            //   $page.append("<script src='js/getPlaceByCity.js'>"
            //       +"</\script>");
            },
            error: function (error) {
              $("#page").fadeIn();
            }
    
          })
      },
      error: function (error) {
      }

    });
    
}