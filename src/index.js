import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import debounce from 'lodash.debounce';

import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector(`#search-box`),
    countryList: document.querySelector(`.country-list`),
    countryInfo: document.querySelector(`.country-info`),
}



refs.searchBox.addEventListener(`input`, debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(event) {
    
    const search = event.target.value.trim();
    
    if (!search) {
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";
        return;
    }
    fetchCountries(search).then(getCountris);
};

function getCountris(array) {
    if (!array) {
        refs.countryInfo.innerHTML = "";
        refs.countryList.innerHTML = "";
        return;
    }
    if (array.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }
    if (array.length > 1 && array.length < 10) {
      createListOfCountries(array)
        return;
    }
    createCountry(array[0]);
}

function createCountry({
    name: { official },
    capital,
    population,
    flags: { svg },
    languages,
}) {
const allLanguages = Object.values(languages).join(',');

const markup = 
`<img alt="flag ${official}" src="${svg}" class="country-img"></img>
    <h2 class="country-name">${official}</h2>
    <p class="country-text"><b>Столиця: </b>${capital}</p>
    <p class="country-text"><b>Населення: </b>${population}</p>
    <p class="country-text"><b>Мова: </b>${allLanguages}</p>`

refs.countryInfo.innerHTML = markup;
refs.countryList.innerHTML = "";
};

function createListOfCountries(countries) { 
    const markup = countries
        
        .map(({ flags: { svg }, name: { official } }) => {
           return `<li class="country-list-item">
        <img class="country-list-item__img" alt="flag ${official}" src="${svg}"></img>
        <p class="country-list-item__name">${official}</p>
        </li>`;
        }).join("");
    
    refs.countryList.innerHTML = markup;
    refs.countryInfo.innerHTML = ""; 
}