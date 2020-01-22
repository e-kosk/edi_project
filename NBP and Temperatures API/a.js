$(document).ready(function () {

    fetch("http://api.nbp.pl/api/exchangerates/rates/a/gbp/2020-01-01/2020-01-22/?format=json").then(response => response.json()).then(response => {

        let r = response.rates;
        let mids = [];
        let dates = [];

        $.each(r, function (index, object) {
            mids.push(object.mid);
            dates.push(object.effectiveDate);
        });

        drawChart('GBP rates','line', 'canvas-chart-1', dates, mids, 'rgba(255, 99, 132, 0.2)')
    });

    fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/2020-01-01/2020-01-22/?format=json").then(response => response.json()).then(response => {

        let r = response.rates;
        let mids = [];
        let dates = [];

        $.each(r, function (index, object) {
            mids.push(object.mid);
            dates.push(object.effectiveDate);
        });

        drawChart('EUR rates', 'bar','canvas-chart-2', dates, mids, 'rgba(116,255,114,0.2)')
    });


    let drawChart = function(label, type, canvas, labels, values, bgcolor) {

        let CHART = document.getElementById(canvas).getContext('2d');

        let myChart = new Chart(CHART, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: values,
                    fill: false,
                    backgroundColor: [bgcolor],
                    borderColor: ['rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                },{
                    label: 'Moj nowy label',
                    data: [5.4, 4.1, 4, 5, 6, 5, 4, 5, 6, 5, 6],
                    fill: false,
                    backgroundColor: [bgcolor],
                    borderColor: ['rgb(139,152,255)'],
                    borderWidth: 1
                }]
            }
        });
    }
});
