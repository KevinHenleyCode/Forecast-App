var theDate = moment().format("M/DD/YYYY");


var userCity = $('button').on('click', function(city){
    var city = $('#city').val()
    weatherData(city)
})


function weatherData(city) {
    var siteURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=ba343b52255d8d308c7b0d444577c71e`
    var weatherInfo
    
    fetch(siteURL)
    .then(response => response.json())
    .then(data => weatherInfo = data)
    .then(() => printTemp(weatherInfo, city))
    .catch((error) => {
        alert('Invalid city');
        resetTextarea()
    })
}


function printTemp(weatherInfo, city) {
    console.log(weatherInfo);

    $('.date').html(theDate)
    $('.pic').html("<img src=http://openweathermap.org/img/wn/" + weatherInfo.weather[0].icon + ".png>")
    $('.temp').html("Temp: " + JSON.stringify(weatherInfo.main.temp) + "°F")
    $('.humid').html("Humidity: " + JSON.stringify(weatherInfo.main.humidity) + "%")
}


function resetTextarea() {
    $('textarea').val('')
}