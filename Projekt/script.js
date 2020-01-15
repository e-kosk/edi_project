function co()
{
    let div = document.getElementById('test');

    var req = new XMLHttpRequest();

    let r1, r2, r3;

    req.open('GET', 'http://api.nbp.pl/api/exchangerates/tables/A', false); 
    req.send(null);

    if (req.status == 200)
        r1 = req.responseText;

    req.open('GET', 'http://api.nbp.pl/api/exchangerates/tables/B', false); 
    req.send(null);

    if (req.status == 200)
        r2 = req.responseText;

    req.open('GET', 'http://api.nbp.pl/api/exchangerates/tables/C', false); 
    req.send(null);

    if (req.status == 200)
        r3 = req.responseText;

    div.innerHTML = '<p>' + r1 + '</p>' + '<p>' + r2 + '</p>' + '<p>' + r3 + '</p>';
}