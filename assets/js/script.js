let theDate = moment().format("M/DD/YYYY");
var allCities = []


// gets user input
let userSubmit = $('button').on('click', function(){
    $('.big-card').removeClass('hide');
    let userCity = $('#city').val().toUpperCase()
    
    // sends the user input into localStorage
    allCities.push(userCity)
    localStorage.setItem('storeCity', JSON.stringify(allCities))
    var getCity = localStorage.getItem('storeCity')
    var cityList = JSON.parse(getCity);

    $('.input-card  ul').html('')
    for (let i = 0; i < cityList.length; i++) {
            $('.input-card  ul').append('<li class="list-group-item">' + cityList[i] + '</li>')
    }
    
    resetTextarea()
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
        alert('Page Error');
        resetTextarea()
    })
}


// passes the latitude and longitude
function passLatLon(cityData, userCity) {
    
    let lat = cityData.coord.lat
    let lon = cityData.coord.lon
    weatherApi(userCity, lat, lon)
} 


// gets the daily api info
function weatherApi(userCity, lat, lon) {
    let siteURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=ba343b52255d8d308c7b0d444577c71e`
    let weatherData

    fetch(siteURL)
    .then(response => response.json())
    .then(data => weatherData = data)
    .then(() => multiDay(weatherData, userCity))
    .catch((error) => {
        alert('Invalid city');
        resetTextarea()
    })
}


// adds the api info into the html elements
function multiDay(weatherData, userCity) {
    let dailyData = weatherData.daily[0]
    let whichDay = new Date((dailyData.dt)*1000)
    let theDate = `${whichDay.getUTCMonth()+1}/${whichDay.getUTCDate()}/${whichDay.getUTCFullYear()}`
    
    // for large card
    $('.date').html(userCity + ": (" + theDate + ")" + "<img src=http://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + ".png>")
    $('.temp').html("Temperature: " + JSON.stringify(weatherData.daily[0].temp.day) + " °F")
    $('.humid').html("Humidity: " + JSON.stringify(weatherData.daily[0].humidity) + "%")
    $('.wind').html("Wind Speed: " + JSON.stringify(weatherData.daily[0].wind_speed) + " MPH")
    $('.uv').html("UVI : " + JSON.stringify(weatherData.daily[0].uvi))
    
    // for small cards

    $('.small-cards').html('')
    for (let i = 1; i < 6; i++) {
        let dailyData = weatherData.daily[i]
        let whichDay = new Date((dailyData.dt)*1000)
        let theDate = `${whichDay.getUTCMonth()+1}/${whichDay.getUTCDate()}/${whichDay.getUTCFullYear()}`
        $('.small-cards').append('<div class="col-xs-12 col-xl-2 col-xxl-2 card small-card-container">'+
                            '<div div class= "card-header">'+ theDate +'</div>'+
                            '<ul class="list-group list-group-flush">'+
                            '<li class="list-group-item"><img src=http://openweathermap.org/img/wn/'+ weatherData.daily[i].weather[0].icon+'.png></li>'+
                            '<li class="list-group-item tempFuture1">Temp: ' + JSON.stringify(weatherData.daily[i].temp.day) + ' °F</li>'+
                            '<li class="list-group-item humidFuture1">Humidity: ' + JSON.stringify(weatherData.daily[i].humidity) + '%</li>'+
                            '</ul>'+
                            '</div >')
    }
}


// resets the input text
function resetTextarea() {
    $('input').val('')
}