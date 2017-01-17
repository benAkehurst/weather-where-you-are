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

              backgroundColor(temp);

            }
        }); //End of ajax call to get weather

        }, 

        "jsonp"); // End of IP Adress Pull
  
  }); //jQuery Self Ivoked

  function backgroundColor(temp){
    switch (temp <= 100){
      case temp < 0: document.body.style.backgroundColor = "#0049bf";
        break;
      case temp < 10: document.body.style.backgroundColor = "#4586ef";;
        break;
      case temp < 20: document.body.style.backgroundColor = "#76e8fc";;
        break;
      case temp < 30: document.body.style.backgroundColor = "#efe745";;
        break;
      case temp < 40: document.body.style.backgroundColor = "#efae45";;
        break;
      case temp < 50: document.body.style.backgroundColor = "#ef6445";;
        break;
      case temp < 60: document.body.style.backgroundColor = "#ff1e1e";;
        break;
      case temp < 99: document.body.style.backgroundColor = "#ff1e1e";;
        break;
    }
  }
    
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