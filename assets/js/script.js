

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
    $('.one').text("It's " + JSON.stringify(weatherInfo.main.temp) + " degrees in " + city + ".")
}


function resetTextarea() {
    $('textarea').val('')
}