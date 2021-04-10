let theDate = moment().format("M/DD/YYYY");


let userSubmit = $('button').on('click', function(){
    let userCity = $('#city').val()
    cityApi(userCity)
})


// gathers information on the city to obtain the latitude and longitude
function cityApi(userCity) {
    let siteURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=ba343b52255d8d308c7b0d444577c71e`
    let cityData
    
    fetch(siteURL)
    .then(response => response.json())
    .then(data => cityData = data)
    .then(() => passLatLon(cityData, userCity))
    .catch((error) => {
        alert('Invalid city');
        resetTextarea()
    })
}


function passLatLon(cityData, userCity) {
    
    let lat = cityData.coord.lat
    let lon = cityData.coord.lon
    weatherApi(userCity, lat, lon)
} 


function weatherApi(userCity, lat, lon) {
    let siteURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=ba343b52255d8d308c7b0d444577c71e`
    let weatherData
    
    fetch(siteURL)
    .then(response => response.json())
    .then(data => weatherData = data)
    .then(() => printUV(weatherData, userCity))
    .catch((error) => {
        alert('Invalid city');
        resetTextarea()
    })
}


function printUV(weatherData, userCity) {
    console.log(weatherData);
    let timestamp = weatherData.daily[1].dt
    let futureDays = new Date(timestamp*1000)

    $('.date').html(userCity + " (" + theDate + ") " + "<img src=http://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + ".png>")
    $('.temp').html("Temperature: " + JSON.stringify(weatherData.current.temp) + " °F")
    $('.humid').html("Humidity: " + JSON.stringify(weatherData.current.humidity) + "%")
    $('.wind').html("Wind Speed: " + JSON.stringify(weatherData.current.wind_speed) + " MPH")
    $('.uv').html("UVI : " + JSON.stringify(weatherData.daily[0].uvi))

    console.log(`${futureDays.getUTCMonth()+1}/${futureDays.getUTCDate()}/${futureDays.getUTCFullYear()}`)

        // for small cards
// $('.date').html(theDate)
// $('.pic').html("<img src=http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png>")
// $('.temp').html("Temp: " + JSON.stringify(weatherData.main.temp) + "°F")
// $('.humid').html("Humidity: " + JSON.stringify(weatherData.main.humidity) + "%")
}


function resetTextarea() {
    $('textarea').val('')
}