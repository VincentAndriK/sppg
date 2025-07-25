var idprov = idprov;
var idkab = idkab;

var map = L.map('map').setView([0, 120], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.latlngGraticule({
    showLabel: true,
    zoomInterval: [
        { start: 2, end: 3, interval: 30 },
        { start: 4, end: 4, interval: 10 },
        { start: 5, end: 7, interval: 5 },
        { start: 8, end: 10, interval: 1 }
    ]
}).addTo(map);

var markers = L.markerClusterGroup();
for (var i = 0; i < addressPoints.length; i++) {
    var a = addressPoints[i];
    var title = "<b>" + a[2] + "</b><br>Alamat: " + a[6] + "<br>Jenis SPPG: " + a[3] + "<br>Kepala: " + a[4] + "<br>No. HP: " + a[5];
    var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
    marker.bindPopup(title);
    markers.addLayer(marker);
}
map.addLayer(markers);

fetch(
    "https://raw.githubusercontent.com/ardian28/GeoJson-Indonesia-38-Provinsi/refs/heads/main/Kabupaten/38%20Provinsi%20Indonesia%20-%20Kabupaten.json"
)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    L.geoJSON(data).addTo(map);
    L.control.scale().addTo(map);
    L.geoJSON(data, {
        style: function (feature) {
            return {
                color: "#3388ff",
                weight: 2,
                fillColor: "#3388ff",
                fillOpacity: 0.2,
            };
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                click: function () {
                    layer
                        .bindPopup("<b>" + feature.properties.WADMKK + "</b>")
                        .openPopup();
                },
            });
        },
    }).addTo(map);
});