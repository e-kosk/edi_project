function getData(url, dest, parser) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            dest.data = parser(xhr.responseText);
            console.log(getDataFromJson(singleCurrencyRates));
        }
    };
    xhr.send(null);
}

function getSingleCurrency(currency, startDate, endDate, dest) {
    const url = `http://api.nbp.pl/api/exchangerates/rates/c/${currency}/${startDate}/${endDate}`;
    getData(url, dest, (x) => JSON.parse(x));
}

const tempsURL = 'https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/ytd/12/1880-2019/data.json';
const A_URL = 'http://api.nbp.pl/api/exchangerates/tables/A';
const B_URL = 'http://api.nbp.pl/api/exchangerates/tables/B';
const C_URL = 'http://api.nbp.pl/api/exchangerates/tables/C';

var temperatures = {};
var tableA = {}, tableB = {}, tableC = {};
var singleCurrencyRates = {};

function getDataFromJson(table){
    let rates = table.data.rates;
    let r = [];

    for (let i=0; i<Object.keys(rates).length; i++){
        r.push(rates[i].bid)
    }
    return r
}

$(document).ready(function() {
    // getData(tempsURL, temperatures, (x) => JSON.parse(x)['data']);
    // getData(A_URL, tableA, (x) => JSON.parse(x)[0]);
    // getData(B_URL, tableB, (x) => JSON.parse(x)[0]);
    // getData(C_URL, tableC, (x) => JSON.parse(x)[0]);
    getSingleCurrency('eur', '2020-01-01', '2020-01-21', singleCurrencyRates);
});