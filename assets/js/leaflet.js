
<div id="map" style="height: 400px;"></div>
    // Initialize the map just above Antwerp center
    var map = L.map('map').setView([51.225, 4.4025], 13);

    // Tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Marker at Antwerp city center
    var marker = L.marker([51.2194, 4.4025]).addTo(map);
    marker.bindPopup("<b>Antwerp Center</b>").openPopup();
