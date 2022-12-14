async function getdata() {
    var inputVal = document.getElementById("searchTxt").value;
    var inputDate = document.getElementById("dateTxt").value;

    const res = await fetch(
        "https://weatherapi-com.p.rapidapi.com/history.json?q=" + inputVal + "&dt=" + inputDate, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "7c244159ebmsh46a1973dfd73bb4p1c3f8bjsn6da10c4079ce",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
        },
    }
    );

    const data = await res.json();
    if (data.error != null) {
        alert(data.error.message);
    }
    document.getElementById("location").innerText = data.location.name;
    document.getElementById("locationParts").innerHTML = "<i class='bi bi-geo-alt'></i> " + data.location.region + " , " + data.location.country;
    document.getElementById("dateTime").innerHTML = "<i class='bi bi-calendar'></i> " + data.forecast.forecastday[length].date;
    document.getElementById("txtWord").innerText = data.forecast.forecastday[length].day.condition.text;
    document.getElementById("humidity").innerText = "" + data.forecast.forecastday[length].hour[length].humidity + "%";
    document.getElementById("wind").innerText = "" + data.forecast.forecastday[length].hour[length].wind_kph + "km/h";
    document.getElementById("temperatureC").innerText = data.forecast.forecastday[length].hour[length].temp_c + " °C";
    document.getElementById("temperatureF").innerText = data.forecast.forecastday[length].hour[length].temp_f + " °F";
    document.getElementById("max-temp").innerText = data.forecast.forecastday[length].day.maxtemp_c + " °C";
    document.getElementById("max-wind").innerText = data.forecast.forecastday[length].day.maxwind_kph + "km/h";
    document.getElementById("weatherIcon").src = "https:" + data.forecast.forecastday[length].day.condition.icon;

    const forecastDay = data.forecast.forecastday[0];
    const tempCont = document.getElementById('tempCont');
    const pressureCont = document.getElementById('pressureCont');
    const humidCont = document.getElementById('humidCont');
    const windCont = document.getElementById('windCont');

    document.getElementById('chartTemp').remove();
    document.getElementById('chartPressure').remove();
    document.getElementById('chartHumid').remove();
    document.getElementById('chartWind').remove();

    tempCont.innerHTML += "<canvas id='chartTemp' ></canvas>";
    pressureCont.innerHTML += "<canvas id='chartPressure' ></canvas>";
    humidCont.innerHTML += "<canvas id='chartHumid' ></canvas>";
    windCont.innerHTML += "<canvas id='chartWind' ></canvas>";

    const ctxTemp = document.getElementById('chartTemp');
    const ctxPressure = document.getElementById('chartPressure');
    const ctxHumid = document.getElementById('chartHumid');
    const ctxWind = document.getElementById('chartWind');

    let labelHours = [];
    let dataTemp = [];
    let dataPressure = [];
    let dataHumid = [];
    let dataWind = [];

    for (let i = 0; i < 24; i++) {
        let teks = forecastDay.hour[i].time.split(' ');
        teks = teks[1];
        labelHours.push(teks);
    }

    for (let i = 0; i < forecastDay.hour.length; i++) {
        dataTemp.push(forecastDay.hour[i].temp_c);
        dataPressure.push(forecastDay.hour[i].pressure_mb);
        dataHumid.push(forecastDay.hour[i].humidity);
    dataWind.push(forecastDay.hour[i].wind_kph);
    }

    const grTemp = new Chart(ctxTemp, {
        type: 'line',
        data: {
            labels: labelHours,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: dataTemp,
                    borderWidth: 1,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value + ' °C';
                        },
                    },
                },
            },
        },
    });

    const grPressure = new Chart(ctxPressure, {
        type: 'line',
        data: {
            labels: labelHours,
            datasets: [
                {
                    label: 'Pressure (Milibar)',
                    data: dataPressure,
                    borderWidth: 1,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value + ' mb';
                        },
                        stepSize: 0.1,
                    },
                    min: Math.min(...dataPressure) - 1,
                },
            },
        },
    });
    const grHumid = new Chart(ctxHumid, {
        type: 'line',
        data: {
            labels: labelHours,
            datasets: [
                {
                    label: 'Humidity Graph',
                    data: dataHumid,
                    borderWidth: 1,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value + ' %';
                        },
                    },
                },
            },
        },
    });

    const grWind = new Chart(ctxWind, {
        type: 'line',
        data: {
            labels: labelHours,
            datasets: [
                {
                    label: 'Wind Speed (km/h)',
                    data: dataWind,
                    borderWidth: 1,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value + ' km/h';
                        },
                    },
                },
            },
        },
    });

    grTemp.update();
    grHumid.update();
    grPressure.update();
    grWind.update();

}