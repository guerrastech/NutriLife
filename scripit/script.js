var map = L.map('mapa').setView([-8.047562, -34.877002], 13); // Define as coordenadas de Recife

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Adicione um marcador para a localização do usuário
navigator.geolocation.getCurrentPosition(function (position) {
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;
    L.marker([userLat, userLng]).addTo(map)
        .bindPopup('Você esta aqui')
        .openPopup();
});

// Adicione marcadores para pontos pré-cadastrados em Recife
var points = [
    { name: "Praia de Boa Viagem", latlng: [-8.121999, -34.901051] },
    { name: "Marco Zero", latlng: [-8.062653, -34.871279] },
    { name: "Instituto Ricardo Brennand", latlng: [-8.047191, -34.959897] }
];

points.forEach(function (point) {
    L.marker(point.latlng).addTo(map).bindPopup(point.name);
});

// Atualize o tamanho do mapa quando a janela for redimensionada
window.addEventListener('resize', function () {
    map.invalidateSize();
});