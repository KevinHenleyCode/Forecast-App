var userCity = $('button').on('click', function(city){
    var city = $('textarea').val()
    test(city)
})


function test(city) {
    
    var siteURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=ba343b52255d8d308c7b0d444577c71e`
    var weatherInfo
    
    fetch(siteURL)
    .then(response => response.json())
    .then(data => weatherInfo = data)
    .then(() => 
    
    console.log(weatherInfo.main.temp));
}
