(function(){

  "use setrict";

  $(function(){
      
      // This get call uses an API that gets the users IP address and returns the location of the user
      $.get("http://ipinfo.io/", function(response) {

        var city = response.city;
        
        if (city == "Shikun `amalya"){
          var city = "Rosh Ha'Aiyn";
        }
        
        var country = response.country;

        $("#spanLocation").text(city);

          // We then use AJAX to call the open weather map API to get the weather conditions in the users city
          $.ajax({
            type: "GET",
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=6b67e72940c793295a415e3834fa7d85&units=metric',
            error: function (err) {

              // If the API call to the weather fails, then the page displays an error
              $("#divSuccessScreen").hide();
              $("#divErrorScreen").show();
              $("#errorCode").HTML(err.status);

              }, // end of ajax error

              // If the API call is successful, then the page is displayed with the current weather conditions 
            success: function (response) {        
              
              var arr = response;
              var temp = parseInt(arr.main.temp);
              var conditionsDesc = arr.weather[0].description;
              var weather = arr.weather[0].main;
              var weatherCapitalLetter = capitalizeFirstLetter(weather);

              backgroundColor(temp);
              conditionsIcon(conditionsDesc);

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

              $("#spanConditions").text(weatherCapitalLetter);

            }
        }); //End of success ajax call to get weather

        }, 

        "jsonp"); // End of IP Adress Pull
  
  }); //jQuery Self Ivoked

  // This function will change the background color of the page based on the current temperature
  function backgroundColor(temp){
    switch (temp <= 100){
      case temp < -15: document.body.style.backgroundColor = "#0b1930";
        break;
      case temp < -10: document.body.style.backgroundColor = "#071a38";
        break;
      case temp < -5: document.body.style.backgroundColor = "#052a66";
        break;
      case temp < 0: document.body.style.backgroundColor = "#092b60";
        break;
      case temp < 5: document.body.style.backgroundColor = "#1a4b9b";;
        break;
      case temp < 7: document.body.style.backgroundColor = "#4782e0";;
        break;
      case temp < 10: document.body.style.backgroundColor = "#37a1e8";;
        break;
      case temp < 13: document.body.style.backgroundColor = "#2dcde5";;
        break;
      case temp < 15: document.body.style.backgroundColor = "#bce23f";;
        break;
      case temp < 17: document.body.style.backgroundColor = "#cde23f";;
        break;
      case temp < 20: document.body.style.backgroundColor = "#e0e23f";;
        break;
      case temp < 25: document.body.style.backgroundColor = "#e2cd3f";;
        break;
      case temp < 27: document.body.style.backgroundColor = "#e2ba3f";;
        break;
      case temp < 30: document.body.style.backgroundColor = "#dba136";;
        break;
      case temp < 33: document.body.style.backgroundColor = "#db8936";;
        break;
      case temp < 35: document.body.style.backgroundColor = "#db7836";;
        break;
      case temp < 40: document.body.style.backgroundColor = "#db6836";;
        break;
      case temp < 50: document.body.style.backgroundColor = "#db5d36";;
        break;
      case temp < 99: document.body.style.backgroundColor = "#db4736";;
        break;
    }
  }

  // This function will change the weather logo based on the current weather conditions
  function conditionsIcon(conditionsDesc){

    var date = new Date();
    var hour = date.getHours();

    var sectionWeatherLogo = document.getElementById('sectionWeatherLogo');

    if(conditionsDesc == 'clear sky'){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/sun.png' class='sunIcon'>";
    };
    if(conditionsDesc == 'clear sky' && hour > 17){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/nightClear.png'>";
    };
    if (conditionsDesc == 'few clouds'){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/cloudy.png'>";
    };
    if (conditionsDesc == 'mist'){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/cloudy.png'>";
    };
    if (conditionsDesc == 'scattered clouds'){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/cloudy.png'>";
    };
    if (conditionsDesc == 'broken clouds'){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/cloudy.png'>";
    };
    if (conditionsDesc == 'shower rain'){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/rain.png'>";
    };
    if (conditionsDesc == 'rain'){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/rain.png'>";
    };
    if (conditionsDesc == 'thunderstorm'){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/thunder.png'>";
    };
    if (conditionsDesc == 'snow'){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/snow.png'>";
    };
  }
  
  // This function make the first letter of the weather conditions into a capital letter
  function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // This function returns a "degrees" symbol for display in the button 
  function ascii(a){ 
    return String.fromCharCode(a); 
  }

  // This function converts the current temperature into Farenheit
  function convertToF(temp) {
        var fTempVal = parseInt((temp * (9 / 5))) + 32;
        return fTempVal;
  }

})(); // JS self Invoked