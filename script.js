async function fetchCountryData() {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json()
    return data
}

async function fetchWeatherData(id, name) {
    console.log(id, name)
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=138be98165febb1c202882668d4c2474`)
    const weatherData = await weatherResponse.json()   
    console.log(weatherData)
    document.getElementById(id).innerHTML = `weather:${weatherData.main.temp}`
}

function renderCard() {

    let list = document.getElementById('container') 

    fetchCountryData()
        .then(country => {
            country.map((data) => {
                console.log("countries", country)

                let listItem = document.createElement('div')
                listItem.classList.add('col')
                listItem.innerHTML = `

                <div class="card h-100">
                    <div class="card-header">
                        <small class="text-muted"><h5>${data.name.common}</h5></small>  
                    </div>
                    <img src=${data.flags.png} class="card-img-top"
                        alt="...">
                    <div class="card-body">
                        <p class="card-text">Capital:${data.capital}</p>
                        <p class="card-text">Region:${data.region}</p>
                        <p class="card-text">Country Code:${data.cca3}</p>                        
                        <button type="button" onclick="fetchWeatherData('${data.cca3}', '${data.name.common}')" class="btn btn-primary">Click for weather</button>
             <div id=${data.cca3}></div>
                    </div>

                </div>

                   `
                list.appendChild(listItem)
            })
        })

}

renderCard()



