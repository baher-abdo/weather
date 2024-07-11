const cityInput = document.getElementById("city-input")
const btnFind = document.getElementById("find")
const theDate = new Date();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const request = {
  api:"https://api.weatherapi.com/v1/forecast.json?key=a93903e252994bedae7231248240607&q=",
  myCity: "",
  dayOne:`${theDate.getMonth()+1}-${theDate.getDate()}-${theDate.getFullYear()}`,
  dayTwo:`${theDate.getMonth()+1}-${theDate.getDate()+1}-${theDate.getFullYear()}`,
  dayThree:`${theDate.getMonth()+1}-${theDate.getDate()+2}-${theDate.getFullYear()}`
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position){
      const latAndLon = `${position.coords.latitude},${position.coords.longitude}`
      request.myCity = latAndLon
      callFunctions()
    },
    function () {
      request.myCity = "cairo"
      callFunctions()
      })
  }
}
getLocation()
async function getToday() {
    try {
      const response = await fetch(request.api + request.myCity+"&dt="+request.dayOne)
        if (!response.ok) {
            throw new Error("not fetched")
        }
        
      const result = await response.json()
      let dayName = theDate
      dayName.setDate(dayName.getDate())
      document.getElementById("today").textContent = `${dayName.toLocaleDateString('en-us', {weekday:'long'})}`
      document.getElementById("date").textContent = `${theDate.getDate() + " " + months[theDate.getMonth()]}`
      document.getElementById("city").textContent = `${result.location.name}`
      document.getElementById("degree-of-today").innerHTML = `${result.current.temp_c}<sup>o</sup>C`
      document.getElementById("sky-today").src = `${result.current.condition.icon}`
      document.getElementById("status").textContent = `${result.current.condition.text}`
      document.getElementById("umbrella").textContent = `${result.current.humidity}`
      document.getElementById("wind").textContent = `${result.current.wind_kph}`
      document.getElementById("compass").textContent = `${result.current.wind_dir}`
                }
    catch(error) {

    }
}
async function secondDay(){
    try {
        const response = await fetch(request.api+request.myCity+"&dt="+request.dayTwo)
        if (!response.ok) {
            throw new Error("not fetched")
        }
        const result = await response.json()
        let dayName = new Date()
      dayName.setDate(dayName.getDate() + 1)
      
      document.getElementById("second-day").textContent = `${dayName.toLocaleDateString('en-us', {weekday:'long'})}`
      document.getElementById("second-day-sky").src = `${result.forecast.forecastday[0].day.condition.icon}`
      document.getElementById("second-day-max-temp").innerHTML = `${result.forecast.forecastday[0].day.maxtemp_c}<sup>o</sup>C`
      document.getElementById("second-day-min-temp").innerHTML = `${result.forecast.forecastday[0].day.mintemp_c}<sup>o</sup>`
      document.getElementById("second-day-status").textContent = `${result.forecast.forecastday[0].day.condition.text}`
    }
    catch(error) {

    }
}
async function thirdDay() {
    try {
        const response = await fetch(request.api+request.myCity+"&dt="+request.dayThree)
        if (!response.ok) {
            throw new Error("not fetched")
        }
        
        const result = await response.json()
        let dayName = new Date()
      dayName.setDate(dayName.getDate() + 2)
    
      document.getElementById("thirdDay-day").textContent = `${dayName.toLocaleDateString('en-us', {weekday:'long'})}`
      document.getElementById("thirdDay-day-sky").src = `${result.forecast.forecastday[0].day.condition.icon}`
      document.getElementById("thirdDay-day-max-temp").innerHTML = `${result.forecast.forecastday[0].day.maxtemp_c}<sup>o</sup>C`
      document.getElementById("thirdDay-day-min-temp").innerHTML = `${result.forecast.forecastday[0].day.mintemp_c}<sup>o</sup>`
      document.getElementById("thirdDay-day-status").textContent = `${result.forecast.forecastday[0].day.condition.text}`
}
    catch(error) {
    }
}
document.getElementById("copyright").textContent = `${theDate.getFullYear()}`
btnFind.addEventListener("click", () => {
    request.myCity = cityInput.value
    callFunctions()
})
cityInput.addEventListener("keyup", () => {
    request.myCity = cityInput.value
    callFunctions()
})

function callFunctions() {
  getToday()
  secondDay()
  thirdDay()
}