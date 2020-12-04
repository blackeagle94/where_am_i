
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const latitudeInput = document.querySelector("#latitude");
const longitudeInput = document.querySelector("#longitude");

const apiKey = "";  // take yours !!!

const whereAmI = function (lat, lng) {
  let url = `https://app.geocodeapi.io/api/v1/reverse?apikey=b223de80-3589-11eb-9407-5d382afbf05c&point.lat=${lat}&point.lon=${lng}`;

  fetch(url)
  .then(res => {
      if (res.ok) {
          return res.json()
      }
      throw new Error ('Something went wrong!')
  })
  .then((data) => {console.log(`
    Your are in ${data.features[0].properties.locality} country of ${data.features[0].properties.country}
  `)
    return data.features[0].properties.country}
  )
  .then((data) => {
    getCountryAndNeighbour(data)
  })
  .catch(err => console.log(err))
};


btn.addEventListener("click", displayCountry);
