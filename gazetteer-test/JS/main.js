window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
});
var mymap = L.map('mapid').setView([51.505, -0.09], 6);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJ0aHVyOSIsImEiOiJja2cyZmNwMnMwMGFhMnJvNWowYndrM2l5In0.HJBsqwXVOoLl39pdp4vrSw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 8,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJ0aHVyOSIsImEiOiJja2cyZmNwMnMwMGFhMnJvNWowYndrM2l5In0.HJBsqwXVOoLl39pdp4vrSw'
}).addTo(mymap);


mymap.locate({setView: true, maxZoom: 18});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are here").openPopup();

    L.circle(e.latlng, radius).addTo(mymap);
}

mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationerror', onLocationError);

window.onload = function() {
    var popup = L.popup();
    var geolocationMap = L.map('mapid', {
        layers: MQ.mapLayer(),
        center: [40.731701, -73.993411],
        zoom: 12
    });

    function geolocationErrorOccurred(geolocationSupported, popup, latLng) {
        popup.setLatLng(latLng);
        popup.setContent(geolocationSupported ?
                '<b>Error:</b> The Geolocation service failed.' :
                '<b>Error:</b> This browser doesn\'t support geolocation.');
        popup.openOn(geolocationMap);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            popup.setLatLng(latLng);
            popup.setContent('This is your current location');
            popup.openOn(geolocationMap);

            geolocationMap.setView(latLng);
        }, function() {
            geolocationErrorOccurred(true, popup, geolocationMap.getCenter());
        });
    } else {
        //No browser support geolocation service
        geolocationErrorOccurred(false, popup, geolocationMap.getCenter());
    }
}


//countries
const url = "PHP/countries.php";
let myData = {};
fetch(url).then(function (res) {
    return res.json();
}).then(function (data) {
    myData = data;
    buildSelect(data);
})
function buildSelect(d) {
    let select = document.querySelector('select');
    d.forEach(function (item, index) {
        let option = document.createElement('option');
        
        option.value = index;
        option.textContent = item.name;
        select.appendChild(option);
    })
    select.addEventListener("change",outputData);
}
function outputData(e){
    let obj = myData[e.target.value];
    output.innerHTML=`
    <ul>
    <h1>${obj.name}</h1>
    <li><strong>Population</strong>: ${obj.population}</li>
    <li><strong>Capital city</strong>: ${obj.capital}</li>
    <li><strong>Currencies</strong>: ${obj.currencies[0].name}</li>
    <li><strong>Languages</strong>: ${obj.languages[0].name}</li>
    <li><strong>Region</strong>: ${obj.region}</li>
    <li><strong>Subregion</strong>: ${obj.subregion}</li>
    <li><strong>Demonym</strong>: ${obj.demonym}</li>
    <li><strong>Gini</strong>: ${obj.gini}</li>
    <li><strong>Regional Bloc</strong>: ${obj.regionalBlocs[0].name}</li>
    <li><strong>Calling code</strong>: ${obj.callingCodes[0]}</li>
    <li><strong>Time zones</strong>: ${obj.timezones}</li>
    <li><strong>Native name</strong>: ${obj.nativeName}</li>
    <li><strong>area</strong>: ${obj.area} km2</li>
    </ul>
    `;
     flag.innerHTML = `<img  id="flaggy" src=${obj.flag}>`; 
}

