let tog = document.querySelector(".toggle");
let togball = document.querySelector(".toggle-ball");
var i = 1;
tog.onclick = () => {
    if (i % 2 == 0) {
        tog.classList.remove("toggle-click");
        togball.classList.remove("toggle-ballmove");
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [78.6569, 22.9734],
            zoom: 4
        });
        var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
        fetch("https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true").then(response => response.json()).then(result => {
            data24cont.innerHTML = `<div class="datacard reversed">
        <h2>-- LAST 24 HOURS --</h2>
        <div class="data">
        <p>Active Cases: ${result.activeCasesNew}</p>
        <p>Recovered: ${result.recoveredNew}</p>
        <p>Deaths: ${result.deathsNew}</p>
        <p>Test: ${result.previousDayTests}</p>
    </div>`;
            datacont.innerHTML = `
            <div class="datacard">
        <h2>-- COVID19 in India --</h2>
        <div class="data">
        <p>Total Cases: ${result.totalCases}</p>
        <p>Total Active Cases: ${result.activeCases}</p>
        <p>Total Recovered: ${result.recovered}</p>
        <p>Total Deaths: ${result.deaths}</p>
    </div>
    </div>`;
            result.regionData.forEach(element => {

                var cases = element.totalInfected;
                var popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<div class="popup"><h3>COVID19 in ${element.region}</h3>
                        <div class="popupdata">
                    <p>Total Infected: ${element.totalInfected} </p>
                    <p>Total Recovered: ${element.recovered}</p>
                    <p>Deceased: ${element.deceased} </p>
                </div>    
                </div>`)

                if (cases <= 5000) {
                    var color = `#ebe534`;
                }

                else if (cases <= 20000) {
                    var color = `#ebb734`;
                }
                else if (cases <= 50000) {
                    var color = `orangered`;
                }
                else if (cases <= 100000) {
                    var color = `maroon`;
                }
                else if (cases <= 150000) {
                    var color = `red`;
                }
                else {
                    var color = `darkred`;
                }

                mapboxClient.geocoding
                    .forwardGeocode({
                        query: `${element.region}, India`,
                        autocomplete: false,
                        limit: 1
                    })
                    .send()
                    .then(function (response) {
                        if (
                            response &&
                            response.body &&
                            response.body.features &&
                            response.body.features.length
                        ) {
                            var feature = response.body.features[0];
                            new mapboxgl.Marker({
                                draggable: false,
                                color: color
                            })
                                .setLngLat(feature.center)
                                .setPopup(popup) // sets a popup on this marker
                                .addTo(map);
                        }
                    });

            });
        });

        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                placeholder: "Search for India"
            })
        );

    }

    else {
        tog.classList.add("toggle-click");
        togball.classList.add("toggle-ballmove");
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [78.6569, 22.9734],
            zoom: 4
        });
        var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
        fetch("https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true").then(response => response.json()).then(result => {
            data24cont.innerHTML = `<div class="datacard reversed">
        <h2>-- LAST 24 HOURS --</h2>
        <div class="data">
        <p>Active Cases: ${result.activeCasesNew}</p>
        <p>Recovered: ${result.recoveredNew}</p>
        <p>Deaths: ${result.deathsNew}</p>
        <p>Test: ${result.previousDayTests}</p>
    </div>`;
            datacont.innerHTML = `
            <div class="datacard">
        <h2>-- COVID19 in India --</h2>
        <div class="data">
        <p>Total Cases: ${result.totalCases}</p>
        <p>Total Active Cases: ${result.activeCases}</p>
        <p>Total Recovered: ${result.recovered}</p>
        <p>Total Deaths: ${result.deaths}</p>
    </div>
    </div>`;
            result.regionData.forEach(element => {

                var cases = element.totalInfected;
                var popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<div class="popup"><h3>COVID19 in ${element.region}</h3>
                        <div class="popupdata">
                    <p>Total Infected: ${element.totalInfected} </p>
                    <p>Total Recovered: ${element.recovered}</p>
                    <p>Deceased: ${element.deceased} </p>
                </div>    
                </div>`)

                if (cases <= 5000) {
                    var color = `#ebe534`;
                }

                else if (cases <= 20000) {
                    var color = `#ebb734`;
                }
                else if (cases <= 50000) {
                    var color = `orangered`;
                }
                else if (cases <= 100000) {
                    var color = `maroon`;
                }
                else if (cases <= 150000) {
                    var color = `red`;
                }
                else {
                    var color = `darkred`;
                }

                mapboxClient.geocoding
                    .forwardGeocode({
                        query: `${element.region}, India`,
                        autocomplete: false,
                        limit: 1
                    })
                    .send()
                    .then(function (response) {
                        if (
                            response &&
                            response.body &&
                            response.body.features &&
                            response.body.features.length
                        ) {
                            var feature = response.body.features[0];
                            new mapboxgl.Marker({
                                draggable: false,
                                color: color
                            })
                                .setLngLat(feature.center)
                                .setPopup(popup) // sets a popup on this marker
                                .addTo(map);
                        }
                    });

            });
        });

        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                placeholder: "Search for India"
            })
        );

    }
    i++;
}


var datacont = document.querySelector('.datacont');
var data24cont = document.querySelector('.data24cont');
mapboxgl.accessToken = 'pk.eyJ1IjoiY29kZTJmb3JldmVyIiwiYSI6ImNrZmpvbHBnaTA5ZnEycXFtMGVtZmVyajUifQ.x47eZ2MDQcCoYz_mYzB5QA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [78.6569, 22.9734],
    zoom: 4
});
var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
fetch("https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true").then(response => response.json()).then(result => {
    data24cont.innerHTML = `<div class="datacard reversed">
<h2>-- LAST 24 HOURS --</h2>
<div class="data">
<p>Active Cases: ${result.activeCasesNew}</p>
<p>Recovered: ${result.recoveredNew}</p>
<p>Deaths: ${result.deathsNew}</p>
<p>Test: ${result.previousDayTests}</p>
</div>`;
    datacont.innerHTML = `
    <div class="datacard">
<h2>-- COVID19 in India --</h2>
<div class="data">
<p>Total Cases: ${result.totalCases}</p>
<p>Total Active Cases: ${result.activeCases}</p>
<p>Total Recovered: ${result.recovered}</p>
<p>Total Deaths: ${result.deaths}</p>
</div>
</div>`;
    result.regionData.forEach(element => {

        var cases = element.totalInfected;
        var popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div class="popup"><h3>COVID19 in ${element.region}</h3>
                <div class="popupdata">
            <p>Total Infected: ${element.totalInfected} </p>
            <p>Total Recovered: ${element.recovered}</p>
            <p>Deceased: ${element.deceased} </p>
        </div>    
        </div>`)

        if (cases <= 5000) {
            var color = `#ebe534`;
        }

        else if (cases <= 20000) {
            var color = `#ebb734`;
        }
        else if (cases <= 50000) {
            var color = `orangered`;
        }
        else if (cases <= 100000) {
            var color = `maroon`;
        }
        else if (cases <= 150000) {
            var color = `red`;
        }
        else {
            var color = `darkred`;
        }

        mapboxClient.geocoding
            .forwardGeocode({
                query: `${element.region}, India`,
                autocomplete: false,
                limit: 1
            })
            .send()
            .then(function (response) {
                if (
                    response &&
                    response.body &&
                    response.body.features &&
                    response.body.features.length
                ) {
                    var feature = response.body.features[0];
                    new mapboxgl.Marker({
                        draggable: false,
                        color: color
                    })
                        .setLngLat(feature.center)
                        .setPopup(popup) // sets a popup on this marker
                        .addTo(map);
                }
            });

    });
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Search for India"
    })
);
