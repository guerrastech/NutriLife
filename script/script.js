var map;
var marker;

function inicializarMapa() {
    map = L.map('mapa').setView([-8.047562, -34.877002], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
}

function adicionarMarcadorLocalizacaoUsuario() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;

        if (marker) {
            marker.remove();
        }

        marker = L.marker([userLat, userLng]).addTo(map)
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
        L.marker(point.latlng).addTo(map).bindPopup(point.name);
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
                    marker.remove(); // Remove o marcador existente, se houver
                }

                marker = L.marker([lat, lon]).addTo(map)
                    .bindPopup(input)
                    .openPopup();

                map.setView([lat, lon], 13); // Define a visualização do mapa para a localização encontrada
            }
        })
        .catch(error => {
            console.error('Erro ao buscar localização:', error);
        });
}

window.addEventListener('resize', function () {
    map.invalidateSize();
});

// Inicializa o mapa e adiciona os marcadores ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    inicializarMapa();
    adicionarMarcadorLocalizacaoUsuario();
    adicionarMarcadoresPreCadastrados();
});


// Logar

function login() {
    window.location.href = "index.html";
}