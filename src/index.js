import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
    if (searchBox.value === "") {
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }
    fetchCountries(searchBox.value.trim())
        .then(result => {
            createCountryList(result);
            console.log(result);
        })
        .catch(error => {
            Notify.failure("Oops, there is no country with that name");
            countryList.innerHTML = "";
            console.log(error);
        })
}

function createCountryList(countries) {
    const markup = countries.map(country => `
            <li class = "country-item">
                <img class = "country-img" src = ${country.flags.svg} width = 30></img>
                <p class = "country-name">${country.name.official}</p>
            </li>
            `).join("");
    
    countryList.innerHTML = markup;
    countryInfo.innerHTML = "";

    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        countryList.innerHTML = "";
    }
    if (countries.length === 1) {
        renderCountryCard(countries[0]); 
    }

}   

function renderCountryCard(countryObj) {
    const langMarkup = Object.values(countryObj.languages).join(", ");
    const countryInfoMarkup = `
    <span class = "country-info-data">Capital:</span><span>${countryObj.capital}</span><br>
    <span class = "country-info-data">Population:</span><span>${countryObj.population}</span><br>
    <span class = "country-info-data">Languages:</span><span>${langMarkup}</span>
    `;
    countryInfo.innerHTML = countryInfoMarkup;

    const countryTitle = countryList.querySelector('.country-name'); 
    countryTitle.style.fontSize = "25px";
    countryTitle.style.fontWeight = "500";
}