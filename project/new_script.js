// variables and urls
let req = new XMLHttpRequest();
let url_nbp_1 = "http://api.nbp.pl/api/exchangerates/rates/a/gbp/2020-01-01/2020-01-22/?format=json";
let url_nbp_2 = "http://api.nbp.pl/api/exchangerates/rates/a/eur/2020-01-01/2020-01-22/?format=json";
let url_joke = 'https://official-joke-api.appspot.com/random_joke';
let url_weather = 'https://api.openweathermap.org/data/2.5/weather?q=Krakow,pl&units=metric&appid=bbc670541580546559ac91314174503c';

// functions
let getData = function (url) {
    req.open('GET', url, false);
    req.send(null);
    let res;
    if (req.status === 200) {
        return JSON.parse(req.responseText);
    } else {
        return null;
    }
};

let writeJoke = function (q, a, question_div, answer_div) {
    question_div.text(q);
    answer_div.text(a);
};



// let writeJoke = function (q, a question_div, answer_div) {
//     let res_joke = getData(url_joke);
//     question_div.text(res_joke.setup);
//     answer_div.text(res_joke.punchline);
// };

let drawChart = function(type, canvas, labels, datasets) {

    let CHART = document.getElementById(canvas).getContext('2d');

    let myChart = new Chart(CHART, {
        type: type,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 18,
                        beginAtZero: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 14,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};



// GETTING DATA FOR CHARTS
let res_nbp_1 = getData(url_nbp_1);
let r1 = res_nbp_1.rates;

let res_nbp_2 = getData(url_nbp_2);
let r2 = res_nbp_2.rates;

let labels_1 = [];
let labels_2 = [];

let dataset_1 = {
    label: 'GBP rates',
    data: [],
    fill: false,
    backgroundColor: '#ffd866',
    borderColor: '#8a7c34',
    borderWidth: 1
};

let dataset_2 = {
    label: 'EUR rates',
    data: [],
    fill: false,
    backgroundColor: '#146ccc',
    borderColor: '#162351',
    borderWidth: 1
};

$.each(r1, function (index, object) {
    dataset_1.data.push(object.mid);
    labels_1.push(object.effectiveDate);
});

$.each(r2, function (index, object) {
    dataset_2.data.push(object.mid);
    labels_2.push(object.effectiveDate);
});
// END OF GETTING DATA FOR CHARTS


// GETTING DATA FOR FIRST JOKE
let res_joke = getData(url_joke);
let joke_q = res_joke.setup;
let joke_a = res_joke.punchline;
// END OF GETTING DATA FOR FIRST JOKE


// GETTING WEATHER DATA
let res_weather = getData(url_weather);
// END OF GETTING WEATHER DATA



$(document).ready(function () {

    console.log(res_weather.main.temp);
    $('#temp').text(res_weather.main.temp + '\u00B0' + 'C');

    // DRAWING NBP CHARTS
    drawChart('bar', 'canvas-chart-1', labels_1,[dataset_1]);
    drawChart('bar', 'canvas-chart-2', labels_2,[dataset_2]);
    drawChart('bar', 'canvas-chart-3', labels_1,[dataset_1, dataset_2]);
    // END OF DRAWING NBP CHARTS


    // GITHUB JOKES
    writeJoke(joke_q, joke_a, $('#joke-question'), $('#joke-answer'));

    // get new joke on key J press
    $(function() {
       $(window).keypress(function(e) {
           var ev = e || window.event;
           var key = ev.keyCode || ev.which;

           $('#joke-question').text('loading question...');
           $('#joke-answer').text('generating answer...');

           if (key == 106) {
               let res_joke = getData(url_joke);
               let joke_q = res_joke.setup;
               let joke_a = res_joke.punchline;
               writeJoke(joke_q, joke_a, $('#joke-question'), $('#joke-answer'));
           }
       });
    });
    // END OF GITHUB JOKES

});
