
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// Extracting Weather condition for currentLocation for the upcoming 3 days
async function search(e) {
    let curr = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=eb70a77434b14fdd93c111217241112&q=${e}&days=3`);
    // check response of API
    if (curr.ok && curr.status != 400) {
        let e = await curr.json();
        currentWeather(e.location, e.current);
        searchedWeather(e.forecast.forecastday);
        console.log(e);
    }
}
document.getElementById("search").addEventListener("keyup", e => {
    search(e.target.value)
}
);


function currentWeather(location, weather) {
    if (weather != null) {
        const date = new Date(weather.last_updated.replace(" ", "T"));
        const forecastHTML = `
            <div class="table-forecast">
                    <div class="container-fluid">            
                            <div class="card p-5 bg-color text-bg-light w-100 shadow-sm h-100 border-2 border-info">
                             <div class="card-body m-1">
                               <div class="card-title">
                                <p class="fw-bold " for="today">${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}</p></div>
                                <p for="location">Location: ${location.name}</p>
                                <p for="degree">Temperature: ${weather.temp_c}<sup>o</sup>C</p>
                                <p for="condition">Condition: ${weather.condition.text}</p>
                                <p for="windDegree">Wind: 18km/h East</p>
                                <img id="weatherIcon" src="https:${weather.condition.icon}" alt="Weather Icon" width=90>
                    </div>
            </div>
        </div>
        </div>`;

        document.getElementById("forecast").innerHTML = forecastHTML;
    }
}

function searchedWeather(forecastArray) {
    let forecastHTML = "";

    for (let i = 1; i < forecastArray.length; i++) {
        const date = new Date(forecastArray[i].date.replace(" ", "T"));
        forecastHTML += `
            <div class="table-forecast">
                    <div class="container-fluid">            
                            <div class="card p-5  text-bg-light w-100 shadow-sm h-100 border-2 border-info">
                            <div class="card-body m-1">
                                <div class="card-title">
                                <p class="fw-bold " for="today">${days[date.getDay()]}</p></div>
                                <p for="degree">Max Temp: ${forecastArray[i].day.maxtemp_c}<sup>o</sup>C</p>
                                <p for="degree">Min Temp: ${forecastArray[i].day.mintemp_c}<sup>o</sup>C</p>
                                <p for="condition">Condition: ${forecastArray[i].day.condition.text}</p>
                                <img id="weatherIcon" src="https:${forecastArray[i].day.condition.icon}" alt="Weather Icon" width=48>
                            </div>
                        </div>
                   </div>
            </div>`;
    }

    document.getElementById("forecast").innerHTML += forecastHTML;
}

search("cairo");

/*

// Extracting info from API
let loc = document.getElementById('search');

async function getWeather() {
    try {
        let res = await fetch(`http://api.weatherapi.com/v1/current.xml?key=eb70a77434b14fdd93c111217241112&q=${loc.value}`);
        let resText = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(resText, 'application/xml');

        console.log('XML-DOC', xmlDoc);

        const location = xmlDoc.getElementsByTagName('location')[0];
        const current = xmlDoc.getElementsByTagName('current')[0];
        const winddegree = current.getElementsByTagName('wind_degree')[0].textContent;

        var name = location.getElementsByTagName('name')[0].textContent;
        var degree = current.getElementsByTagName('temp_c')[0].textContent;
        const iconUrl = xmlDoc.getElementsByTagName('current')[0]
            .getElementsByTagName('condition')[0]
            .getElementsByTagName('icon')[0].textContent;
        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.src = iconUrl;

        // Display weather data 
        document.querySelector('.table-forecast .col-4:nth-child(1) label[for="location"]').textContent = name;
        document.querySelector('.table-forecast .col-4:nth-child(1) label[for="degree"]').textContent = degree;
        document.querySelector('.table-forecast .col-4:nth-child(1) label[for="windDegree"]').textContent = winddegree + ' km/h';



    } catch (error) {
        console.error('Error fetching data', error);
    }
}

document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();
    getWeather();
});
*/


