function fetchCountries(name) {
        // console.log(fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        //         .then(responce => responce.json())); 
 return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(responce => responce.json());
}
export default fetchCountries;