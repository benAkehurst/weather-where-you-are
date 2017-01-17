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
        }); //End of ajax call to get weather

        }, 

        "jsonp"); // End of IP Adress Pull
  
  }); //jQuery Self Ivoked

  function backgroundColor(temp){
    switch (temp <= 100){
      case temp < 0: document.body.style.backgroundColor = "##092b60";
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

  function conditionsIcon(conditionsDesc){

    var sectionWeatherLogo = document.getElementById('sectionWeatherLogo');

    if(conditionsDesc == 'clear sky'){
      sectionWeatherLogo.innerHTML = "<img src='assets/images/sun.png'>";
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