$(document).ready(function () {

    fetch("http://api.nbp.pl/api/exchangerates/rates/a/gbp/2020-01-01/2020-01-22/?format=json").then(response => response.json()).then(response => {

        let r = response.rates;
        let mids = [];
        let dates = [];

        $.each(r, function (index, object) {
            mids.push(object.mid);
            dates.push(object.effectiveDate);
        });

        drawChart1('GBP rates','line', 'canvas-chart-1', dates, mids, 'brown', 'green', true)
    });

    fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/2020-01-01/2020-01-22/?format=json").then(response => response.json()).then(response => {

        let r = response.rates;
        let mids = [];
        let dates = [];

        $.each(r, function (index, object) {
            mids.push(object.mid);
            dates.push(object.effectiveDate);
        });

        drawChart2('EUR rates', 'bar','canvas-chart-2', dates, mids, 'blue', 'black', false, )
    });
    

    let drawChart1 = function(label, type, canvas, labels, values) {

        let CHART = document.getElementById(canvas).getContext('2d');

        let myChart = new Chart(CHART, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: values,
                    fill: false,
                    backgroundColor: 'black',
                    borderColor: 'red',
                    borderWidth: 1
            
                }]
            }
        });
        

    }
    let drawChart2 = function(label, type, canvas, labels, values) {

        let CHART = document.getElementById(canvas).getContext('2d');

        let myChart = new Chart(CHART, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: values,
                    fill: false,
                    backgroundColor: 'blue',
                    borderColor: 'black',
                    borderWidth: 1
            
                }]
            }
        });
    } 
});







