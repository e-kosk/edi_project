let req = new XMLHttpRequest();
let url_nbp_1 = "http://api.nbp.pl/api/exchangerates/rates/a/gbp/2020-01-01/2020-01-22/?format=json";
let url_nbp_2 = "http://api.nbp.pl/api/exchangerates/rates/a/eur/2020-01-01/2020-01-22/?format=json";
let url_joke = 'https://official-joke-api.appspot.com/random_joke';

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

let writeJoke = function (question_div, answer_div) {
    let res_joke = getData(url_joke);
    question_div.text(res_joke.setup);
    answer_div.text(res_joke.punchline);
};

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



$(document).ready(function () {

    // NBP CHARTS

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

    drawChart('bar', 'canvas-chart-1', labels_1,[dataset_1]);
    drawChart('bar', 'canvas-chart-2', labels_2,[dataset_2]);
    drawChart('bar', 'canvas-chart-3', labels_1,[dataset_1, dataset_2]);

    // END OF NBP CHARTS


    // GITHUB JOKES

    writeJoke($('#joke-question'), $('#joke-answer'));

    $(function() {
       $(window).keypress(function(e) {
           var ev = e || window.event;
           var key = ev.keyCode || ev.which;
           //do stuff with "key" here...
           if (key == 106) {
               writeJoke($('#joke-question'), $('#joke-answer'));
           }
       });
    });

    // END OF GITHUB JOKES

});
