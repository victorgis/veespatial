let atm = [
    '<i class="ri-rainy-line"></i>', '<i class="ri-sun-line"></i>', '<i class="ri-sun-cloudy-line"></i>', '<i class="ri-sun-foggy-line"></i>', '<i class="ri-cloudy-2-line"></i>', '<i class="ri-thunderstorms-line"></i>', '<i class="ri-showers-line"></i>', '<i class="ri-cloud-windy-line"></i>'
]

let weather = [];
let obj = [];

//get name of city
let btn = document.getElementById('btn').addEventListener("click", function(event){
    event.preventDefault()
    let cityNames = document.getElementById('search').value;

    fetch(`http://api.positionstack.com/v1/forward?access_key=7ad8f96f85c46d6db171ea67e84771b0&query=${cityNames}`)
        .then((response) => response.json())
        .then((data) => {
            let datay = data.data[0].latitude;
            let datax = data.data[0].longitude;

            // Object.assign(obj, {lat: `${datay}`, long: `${datax}`});
            obj.push(datay, datax)

        })
    
        console.log('here', obj)
});



navigator.geolocation.getCurrentPosition((position) => {

    if (obj.length != 2){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        //weather
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ee914cdd33ab3acb4346421f7daf6fd4`)
            .then((response) => response.json())
            .then((data) => {
                let names = data

                let city = document.getElementById('city');
                let bigCity = document.getElementById('bigCity');
                console.log(names)
                city.innerText = `${names.name}, ${names.sys.country}`
                bigCity.innerText = `${names.name}, ${names.sys.country}`

                let windSpead = document.getElementById('windSpead')
                windSpead.innerText = `${(names.wind.speed).toFixed(1)} m/s`

                let visibility = document.getElementById('visibility');
                visibility.innerText= `${(names.visibility/1000).toFixed(1)} km`

                let bigCityTemp = document.getElementById('bigCityTemp')
                let temp = document.getElementById('temp');
                bigCityTemp.innerText = `${(names.main.temp - 273.15).toFixed(1)} °C`
                temp.innerText = `${(names.main.temp - 273.15).toFixed(1)} °C`

                let feelsLike = document.getElementById('feelsLike');
                feelsLike.innerText = `feels like ${(names.main.feels_like - 273.15).toFixed(1)} °C`
                
                let humidity = document.getElementById('humidity');
                humidity.innerText = `${names.main.humidity} %`

                let atmosphereP = document.getElementById('atmosphereP');
                atmosphereP.innerText = `${names.weather[0].description}`

                // For atmosphere images
                if (names.weather[0].description === 'rain'){
                    let atmosphere = document.getElementById('atmosphere');
                    return atmosphere.innerHTML = atm[0]
                }else if (names.weather[0].description === 'clear sky'){
                    return atmosphere.innerHTML = atm[1]
                }else if (names.weather[0].description === 'moderate rain'){
                    return atmosphere.innerHTML = atm[2]
                }else if (names.weather[0].description === 'light rain'){
                    return atmosphere.innerHTML = atm[6]
                }else if (names.weather[0].description === 'overcast clouds'){
                    return atmosphere.innerHTML = atm[4]
                }else if (names.weather[0].description === 'broken clouds'){
                    return atmosphere.innerHTML = atm[7]
                }else if (names.weather[0].description === 'thunderstorm with heavy rain'){
                        return atmosphere.innerHTML = atm[5]
                }else{
                    return atmosphere.innerHTML = atm[3]
                }

                
            });
    }else if (obj.length >= 2){
        
        // let latitude = obj.lat;
        // let longitude = obj.long;


        //weather
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.long}&appid=ee914cdd33ab3acb4346421f7daf6fd4`)
            .then((response) => response.json())
            .then((data) => {
                let names = data

                let city = document.getElementById('city');
                let bigCity = document.getElementById('bigCity');
                console.log(names)
                city.innerText = `${names.name}, ${names.sys.country}`
                bigCity.innerText = `${names.name}, ${names.sys.country}`

                let windSpead = document.getElementById('windSpead')
                windSpead.innerText = `${(names.wind.speed).toFixed(1)} m/s`

                let visibility = document.getElementById('visibility');
                visibility.innerText= `${(names.visibility/1000).toFixed(1)} km`

                let bigCityTemp = document.getElementById('bigCityTemp')
                let temp = document.getElementById('temp');
                bigCityTemp.innerText = `${(names.main.temp - 273.15).toFixed(1)} °C`
                temp.innerText = `${(names.main.temp - 273.15).toFixed(1)} °C`

                let feelsLike = document.getElementById('feelsLike');
                feelsLike.innerText = `feels like ${(names.main.feels_like - 273.15).toFixed(1)} °C`
                
                let humidity = document.getElementById('humidity');
                humidity.innerText = `${names.main.humidity} %`

                let atmosphereP = document.getElementById('atmosphereP');
                atmosphereP.innerText = `${names.weather[0].description}`

                // For atmosphere images
                if (names.weather[0].description === 'rain'){
                    let atmosphere = document.getElementById('atmosphere');
                    return atmosphere.innerHTML = atm[0]
                }else if (names.weather[0].description === 'clear sky'){
                    return atmosphere.innerHTML = atm[1]
                }else if (names.weather[0].description === 'moderate rain'){
                    return atmosphere.innerHTML = atm[2]
                }else if (names.weather[0].description === 'light rain'){
                    return atmosphere.innerHTML = atm[6]
                }else if (names.weather[0].description === 'overcast clouds'){
                    return atmosphere.innerHTML = atm[4]
                }else if (names.weather[0].description === 'broken clouds'){
                    return atmosphere.innerHTML = atm[7]
                }else if (names.weather[0].description === 'thunderstorm with heavy rain'){
                        return atmosphere.innerHTML = atm[5]
                }else{
                    return atmosphere.innerHTML = atm[3]
                }

                
            });
            console.log(obj.length)
    }

    

        
});




//Get Current Date
let d = new Date();
// get month
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let month = monthNames[d.getMonth()];
//get year
let year = d.getFullYear();
const dateMonth = document.getElementById('dateMonth');
dateMonth.innerText = `${month} ${year}`

// full date
let fullDate = document.getElementById('fullDate');
fullDate.innerText = d.toDateString()


