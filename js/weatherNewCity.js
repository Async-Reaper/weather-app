const weatherNewCity = () => {
    const checkCity = document.querySelector('.search__city');
    const btnCheckCity = document.querySelector('.btn__check-city');
    const weatherTemp = document.querySelector('.weather__temp');
    const feelTem = document.querySelector('.feel__tem');
    const wind = document.querySelector('.wind');
    const pressure = document.querySelector('.pressure');
    const humidity = document.querySelector('.humidity');
    const cityName = document.querySelector('.city__name')
    const dateTime = document.querySelector('.date__time');
    const weatherForecastList = document.querySelector('.weather__forecast-list');


    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let getDay = day;
    let getMonth = month;
    let getYear = year;

    const arrDayWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    const dateAddZero = (number) => {
        if ( number < 10) {
            return '0' + number
        } else {
            return number
        }
    }


    btnCheckCity.addEventListener('click', () => {

        city = checkCity.value
        const APIkey = 'e838be31c6a1ebf836e45dc638348a26';
        const urlGetWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${APIkey}`;

        const weatherCurrentCity = document.querySelectorAll('.weather__current-city');

        weatherCurrentCity.forEach( item => {
            item.remove()
        })

        const getWeatherNewCity = async (url) => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                cityName.innerHTML = `${result.name}`
                weatherTemp.innerHTML = `${Math.floor(result.main.temp)}° ${result.weather[0].description}`;
                feelTem.innerHTML = `По ощущению: ${Math.floor(result.main.feels_like)}°`;
                wind.innerHTML = `Ветер: ${result.wind.speed} м/с`;
                pressure.innerHTML = `Давление: ${result.main.pressure} Па`;
                humidity.innerHTML = `Влажность: ${result.main.humidity}%`;
                dateTime.innerHTML = `${arrDayWeek[date.getDay()]} ${dateAddZero(date.getDate()) }.${ dateAddZero(date.getMonth() + 1) }.${ date.getFullYear() }`

                let urlGetWeatherWeek = `https://api.openweathermap.org/data/2.5/onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&exclude=minutely&lang=ru&units=metric&appid=${APIkey}`
                
                let i = arrDayWeek.indexOf(arrDayWeek[date.getDay()]);

                const getWeatherForecastNewCity = async (url) => {

                    const response = await fetch(url);
                    const result = await response.json();
                    const {daily} = result;
                    
                    console.log(daily)
                    daily.forEach(day => {

                        if (i == 7) {
                            i = 0
                        }
            
                        const newLi = document.createElement('li');
                        newLi.classList.add('weather__current-city');
                        newLi.classList.add('weather__forecast-day');
                        newLi.innerHTML = `
                            <p class="weather__week">${arrDayWeek[i]} ${ dateAddZero(getDay) }.${ dateAddZero(getMonth) }.${ getYear }</p>
                            <p class="weather__desc">${day.weather[0].description}</p>
                            <p class="weather__temp">${ Math.floor(day.temp.day) }° ${ Math.floor(day.temp.night) }°</p>
                            <ul class="more__info-list">
                                <li class="more__info-item">
                                    <p class="temp__morn">Температура утром ${Math.floor(day.temp.morn)}°</p>
                                </li>
                                <li class="more__info-item">
                                    <p class="temp__day">Температура днем ${Math.floor(day.temp.day)}°</p>
                                </li>
                                <li class="more__info-item">
                                    <p class="temp__eve">Температура вечером ${Math.floor(day.temp.eve)}°</p>
                                </li>
                                <li class="more__info-item">
                                    <p class="temp__nigth">Температура ночью ${Math.floor(day.temp.night)}°</p>
                                </li>
                                <li class="more__info-item">
                                    <p class="more__info-wind">Ветер ${day.wind_speed} м/с</p>
                                </li>
                                <li class="more__info-item">
                                    <p class="more__info-pressure">Давление ${day.pressure} Па</p>
                                </li>
                                <li class="more__info-item">
                                    <p class="more__info-humidity">Влажность ${day.humidity}%</p>
                                </li>
                            </ul>
                        `;
            
                        if (getDay == 31) {
                            getDay = 1;
                            getMonth++;
                        } else {
                            getDay += 1;
                        }
                    
                        if (getMonth > 12) {
                            getMonth = 1;
                            getYear++;
                        } 
            
                        weatherForecastList.append(newLi)
                        i++;
                    })
                }

                getWeatherForecastNewCity(urlGetWeatherWeek)
    
            } catch (e) {
    
                throw new Error(e.message)
    
            }
        }
    
        getWeatherNewCity(urlGetWeather)
        
        
        setInterval( () => {
            getWeather(urlGetWeather);
        }, 3600000)


    })
}
weatherNewCity()
