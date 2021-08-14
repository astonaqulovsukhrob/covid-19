
const flags = document.getElementById('flags')
const countryName = document.getElementById('countryName')
const confirmed = document.getElementById('confirmed')
const deaths = document.getElementById('deaths')
const recovered = document.getElementById('recovered')
const active = document.getElementById('active')
const input = document.getElementById('input')
const btn = document.getElementById('btn')

btn.addEventListener('click', btnEl)


function randomCountry() {

  const random = Math.floor(Math.random() * 251)

  const api = 'https://restcountries.eu/rest/v2/all'
  fetch(api).then(function (data) {
    return data.json()
  }).then(getCountry)

  function getCountry(dataCountryName) {
    getReult(dataCountryName[random].name)
  }
}

randomCountry()

function btnEl(e) {
  e.preventDefault()
  const nameOfCountry = input.value
  getReult(nameOfCountry)

  input.value = ''
}

function getReult(nameCountry) {
  const api = `https://api.covid19api.com/live/country/${nameCountry}/status/confirmed`
  fetch(api).then(function (data) {
    return data.json()
  }).then(showReult)

  function showReult(datajson) {
    const dataCountry = datajson[datajson.length - 1]

    flags.src = `https://www.countryflags.io/${dataCountry.CountryCode}/flat/64.png`

    countryName.textContent = `${dataCountry.Country}`
    confirmed.textContent = `${dataCountry.Confirmed}`
    deaths.textContent = `${dataCountry.Deaths}`
    recovered.textContent = `${dataCountry.Recovered}`
    active.textContent = `${dataCountry.Active}`
  }

}