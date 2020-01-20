function getData(url, dest, parser) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            dest.data = parser(xhr.responseText);
            console.log(dest);
        }
    };
    xhr.send(null);
}

const temperatureParser = (x) => JSON.parse(x)['data'];
const bankDataParser = (x) => JSON.parse(x)[0];

const tempsURL = 'https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/ytd/12/1880-2019/data.json';
const A_URL = 'http://api.nbp.pl/api/exchangerates/tables/A';
const B_URL = 'http://api.nbp.pl/api/exchangerates/tables/B';
const C_URL = 'http://api.nbp.pl/api/exchangerates/tables/C';

var temperatures = {};
var tableA = {}, tableB = {}, tableC = {};

$(document).ready(function() {
    getData(tempsURL, temperatures, temperatureParser);
    getData(A_URL, tableA, bankDataParser);
    getData(B_URL, tableB, bankDataParser);
    getData(C_URL, tableC, bankDataParser);
});