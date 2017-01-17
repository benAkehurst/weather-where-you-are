(function(){

  "use setrict";

  $(function(){
        
      $.get("http://ipinfo.io/", function(response) {

        var city = response.city;
        console.log(city);
        if (city == "Shikun `amalya"){
        var city = "Tel Aviv";
        }
        console.log(city);

        var country = response.country;

        $("#spanLocation").text(city);

          $.ajax({
            type: "GET",
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=6b67e72940c793295a415e3834fa7d85&units=metric',
            error: function (err) {alert("Error: " + err.status + ", " + err.statusText);},
            success: function (response) {        
              
              var arr = response;
              var temp = parseInt(arr.main.temp);
              var conditions = arr.weather[0].description;
              var conditionsCapitalLetter = capitalizeFirstLetter(conditions);

              var tempToF = convertToF(temp);

              $("#spanTempC").text(temp + ascii(176) + "C");
              $("#spanTempF").text(tempToF + ascii(176) + "F");


              $("#buttonF").click(function() {
                $("#spanTempF").show();
                $("#spanTempC").hide();
              });

              $("#buttonC").click(function() {
                $("#spanTempF").hide();
                $("#spanTempC").show();
              });

              $("#spanConditions").text(conditionsCapitalLetter);

            }
        }); //End of ajax call to get weather

        }, 

        "jsonp"); // End of IP Adress Pull
  
  }); //jQuery Self Ivoked

    
  function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function ascii(a){ 
    return String.fromCharCode(a); 
  }

  function convertToF(temp) {
        var fTempVal = parseInt((temp * (9 / 5))) + 32;
        console.log(fTempVal);
        return fTempVal;
  }

})(); // JS self Invoked