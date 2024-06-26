const searchInput = document.getElementById("searchLocation");
const TodayWeekDayMarkup = document.getElementById("TodayWeekDayMarkup");
const TodayDate = document.getElementById("TodayDate");
const cityName = document.getElementById("cityName")
const tempToday = document.getElementById("tempToday");
const todayCond = document.getElementById("todayCond");
const imgToday = document.getElementById("imgToday");
const humidityToday = document.getElementById("humidityToday");
const windToday = document.getElementById("windToday");
const dirToday = document.getElementById("dirToday");
const tommDay = document.getElementById("TommorrowDay");
const iconTommorow = document.getElementById("iconTommorow");
const TommorrowMaxTemp = document.getElementById("TommorrowMaxTemp");
const TommorowMinTemp = document.getElementById("TommorowMinTemp");
const TommorowCond = document.getElementById("TommorowCond");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
     const lat = pos.coords.latitude;
     const long = pos.coords.longitude
            console.log(lat);
            console.log(long);
            getWeatherData(`${lat},${long}`)
    })
}else{
    alert("Geolocation Not Found")
}



 async function getWeatherData(query){
 let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=fe5333542ef243f4bd2190744241906`)
let data = await response.json()
 console.log(data);
 displayTodayWeather(data);
 displayTommWeather(data);
 displayAfterTommWeather(data)
}


searchInput.addEventListener("input", function(e){
    getWeatherData(e.target.value)
})


function displayTodayWeather(data){
console.log(data, "from weather");
const todayDate = data.current.last_updated
let date = new Date(todayDate)
const todayWeekDay = date.toLocaleString("en-us", {weekday:"long"});
const todayDay = date.getDate()
const todayMonth = date.toLocaleString("en-us" , {month:"long"});
TodayWeekDayMarkup.innerHTML = todayWeekDay
TodayDate.innerHTML = `${todayDay} ${todayMonth}`;
const cityToday = data.location.name;
cityName.innerHTML = cityToday;
const todayDegree =data.current.temp_c;
tempToday.innerHTML = todayDegree;
const todayText = data.current.condition.text;
todayCond.innerHTML = todayText;
imgToday.setAttribute("src" , data.current.condition.icon);
const humidity = data.current.humidity;
humidityToday.innerHTML = humidity;
const wind = data.current.wind_kph
windToday.innerHTML= wind;
const direction = data.current.wind_dir;
dirToday.innerHTML= direction;
}

function displayTommWeather({forecast}){
console.log(forecast); 
nextDay = new Date(forecast.forecastday[1].date).toLocaleString("en-us", {weekday:"long"})
tommDay.innerHTML = nextDay
iconTommorow.setAttribute("src" ,forecast.forecastday[1].day.condition.icon);
TommorrowMaxTemp.innerHTML= forecast.forecastday[1].day.maxtemp_c;
TommorowMinTemp.innerHTML = forecast.forecastday[1].day.mintemp_c;
TommorowCond.innerHTML = forecast.forecastday[1].day.condition.text;

}
function displayAfterTommWeather({forecast}){
AfterTommorrowDay.innerHTML = new Date(forecast.forecastday[2].date).toLocaleString("en-us", {weekday:"long"})
iconAfterTommorow.setAttribute("src" ,forecast.forecastday[2].day.condition.icon);
AfterTommorrowMaxTemp.innerHTML= forecast.forecastday[2].day.maxtemp_c;
AfterTommorowMinTemp.innerHTML = forecast.forecastday[2].day.mintemp_c;
AfterTommorowCond.innerHTML = forecast.forecastday[2].day.condition.text;
}
