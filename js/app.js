async function getdata() {
    var inputVal = document.getElementById("searchTxt").value;
    var inputDate = document.getElementById("dateTxt").value;

    const res = await fetch(
        "https://weatherapi-com.p.rapidapi.com/history.json?q="+inputVal+"&dt="+inputDate , {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "7c244159ebmsh46a1973dfd73bb4p1c3f8bjsn6da10c4079ce",
		          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
            },
        }
    );

    const data = await res.json();
    document.getElementById("location").innerText = data.location.name;
    document.getElementById("locationParts").innerHTML = "<i class='bi bi-geo-alt'></i> " + data.location.region + " , " + data.location.country;
    document.getElementById("dateTime").innerHTML = "<i class='bi bi-calendar'></i> " + data.forecast.forecastday[length].date;
    document.getElementById("txtWord").innerText = data.forecast.forecastday[length].day.condition.text;
    document.getElementById("humidity").innerText = "" + data.forecast.forecastday[length].hour[length].humidity + "%";
    document.getElementById("wind").innerText ="" +data.forecast.forecastday[length].hour[length].wind_kph + "km/h";
    document.getElementById("temperatureC").innerText = data.forecast.forecastday[length].hour[length].temp_c + " °C";
    document.getElementById("temperatureF").innerText =data.forecast.forecastday[length].hour[length].temp_f  + " °F";
    document.getElementById("max-temp").innerText = data.forecast.forecastday[length].day.maxtemp_c  + " °C";
    document.getElementById("max-wind").innerText = data.forecast.forecastday[length].day.maxwind_kph + "km/h";
    document.getElementById("weatherIcon").src ="https:" + data.forecast.forecastday[length].day.condition.icon ;
}

