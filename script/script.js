var map;
var marker;
var control;


var iconFood = L.icon({
    iconUrl: '../assets/icons-sgv/restaurante.png',

    iconSize:     [60, 60],
    iconAnchor:   [22, 94], 
    popupAnchor:  [-3, -76] 
});






var Lugar = L.icon({
    iconUrl: '../assets/icons-sgv/restaurante.png',

    iconSize:     [60, 60],
    iconAnchor:   [22, 94], 
    popupAnchor:  [-3, -76] 
});





function inicializarMapa() {
    map = L.map('mapa').setView([-8.047562, -34.877002], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    control = L.Routing.control({
        waypoints: [
            L.latLng(-8.047562, -34.877002), 
            L.latLng(-8.047191, -34.959897)
        ],
        routeWhileDragging: true,
        show: false,    
        lineOptions: {
            styles: [{color: '#3388ff', opacity: 0.7, weight: 5}]
        }
    
    }).addTo(map);
}





function adicionarMarcadorLocalizacaoUsuario() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;

        if (marker) {
            marker.remove();
        }

        marker = L.marker([userLat, userLng], {iconFood}).addTo(map)
            .bindPopup('Você está aqui')
            .openPopup();

        map.setView([userLat, userLng], 13); 
    });
}





function adicionarMarcadoresPreCadastrados() {
    var points = [
        { name: "Praia de Boa Viagem", latlng: [-8.121999, -34.901051] },
        { name: "Marco Zero", latlng: [-8.062653, -34.871279] },
        { name: "Instituto Ricardo Brennand", latlng: [-8.047191, -34.959897] }
    ];

    points.forEach(function (point) {
        var marker = L.marker(point.latlng, { icon: iconFood }).addTo(map).bindPopup(point.name);

       
        marker.on('click', function() {
            navigator.geolocation.getCurrentPosition(function (position) {
                var userLat = position.coords.latitude;
                var userLng = position.coords.longitude;

                var waypoints = [
                    L.latLng(userLat, userLng),  
                    L.latLng(marker.getLatLng()) 
                ];

                control.setWaypoints(waypoints);
                control.route();
            });
        });
    });
}



function buscarLocalizacao() {
    var input = document.getElementById('restaurante').value;

    fetch('https://nominatim.openstreetmap.org/search?q=' + input + '&format=json')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                var lat = data[0].lat;
                var lon = data[0].lon;

                if (marker) {
                    marker.remove(); 
                }

                marker = L.marker([lat, lon]).addTo(map)
                    .bindPopup(input)
                    .openPopup();

                map.setView([lat, lon], 13);  
            }
        })
        .catch(error => {
            console.error('Erro ao buscar localização:', error);
        });
}

window.addEventListener('resize', function () {
    map.invalidateSize();
});

document.addEventListener('DOMContentLoaded', function () {
    inicializarMapa();
    adicionarMarcadorLocalizacaoUsuario();
    adicionarMarcadoresPreCadastrados();
});



// enter functions
function login() {
    window.location.href = "index.html";
}


function register() {
    window.location.href = "dietaryRestrictionsPage.html";
}


// Side Bar function

function openNav() {
    document.getElementById("mySidebar").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("mySidebar")) {
        closeNav();
    }
};