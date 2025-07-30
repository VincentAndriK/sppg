var uph = L.markerClusterGroup();
for (var i = 0; i < uphPoints.length; i++) {
    var a = uphPoints[i];
    var title = "<b>" + a[2] + "</b><br>Alamat: " + a[3];
    var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
    marker.bindPopup(title);
    uph.addLayer(marker);
}

var sppg = L.markerClusterGroup();
for (var i = 0; i < sppgPoints.length; i++) {
    var a = sppgPoints[i];
    var title = "<b>" + a[2] + "</b><br>Alamat: " + a[6] + "<br>Jenis SPPG: ";
    var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
    marker.bindPopup(title);
    sppg.addLayer(marker);
}

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const osmTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var map = L.map('map', {
    zoom: 5,
    layers: [osm, sppg]
}).setView([0, 120]);

const baseLayers = {
    'OpenStreetMap': osm,
    'OpenStreetMap.TOPO': osmTopo
};

L.control.defaultExtent().addTo(map);

var control = L.control.geonames({
    username: 'cbi.test'
});
map.addControl(control);

const overlays = {
    'UPH': uph,
    'SPPG': sppg,
    'Data Layer Tahun 2025': layer25
};

const layerControl = L.control.layers(baseLayers, overlays).addTo(map);