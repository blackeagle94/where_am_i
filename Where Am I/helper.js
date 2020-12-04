// Formats response to look presentable on webpage
const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const displayCountry = function (event) {
  event.preventDefault();
  while (countriesContainer.firstChild) {
    countriesContainer.removeChild(countriesContainer.firstChild);
  }
  whereAmI(latitudeInput.value, longitudeInput.value);
};

const getCountryAndNeighbour = (country) => {
  let url = 'https://restcountries.eu/rest/v2/name/';
  let alpha = 'https://restcountries.eu/rest/v2/alpha/';

  const xhr = new XMLHttpRequest();


  xhr.responseType = 'json';

  const request = new XMLHttpRequest();
  request.responseType = 'json';

  xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          const [data] = xhr.response;
            renderCountry(data);
      }
      
  }

  xhr.addEventListener('load', function () {
      const [data] = xhr.response
      let neighbour = data.borders[0];

   const request = new XMLHttpRequest();
   request.responseType = 'json';

   request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
          const data = request.response;
            renderCountry(data, 'neighbour');
      }
      
  }

  request.open('GET', `${alpha}${neighbour}`)
  request.send()

  })

  xhr.open('GET', `${url}${country}`)
  xhr.send()
}