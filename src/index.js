import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix, { Notify } from 'notiflix';


const input = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

const handleSearchCountry = event => {
    const searchCountry = event.target.value.trim();
    list.innerHTML = '';
  
    if (searchCountry !== '') {
      fetchCountries(searchCountry)
        .then(data => {
          if (2 <= data.length && data.length <= 10) {
            const makeup = data
              .map(
                country =>
                  `<li class= "list-item"><img class = "flag" src=${country.flags.png} width = 80px>  ${country.name.common} </li>`
              )
              .join('');
  
            list.insertAdjacentHTML('beforeend', makeup);
          }
          if (data.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          }
          if (data.length === 1) {
            const countryInfo = data
              .map(
                country =>
                  `<h2><img class = "flag" src=${
                    country.flags.png
                  } width = 80px>  ${country.name.common} </h2>
                  <p>Capital: ${country.capital}</p>
                  <p>Population: ${country.population}</p>
                  <p>Languages: ${Object.values(country.languages)}</p>`
              )
              .join('');
  
            list.insertAdjacentHTML('beforeend', countryInfo);
          }
        })
        .catch(error => {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    }
  };
  const DEBOUNCE_DELAY = 300;
  
  input.addEventListener(
    'input',
    debounce(handleSearchCountry, DEBOUNCE_DELAY)
  );



