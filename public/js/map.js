
const map = L.map('map').setView([-62.1, -58.4], 10);

// Base OSM
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fullscreen
map.addControl(new L.Control.Fullscreen());

// Mouse position
//L.control.mousePosition({position: 'bottomright'}).addTo(map);

// Marker cluster
const markers = L.markerClusterGroup();

// CSV carregamento
console.log("Carregando dados...");
Papa.parse('data/fotos.csv', {
    download: true,
    header: true,
    complete: function(results) {
        console.log("Dados carregados:", results.data);
        results.data.forEach(function(row) {
            if (row.LATITUDE && row.LONGITUDE) {
                const lat = parseFloat(row.LATITUDE.replace(',', '.'));
                const lng = parseFloat(row.LONGITUDE.replace(',', '.'));
                const url = row.URL.split('/d/')[1]?.split('/')[0];
                const embedUrl = url ? `https://drive.google.com/file/d/${url}/preview` : '';
                const popup = `
                    <div style='text-align:center;'>
                        <iframe src="${embedUrl}" width="320" height="240" allowfullscreen></iframe><br>
                        <b>Ano:</b> ${row.ANO}<br>
                        <b>Observador:</b> ${row.OBSERVADOR}<br>
                        <b>Latitude:</b> ${lat}<br>
                        <b>Longitude:</b> ${lng}
                    </div>
                `;
                const marker = L.marker([lat, lng], {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'camera',
                        markerColor: 'blue',
                        prefix: 'fa'
                    })
                }).bindPopup(popup);
                markers.addLayer(marker);
            }
        });
        map.addLayer(markers);
    }
});


const lat = parseFloat(row.LATITUDE.replace(',', '.'));
const lng = parseFloat(row.LONGITUDE.replace(',', '.'));