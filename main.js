let firstDay = document.getElementById("firstDay");
let secondDay = document.getElementById("secondDay");
let rdDay = document.getElementById("rdDay");

let searchInput = document.getElementById("searchInput");
let BtnSearch = document.getElementById("BtnSearch");

navigator.geolocation.getCurrentPosition(function (position) {
  console.log(position);

  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;

  getWeather(`${myLatitude}, ${myLongitude}`);
});


// api get from weather
async function getWeather(loc) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${loc}&days=3&key=61d1ebf9863d4e5b99f230215241412`
    );

    if (response.ok) {
      let data = await response.json();
      console.log(data);

      displayData(data);
      getTommorrowWeather(data);
      getAfterTommorrowWeather(data);
    }
  } catch (error) {
    console.log(error);
    
  }
}

// first day
function displayData(data){

    let todayDate = data.current.last_updated;
    let myDateName = new Date(todayDate);

    let dayName = myDateName.toLocaleString("en-us" , {weekday:"long"}); 
    let dayMonth = myDateName.toLocaleString("en-us" , {month:"long"}); 
    let todayDay = myDateName.getDate();

    firstDay.innerHTML=`
    
          <div class="card-footer rounded-start-3 d-flex justify-content-between">
            <span>${dayName}</span>
            <span>${todayDay} ${dayMonth} </span>
          </div>
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title my-3">${data.location.name}</h5>
            <h1 class="fs-1 fw-bold text-center my-2">${data.current.temp_c}<sup>o</sup>C</h1>
            <img src="${data.current.condition.icon}" class="my-3" alt="ph0to">
            <span class="my-3">${data.current.condition.text}</span>
          </div>
          <div class=" d-flex justify-content-around border-0">
            <span><i class="fa-solid fa-umbrella"></i> ${data.current.humidity}%</span>
            <span><i class="fa-solid fa-wind"></i>${data.current.wind_kph}km/h</span>
            <span><i class="fa-regular fa-compass"></i>${data.current.wind_dir}</span>
          </div>
    `
}

// second day
function getTommorrowWeather(data){

    let dayTommorrow = data.forecast.forecastday[1];

    let dayDate = new Date(dayTommorrow.date);

    let dayName = dayDate.toLocaleString("en-us",{weekday:"long"});

    secondDay.innerHTML =`
    <div class="card-footer cardBg text-center">
            <span>${dayName}</span>
          </div>
          <div class="card-body d-flex flex-column align-items-center">
            
            <img src="${data.forecast.forecastday[1].day.condition.icon}" class="my-3" alt="ph0to">
            <h1 class="fs-1 fw-bold text-center my-2">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h1>
            <h4>${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></h4>
            <span class="my-3">${data.forecast.forecastday[1].day.condition.text}</span>
          </div>
    `
}

// third day
function getAfterTommorrowWeather(data){

    let dayTommorrow = data.forecast.forecastday[2];

    let dayDate = new Date(dayTommorrow.date);

    let dayName = dayDate.toLocaleString("en-us",{weekday:"long"});

    rdDay.innerHTML =`
    <div class="card-footer rounded-end-3 text-center">
            <span>${dayName}</span>
          </div>
          <div class="card-body d-flex flex-column align-items-center">
            
            <img src="${data.forecast.forecastday[2].day.condition.icon}" class="my-3" alt="ph0to">
            <h1 class="fs-1 fw-bold text-center my-2">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h1>
            <h4>${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></h4>
            <span class="my-3">${data.forecast.forecastday[2].day.condition.text}</span>
          </div>
    `
}

// search from name with input
searchInput.addEventListener(  "input"   , function(){
    let textSearch = searchInput.value;
    getWeather(textSearch);
})

//clear data from input by button find
searchInput.addEventListener(  "input"   , function(){
    let textSearch = searchInput.value;
    getWeather(textSearch);
})

BtnSearch.addEventListener(  "click"  ,  ()=>{ searchInput.value = null});